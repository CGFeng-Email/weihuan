<template>
	<!-- 打开弹窗时，禁止滑动页面，必须要在第一个节点 -->
	<page-meta :page-style="'overflow:' + (show ? 'hidden' : 'visible')"></page-meta>

	<!-- 搜索 -->
	<view class="search_box">
		<view class="search">
			<i class="iconfont icon-sousuo"></i>
			<text class="text">请输入关键字</text>
		</view>
	</view>

	<!-- 导航栏 -->
	<navigate class="top_navigate" :list="navList" :itemIndex="itemIndex" top="40px" @itemClick="itemClick" />

	<!-- 占位 -->
	<view style="height: 82px"></view>

	<view class="main">
		<!-- 列表 -->
		<view class="list">
			<block v-for="(item, index) in shopping_list" :key="item.id">
				<OrderItem :item="item" :state_btn="false" :cancel="item.calcel" @stateClick="stateClick"></OrderItem>
			</block>
		</view>
	</view>

	<!-- 核销码弹窗 -->
	<uni-popup ref="checkCodeRef" @change="checkCodeChange">
		<view class="check_code_wrap box_border_radius box_shadow">
			<view class="title">订单核销码</view>
			<!-- <image class="cover" src="/src/static/img/code.png" mode="aspectFit"></image> -->
		</view>
	</uni-popup>

	<sweep-navigate @sweep_switch="sweep_switch" :sweep_index="sweep_index"></sweep-navigate>
</template>

<script setup>
import { ref } from 'vue';
import sweepNavigate from '../component/sweep_navigate.vue';
import navigate from '/src/pages/component/navigate.vue';
import OrderItem from './item.vue';
const sweep_index = ref(1);

const navList = ref([
	{
		title: '全部'
	},
	{
		title: '待核销'
	},
	{
		title: '已核销'
	}
]);

const itemIndex = ref(0);

// 列表
const shopping_list = ref([
	{
		id: 1,
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		specification: [
			{
				name: '原味',
				num: 3
			},
			{
				name: '雪域牛乳',
				num: 2
			}
		],
		boom: true,
		price: 130,
		calcel: true,
		outmodend_price: 210,
		total_price: 332,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州',
		num: 1,
		code: 2021053100011,
		status: '待付款',
		date: 1729591360322
	},
	{
		id: 2,
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list3.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		specification: [
			{
				name: '原味',
				num: 3
			},
			{
				name: '雪域牛乳',
				num: 2
			}
		],
		boom: true,
		price: 130,
		calcel: false,
		outmodend_price: 210,
		total_price: 332,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州',
		num: 1,
		code: 2021053100011,
		status: '待付款',
		date: 1729591360322
	}
]);

// 核销码弹窗change - 放置页面穿透滚动
const show = ref(false);
function checkCodeChange(e) {
	show.value = e.show;
}

// 核销码弹窗
const checkCodeRef = ref(null);
// 打开核销码弹窗
function stateClick(e) {
	console.log(e);

	switch (e) {
		case '立即支付':
			break;
		case '核销码':
			checkCodeRef.value.open();
			break;
		case '物流信息':
			uni.navigateTo({
				url: '/pages/order/distribution'
			});
			break;
		case '申请售后':
			uni.navigateTo({
				url: '/pages/order/after_sale'
			});
			break;
		case '立即核销':
			checkCodeRef.value.open();
			break;
	}
}

// 导航栏切换
function itemClick(e) {
	if (itemIndex.value != e.i) {
		itemIndex.value = e.i;
	}
}
</script>

<style>
page {
	background: #fbfbfb;
}
</style>

<style lang="scss" scoped>
.search_box {
	position: fixed;
	left: 0;
	width: 100%;
	padding: 20rpx 20rpx 0;
	z-index: 1;
	background: #fff;

	.search {
		border-radius: 45rpx;
		height: 60rpx;
		background: #f9f9f9;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		.iconfont {
			font-size: 28rpx;
			color: #feac85;
		}

		.text {
			font-size: 24rpx;
			color: #b5b5b5;
			padding-left: 10rpx;
		}
	}
}

.main {
	padding: 30rpx;
}

.check_code_wrap {
	background: #fff;
	padding: 40rpx 30rpx 30rpx;
	text-align: center;
	margin: auto;

	.title {
		font-size: 38rpx;
		font-weight: bold;
	}
	.cover {
		width: 580rpx;
		height: 580rpx;
	}
}
</style>
