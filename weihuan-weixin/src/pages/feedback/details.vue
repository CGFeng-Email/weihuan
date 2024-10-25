<template>
	<view class="main">
		<view class="content box_shadow box_border_radius">
			<h3 class="title">{{ title }}</h3>
			<view class="author">
				<text class="date text">{{ date }}</text>
				<text class="state text">状态：{{ state }}</text>
			</view>
			<view class="textarea">
				{{ textarta }}
			</view>

			<view class="line_title">图片</view>

			<uni-file-picker disabled v-model="upList" :del-icon="false" mode="grid" :limit="upList.length"></uni-file-picker>
		</view>

		<div class="content box_shadow box_border_radius">
			<view class="line_title">平台回复</view>
			<view class="textarea">
				{{ service }}
			</view>
		</div>
	</view>

	<bottomButton @bottom_click="bottom_click" title="返回列表"></bottomButton>
</template>

<script setup>
import { ref } from 'vue';
import bottomButton from '../component/bottom.vue';
const title = ref('我有一个建议，这里是建议标题');
const date = ref('2024/08/22 12:00');
const state = ref('处理中');
const textarta = ref('我在用咱们这个平台的时候出现了一些卡顿，并且有些页面点击了之后使得整个页面闪退，不知道是什么原因导致的，麻烦平台能优化一下。');
const service = ref('这里是平台给您的建议做出了一个回复，谢谢您对平台的反馈，我们尽快解决优化您说的问题。');
const upList = ref([
	{
		name: 'file.txt',
		extname: 'txt',
		url: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list5.png'
	},
	{
		name: 'file.txt',
		extname: 'txt',
		url: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list6.png'
	},
	{
		name: 'file.txt',
		extname: 'txt',
		url: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list7.png'
	}
]);

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
	.content {
		background: #fff;
		padding: 50rpx 30rpx;
		margin-bottom: 30rpx;
		.title {
			font-size: 30rpx;
			line-height: 40rpx;
			font-weight: bold;
			color: #000;
			text-align: center;
		}

		.author {
			padding: 20rpx 0 40rpx;
			text-align: center;
			font-size: 24rpx;
			color: #999999;

			.text {
				padding: 0 20rpx;
			}
		}

		.textarea {
			font-size: 24rpx;
			line-height: 38rpx;
			color: #333333;
			padding-bottom: 30rpx;
		}
	}
}
</style>
