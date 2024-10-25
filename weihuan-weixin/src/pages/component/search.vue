<template>
	<view class="search_box">
		<view class="wrap">
			<uni-icons class="icon" type="search" size="18" color="#FE938E"></uni-icons>
			<input class="input" type="text" v-model="keyword" :placeholder="placeholder" focus confirm-type="search" @input="search_input" @confirm="search_confirm" />
		</view>
	</view>

	<view style="height: 100rpx"></view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: []
		},
		page: {
			type: Number,
			default: 0
		},
		placeholder: {
			type: String,
			default: '请输入关键字'
		}
	},
	data() {
		return () => {
			keyword: '';
		};
	},
	methods: {
		// 键盘输入时触发
		search_input(e) {
			this.$emit('search_input', this.keyword);
		},
		// 键盘回车时触发
		search_confirm() {
			this.$emit('search_confirm', this.keyword)
		}
	}
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
