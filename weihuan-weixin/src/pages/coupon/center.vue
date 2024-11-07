<!-- 领劵中心 -->
<template>
	<view class="list">
		<view class="item" v-for="item in list" :key="item.id">
			<view class="box" :class="{ type2: item.type == 3 }" @click="open_details">
				<view class="ide">{{item.tips}}</view>
				<view class="price">{{ item.price }}</view>
				<view class="lead">{{ item.title }}</view>
				<view class="btn" @click.stop="get_coupon">立即领取</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
const list = ref([
	{
		id: 1,
		tips: '双11通用券',
		price: 150,
		title: '满600可用',
		type: 1
	},
	{
		id: 2,
		tips: '满减券',
		price: 150,
		title: '满400可用',
		type: 1
	},
	{
		id: 3,
		tips: '双11通用券',
		price: 150,
		title: '满500可用',
		type: 1
	},
	{
		id: 4,
		price: 150,
		tips: '双11通用券',
		title: '满600可用',
		type: 1
	},
	{
		id: 5,
		price: 150,
		tips: '双11通用券',
		title: '满300可用',
		type: 1
	},
	{
		id: 6,
		price: 150,
		tips: '满减券',
		title: '满1200可用',
		type: 1
	}
]);
// 优惠券详情
const open_details = () => {
	uni.navigateTo({
		url: '/pages/coupon/details'
	})
}

// 领取优惠券
function get_coupon() {
	uni.showToast({
		title: '领取成功',
		icon: 'none',
		duration: 2000,
		mask: true
	});
}
</script>

<style lang="scss" scoped>
.list {
	padding: 20rpx;
	display: flex;
	flex-wrap: wrap;
	.item {
		width: 354rpx;
		padding: 0 8rpx;
		margin-bottom: 16rpx;
		.box {
			height: 376rpx;
			border-radius: 14rpx;
			background: linear-gradient(154.39deg, #ff8992 0%, #fdba80 100%);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.ide {
				font-size: 32rpx;
				font-weight: 500;
				color: #fff;
			}

			.price {
				font-size: 82rpx;
				font-weight: 600;
				padding: 10rpx 0;
				color: #fff;
			}

			.lead {
				font-size: 26rpx;
				color: #fff;
				font-weight: 500;
			}

			.btn {
				width: 200rpx;
				height: 64rpx;
				line-height: 64rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #ff8992;
				border-radius: 45rpx;
				background: #fff;
				margin-top: 8rpx;
				text-align: center;
				margin-top: 30rpx;
			}

			.type2_btn {
				background: #000;
				color: #fff;
				opacity: 0.3;
			}

			.type3_btn {
				background: #000;
				color: #fff;
				opacity: 0.2;
			}
		}

		.type2 {
			background: #dfdfdf;
		}
	}
}
</style>
