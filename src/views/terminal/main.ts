import Vue from 'vue'
import Antd from 'ant-design-vue'
import terminal from './terminal.vue'
import router from '../../router'
import store from '../../store'
import 'ant-design-vue/dist/antd.less'
Vue.config.productionTip = false

Vue.use(Antd)
new Vue({
  router,
  store,
  render: h => h(terminal)
}).$mount('#app')