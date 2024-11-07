<!-- 列表 -->
<template>
	<!-- 打开弹窗时，禁止滑动页面，必须要在第一个节点 -->
	<page-meta :page-style="'overflow:' + (show ? 'hidden' : 'visible')"></page-meta>
	<!-- 顶部到胶囊的高度 -->
	<view class="top" :style="{ height: useMenuButton().top }"></view>
	<!-- 标题 -->
	<view class="page_title" :style="{ top: useMenuButton().top, height: useMenuButton().height, 'line-height': useMenuButton().height }">
		<view class="return_icon" @click="return_page">
			<uni-icons type="left" size="23" :color="scrollTop == 'white_default' ? '#fff' : '#000'"></uni-icons>
		</view>
		<view class="navigation_wrap">
			<view class="navigation_btn" :class="{ active: order_type == 'dirstribution' }" @click="navigation_switch('dirstribution')">物流订单</view>
			<view class="navigation_btn" :class="{ active: order_type == 'pick_store' }" @click="navigation_switch('pick_store')">自提订单</view>
		</view>
	</view>
	<!-- 搜索 -->
	<view class="search_box" :style="{ top: useMenuButton().topView }">
		<view class="search">
			<i class="iconfont icon-sousuo"></i>
			<text class="text">请输入关键字</text>
		</view>
	</view>
	<!-- 导航栏 -->
	<navigate class="top_navigate" :list="navList" :itemIndex="itemIndex" @itemClick="itemClick" :top="useMenuButton().navigateTop" />
	<!-- 占位 -->
	<view class="" :style="{ height: useMenuButton().orderView }"></view>
	<!-- 列表 -->
	<view class="list">
		<block v-for="(item, index) in shopping_list" :key="item.id">
			<OrderItem :item="item" :order_type="order_type" @stateClick="stateClick" @open_details="open_details"></OrderItem>
		</block>
	</view>
	<!-- 核销码弹窗 -->
	<uni-popup ref="checkCodeRef" @change="checkCodeChange">
		<view class="check_code_wrap box_border_radius box_shadow">
			<view class="title">订单核销码</view>
			<image class="cover" src="/src/static/img/code.png" mode="aspectFit"></image>
		</view>
	</uni-popup>
</template>

<script setup>
// 胶囊信息
import useMenuButton from '../../hooks/useMenu.js';
import navigate from '/src/pages/component/navigate.vue';
import OrderItem from './item.vue';
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

onLoad((params) => {
	console.log('params', params);
	order_type.value = params.order_type;
	itemIndex.value = params.index;
});

const navList = ref([
	{
		title: '全部'
	},
	{
		title: '待付款'
	},
	{
		title: '待发货'
	},
	{
		title: '待收货'
	},
	{
		title: '已完成'
	},
	{
		title: '退换/售后'
	}
]);

const itemIndex = ref(0);

// 导航栏切换
function itemClick(e) {
	if (itemIndex.value != e.i) {
		itemIndex.value = e.i;
	}
}

// dirstribution: 物流
// pick_store: 自提
const order_type = ref('dirstribution');
function navigation_switch(e) {
	order_type.value = e;
}

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
		id: 3,
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list4.png',
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
		id: 4,
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list5.png',
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
		id: 5,
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list6.png',
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
	}
}

// 核销码弹窗change - 放置页面穿透滚动
const show = ref(false);
function checkCodeChange(e) {
	show.value = e.show;
}

// 订单详情
function open_details() {
	uni.navigateTo({
		url: '/pages/order/details'
	});
}

// 返回
function return_page() {
	uni.navigateBack();
}
</script>

<style>
page {
	background: #fbfbfb;
}
</style>

<style lang="scss" scoped>
.top {
	background: #fff;
}

.page_title {
	background: #fff;
}

.navigation_wrap {
	display: flex;
	align-items: center;
	padding-left: 80rpx;

	.navigation_btn {
		font-size: 26rpx;
		color: #aaaaaa;
		font-weight: 600;
		padding-right: 30rpx;
	}

	.active {
		font-size: 32rpx;
		color: #000;
	}
}

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

.list {
	padding: 20rpx;
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
