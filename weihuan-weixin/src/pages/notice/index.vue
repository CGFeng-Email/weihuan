<!-- 系统公告 -->
<template>
	<view class="list" v-if="NoticeList.length > 0">
		<block v-for="(item, index) in NoticeList" :key="index">
			<view class="item box_shadow box_border_radius" @click="open_details(item.id)">
				<image class="cover" :src="item.image" mode="aspectFit"></image>
				<view class="content">
					<view class="title over2">{{ item.title }}</view>
					<view class="date">{{ item.add_at }}</view>
					<view class="lead over2">{{ item.remark }}</view>
				</view>
			</view>
		</block>
	</view>
	<Empty v-else />
</template>

<script setup>
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { noticeList } from '@/api/index.js';
import { ref, onMounted } from 'vue';
import Empty from '../component/empty.vue';

// 公共列表
const NoticeList = ref([]);

// 获取公告列表
const getNoticeList = async () => {
	uni.showLoading({
		title: '加载中...',
		mask: true
	});
	const res = await noticeList();
	console.log('公告列表', res);
	if (res.code == 1) {
		NoticeList.value = res.data;
	}
	uni.hideLoading();
};

// 跳转公告详情
const open_details = (id) => {
	uni.navigateTo({
		url: `/pages/notice/details?id=${id}`
	});
};

onShareAppMessage(() => {
	return {
		title: '网上商城 | WakanMALL',
		path: '/pages/index/index'
	}
})

onShareTimeline(() => {
	return {
		title: '网上商城 | WakanMALL',
		path: '/pages/index/index'
	}
})

onMounted(() => {
	getNoticeList();
});
</script>

<style>
page {
	background: #fbfbfb;
}
</style>

<style lang="scss" scoped>
.list {
	padding: 30rpx;
	.item {
		margin-bottom: 30rpx;
		padding: 20rpx;
		background: #fff;
		display: flex;
		justify-content: space-between;
		.cover {
			width: 258rpx;
			height: 200rpx;
			flex: none;
		}

		.content {
			padding-left: 20rpx;
			.title {
				font-size: 28rpx;
				line-height: 38rpx;
				font-weight: bold;
			}
			.date {
				font-size: 24rpx;
				font-weight: 500;
				padding: 10rpx 0;
			}
			.lead {
				font-size: 24rpx;
				line-height: 34rpx;
				color: #666666;
			}
		}
	}
}
</style>
