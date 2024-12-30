import {
	onShareAppMessage,
	onShareTimeline
} from "@dcloudio/uni-app"

export default {
	// 发送给朋友
	onShareAppMessage(res) {
		return {
			path: '/pages/index/index'
		}
	},

	//分享到朋友圈
	onShareTimeline(res) {
		return {
			path: '/pages/index/index'
		}
	}
}