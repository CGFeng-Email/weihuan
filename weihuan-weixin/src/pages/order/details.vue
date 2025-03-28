<template>
	<view class="main">
		<view class="wrap" v-if="!noRights">
			<!-- 收货地址 -->
			<view class="user_location box_shadow box_border_radius" v-if="deliveryType == 10 && address.id">
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
			<view class="store_box card_box box_border_radius box_shadow" v-else-if="deliveryType == 20 && store.id">
				<view class="title">自提点</view>
				<view class="store_info">
					<image class="cover box_border_radius" :src="store.image" mode="aspectFill"></image>
					<view class="content">
						<view class="store_top">
							<view class="title over2">
								{{ store.title }}
							</view>
						</view>
						<view class="store_bottom">
							<view class="lis">
								<text class="name">联系人：</text>
								<text class="text">{{ store.contact }}</text>
							</view>
							<view class="lis">
								<text class="name">联系电话：</text>
								<text class="text">{{ store.phone }}</text>
							</view>
							<view class="lis">
								<text class="name">营业时间：</text>
								<text class="text">{{ store.open_hours }}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="address">
					<view class="location over2">
						{{ store.address }}
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
								<view class="quantity_number">x{{ item.goods_num }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="card_box box_border_radius box_shadow">
				<view class="title">订单信息</view>
				<view class="order_details">
					<view class="li" v-if="orderSn">
						<view class="name">订单编号</view>
						<view class="val">{{ orderSn }}</view>
					</view>
					<view class="li" v-if="orderTime">
						<view class="name">下单时间</view>
						<view class="val">{{ orderTime }}</view>
					</view>
					<view class="li" v-if="status">
						<view class="name">订单状态</view>
						<view class="val">{{ status }}</view>
					</view>
					<view class="li" v-if="paymentType">
						<view class="name">支付方式</view>
						<view class="val">{{ paymentType }}</view>
					</view>
					<view class="li" v-if="userName">
						<view class="name">用户名称</view>
						<view class="val">{{ userName }}</view>
					</view>
					<view class="li" v-if="textarta">
						<view class="name">订单备注</view>
						<view class="val">{{ textarta }}</view>
					</view>
					<view class="li" v-if="orderFreight">
						<view class="name">配送费</view>
						<view class="val price_text">￥{{ orderFreight }}</view>
					</view>
					<view class="li" v-if="orderPrice">
						<view class="name">订单金额</view>
						<view class="val price_text">￥{{ orderPrice }}</view>
					</view>
				</view>
			</view>

			<Bottom title="确认核销" v-if="codeSn && isCancel == 0" @bottom_click="confirmVerification" />
		</view>
		<!-- 没权限 -->
		<view class="no_rights" v-else>
			<view class="cover_box">
				<image class="cover" src="/static/img/empty_rights.png" mode="widthFix"></image>
			</view>
			<view class="lead">没有找到相关订单，请核查收货自提点后到对应自提点进行核销</view>
		</view>
	</view>
</template>

<script setup>
import Bottom from '@/pages/component/bottom.vue';
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { orderDetails, orderVerification, scanCode } from '@/api/index.js';

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
// 收货人
const userName = ref('');
// 支付方式
const paymentType = ref('');
// 没权限
const noRights = ref(false);
// 核销码订单号
const codeSn = ref('');
// 核销状态 0:未核销, 1:已核销
const isCancel = ref(0);

onLoad((load) => {
	console.log(load);
	orderId.value = load.orderId;
	codeSn.value = load.codeSn;
	getOrderDetails();
});

// 订单详情
const getOrderDetails = async () => {
	if (codeSn.value) {
		// 核销订单详情，只有核销扫码获取的订单详情数据才能查看别人的订单
		var resultData = await scanCode({
			order_sn: codeSn.value
		});
	} else {
		// 订单详情
		var resultData = await orderDetails({
			order_id: orderId.value
		});
	}
	console.log('订单详情', resultData);
	if (resultData.code == 1) {
		deliveryType.value = resultData.data.delivery_type;
		address.value = resultData.data.address;
		store.value = resultData.data.store;
		shoppingList.value = resultData.data.order_goods;
		textarta.value = resultData.data.buyer_remark;
		orderFreight.value = resultData.data.express_price;
		couponPrice.value = resultData.data.coupon_money;
		totalPrice.value = resultData.data.total_price;
		status.value = resultData.data.status_name;
		orderTime.value = resultData.data.add_at;
		orderSn.value = resultData.data.order_sn;
		orderPrice.value = resultData.data.pay_price;
		userName.value = resultData.data.real_name;
		paymentType.value = resultData.data.pay_type_name;
		isCancel.value = resultData.data.is_extract;
	} else {
		noRights.value = true;
	}
};

// 使用应用内置地图查看位置
const openLocation = (latitude, longitude) => {
	uni.openLocation({
		latitude: Number(store.value.latitude),
		longitude: Number(store.value.longitude),
		address: store.value.address,
		name: store.value.title
	});
};

// 确认核销
const confirmVerification = () => {
	uni.showModal({
		content: '确定核销订单吗？',
		success: async (res) => {
			if (res.confirm) {
				const params = {
					order_id: orderId.value
				};
				const getCode = await orderVerification(params);
				console.log('确认核销', getCode);
				if (getCode.code == 1) {
					uni.showToast({
						title: getCode.msg,
						icon: 'none',
						mask: true,
						duration: 1000,
						complete: () => {
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/order/me_cancel'
								});
							}, 1000);
						}
					});
				} else {
					uni.showToast({
						title: getCode.msg,
						icon: 'none',
						mask: true,
						duration: 1000
					});
				}
			}
		}
	});
};
</script>

<style lang="scss" scoped>
.main {
	padding: 30rpx 30rpx 200rpx;
}

.card_box {
	.li {
		.name {
			flex: none;
		}
		.val {
			padding-left: 80rpx;
			text-align: right;
		}
		.price_text {
			color: #ff0000;
			font-weight: bold;
		}
	}
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
			.store_top {
				.title {
					font-size: 28rpx;
					line-height: 38rpx;
					font-weight: bold;
					padding-bottom: 0;
				}

				.distance {
					font-size: 24rpx;
					line-height: 34rpx;
					padding: 10rpx 0;
				}
			}

			.store_bottom {
				padding-top: 20rpx;
				.lis {
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
			line-height: 34rpx;
			color: #999999;
			flex: 1;
			margin-top: 6rpx;
			padding-right: 20rpx;
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
				}
			}
		}
	}
}

.no_rights {
	text-align: center;
	.cover_box {
		margin-bottom: 20rpx;
	}

	.lead {
		font-size: 32rpx;
		line-height: 1.5;
		font-weight: 500;
	}
}
</style>
