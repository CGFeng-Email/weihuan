<template>
	<view class="main">
		<view class="cover_box">
			<image class="cover" src="/src/static/img/logo.png" mode="widthFix"></image>
		</view>
		<view class="lead">炜洹诚信为本非常重视商业信誉，从不销售品质低劣的产品</view>
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
			<button class="btn_bg login_btn" @click="wx_login">登录</button>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
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
function start_times() {
	console.log('start');
	const timesId = setInterval(() => {
		times.value--;
		if (times.value == 1) {
			times.value = 60;
			clearInterval(timesId);
		}
	}, 1000);
}

// 计算登录验证
const isDisabled = computed(() => {
	// 手机号正则
	const regExp = new RegExp(/^1[3|4|5|7|8|9][0-9]\d{8}$/);
	const reg = regExp.test(phone.value);

	if (!reg) {
		return 'phone';
	}

	if (!code.value || String(code.value).length < 4) {
		return 'code';
	}

	return 'success';
});

// 登录
function wx_login() {
	console.log(isDisabled.value);
	switch (isDisabled.value) {
		case 'phone':
			uni.showToast({
				title: '请输入正确的手机号',
				mask: true,
				icon: 'none',
				duration: 1200
			});
			break;
		case 'code':
			uni.showToast({
				title: '请输入正确的验证码',
				mask: true,
				icon: 'none',
				duration: 1200
			});
			break;
		case 'success':
			uni.showLoading({
				title: '登录中',
				mask: true
			});
			setTimeout(function () {
				uni.hideLoading();
			}, 700);
			break;
	}
}
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
			}

			.get_code {
				flex: none;
				width: 180rpx;
				height: 60rpx;
				border-radius: 45rpx;
				text-align: center;
				line-height: 60rpx;
				color: #fff;
				font-weight: 500;
				font-size: 24rpx;
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
