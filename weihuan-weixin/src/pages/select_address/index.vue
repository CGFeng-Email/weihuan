<!-- 定位地址，选择城市定位 -->
<template>
	<view class="location">
		<view class="address">{{ province }}{{ city }}{{ address }}</view>
		<view class="relocation" @click="getLocation">
			<text class="iconfont icon-zhongxindingwei"></text>
			<text class="text">重新定位</text>
		</view>
	</view>

	<view class="my_address">
		<view class="head">
			<text class="iconfont icon-shouye"></text>
			<text class="text">我的收货地址</text>
		</view>

		<!-- 我的地址列表 -->
		<view class="address_list" v-if="userMobile">
			<!-- <view class="li">
				<view class="title">崧茶怡品·园林茶馆(信息港店)</view>
				<view class="address_info">
					<text class="name">陈志远</text>
					<text class="age">先生</text>
					<text class="mobile">13428197788</text>
				</view>
			</view> -->

			<view class="empty">
				<view class="to_btn">
					<button class="btn_bg" @click="open_addressList">添加地址</button>
				</view>
				<emptyComp tips="请先添加地址" />
			</view>
		</view>

		<!-- 提示登录 -->
		<view class="tips_login" v-else>
			<view class="title">登录后查看我的收货地址</view>
			<view class="login_btn">立即登录</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPhoneLocation, getUserData } from '@/api/index.js';
import emptyComp from '../component/empty.vue';
const province = ref(null);
const city = ref(null);
const address = ref(null);
const userMobile = ref(null);

// 获取定位ip
const getLocation = async () => {
	uni.showLoading({
		title: '加载中',
		mask: true
	});
	const res = await getPhoneLocation();
	province.value = res.data.ad_info.province;
	city.value = res.data.ad_info.city;
	address.value = res.data.ad_info.district;
	uni.hideLoading();
};

// 用户信息
const getUserDataFn = async () => {
	const res = await getUserData();
	userMobile.value = res.data.mobile;
};

// 跳转新增地址
function open_addressList() {
	uni.navigateTo({
		url: '/pages/address/add_address'
	});
}

onMounted(() => {
	getLocation();
	getUserDataFn();
});
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
			// border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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

.empty {
	.to_btn {
		text-align: right;
		button {
			display: inline-block;
			width: 200rpx;
			color: #fff;
			font-weight: 500;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 26rpx;
			border-radius: 24rpx 6rpx;
		}
	}
}
</style>
