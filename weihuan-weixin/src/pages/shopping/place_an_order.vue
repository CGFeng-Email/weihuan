<!-- 在线下单 -->
<template>
	<!-- 打开弹窗时，禁止滑动页面，必须要在第一个节点 -->
	<page-meta :page-style="'overflow:' + (pageMeta ? 'hidden' : 'visible')"></page-meta>
	<!-- 顶部到胶囊的高度 -->
	<view class="top" :class="scrollTop" :style="{ height: useMenuButton().top }"></view>
	<!-- 标题 -->
	<view class="page_title" :class="scrollTop" :style="{ top: useMenuButton().top, height: useMenuButton().height, 'line-height': useMenuButton().height }">
		<view class="left_icon" @click="left_return">
			<uni-icons type="left" size="24" :color="scrollTop == 'white_default' ? '#fff' : '#000'"></uni-icons>
		</view>
		{{ scrollTop != 'white_default' ? '产品详情' : '' }}
	</view>

	<!-- 轮播图 -->
	<view class="swiper_wrap">
		<swiper
			class="swiper_banner"
			autoplay
			:interval="5000"
			:duration="1000"
			circular
			indicator-dots
			indicator-color="#fff"
			indicator-active-color="#ff8992"
			@change="swiperChange"
		>
			<swiper-item class="swiper-item" v-for="item in details.images" :key="item">
				<image class="cover" :src="item" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<!-- 数字 -->
		<view class="serial_number" v-if="details.images.length > 0">
			<text class="num">0{{ swiper_current }}</text>
			<text>/0{{ details.images.length }}</text>
		</view>
		<!-- 底部圆角 -->
		<view class="swiper_radius"></view>
	</view>

	<view class="main">
		<view class="head_price">
			<view class="left">
				<view class="price_box">
					<text class="symbol">￥</text>
					<text class="price">{{ price }}</text>
					<text class="primary_price">￥{{ details.market_price }}</text>
				</view>
				<view class="quantity">
					<text class="name">已售:</text>
					<text class="price">{{ details.sales_sum }}+</text>
				</view>
			</view>
			<view class="right">
				<button class="box" open-type="share">
					<uni-icons type="redo" size="22"></uni-icons>
					<view class="text">分享</view>
				</button>
				<view class="box">
					<uni-icons :type="details.is_collect ? 'star-filled' : 'star'" size="22" :color="details.is_collect ? '#ff0000' : '#565656'"></uni-icons>
					<view class="text">收藏</view>
				</view>
			</view>
		</view>
		<view class="title">{{ details.title }}</view>
		<view class="specification">
			<view class="sku" @click="specificationDebounce">
				<text class="text">{{ specificationIndex != null ? specificationList.title + ': ' + specificationList.children[specificationIndex].title : '请选择规格' }}</text>
				<uni-icons type="down" size="14" color="#000"></uni-icons>
			</view>
		</view>
		<view class="serve">
			<view class="name">商品服务</view>
			<view class="hint">
				<uni-icons type="checkbox" size="18"></uni-icons>
				<text class="text">包邮</text>
			</view>
			<view class="hint">
				<uni-icons type="checkbox" size="18"></uni-icons>
				<text class="text">摔坏包赔 / 7天无理由退货 / 商品冷链运输</text>
			</view>
			<view class="line"></view>
			<view class="name">商品优惠</view>
			<view class="place">
				<text class="place_btn">下单满减</text>
				<text class="text">每满1000元减100元</text>
			</view>
		</view>
	</view>

	<!-- 详情图片 -->
	<uv-parse :content="details.goods_content" :tagStyle="contentStyle" :lazyLoad="true"></uv-parse>

	<!-- 搭配建议 -->
	<view class="match">
		<view class="btn btn_bg">
			<view class="text">搭配建议</view>
		</view>

		<List :list="shopping_list" @itemClick="jump_order_details"></List>
	</view>

	<!-- 底部栏-购物车 -->
	<view class="bottom_cart_navigation">
		<view class="btn">
			<button @click="addShoppingCart">加入购物车</button>
		</view>
		<view class="btn">
			<button @click="specificationDebounce">立即购买</button>
		</view>
	</view>

	<!-- 底部购物车 - 占位 -->
	<view style="height: 240rpx"></view>

	<!-- 登录弹窗 -->
	<login-popup :show="login_show" @maskClick="maskClick"></login-popup>

	<!-- 规格弹窗 -->
	<uni-popup
		ref="specificationRef"
		type="bottom"
		border-radius="15px 15px 0 0"
		is-mask-click
		background-color="#fff"
		mask-background-color="rgba(0,0,0,.7)"
		@maskClick="maskClick"
	>
		<view class="specification_popup">
			<view class="clear" @click="maskClick">
				<uni-icons type="close" size="24" color="#BCBCBC"></uni-icons>
			</view>
			<view class="head">
				<view class="cover_box">
					<image class="cover" :src="details.images[0]" mode="widthFix"></image>
				</view>
				<view class="content">
					<view class="price_box">
						<text class="symbol">￥</text>
						<text class="price">{{ price }}</text>
						<text class="primary_price">￥{{ details.market_price }}</text>
					</view>
					<view class="market">
						<view class="market_box">
							<text class="name">已售:</text>
							<text class="price">{{ details.sales_sum }}+</text>
						</view>
						<!-- <view class="market_box">
							<text class="name">库存:</text>
							<text class="price">269</text>
						</view> -->
					</view>
				</view>
			</view>
			<view class="line"></view>
			<view class="name">{{ specificationList.title }}</view>
			<view class="specification_select">
				<view
					class="specification_li"
					:class="{ active: index == specificationIndex }"
					v-for="(item, index) in specificationList.children"
					:key="item.id"
					@click="specificationChange(index, item.id)"
				>
					{{ item.title }}
				</view>
			</view>
			<view class="name">配送方式</view>
			<!-- is_self_take   0不限  1仅自提  2仅配送 -->
			<view class="delivery">
				<button
					class="delivery_select"
					:disabled="details.is_self_take == 1 || details.is_self_take == 2"
					:class="{ active: deliverySelectIndex == 2 }"
					@click="deliveryChange(2)"
				>
					<text class="circle"></text>
					<text class="text">物流配送</text>
				</button>
				<button
					class="delivery_select"
					:disabled="details.is_self_take == 1 || details.is_self_take == 2"
					:class="{ active: deliverySelectIndex == 1 }"
					@click="deliveryChange(1)"
				>
					<text class="circle"></text>
					<text class="text">门店自提</text>
				</button>
			</view>
			<view class="quantity">
				<view class="name">数量</view>
				<view class="quantity_box">
					<view class="icon" @click="deCrement">
						<i class="iconfont icon-jianhao"></i>
					</view>
					<view class="quantity_number">{{ quantity }}</view>
					<view class="icon" @click="inCrement">
						<i class="iconfont icon-jia"></i>
					</view>
				</view>
			</view>

			<view class="submit_btn">
				<button :class="isDisabled ? 'disabled_bg' : 'btn_bg'" :disabled="isDisabled" @click="submitOrderDebounce">确认并提交</button>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
import { onLoad, onPageScroll, onShareAppMessage } from '@dcloudio/uni-app';
import List from '@/pages/shopping/list.vue';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import useMenuButton from '../../hooks/useMenu.js';
import { orderDetails, shoppingSpecification, selectSpecification, getUserData, addCart } from '@/api/index.js';
import _ from 'underscore';

// 禁止页面滑动
const pageMeta = ref(false);
// 用户手机号
const mobile = ref(null);
// 用户会员等级
const grade = ref('');
// 登录弹窗
const login_show = ref(false);
// 轮播下标
const swiper_current = ref(1);
// 详情数据
const details = ref({});
// 商品价格
const price = ref(null);
// 默认价格
const defaultPrice = ref(null);
// 富文本样式
const contentStyle = ref({
	p: 'font-size:32rpx;line-height: 44rpx;',
	span: 'font-size: 30rpx'
});
// 规格
const specificationList = ref({});
// 规格下标
const specificationIndex = ref(null);
// 配送方式
const deliverySelectIndex = ref(null);
// 规格弹窗
const specificationRef = ref(null);
// 下单方式， 添加进购物车 add / 立即购买 immed
const typeOrder = ref('');

onLoad(async (load) => {
	console.log('load', load);
	if (load.id) {
		await getOrderDetails(load.id);
		await getUserDataFn();
	}
});

// 轮播切换
const swiperChange = (e) => {
	swiper_current.value = e.detail.current + 1;
};

// 搭配建议商品列表
const shopping_list = ref([
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: true,
		price: 130,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州',
		isPick: true,
		hot: true
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list3.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: false,
		price: 120,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州',
		isPick: true,
		hot: true
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list4.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: false,
		price: 110,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州',
		isPick: true,
		hot: true
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list5.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: false,
		price: 100,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州',
		isPick: true,
		hot: true
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list6.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: false,
		price: 180,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州',
		isPick: true,
		hot: true
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: true,
		price: 130,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州',
		isPick: true,
		hot: true
	}
]);

// 加入购物车
const addShoppingCart = () => {
	typeOrder.value = 'add';
	openSpecificationPopup('add');
};

// 立即购买
function openSpecificationPopup(typeOrder = 'immed') {
	// 打开登录弹窗
	if (!mobile.value) return show_login();
	// 下单方式
	if (typeOrder == 'immed') typeOrder.value = typeOrder;
	// 打开规格弹窗
	specificationRef.value.open();
	// 页面滑动
	pageMeta.value = true;
}

// 防抖规格弹窗
const specificationDebounce = _.debounce(openSpecificationPopup, 100);

// 打开登录弹窗
function show_login() {
	login_show.value = true;
	pageMeta.value = true;
}

// 点击弹窗遮罩，关闭弹窗
const maskClick = async (e) => {
	if (e && e.login == 'success') {
		await getUserDataFn();
	}
	specificationRef.value.close();
	login_show.value = false;
	pageMeta.value = false;
};

// 规格选择
const specificationChange = (i, id) => {
	if (specificationIndex.value == i) {
		specificationIndex.value = null;
		price.value = defaultPrice.value;
		return;
	}
	specificationIndex.value = i;
	getSelectSpecification(id);
};

// 配送方式
const deliveryChange = (index) => {
	if (deliverySelectIndex.value == index) {
		return (deliverySelectIndex.value = null);
	}
	deliverySelectIndex.value = index;
	console.log('配送方式', index);
};

// 购买数量
const quantity = ref(1);
const deCrement = () => {
	if (quantity.value <= 1) return;
	quantity.value -= 1;
};

const inCrement = () => {
	quantity.value += 1;
};

// 返回上一页
const left_return = () => {
	uni.navigateBack();
};

// 计算属性-是否能点击下单
const isDisabled = computed(() => {
	let flag = false;

	// 登录
	if (!mobile.value) flag = true;

	// 规格
	if (specificationIndex.value == null) flag = true;

	// 配送方式
	if (details.value.is_self_take == 0) {
		if (!deliverySelectIndex.value) {
			flag = true;
		}
	}

	return flag;
});

// 提交订单
const submitOrder = async () => {
	// deliverySelectIndex.value == 1 自提，deliverySelectIndex.value == 2 配送
	if (typeOrder.value == 'immed') {
		// 跳转订单详情 pages/order/details
	} else {
		uni.showToast({
			title: '加入购物车成功',
			icon: 'none',
			mask: true,
			duration: 2000,
			success: () => {
				popup_close();
			}
		});
	}
};

// 防抖下单
const submitOrderDebounce = _.debounce(submitOrder, 500);

// 跳转商品详情
const jump_order_details = () => {
	uni.navigateTo({
		url: '/pages/shopping/place_an_order'
	});
};

// 顶部区域滚动
const scrollTop = ref('white_default');
onPageScroll((e) => {
	if (e.scrollTop < 30) {
		scrollTop.value = 'white_default';
	}
	if (e.scrollTop > 30 && e.scrollTop < 60) {
		scrollTop.value = 'white_30';
	} else if (e.scrollTop > 60 && e.scrollTop < 100) {
		scrollTop.value = 'white_60';
	} else if (e.scrollTop > 100) {
		scrollTop.value = 'white_100';
	}
});

// 订单详情
const getOrderDetails = async (id) => {
	const res = await orderDetails({ id });
	console.log('订单详情', res);
	if (res.code == 1) {
		details.value = res.data;
		price.value = res.data.shop_price;
		defaultPrice.value = res.data.shop_price;
		deliverySelectIndex.value = res.data.is_self_take;
		await getShoppingSpecification(res.data.id, res.data.mod_id);
	}
};

// 商品规格
const getShoppingSpecification = async (id, mod_id) => {
	const res = await shoppingSpecification(id, mod_id);
	console.log('商品规格', res);
	if (res.code == 1) {
		specificationList.value = res.data[0];
	}
};

// 选中规格获取价格信息
const getSelectSpecification = async (id) => {
	console.log('id', id);
	if (!id) return;
	uni.showLoading({
		title: '加载中...'
	});
	const params = {
		goods_id: details.value.id,
		spec_ids: [id]
	};
	console.log('params', params);
	const res = await selectSpecification(params);
	console.log('选中规格获取价格信息', res);
	if (res.code == 1) {
		// 会员等级
		if (grade.value == '普通会员') {
			price.value = res.data.market_price;
		} else if (grade.value == 'SVIP') {
			price.value = res.data.svip_price;
		}
	}
	uni.hideLoading();
};

// 用户信息
const getUserDataFn = async () => {
	const res = await getUserData();
	console.log('用户信息', res);
	mobile.value = res.data.mobile;
	grade.value = res.data.grade;
};

// 转发分享
onShareAppMessage((res) => {
	if (res.from == 'button') {
		return {
			title: details.value.title
		};
	}
});

onMounted(() => {});

// 卸载
onUnmounted(() => {
	uni.removeStorageSync('pick_up_store');
});
</script>

<style lang="scss" scoped>
.white_default {
	background: transparent;
}
.white_30 {
	background: rgba(255, 255, 255, 0.3);
}
.white_60 {
	background: rgba(255, 255, 255, 0.6);
}
.white_100 {
	background: rgba(255, 255, 255, 1);
}

.swiper_wrap {
	position: relative;
	.serial_number {
		position: absolute;
		bottom: 86rpx;
		right: 30rpx;
		height: 50rpx;
		line-height: 50rpx;
		padding: 0 24rpx;
		background: rgba(0, 0, 0, 0.3);
		color: #fff;
		font-weight: 500;
		font-size: 24rpx;
		border-radius: 45rpx;
		.num {
			font-size: 28rpx;
			padding-right: 4rpx;
		}
	}

	.swiper_radius {
		background: #fff;
		border-radius: 40rpx 40rpx 0 0;
		height: 50rpx;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}
}
.swiper_banner {
	height: 750rpx;
	.cover {
		width: 100%;
		height: 750rpx;
	}

	::v-deep .wx-swiper-dots.wx-swiper-dots-horizontal {
		position: absolute;
		bottom: 86rpx;
	}

	::v-deep .wx-swiper-dots-horizontal .wx-swiper-dot {
		width: 45rpx;
		height: 8rpx;
		border-radius: 5rpx;
	}
}

.left_icon {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 30rpx;
	font-weight: 500;
	padding-right: 40rpx;
}

.main {
	padding: 0 30rpx;
	.head_price {
		display: flex;
		justify-content: space-between;

		.left {
			.price_box {
				color: #ff0000;
				font-weight: 700;
				font-size: 32rpx;
				padding-right: 20rpx;
				margin-bottom: 10rpx;

				.price {
					font-size: 42rpx;
					padding-right: 14rpx;
				}

				.primary_price {
					font-weight: 500;
					color: #cbcbcb;
					text-decoration: line-through;
				}
			}

			.quantity {
				font-size: 26rpx;
				color: #b1b1b1;
				font-weight: 500;
				.name {
					padding-right: 8rpx;
				}
			}
		}
		.right {
			display: flex;
			.box {
				margin-left: 40rpx;
				text-align: center;
				line-height: normal;
				background: none;
				padding: 0;

				.text {
					font-size: 24rpx;
					color: #565656;
					font-weight: 500;
				}
			}
		}
	}

	.title {
		font-size: 34rpx;
		font-weight: 600;
		color: #000;
		line-height: 44rpx;
		margin: 30rpx 0;
	}

	.specification {
		.sku {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 24rpx;
			background: #f8f8f8;
			border-radius: 12rpx;
			margin-bottom: 30rpx;
			.text {
				font-size: 26rpx;
				color: #000;
			}
		}
	}

	.serve {
		border-radius: 30rpx;
		box-shadow: 0 0 20rpx #a5a5a529;
		padding: 30rpx;
		.name {
			font-size: 30rpx;
			color: #434343;
			font-weight: 600;
			margin-bottom: 10rpx;
		}
		.hint {
			font-size: 26rpx;
			color: #000;
			padding: 10rpx 0;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			.text {
				padding-left: 8rpx;
			}
		}
		.line {
			margin: 30rpx 0;
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		}
		.place {
			padding-top: 20rpx;
			.place_btn {
				display: inline-block;
				padding: 14rpx 26rpx;
				font-size: 26rpx;
				color: #fff;
				font-weight: 500;
				background: linear-gradient(92.65deg, #ff8992 0%, #fdba80 100%);
				border-radius: 24rpx;
				margin-right: 30rpx;
			}

			.text {
				font-size: 26rpx;
				color: #000;
			}
		}
	}
}

.rich_box {
	margin-top: 60rpx;
}

.match {
	// background: #f8f8f8;
	padding: 40rpx 15rpx 0;
	.btn {
		width: 280rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 25rpx 5rpx;
		margin: auto;
		text-align: center;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #fff;
		font-weight: 500;
		position: relative;
		margin-bottom: 20rpx;
		&::before {
			content: '';
			position: absolute;
			bottom: 12rpx;
			width: 56rpx;
			height: 4rpx;
			border-radius: 2rpx;
			background: #fff;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.match_swiper {
		margin-top: 60rpx;
		height: 434rpx;
		.swiper-item {
			padding: 0 15rpx;

			.item {
				box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
				border-radius: 12rpx;
				overflow: hidden;
			}
			.cover_box {
				.cover {
					width: 100%;
					height: 300rpx;
				}
			}
			.content {
				background: #fff;
				padding: 20rpx 15rpx;
				height: 128rpx;
				.title {
					font-size: 28rpx;
					font-weight: 600;
				}
				.price_box {
					color: #ff0000;
					font-weight: 600;
					font-size: 24rpx;
					padding-right: 20rpx;
					padding-top: 10rpx;
					.price {
						font-size: 28rpx;
						padding-right: 10rpx;
					}

					.primary_price {
						font-weight: 500;
						color: #cbcbcb;
						text-decoration: line-through;
					}
				}
			}
		}
	}
}

.bottom_cart_navigation {
	position: fixed;
	z-index: 10;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: 30rpx 30rpx 70rpx;
	display: flex;
	justify-content: space-between;
	box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
	background: #fff;
	.btn {
		width: 330rpx;
		background: #fdb681;
		overflow: hidden;
		border-radius: 40rpx;
		button {
			background: none;
			height: 80rpx;
			font-size: 30rpx;
			font-weight: 500;
			color: #fff;
			&::after {
				border: none;
			}
		}
	}

	.btn:nth-child(2) {
		background: #ff8992;
	}
}

.specification_popup {
	padding: 60rpx 30rpx 0;
	position: relative;

	.clear {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
		padding: 0 0 30rpx 30rpx;
	}

	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.cover_box {
			.cover {
				width: 180rpx;
				height: 180rpx;
				border-radius: 12rpx;
			}
		}

		.content {
			flex: 1;
			padding-left: 30rpx;
			.price_box {
				color: #ff0000;
				font-weight: 600;
				font-size: 32rpx;
				padding-right: 20rpx;
				padding-top: 10rpx;
				.price {
					font-size: 42rpx;
					padding-right: 20rpx;
				}

				.primary_price {
					font-weight: 500;
					color: #cbcbcb;
					text-decoration: line-through;
				}
			}

			.market {
				font-size: 26rpx;
				color: #b1b1b1;
				font-weight: 500;
				display: flex;
				align-items: center;
				padding-top: 16rpx;
				padding-left: 10rpx;
				.market_box {
					padding-right: 26rpx;
				}
				.name {
					padding-right: 8rpx;
					font-weight: 500;
				}
			}
		}
	}

	.line {
		margin: 40rpx 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.name {
		font-size: 30rpx;
		font-weight: 600;
		margin-bottom: 24rpx;
	}

	.specification_select {
		margin-bottom: 30rpx;
		display: flex;
		flex-wrap: wrap;
		.specification_li {
			margin: 0 20rpx 20rpx 0;
			border-radius: 4px;
			background: #f8f8f8;
			padding: 16rpx 20rpx;
			font-size: 24rpx;
			line-height: 34rpx;
			color: #000;
			font-weight: 500;
			min-width: 210rpx;
			text-align: center;
			border: 1px solid transparent;
			transition: 0.3s ease;
		}
		.active {
			border-color: #ff0000;
			color: #ff0000;
		}
	}

	.delivery {
		display: flex;
		justify-content: space-between;
		.delivery_select {
			width: 330rpx;
			height: 80rpx;
			border-radius: 14rpx;
			background: #f8f8f8;
			padding: 0 20rpx;
			display: flex;
			align-items: center;
			.circle {
				box-sizing: border-box;
				display: inline-block;
				width: 30rpx;
				height: 30rpx;
				background: #fff;
				border-radius: 50%;
				border: 8rpx solid #fff;
			}
			.text {
				font-size: 24rpx;
				font-weight: 500;
				padding-left: 10rpx;
			}
		}

		.active {
			.circle {
				border-color: #fdb681;
			}
		}
	}

	.quantity {
		padding: 30rpx 0 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.name {
			margin-bottom: 0;
		}
		.quantity_box {
			display: flex;
			align-items: center;
			.icon {
				width: 40rpx;
				height: 40rpx;
				line-height: 40rpx;
				text-align: center;
				line-height: 40rpx;
				background: #d8d8d8;
				border-radius: 8rpx;
				.iconfont {
					font-size: 24rpx;
					color: #000;
					font-weight: 600;
				}
			}

			.quantity_number {
				min-width: 80rpx;
				text-align: center;
			}
		}
	}

	.submit_btn {
		button {
			height: 100rpx;
			line-height: 100rpx;
			font-size: 30rpx;
			color: #fff;
			font-weight: bold;
			border-radius: 50rpx;
		}
	}
}
</style>
