<!-- 列表 -->
<template>
	<!-- 打开弹窗时，禁止滑动页面，必须要在第一个节点 -->
	<page-meta :page-style="'overflow:' + (show ? 'hidden' : 'visible')"></page-meta>
	<!-- 顶部到胶囊的高度 -->
	<view class="top" :style="{ height: useMenuButton().top }"></view>
	<!-- 标题 -->
	<view class="page_title" :style="{ top: useMenuButton().top, height: useMenuButton().height, 'line-height': useMenuButton().height }">
		<view class="return_icon" @click="return_page">
			<uni-icons class="icon" type="left" size="24" color="#000"></uni-icons>
		</view>
		<view class="navigation_wrap">
			<view class="navigation box_border_radius box_shadow">
				<view class="navigation_btn" :class="{ active: head_title_index == 0 }" @click="switchPage(0)">物流订单</view>
				<view class="navigation_btn" :class="{ active: head_title_index == 1 }" @click="switchPage(1)">自提订单</view>
			</view>
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
	<view :style="{ height: useMenuButton().orderHeight + 'px' }"></view>

	<swiper :style="{ height: getSystem().screenHeight - 173 + 'px' }" class="swiper" :current="itemIndex" @change="swiperChange">
		<block v-for="(item, index) in navList" :key="item.title">
			<swiper-item>
				<!-- 列表 -->
				<view class="list">
					<scroll-view class="scroll_view" scroll-y scroll-with-animation enable-back-to-top :scroll-anchoring="true" @scrolltolower="scrolltolower">
						<view class="scroll_item">
							<block v-for="(item, index) in shopping_list" :key="item.id">
								<OrderItem :item="item" :head_title_index="head_title_index" @stateClick="stateClick" @open_details="open_details"></OrderItem>
							</block>
						</view>
					</scroll-view>
				</view>
			</swiper-item>
		</block>
	</swiper>

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
import getSystem from '../../hooks/getSystem.js';
import navigate from '/src/pages/component/navigate.vue';
import OrderItem from './item.vue';
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

onLoad((params) => {
	console.log('params', params);
	if (params.head_title_index && params.index) {
		head_title_index.value = params.head_title_index;
		itemIndex.value = params.index;
	}
});

// 标题页面
const head_title_index = ref(0);
function switchPage(i) {
	head_title_index.value = i;
}

// 导航栏列表
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
// 导航栏
const itemIndex = ref(0);
// 导航栏切换
function itemClick(e) {
	if (itemIndex.value != e.i) {
		itemIndex.value = e.i;
	}
}

function swiperChange(e) {
	uni.showLoading({
		title: '加载中',
		mask: true
	});

	setTimeout(function () {
		itemIndex.value = e.detail.current;
		uni.hideLoading();
	}, 400);
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

// 滚动到底部时触发
function scrolltolower(e) {
	console.log(e);
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
	display: flex;
	align-items: center;
	.navigation_wrap {
		margin-left: 30px;
		.navigation {
		}
	}
}

.search_box {
	position: fixed;
	left: 0;
	width: 100%;
	padding: 20rpx 20rpx 10rpx;
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
	height: 100%;
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

.swiper {
	background: #fff;
	.scroll_view {
		height: 100%;
		padding: 28rpx 0;
		.scroll_item {
			padding: 0 20rpx;
			margin: 1px 0;
		}
	}
}
</style>