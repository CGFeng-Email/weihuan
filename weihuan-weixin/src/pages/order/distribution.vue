<!-- 物流信息 -->
<template>
	<view class="main">
		<view class="order_status card_box box_shadow box_border_radius">
			<view class="lead">订单状态</view>
			<view class="title">等待收货</view>
			<view class="lead">订单编号：2021053100111</view>
		</view>

		<view class="distribution card_box box_shadow box_border_radius">
			<view class="title">物流信息</view>
			<view class="distribution_list" :class="{ more_list: more_content }">
				<uni-steps :options="distribution_list" direction="column" :active="distribution_index" active-color="#FF8992"></uni-steps>
			</view>
			<view class="more">
				<view class="wrap" @click="more_btn">
					<text class="text">{{ more_content ? '收起' : '查看更多' }}</text>
					<uni-icons :type="more_content ? 'up' : 'down'" size="13" color="#FF8992"></uni-icons>
				</view>
			</view>
			<view class="order_code">
				<view class="text" @click="stickup('YT1236545230')">
					<span>运单号：YT1236545230</span>
					<span class="iconfont icon-fuzhi"></span>
				</view>
				<view class="text">物流公司：圆通速递</view>
			</view>
		</view>

		<OrderItem :item="item" :state_btn="false"></OrderItem>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import OrderItem from './item.vue';

const distribution_list = ref([
	{ title: '客户已签收，欢迎您再次光临，祝您身体每天陪棒，生活愉快！！！', desc: '2018-11-11' },
	{ title: '广州市天河区车陂第二分公司谷**派件中，派件员电话：13654326542', desc: '2018-11-12' },
	{ title: '佛山装运中心已发出，下一站广州市天河区车陂', desc: '2018-11-13' },
	{ title: '佛山装运中心已收入', desc: '2018-11-14' },
]);
const distribution_index = ref(0);

const more_content = ref(false);

// 查看更多
function more_btn() {
	more_content.value = !more_content.value;
}

// 粘贴订单号
function stickup(e) {
	uni.setClipboardData({
		data: e,
		showToast: true
	});
}

const item = ref({
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
});
</script>

<style>
page {
	background: #fbfbfb;
}
</style>

<style lang="scss" scoped>
.main {
	padding: 30rpx;

	.order_status {
		.title {
			padding: 10rpx 0 20rpx;
			font-size: 30rpx;
		}

		.lead {
			color: #b1b1b1;
			font-size: 24rpx;
			line-height: 34rpx;
		}
	}
}

.more {
	display: inline-block;
	padding-top: 20rpx;
	.wrap {
		display: flex;
		align-items: center;
	}
	.text {
		font-size: 26rpx;
		color: #ff8992;
		padding-right: 8rpx;
	}
}

.distribution_list {
	height: 296px;
	overflow: hidden;
	transition: all 0.4s ease;
}

.more_list {
	height: auto;
}

.order_code {
	padding-top: 30rpx;
	display: flex;
	justify-content: space-between;
	.text {
		font-size: 26rpx;
		color: #787878;
	}
	.iconfont {
		font-size: 28rpx;
		color: #787878;
		padding-left: 6rpx;
	}
}
</style>
