<!-- 自提点 -->
<template>
	<!-- 顶部到胶囊的高度 -->
	<view class="top" :style="{ height: useMenuButton().top }"></view>
	<!-- 标题 -->
	<view class="page_title" :style="{ top: useMenuButton().top, height: useMenuButton().height, 'line-height': useMenuButton().height }">
		<view class="navigation_wrap">
			<view class="navigation box_border_radius box_shadow">
				<view class="navigation_btn active">门店自提</view>
				<view class="navigation_btn" @click="jump_list">门店列表</view>
			</view>
		</view>
	</view>
	<!-- 顶部导航栏占位符 -->
	<view :style="{ height: useMenuButton().topHeight + 'px' }"></view>

	<map
		:style="{ height: getSystem().screenHeight - useMenuButton().topHeight + 'px' }"
		class="map"
		id="mapId"
		ref="mapRef"
		:latitude="latitude"
		:longitude="longitude"
		:scale="scale"
		:markers="markersList"
		:show-location="true"
		:show-compass="true"
		:enable-rotate="true"
		:enable-traffic="true"
		:enable-poi="true"
		:enable-building="true"
		@markertap="markertap"
	></map>

	<swiper class="store box_border_radius box_shadow" circular :current="current" @change="swiperChange">
		<block v-for="item in markersList" :key="item.id">
			<swiper-item class="item">
				<view class="store_info" @click="open_details">
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
					<view class="location_btn btn_bg" @click="openLocation(item)">
						<text class="iconfont icon-dizhi"></text>
						<text class="text">导航</text>
					</view>
				</view>
			</swiper-item>
		</block>
	</swiper>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
// 胶囊信息
import useMenuButton from '../../hooks/useMenu.js';
// 系统信息
import getSystem from '../../hooks/getSystem.js';
import { storeList } from '@/api/index.js';

const mapContent = ref(null);
const latitude = ref(null);
const longitude = ref(null);
const scale = ref(16);
const defaultImg = ref('/static/img/map_store.png');
const iconActive = ref('/static/img/map.png');
const iconActiveWidth = ref(46);
const iconActiveHeight = ref(72);

// 标记点
const markersList = ref([
	{
		id: 3,
		width: iconActiveWidth.value,
		height: iconActiveHeight.value,
		latitude: 23.12463,
		longitude: 113.36199,
		title: '广东省广州市天河区黄埔大道中258号',
		iconPath: iconActive.value,
		image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/shop.png',
		store: '陈先生',
		mobile: 13636986542,
		date: '09:00 - 23:00',
		distance: '200m',
		callout: {
			content: '黄埔大道中258号店',
			display: 'ALWAYS',
			textAlign: 'center',
			padding: 7,
			bgColor: '#fff',
			borderRadius: 8,
			fontSize: 16,
			color: '#000'
		}
	},
	{
		id: 4,
		width: 28,
		height: 42,
		latitude: 23.122686,
		longitude: 113.36604,
		title: '广东省广州市天河区黄埔大道中199号',
		iconPath: '/static/img/map_store.png',
		image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/shop2.png',
		store: '陈先生',
		mobile: 13636986542,
		date: '09:00 - 23:00',
		distance: '200m',
		callout: {
			content: '黄埔大道中199店',
			display: 'ALWAYS',
			textAlign: 'center',
			padding: 7,
			bgColor: '#fff',
			borderRadius: 8,
			fontSize: 16,
			color: '#000'
		}
	},
	{
		id: 5,
		width: 28,
		height: 42,
		latitude: 23.12103843540073,
		longitude: 113.36126043914797,
		title: '广东省广州市天河区员村西街7号大院',
		iconPath: '/static/img/map_store.png',
		image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/shop.png',
		store: '陈先生',
		mobile: 13636986542,
		date: '09:00 - 23:00',
		distance: '200m',
		callout: {
			content: '员村西街7号大院',
			display: 'ALWAYS',
			textAlign: 'center',
			padding: 7,
			bgColor: '#fff',
			borderRadius: 8,
			fontSize: 16,
			color: '#000'
		}
	},
	{
		id: 6,
		width: 28,
		height: 42,
		latitude: 23.120406941577873,
		longitude: 113.35739805816652,
		title: '广东省广州市天河区员村南街',
		iconPath: '/static/img/map_store.png',
		image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/shop2.png',
		store: '陈先生',
		mobile: 13636986542,
		date: '09:00 - 23:00',
		distance: '200m',
		callout: {
			content: '员村南街',
			display: 'ALWAYS',
			textAlign: 'center',
			padding: 7,
			bgColor: '#fff',
			borderRadius: 8,
			fontSize: 16,
			color: '#000'
		}
	},
	{
		id: 7,
		width: 28,
		height: 42,
		latitude: 23.128132,
		longitude: 113.365929,
		title: '广东省广州市天河区黄埔大道员村段',
		iconPath: '/static/img/map_store.png',
		image: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/shop.png',
		store: '陈先生',
		mobile: 13636986542,
		date: '09:00 - 23:00',
		distance: '200m',
		callout: {
			content: '黄埔大道员村店',
			display: 'ALWAYS',
			textAlign: 'center',
			padding: 7,
			bgColor: '#fff',
			borderRadius: 8,
			fontSize: 16,
			color: '#000'
		}
	}
]);

// 获取自提点列表
const get_location = () => {
	uni.showLoading({
		title: '加载中...',
		mask: true
	});

	uni.getLocation({
		type: 'gcj02',
		success: async (res) => {
			console.log('res', res);
			latitude.value = res.latitude;
			longitude.value = res.longitude;
			if (res.latitude && res.longitude) {
				const params = {
					longitude: longitude.value,
					latitude: latitude.value
				};
				const res = await storeList(params);
				console.log('自提点列表', res);
				if (res.code == 1) {
					mapContent.value = uni.createMapContext('mapId', proxy);
				}
			}
		},
		fail: (err) => {
			console.log('err', err);
		}
	});

	uni.hideLoading();
};

// 轮播切换
const current = ref(0);

// 点击标记点
const markertap = (e) => {
	const index = markersList.value.findIndex((item) => item.id == e.detail.markerId);
	current.value = index;
	moverTo(index);
};

// 轮播切换
const swiperChange = (e) => {
	current.value = e.detail.current;
	moverTo(current.value);
};

// 地图切换中心点，更新导航APP信息
const moverTo = (index) => {
	// 将地图中心移动到当前定位点
	mapContent.value.moveToLocation({
		longitude: markersList.value[index].longitude,
		latitude: markersList.value[index].latitude,
		success: (moveToRes) => {
			markersList.value.forEach((item) => {
				item.iconPath = defaultImg.value;
				item.width = 28;
				item.height = 42;
			});

			markersList.value[index].iconPath = iconActive.value;
			markersList.value[index].width = iconActiveWidth.value;
			markersList.value[index].height = iconActiveHeight.value;
		},
		fail: (moveToErr) => {
			console.log('moveToErr', moveToErr);
		}
	});
};

// 拉起第三方app-选择导航地图
const openMapApp = (item) => {
	mapContent.openMapApp({
		longitude: item.longitude,
		latitude: item.latitude,
		destination: item.title
	});
};

const jump_list = () => {
	uni.navigateTo({
		url: '/pages/self_pick_up/list'
	});
};

function open_details() {
	uni.navigateTo({
		url: '/pages/self_pick_up/details'
	});
}

// 打开地图
const openLocation = (item) => {
	uni.openLocation({
		latitude: item.latitude,
		longitude: item.longitude,
		address: item.title,
		name: item.callout.content
	});
};

onMounted(() => {
	get_location();
});
</script>

<style lang="scss" scoped>
.top {
	background: #fff;
}

.page_title {
	background: #fff;
	text-align: left;
}

.map {
	width: 750rpx;
	box-sizing: border-box;
}

.store {
	position: fixed;
	bottom: 20rpx;
	left: 50%;
	transform: translateX(-50%);
	width: 690rpx;
	height: 390rpx;
	background: #fff;
	padding: 30rpx;
	box-sizing: border-box;

	.item {
		height: 100%;
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
