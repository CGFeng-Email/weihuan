<!-- 地址管理 -->
<template>
	<view class="list" v-if="shoppingList.length > 0">
		<block v-for="(item, index) in shoppingList" :key="item.id">
			<view class="item box_border_radius box_shadow" :class="{ active: active_index == index }" @click="itemClick(item, index)">
				<view class="content">
					<view class="c_top">
						<view class="name">
							<uni-icons class="check" type="checkbox-filled" size="22" color="#FE978D" v-if="item.is_default == 1"></uni-icons>
							<text class="text">
								{{ item.consignee }}
							</text>
						</view>
						<view class="mobile">{{ item.mobile }}</view>
					</view>
					<view class="title">{{ item.province }} {{ item.city }} {{ item.district }}</view>
					<view class="address">{{ item.address }}</view>
				</view>
				<view class="icon" @click.stop="open_edit_address(item.id)">
					<uni-icons type="compose" size="24" color="#FE978D"></uni-icons>
				</view>
			</view>
		</block>
	</view>

	<Empty tips="暂无收货地址" v-else />

	<Bottom title="新增地址" @bottom_click="open_add_address" />
</template>

<script setup>
import { onLoad, onUnload } from '@dcloudio/uni-app';
import { ref } from 'vue';
import Bottom from '../component/bottom.vue';
import Empty from '../component/empty.vue';
import { getShoppingAddress } from '@/api/index.js';

// 是否点击item返回
const isSelect = ref(false);

// 收货地址
const shoppingList = ref([]);

// 点击item
function itemClick(item, index) {
	if (isSelect.value) {
		isSelect.value = false;
		uni.$emit('location', item);
		uni.navigateBack();
	}
}

// 跳转编辑地址
const open_edit_address = (id) => {
	uni.navigateTo({
		url: `/pages/address/edit_address?id=${id}`
	});
};

// 跳转新增地址
const open_add_address = () => {
	uni.navigateTo({
		url: '/pages/address/add_address'
	});
};

// 获取收货地址
const getShoppingAddressList = async () => {
	uni.showLoading({
		title: '加载中...',
		mask: true
	});

	const res = await getShoppingAddress({ size: 20 });
	console.log('地址列表', res);
	if (res.code == 1) {
		shoppingList.value = res.data.lists;
	}
	uni.hideLoading();
};

onLoad((load) => {
	console.log('load', load);
	isSelect.value = load.select;

	uni.$on('addressListLoad', () => {
		return getShoppingAddressList();
	});

	getShoppingAddressList();
});

onUnload(() => {
	uni.$off('addressListLoad');
});
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
		display: flex;
		justify-content: space-between;
		align-items: center;
		transition: 0.3s ease;
		border: 1px solid transparent;
		.content {
			flex: 1;
			.c_top {
				display: flex;
				align-items: center;
			}
			.name {
				font-size: 32rpx;
				font-weight: bold;
				display: flex;
				align-items: center;
				transition: 0.3s ease;

				.check {
					margin-right: 10rpx;
				}

				.text {
					transition: 0.3s ease;
				}
			}
			.mobile {
				font-size: 26rpx;
				padding-left: 10rpx;
				transition: 0.3s ease;
				font-weight: 600;
			}

			.title {
				font-size: 26rpx;
				line-height: 36rpx;
				margin: 10rpx 0;
			}

			.address {
				font-size: 26rpx;
				line-height: 36rpx;
			}
		}

		.icon {
			padding: 30rpx 0 30rpx 30rpx;
		}
	}

	.active {
		border-color: #fe978d;
	}
}
</style>
