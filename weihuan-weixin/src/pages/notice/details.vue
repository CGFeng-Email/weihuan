<template>
	<!-- 内容 -->
	<view class="wrap">
		<image class="cover" :src="details.image" mode="widthFix"></image>
		<view class="main">
			<view class="title">{{ details.title }}</view>
			<view class="author">
				<text class="date">时间：{{ details.add_at }}</text>
				<text class="name">来源：炜洹集团</text>
			</view>

			<uv-parse :content="details.content" :tagStyle="contentStyle" :lazyLoad="true"></uv-parse>

			<view class="return_btn">
				<view class="btn btn_bg" @click="return_page">返回列表</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onLoad, onPageScroll, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { ref, computed } from 'vue';
// 胶囊信息
import useMenuButton from '../../hooks/useMenu.js';
import { noticeDetails } from '@/api/index.js';

const id = ref('');

const details = ref({});

// 返回
const return_page = () => {
	uni.navigateBack();
};

// 富文本样式
const contentStyle = ref({
	p: 'font-size:32rpx;line-height: 44rpx;',
	span: 'font-size: 30rpx,line-height: 40rpx;',
	img: 'margin-bottom: 10rpx'
});

// 获取公告详情
const getNoticeDetails = async () => {
	const res = await noticeDetails(id.value);
	console.log('公告详情', res);
	if (res.code == 1) {
		details.value = res.data;
	}
};

onLoad((load) => {
	console.log('load', load);
	if (load.id) {
		id.value = load.id;
		getNoticeDetails();
	}
});

onShareAppMessage(() => {
	return {
		title: '网上商城 | WakanMALL',
		path: '/pages/index/index'
	};
});

onShareTimeline(() => {
	return {
		title: '网上商城 | WakanMALL',
		path: '/pages/index/index'
	};
});
</script>

<style>
page {
	background: #fbfbfb;
}
</style>

<style lang="scss" scoped>
.white_default {
	background: transparent;
}
.white_30 {
	background: rgba(255, 255, 255, 0.3);
}
.white_60 {
	background: rgba(255, 255, 255, 0.6);
}
.white_100 {
	background: rgba(255, 255, 255, 1);
}

.wrap {
	padding: 30rpx 20rpx 160rpx;
	.cover {
		width: 100%;
	}
	.main {
		background: #fff;
		padding: 20rpx;

		.title {
			font-size: 32rpx;
			font-weight: bold;
			line-height: 42rpx;
			padding: 20rpx 0;
			text-align: center;
		}

		.author {
			font-size: 26rpx;
			color: #b7b7b7;
			font-weight: 500;
			text-align: center;
			padding: 20rpx 0;
			text {
				padding: 0 20rpx;
			}
		}

		.lead {
			font-size: 28rpx;
			line-height: 44rpx;
			margin-top: 40rpx;
			margin-bottom: 30rpx;
		}

		.return_btn {
			display: flex;
			justify-content: flex-end;
			padding: 40rpx 0;
			.btn {
				width: 220rpx;
				height: 64rpx;
				line-height: 64rpx;
				border-radius: 32rpx;
				text-align: center;
				color: #fff;
				font-size: 28rpx;
				font-weight: 500;
			}
		}

		img {
			width: 100%;
		}
	}
}
</style>
