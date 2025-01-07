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
	<!-- <view class="location_search" :style="{ top: useMenuButton().topView }">
		<view class="address" @click="jump_selectAddress">
			<text class="iconfont icon-dizhi"></text>
			<text class="text">{{ address }}</text>
		</view>
		<view class="search" @click="open_shopping_search">
			<text class="iconfont icon-sousuo"></text>
			<text class="text">请输入关键字</text>
		</view>
	</view -->
	>

	<view :style="{ height: useMenuButton().top }"></view>
	<!-- <view :style="{ height: useMenuButton().height }"></view> -->
	<!-- <view style="height: 36px"></view> -->
	<view style="height: 20rpx"></view>

	<!-- 列表 -->
	<view class="list">
		<block v-for="(item, index) in markersList" :key="index">
			<view class="item box_border_radius box_shadow" @click="open_details(item)">
				<view class="store_info">
					<image class="cover" :src="item.image" mode="aspectFill"></image>
					<view class="content">
						<view class="store_top">
							<view class="title over2">
								{{ item.title }}
							</view>
							<view class="distance">
								{{ item.distance }}
							</view>
						</view>
						<view class="store_bottom">
							<view class="li">
								<text class="name">联系人：</text>
								<text class="text">{{ item.contact }}</text>
							</view>
							<view class="li">
								<text class="name">联系电话：</text>
								<text class="text">{{ item.phone }}</text>
							</view>
							<view class="li">
								<text class="name">门店电话：</text>
								<text class="text">{{ item.store_phone }}</text>
							</view>
							<view class="li">
								<text class="name">营业时间：</text>
								<text class="text">{{ item.open_hours }}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="address">
					<view class="location over2">
						{{ item.address }}
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
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
// 胶囊信息
import useMenuButton from '../../hooks/useMenu.js';
import { ref } from 'vue';
import { storeList } from '@/api/index.js';

// 是否选择自提点，并且返回
const isSelect = ref(false);
const address = ref('');
const markersList = ref([]);
const location = ref({});

onLoad((load) => {
	console.log('load', load);
	isSelect.value = load.select;

	// 地区
	const getLocation = uni.getStorageSync('location');
	address.value = getLocation.address.district;

	// 经纬度
	if (load.location) {
		// 使用用户精准的经纬度
		location.value = JSON.parse(load.location);
	} else {
		// 使用ip经纬度
		location.value = {
			longitude: getLocation.location.lng,
			latitude: getLocation.location.lat
		};
	}

	// 自提点列表
	getStoreList();
});

// 获取自提点列表
const getStoreList = async () => {
	const res = await storeList(location.value);
	console.log('获取自提点列表', res);
	if (res.code == 1) {
		markersList.value = res.data;
	}
};

// 选择地区
const jump_selectAddress = () => {
	uni.navigateTo({
		url: '/pages/select_address/index'
	});
};

// 返回上一页
const returnPage = () => {
	uni.navigateBack();
};

// 打开地图
const openLocation = (item) => {
	// console.log('item', item);
	const longitude = Number(item.longitude);
	const latitude = Number(item.latitude);
	uni.openLocation({
		longitude,
		latitude,
		address: item.address,
		name: item.title
	});
};

// 自提点详情
function open_details(item) {
	if (isSelect.value) {
		uni.$emit('selectStore', item);
		uni.navigateBack();
	} else {
		const params = {
			id: item.id,
			longitude: location.value.longitude,
			latitude: location.value.latitude
		};

		uni.navigateTo({
			url: `/pages/self_pick_up/details?params=${JSON.stringify(params)}`
		});
	}
}

// 跳转搜索商品页
function open_shopping_search() {
	uni.navigateTo({
		url: '/pages/shopping/shopping_search'
	});
}

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

<style lang="scss" scoped>
.top {
	background: #fff;
}

.page_title {
	background: #fff;
	text-align: left;
	.navigation_wrap {
		display: inline-block;
	}
	.navigation {
		display: flex;
		text-align: center;
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
