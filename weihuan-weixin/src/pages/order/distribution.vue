<!-- 物流信息 -->
<template>
	<view class="main">
		<view class="order_status card_box box_shadow box_border_radius">
			<view class="lead">订单状态</view>
			<view class="title">{{ orderStatus }}</view>
			<view class="lead">订单编号：{{ orderSn }}</view>
		</view>

		<view class="distribution card_box box_shadow box_border_radius">
			<view class="title">物流信息</view>
			<uv-read-more
				ref="readMore"
				showHeight="400rpx"
				closeText="展开查看更多"
				:toggle="isMore"
				color="#FF8992"
				textIndent="0"
				@open="moreOpen"
				@close="moreClose"
			>
				<view class="more_content">
					<uv-steps :current="logisticsIndex" direction="column" activeColor="#FF8992" dot>
						<uv-steps-item v-for="(item, index) in logisticsList" :key="item.time">
							<template v-slot:title>
								<view class="title" :class="{ active: logisticsIndex == index }">{{ item.context }}</view>
							</template>
							<template v-slot:desc>
								<view class="lead">
									{{ item.time }}
								</view>
								<view class="lead">
									{{ item.areaName }}
								</view>
								<view class="lead">
									{{ item.status }}
								</view>
							</template>
						</uv-steps-item>
					</uv-steps>
				</view>

				<Empty tips="没有相关物流信息!" :show="logisticsList.length == 0"></Empty>
			</uv-read-more>

			<view class="order_code">
				<view class="text" @click="stickup">
					<span>运单号：{{ logisticsSn }}</span>
					<span class="iconfont icon-fuzhi"></span>
				</view>
				<view class="text">物流公司：{{ logisticsType }}</view>
			</view>
		</view>

		<!-- 商品列表 -->
		<view class="shopping_list">
			<block v-for="(item, index) in shoppingList" :key="item.id">
				<GoodsItem :goods="item"></GoodsItem>
			</block>
		</view>
	</view>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { orderDetails, inquireLogistics } from '@/api/index.js';
import GoodsItem from './goodsItem.vue';
import Empty from '../component/empty.vue';

// 订单id
const orderId = ref('');
// 订单状态
const orderStatus = ref('');
// 物流公司品牌
const logisticsType = ref('');
// 物流单号
const logisticsSn = ref('');
// 订单号
const orderSn = ref('');
// 商品列表
const shoppingList = ref([]);
// 物流信息列表
const logisticsList = ref([]);
// 物流下吧
const logisticsIndex = ref(0);
// 列表是否收起
const isMore = ref(false);
const readMore = ref(null);

onLoad(async (load) => {
	console.log('load', load);
	orderId.value = load.orderId;
	await getOrderDetails();
	await getLogistics();
});

// 订单详情
const getOrderDetails = async () => {
	const params = {
		order_id: orderId.value
	};
	const res = await orderDetails(params);
	console.log('订单详情', res);
	if (res.code == 1) {
		orderStatus.value = res.data.status_name;
		logisticsType.value = res.data.express_company;
		logisticsSn.value = res.data.express_sn;
		orderSn.value = res.data.order_sn;
		shoppingList.value = res.data.order_goods;

		// deliveryType.value = res.data.delivery_type;
		// address.value = res.data.address;
		// store.value = res.data.store;
		// textarta.value = res.data.buyer_remark;
		// orderFreight.value = res.data.express_price;
		// couponPrice.value = res.data.coupon_money;
		// totalPrice.value = res.data.total_price;
		// status.value = res.data.status_name;
		// orderTime.value = res.data.add_at;
		// orderSn.value = res.data.order_sn;
		// orderPrice.value = res.data.pay_price;
	}
};

// 获取物流信息
const getLogistics = async () => {
	const params = {
		order_id: orderId.value
	};
	const res = await inquireLogistics(params);
	console.log('物流信息', res);
	if (res.code == 1) {
		logisticsList.value = res.data;
		nextTick(() => {
			readMore.value.init();
		});
	}
};

// 粘贴订单号
function stickup() {
	uni.setClipboardData({
		data: logisticsSn.value,
		showToast: true
	});
}

// 展开
const moreOpen = () => {
	isMore.value = true;
};

// 收起
const moreClose = () => {
	isMore.value = false;
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

	.order_status {
		.title {
			padding: 10rpx 0 20rpx;
			font-size: 30rpx;
		}

		.lead {
			color: #b1b1b1;
			font-size: 26rpx;
			line-height: 36rpx;
		}
	}
}

.more_content {
	.title {
		font-size: 26rpx;
		line-height: 38rpx;
		color: #000;
		font-weight: 500;
		margin: 0 0 8rpx;
		padding: 0;
	}

	.lead {
		font-size: 24rpx;
		line-height: 34rpx;
		font-weight: 500;
		color: #787878;
	}

	.active {
		color: #ff8992;
	}
}

.order_code {
	padding-top: 30rpx;
	display: flex;
	justify-content: space-between;
	.text {
		font-size: 26rpx;
		color: #787878;
	}
	.iconfont {
		font-size: 28rpx;
		color: #787878;
		padding-left: 6rpx;
	}
}
</style>
