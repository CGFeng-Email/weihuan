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
				<image src="/src/static/img/card_bg.jpg" mode="scaleToFill"></image>
			</view>
			<view class="content">
				<view class="head_portrait">
					<!-- 头像 -->
					<view class="box">
						<image class="portrait" src="/static/img/head_portrait.png" mode="aspectFit"></image>
					</view>
					<view class="right_content">
						<view class="name">
							<text class="text">思源本兮</text>
						</view>
						<view class="phone">
							<image class="icon" src="/src/static/img/phone.png" mode="widthFix"></image>
							<text class="text">13662245269</text>
						</view>
					</view>
				</view>
				<view class="lead">还需要消费¥500.00元升级</view>
				<view class="progress_box">
					<view class="schedule" :style="{ left: 50 + '%' }">
						<text class="price">￥860.00</text>
					</view>
					<progress :percent="60" :border-radius="30" stroke-width="10" activeColor="#FFF867" active />
					<view class="tips">
						<text class="text">v1</text>
						<text class="text">v2</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 标题 -->
		<view class="center_title btn_bg">
			<text class="title">会员权益</text>
			<text class="line"></text>
		</view>
		<view class="sub_head">可申请成为SVIP，享受更优质的会员服务</view>
		<!-- 服务 -->
		<view class="service">
			<view class="item">
				<view class="box">
					<image src="/src/static/img/service1.png" mode="widthFix"></image>
					<view class="title">价格优惠</view>
					<view class="line"></view>
					<view class="lead over2">购买商品时使用优惠券的同时还能享受会员折扣。</view>
				</view>
			</view>
			<view class="item">
				<view class="box">
					<image src="/src/static/img/service2.png" mode="widthFix"></image>
					<view class="title">优先发货</view>
					<view class="line"></view>
					<view class="lead over2">购买商品后，仓库优先安排商品发货。</view>
				</view>
			</view>
			<view class="item">
				<view class="box">
					<image src="/src/static/img/service3.png" mode="widthFix"></image>
					<view class="title">售后优先</view>
					<view class="line"></view>
					<view class="lead over2">商品有任何问题，咨询客服享受快速回应服务。</view>
				</view>
			</view>
			<view class="item">
				<view class="box">
					<image src="/src/static/img/service4.png" mode="widthFix"></image>
					<view class="title">客户回馈</view>
					<view class="line"></view>
					<view class="lead over2">平台客服不定时给优质客户提供温馨回馈服务。</view>
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
			<view class="item">
				<view class="box">
					<view class="title">v1</view>
					<view class="height">
						<text class="text">累计消费 满100元</text>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="box">
					<view class="title">v2</view>
					<view class="height">
						<text class="text">累计消费 满2500元</text>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="box">
					<view class="title">v3</view>
					<view class="height">
						<text class="text">累计消费 满4500元</text>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="box">
					<view class="title">v4</view>
					<view class="height">
						<text class="text">累计消费 满8000元</text>
					</view>
				</view>
			</view>
		</view>
	</view>
	<bottomButton @bottom_click="bottom_click" title="申请成为SVIP"></bottomButton>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { onPageScroll } from '@dcloudio/uni-app';
import useMenuButton from '../../hooks/useMenu.js';
import bottomButton from '../component/bottom.vue';
import { memberCenter } from '@/api/index.js';

// 获取会员中心数据
const getMemberCenter = async () => {
	const res = await memberCenter({});
	console.log('res', res);
};

// 返回
const return_page = () => {
	uni.navigateBack();
};

function bottom_click() {}

onMounted(() => {
	getMemberCenter();
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
		height: 384rpx;
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
				padding: 8rpx 0;
			}
			.progress_box {
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
		padding: 30rpx 0 60rpx;
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
		padding-top: 40rpx;
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
