// 当路由栈只有一级时，即用户从分享页面进入小程序且无其他页面可返回时，重定向到首页，避免返回键失效
function addRouteInterceptor() {
	uni.addInterceptor("navigateBack", {
		invoke(e) {
			let routes = getCurrentPages();
			console.log('router', routes);
			if (routes.length > 1) {
				return true;
			} else {
				uni.switchTab({
					url: '/pages/index/index'
				})
				return false;
			}
		}
	});
}
export default {
	addRouteInterceptor
};