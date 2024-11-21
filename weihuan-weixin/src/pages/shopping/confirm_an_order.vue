<!-- 确认订单 -->
<template>
	<page-meta :page-style="'overflow:' + (isScroll ? 'hidden' : 'visible')"></page-meta>
	<view class="main">
		<!-- 配送方式：物流配送 -->
		<view class="user_location box_shadow box_border_radius" v-if="deliveryIndex == 0" @click="open_location_list">
			<view class="head" v-if="Object.keys(shipping_address).length == 0">
				<text class="title">请添加配送地址</text>
			</view>
			<view class="content" v-else>
				<view class="head">
					<text class="title">{{ shipping_address.name }}</text>
					<text class="phone">{{ userMobileComputed(shipping_address.mobile) }}</text>
				</view>
				<view class="address">{{ shipping_address.address.join('') + shipping_address.content }}</view>
			</view>
			<uni-icons type="right" size="18"></uni-icons>
		</view>
		<!-- 配送方式：自提 -->
		<view class="store box_shadow box_border_radius" @click="open_store" v-else>
			<view class="head">
				<image class="cover box_border_radius" :src="pick_up_store.image" mode="aspectFill"></image>
				<view class="content">
					<view class="store_top">
						<view class="title">{{ pick_up_store.store_title }}</view>
						<view class="distance">{{ pick_up_store.distance }}</view>
					</view>
					<view class="store_bottom">
						<view class="left_bottom">
							<view class="lead">联系人：{{ pick_up_store.store }}</view>
							<view class="lead">联系电话：{{ pick_up_store.mobile }}</view>
							<view class="lead">营业时间：{{ pick_up_store.date }}</view>
						</view>
						<uni-icons type="right" size="18"></uni-icons>
					</view>
				</view>
			</view>
			<view class="select_address">
				<view class="location_name">地址：{{ pick_up_store.title }}</view>
				<view class="open_location btn_bg" @click.stop="open_location">
					<text class="iconfont icon-dizhi"></text>
					<text class="address_text">导航</text>
				</view>
			</view>
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
				<view class="name">优惠卷</view>
				<view class="right lead coupon" @click="open_coupon">
					<text v-if="coupon_number">-¥{{ priceToFixed(coupon_number) }}</text>
					<text class="text" v-else>选择优惠卷</text>
					<uni-icons class="icon" type="right" size="13" color="#a2a2a2"></uni-icons>
				</view>
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

	<!-- 优惠卷弹窗 -->
	<uni-popup ref="coupon_popup" type="bottom" :safe-area="false" @maskClick="close_popup">
		<view class="coupon_content">
			<uni-icons class="close" type="closeempty" size="20"></uni-icons>
			<view class="coupon_head">
				<view class="title" :class="{ active: coupon_is_index == 0 }" @click="switch_coupon(0)">可用优惠卷(3)</view>
				<view class="title" :class="{ active: coupon_is_index == 1 }" @click="switch_coupon(1)">不可用优惠卷(7)</view>
			</view>
			<scroll-view class="scroll_view" scroll-y enable-back-to-top scroll-anchoring enhanced enable-passive>
				<view class="list">
					<block v-for="(item, index) in 8" :key="index">
						<view class="item" @click="coupon_item(index, 5)">
							<view class="left_box">
								<text class="ide">￥</text>
								<text class="number">5</text>
							</view>
							<view class="right_box">
								<view class="content">
									<view class="title">双12购物节购物优惠券</view>
									<view class="date">2024/08/22 至 2024/12/30</view>
									<view class="lead">使用条件: 适应所有商品</view>
									<view class="lead">使用说明: 超过有效日期会自动失效</view>
								</view>
								<view class="icon">
									<uni-icons
										:type="coupon_index == index ? 'checkbox-filled' : 'circle'"
										size="22"
										:color="coupon_index == index ? '#FF8992' : '#aaa'"
									></uni-icons>
								</view>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
			<view class="bottom_btn">
				<button class="btn_bg" @click="coupon_submit">确认</button>
			</view>
		</view>
	</uni-popup>

	<view style="height: 170rpx"></view>

	<view class="fixed_bottom_btn">
		<view class="btn_bg btn">
			<button>立即支付</button>
		</view>
	</view>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
// 配送方式
const deliveryIndex = ref(0);
// 配送地址，可以先请求查看是否有默认地址
const shipping_address = ref({});
// 自提点，可以先请求获取最近的自提点
const pick_up_store = ref({
	id: 6,
	width: 28,
	height: 41,
	latitude: 23.120406941577873,
	longitude: 113.35739805816652,
	store_title: '天河员村生鲜自提点',
	title: '广东省广州市天河区员村南街',
	iconPath: '/static/img/map.png',
	image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/shop2.png',
	store: '陈先生',
	mobile: 13636986542,
	date: '09:00 - 23:00',
	distance: '200m',
	callout: {
		content: '员村南街',
		display: 'ALWAYS',
		textAlign: 'center',
		padding: '6',
		bgColor: '#fff',
		borderRadius: 8,
		fontSize: 14,
		color: '#000'
	}
});

onLoad((load) => {
	const params = JSON.parse(load.params);
	console.log('params', params);
	if (Object.keys(params).length > 0) {
		// 配送方式
		deliveryIndex.value = params.deliveryIndex;
		// 自提点
		pick_up_store.value = params.pick_up_store;
	}
});

onShow((show) => {
	// 选择配送地址
	uni.$on('location', function (location) {
		console.log('location', location);
		shipping_address.value = location;
	});

	// 选择自提点
	uni.$on('select_store', function (store) {
		console.log('store', store);
		pick_up_store.value = store;
	});
});

// 卸载之前
onBeforeUnmount(() => {
	uni.$off('location');
	uni.$off('select_store');
});

// 选择配送地址
function open_location_list() {
	uni.navigateTo({
		url: `/pages/address/index?select=${true}`
	});
}

// 跳转自提点列表
function open_store() {
	uni.navigateTo({
		url: `/pages/self_pick_up/list?select=${true}`
	});
}

// 自提点地图，选择地址
const open_location = () => {
	uni.openLocation({
		latitude: pick_up_store.value.latitude,
		longitude: pick_up_store.value.longitude,
		address: pick_up_store.value.title,
		name: pick_up_store.value.store_title
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

// 电子邮箱
const email = ref('');
const textarta = ref('');
const emailInput = (e) => {
	console.log('e', e);
};

// 弹窗优惠卷
const isScroll = ref(false);
const coupon_is_index = ref(0);
const coupon_index = ref(null);
const coupon_number = ref(null);
const coupon_popup = ref(null);
function switch_coupon(i) {
	uni.showLoading({
		title: '加载中',
		mask: true,
		success: () => {
			setTimeout(function () {
				coupon_index.value = null;
				coupon_is_index.value = i;
				uni.hideLoading();
			}, 1000);
		}
	});
}
function coupon_item(i, price) {
	if (coupon_index.value == i) {
		coupon_index.value = null;
		coupon_number.value = null;
		return;
	}
	coupon_index.value = i;
	coupon_number.value = price;
}
function coupon_submit() {
	close_popup();
}
function open_coupon() {
	isScroll.value = true;
	coupon_popup.value.open();
}
function close_popup() {
	isScroll.value = false;
	coupon_popup.value.close();
}
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

			.text {
				color: #a2a2a2;
				font-size: 24rpx;
				font-weight: 500;
			}

			.icon {
				margin-left: 6rpx;
			}
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

.coupon_content {
	background: #fff;
	border-radius: 24rpx 24rpx 0 0;
	position: relative;
	padding-bottom: 20px;
	.close {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
	}
	.coupon_head {
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		.title {
			padding: 30rpx 30rpx;
			font-size: 30rpx;
			font-weight: 500;
			color: #aaaaaa;
		}
		.active {
			color: #000;
			font-weight: bold;
		}
	}
	.scroll_view {
		height: 640rpx;
		padding: 20rpx 0;
		box-sizing: border-box;
		background: #f5f5f7;
		.list {
			padding: 0 20rpx;
		}
		.item {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			border-radius: 12rpx;
			box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
			background: #fff;
			overflow: hidden;
			.left_box {
				width: 150rpx;
				flex: none;
				display: flex;
				align-items: center;
				justify-content: center;

				.ide {
					font-size: 30rpx;
					font-weight: bold;
					color: #ff0000;
				}
				.number {
					font-size: 50rpx;
					font-weight: bold;
					color: #ff0000;
				}
			}
			.right_box {
				flex: 1;
				padding: 10rpx 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.content {
					flex: 1;
					.title {
						font-size: 30rpx;
						font-weight: bold;
						color: #000;
						line-height: 40rpx;
					}
					.date {
						font-size: 24rpx;
						line-height: 36rpx;
						color: #aaaaaa;
						padding: 5rpx 0;
					}
					.lead {
						font-size: 24rpx;
						line-height: 36rpx;
						color: #aaaaaa;
						padding: 5rpx 0;
					}
				}

				.icon {
					flex: none;
				}
			}
		}
	}

	.bottom_btn {
		padding: 20rpx;
		button {
			color: #fff;
			border-radius: 45rpx;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 32rpx;
		}
	}
}
</style>