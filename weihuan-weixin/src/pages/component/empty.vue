<template>
	<uni-transition mode-class="fade" :show="show">
		<view class="empty">
			<image class="cover" :src="imgSrc" mode="widthFix"></image>
			<view class="lead">{{ tips }}</view>
		</view>
	</uni-transition>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
	tips: {
		type: String,
		default: '抱歉，小炜尽力了'
	},
	imgSrc: {
		type: String,
		default: 'https://test.cnmaris.cn/uploads/images/20241220/17347004872159.png'
	},
	show: {
		type: Boolean,
		default: () => {
			return false;
		}
	}
});
</script>

<style lang="scss" scoped>
.empty {
	padding: 60rpx 30rpx 0;
	text-align: center;
}
.cover {
	width: 340rpx;
}

.lead {
	font-size: 28rpx;
	font-weight: 500;
	padding: 10rpx 0;
}
</style>
