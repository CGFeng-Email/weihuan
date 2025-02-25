<!-- 订单核销 -->
<template>
	<view class="main">
		<image class="cover" src="/src/static/img/cancel.jpg" mode="widthFix"></image>
		<view class="title">扫描券码 一键核销</view>
		<view class="lead">降低核销门槛 低成本留存优质客户</view>
		<view class="sweep">
			<button class="btn_bg" @click="sweep_click">立即核销</button>
		</view>
	</view>

	<sweep-navigate @sweep_switch="sweep_switch" :sweep_index="sweep_index"></sweep-navigate>
</template>

<script setup>
import { ref } from 'vue';
import sweepNavigate from '../component/sweep_navigate.vue';
import { scanCode } from '@/api/index.js';

const sweep_index = ref(0);

// 立即核销
function sweep_click() {
	uni.scanCode({
		autoDecodeCharset: true,
		barCodeInput: true,
		success: async (res) => {
			console.log('res', res);
			if (res.errMsg == 'scanCode:ok') {
				// uni.navigateTo({
				// 	url: '/pages/order/details'
				// });
				const params = {
					order_sn: res.result
				};
				const getCode = await scanCode(params);
				console.log('立即扫码核销', getCode);
				if (getCode.code == 1) {
					uni.showLoading({
						title: '查询订单信息..',
						mask: true,
						duration: 1500,
						success: () => {
							setTimeout(() => {
								uni.navigateTo({
									url: `/pages/order/details?orderId=${getCode.data.id}&verification=${true}`
								});
								uni.hideLoading();
							}, 1500);
						}
					});
				} else {
					uni.showToast({
						title: getCode.msg,
						icon: 'none',
						mask: true,
						duration: 1500
					});
				}
			}
		}
	});
}
</script>

<style lang="scss" scoped>
.main {
	padding: 170rpx 30rpx 30rpx;
	text-align: center;

	.cover {
		width: 500rpx;
		margin-bottom: 20rpx;
	}

	.title {
		font-size: 48rpx;
		font-weight: 500;
		padding: 20rpx 0;
	}

	.lead {
		font-size: 32rpx;
		line-height: 42rpx;
		color: #8e8e8e;
	}

	.sweep {
		padding-top: 100rpx;
		button {
			width: 400rpx;
			border-radius: 45rpx;
			color: #fff;
		}
	}
}
</style>
