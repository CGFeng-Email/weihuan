<template>
	<view class="empty">
		<image class="cover" src="../../static/img/empty.png" mode="widthFix"></image>
		<view class="lead">{{ tips }}</view>
	</view>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
	tips: {
		type: String,
		default: '抱歉，小炜尽力了'
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
