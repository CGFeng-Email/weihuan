<template>
	<view class="main">
		<view class="cover_box">
			<image class="cover" src="/src/static/img/logo.png" mode="widthFix"></image>
		</view>
		<view class="lead">精彩美味之旅由此开启。一键登录，尊享专属优惠&会员好礼</view>
		<view class="form">
			<view class="input_box">
				<picker mode="selector" :range="check_list" :value="selectIndex" range-key="title" @change="checkChange">
					<view class="num">+{{ check_list[selectIndex].title }}</view>
				</picker>
				<input class="input" type="tel" placeholder="请输入手机号" v-model="phone" :maxlength="11" focus confirm-type="send" placeholder-class="placeholder" />
				<button class="btn_bg get_code" :class="times < 60 ? 'disabled' : ''" :disabled="times < 60 ? true : false" @click="get_code">
					{{ times < 60 ? `倒计时${times}s` : '获取验证码' }}
				</button>
			</view>
			<view class="input_box">
				<input class="input" type="number" placeholder="请输入验证码" v-model="code" :maxlength="6" confirm-type="done" placeholder-class="placeholder" />
			</view>
			<button class="login_btn" :class="isDisabled ? '' : 'btn_bg'" :disabled="isDisabled" @click="wx_login">登录</button>
		</view>
	</view>
</template>

<script setup>
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { ref, computed } from 'vue';
import { phoneLogin, sendMobileCode } from '@/api/index.js';

const selectIndex = ref(0);
const phone = ref(null);
const code = ref(null);

const check_list = ref([
	{
		title: 86
	},
	{
		title: 886
	},
	{
		title: 852
	},
	{
		title: 853
	},
	{
		title: 44
	},
	{
		title: '01'
	},
	{
		title: 49
	},
	{
		title: 358
	},
	{
		title: 41
	}
]);

// 号码前缀选择
function checkChange(e) {
	selectIndex.value = e.detail.value;
}

// 获取验证码
let times = ref(60);
function get_code() {
	if (times.value == 60) {
		start_times();
	} else {
		uni.showToast({
			title: '请等待倒计时结束，再重新获取',
			mask: true,
			icon: 'none',
			duration: 1000
		});
	}
}

// 开始倒计时
async function start_times() {
	// 手机号正则
	const regExp = new RegExp(/^1[3|4|5|7|8|9][0-9]\d{8}$/);
	const reg = regExp.test(phone.value);

	if (!reg) {
		uni.showToast({
			title: '请输入手机号',
			mask: true,
			icon: 'none',
			duration: 1200
		});
	} else {
		const res = await sendMobileCode({
			mobile: phone.value
		});
		console.log('发送验证码', res);

		uni.showToast({
			title: res.msg,
			icon: 'none',
			mask: true,
			duration: 2000,
			complete: () => {
				if (res.code == 1) {
					const timesId = setInterval(() => {
						times.value--;
						if (times.value == 1) {
							times.value = 60;
							clearInterval(timesId);
						}
					}, 1000);
				}
			}
		});
	}
}

// 计算登录验证
const isDisabled = computed(() => {
	// 手机号正则
	const regExp = new RegExp(/^1[3|4|5|7|8|9][0-9]\d{8}$/);
	const reg = regExp.test(phone.value);

	if (!reg) {
		return true;
	}

	if (!code.value || String(code.value).length < 4) {
		return true;
	}

	return false;
});

// 登录
async function wx_login() {
	console.log(isDisabled.value);

	uni.showLoading({
		title: '登录中',
		mask: true
	});

	const res = await phoneLogin({
		openid: uni.getStorageSync('openid'),
		mobile: phone.value,
		code: code.value
	});

	console.log('res', res);

	if (res.code == 1) {
		uni.setStorageSync('token', res.data.token);
		uni.setStorageSync('mobile', res.data.mobile);
		uni.hideLoading();
		uni.navigateBack();
	}
}

onShareAppMessage(() => {
	return {
		title: '网上商城 | WakanMALL',
		path: '/pages/index/index'
	}
})

onShareTimeline(() => {
	return {
		title: '网上商城 | WakanMALL',
		path: '/pages/index/index'
	}
})
</script>

<style lang="scss" scoped>
.main {
	padding: 150rpx 30rpx 30rpx;
	.cover_box {
		text-align: center;
		.cover {
			width: 217rpx;
		}
	}

	.lead {
		font-size: 24rpx;
		line-height: 34rpx;
		color: #aaaaaa;
		padding: 30rpx 0;
		text-align: center;
	}

	.form {
		padding: 100rpx 40rpx 0;
		.input_box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #e1e1e1;
			padding: 20rpx 0;
			margin-bottom: 30rpx;
			.num {
				font-size: 42rpx;
				color: #000;
				font-weight: 500;
				flex: none;
			}

			.input {
				flex: 1;
				padding: 0 20rpx;
				font-size: 30rpx;
				font-weight: 500;
				font-size: 32rpx;
			}

			.get_code {
				flex: none;
				width: 200rpx;
				height: 64rpx;
				border-radius: 45rpx;
				text-align: center;
				line-height: 64rpx;
				color: #fff;
				font-weight: 500;
				font-size: 26rpx;
				&::after {
					display: none;
				}
			}

			.disabled {
				background: #ccc !important;
				color: #888 !important;
				cursor: not-allowed;
			}
		}
	}
}

::v-deep .placeholder {
	color: #dbdbdb;
}

.login_btn {
	margin-top: 80rpx;
	border-radius: 45rpx;
	font-size: 34rpx;
	color: #fff;
	font-weight: 500;
}
</style>
