<!-- 我的收藏 -->
<template>
	<List :list="shopping_list" @itemClick="jump_place_order"></List>
</template>

<script setup>
import { ref } from 'vue';
// 列表组件
import List from './list.vue';
// 列表
const shopping_list = ref([
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: true,
		price: 130,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州',
		isPick: true,
		hot: true
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list3.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: false,
		price: 120,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州',
		isPick: true,
		hot: true
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list4.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: false,
		price: 110,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州',
		isPick: true,
		hot: true
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list5.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: false,
		price: 100,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州',
		isPick: true,
		hot: true
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list6.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: false,
		price: 180,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州',
		isPick: true,
		hot: true
	},
	{
		src: 'https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/list2.png',
		type: 'type2',
		title: '新鲜黑猪带皮五花肉农家散养土猪冷冻烤肉',
		boom: true,
		price: 130,
		primary_price: 210,
		tips: '全程冻品冷链运输，保质保鲜',
		location: '广州',
		isPick: true,
		hot: true
	}
]);

// 跳转商品下单页
const jump_place_order = () => {
	uni.navigateTo({
		url: '/pages/shopping/place_an_order'
	});
};
</script>

<style></style>
