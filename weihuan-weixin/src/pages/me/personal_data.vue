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
					<view class="value">谷志华</view>
				</view>
			</view>
			<view class="item">
				<view class="name">
					<text class="title">手机号</text>
				</view>
				<view class="right">
					<view class="value">13626548975</view>
				</view>
			</view>
			<view class="item location_item">
				<view class="name">
					<text class="title">联系地址</text>
				</view>
				<view class="right">
					<view class="value">广东省广州市天河区中山大道中18号</view>
				</view>
			</view>
		</view>
	</view>

	<view class="fixed_bottom_btn">
		<view class="btn_bg btn">
			<button>确认修改</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
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
				}
			}
		}

		.item:last-child {
			border-bottom: 0;
		}
	}
}
</style>
