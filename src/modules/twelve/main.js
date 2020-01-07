import Vue from 'vue'
import App from './App.vue'
import router from './route/router'
import axios from "axios"
import qs from 'qs'

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_API_HOST;
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.use(router);

Vue.prototype.axios = axios;
Vue.prototype.qs = qs;
// Vue.prototype.common = common;
new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
