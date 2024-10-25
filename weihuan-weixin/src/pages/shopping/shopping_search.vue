<!-- 商品搜索 -->
<template>
	<searchVue placeholder="请输入商品关键字" :page="page" @search_input="search_input" @search_confirm="search_confirm" />
	<searchListVue :list="shopping_list"></searchListVue>
</template>

<script setup>
import searchVue from '../component/search.vue';
import searchListVue from '../component/search_list.vue';
import { ref } from 'vue';

const keyword = ref('');
const page = ref(0);

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
</script>

<style>
page {
	background: #fbfbfb;
}
</style>

<style lang="scss" scoped>
.main {
}
</style>
