import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as fa from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import 'ant-design-vue/dist/antd.less'

library.add(fa.faTerminal, fa.faHeartbeat, fa.faLaptop, fa.faExchangeAlt, fa.faShoePrints)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(VueAxios, axios)
Vue.use(VueCookies)

if (process && process.env && process.env.NODE_ENV == 'development') {
	axios.defaults.baseURL = '/api/'
} else {
	axios.defaults.baseURL = '/'
}

// 请求拦截
axios.interceptors.request.use(
	(config) => {
		// 在发送请求之前做某事
		return config;
	},
	(error) => {
		// 请求错误时做些事
		return Promise.reject(error)
	}
);

// 响应拦截
axios.interceptors.response.use(
	(result) => {
		return result;
	},
	err => Promise.reject(err)
);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
