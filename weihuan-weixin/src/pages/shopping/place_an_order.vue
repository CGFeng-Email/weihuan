<!-- 在线下单 -->
<template>
	<!-- 打开弹窗时，禁止滑动页面，必须要在第一个节点 -->
	<page-meta :page-style="'overflow:' + (pageMeta ? 'hidden' : 'visible')"></page-meta>
	<!-- 顶部到胶囊的高度 -->
	<view class="top" :class="scrollTop" :style="{ height: useMenuButton().top }"></view>
	<!-- 标题 -->
	<uni-transition mode-class="fade" :show="loading">
		<view class="page_title" :class="scrollTop" :style="{ top: useMenuButton().top, height: useMenuButton().height, 'line-height': useMenuButton().height }">
			<view class="left_icon" @click="left_return">
				<uni-icons type="left" size="24" :color="scrollTop == 'white_default' ? '#fff' : '#000'"></uni-icons>
			</view>
			{{ scrollTop != 'white_default' ? '产品详情' : '' }}
		</view>
	</uni-transition>

	<!-- 轮播图 -->
	<uni-transition mode-class="fade" :show="loading">
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
				<block v-for="item in swiper_list" :key="item.src">
					<swiper-item class="swiper-item">
						<image class="cover" :src="item.src" mode="widthFix"></image>
					</swiper-item>
				</block>
			</swiper>
			<!-- 数字 -->
			<view class="serial_number">
				<text class="num">0{{ swiper_current }}</text>
				<text>/0{{ swiper_list.length + 1 }}</text>
			</view>
			<!-- 底部圆角 -->
			<view class="swiper_radius"></view>
		</view>
	</uni-transition>

	<view class="main">
		<view class="head_price">
			<view class="left">
				<view class="price_box">
					<text class="symbol">￥</text>
					<text class="price">{{ priceToFixed(332) }}</text>
					<text class="primary_price">￥{{ priceToFixed(180) }}</text>
				</view>
				<view class="quantity">
					<text class="name">已售:</text>
					<text class="price">1000+</text>
				</view>
			</view>
			<view class="right">
				<view class="box">
					<view class="icon">
						<i class="iconfont icon-fenxiang"></i>
					</view>
					<view class="text">分享</view>
				</view>
				<view class="box">
					<view class="icon">
						<i class="iconfont icon-shoucang-1"></i>
					</view>
					<view class="text">收藏</view>
				</view>
			</view>
		</view>
		<view class="title">提拉米苏罐子蛋糕盒子慕斯罐小蛋糕下午茶零食抹茶巧克力</view>
		<view class="specification">
			<view class="sku" @click="open_specification('add')">
				<text class="text">【6罐】原味*3+雪域牛乳*3</text>
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
			<view class="name">商品服务</view>
			<view class="place">
				<text class="place_btn">下单满减</text>
				<text class="text">每满1000元减100元</text>
			</view>
		</view>
	</view>
	<view class="order_list">
		<image class="cover" src="https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/order_details.jpg" mode="widthFix"></image>
	</view>
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
			<button @click="open_specification('add')">加入购物车</button>
		</view>
		<view class="btn">
			<button @click="open_specification('immed')">立即购买</button>
		</view>
	</view>
	<!-- 底部购物车 - 占位 -->
	<view style="height: 240rpx"></view>

	<!-- 规格弹窗 -->
	<uni-popup ref="openId" type="bottom" border-radius="15px 15px 0 0" is-mask-click background-color="#fff" mask-background-color="rgba(0,0,0,.7)" @change="popup_change">
		<view class="specification_popup">
			<view class="clear" @click="popup_close">
				<uni-icons type="close" size="24" color="#BCBCBC"></uni-icons>
			</view>
			<view class="head">
				<view class="cover_box">
					<image class="cover" src="https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/product_banner1.png" mode="aspectFill"></image>
				</view>
				<view class="content">
					<view class="price_box">
						<text class="symbol">￥</text>
						<text class="price">{{ priceToFixed(332) }}</text>
						<text class="primary_price">￥{{ priceToFixed(180) }}</text>
					</view>
					<view class="market">
						<view class="market_box">
							<text class="name">已售:</text>
							<text class="price">1000+</text>
						</view>
						<view class="market_box">
							<text class="name">库存:</text>
							<text class="price">269</text>
						</view>
					</view>
				</view>
			</view>
			<view class="line"></view>
			<view class="name">规格属性</view>
			<view class="specification_select">
				<view
					class="specification_li"
					:class="{ active: index == specificationIndex }"
					v-for="(item, index) in specificationList"
					:key="item.value"
					@click="specificationChange(index)"
				>
					{{ item.text }}
				</view>
			</view>
			<view class="name">配送方式</view>
			<view class="delivery">
				<view class="delivery_select" :class="{ active: deliveryIndex == 0 }" @click="deliveryChange(0)">
					<text class="circle"></text>
					<text class="text">物流配送</text>
				</view>
				<view class="delivery_select" :class="{ active: deliveryIndex == 1 }" @click="deliveryChange(1)">
					<text class="circle"></text>
					<text class="text">门店自提</text>
				</view>
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
				<button class="btn_bg" @click="submit_order">确认并提交</button>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
// 列表组件
import List from '@/pages/shopping/list.vue';
import { ref, onMounted, computed, onUnmounted } from 'vue';
//onPageScroll:滚动事件
import { onPageScroll } from '@dcloudio/uni-app';
// 胶囊信息
import useMenuButton from '../../hooks/useMenu.js';

const loading = ref(false);
const swiper_current = ref(1);

const swiper_list = ref([
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/product_banner1.png'
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/product_banner1.png'
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/product_banner1.png'
	}
]);

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

// 轮播切换
const swiperChange = (e) => {
	swiper_current.value = e.detail.current + 1;
};

// 计算属性金额后面补.00
const priceToFixed = computed(() => {
	return (e) => {
		const priceNumber = e + '.00';
		return priceNumber;
	};
});

// 打开规格弹窗
const openId = ref(null);
const pageMeta = ref(false);
const confirmType = ref('add');
const open_specification = (e) => {
	confirmType.value = e;
	openId.value.open();
};

// 打开弹窗时，禁止页面滚动
const popup_change = (e) => {
	pageMeta.value = e.show;
};

// 关闭规格弹窗
const popup_close = () => {
	openId.value.close();
};

// 规格列表
const specificationIndex = ref(0);
const specificationList = ref([
	{
		value: 0,
		text: '【6罐】原味+雪域牛乳'
	},
	{
		value: 1,
		text: '【6罐】原味*3+雪域牛乳*3'
	},
	{
		value: 2,
		text: '【6罐】原味+雪域牛乳'
	},
	{
		value: 3,
		text: '【6罐】原味*3+雪域牛乳*3'
	},
	{
		value: 4,
		text: '【10罐】原味*5+雪域牛乳*5'
	}
]);

// 规格属性
const specificationChange = (i) => {
	console.log(i);
	specificationIndex.value = i;
};

// 配送方式 配送：0，自提：1
const deliveryIndex = ref(0);
// 获取是否有自提点信息，有数据则默认以自提点方式进行配送，没有则物流配送
const pick_up_store = uni.getStorageSync('pick_up_store');
console.log('pick_up_store', pick_up_store);
if (Object.keys(pick_up_store).length > 0) {
	deliveryIndex.value = 1;
}
const deliveryChange = (i) => {
	deliveryIndex.value = i;
};

// 卸载
onUnmounted(() => {
	uni.removeStorageSync('pick_up_store');
});

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

// 提交订单
const submit_order = () => {
	if (confirmType.value == 'immed') {
		const params = {
			deliveryIndex: deliveryIndex.value,
			pick_up_store: pick_up_store
		};
		uni.navigateTo({
			url: `/pages/shopping/confirm_an_order?params=${JSON.stringify(params)}`
		});
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

onMounted(() => {
	loading.value = true;
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
				padding-left: 40rpx;
				text-align: center;
				.iconfont {
					font-size: 36rpx;
					font-weight: 500;
					color: #565656;
				}
				.text {
					font-size: 24rpx;
					color: #565656;
					font-weight: 500;
					padding-top: 6rpx;
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

.order_list {
	margin-top: 60rpx;
	image {
		width: 100%;
	}
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
				padding: 0 24rpx;
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
