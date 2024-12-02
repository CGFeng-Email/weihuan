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
		<view class="address_list">
			<view class="wrap" v-if="shoppingList.length > 0">
				<block v-for="item in shoppingList" :key="item.id">
					<view class="li">
						<view class="address_info">
							<text class="name">{{ item.consignee }}</text>
							<text class="mobile">{{ item.mobile }}</text>
						</view>
						<view class="title">{{ item.province }}{{ item.city }}{{ item.district }}</view>
						<view class="lead">{{ item.address }}</view>
					</view>
				</block>
			</view>

			<view class="empty" v-else>
				<Empty tips="暂无收货地址" />
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPhoneLocation, getUserData, getShoppingAddress } from '@/api/index.js';
import Empty from '../component/empty.vue';
const province = ref(null);
const city = ref(null);
const address = ref(null);
const shoppingList = ref([]);

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

// 获取收货地址
const getShoppingAddressList = async () => {
	const res = await getShoppingAddress({ size: 20 });
	if (res.code == 1) {
		shoppingList.value = res.data.lists;
	}
};

onMounted(() => {
	getLocation();
	getShoppingAddressList();
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
		font-size: 32rpx;
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
		}
		.text {
			font-size: 32rpx;
			font-weight: 500;
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
			margin: 30rpx 0;
			padding: 30rpx;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
			border-radius: 8rpx;

			.address_info {
				.name,
				.mobile {
					font-size: 30rpx;
					font-weight: 600;
				}

				.name {
					padding-right: 10rpx;
				}
			}

			.title {
				font-size: 28rpx;
				line-height: 36rpx;
				font-weight: 500;
				padding: 10rpx 0;
				font-weight: 600;
			}

			.lead {
				font-size: 26rpx;
				font-weight: 500;
			}
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
