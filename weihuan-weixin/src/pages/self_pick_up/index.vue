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
				<view class="store_info" @click="open_details(item.id)">
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
import { onPullDownRefresh, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';

const mapContent = ref(null);
const latitude = ref(null);
const longitude = ref(null);
const scale = ref(16);
const defaultImg = ref('/static/img/map_store.png');
const iconActive = ref('/static/img/map.png');
const iconActiveWidth = ref(38);
const iconActiveHeight = ref(62);

// 标记点
const markersList = ref([]);

// 获取自提点列表
const get_location = () => {
	uni.showLoading({
		title: '加载中...',
		mask: true
	});

	uni.getLocation({
		type: 'gcj02',
		success: async (res) => {
			latitude.value = res.latitude;
			longitude.value = res.longitude;
			getStoreList({
				longitude: res.longitude,
				latitude: res.latitude
			});
		},
		fail: (err) => {
			console.log('拒绝地址授权', err);
			const value = uni.getStorageSync('location');
			longitude.value = value.location.lng;
			latitude.value = value.location.lat;
			getStoreList({
				longitude: value.location.lng,
				latitude: value.location.lat
			});
		}
	});

	uni.hideLoading();
};

// 获取自提点列表
const getStoreList = async (params) => {
	const res = await storeList(params);
	if (res.code == 1) {
		mapContent.value = uni.createMapContext('mapId', proxy);
		if (res.data.length > 0) {
			const list = res.data.map((item, index) => {
				item.longitude = Number(item.longitude);
				item.latitude = Number(item.latitude);
				if (index == 0) {
					item.width = iconActiveWidth.value;
					item.height = iconActiveHeight.value;
					item.iconPath = iconActive.value;
				} else {
					item.width = 28;
					item.height = 42;
					item.iconPath = defaultImg.value;
				}

				item.callout = {
					content: item.title,
					display: 'ALWAYS',
					textAlign: 'center',
					padding: 7,
					bgColor: '#fff',
					borderRadius: 4,
					fontSize: 14,
					color: '#000'
				};
				return item;
			});
			markersList.value = list;
			console.log('自提点列表', markersList.value);
		}
	}
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

// 自提点列表
const jump_list = () => {
	const location = {
		longitude: longitude.value,
		latitude: latitude.value
	};

	uni.navigateTo({
		url: `/pages/self_pick_up/list?location=${JSON.stringify(location)}`
	});
};

// 打开地图
const openLocation = (item) => {
	console.log('item', item);
	uni.openLocation({
		longitude: item.longitude,
		latitude: item.latitude,
		address: item.address,
		name: item.title
	});
};

// 自提点详情
function open_details(id) {
	const params = {
		id,
		longitude: longitude.value,
		latitude: latitude.value
	};

	uni.navigateTo({
		url: `/pages/self_pick_up/details?params=${JSON.stringify(params)}`
	});
}

onShareAppMessage(() => {
	return {
		title: '自提点 | WakanMALL',
		path: '/pages/index/index'
	};
});

onShareTimeline(() => {
	return {
		title: '自提点 | WakanMALL',
		path: '/pages/index/index'
	};
});

onMounted(() => {
	get_location();
});

onPullDownRefresh(() => {
	get_location();
	// 关闭下拉刷新
	uni.stopPullDownRefresh();
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
