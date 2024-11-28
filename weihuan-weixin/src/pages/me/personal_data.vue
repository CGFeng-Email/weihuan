<!-- 个人资料 -->
<template>
	<view class="main">
		<view class="list box_border_radius box_shadow">
			<view class="item">
				<view class="name">
					<text class="title">头像</text>
					<text class="tips">点击可更换头像</text>
				</view>
				<view class="right">
					<button class="btn" open-type="chooseAvatar" @chooseavatar="chooseAvatar">
						<image class="cover" :src="headPortrait" mode="aspectFill"></image>
					</button>
				</view>
			</view>
			<view class="item">
				<view class="name">
					<text class="title">昵称</text>
					<text class="tips">点击可更换昵称</text>
				</view>
				<view class="right">
					<input class="input" type="nickname" v-model="nickName" maxlength="6" @blur="nickNameBlur" />
				</view>
			</view>
			<view class="item">
				<view class="name">
					<text class="title">真实姓名</text>
				</view>
				<view class="right">
					<view class="value">
						<input class="uni-input input" v-model="userName" placeholder="请输入您的姓名" maxlength="12" />
					</view>
				</view>
			</view>
			<view class="item">
				<view class="name">
					<text class="title">手机号</text>
				</view>
				<view class="right">
					<view class="value">
						<input type="tel" class="uni-input input" disabled placeholder="请输入您的电话号码" maxlength="11" v-model="userMobile" />
					</view>
				</view>
			</view>
			<view class="item location_item">
				<view class="name">
					<text class="title">电子邮箱</text>
				</view>
				<view class="right">
					<view class="value">
						<input type="text" class="uni-input input" placeholder="请输入您的邮箱" v-model="userEmail" />
					</view>
				</view>
			</view>
		</view>
	</view>

	<bottomVue title="确认修改" @bottom_click="bottom_click"></bottomVue>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import bottomVue from '../component/bottom.vue';
import { imageBase64 } from '@/hooks/useTool.js';
import { getUserData, uploadImg, editUserData } from '@/api/index.js';
const headPortrait = ref('/static/img/head_portrait.png');
const nickName = ref('微信用户');
const userName = ref(null);
const userMobile = ref(null);
const mobile = ref(null);
const userEmail = ref(null);

// 用户信息
const getUserDataFn = async () => {
	const res = await getUserData();
	console.log('用户信息', res);
	nickName.value = res.data.nickname;
	userMobile.value = res.data.mobile;
	const name = res.data.real_name;
	const email = res.data.email;
	const avatar = res.data.avatar;
	if (name) userName.value = name;
	if (email) userEmail.value = email;
	if (avatar) headPortrait.value = avatar;
};

// 头像
const chooseAvatar = async (e) => {
	const url = e.detail.avatarUrl;
	const base64 = await imageBase64(url, 'png');
	const getUploadImg = await uploadImg({ file: base64 });
	headPortrait.value = getUploadImg.data.url;
};
// 昵称
const nickNameBlur = (e) => {
	nickName.value = e.detail.value;
};

// 确认修改
const bottom_click = async () => {
	uni.showLoading({
		title: '修改中',
		mask: true
	});

	// 修改用户信息
	const res = await editUserData({
		avatar: headPortrait.value,
		nickname: nickName.value,
		real_name: userName.value,
		email: userEmail.value
	});

	console.log('res', res);

	uni.hideLoading();
	uni.showToast({
		title: '修改成功',
		icon: 'none',
		mask: true
	});
};

onLoad(() => {
	getUserDataFn();
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
		background: #fff;
		padding: 0 20rpx;
		.item {
			padding: 44rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
			.name {
				font-size: 30rpx;
				color: #000;
				font-weight: bold;
				flex: none;
				.tips {
					font-size: 24rpx;
					color: #d1d1d1;
					padding-left: 20rpx;
					font-weight: 500;
				}
			}

			.right {
				flex: 1;
				padding-left: 30rpx;
				display: flex;
				justify-content: flex-end;
				.btn {
					width: 135rpx;
					margin: 0;
					padding: 0;
					border: 0;
					box-shadow: none;
					background: none;
					&::after {
						border: 0;
					}
				}
				.cover {
					width: 135rpx;
					height: 135rpx;
					border-radius: 50%;
				}

				.input {
					text-align: right;
					font-size: 26rpx;
					color: #090909;
					font-weight: 500;
				}

				.value {
					font-size: 26rpx;
					line-height: 38rpx;
					color: #090909;
					font-weight: 500;

					.input {
						text-align: right;
					}
				}
			}
		}

		.item:last-child {
			border-bottom: 0;
		}
	}
}
</style>
