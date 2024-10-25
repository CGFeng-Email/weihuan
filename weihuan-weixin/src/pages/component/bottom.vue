<template>
	<view style="height: 170rpx"></view>

	<view class="fixed_bottom_btn">
		<view class="btn_bg btn">
			<button @click="btn_click">{{ title }}</button>
		</view>
	</view>
</template>

<script>
import _, { map } from 'underscore';
export default {
	props: {
		title: {
			type: String,
			default: '立即提交'
		}
	},
	methods: {
		btn_click: _.debounce(function () {
			this.$emit('bottom_click');
		}, 200)
	}
};
</script>

<style></style>
