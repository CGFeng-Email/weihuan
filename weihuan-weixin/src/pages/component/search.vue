<template>
	<view class="search_box" :style="{ background: bgColor }">
		<view class="wrap">
			<uni-icons class="icon" type="search" size="18" color="#FE938E"></uni-icons>
			<input
				class="input"
				type="text"
				v-model="keyword"
				:disabled="disabled"
				placeholder="请输入商品名称"
				focus
				confirm-type="search"
				@input="search_input"
				@confirm="search_confirm"
			/>
		</view>
	</view>

	<view style="height: 100rpx"></view>
</template>

<script setup>
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';
const emit = defineEmits(['searchInput', 'searchConfirm']);
const props = defineProps({
	bgColor: {
		type: String,
		default: '#fff'
	},
	disabled: {
		type: Boolean,
		default: false
	},
	hotTitle: {
		type: String,
		default: ''
	}
});

// 关键词
const keyword = ref(null);

watch(
	() => props.hotTitle,
	(newVal) => {
		if (newVal) keyword.value = newVal;
	}
);

// 键盘输入时触发
const search_input = () => {
	emit('searchInput', keyword.value);
};

// 键盘回车时触发
const search_confirm = () => {
	emit('searchConfirm', keyword.value);
};
</script>

<style lang="scss" scoped>
.search_box {
	padding: 20rpx;
	background: #fff;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100rpx;
	z-index: 20;

	.wrap {
		border-radius: 45rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: search_box;
		background: #f9f9f9;
		padding: 0 20rpx;
		box-shadow: 0 0 4rpx rgba(0, 0, 0, 0.1);
		.icon {
			flex: none;
		}

		.input {
			flex: 1;
			padding: 0 10rpx;
			font-size: 24rpx;
			color: #000;
			font-weight: 500;
			height: 60rpx;
			line-height: 60rpx;
		}
	}
}
</style>
