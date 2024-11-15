<!-- 开票申请 -->
<template>
	<view class="main">
		<view class="card_box">
			<view class="lead">首先感谢您的信任！如需开票，请您如实填写以下开票信息，并做好信息核对。</view>
			<view class="lis">
				<view class="title">发票抬头</view>
				<view class="input_box">
					<input type="text" v-model="name" placeholder-class="input_placeholder" focus placeholder="请填写发票抬头信息" />
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
			<view class="lis" v-if="price_index == 0">
				<view class="title">其他未开票成交金额</view>
				<view class="input_box">
					<input type="number" v-model="price" placeholder-class="input_placeholder" placeholder="请填写金额" />
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

	<Bottom title="提交申请" @bottom_click="bottom_click"></Bottom>
</template>

<script setup>
import Bottom from '../component/bottom.vue';
import { ref } from 'vue';
const type = ref([
	{
		id: 0,
		value: '普通发票'
	}
]);
const type_index = ref(-1);
const type_value = ref(null);
function typeChange(e) {
	const index = Number(e.detail.value);
	type_index.value = index;
	type_value.value = type.value[index].value;
}

const price_index = ref(-1);
const price_value = ref(null);
const pricetype = ref([
	{
		id: 1,
		value: '其他未开票成交金额'
	},
	{
		id: 2,
		value: '所有未开票成交金额'
	}
]);
function priceChange(e) {
	const index = Number(e.detail.value);
	price_index.value = index;
	price_value.value = pricetype.value[index].value;
}

const price = ref(null);

function bottom_click() {
	uni.navigateBack();
}
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
