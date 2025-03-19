<!-- 列表 -->
<template>
	<!-- 打开弹窗时，禁止滑动页面，必须要在第一个节点 -->
	<page-meta :page-style="'overflow:' + (show ? 'hidden' : 'visible')"></page-meta>
	<!-- 顶部到胶囊的高度 -->
	<view class="top" :style="{ height: useMenuButton().top }"></view>
	<!-- 标题 -->
	<view class="page_title" :style="{ top: useMenuButton().top, height: useMenuButton().height, 'line-height': useMenuButton().height }">
		<view class="return_icon" @click="return_page">
			<uni-icons class="icon" type="left" size="24" color="#000"></uni-icons>
		</view>
		<view class="navigation_wrap">
			<view class="navigation box_border_radius box_shadow">
				<view class="navigation_btn" :class="{ active: head_title_index == 0 }" @click="switchPage(0)">物流订单</view>
				<view class="navigation_btn" :class="{ active: head_title_index == 1 }" @click="switchPage(1)">自提订单</view>
			</view>
		</view>
	</view>
	<!-- 搜索 -->
	<view class="search_box" :style="{ top: useMenuButton().topView }">
		<view class="search" @click="openSearch">
			<i class="iconfont icon-sousuo"></i>
			<text class="text">请输入关键字</text>
		</view>
	</view>

	<!-- 物流配送导航栏 -->
	<view class="tabs_box" :style="{ top: useMenuButton().navigateTop }" v-if="head_title_index == 0">
		<uv-tabs
			class="tabs"
			lineWidth="44"
			lineColor="#fe968d"
			:list="navList"
			@click="itemClick"
			:current="tabsCurrent"
			:activeStyle="{
				color: '#000',
				fontWeight: 'bold'
			}"
			:inactiveStyle="{
				color: '#606266',
				fontSize: '24rpx'
			}"
			itemStyle="padding-left: 16px; padding-right: 16px; height: 82rpx;"
		></uv-tabs>
	</view>

	<!-- 自提点导航栏 -->
	<view class="tabs_box" :style="{ top: useMenuButton().navigateTop }" v-if="head_title_index == 1">
		<uv-tabs
			class="tabs"
			lineWidth="44"
			lineColor="#fe968d"
			:list="storeNavList"
			@click="itemClick"
			:current="tabsCurrent"
			:activeStyle="{
				color: '#000',
				fontWeight: 'bold'
			}"
			:inactiveStyle="{
				color: '#606266',
				fontSize: '24rpx'
			}"
			itemStyle="padding-left: 16px; padding-right: 16px; height: 82rpx;"
		></uv-tabs>
	</view>

	<!-- 占位 -->
	<view :style="{ height: useMenuButton().orderHeight + 'px' }"></view>

	<swiper :style="{ height: getSystem().screenHeight - 173 + 'px' }" class="swiper" :current="itemIndex" @change="swiperChange">
		<block v-for="(item, index) in navList" :key="item.title">
			<swiper-item>
				<!-- 列表 -->
				<view class="list">
					<scroll-view
						class="scroll_view"
						scroll-y
						enable-back-to-top
						:scroll-with-animation="true"
						:scroll-anchoring="true"
						:scroll-into-view="toTopId" 
						:scroll-top="scrollTop"
						@scrolltolower="scrolltolower"
					>
						<view class="scroll_item">
							<!-- 切换swiper时，使scroll-view回到顶部 -->
							<view :id="toTopId"></view>
							
							<view class="loading">
								<view class="load_text" v-if="isLoading">
									<uni-load-more iconType="circle" :iconSize="13" status="loading" />
								</view>
								<view v-else-if="isEmpty">
									<Empty tips="您还没有相关订单呦,快去下单享受优惠吧" :show="true"></Empty>
								</view>
								<!-- 列表 -->
								<block v-else v-for="(item, index) in list" :key="item.id">
									<OrderItem :item="item" :head_title_index="head_title_index" @statusBtn="statusBtn" @orderDetails="orderDetails"></OrderItem>
								</block>
							</view>
						</view>
						<uni-load-more :status="isMore" v-if="totalPage > 1 && !isLoading && !isEmpty"></uni-load-more>
					</scroll-view>
				</view>
			</swiper-item>
		</block>
	</swiper>

	<!-- 核销码弹窗 -->
	<uni-popup ref="checkCodeRef" @change="checkCodeChange">
		<view class="check_code_wrap box_border_radius box_shadow">
			<view class="title">订单核销码</view>
			<image class="cover" :src="storeCode" mode="aspectFit" show-menu-by-longpress></image>
			<view class="b_code">
				<view class="lead">到对应自提点进行核销</view>
				<i class="iconfont icon-xiazai" @click="saveImage" v-if="storeCode"></i>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
// 胶囊信息
import useMenuButton from '../../hooks/useMenu.js';
import getSystem from '../../hooks/getSystem.js';
import navigate from '/src/pages/component/navigate.vue';
import OrderItem from './item.vue';
import { ref, nextTick, watchEffect } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { orderList, cancelOrder, confirmRecelve, orderCode, cancelApplyFor } from '@/api/index.js';
import _ from 'underscore';
import Empty from '@/pages/component/empty.vue';

// 页码
const page = ref(1);
// 条数
const size = ref(8);
// 总页码
const totalPage = ref(1);
// 空组件
const isEmpty = ref(false);
// 加载组件
const isLoading = ref(false);
// 订单类型
const type = ref('all');
// tabs下标
const tabsCurrent = ref(0);
// 标题页面
const head_title_index = ref(0);
// 列表
const list = ref([]);
// 列表加载
const isMore = ref('more');
// 自提订单二维码
const storeCode = ref('');
// scroll组件y轴滚动距离
const scrollTop = ref(0);
const toTopId = ref(null);
// 导航栏列表
const navList = ref([
	{
		name: '全部',
		type: 'all'
	},
	{
		name: '待付款',
		type: 'payment'
	},
	{
		name: '待发货',
		type: 'delivery'
	},
	{
		name: '待收货',
		type: 'received'
	},
	{
		name: '已完成',
		type: 'complete'
	},
	{
		name: '已取消',
		type: 'cancel'
	}
]);

// 自提导航栏列表
const storeNavList = ref([
	{
		name: '全部',
		type: 'all'
	},
	{
		name: '待付款',
		type: 'payment'
	},
	{
		name: '待自提',
		type: ' extract'
	},
	{
		name: '已完成',
		type: 'complete'
	},
	{
		name: '已取消',
		type: 'cancel'
	}
]);

onLoad((params) => {
	console.log('params', params);
	if (params.head_title_index && params.index) {
		head_title_index.value = params.head_title_index;
		tabsCurrent.value = params.index;
		getOrderList();
	}
});

onShow((onshow) => {
	const isOrderUpdate = uni.getStorageSync('isOrderUpdate');
	console.log('onshow', isOrderUpdate);
	if (isOrderUpdate.update) {
		getOrderList();
		uni.removeStorageSync('isOrderUpdate');
	}
});

// 页面标题切换
function switchPage(i) {
	head_title_index.value = i;
	getOrderList();
}

// 获取订单列表
const getOrderList = async (more = false) => {
	if (more) {
		isMore.value = 'loading';
	} else {
		page.value = 1;
		isLoading.value = true;
		isEmpty.value = false;
		toTopId.value = null;
	}
	const params = {
		page: page.value,
		size: size.value,
		type: head_title_index.value == 0 ? navList.value[tabsCurrent.value].type : storeNavList.value[tabsCurrent.value].type,
		delivery_type: head_title_index.value == 1 ? 20 : 10
	};
	const res = await orderList(params);
	console.log('订单列表', res);
	if (res.code == 1) {
		if (more) {
			list.value = [...list.value, ...res.data.lists];
			if (page.value >= totalPage.value) {
				return (isMore.value = 'no-more');
			}
			isMore.value = 'more';
		} else {
			toTopId.value = 'toTopId';
			list.value = res.data.lists;
			totalPage.value = res.data.page_no;
			isLoading.value = false;
			if (list.value.length == 0) {
				isEmpty.value = true;
			}
			nextTick(() => {
				scrollTop.value = 0;
				console.log('scrollTop.value', scrollTop.value);
			});
		}
	}
};

// 导航栏切换
function itemClick(e) {
	if (tabsCurrent.value == e.index) return;
	tabsCurrent.value = e.index;
	getOrderList();
}

// swiper切换
function swiperChange(e) {
	tabsCurrent.value = e.detail.current;
	getOrderList();
}

// 触底
const moreScroll = () => {
	if (page.value < totalPage.value) {
		page.value++;
		getOrderList(true);
	}
};
const scrolltolower = _.debounce(moreScroll, 800);

// 核销码弹窗
const checkCodeRef = ref(null);

// 取消订单
const cancelOrderFn = async (order_id) => {
	const params = {
		order_id
	};
	const res = await cancelOrder(params);
	console.log('取消订单', res);
	uni.showToast({
		title: res.msg,
		icon: 'none',
		mask: true,
		duration: 2000
	});
};

// 确认收货
const isConfirmRecelve = async (order_id) => {
	const params = {
		order_id
	};
	const res = await confirmRecelve(params);
	console.log('确认收货', res);
	uni.showToast({
		title: res.msg,
		icon: 'none',
		mask: true,
		duration: 2000
	});
};

// 获取订单核销码
const getOrderCode = async (order_id) => {
	const params = {
		order_id
	};
	const res = await orderCode(params);
	console.log('获取订单核销码', res);
	if (res.code == 1) {
		storeCode.value = res.data.qrcode_url;
		checkCodeRef.value.open();
	}
};

// 检查图片存储权限
const saveImage = () => {
	// 第一步：检查是否有相册权限
	uni.getSetting({
		success: (res) => {
			if (!res.authSetting['scope.writePhotosAlbum']) {
				// 没有权限，请求权限
				uni.authorize({
					scope: 'scope.writePhotosAlbum',
					success: () => {
						// 权限申请成功，保存图片
						downloadAndSaveImage();
					},
					fail: () => {
						// 权限申请失败，提示用户
						uni.showModal({
							title: '提示',
							content: '你拒绝了相册权限，无法保存图片，请在设置中开启相册权限',
							success: (res) => {
								if (res.confirm) {
									// 用户点击确定，打开设置页面
									uni.openSetting();
								}
							}
						});
					}
				});
			} else {
				// 已有权限，直接保存图片
				downloadAndSaveImage();
			}
		}
	});
};

// 保存图片到本地相册
const downloadAndSaveImage = () => {
	// 第二步：下载图片
	uni.downloadFile({
		url: storeCode.value,
		success: (res) => {
			if (res.statusCode === 200) {
				// 第三步：保存图片到相册
				uni.saveImageToPhotosAlbum({
					filePath: res.tempFilePath,
					success: () => {
						// 保存成功提示
						uni.showToast({
							title: '图片保存成功',
							icon: 'success'
						});
					},
					fail: () => {
						// 保存失败提示
						uni.showToast({
							title: '图片保存失败',
							icon: 'none'
						});
					}
				});
			}
		},
		fail: () => {
			// 下载失败提示
			uni.showToast({
				title: '图片下载失败',
				icon: 'none'
			});
		}
	});
};

// 取消申请售后
const isCancelApplyFor = async (id) => {
	const params = {
		refund_id: id
	};
	const res = await cancelApplyFor();
	console.log('取消申请售后', res);
	uni.showToast({
		title: res.msg,
		mask: true,
		icon: 'none',
		duration: 2000
	});
};

// 打开核销码弹窗
function statusBtn(e) {
	console.log(e);
	switch (e.type) {
		case 'payment':
			// 跳转待支付页面
			uni.navigateTo({
				url: `/pages/order/no_payment?orderId=${e.data.order_id}`
			});
			break;
		case 'cancel':
			// 取消订单
			uni.showModal({
				content: '确定取消订单?',
				success: async (res) => {
					if (res.confirm) {
						await cancelOrderFn(e.data.order_id);
						await getOrderList();
					}
				}
			});
			break;
		case 'logistics':
			// 查询物流
			uni.navigateTo({
				url: `/pages/order/distribution?orderId=${e.data.order_id}`
			});
			break;
		case 'confirmReceive':
			// 取消订单
			uni.showModal({
				content: '为了保障您的权益，请收到商品确认无误后再确认收货',
				success: async (res) => {
					if (res.confirm) {
						await isConfirmRecelve(e.data.order_id);
						await getOrderList();
					}
				}
			});
			break;
		case 'appayFor':
			// 申请售后
			uni.navigateTo({
				url: `/pages/order/after_sale?orderId=${e.data.order_id}&goodsId=${e.data.goodsId}&payPrice=${e.data.payPrice}&item=${e.data.item}`
			});
			break;
		case 'calcelApplyFor':
			// 取消申请售后
			uni.showModal({
				content: '确定取消申请售后吗？',
				success: async (res) => {
					if (res.confirm) {
						isCancelApplyFor(e.data.order_id);
					}
				}
			});

			break;
		case 'code':
			// 核销码
			getOrderCode(e.data.order_id);
			break;
	}
}

// 核销码弹窗change - 放置页面穿透滚动
const show = ref(false);
function checkCodeChange(e) {
	show.value = e.show;
}

// 订单详情
function orderDetails(orderId) {
	uni.navigateTo({
		url: `/pages/order/details?orderId=${orderId}`
	});
}

// 订单搜索
const openSearch = () => {
	uni.navigateTo({
		url: '/pages/order/search'
	});
};

// 返回
function return_page() {
	uni.navigateBack();
}
</script>

<style lang="scss" scoped>
.top {
	background: #fff;
}

.page_title {
	background: #fff;
	display: flex;
	align-items: center;
	.navigation_wrap {
		margin-left: 30px;
		.navigation {
		}
	}
}

.search_box {
	position: fixed;
	left: 0;
	width: 100%;
	padding: 20rpx 20rpx 10rpx;
	z-index: 1;
	background: #fff;

	.search {
		border-radius: 45rpx;
		height: 60rpx;
		background: #f9f9f9;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		.iconfont {
			font-size: 28rpx;
			color: #feac85;
		}

		.text {
			font-size: 24rpx;
			color: #b5b5b5;
			padding-left: 10rpx;
		}
	}
}

.tabs_box {
	position: fixed;
	left: 0;
	z-index: 3;
	width: 100%;
	height: 82rpx;
	background: #fff;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.list {
	height: 100%;
}

.check_code_wrap {
	background: #fff;
	padding: 40rpx 30rpx 10rpx;
	text-align: center;
	margin: auto;

	.title {
		font-size: 38rpx;
		font-weight: bold;
	}

	.cover {
		width: 500rpx;
		height: 500rpx;
		margin: 10px 0 0;
	}

	.lead {
		font-weight: 500;
	}

	.b_code {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.iconfont {
			font-size: 38rpx;
			font-weight: 500;
			padding: 20rpx 20rpx 20rpx 30rpx;
		}
	}
}

.swiper {
	background: #fff;
	.scroll_view {
		height: 100%;
		padding: 10rpx 0 20rpx;
		.scroll_item {
			padding: 0 20rpx;
			margin: 1px 0;

			.item:last-child {
				margin-bottom: 0;
			}
		}
	}
}
</style>
