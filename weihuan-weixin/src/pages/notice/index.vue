<!-- 系统公告 -->
<template>
	<view class="list">
		<block v-for="(item, index) in 10" :key="index">
			<view class="item box_shadow box_border_radius" @click="open_details">
				<image class="cover" src="https://weihuan-1317202885.cos.ap-guangzhou.myqcloud.com/company.png" mode="aspectFit"></image>
				<view class="content">
					<view class="title over2">在众多的竞争产品中脱颖而出。</view>
					<view class="date">2024-08-22</view>
					<view class="lead over2">炜洹诚信为本非常 重视商业信誉，从不销售品质低劣的产品</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script setup>
	const open_details = () => {
		uni.navigateTo({
			url: '/pages/notice/details'
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
