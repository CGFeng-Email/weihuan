<template>
	<view class="content">
		<uv-parse :content="content" :tagStyle="contentStyle" :lazyLoad="true"></uv-parse>
	</view>
</template>

<script setup>
import { ref } from 'vue';
// 富文本样式
const contentStyle = ref({
	div: 'font-size:32rpx;line-height: 44rpx;',
	p: 'font-size:28rpx;line-height: 38rpx;',
	span: 'font-size: 26rpx;line-height: 36rpx;'
});

const commonData = uni.getStorageSync('commonData');
const title = commonData.agreement.service_title;
const content = commonData.agreement.privacy_content;
</script>

<style lang="scss" scoped>
.title {
	text-align: center;
	font-size: 34rpx;
	font-weight: bold;
}

.content {
	padding: 0 20rpx 60rpx;
}
</style>
