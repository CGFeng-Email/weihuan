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
			<view class="lead">精彩美味之旅由此开启。一键登录，尊享专属优惠&会员好礼</view>
			<button class="wx_btn btn_bg" open-type="login" @click="wx_login">微信登录</button>
			<view class="condition">
				<view class="check" @click="condition = !condition">
					<uni-icons class="icon" :type="condition ? 'checkbox-filled' : 'circle'" size="18" color="#434343"></uni-icons>
					<text class="text">我已阅读并同意</text>
				</view>
				<text class="jump" @click="open_agreement">炜洹用户协议、</text>
				<text class="jump" @click="open_privacy">隐私政策</text>
			</view>
			<!-- <view class="tips" @click="open_register">手机号登录/注册</view> -->
		</view>
	</uni-popup>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';
const emit = defineEmits(['maskClick']);
import { wxLogin } from '@/api/index.js';

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
			title: '请阅读并勾选用户协议',
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

	uni.login({
		provider: 'weixin',
		success: async (res) => {
			console.log('获取code', res);
			if (res.errMsg == 'login:ok') {
				const reslogin = await wxLogin({
					code: res.code
				});
				console.log('微信登录', reslogin);
				if (reslogin.code == 1) {
					// 登录成功
					uni.setStorageSync('openid', reslogin.data.openid);
					uni.setStorageSync('token', reslogin.data.token);
					uni.setStorageSync('mobile', reslogin.data.mobile);

					if (reslogin.data.is_reg == 0) {
						// 未注册
						uni.navigateTo({
							url: `/pages/login/register`
						});
					}
				}
				emit('maskClick');
			}
		},
		fail: (err) => {
			console.log('err', err);
		}
	});

	uni.hideLoading();
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
		padding: 10rpx 0;
		.check {
			display: flex;
			align-items: center;
			.icon {
				transform: translateY(1px);
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
