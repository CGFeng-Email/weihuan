<!-- 确认订单 -->
<template>
	<view class="main">
		<!-- 自提，自提店家信息 -->
		<view class="store box_shadow box_border_radius">
			<view class="head">
				<image class="cover box_border_radius" src="https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/product_banner1.png" mode="aspectFill"></image>
				<view class="content">
					<view class="store_top">
						<view class="title">天河鲜肉生鲜自提点</view>
						<view class="distance">200m</view>
					</view>
					<view class="store_bottom">
						<view class="left_bottom">
							<view class="lead">联系人：张先生</view>
							<view class="lead">联系电话：13636986542</view>
							<view class="lead">营业时间：09:00 - 23:00</view>
						</view>
						<uni-icons type="right" size="18"></uni-icons>
					</view>
				</view>
			</view>
			<view class="select_address">
				<view class="location_name">地址：{{ location_name }}</view>
				<view class="open_location btn_bg" @click="open_location">
					<text class="iconfont icon-dizhi"></text>
					<text class="address_text">导航</text>
				</view>
			</view>
		</view>

		<!-- 用户信息，地址 -->
		<view class="user_location box_shadow box_border_radius">
			<view class="content">
				<view class="head">
					<text class="title">谷志华</text>
					<text class="phone">{{ userMobileComputed(13428198877) }}</text>
				</view>
				<view class="address">{{ location_name }}</view>
			</view>
			<uni-icons type="right" size="18"></uni-icons>
		</view>

		<!-- 商品 -->
		<view class="shopping box_shadow box_border_radius">
			<image class="cover box_border_radius" src="https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/product_banner1.png" mode="aspectFill"></image>
			<view class="content">
				<view class="shopping_top">
					<view class="title over2">盒子慕斯罐小蛋糕</view>
					<view class="spec">原味*3+雪域牛乳*3</view>
				</view>
				<view class="shopping_bottom">
					<view class="price_box">
						<text class="symbol">￥</text>
						<text class="price">{{ priceToFixed(332) }}</text>
						<text class="primary_price">￥{{ priceToFixed(180) }}</text>
					</view>
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
			</view>
		</view>
		<view class="shopping box_shadow box_border_radius">
			<image class="cover box_border_radius" src="https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/product_banner1.png" mode="aspectFill"></image>
			<view class="content">
				<view class="shopping_top">
					<view class="title over2">盒子慕斯罐小蛋糕</view>
					<view class="spec">原味*3+雪域牛乳*3</view>
				</view>
				<view class="shopping_bottom">
					<view class="price_box">
						<text class="symbol">￥</text>
						<text class="price">{{ priceToFixed(332) }}</text>
						<text class="primary_price">￥{{ priceToFixed(180) }}</text>
					</view>
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
			</view>
		</view>

		<!-- 规格列表 -->
		<view class="specification_list box_shadow box_border_radius">
			<view class="li">
				<view class="name">购买服务</view>
				<view class="right lead">摔坏包赔 / 7天无理由退货 / 商品冷链运输</view>
			</view>
			<view class="li">
				<view class="name">是否需要发票</view>
				<view class="right lead">
					<view class="invoice">
						<view class="select" :class="{ active: deliveryIndex == 0 }" @click="deliveryChange(0)">
							<text class="circle"></text>
							<text class="text">不需要</text>
						</view>
						<view class="select" :class="{ active: deliveryIndex == 1 }" @click="deliveryChange(1)">
							<text class="circle"></text>
							<text class="text">需要</text>
						</view>
					</view>
				</view>
			</view>
			<view class="li email_li">
				<view class="name">电子邮箱</view>
				<view class="right lead">
					<view class="email">
						<uni-easyinput
							v-model="email"
							trim
							:inputBorder="false"
							primaryColor="#A2A2A2"
							placeholder="请填写您的电子邮箱"
							placeholderStyle="#A2A2A2"
							@input="emailInput"
						></uni-easyinput>
					</view>
				</view>
			</view>
			<view class="li">
				<view class="name">优惠卷</view>
				<view class="right lead coupon">-¥{{ priceToFixed(50) }}</view>
			</view>
			<view class="li">
				<view class="name">订单备注</view>
				<view class="right">
					<view class="textarea_box">
						<uni-easyinput
							type="textarea"
							v-model="textarta"
							trim
							:inputBorder="false"
							primaryColor="#A2A2A2"
							placeholder="请填写您的备注内容"
							placeholderStyle="#A2A2A2"
						></uni-easyinput>
					</view>
				</view>
			</view>
			<view class="li">
				<view class="price_box">
					<text class="quantity_num">共1件</text>
					<text class="price_name">总计:</text>
					<text class="price_icon">￥</text>
					<text class="total_price">{{ priceToFixed(282) }}</text>
				</view>
			</view>
		</view>
	</view>

	<view style="height: 170rpx"></view>

	<view class="fixed_bottom_btn">
		<view class="btn_bg btn">
			<button>立即支付</button>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';

const location_name = ref('广东省广州市天河区黄埔大道中258号');
// 打开地图，选择地址
const open_location = () => {
	uni.openLocation({
		latitude: 23.12463,
		longitude: 113.36199,
		address: '广东省广州市天河区黄埔大道中258号',
		name: '黄埔大道中258号店'
	});
};

// 手机号码加密
const userMobileComputed = computed(() => {
	return (e) => {
		const phone = String(e);
		return phone.substr(0, 3) + '****' + phone.substring(7);
	};
});

// 计算属性金额后面补.00
const priceToFixed = computed(() => {
	return (e) => {
		const priceNumber = e + '.00';
		return priceNumber;
	};
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

// 配送方式
const deliveryIndex = ref(0);
const deliveryChange = (i) => {
	deliveryIndex.value = i;
};

// 电子邮箱
const email = ref('');
const textarta = ref('');
const emailInput = (e) => {
	console.log('e', e);
};
</script>

<style>
page {
	background: #fbfbfb;
}
</style>

<style lang="scss" scoped>
.main {
	padding: 20rpx 30rpx;
}

.store {
	padding: 24rpx;
	margin-bottom: 24rpx;
	.head {
		display: flex;
		justify-content: space-between;
		padding-bottom: 24rpx;
		.cover {
			width: 190rpx;
			height: 190rpx;
			flex: none;
		}

		.content {
			flex: 1;
			padding-left: 24rpx;
			.store_top {
				display: flex;
				justify-content: space-between;
				.title {
					font-size: 30rpx;
					font-weight: 600;
				}

				.distance {
					font-size: 24rpx;
					color: #c2c2c2;
				}
			}

			.store_bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.left_bottom {
					padding-top: 10rpx;
					.lead {
						padding: 4rpx 0;
						font-size: 24rpx;
						line-height: 34rpx;
						color: #999999;
					}
				}
			}
		}
	}

	.select_address {
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		padding-top: 30rpx;
		display: flex;
		justify-content: space-between;
		.location_name {
			font-size: 24rpx;
			color: #999999;
			line-height: 34rpx;
		}

		.open_location {
			flex: none;
			width: 124rpx;
			height: 54rpx;
			line-height: 54rpx;
			border-radius: 26rpx;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			.iconfont {
				font-size: 24rpx;
				color: #fff;
			}

			.address_text {
				font-size: 24rpx;
				color: #fff;
				padding-left: 6rpx;
			}
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
				color: #919191;
				padding-left: 20rpx;
			}
		}
		.address {
			font-size: 26rpx;
			color: #919191;
			margin-top: 10rpx;
		}
	}

	.icon {
		flex: none;
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

.specification_list {
	padding: 0 24rpx;
	background: #fff;
	.li {
		padding: 24rpx 0;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		.name {
			font-size: 28rpx;
			color: #000;
			font-weight: 600;
			padding-right: 20rpx;
			flex: none;
		}

		.right {
			flex: 1;
		}
		.lead {
			font-size: 26rpx;
			line-height: 36rpx;
			color: #a2a2a2;
		}

		.coupon {
			text-align: right;
			color: #ff0000;
			font-weight: 600;
			font-size: 30rpx;
		}

		.invoice {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.select {
				display: flex;
				align-items: center;
				margin-left: 40rpx;
				.circle {
					box-sizing: border-box;
					display: inline-block;
					width: 30rpx;
					height: 30rpx;
					background: #fff;
					border-radius: 50%;
					border: 2rpx solid #c4c4c4;
				}
				.text {
					font-size: 24rpx;
					font-weight: 500;
					padding-left: 10rpx;
					color: #000;
				}
			}

			.active {
				.circle {
					border: 8rpx solid #fdb681;
				}
			}
		}

		.email {
		}

		::v-deep .uni-easyinput__content-textarea {
			margin: 0;
			font-size: 26rpx;
			line-height: 36rpx;
			color: #000;
		}

		.textarea_box {
			padding-left: 20rpx;
		}

		.price_box {
			width: 100%;
			text-align: right;
			.quantity_num {
				font-size: 24rpx;
				color: #a2a2a2;
			}
			.price_name {
				font-size: 26rpx;
				color: #000;
				font-weight: 500;
				padding: 0 14rpx;
			}
			.price_icon {
				font-size: 26rpx;
				color: #ff0000;
				font-weight: 500;
			}
			.total_price {
				font-size: 38rpx;
				color: #ff0000;
				font-weight: 600;
			}
		}
	}

	.email_li {
		display: flex;
		align-items: center;
	}

	.li:last-child {
		border-bottom: 0;
	}
}
</style>