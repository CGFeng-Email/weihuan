<!-- 我的收藏 -->
<template>
	<List :list="list" @itemClick="jump_place_order"></List>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collectList } from '@/api/index.js';
// 列表组件
import List from './list.vue';

// 列表
const list = ref([]);
const page = ref(1);
const size = ref(20);
const totalPage = ref(0);

// 收藏列表
const getCollectList = async () => {
	uni.showLoading({
		title: '加载中...'
	});
	const params = {
		page: page.value,
		size: size.value
	};
	const res = await collectList(params);
	console.log('收藏列表', res);
	if (res.code == 1) {
		list.value = res.data.lists;
		totalPage.value = res.data.page_no;
	}
	uni.hideLoading();
};

// 产品详情
const jump_place_order = (id) => {
	uni.navigateTo({
		url: `/pages/shopping/place_an_order?id=${id}`
	});
};

onMounted(() => {
	getCollectList();
});
</script>

<style></style>
