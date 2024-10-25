<template>
	<view class="main">
		<view class="content box_shadow box_border_radius">
			<view class="head_title">反馈标题</view>
			<view class="input_box">
				<input v-model="title" focus maxlength="140" placeholder="请填写标题" class="input box_shadow" />
			</view>
			<view class="head_title">反馈内容</view>
			<view class="input_box">
				<textarea v-model="textarta" maxlength="300" placeholder="请填写反馈内容" class="textarea box_shadow" />
			</view>
			<uni-file-picker v-model="upList" fileMediatype="image" mode="grid" :limit="5" :auto-upload="false" @select="select" @success="success" @fail="fail" @delete="updelete">
				<view class="up_button">
					<image src="/static/img/up.png" mode="aspectFit"></image>
					<view class="text">
						上传图片
						<br />
						最多5张
					</view>
				</view>
			</uni-file-picker>
		</view>
	</view>

	<bottomButton @bottom_click="bottom_click" title="保存并提交"></bottomButton>
</template>

<script setup>
import bottomButton from '../component/bottom.vue';
import { ref } from 'vue';
const title = ref('');
const textarta = ref('');
const upList = ref([]);

// 选择文件后触发
function select(e) {
	console.log('选择文件后触发', e);
}

// 上传成功
function success(e) {
	console.log('上传成功', e, upList.value);
}

// 上传失败
function fail(e) {
	console.log('上传失败：', e);
}

// 文件从列表移除时触发
function updelete(e) {
	console.log('文件从列表移除时触发', e);
}

function bottom_click() {
	console.log('点击');
	uni.navigateBack()
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

		.input_box {
			margin-bottom: 40rpx;
			.input {
				background: #f8f8f8;
				height: 90rpx;
				line-height: 90rpx;
				box-shadow: 4rpx;
				padding: 0 14rpx;
				font-size: 26rpx;
				color: #000;
			}
			.textarea {
				padding: 14rpx;
				box-shadow: 4rpx;
				font-size: 26rpx;
				color: #000;
				height: 160rpx;
				background: #f8f8f8;
			}
		}

		.up_button {
			text-align: center;
			image {
				width: 45rpx;
				height: 45rpx;
			}
			.text {
				font-size: 24rpx;
				line-height: 34rpx;
				color: #b8b8b8;
				padding-top: 10rpx;
			}
		}
	}
}
</style>
