<template>
	<view class="sweep_navigate animate">
		<view class="item" :class="{ active: sweep_index == 0 }" @click="open_cancel">
			<text class="iconfont icon-saoma"></text>
			<view class="title">订单核销</view>
		</view>
		<view class="item" :class="{ active: sweep_index == 1 }" @click="open_me_cancel">
			<text class="iconfont icon-chengyunshangwodedingdan"></text>
			<view class="title">我的核销</view>
		</view>
	</view>

	<view style="height: 94px"></view>
</template>

<script>
export default {
	props: {
		sweep_index: { type: Number, default: 0 }
	},
	methods: {
		open_cancel() {
			if (this.sweep_index == 0) return;
			uni.navigateTo({
				url: '/pages/order/cancel'
			});
		},
		open_me_cancel() {
			if (this.sweep_index == 1) return;
			uni.navigateTo({
				url: '/pages/order/me_cancel'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.sweep_navigate {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 3;
	background: #fff;
	box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
	.item {
		position: relative;
		padding: 30rpx 0 50rpx;
		flex: 1;
		text-align: center;

		.iconfont {
			font-size: 50rpx;
			color: #b2b2b2;
		}

		.title {
			font-size: 26rpx;
			font-weight: 500;
			padding: 6rpx 0;
			color: #b2b2b2;
		}
	}

	.item:nth-child(1) {
		&::after {
			content: '';
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
			width: 1px;
			height: 30%;
			background: rgba(0, 0, 0, 0.1);
		}
	}

	.active {
		.iconfont {
			color: #ff8992;
		}

		.title {
			color: #ff8992;
		}
	}
}
</style>
