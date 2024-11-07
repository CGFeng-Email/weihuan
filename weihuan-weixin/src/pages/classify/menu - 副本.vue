<!-- 菜单 -->
<template>
	<swiper
		:style="{ background: bgColor }"
		class="swiper"
		:current="current"
		:circular="true"
		display-multiple-items="5"
		easing-function="linear"
		:skip-hidden-item-layout="true"
		@change="swiperChange"
	>
		<block v-for="(item, index) in list" :key="item.id">
			<swiper-item>
				<view class="swiper-item" :class="current == index ? 'active' : ''">
					<view class="cover_box">
						<image class="cover" :src="item.image" mode="aspectFit"></image>
					</view>
					<text class="title">
						{{ item.title }}
					</text>
				</view>
			</swiper-item>
		</block>
	</swiper>

	<view style="height: 180rpx"></view>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
const emit = defineEmits(['on-save-ok']);
const props = defineProps({
	list: {
		type: Array,
		default: []
	},
	bgColor: {
		type: String,
		default: '#fff'
	},
	current: {
		type: Number,
		default: 0
	}
});

function swiperChange(e) {
	const index = e.detail.current;
	console.log(index);
	emit('swiperChange', index);
}
</script>

<style lang="scss" scoped>
.swiper {
	height: 180rpx;
	.swiper-item {
		padding: 10rpx 0;
		text-align: center;
		.cover_box {
			.cover {
				width: 110rpx;
				height: 110rpx;
			}
		}

		.title {
			margin-top: 10rpx;
			font-size: 24rpx;
			line-height: 36rpx;
			font-weight: 500;
			padding: 4rpx 16rpx;
			border-radius: 45rpx;
		}
	}

	.active {
		.title {
			background: #ff8992;
			color: #fff;
		}
	}
}
</style>
