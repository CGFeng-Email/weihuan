<template>
	<view class="main">
		<!-- 收货地址 -->
		<view class="user_location box_shadow box_border_radius" v-if="deliveryType == 10">
			<view class="content" @click="open_address">
				<view class="head">
					<text class="title">{{ address.real_name || address.consignee }}</text>
					<text class="phone">{{ address.mobile }}</text>
				</view>
				<view class="address">{{ address.province + address.city + address.district + address.address }}</view>
			</view>
			<uni-icons type="right" size="18"></uni-icons>
		</view>

		<!-- 自提点 -->
		<view class="store_box card_box box_border_radius box_shadow" v-if="deliveryType == 20">
			<view class="title">自提点</view>
			<view class="store_info">
				<image class="cover" :src="store.image" mode="aspectFill"></image>
				<view class="content">
					<view class="store_top">
						<view class="title over2">
							{{ store.callout.content }}
						</view>
						<view class="distance">
							{{ store.distance }}
						</view>
					</view>
					<view class="store_bottom">
						<view class="li">
							<text class="name">联系人：</text>
							<text class="text">{{ store.store }}</text>
						</view>
						<view class="li">
							<text class="name">联系电话：</text>
							<text class="text">{{ store.mobile }}</text>
						</view>
						<view class="li">
							<text class="name">营业时间：</text>
							<text class="text">{{ store.date }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="address">
				<view class="location over2">
					{{ store.title }}
				</view>
				<view class="location_btn btn_bg" @click.stop="openLocation">
					<text class="iconfont icon-dizhi"></text>
					<text class="text">导航</text>
				</view>
			</view>
		</view>

		<!-- 商品列表 -->
		<view class="shopping_list">
			<view class="shopping box_shadow box_border_radius" v-for="(item, index) in shoppingList" :key="item.id">
				<image class="cover box_border_radius" :src="item.image" mode="aspectFill"></image>
				<view class="content">
					<view class="shopping_top">
						<view class="title over2">{{ item.goods_name }}</view>
						<view class="spec">
							<text>{{ item.key_name }}</text>
						</view>
					</view>
					<view class="shopping_bottom">
						<view class="price_box">
							<text class="symbol">￥</text>
							<text class="price">{{ item.price }}</text>
							<text class="primary_price">￥{{ item.market_price }}</text>
						</view>
						<view class="quantity_box">
							<view class="icon">
								<i class="iconfont icon-jianhao"></i>
							</view>
							<view class="quantity_number">{{ item.goods_num }}</view>
							<view class="icon">
								<i class="iconfont icon-jia"></i>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="card_box box_border_radius box_shadow">
			<view class="title">订单信息</view>
			<view class="order_details">
				<view class="li">
					<view class="name">订单编号</view>
					<view class="val">{{ orderSn }}</view>
				</view>
				<view class="li">
					<view class="name">下单时间</view>
					<view class="val">{{ orderTime }}</view>
				</view>
				<view class="li">
					<view class="name">订单状态</view>
					<view class="val">{{ status }}</view>
				</view>
				<view class="li">
					<view class="name">配送费</view>
					<view class="val">{{ orderFreight }}</view>
				</view>
				<view class="li">
					<view class="name">订单备注</view>
					<view class="val">{{ textarta }}</view>
				</view>
				<view class="li">
					<view class="name">订单金额</view>
					<view class="val">￥{{ orderPrice }}</view>
				</view>
			</view>
		</view>

		<Bottom title="确认核销" v-if="head_title_index == 1 && item.status == 10 && item.pay_status == 20 && item.delivery_type == 20" />
	</view>
</template>

<script setup>
import Bottom from '@/pages/component/bottom.vue';
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { orderDetails } from '@/api/index.js';

// 订单id
const orderId = ref('');
// openid
const openid = ref('');
// 配送方式 10物流配送 20上门自提
const deliveryType = ref(null);
// 配送地址
const address = ref({});
// 自提地址
const store = ref({});
// 商品列表
const shoppingList = ref([]);
// 备注
const textarta = ref('');
// 订单运费
const orderFreight = ref(0);
// 优惠券金额
const couponPrice = ref(0);
// 总计价格
const totalPrice = ref(null);
// 订单编号
const orderSn = ref('');
// 订单状态
const status = ref('');
// 下单时间
const orderTime = ref('');
// 订单金额
const orderPrice = ref('');

onLoad((load) => {
	console.log(load);
	orderId.value = load.orderId;
	getOrderDetails();
});

// 订单详情
const getOrderDetails = async () => {
	const params = {
		order_id: orderId.value
	};
	const res = await orderDetails(params);
	console.log('订单详情', res);
	if (res.code == 1) {
		deliveryType.value = res.data.delivery_type;
		address.value = res.data.address;
		store.value = res.data.store;
		shoppingList.value = res.data.order_goods;
		textarta.value = res.data.buyer_remark;
		orderFreight.value = res.data.express_price;
		couponPrice.value = res.data.coupon_money;
		totalPrice.value = res.data.total_price;
		status.value = res.data.status_name;
		orderTime.value = res.data.add_at;
		orderSn.value = res.data.order_sn;
		orderPrice.value = res.data.pay_price;
	}
};

// 使用应用内置地图查看位置
const openLocation = (latitude, longitude) => {
	uni.openLocation({
		latitude: store.value.latitude,
		longitude: store.value.longitude,
		address: store.value.title,
		name: store.value.callout.content
	});
};
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

.user_location {
	background: #fff;
	padding: 24rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24rpx;
	.content {
		flex: 1;
		.head {
			.title {
				font-size: 30rpx;
				font-weight: 600;
			}

			.phone {
				font-size: 26rpx;
				padding-left: 20rpx;
				font-weight: 600;
			}
		}
		.address {
			font-size: 28rpx;
			line-height: 38rpx;
			color: #919191;
			margin-top: 10rpx;
		}
	}

	.icon {
		flex: none;
	}
}

.store_box {
	.store_info {
		display: flex;
		justify-content: space-between;

		.cover {
			width: 210rpx;
			height: 210rpx;
			flex: none;
		}

		.content {
			flex: 1;
			padding-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.store_top {
				display: flex;
				justify-content: space-between;
				.title {
					font-size: 28rpx;
					font-weight: bold;
					flex: 1;
				}

				.distance {
					font-size: 24rpx;
					color: #c2c2c2;
					flex: none;
				}
			}

			.store_bottom {
				.li {
					font-size: 24rpx;
					color: #999999;
					line-height: 34rpx;
					margin-bottom: 8rpx;
				}
			}
		}
	}

	.address {
		margin-top: 20rpx;
		padding-top: 20rpx;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: space-between;
		.location {
			font-size: 24rpx;
			color: #999999;
			flex: 1;
			margin-top: 6rpx;
		}

		.location_btn {
			flex: none;
			width: 124rpx;
			height: 52rpx;
			line-height: 52rpx;
			text-align: center;
			font-size: 24rpx;
			color: #fff;
			border-radius: 45rpx;
			.iconfont {
				font-size: 24rpx;
				padding-right: 8rpx;
			}
		}
	}
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
					padding: 0 20rpx;
				}
			}
		}
	}
}
</style>
