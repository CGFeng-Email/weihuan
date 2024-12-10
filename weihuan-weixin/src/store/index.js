import {
	createStore
} from "vuex";

const store = createStore({
	state() {
		return {
			// 用户信息
			userData: {},
		}
	},
	// 同步，唯一修改state的途径
	// 参数1: state，参数2: payload
	// 调用: this.$store.commit('')
	// 辅助函数: mapMutations
	mutations: {
		// 存储用户信息
		storageUserData(state, payload) {
			console.log('payload', payload);
			state.userData = payload;
		}
	},
	// 异步，axios请求都在这里执行
	// 参数1: context:上下文
	// 调用mutations方法: context.commit('')
	// 调用getters方法: context.dispatch('')
	// 辅助函数: mapActions
	actions: {},
	// 辅助函数、计算属性
	getters: {}
})

export default store