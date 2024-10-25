<!-- 意见反馈 -->
<template>
	<!-- 导航栏组件 -->
	<navigate :list="navigate" :itemIndex="navigateIndex" @itemClick="navigateItem"></navigate>
	<view class="list">
		<block v-for="(item, index) in 10" :key="index">
			<view class="item box_border_radius box_shadow" @click="open_details">
				<view class="box">
					<view class="head">
						<image class="cover" src="/static/img/email.png" mode="widthFix"></image>
						<text class="title">我有一个建议，这里是建议标题</text>
					</view>
					<view class="date">2024/08/22 12:00</view>
					<view class="lead">我在用咱们这个平台的时候出现了一些卡顿，并且有些页面点击了之后使得整个页面闪退，不知道是什么原因导致的，麻烦平台能优化一下。</view>
				</view>
				<view class="reply">
					<view class="name">平台回复</view>
					<view class="lead">非常感谢您对活动的建议，我们会积极采纳。</view>
				</view>
			</view>
		</block>
	</view>
	
	
	<view style="height: 170rpx"></view>
	<view class="fixed_bottom_btn">
		<view class="btn_bg btn">
			<button @click="open_add">立即反馈</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import Navigate from '../component/navigate.vue';
const navigateIndex = ref(0);
const navigate = ref([
	{
		title: '全部'
	},
	{
		title: '待处理'
	},
	{
		title: '处理中'
	},
	{
		title: '已完成'
	}
]);
const navigateItem = (e) => {
	navigateIndex.value = e.i;
};

const open_details = () => {
	uni.navigateTo({
		url: '/pages/feedback/details'
	})
}

// 立即反馈
const open_add = () => {
	uni.navigateTo({
		url: '/pages/feedback/add'
	})
}
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
		background: #fff;
		border-radius: 20px;

		.box {
			padding: 30rpx 30rpx 0;
		}
		
		.head {
			.cover {
				width: 32rpx;
				transform: translateY(-6rpx);
			}

			.title {
				font-size: 30rpx;
				line-height: 42rpx;
				font-weight: bold;
				padding-left: 14rpx;
			}
		}

		.date {
			font-size: 24rpx;
			color: #999999;
			padding: 14rpx 0;
		}
		.lead {
			font-size: 24rpx;
			line-height: 38rpx;
			color: #777777;
		}

		.reply {
			margin-top: 30rpx;
			padding: 30rpx 20rpx;
			border-radius: 0 0 20px 20px;
			background: linear-gradient(90deg, #fe968d 0%, #fe968d00 100%);
			opacity: .8;
			display: flex;
			.name {
				font-size: 26rpx;
				font-weight: bold;
				flex: none;
			}
			.lead {
				flex: 1;
				padding-left: 30rpx;
				position: relative;
				&::after {
					content: '';
					position: absolute;
					top: 6rpx;
					left: 15rpx;
					width: 1px;
					height: 24rpx;
					background: #777;
					
				}
			}
		}
	}
}
</style>
