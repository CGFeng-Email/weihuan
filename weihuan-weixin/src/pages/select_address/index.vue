<template>
	<view class="location">
		<view class="address">{{ address }}</view>
		<view class="relocation" v-if="location" @click="getLocation">
			<text class="iconfont icon-zhongxindingwei"></text>
			<text class="text">重新定位</text>
		</view>
		<view class="relocation" v-else @click="jump_openSetting">
			<text class="iconfont icon-zhongxindingwei"></text>
			<text class="text">打开授权</text>
		</view>
	</view>
	<view class="my_address">
		<view class="head">
			<text class="iconfont icon-shouye"></text>
			<text class="text">我的收货地址</text>
		</view>
		<!-- 提示登录 -->
		<view class="tips_login">
			<view class="title">登录后查看我的收货地址</view>
			<view class="login_btn">立即登录</view>
		</view>
		<!-- 我的地址列表 -->
		<view class="address_list">
			<view class="li">
				<view class="title">崧茶怡品·园林茶馆(信息港店)</view>
				<view class="address_info">
					<text class="name">陈志远</text>
					<text class="age">先生</text>
					<text class="mobile">13428197788</text>
				</view>
			</view>
			<view class="li">
				<view class="title">崧茶怡品·园林茶馆(信息港店)</view>
				<view class="address_info">
					<text class="name">陈志远</text>
					<text class="age">先生</text>
					<text class="mobile">13428197788</text>
				</view>
			</view>
			<view class="li">
				<view class="title">崧茶怡品·园林茶馆(信息港店)</view>
				<view class="address_info">
					<text class="name">陈志远</text>
					<text class="age">先生</text>
					<text class="mobile">13428197788</text>
				</view>
			</view>
			<view class="li">
				<view class="title">崧茶怡品·园林茶馆(信息港店)</view>
				<view class="address_info">
					<text class="name">陈志远</text>
					<text class="age">先生</text>
					<text class="mobile">13428197788</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
const address = ref('当前位置有偏差？快去授权');
let location = ref(true);

// 跳转到权限设置页面
const jump_openSetting = () => {
	uni.openSetting({
		success(res) {
			console.log('openSetting', res);
			if (res.authSetting['scope.userLocation']) {
				location.value = true;
				getLocation();
			}
		}
	});
};

// 获取用户经纬度
const getLocation = () => {
	uni.getLocation({
		type: 'wgs84',
		success: (res) => {
			console.log('获取经纬度', res);
			address.value = res.latitude + ' ' + res.longitude;
		},
		fail: (err) => {
			console.log('err', err);
			location.value = false;
			jump_openSetting;
		}
	});
};

getLocation();
</script>

<style lang="scss" scoped>
.location {
	padding: 0 30rpx;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);

	.address {
		padding: 30rpx 0;
		font-size: 28rpx;
		line-height: 34rpx;
		color: #000;
		font-weight: 500;
		flex: 1;
	}

	.relocation {
		flex: none;
		padding-left: 10rpx;
		padding: 30rpx 0;
		display: flex;
		align-items: center;
		.iconfont {
			font-size: 28rpx;
			font-weight: 500;
			color: #eb6f15;
			padding: 0 8rpx;
		}

		.text {
			font-size: 24rpx;
			font-weight: 500;
			color: #eb6f15;
		}
	}
}

.my_address {
	padding: 30rpx;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	.head {
		.iconfont {
			font-size: 34rpx;
			font-weight: 500;
			color: #9a9a9a;
		}
		.text {
			font-size: 28rpx;
			font-weight: 500;
			color: #9a9a9a;
			padding-left: 6rpx;
		}
	}

	.tips_login {
		padding-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.title {
			padding-left: 46rpx;
			font-size: 28rpx;
			font-weight: 500;
			color: #9a9a9a;
			flex: 1;
		}

		.login_btn {
			background: #fae005;
			color: #000;
			font-size: 28rpx;
			font-weight: 500;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			flex: none;
			border-radius: 24rpx;
			margin-left: 28rpx;
			padding: 0 14rpx;
		}
	}

	.address_list {
		.li {
			padding: 30rpx 46rpx;
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
			.title {
				font-size: 28rpx;
				line-height: 36rpx;
				color: #000;
				font-weight: 500;
			}
			.address_info {
				padding-top: 20rpx;
				.name,
				.age,
				.mobile {
					font-size: 26rpx;
					color: #9a9a9a;
				}

				.age {
					padding: 0 10rpx;
				}
			}
		}

		.li:last-child {
			border-bottom: 0;
			padding-bottom: 0;
		}
	}
}
</style>
