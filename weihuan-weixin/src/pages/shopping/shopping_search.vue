<!-- 商品搜索 -->
<template>
	<searchVue placeholder="请输入商品关键字" :page="page" @search_input="search_input" @search_confirm="search_confirm" />
	<view class="hot" v-if="keyword == '' && shopping_list.length == 0">
		<view class="title">热门搜索</view>
		<view class="list">
			<view class="li" v-for="(item,index) in hot_list" :key="item.id" @click="open_shopping">
				<text class="iconfont icon-remen" v-if="index < 3"></text>
				<text class="text">{{ item.title }}</text>
			</view>
		</view>
	</view>
	<searchListVue :list="shopping_list"></searchListVue>
</template>

<script setup>
import searchVue from '../component/search.vue';
import searchListVue from '../component/search_list.vue';
import { ref } from 'vue';

const keyword = ref('');
const page = ref(0);

const hot_list = ref([
	{
		id: 1,
		title: '猪肉'
	},
	{
		id: 2,
		title: '鸡蛋'
	},
	{
		id: 3,
		title: '葱'
	},
	{
		id: 4,
		title: '虾'
	},
	{
		id: 5,
		title: '牛奶'
	},
	{
		id: 6,
		title: '玉米'
	},
	{
		id: 7,
		title: '辣椒'
	},
	{
		id: 8,
		title: '饮料'
	},
	{
		id: 9,
		title: '牛肉'
	}
]);

// 列表
const shopping_list = ref([]);

// 键盘输入时触发
function search_input(e) {
	keyword.value = e.trim();
	shopping_list.value = keyword.value === '' ? [] : shopping_list.value;
}

// 键盘回车时触发
function search_confirm(e) {
	if (!e) return;
	keyword.value = e.trim();
	statrSearch();
}

// 开始搜索
function statrSearch() {
	if (keyword.value == '') return;
	uni.showLoading({
		title: '搜索中',
		mask: true
	});
	// axios
	setTimeout(() => {
		shopping_list.value = [
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: true,
				price: 130,
				primary_price: 210,
				outmodend_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list3.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 120,
				primary_price: 210,
				outmodend_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list4.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 110,
				primary_price: 210,
				outmodend_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list5.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 100,
				primary_price: 210,
				outmodend_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			},
			{
				src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list6.png',
				type: 'type2',
				title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
				boom: false,
				price: 180,
				primary_price: 210,
				outmodend_price: 210,
				tips: '全程冻品冷链运输，保质保鲜',
				location: '广州'
			}
		];

		uni.hideLoading();
	}, 1000);

}

// 跳转商品列表
function open_shopping() {
	uni.switchTab({
		url: '/pages/classify/index'
	})
}
</script>

<style>
page {
	background: #fbfbfb;
}
</style>

<style lang="scss" scoped>
.hot {
	padding: 0 20rpx;

	.title {
		font-weight: bold;
		padding: 30rpx 0;
	}
	.list {
		display: flex;
		flex-wrap: wrap;
	}
	.li {
		border-radius: 6rpx;
		border: 1px solid rgba(0, 0, 0, 0.1);
		padding: 10rpx 20rpx;
		font-size: 24rpx;
		color: #000;
		font-weight: 500;
		margin: 0 20rpx 20rpx 0;
		
		.iconfont {
			font-size: 26rpx;
			color: #ff0000;
		}
		
		.text {
			padding-left: 8rpx;
		}
	}
}
</style>
