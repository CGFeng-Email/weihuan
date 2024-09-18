<template>
	<view class="banner">
		<image src="../../static/index/banner.png" mode="widthFix"></image>
	</view>
	<!-- 占位 -->
	<view :style="{ height: useMenuButton().top }"></view>
	<!-- 标题 -->
	<view class="page_title" :style="{ height: useMenuButton().height, 'line-height': useMenuButton().height }">炜洹商城</view>
	<!-- 地址，搜索 -->
	<view class="location">
		<view class="address" @click="jump_selectAddress">
			<text class="iconfont icon-dizhi"></text>
			<text class="text">广州.荔湾</text>
		</view>
		<view class="search">
			<text class="iconfont icon-sousuo"></text>
			<text class="text">进口美国3A牛肉</text>
		</view>
	</view>
	<!-- 占位 -->
	<view class="" style="height: 510rpx"></view>
	<!-- 用户信息 -->
	<view class="user" v-if="true">
		<view class="wrap">
			<image class="head_portrait" src="/src/static/img/head_portrait.png" mode="widthFix"></image>
			<view class="content">
				<view class="name">{{ user_title }}</view>
				<view class="lead">
					{{ user_lead }}
				</view>
			</view>
			<view class="login_btn">登录/注册</view>
		</view>
	</view>
	<view class="uese" v-else>
		<view class="wrap">
			<view class="head_portrait">
				<image class="cover" src="/static/img/head_portrait.png" mode="widthFix"></image>
				<image class="vip" src="/static/img/head_vip.png" mode="widthFix"></image>
			</view>
			<view class="content">
				<view class="name">
					{{ user_title }}
					<image class="vip" src="/static/img/vip.png" mode="widthFix"></image>
				</view>
				<view class="lead">
					{{ userMobileComputed }}
				</view>
			</view>
			<image class="star_cover" src="/src/static/img/user_star.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
// 胶囊信息
import useMenuButton from '../../hooks/useMenu.js';
console.log('useMenuButton', useMenuButton());

const user_title = ref('炜洹游客用户');
const user_lead = ref('为给您提供更好的服务请授权登录');
const user_mobile = ref('13428198898');

// 手机号码加密
const userMobileComputed = computed(() => {
	return user_mobile.value.substr(0, 3) + '****' + user_mobile.value.substring(7);
});

// 跳转选择收货地址
const jump_selectAddress = () => {
	uni.navigateTo({
		url: '/pages/select_address/index'
	});
};

// 获取用户经纬度
const getLocation = () => {
	uni.getLocation({
		type: 'wgs84',
		success: (res) => {
			console.log('获取经纬度', res);
		},
		fail: (err) => {
			console.log('err', err);
			uni.authorize({
				scope: 'scope.userLocation',
				success: (authorizeRes) => {
					console.log('authorizeRes', authorizeRes);
				},
				fail: (authoruzeErr) => {
					console.log('authoruzeErr', authoruzeErr);
					uni.showModal({
						content: '当前位置有偏差？快去授权',
						success: function (modal) {
							if (modal.confirm) {
								console.log('去授权');
								uni.openSetting({
									success: (openSetting) => {
										console.log('openSetting', openSetting);
										getLocation();
									},
									fail: (openSettingErr) => {
										console.log('openSettingErr', openSettingErr);
									}
								});
							} else if (modal.cancel) {
								console.log('取消');
							}
						}
					});
				}
			});
		}
	});
};

getLocation();
</script>

<style lang="scss" scoped>
.banner {
	position: fixed;
	width: 100%;
	z-index: -1;
	image {
		width: 100%;
	}
}

.location {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 30rpx;
	.address {
		font-size: 26rpx;
		color: #fff;
		font-weight: 500;
		display: flex;
		align-items: center;
		.text {
			padding: 0 12rpx;
		}
	}

	.search {
		flex: 1;
		height: 60rpx;
		border: 1px solid rgba(255, 255, 255, 0.7);
		border-radius: 45rpx;
		display: flex;
		align-items: center;
		background: rgba(255, 255, 255, 0.3);
		padding: 0 30rpx;
		margin-left: 15rpx;

		.iconfont {
			font-size: 26rpx;
			font-weight: 500;
			color: #fff;
			flex: none;
		}

		.text {
			flex: 1;
			font-size: 24rpx;
			font-weight: 500;
			color: #fff;
			padding-left: 15rpx;
		}
	}
}

.user {
	width: 690rpx;
	border-radius: 20rpx;
	background: #fff;
	box-shadow: 0 0 30rpx #78787821;
	margin: auto;

	.wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;

		.head_portrait {
			width: 104rpx;
			height: 140rpx;
			flex: none;
			position: relative;
			.cover {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}

			.vip {
				position: absolute;
				top: -16rpx;
				right: -6rpx;
				width: 37rpx;
			}
		}

		.content {
			flex: 1;
			padding: 0 16rpx;
			.name {
				font-size: 30rpx;
				font-weight: 600;
				color: #000;
			}
			.vip {
				width: 46rpx;
			}
			.lead {
				font-size: 24rpx;
				color: #000;
				margin-top: 10rpx;
			}
		}

		.login_btn {
			flex: none;
			width: 180rpx;
			height: 60rpx;
			border-radius: 30rpx;
			background: linear-gradient(275.93deg, #fdbc80 0%, #ff8992 100%);
			font-size: 24rpx;
			color: #fff;
			text-align: center;
			line-height: 60rpx;
		}

		.star_cover {
			width: 200rpx;
		}
	}
}
</style>
