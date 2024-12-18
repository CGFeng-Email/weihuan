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
	<view class="tabs_box" :style="{ top: useMenuButton().navigateTop }">
		<uv-tabs
			class="tabs"
			lineWidth="44"
			lineColor="#fe968d"
			:list="navList"
			@click="itemClick"
			:current="tabsCurrent"
			:activeStyle="{
				color: '#000',
				fontWeight: 'bold'
			}"
			:inactiveStyle="{
				color: '#606266',
				fontSize: '24rpx'
			}"
			itemStyle="padding-left: 12px; padding-right: 12px; height: 82rpx;"
		></uv-tabs>
	</view>

	<!-- 占位 -->
	<view :style="{ height: useMenuButton().orderHeight + 'px' }"></view>

	<swiper :style="{ height: getSystem().screenHeight - 173 + 'px' }" class="swiper" :current="itemIndex" @change="swiperChange">
		<block v-for="(item, index) in navList" :key="item.title">
			<swiper-item>
				<!-- 列表 -->
				<view class="list">
					<Empty :show="list.length == 0 ? true : false" tips="您还没有相关订单"></Empty>
					<scroll-view class="scroll_view" scroll-y scroll-with-animation enable-back-to-top :scroll-anchoring="true" @scrolltolower="scrolltolower">
						<view class="scroll_item">
							<block v-for="(item, index) in list" :key="item.id">
								<OrderItem :item="item" :head_title_index="head_title_index" @statusBtn="statusBtn" @orderDetails="orderDetails"></OrderItem>
							</block>
						</view>
						<uni-load-more :status="isMore" v-if="totalPage > 1"></uni-load-more>
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
import { ref, nextTick } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { orderList } from '@/api/index.js';
import _ from 'underscore';
import Empty from '@/pages/component/empty.vue';

// 页码
const page = ref(1);
// 条数
const size = ref(8);
// 总页码
const totalPage = ref(1);
// 订单类型
const type = ref('all');
// tabs下标
const tabsCurrent = ref(0);
// 标题页面
const head_title_index = ref(0);
// 列表
const list = ref([]);
// 列表加载
const isMore = ref('more');
// 导航栏列表
const navList = ref([
	{
		name: '全部',
		type: 'all'
	},
	{
		name: '待付款',
		type: 'payment'
	},
	{
		name: '待发货',
		type: 'delivery'
	},
	{
		name: '待收货',
		type: 'received'
	},
	{
		name: '待自提',
		type: ' extract'
	},
	{
		name: '已完成',
		type: 'complete'
	},
	{
		name: '已取消',
		type: 'cancel'
	}
]);

onLoad((params) => {
	console.log('params', params);
	if (params.head_title_index && params.index) {
		head_title_index.value = params.head_title_index;
		tabsCurrent.value = params.index;
		getOrderList();
	}
});

// 页面标题切换
function switchPage(i) {
	head_title_index.value = i;
	getOrderList();
}

// 获取订单列表
const getOrderList = async (more = false) => {
	if (more) {
		isMore.value = 'loading';
	} else {
		uni.showLoading({
			title: '加载中...',
			mask: true
		});
	}
	const params = {
		page: page.value,
		size: size.value,
		type: navList.value[tabsCurrent.value].type,
		delivery_type: head_title_index.value == 1 ? 20 : 10
	};
	const res = await orderList(params);
	console.log('订单列表', res);
	if (res.code == 1) {
		if (more) {
			list.value = [...list.value, ...res.data.lists];
		} else {
			list.value = res.data.lists;
			page.value = 1;
			totalPage.value = res.data.page_no;
		}
	}

	if (more) {
		if (page.value >= totalPage.value) {
			return (isMore.value = 'no-more');
		}
		isMore.value = 'more';
	} else {
		uni.hideLoading();
	}
};

// 导航栏切换
function itemClick(e) {
	if (tabsCurrent.value == e.index) return;
	tabsCurrent.value = e.index;
	getOrderList();
}

// swiper切换
function swiperChange(e) {
	tabsCurrent.value = e.detail.current;
	getOrderList();
}

// 触底
const moreScroll = () => {
	console.log('++');
	if (page.value < totalPage.value) {
		page.value++;
		getOrderList(true);
	}
};
const scrolltolower = _.debounce(moreScroll, 800);

// 核销码弹窗
const checkCodeRef = ref(null);

// 打开核销码弹窗
function statusBtn(e) {
	console.log(e);
	switch (e.type) {
		case 'payment':
			uni.navigateTo({
				url: `/pages/order/no_payment?orderId=${e.data.order_id}`
			});
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
function orderDetails(orderId) {
	uni.navigateTo({
		url: `/pages/order/details?orderId=${orderId}`
	});
}

// 返回
function return_page() {
	uni.navigateBack();
}
</script>

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

.tabs_box {
	position: fixed;
	left: 0;
	z-index: 3;
	height: 82rpx;
	background: #fff;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
		padding: 10rpx 0 20rpx;
		.scroll_item {
			padding: 0 20rpx;
			margin: 1px 0;

			.item:last-child {
				margin-bottom: 0;
			}
		}
	}
}
</style>
