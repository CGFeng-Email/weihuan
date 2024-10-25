import {
	createSSRApp
} from "vue";
import App from "./App.vue";

import login_popup from "./pages/component/login_popup.vue";


export function createApp() {
	const app = createSSRApp(App);
	app.component('login-popup', login_popup);
	return {
		app,
	};
}
