<!-- 自提点详情 -->
<template>
	<!-- 顶部到胶囊的高度 -->
	<view class="top" :class="scrollTop" :style="{ height: useMenuButton().top }"></view>
	<!-- 标题 -->
	<view class="page_title" :class="scrollTop" :style="{ top: useMenuButton().top, height: useMenuButton().height, 'line-height': useMenuButton().height }">
		<view class="icon" @click="returnPage">
			<uni-icons type="left" size="20" :color="scrollTop != 'white_default' ? '#000' : '#fff'"></uni-icons>
		</view>
		<text class="title">
			{{ scrollTop != 'white_default' ? '门店详情' : '' }}
		</text>
	</view>

	<view class="main">
		<view class="banner">
			<image class="cover" :src="details.image" mode="aspectFill"></image>
			<view class="bottom_radius"></view>
		</view>
		<view class="store">
			<view class="head">
				<text class="title">{{ details.title }}</text>
				<text class="distance">{{ details.distance }}</text>
			</view>
			<view class="info">
				<view class="li">联系人：{{ details.contact || '-' }}</view>
				<view class="li">联系电话：{{ details.phone }}</view>
				<view class="li">门店电话：{{ details.store_phone }}</view>
				<view class="li">营业时间：{{ details.open_hours }}</view>
				<view class="li">地址：{{ details.address }}</view>
			</view>
			<view class="location">
				<view class="btn_bg location_btn" @click="openLocation">
					<text class="iconfont icon-dizhi"></text>
					<text class="text">导航</text>
				</view>
			</view>
			<view class="line"></view>

			<!-- 详情图片 -->
			<view class="uv-content">
				<uv-parse :content="details.content" :tagStyle="contentStyle" :lazyLoad="true"></uv-parse>
			</view>
		</view>
	</view>

	<Bottom title="去下单" @bottom_click="open_classify"></Bottom>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onLoad, onPageScroll, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import useMenuButton from '../../hooks/useMenu.js';
import { storeDetails } from '@/api/index.js';
import Bottom from '../component/bottom.vue';

const params = ref({});

// 自提点信息
const details = ref({});

onLoad((load) => {
	params.value = JSON.parse(load.params);
	console.log('params', params.value);
	getStoreDetails();
});

// 获取自提点详情
const getStoreDetails = async () => {
	const res = await storeDetails(params.value);
	console.log('获取自提点详情', res);
	if (res.code == 1) {
		details.value = res.data;
	}
};

// 富文本样式
const contentStyle = ref({
	p: 'font-size:32rpx;line-height: 44rpx;',
	span: 'font-size: 30rpx,line-height: 40rpx;',
	text: 'font-size: 30rpx,line-height: 40rpx;',
	img: 'margin-bottom: 10rpx'
});

// 顶部区域滚动
const scrollTop = ref('white_default');
onPageScroll((e) => {
	if (e.scrollTop < 30) {
		scrollTop.value = 'white_default';
	}
	if (e.scrollTop > 30 && e.scrollTop < 60) {
		scrollTop.value = 'white_30';
	} else if (e.scrollTop > 60 && e.scrollTop < 100) {
		scrollTop.value = 'white_60';
	} else if (e.scrollTop > 100) {
		scrollTop.value = 'white_100';
	}
});

// 跳转分类 (自提)
const open_classify = () => {
	uni.$emit('delivery_type', { delivery_type: 1 });

	uni.switchTab({
		url: '/pages/classify/index'
	});
};

// 使用应用内置地图查看位置
const openLocation = () => {
	const longitude = Number(details.value.longitude);
	const latitude = Number(details.value.latitude);
	uni.openLocation({
		longitude,
		latitude,
		address: details.value.address,
		name: details.value.title
	});
};

// 返回上一页
function returnPage() {
	uni.navigateBack();
}

onShareAppMessage(() => {
	return {
		title: details.value.title,
		path: '/pages/index/index'
	};
});

onShareTimeline(() => {
	return {
		title: details.value.title,
		path: '/pages/index/index'
	};
});
</script>

<style lang="scss" scoped>
.page_title {
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	text-align: left;
	.icon {
		padding-left: 24rpx;
		position: relative;
		z-index: 20;
	}

	.title {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 26rpx;
	}
}
.white_default {
	background: transparent;
	border-bottom: 0;
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

.uv-content {
	font-size: 24rpx;
	line-height: 32rpx;
	margin-bottom: 10rpx;
}

.main {
	padding-bottom: 60rpx;
	.banner {
		position: relative;
		.cover {
			width: 750rpx;
			height: 750rpx;
		}

		.bottom_radius {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 50rpx;
			background: #fff;
			border-radius: 40rpx 40rpx 0 0;
		}
	}

	.store {
		padding: 0 30rpx;
		.head {
			display: flex;
			justify-content: space-between;
			.title {
				font-size: 32rpx;
				line-height: 42rpx;
				font-weight: 600;
				flex: 1;
			}

			.distance {
				font-size: 26rpx;
				color: #c2c2c2;
				flex: none;
			}
		}

		.info {
			padding: 20rpx 0;
			.li {
				font-size: 24rpx;
				line-height: 34rpx;
				color: #999999;
				padding: 6rpx 0;
			}
		}

		.location {
			text-align: right;
			display: flex;
			justify-content: flex-end;
			.location_btn {
				display: inline-block;
				border-radius: 45rpx;
				width: 136rpx;
				height: 54rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.iconfont {
					font-size: 24rpx;
					color: #fff;
				}

				.text {
					font-size: 24rpx;
					color: #fff;
					padding-left: 6rpx;
				}
			}
		}

		.line {
			margin: 30rpx 0;
			height: 1px;
			background: rgba(0, 0, 0, 0.1);
		}

		.lead {
			font-size: 26rpx;
			line-height: 42rpx;
			color: #999999;
			overflow: hidden;
		}

		.cover {
			width: 100%;
			margin: 20rpx 0;
		}
	}
}
</style>
