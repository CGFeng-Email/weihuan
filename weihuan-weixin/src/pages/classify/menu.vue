<!-- 菜单 -->
<template>
	<scroll-view
		class="menu"
		:style="{ background: bgColor }"
		:scroll-x="true"
		:scroll-into-view="'item' + menu_id"
		:scroll-left="scrollLeft"
		:scroll-anchoring="true"
		:scroll-with-animation="true"
		:enable-passive="true"
	>
		<view class="wrap">
			<view class="item" :class="current == index ? 'active' : ''" v-for="(item, index) in list" :key="item.id" :id="'item' + item.id" @click="menuItemClick(index, item.id)">
				<view class="cover_box">
					<image class="cover" :src="item.image" mode="aspectFit"></image>
				</view>
				<text class="title">
					{{ item.title }}
				</text>
			</view>
		</view>
	</scroll-view>
</template>

<script setup>
import { defineProps, defineEmits, getCurrentInstance, ref, onMounted, defineExpose } from 'vue';
const emit = defineEmits(['menuClick']);
const that = getCurrentInstance();
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
	},
	menu_id: {
		type: String,
		default: ''
	}
});
const scrollLeft = ref(0);
const listItem = ref([]);

function menuItemClick(index, id) {
	listItem.value.forEach((item) => {
		if (item.id == 'item' + id) {
			scrollLeft.value = item.left - 150;
		}
	});
	
	emit('menuClick', { index, id });
}

// 解决父组件调用不了子组件的问题
defineExpose({
	menuItemClick
});

onMounted(() => {
	const query = uni.createSelectorQuery().in(that);
	query.selectAll(`.item`).boundingClientRect((data) => {
		listItem.value = data;
	});
	query.exec();
});
</script>

<style lang="scss" scoped>
.menu {
	.wrap {
		display: flex;
	}
	.item {
		flex: none;
		width: 160rpx;
		// height: 190rpx;
		padding: 0 10rpx 20rpx;
		text-align: center;
		.cover_box {
			border: 2px solid transparent;
			border-radius: 50%;
			width: 100rpx;
			height: 100rpx;
			margin: auto;
			margin-bottom: 8rpx;
			overflow: hidden;
			.cover {
				width: 100%;
				height: 100%;
			}
		}

		.title {
			font-size: 24rpx;
			line-height: 36rpx;
			font-weight: 500;
			padding: 2rpx 12rpx;
			border-radius: 45rpx;
		}
	}

	.active {
		.cover_box {
			border-color: #ff8992;
		}
		.title {
			background: #ff8992;
			color: #fff;
		}
	}
}
</style>
