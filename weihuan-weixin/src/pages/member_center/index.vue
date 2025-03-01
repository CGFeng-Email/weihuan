<template>
	<!-- 顶部到胶囊的高度 -->
	<view class="top" :class="scrollTop" :style="{ height: useMenuButton().top }"></view>
	<!-- 标题 -->
	<view class="page_title" :class="scrollTop" :style="{ top: useMenuButton().top, height: useMenuButton().height, 'line-height': useMenuButton().height }">
		<view class="return_icon" @click="return_page">
			<uni-icons type="left" size="23" :color="scrollTop == 'white_default' ? '#fff' : '#000'"></uni-icons>
		</view>
		<text class="page_title_text" v-if="scrollTop != 'white_default'">会员中心</text>
		<text class="page_title_text default_title" v-else>会员中心</text>
	</view>
	<!-- 占位 -->
	<view :style="{ height: useMenuButton().top }"></view>
	<view :style="{ height: useMenuButton().height }"></view>
	<!-- 顶部背景 -->
	<view class="fixed_top_bg">
		<image class="cover" src="/static/img/me_banner.png" mode="widthFix"></image>
	</view>

	<view class="main">
		<!-- 卡片 -->
		<view class="card">
			<view class="bg">
				<image src="/src/static/img/card_bg.jpg" mode="widthFix"></image>
			</view>
			<view class="content">
				<view class="head_portrait">
					<!-- 头像 -->
					<view class="box">
						<image class="portrait" :src="headPortrait" mode="aspectFit"></image>
					</view>
					<view class="right_content">
						<view class="name">
							<text class="text">{{ nickName }}</text>
							<image class="vip" src="/static/img/me_index.png" mode="widthFix" lazy-load v-if="is_svip != 0"></image>
						</view>
						<view class="phone">
							<image class="icon" src="/src/static/img/phone.png" mode="widthFix"></image>
							<text class="text">{{ mobile }}</text>
						</view>
					</view>
				</view>
				<view v-if="is_svip == 0">
					<view class="lead">还需要消费¥{{ need_fee }}元升级{{ nextVips }}</view>
					<view class="progress_box">
						<view class="schedule" :style="{ left: fee_rate + '%' }">
							<text class="price">￥{{ spent }}</text>
						</view>
						<progress :percent="fee_rate" :border-radius="30" stroke-width="10" activeColor="#FFF867" active />
						<view class="tips">
							<text class="text">{{ gradeVips }}</text>
							<text class="text">{{ nextVips }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 标题 -->
		<view class="center_title btn_bg">
			<text class="title">会员权益</text>
			<text class="line"></text>
		</view>
		<view class="sub_head" v-if="is_svip == 0">可申请成为SVIP，享受更优质的会员服务</view>
		<view class="sub_head" v-else>尊敬的SVIP，你正在享受优质的会员服务</view>
		<!-- 服务 -->
		<view class="service">
			<view class="item" v-for="(item, index) in serveList" :key="item.name">
				<view class="box">
					<image :src="item.icon" mode="widthFix"></image>
					<view class="title">{{ item.name }}</view>
					<view class="line"></view>
					<view class="lead over2">{{ item.remark }}</view>
				</view>
			</view>
		</view>
		<!-- 标题 -->
		<view class="center_title btn_bg">
			<text class="title">会员等级说明</text>
			<text class="line"></text>
		</view>
		<view class="sub_head">满足以下会员等级条件中任意一个条件即可</view>
		<!-- 消费阶梯 -->
		<view class="ladder">
			<view class="item" v-for="item in rankList" :key="item.id">
				<view class="box">
					<view class="title">{{ item.title }}</view>
					<view class="height">
						<text class="text">累计消费 满{{ item.fee }}元</text>
					</view>
				</view>
			</view>
		</view>
	</view>
	<bottomButton @bottom_click="confirmApplySvip" title="申请成为SVIP" v-if="is_svip == 0"></bottomButton>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { onPageScroll } from '@dcloudio/uni-app';
import useMenuButton from '../../hooks/useMenu.js';
import bottomButton from '../component/bottom.vue';
import { memberCenter, applyVip } from '@/api/index.js';

// 头像
const headPortrait = ref('/static/img/head_portrait.png');
// 昵称
const nickName = ref('微信用户');
// 手机号
const mobile = ref('');
// 是否SVIP
const is_svip = ref('');
// 已消费金额
const spent = ref(0);
// 下一等级还需消费金额
const need_fee = ref(null);
// 等级比例
const fee_rate = ref(0);
// 当前等级名称
const gradeVips = ref('');
// 下一等级名称
const nextVips = ref('');
// 等级列表
const rankList = ref([]);
// 会员描述列表
const serveList = ref([]);

// 获取会员中心数据
const getMemberCenter = async () => {
	const res = await memberCenter();
	console.log('会员中心', res);
	if (res.code == 1) {
		nickName.value = res.data.nickname;
		mobile.value = res.data.mobile;
		is_svip.value = res.data.is_svip;
		spent.value = res.data.total_fee;
		need_fee.value = res.data.need_fee;
		fee_rate.value = res.data.fee_rate;
		gradeVips.value = res.data.grade_info.title;
		nextVips.value = res.data.next_grade_info.title;
		const avatar = res.data.avatar;
		if (avatar) {
			headPortrait.value = avatar;
		}
	}
};

// 申请成为svip
const confirmApplySvip = () => {
	uni.showModal({
		content: '确定申请成为SVIP吗？',
		success: async (res) => {
			if (res.confirm) {
				const res = await applyVip();
				console.log('申请成为svip', res);

				uni.showToast({
					title: res.msg,
					duration: 2000,
					mask: true,
					icon: 'none'
				});
			}
		}
	});
};

// 返回
const return_page = () => {
	uni.navigateBack();
};

onMounted(() => {
	getMemberCenter();
	const commonData = uni.getStorageSync('commonData');
	rankList.value = commonData.grade_list;
	serveList.value = commonData.vip_desc;
});

// 顶部区域滚动
const scrollTop = ref('white_default');
onPageScroll((e) => {
	if (e.scrollTop < 30) {
		scrollTop.value = 'white_default';
	}
	if (e.scrollTop > 30 && e.scrollTop < 60) {
		scrollTop.value = 'white_30';
	} else if (e.scrollTop > 60 && e.scrollTop < 100) {
		scrollTop.value = 'white_60';
	} else if (e.scrollTop > 100) {
		scrollTop.value = 'white_100';
	}
});
</script>

<style>
page {
	background: #fbfbfb;
}
</style>

<style lang="scss" scoped>
.white_default {
	background: transparent;
}
.white_30 {
	background: rgba(255, 255, 255, 0.3);
}
.white_60 {
	background: rgba(255, 255, 255, 0.6);
}
.white_100 {
	background: rgba(255, 255, 255, 1);
}
.fixed_top_bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 750rpx;
	z-index: -1;
	.cover {
		width: 750rpx;
	}
}

.main {
	padding: 20rpx 30rpx 50rpx;

	.card {
		// height: 384rpx;
		position: relative;
		border-radius: 30rpx;
		overflow: hidden;
		.bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.content {
			position: relative;
			z-index: 2;
			padding: 30rpx;
			.head_portrait {
				display: flex;
				align-items: center;
				padding-bottom: 20rpx;
				.box {
					width: 114rpx;
					height: 114rpx;
					border-radius: 50%;
					padding: 6rpx;
					background: #f5e7d2;
					position: relative;
					flex: none;
					.portrait {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
					.vip {
						position: absolute;
						top: -14rpx;
						right: 0;
						width: 36rpx;
					}
				}
				.right_content {
					flex: 1;
					padding-left: 20rpx;
					.name {
						padding: 4rpx 0;
						display: flex;
						align-items: center;
						.text {
							font-size: 30rpx;
							line-height: 40rpx;
							color: #fff;
							font-weight: bold;
							padding-right: 6rpx;
						}

						.vip {
							width: 64rpx;
						}

						.icon {
							width: 54rpx;
						}
					}

					.phone {
						padding: 4rpx 0;
						display: flex;
						align-items: center;
						.text {
							font-size: 24rpx;
							line-height: 34rpx;
							color: #fff;
							padding-left: 6rpx;
						}
						.icon {
							width: 14rpx;
						}
					}
				}
			}
			.lead {
				font-size: 26rpx;
				line-height: 34rpx;
				color: #fff;
				padding: 6rpx 0;
			}
			.progress_box {
				margin-top: 60rpx;
				padding: 10rpx 0;
				position: relative;

				.schedule {
					position: absolute;
					top: -54rpx;
					.price {
						font-size: 24rpx;
						color: #000;
						background: #fff867;
						border-radius: 6rpx;
						padding: 6rpx 14rpx;
					}
				}
				.tips {
					padding-top: 10rpx;
					display: flex;
					justify-content: space-between;
					.text {
						font-size: 28rpx;
						color: #fff;
						font-weight: bold;
					}
				}
			}
		}
	}

	.center_title {
		width: 280rpx;
		height: 80rpx;
		line-height: 60rpx;
		margin: 40rpx auto;
		text-align: center;
		border-radius: 24rpx 6rpx;
		position: relative;
		margin-bottom: 20rpx;

		.title {
			font-size: 28rpx;
			color: #fff;
			font-weight: bold;
		}

		.line {
			position: absolute;
			bottom: 14rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 34px;
			height: 3px;
			border-radius: 2px;
			background: #fff;
			display: inline-block;
		}
	}

	.sub_head {
		font-size: 28rpx;
		text-align: center;
		line-height: 38rpx;
		color: #848484;
	}

	.service {
		display: flex;
		flex-wrap: wrap;
		padding: 30rpx 0;
		.item {
			width: 50%;
			padding: 10rpx;
			.box {
				text-align: center;
				padding: 50rpx 20rpx;
				background: #fff;
				box-shadow: 0 0 4rpx rgba(0, 0, 0, 0.1);
				border-radius: 12rpx;
			}
			image {
				width: 50rpx;
			}
			.title {
				font-size: 28rpx;
				color: #000;
				font-weight: bold;
				padding: 14rpx 0;
			}
			.line {
				width: 30px;
				height: 2px;
				border-radius: 2px;
				background: #ff8992;
				margin: auto;
			}
			.lead {
				font-size: 24rpx;
				line-height: 34rpx;
				color: #9a9a9a;
				margin-top: 20rpx;
				text-align: center;
			}
		}
	}

	.ladder {
		padding-top: 20rpx;
		display: flex;
		align-items: flex-end;
		.item {
			flex: 1;
			.box {
				padding: 10rpx;
				text-align: center;
				.title {
					color: #ff8992;
					text-align: center;
					padding: 10rpx 0;
					font-weight: bold;
					font-size: 30rpx;
				}
				.height {
					display: flex;
					align-items: center;
					font-size: 24rpx;
					line-height: 34rpx;
					color: #fff;
					border-radius: 24rpx;
				}
			}
		}

		.item:nth-child(1) {
			.box {
				.height {
					height: 110rpx;
					background: #dfd0c0;
				}
			}
		}
		.item:nth-child(2) {
			.box {
				.height {
					height: 150rpx;
					background: #e2cdb4;
				}
			}
		}
		.item:nth-child(3) {
			.box {
				.height {
					height: 190rpx;
					background: #e2c7a7;
				}
			}
		}
		.item:nth-child(4) {
			.box {
				.height {
					height: 240rpx;
					background: #e3c59d;
				}
			}
		}
	}
}
</style>
