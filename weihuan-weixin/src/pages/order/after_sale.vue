<!-- 申请售后 -->
<template>
	<view class="main">
		<!-- 订单状态 -->
		<view class="order_status card_box box_shadow box_border_radius">
			<view class="lead">订单状态</view>
			<view class="title">{{ orderStatus }}</view>
			<view class="lead">订单编号：{{ orderSn }}</view>
		</view>

		<!-- 商品列表 -->
		<view class="shopping_list">
			<view class="shopping box_shadow box_border_radius">
				<image class="cover box_border_radius" :src="goods.image" mode="aspectFill"></image>
				<view class="content">
					<view class="shopping_top">
						<view class="title over2">{{ goods.goods_name }}</view>
						<view class="spec">
							<text>{{ goods.key_name }}</text>
						</view>
					</view>
					<view class="shopping_bottom">
						<view class="price_box">
							<text class="symbol">￥</text>
							<text class="price">{{ goods.price }}</text>
							<text class="primary_price">￥{{ goods.market_price }}</text>
						</view>
						<view class="quantity_box">
							<view class="quantity_number">x{{ goods.goods_num }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="service_type card_box box_border_radius box_shadow">
			<view class="title">选择服务类型</view>
			<view class="ul">
				<block v-for="(item, index) in service_list" :key="item.type">
					<view class="serve_li" @click="openService(item.type)">
						<image class="cover" :src="item.image" mode="aspectFill"></image>
						<view class="content">
							<view class="name">{{ item.name }}</view>
							<view class="lead">{{ item.lead }}</view>
						</view>
						<uni-icons type="right" size="18" color="#A8A8A8"></uni-icons>
					</view>
				</block>
			</view>
		</view>

		<view class="tips">提醒：不影响二次销售，可享受7天无理由退换货。</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { orderDetails, applyFor } from '@/api/index.js';

// 订单id
const orderId = ref('');
// 商品id
const goodsId = ref('');
// 订单状态
const orderStatus = ref('');
// 订单号
const orderSn = ref('');
// 运费
const orderFreight = ref(0);

// 售后商品
const goods = ref({});
// 售后服务
const service_list = ref([
	{
		type: 30,
		image: '/static/img/service_price.png',
		name: '我要退款（无需退货）',
		lead: '没收到货，或与卖家协商同意不用退货只退款'
	},
	{
		type: 10,
		image: '/static/img/retreat.png',
		name: '我要退货退款',
		lead: '已收到货，需要退还收到的货物'
	},
	{
		type: 20,
		image: '/static/img/exchange.png',
		name: '我要换货',
		lead: '已收到货，需要更换收到的货物'
	}
]);

// 订单详情
const getOrderDetails = async () => {
	const params = {
		order_id: orderId.value
	};
	const res = await orderDetails(params);
	console.log('订单详情', res);
	if (res.code == 1) {
		orderStatus.value = res.data.status_name;
		orderSn.value = res.data.order_sn;
		orderFreight.value = res.data.express_price;
	}
};

// 跳转售后页面
function openService(type) {
	uni.navigateTo({
		url: `/pages/order/retreat?goodsId=${goodsId.value}&type=${type}&orderFreight=${orderFreight.value}&goods=${JSON.stringify(goods.value)}`
	});
}

onLoad(async (load) => {
	console.log('load', load);
	orderId.value = load.orderId;
	goodsId.value = load.goodsId;
	goods.value = JSON.parse(load.item);

	await getOrderDetails();
});
</script>

<style>
page {
	background: #fbfbfb;
}
</style>

<style lang="scss" scoped>
.main {
	padding: 30rpx;
}

.service_type {
	.ul {
		.serve_li {
			padding: 20rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.cover {
				width: 70rpx;
				height: 70rpx;
				flex: none;
			}

			.content {
				flex: 1;
				padding: 0 30rpx;
				.name {
					font-size: 28rpx;
					font-weight: 500;
					padding: 7rpx 0;
				}

				.lead {
					font-size: 24rpx;
					line-height: 34rpx;
					color: #b8b8b8;
					padding: 7rpx 0;
				}
			}
		}
	}
}

.tips {
	font-size: 24rpx;
	text-align: center;
	color: #9c9c9c;
}

.shopping {
	padding: 24rpx;
	background: #fff;
	margin-bottom: 24rpx;
	display: flex;
	justify-content: space-between;
	.cover {
		width: 190rpx;
		height: 190rpx;
		flex: none;
	}

	.content {
		flex: 1;
		padding-left: 24rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.shopping_top {
			.title {
				font-size: 30rpx;
				line-height: 40rpx;
				font-weight: 600;
			}

			.spec {
				font-size: 24rpx;
				color: #acacac;
				padding-top: 10rpx;
			}

			.store_count {
				padding-left: 20rpx;
			}
		}

		.shopping_bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.price_box {
				color: #ff0000;
				font-weight: 600;
				font-size: 24rpx;
				padding-right: 10rpx;
				.price {
					font-size: 34rpx;
					padding-right: 10rpx;
				}

				.primary_price {
					font-weight: 500;
					color: #cbcbcb;
					text-decoration: line-through;
				}
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
				}
			}
		}
	}
}
</style>
