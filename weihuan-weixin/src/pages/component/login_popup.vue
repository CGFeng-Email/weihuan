<template>
	<!-- 弹窗 -->
	<uni-popup ref="login_popup" :safe-area="false" type="bottom" @maskClick="maskClick">
		<view class="login_wrap">
			<view class="close">
				<uni-icons type="closeempty" size="18" color="#000" @click="maskClick"></uni-icons>
			</view>
			<view class="cover_box">
				<image class="cover" src="/src/static/img/logo.png" mode="widthFix"></image>
			</view>
			<view class="lead">炜洹诚信为本非常重视商业信誉，从不销售品质低劣的产品</view>
			<button class="wx_btn btn_bg" open-type="login" @click="wx_login">微信登录</button>
			<view class="condition">
				<view class="check" @click="condition = !condition">
					<uni-icons class="icon" :type="condition ? 'checkbox-filled' : 'circle'" size="18" color="#434343"></uni-icons>
					<text class="text">我已阅读并同意</text>
				</view>
				<text class="jump" @click="open_agreement">炜洹用户协议、</text>
				<text class="jump" @click="open_privacy">隐私政策</text>
			</view>
			<view class="tips" @click="open_register">手机号登录/注册</view>
		</view>
	</uni-popup>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue';
const emit = defineEmits(['on-save-ok']);

// 参数
const props = defineProps({
	show: Boolean
});

// 弹窗、显示/隐藏
const login_popup = ref(null);

// 勾选权限
const condition = ref(false);

watch(
	() => props.show,
	(newVal) => {
		if (newVal) {
			login_popup.value.open();
		} else {
			login_popup.value.close();
		}
	}
);

// 微信登录
function wx_login() {
	if (!condition.value) {
		uni.showToast({
			title: '请勾选隐私政策',
			mask: true,
			icon: 'none',
			duration: 2000
		});
		return;
	}
	uni.showLoading({
		title: '登录中',
		mask: true
	});
	wx.login({
		success(res) {
			console.log('res', res);

			setTimeout(function () {
				if (res.errMsg == 'login:ok') {
					emit('maskClick');
				}
				uni.hideLoading();
			}, 700);
		}
	});
}

// 关闭弹窗
function maskClick() {
	emit('maskClick');
}

// 协议
function open_agreement() {
	uni.navigateTo({
		url: '/pages/condition/agreement'
	});
}

// 隐私
function open_privacy() {
	uni.navigateTo({
		url: '/pages/condition/privacy'
	});
}

// 跳转注册
function open_register() {
	uni.navigateTo({
		url: '/pages/login/register'
	});
}
</script>

<style lang="scss" scoped>
.login_wrap {
	padding: 30rpx;
	background: #fff;
	border-radius: 24rpx 24rpx 0 0;
	.close {
		text-align: right;
	}

	.cover_box {
		text-align: center;
		.cover {
			width: 217rpx;
		}
	}

	.lead {
		font-size: 24rpx;
		color: #aaaaaa;
		text-align: center;
		padding: 30rpx 0;
	}

	.wx_btn {
		border-radius: 45rpx;
		font-size: 34rpx;
		font-weight: 500;
		color: #fff;
		margin: 20rpx 0;
	}

	.condition {
		text-align: center;
		font-size: 14px;
		color: #434343;
		display: flex;
		align-items: center;
		justify-content: center;
		.check {
			display: flex;
			align-items: center;

			.icon {
				transform: translateY(2px);
			}
		}
		.jump {
			color: #34489e;
		}
	}

	.tips {
		font-size: 32rpx;
		color: #000;
		font-weight: 500;
		text-align: center;
		padding: 34rpx 0;
	}
}
</style>
