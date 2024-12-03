<template>
	<!-- 顶部到胶囊的高度 -->
	<!-- <view class="top" :class="scrollTop" :style="{ height: useMenuButton().top }"></view> -->
	<!-- 标题 -->
	<!-- <view class="page_title" :class="scrollTop" :style="{ top: useMenuButton().top, height: useMenuButton().height, 'line-height': useMenuButton().height }">
		<view class="return_icon" @click="return_page">
			<uni-icons type="left" size="23" :color="scrollTop == 'white_default' ? '#fff' : '#000'"></uni-icons>
		</view>
		{{ scrollTop != 'white_default' ? '系统公告' : '' }}
	</view> -->
	<!-- 占位 -->
	<!-- 	<view :style="{ height: useMenuButton().top }"></view>
	<view :style="{ height: useMenuButton().height }"></view> -->
	<!-- 顶部背景 -->
	<view class="fixed_top_bg">
		<image class="cover" src="/static/img/me_banner.png" mode="widthFix"></image>
	</view>
	<!-- 内容 -->
	<view class="wrap">
		<image class="cover" :src="details.image" mode="widthFix"></image>
		<view class="main">
			<view class="title">{{ details.title }}</view>
			<view class="author">
				<text class="date">时间：{{ details.add_at }}</text>
				<text class="name">来源：炜洹集团</text>
			</view>

			<rich-text class="rich_box" type="text" :preview="true" :nodes="content"></rich-text>

			<view class="return_btn">
				<view class="btn btn_bg" @click="return_page">返回列表</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onLoad, onPageScroll } from '@dcloudio/uni-app';
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

// 顶部区域滚动
// const scrollTop = ref('white_default');
// onPageScroll((e) => {
// 	if (e.scrollTop < 30) {
// 		scrollTop.value = 'white_default';
// 	}
// 	if (e.scrollTop > 30 && e.scrollTop < 60) {
// 		scrollTop.value = 'white_30';
// 	} else if (e.scrollTop > 60 && e.scrollTop < 100) {
// 		scrollTop.value = 'white_60';
// 	} else if (e.scrollTop > 100) {
// 		scrollTop.value = 'white_100';
// 	}
// });

// 获取公告详情
const getNoticeDetails = async () => {
	const res = await noticeDetails(id.value);
	console.log('公告详情', res);
	if (res.code == 1) {
		details.value = res.data;
	}
};

const content = computed(() => {
	return details.value.content
		.replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/gi, '<p')
		.replace(/<p>/gi, '<p style="font-size: 15Px; line-height: 25Px;">')
		.replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/gi, '<img$1')
		.replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/gi, '<img$1')
		.replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/gi, '<img$1')
		.replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/gi, '<img$1')
		.replace(/<img([\s\w"-=\/\.:;]+)/gi, '<img$1 style="width: 100%; border-radius: 8Px;"');
});

onLoad((load) => {
	console.log('load', load);
	if (load.id) {
		id.value = load.id;
		getNoticeDetails();
	}
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
.fixed_top_bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 750rpx;
	z-index: -1;
	.cover {
		width: 750rpx;
	}
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
