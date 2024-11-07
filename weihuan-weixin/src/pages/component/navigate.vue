<!-- 导航栏组件 -->
<template>
	<view class="navigate" :style="{ top: top }">
		<view class="list">
			<block v-for="(item, index) in list" :key="item.title">
				<view class="item" :class="{ active: itemIndex == index }" @click="itemClick(index, item.title)">
					<text class="title">{{ item.title }}</text>
				</view>
			</block>
		</view>
	</view>
	<!-- 占位 -->
	<block v-if="top == 0">
		<view style="height: 82rpx"></view>
	</block>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: []
		},
		itemIndex: {
			type: Number,
			default: 0
		},
		top: {
			type: String,
			default: 0
		}
	},
	methods: {
		itemClick(i, title) {
			const obj = {
				i,
				title
			};
			this.$emit('itemClick', obj);
		}
	}
};
</script>

<style lang="scss" scoped>
.navigate {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 10;
	.list {
		display: flex;
		align-items: center;
		background: #fff;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		.item {
			flex: auto;
			text-align: center;
			.title {
				display: inline-block;
				height: 82rpx;
				line-height: 82rpx;
				font-size: 28rpx;
				color: #000;
				font-weight: 500;
				position: relative;

				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					height: 6rpx;
					border-radius: 8rpx;
					background: #fe968d;
					opacity: 0;
					transition: 0.3s ease;
				}
			}
		}

		.active {
			.title {
				font-weight: 600;
				&::after {
					opacity: 1;
				}
			}
		}
	}
}
</style>
