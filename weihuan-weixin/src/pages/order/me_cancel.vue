<template>
	<!-- 打开弹窗时，禁止滑动页面，必须要在第一个节点 -->
	<page-meta :page-style="'overflow:' + (show ? 'hidden' : 'visible')"></page-meta>

	<!-- 搜索 -->
	<view class="search">
		<Search @searchInput="searchInput" @searchConfirm="searchConfirm" :focus="false"></Search>
	</view>

	<!-- 导航栏 -->
	<navigate class="top_navigate" :list="navList" :itemIndex="itemIndex" top="50px" @itemClick="itemClick" />

	<!-- 占位 -->
	<view style="height: 40px"></view>

	<view class="main">
		<!-- 列表 -->
		<view class="list">
			<block v-for="(item, index) in list" :key="item.id">
				<Item :item="item" :head_title_index="1" :state_btn="false" @statusBtn="statusBtn" @orderDetails="orderDetails"></Item>
			</block>
		</view>
		<uni-load-more :status="isMore" v-if="totalPage > 1"></uni-load-more>
		<Empty :show="list.length == 0 ? true : false" tips="您还没有相关核销信息"></Empty>
	</view>

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

	<sweep-navigate @sweep_switch="sweep_switch" :sweep_index="sweep_index"></sweep-navigate>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { onReachBottom } from '@dcloudio/uni-app';
import Search from '../component/search.vue';
import sweepNavigate from '../component/sweep_navigate.vue';
import navigate from '/src/pages/component/navigate.vue';
import Item from './item.vue';
import Empty from '../component/empty.vue';
import { codeList, orderCode } from '@/api/index.js';

// 底部栏下标
const sweep_index = ref(1);
// 导航栏
const navList = ref([
	{
		title: '全部',
		type: ''
	},
	{
		title: '待核销',
		type: 0
	},
	{
		title: '已核销',
		type: 1
	}
]);
// 导航栏下标
const itemIndex = ref(0);
// 关键词
const keyword = ref('');
// 页码
const page = ref(1);
// 总页码
const totalPage = ref(1);
// 页码条数
const size = ref(10);
// 核销码弹窗
const isScroll = ref(false);
// 核销码弹窗
const checkCodeRef = ref(null);
// 列表
const list = ref([]);
// 列表加载
const isMore = ref('more');
// 自提订单二维码
const storeCode = ref('');

// 核销码弹窗change - 放置页面穿透滚动
function checkCodeChange(e) {
	isScroll.value = e.show;
}

// 导航栏切换
function itemClick(e) {
	if (itemIndex.value == e.i) return;
	itemIndex.value = e.i;
	getList();
}

// 获取核销码列表
const getList = async (more) => {
	if (more) {
		isMore.value = 'loading';
	} else {
		uni.showLoading({
			title: '加载中...',
			mask: true
		});
		page.value = 1;
	}

	const params = {
		is_extract: navList.value[itemIndex.value].type,
		keyword: keyword.value,
		size: size.value,
		page: page.value
	};
	const res = await codeList(params);
	console.log('核销码列表', res);
	if (res.code == 1) {
		if (more) {
			list.value = [...list.value, ...res.data.lists];
		} else {
			list.value = res.data.lists;
			totalPage.value = res.data.page_no;
		}
	}

	if (more) {
		if (page.value >= totalPage.value) {
			return (isMore.value = 'no-more');
		}
		isMore.value = 'more';
	} else {
		uni.hideLoading();
	}
};

// 搜索输入时
const searchInput = (e) => {
	console.log(e);
	keyword.value = e.trim();
	keyword.value == '' ? getList() : '';
};

// 搜索回车
const searchConfirm = (e) => {
	console.log('搜索回车', e);
	getList();
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
				title: '取消订单',
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

// 订单详情
function orderDetails(orderId) {
	uni.navigateTo({
		url: `/pages/order/details?orderId=${orderId}`
	});
}

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

// 触底
onReachBottom(() => {
	if (page.value < totalPage.value) {
		page.value++;
		getList(true);
	}
});

onMounted(() => {
	getList();
});
</script>

<style lang="scss" scoped>
.main {
	padding: 30rpx;
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
</style>
