import {
	createSSRApp
} from "vue";
import App from "./App.vue";

import store from './store/index.js';

import share from '@/utils/share.js';

import login_popup from "./pages/component/login_popup.vue";


export function createApp() {
	const app = createSSRApp(App);
	app.mixin(share);
	app.component('login-popup', login_popup);
	app.use(store);
	return {
		app,
		store
	};
}