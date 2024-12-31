<!-- 新增地址 -->
<template>
	<view class="main">
		<view class="list box_border_radius box_shadow">
			<view class="item">
				<view class="name">收货人</view>
				<view class="box">
					<input class="uni-input input" focus maxlength="6" placeholder="请输入姓名" v-model="name" />
				</view>
			</view>
			<view class="item">
				<view class="name">手机号码</view>
				<view class="box">
					<input class="uni-input input" type="tel" maxlength="11" placeholder="请输入手机号码" v-model="mobile" />
				</view>
			</view>
			<view class="item">
				<view class="name">所在地区</view>
				<view class="box">
					<picker mode="region" @change="bindPickerChange" :value="location">
						<view class="input location_wrap" v-if="location.length > 0">
							<text class="location">{{ location.join('/') }}</text>
							<uni-icons type="location-filled" size="24" color="#fe9a8b"></uni-icons>
						</view>
						<view class="placeholder input location_wrap" v-else>
							<text>请选择所在地区</text>
							<uni-icons type="location-filled" size="24" color="#fe9a8b"></uni-icons>
						</view>
					</picker>
				</view>
			</view>
			<view class="item address_item">
				<view class="name">详细地址</view>
				<view class="box">
					<textarea class="input textarea_box" maxlength="200" placeholder="小区楼栋/乡村名称" v-model="address" />
				</view>
			</view>
			<view class="default_address" @click="check = !check">
				<view class="title">设为默认收货地址</view>
				<view class="check">
					<uni-icons class="icon" :type="check ? 'checkbox-filled' : 'checkbox'" size="20" :color="check ? '#fe9a8b' : '#808080'"></uni-icons>
				</view>
			</view>
		</view>
	</view>

	<view style="height: 170rpx"></view>
	<view class="fixed_bottom_btn multi">
		<button class="del btn">
			<button @click="delAddress">删除</button>
		</button>
		<view class="btn_bg btn">
			<button @click="confirmEditAddress">确认</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { shoppingAddressDetails, addShoppingAddress, delShoppingAddress } from '@/api/index.js';

const id = ref('');
const name = ref('');
const mobile = ref(null);
const location = ref([]);
const address = ref('');
const check = ref(false);

function bindPickerChange(e) {
	console.log('picker发送选择改变，携带值为', e.detail.value);
	location.value = e.detail.value;
}

// 地址详情
const getAddressDetails = async () => {
	const res = await shoppingAddressDetails({ id: id.value });
	console.log('地址详情', res);
	if (res.code == 1) {
		name.value = res.data.consignee;
		mobile.value = res.data.mobile;
		location.value[0] = res.data.province;
		location.value[1] = res.data.city;
		location.value[2] = res.data.district;
		address.value = res.data.address;
		if (res.data.is_default == 1) {
			check.value = true;
		} else {
			check.value = false;
		}
	}
};

// 确认修改地址
const confirmEditAddress = async () => {
	const params = {
		id: id.value,
		consignee: name.value,
		mobile: mobile.value,
		province: location.value[0],
		city: location.value[1],
		district: location.value[2],
		address: address.value,
		is_default: check.value ? 1 : 0
	};

	const res = await addShoppingAddress(params);
	console.log('修改地址', res);
	if (res.code == 1) {
		uni.showToast({
			title: '修改成功',
			icon: 'none',
			mask: true,
			success: () => {
				setTimeout(() => {
					uni.$emit('addressListLoad');
					uni.navigateBack();
				}, 1500);
			}
		});
	} else {
		uni.showToast({
			title: res.msg,
			icon: 'none',
			mask: true
		});
	}
};

// 删除地址
const delAddress = async () => {
	uni.showModal({
		content: '确认要删除该地址吗?',
		success: async (res) => {
			if (res.confirm) {
				const res = await delShoppingAddress({
					id: id.value
				});
				console.log('删除地址', res);
				if (res.code == 1) {
					uni.showToast({
						title: '地址已删除',
						icon: 'none',
						mask: true,
						success: () => {
							setTimeout(() => {
								uni.$emit('addressListLoad');
								uni.navigateBack();
							}, 1500);
						}
					});
				}
			}
		}
	});
};

onLoad((e) => {
	console.log('load', e);
	id.value = e.id;
	if (id.value) {
		getAddressDetails();
	}
});
</script>

<style>
page {
	background: #fbfbfb;
}
</style>

<style lang="scss" scoped>
.main {
	padding: 30rpx;
	.list {
		padding: 30rpx 20rpx 200rpx 0;

		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 30rpx;
			.name {
				font-size: 28rpx;
				font-weight: bold;
				text-align: center;
				width: 180rpx;
				flex: none;
			}

			.box {
				flex: 1;
				.input {
					height: 86rpx;
					line-height: 86rpx;
					background: #f6f6f6;
					border-radius: 14rpx;
					box-shadow: 0 0 4rpx rgba(0, 0, 0, 0.1);
					padding: 0 10rpx 0 24rpx;
					font-size: 26rpx;
				}
				.placeholder {
					color: #808080;
				}
				.location_wrap {
					display: flex;
					justify-content: space-between;
				}

				.textarea_box {
					padding: 24rpx;
					width: 100%;
					height: 220rpx;
					box-sizing: border-box;
					font-size: 26rpx;
					line-height: 36rpx;
				}
			}
		}

		.address_item {
			align-items: flex-start;
			.name {
				padding-top: 10rpx;
			}
		}

		.default_address {
			padding-left: 34rpx;
			display: flex;
			.title {
				font-size: 28rpx;
				font-weight: bold;
			}
			.check {
				padding-left: 6rpx;
			}
		}
	}
}
</style>
