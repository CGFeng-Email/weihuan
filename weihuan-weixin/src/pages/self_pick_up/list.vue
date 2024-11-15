<!-- 自提点列表 -->
<template>
	<!-- 顶部到胶囊的高度 -->
	<view class="top" :style="{ height: useMenuButton().top }"></view>
	<!-- 标题 -->
	<view class="page_title" :style="{ top: useMenuButton().top, height: useMenuButton().height, 'line-height': useMenuButton().height }">
		<view class="navigation_wrap">
			<view class="navigation box_border_radius box_shadow">
				<view class="navigation_btn" @click="returnPage">门店自提</view>
				<view class="navigation_btn btn_bg active">门店列表</view>
			</view>
		</view>
	</view>

	<!-- 地址，搜索 -->
	<view class="location_search" :style="{ top: useMenuButton().topView }">
		<view class="address" @click="jump_selectAddress">
			<text class="iconfont icon-dizhi"></text>
			<text class="text">广州.荔湾</text>
		</view>
		<view class="search" @click="open_shopping_search">
			<text class="iconfont icon-sousuo"></text>
			<text class="text">请输入关键字</text>
		</view>
	</view>

	<view :style="{ height: useMenuButton().top }"></view>
	<view :style="{ height: useMenuButton().height }"></view>
	<view style="height: 36px"></view>

	<!-- 列表 -->
	<view class="list">
		<block v-for="(item, index) in markersList" :key="index">
			<view class="item box_border_radius box_shadow" @click="jump_details">
				<view class="store_info">
					<image class="cover" :src="item.image" mode="aspectFill"></image>
					<view class="content">
						<view class="store_top">
							<view class="title over2">
								{{ item.callout.content }}
							</view>
							<view class="distance">
								{{ item.distance }}
							</view>
						</view>
						<view class="store_bottom">
							<view class="li">
								<text class="name">联系人：</text>
								<text class="text">{{ item.store }}</text>
							</view>
							<view class="li">
								<text class="name">联系电话：</text>
								<text class="text">{{ item.mobile }}</text>
							</view>
							<view class="li">
								<text class="name">营业时间：</text>
								<text class="text">{{ item.date }}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="address">
					<view class="location over2">
						{{ item.title }}
					</view>
					<view class="location_btn btn_bg" @click.stop="openLocation(item)">
						<text class="iconfont icon-dizhi"></text>
						<text class="text">导航</text>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script setup>
// 胶囊信息
import useMenuButton from '../../hooks/useMenu.js';
import { ref, onMounted } from 'vue';
// 页面加载
const loading = ref(false);

// 跳转选择收货地址
const jump_selectAddress = () => {
	uni.navigateTo({
		url: '/pages/select_address/index'
	});
};

// 标记点
const markersList = ref([
	{
		id: 3,
		width: 28,
		height: 41,
		latitude: 23.12463,
		longitude: 113.36199,
		title: '广东省广州市天河区黄埔大道中258号',
		iconPath: '/static/img/map.png',
		image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/shop.png',
		store: '陈先生',
		mobile: 13636986542,
		date: '09:00 - 23:00',
		distance: '200m',
		callout: {
			content: '黄埔大道中258号店',
			display: 'ALWAYS',
			textAlign: 'center',
			padding: '6',
			bgColor: '#fff',
			borderRadius: 8,
			fontSize: 14,
			color: '#000'
		}
	},
	{
		id: 4,
		width: 28,
		height: 41,
		latitude: 23.122686,
		longitude: 113.36604,
		title: '广东省广州市天河区黄埔大道中199号',
		iconPath: '/static/img/map.png',
		image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/shop2.png',
		store: '陈先生',
		mobile: 13636986542,
		date: '09:00 - 23:00',
		distance: '200m',
		callout: {
			content: '黄埔大道中199店',
			display: 'ALWAYS',
			textAlign: 'center',
			padding: '6',
			bgColor: '#fff',
			borderRadius: 8,
			fontSize: 14,
			color: '#000'
		}
	},
	{
		id: 5,
		width: 28,
		height: 41,
		latitude: 23.12103843540073,
		longitude: 113.36126043914797,
		title: '广东省广州市天河区员村西街7号大院',
		iconPath: '/static/img/map.png',
		image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/shop.png',
		store: '陈先生',
		mobile: 13636986542,
		date: '09:00 - 23:00',
		distance: '200m',
		callout: {
			content: '员村西街7号大院',
			display: 'ALWAYS',
			textAlign: 'center',
			padding: '6',
			bgColor: '#fff',
			borderRadius: 8,
			fontSize: 14,
			color: '#000'
		}
	},
	{
		id: 6,
		width: 28,
		height: 41,
		latitude: 23.120406941577873,
		longitude: 113.35739805816652,
		title: '广东省广州市天河区员村南街',
		iconPath: '/static/img/map.png',
		image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/shop2.png',
		store: '陈先生',
		mobile: 13636986542,
		date: '09:00 - 23:00',
		distance: '200m',
		callout: {
			content: '员村南街',
			display: 'ALWAYS',
			textAlign: 'center',
			padding: '6',
			bgColor: '#fff',
			borderRadius: 8,
			fontSize: 14,
			color: '#000'
		}
	},
	{
		id: 7,
		width: 28,
		height: 41,
		latitude: 23.128132,
		longitude: 113.365929,
		title: '广东省广州市天河区黄埔大道员村段',
		iconPath: '/static/img/map.png',
		image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/shop.png',
		store: '陈先生',
		mobile: 13636986542,
		date: '09:00 - 23:00',
		distance: '200m',
		callout: {
			content: '黄埔大道员村店',
			display: 'ALWAYS',
			textAlign: 'center',
			padding: '6',
			bgColor: '#fff',
			borderRadius: 8,
			fontSize: 14,
			color: '#000'
		}
	}
]);

// 返回上一页
const returnPage = () => {
	uni.navigateBack();
};

// 使用应用内置地图查看位置
const openLocation = (item) => {
	uni.openLocation({
		latitude: item.latitude,
		longitude: item.longitude,
		address: item.title,
		name: item.callout.content
	});
};

// 跳转详情
const jump_details = () => {
	uni.navigateTo({
		url: '/pages/self_pick_up/details'
	});
};

// 跳转搜索商品页
function open_shopping_search() {
	uni.navigateTo({
		url: '/pages/shopping/shopping_search'
	})
}

onMounted(() => {
	loading.value = true;
});
</script>

<style>
page {
	background: #fbfbfb;
}
</style>

<style lang="scss" scoped>
.top {
	background: #fff;
}

.page_title {
	background: #fff;
	text-align: left;
	padding-left: 20rpx;
	.navigation_wrap {
		display: inline-block;
	}
	.navigation {
		display: flex;
		text-align: center;
		border-radius: 34rpx;
		overflow: hidden;
		.navigation_btn {
			min-width: 134rpx;
			height: 56rpx;
			line-height: 56rpx;
			font-size: 24rpx;
			font-weight: 500;
			padding: 0 30rpx;
		}
	}

	.active {
		color: #fff;
	}
}

.location_search {
	background: #fff;
	position: fixed;
	left: 0;
	right: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 30rpx 12rpx;
	z-index: 2;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);

	.address {
		font-size: 26rpx;
		color: #ff8992;
		font-weight: 500;
		display: flex;
		align-items: center;
		flex: none;
		.text {
			padding: 0 12rpx;
			color: #000;
		}
	}

	.search {
		flex: 1;
		height: 60rpx;
		border-radius: 45rpx;
		display: flex;
		align-items: center;
		background: #f9f9f9;
		padding: 0 30rpx;
		margin-left: 15rpx;

		.iconfont {
			font-size: 26rpx;
			font-weight: 500;
			color: #ff8992;
			flex: none;
		}

		.text {
			flex: 1;
			font-size: 24rpx;
			font-weight: 500;
			color: #b5b5b5;
			padding-left: 15rpx;
		}
	}
}

.list {
	padding: 20rpx 20rpx 40rpx;
	.item {
		padding: 20rpx;
		margin-bottom: 20rpx;
		background: #fff;
		.store_info {
			display: flex;
			justify-content: space-between;
			.cover {
				width: 210rpx;
				height: 210rpx;
				flex: none;
			}

			.content {
				flex: 1;
				padding-left: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.store_top {
					display: flex;
					justify-content: space-between;
					.title {
						font-size: 28rpx;
						font-weight: bold;
						flex: 1;
					}

					.distance {
						font-size: 24rpx;
						color: #c2c2c2;
						flex: none;
					}
				}

				.store_bottom {
					.li {
						font-size: 24rpx;
						color: #999999;
						line-height: 34rpx;
						padding: 6rpx 0;
					}
				}
			}
		}

		.address {
			margin-top: 20rpx;
			padding-top: 20rpx;
			border-top: 1px solid rgba(0, 0, 0, 0.1);
			display: flex;
			justify-content: space-between;
			.location {
				font-size: 24rpx;
				color: #999999;
				flex: 1;
			}

			.location_btn {
				flex: none;
				width: 124rpx;
				height: 52rpx;
				line-height: 52rpx;
				text-align: center;
				font-size: 24rpx;
				color: #fff;
				border-radius: 45rpx;
				.iconfont {
					font-size: 24rpx;
					padding-right: 8rpx;
				}
			}
		}
	}
}
</style>
