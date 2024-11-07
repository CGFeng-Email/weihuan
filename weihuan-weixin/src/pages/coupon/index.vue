<!-- 我的优惠卷 -->
<template>
	<!-- 导航栏组件 -->
	<navigate :list="navigate" :itemIndex="navigateIndex" @itemClick="navigateItem"></navigate>
	<view class="list">
		<view class="item" v-for="item in list" :key="item.id">
			<view class="box" :class="{ type2: item.type == 3 }" @click="open_details">
				<view class="ide">{{ item.title }}</view>
				<view class="price">{{ item.price }}</view>
				<view class="lead">{{ item.tips }}</view>
				<view class="btn" @click.stop="use_coupon" v-if="item.type == 1">立即使用</view>
				<view class="btn" :class="{ type2_btn: item.type == 2 }" v-else-if="item.type == 2">已使用</view>
				<view class="btn" :class="{ type3_btn: item.type == 3 }" v-else>已过期</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import Navigate from '../component/navigate.vue';
const navigateIndex = ref(0);
const navigate = ref([
	{
		title: '全部'
	},
	{
		title: '待使用'
	},
	{
		title: '已使用'
	},
	{
		title: '已过期'
	}
]);

const navigateItem = (e) => {
	navigateIndex.value = e.i;
};

const list = ref([
	{
		id: 1,
		title: '双11通用券',
		price: 150,
		tips: '满600可用',
		type: 1
	},
	{
		id: 2,
		title: '满减券',
		price: 150,
		tips: '满600可用',
		type: 1
	},
	{
		id: 3,
		title: '双11通用券',
		price: 150,
		tips: '满600可用',
		type: 2
	},
	{
		id: 4,
		price: 150,
		title: '双11通用券',
		tips: '满600可用',
		type: 2
	},
	{
		id: 5,
		price: 150,
		title: '双11通用券',
		tips: '满600可用',
		type: 3
	},
	{
		id: 6,
		price: 150,
		title: '满减券',
		tips: '满600可用',
		type: 3
	}
]);

// 跳转优惠券详情
const open_details = () => {
	uni.navigateTo({
		url: '/pages/coupon/details'
	});
};

// 使用优惠券
function use_coupon() {
	uni.switchTab({
		url: '/pages/shopping/index'
	});
}
</script>

<style>
page {
	background: #fbfbfb;
}
</style>

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
