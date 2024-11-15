<template>
	<view style="height: 170rpx"></view>

	<view class="fixed_bottom_btn">
		<view class="btn_bg btn">
			<button @click="debounce">{{ title }}</button>
		</view>
	</view>
</template>

<script setup>
import _, { map } from 'underscore';
import { defineEmits, defineProps } from 'vue';

const emit = defineEmits(['on-save-ok']);

const props = defineProps({
	title: {
		type: String,
		default: '立即提交'
	}
});

function btn_click() {
	emit('bottom_click')
}

const debounce = _.debounce(btn_click, 200);
</script>

<style></style>
