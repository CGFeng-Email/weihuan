<!-- 确认订单 -->
<template>
	<page-meta :page-style="'overflow:' + (isScroll ? 'hidden' : 'visible')"></page-meta>

	<view class="main">
		<!-- 配送方式：物流配送 -->
		<view class="user_location box_shadow box_border_radius" v-if="deliveryType == 10">
			<view class="content" @click="open_address" v-if="defaultAddress.length > 0 || Object.keys(defaultAddress).length > 0">
				<view class="head">
					<text class="title">{{ defaultAddress.consignee }}</text>
					<text class="phone">{{ defaultAddress.mobile }}</text>
				</view>
				<view class="address">{{ defaultAddress.province + defaultAddress.city + defaultAddress.district + defaultAddress.address }}</view>
			</view>

			<view class="content" @click="open_address" v-else>
				<view class="head">
					<text class="title">添加收货地址</text>
				</view>
			</view>
			<uni-icons type="right" size="18"></uni-icons>
		</view>

		<!-- 配送方式：自提 -->
		<view class="store box_shadow box_border_radius" @click="open_storeList" v-if="deliveryType == 20">
			<view class="head">
				<image class="cover box_border_radius" :src="store.image" mode="aspectFill"></image>
				<view class="content">
					<view class="store_top">
						<view class="title">{{ store.title }}</view>
						<view class="distance"></view>
					</view>
					<view class="store_bottom">
						<view class="left_bottom">
							<view class="lead">联系人：{{ store.contact }}</view>
							<view class="lead">联系电话：{{ store.phone }}</view>
							<view class="lead">营业时间：{{ store.open_hours }}</view>
						</view>
						<uni-icons type="right" size="18"></uni-icons>
					</view>
				</view>
			</view>

			<view class="select_address">
				<view class="location_name">地址：{{ store.address }}</view>
				<view class="open_location btn_bg" @click.stop="open_location">
					<text class="iconfont icon-dizhi"></text>
					<text class="address_text">导航</text>
				</view>
			</view>
		</view>

		<!-- 商品列表 -->
		<view class="shopping_list">
			<view class="shopping box_shadow box_border_radius" v-for="(item, index) in shoppingList" :key="item.id">
				<image class="cover box_border_radius" :src="item.image" mode="aspectFill"></image>
				<view class="content">
					<view class="shopping_top">
						<view class="title over2">{{ item.title }}</view>
						<view class="spec">
							<text>{{ item.specificationTitle }} {{ item.specificationTitle ? ':' : '' }} {{ item.selectSpecificationTitle }}</text>
							<text class="store_count">库存: {{ item.storeCount }}</text>
						</view>
					</view>
					<view class="shopping_bottom">
						<view class="price_box">
							<text class="symbol">￥</text>
							<text class="price">{{ item.price }}</text>
							<text class="primary_price">￥{{ item.outPrice }}</text>
						</view>
						<view class="quantity_box">
							<view class="icon" @click="deCrement(index)">
								<i class="iconfont icon-jianhao"></i>
							</view>
							<view class="quantity_number">{{ item.quantity }}</view>
							<view class="icon" @click="inCrement(item.storeCount, index)">
								<i class="iconfont icon-jia"></i>
							</view>
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
				<view class="name">订单运费</view>
				<view class="right lead" :class="{ freight: orderFreight }">
					<text class="price_icon">￥</text>
					<text>{{ orderFreight }}</text>
				</view>
			</view>
			<view class="li">
				<view class="name">优惠券</view>
				<view class="right lead coupon" @click="openCoupon">
					<view class="text_box freight" v-if="selectCouponIndex !== null">
						<block v-if="couponList[selectCouponIndex].coupon_type == 1">
							<text class="price_icon">-￥</text>
							<text>{{ couponList[selectCouponIndex].money }}</text>
						</block>
						<text v-else>{{ couponList[selectCouponIndex].remark }}</text>
					</view>
					<view class="text_box" v-else>
						<text class="coupon_count">{{ couponList.length }}</text>
						<text class="text">张可用</text>
					</view>
					<uni-icons class="icon" type="right" size="13" color="#a2a2a2"></uni-icons>
				</view>
			</view>
			<view class="li">
				<view class="name">订单备注</view>
				<view class="right">
					<view class="textarea_box">
						<!-- <textarea v-model="textarta" placeholder-class="textarea" placeholder="请填写您的备注内容" /> -->
						<uv-textarea v-model="textarta" placeholder="请填写您的备注内容" count confirmType="完成" :textStyle="textareaStyle"></uv-textarea>
					</view>
				</view>
			</view>

			<view class="li">
				<view class="price_box">
					<text class="quantity_num">共{{ shoppingList.length }}件</text>
					<text class="price_name">总计:</text>
					<text class="price_icon">￥</text>
					<text class="total_price">{{ totalPrice }}</text>
				</view>
			</view>
		</view>
	</view>

	<!-- 优惠卷弹窗 -->
	<uni-popup ref="couponPopup" type="bottom" :safe-area="false" @maskClick="hidePopup">
		<view class="coupon_content">
			<uni-icons class="close" type="closeempty" size="20" @click="hidePopup"></uni-icons>
			<view class="coupon_head">
				<view class="title" :class="{ active: couponPopupTabsIndex == 0 }" @click="switch_coupon(0)">可用优惠卷({{ couponCount }})</view>
			</view>
			<scroll-view class="scroll_view" scroll-y enable-back-to-top scroll-anchoring enhanced enable-passive>
				<view class="list" v-if="couponList.length > 0">
					<block v-for="(item, index) in couponList" :key="item.id">
						<view class="item" @click="selectCoupon(index)">
							<view class="left_box">
								<!-- 金额 -->
								<view class="" v-if="item.coupon_type == 1">
									<text class="ide">￥</text>
									<text class="number">{{ item.money }}</text>
								</view>
								<!-- 满减 -->
								<text class="price_text" v-else>
									{{ item.coupon_type_name }}
								</text>
							</view>
							<view class="right_box">
								<view class="content">
									<view class="title over1">{{ item.title }}</view>
									<view class="lead">使用说明: {{ item.remark }}</view>
									<view class="date">截止有效时间: {{ item.end_date }}</view>
								</view>
								<view class="icon">
									<uni-icons
										:type="selectCouponIndex == index ? 'checkbox-filled' : 'circle'"
										size="22"
										:color="selectCouponIndex == index ? '#FF8992' : '#aaa'"
									></uni-icons>
								</view>
							</view>
						</view>
					</block>
				</view>
				<Empty tips="暂无可用优惠券" v-else></Empty>
			</scroll-view>

			<view class="bottom_btn">
				<button class="btn_bg" @click="hidePopup">确认</button>
			</view>
		</view>
	</uni-popup>

	<Bottom title="立即支付" @bottom_click="submitOrder"></Bottom>
</template>

<script setup>
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { ref, onUnmounted } from 'vue';
import Bottom from '../component/bottom.vue';
import { getUserData, getShoppingAddress, nearStore, immedPayment, OrderPayment } from '@/api/index.js';
import Empty from '../component/empty.vue';

// 页面滚动
const isScroll = ref(false);
// openid
const openid = ref('');
// 配送方式 10物流配送 20上门自提
const deliveryType = ref('');
// 商品列表
const shoppingList = ref([]);
// 用户默认收货地址
const defaultAddress = ref([]);
// 经纬度
const location = ref({});
// 最近自提点
const store = ref({});
// 可用优惠券
const couponList = ref([]);
// 优惠券弹窗
const couponPopup = ref(false);
// 优惠券弹窗tabs下标
const couponPopupTabsIndex = ref(0);
// 选中的可用优惠券下标
const selectCouponIndex = ref(null);
// 备注
const textarta = ref('');
// 订单运费
const orderFreight = ref(0);
// 条数
const size = ref(20);
// 总计价格
const totalPrice = ref(null);
// 是否购物车下单 1=是
const defaultIsCart = ref(0);
// 留言框样式
const textareaStyle = ref({
	color: '#000',
	fontSize: '26rpx',
	lineHeight: 1.6
});

onLoad(async (load) => {
	uni.showLoading({
		title: '加载中...'
	});

	openid.value = uni.getStorageSync('openid');

	// 获取定位ip
	const locationData = uni.getStorageSync('location');
	location.value = {
		longitude: locationData.location.lng,
		latitude: locationData.location.lat
	};

	// 用户信息
	await getUserDataFn();

	const { delivery_type, buy_goods, shopping, isCart } = JSON.parse(load.params);
	console.log('delivery_type', delivery_type);
	console.log('buy_goods', buy_goods);
	// 配送方式
	deliveryType.value = delivery_type;
	// 商品列表
	shoppingList.value = buy_goods;
	// 是否购物车下单
	defaultIsCart.value = isCart;

	// 自提点
	if (deliveryType.value == 20) {
		await getNearStore();
	}

	// 获取立即购买数据
	await getImmetPayment();

	// 选择地址
	uni.$on('selectAddress', (item) => {
		console.log('选择地址', item);
		defaultAddress.value = item;
	});

	// 选择自提点
	uni.$on('selectStore', (item) => {
		console.log('选择自提点', item);
		store.value = item;
	});

	uni.hideLoading();
});

// 用户信息
const getUserDataFn = async () => {
	const res = await getUserData();
	console.log('用户信息', res);
	if (res.code == 1) {
		if (res.data.default_address.length > 0) {
			// 有默认地址
			defaultAddress.value = res.data.default_address;
		} else {
			// 没有默认地址，获取地址列表
			const addressList = await getShoppingAddress();
			console.log('地址列表', addressList);
			if (addressList.code == 1 && addressList.data.lists.length > 0) {
				defaultAddress.value = addressList.data.lists[0];
			}
		}
	}
};

// 获取最近自提点
const getNearStore = async () => {
	const res = await nearStore(location.value);
	console.log('最近自提点', res);
	if (res.code == 1) {
		store.value = res.data;
	}
};

// 跳转添加收货地址
const open_address = () => {
	uni.navigateTo({
		url: `/pages/address/index?select=${true}`
	});
};

// 跳转自提点列表
const open_storeList = () => {
	uni.navigateTo({
		url: `/pages/self_pick_up/list?select=${true}`
	});
};

// 自提点地图，选择地址
const open_location = () => {
	const longitude = Number(store.value.longitude);
	const latitude = Number(store.value.latitude);
	uni.openLocation({
		longitude,
		latitude,
		name: store.value.title,
		address: store.value.address
	});
};

// 商品数量 减
const deCrement = (index) => {
	if (shoppingList.value[index].quantity > 1) {
		shoppingList.value[index].quantity -= 1;
		getImmetPayment();
	}
};

// 商品数量 加
const inCrement = (storeCount, index) => {
	if (shoppingList.value[index].quantity < storeCount) {
		shoppingList.value[index].quantity += 1;
		getImmetPayment();
	}
};

// 打开优惠卷弹窗
const openCoupon = () => {
	if (couponList.value.length <= 0) return;
	isScroll.value = true;
	couponPopup.value.open();
};

// 关闭优惠券弹窗
const hidePopup = () => {
	isScroll.value = false;
	couponPopup.value.close();
};

// 选择优惠卷
const selectCoupon = (index) => {
	if (selectCouponIndex.value == index) {
		selectCouponIndex.value = null;
		return getImmetPayment();
	}
	selectCouponIndex.value = index;
	console.log('selectCouponIndex', selectCouponIndex.value);
	getImmetPayment();
};

// 立即支付
const submitOrder = async () => {
	// 获取支付订单
	const res = await getImmetPayment(0);
	console.log('立即支付', res);
	if (res.code == 1) {
		// 订单支付
		const params = {
			is_settle: 0,
			pay_type: 20,
			order_id: res.data.order_id,
			openid: openid.value
		};

		const res2 = await OrderPayment(params);
		console.log('订单支付', res2);
		if (res2.code == 1) {
			// 微信支付
			await wxPayment(res2.data.wechat_payinfo);
		}
	}
};

// 获取立即购买数据
// isSettle:1 任何修改, isSettle:0 去支付
const getImmetPayment = async (isSettle = 1) => {
	// 规格列表
	const list = shoppingList.value.map((item) => {
		return {
			goods_id: item.goods_id,
			spec_key: item.spec_key,
			goods_num: item.quantity
		};
	});
	console.log('list', list);

	const params = {
		delivery_type: deliveryType.value,
		address_id: defaultAddress.value.id || '',
		store_id: store.value.id || '',
		coupon_id: selectCouponIndex.value != null ? couponList.value[selectCouponIndex.value].id : '',
		is_settle: isSettle,
		buy_goods: list,
		buyer_remark: textarta.value,
		is_cart: defaultIsCart.value
	};

	console.log('params', params);

	const res = await immedPayment(params);

	console.log('获取立即购买数据', res);

	if (res.code == 1) {
		totalPrice.value = res.data.pay_price;
		orderFreight.value = res.data.express_price;
		couponList.value = res.data.coupon_list;
	}

	if (isSettle == 0) return res;
};

// 微信支付
const wxPayment = (params) => {
	uni.showLoading({
		title: '加载中'
	});
	
	uni.requestPayment({
		provider: 'wxpay',
		timeStamp: params.timeStamp,
		nonceStr: params.nonceStr,
		package: params.package,
		signType: params.signType,
		paySign: params.paySign,
		success: function (pay) {
			console.log('支付成功:', pay);
			if (pay.errMsg == 'requestPayment:ok') {
				uni.hideLoading();
				uni.showToast({
					title: '支付成功',
					duration: 1000,
					icon: 'none',
					mask: true,
					success: () => {
						setTimeout(() => {
							uni.navigateBack();
						}, 1000);
					}
				});
			}
		},
		fail: function (payErr) {
			console.log('未支付：', payErr);
			uni.hideLoading();
			uni.showToast({
				title: '订单未支付',
				duration: 1000,
				icon: 'none',
				mask: true,
				success: () => {
					setTimeout(() => {
						uni.redirectTo({
							url: `/pages/order/index?index=1&head_title_index=${deliveryType.value == 10 ? 0 : 1}`
						});
					}, 1000);
				}
			});
		}
	});
};

// 卸载之前，清除跨页面监听事件
onUnmounted(() => {
	uni.$off('selectAddress');
	uni.$off('selectStore');
});

onShareAppMessage(() => {
	return {
		title: shoppingList.value[0].title,
		path: '/pages/index/index'
	};
});

onShareTimeline(() => {
	return {
		title: shoppingList.value[0].title,
		path: '/pages/index/index'
	};
});
</script>

<style>
page {
	background: #fbfbfb;
}
</style>

<style lang="scss" scoped>
.main {
	padding: 20rpx 30rpx;
	min-height: 100vh;
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
			text-align: right;
			font-size: 24rpx;
			line-height: 36rpx;
			color: #a2a2a2;
		}

		.freight {
			color: #ff0000;
			font-size: 28rpx;
			font-weight: 600;

			.price_icon {
				font-size: 24rpx;
			}
		}

		.coupon {
			text-align: right;
			color: #ff0000;
			font-weight: 600;
			font-size: 30rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;

			.text_box {
				display: flex;
				align-items: center;
			}

			.coupon_count {
				color: #000;
				font-size: 26rpx;
				font-weight: 600;
				padding: 0 4rpx;
				color: #ff0000;
			}

			.text {
				color: #a2a2a2;
				font-size: 24rpx;
				font-weight: 500;
			}

			.icon {
				margin-left: 6rpx;
			}

			.select_price {
				olor: #ff0000;
				font-size: 24rpx;
				font-weight: 600;
				padding: 0 4rpx;
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

		.textarea_box {
			padding-left: 20rpx;

			::v-deep textarea {
				padding: 4rpx 0;
				font-size: 26rpx;
				line-height: 36rpx;
				box-sizing: border-box;
				width: auto;
				height: 160rpx;
			}
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
					font-size: 36rpx;
					font-weight: bold;
					color: #ff0000;
				}

				.price_text {
					font-size: 32rpx;
					font-weight: bold;
					color: #ff0000;
				}
			}
			.right_box {
				flex: 1;
				padding: 30rpx 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.content {
					flex: 1;
					.title {
						font-size: 32rpx;
						font-weight: bold;
						color: #000;
						line-height: 40rpx;
					}
					.date {
						font-size: 24rpx;
						line-height: 36rpx;
						color: #aaaaaa;
					}
					.lead {
						font-size: 24rpx;
						line-height: 36rpx;
						color: #aaaaaa;
						padding: 10rpx 0;
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
