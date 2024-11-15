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
						<image class="cover" :src="portrait" mode="aspectFill"></image>
					</button>
				</view>
			</view>
			<view class="item">
				<view class="name">
					<text class="title">昵称</text>
					<text class="tips">点击可更换昵称</text>
				</view>
				<view class="right">
					<input class="input" type="nickname" v-model="nickName" maxlength="8" @blur="nickNameBlur" />
				</view>
			</view>
			<view class="item">
				<view class="name">
					<text class="title">真实姓名</text>
				</view>
				<view class="right">
					<view class="value">
						<input class="uni-input input" placeholder="请输入您的姓名" maxlength="12" v-model="userName" />
					</view>
				</view>
			</view>
			<view class="item">
				<view class="name">
					<text class="title">手机号</text>
				</view>
				<view class="right">
					<view class="value">
						<input type="tel" class="uni-input input" placeholder="请输入您的电话号码" maxlength="11" v-model="mobile" />
					</view>
				</view>
			</view>
			<view class="item location_item">
				<view class="name">
					<text class="title">电子邮箱</text>
				</view>
				<view class="right">
					<view class="value">
						<input type="text" class="uni-input input" placeholder="请输入您的邮箱" maxlength="11" v-model="email" />
					</view>
				</view>
			</view>
		</view>
	</view>

	<bottomVue title="确认修改" @bottom_click="bottom_click"></bottomVue>
</template>

<script setup>
import { ref } from 'vue';
import bottomVue from '../component/bottom.vue';
const portrait = ref('/static/img/head_portrait.png');
const nickName = ref('炜洹游客用户');
// 头像
const chooseAvatar = (e) => {
	console.log(e);
	portrait.value = e.detail.avatarUrl;
};
// 昵称
const nickNameBlur = (e) => {
	console.log(e);
	nickName.value = e.detail.value;
};
// 姓名
const userName = ref(null);
// 电话
const mobile = ref(null);
// 邮箱
const email = ref(null);
// 确认修改
function bottom_click() {
	uni.showLoading({
		title: '修改中',
		mask: true,
		success: () => {
			setTimeout(function () {
				uni.hideLoading();
				uni.showToast({
					title: '修改成功',
					icon: 'none',
					mask: true
				});
			}, 1000);
		}
	});
}
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
