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
		default: '/static/img/empty_content.png'
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
	font-size: 26rpx;
	letter-spacing: 0.3px;
	font-weight: 500;
	padding: 10rpx 0;
}
</style>
