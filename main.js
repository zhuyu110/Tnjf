import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
/* 全局挂载请求库 */
import GraceRequest from './GraceUI5/js/request/request.js'
import store from './store/index'
import './styles/index.scss'
uni.gRequest = GraceRequest;
//测试服务器http://10.12.22.19:8080/pms_web_war/pc/jfPoints/saveBatteryCode819
/* Vue.prototype.apiUrl="http://10.10.72.77:8080/pms_web_war/pc/";
Vue.prototype.imgUrl="http://10.10.72.77:8080/pms-pic/"; */
/* Vue.prototype.apiUrl="http://10.10.72.94:1225/pms_web_war/pc/";
Vue.prototype.imgUrl="http://10.10.72.94:1225/pms-pic/"; */



//正式服务器
Vue.prototype.apiUrl="https://www.tn-hs.com/pms-web/pc/";
Vue.prototype.imgUrl="https://www.tn-hs.com/pms-pic/";


const app = new Vue({
    ...App,
	  store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif