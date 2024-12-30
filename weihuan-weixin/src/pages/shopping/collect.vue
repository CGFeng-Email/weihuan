<!-- 我的收藏 -->
<template>
	<List :list="list" @itemClick="jump_place_order"></List>
	<uni-load-more :status="isMore" v-if="totalPage > 1" :iconSize="14" :contentText="contentText"></uni-load-more>
	<Empty :show="list.length == 0" tips="您还没有相关收藏商品" />
</template>

<script setup>
import { onReachBottom } from '@dcloudio/uni-app';
import { ref, onMounted } from 'vue';
import { collectList } from '@/api/index.js';
import List from './list.vue';
import Empty from '../component/empty.vue';

// 列表
const list = ref([]);
const page = ref(1);
const size = ref(10);
const totalPage = ref(1);
const isMore = ref('more');
const contentText = ref({ contentdown: '上拉显示更多', contentrefresh: '正在加载...', contentnomore: '到底了' });

// 收藏列表
const getCollectList = async (more = false) => {
	if (more) {
		isMore.value = 'loading';
	} else {
		uni.showLoading({
			title: '加载中...'
		});
		page.value = 1;
	}

	const params = {
		page: page.value,
		size: size.value
	};

	const res = await collectList(params);
	console.log('收藏列表', res);

	if (res.code == 1) {
		if (more) {
			list.value = [...list.value, ...res.data.lists];
		} else {
			list.value = res.data.lists;
			totalPage.value = res.data.page_no;
		}

		if (more) {
			if (page.value >= totalPage.value) {
				return (isMore.value = 'no-more');
			}
			isMore.value = 'more';
		} else {
			uni.hideLoading();
		}
	}
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

onReachBottom(() => {
	if (page.value < totalPage.value) {
		page.value++;
		getCollectList(true);
	}
});
</script>
