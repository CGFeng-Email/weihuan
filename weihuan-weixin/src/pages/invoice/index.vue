<!-- 开票申请 -->
<template>
	<view class="main">
		<view class="card_box">
			<view class="lead">首先感谢您的信任！如需开票，请您如实填写以下开票信息，并做好信息核对。</view>
			<view class="lis">
				<view class="title">发票抬头</view>
				<view class="input_box">
					<input type="text" v-model="invoice_header" placeholder-class="input_placeholder" focus placeholder="请填写发票抬头信息" />
				</view>
			</view>
			<view class="lis">
				<view class="title">单位税号</view>
				<view class="input_box">
					<input type="text" v-model="tax" placeholder-class="input_placeholder" placeholder="请填写单位税号" />
				</view>
			</view>
			<view class="lis">
				<view class="title">
					开票类型
					<text class="text">（专用发票请联系客服）</text>
				</view>
				<view class="input_box">
					<picker class="picker" mode="selector" :range="type" :value="type_index" range-key="value" @change="typeChange">
						<input type="text" v-model="type_value" disabled placeholder-class="input_placeholder" placeholder="请选择开票类型" />
						<uni-icons class="icon" type="down" size="16" color="#999"></uni-icons>
					</picker>
				</view>
			</view>
			<view class="lis">
				<view class="title">开票金额</view>
				<view class="input_box">
					<picker class="picker" mode="selector" :range="pricetype" :value="price_index" range-key="value" @change="priceChange">
						<input type="text" v-model="price_value" disabled placeholder-class="input_placeholder" placeholder="待开票金额" />
						<uni-icons class="icon" type="down" size="16" color="#999"></uni-icons>
					</picker>
				</view>
			</view>
			<view class="lis" v-if="price_index == 1">
				<view class="title">其他未开票成交金额</view>
				<view class="input_box">
					<input type="number" v-model="price" placeholder-class="input_placeholder" placeholder="请填写金额" />
				</view>
			</view>
			<view class="lis">
				<view class="title">收件邮箱</view>
				<view class="input_box">
					<input type="text" v-model="email" placeholder-class="input_placeholder" placeholder="请填写收件邮箱" />
				</view>
			</view>
			<view class="lis">
				<view class="title">
					<text class="iconfont icon-zhuyi"></text>
					温馨提示
				</view>
				<view class="lead">
					开具好的发票将在5个工作日内发送至您的电子邮箱，请确保您的邮箱地址无误。如需查询或修改您登记的电子邮箱地址，请移步至“个人信息”页面中完成修改或更新。
				</view>
			</view>
		</view>
	</view>

	<Bottom title="提交申请" @bottom_click="apply"></Bottom>
</template>

<script setup>
import { ref } from 'vue';
import Bottom from '../component/bottom.vue';
import { applyInvoice, invoiceOrderList } from '@/api/index.js';

// 发票抬头
const invoice_header = ref('');
// 单位税号
const tax = ref('');
// 收件邮箱
const email = ref('');
// 开票类型下标
const type_index = ref(-1);
// 开票类型文案
const type_value = ref(null);
// 开票类型数组
const type = ref([
	{
		id: 10,
		value: '普通发票'
	}
	// {
	// 	id: 20,
	// 	value: '专用发票'
	// }
]);

// 开票金额
const price = ref(null);
const price_index = ref(-1);
const price_value = ref(null);
const pricetype = ref([
	{
		id: 10,
		value: '所有未开票成交金额'
	},
	{
		id: 20,
		value: '其他未开票成交金额'
	}
]);
// 未开票订单列表
const orderList = ref([]);

// 开票类型回调
function typeChange(e) {
	const index = Number(e.detail.value);
	type_index.value = index;
	type_value.value = type.value[index].value;
}

// 金额回调
const priceChange = async (e) => {
	const index = Number(e.detail.value);
	console.log('index', index);
	price_index.value = index;
	price_value.value = pricetype.value[index].value;

	if (index == 0) {
		if (orderList.value.length > 0) return;
		getInvoiceList();
	} else {
		price.value = null;
	}
};

// 获取未开发票订单
const getInvoiceList = async () => {
	const res = await invoiceOrderList();
	console.log('获取未开发票订单', res);
	if (res.code == 1) {
		orderList.value = res.data.order_ids;
	}
};

// 申请开票
const apply = async () => {
	if (invoice_header.value == '') {
		uni.showToast({
			title: '请填写发票抬头信息',
			duration: 2000,
			icon: 'none',
			mask: true
		});
		return;
	}

	if (type_index.value == -1) {
		uni.showToast({
			title: '请选择开票类型',
			duration: 2000,
			icon: 'none',
			mask: true
		});
		return;
	}

	if (price_index.value == -1) {
		uni.showToast({
			title: '请选择开票金额',
			duration: 2000,
			icon: 'none',
			mask: true
		});
		return;
	}

	const params = {
		invoice_header: invoice_header.value,
		invoice_type: type.value[type_index.value].id,
		fee_type: pricetype.value[price_index.value].id,
		fee: price.value,
		order_ids: orderList.value,
		tax: tax.value,
		email: email.value
	};

	console.log('params', params);
	const res = await applyInvoice(params);
	console.log('开票申请', res);

	uni.showToast({
		title: res.msg,
		duration: 2000,
		icon: 'none',
		mask: true
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

	.card_box {
		.title {
			margin-top: 30rpx;
			padding-bottom: 16rpx;

			.text {
				font-size: 24rpx;
				color: #8b8b8b;
				font-weight: normal;
			}

			.iconfont {
				color: #ff8992;
			}
		}

		.input_box {
			background: #f8f8f8;
			position: relative;

			input {
				height: 92rpx;
				padding: 0 30rpx;
				font-size: 26rpx;
				color: #000;
				border-radius: 6rpx;
			}

			.icon {
				position: absolute;
				top: 50%;
				right: 30rpx;
				transform: translateY(-50%);
			}
		}
	}
}
</style>