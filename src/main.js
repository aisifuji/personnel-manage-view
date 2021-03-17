
import Vue from 'vue'
import ElementUI from 'element-ui'

// 自定义组件模块
import MyPlugin from './assets/js/plugin'

// axios qs
import qs from 'qs'
import axios from './axios/http'
// store
import store from './store/index.js'

import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import './assets/css/site.css'
import router from './router/index'
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import solids from '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'


//导入
import XLSX from 'xlsx'

Vue.prototype.XLSX = XLSX
// 引入mockjs
// require('./mock.js');
// 注册全局UI组件
import components from './ui-compoents'
Vue.use(components)

// 自定义样式
import './assets/css/from.css'
import './assets/css/table.css'
import './assets/css/common.css'

//引入高德地图
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: "f53f31e78c72b8688ae71146bf3e9ef1",
  plugin: [
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.Geocoder",
  ],
  v: "1.4.4"
});

//全局引入图表插件
import echarts from 'echarts'
Object.defineProperties(Vue.prototype, {
  echarts: { get: () => echarts }
});


//公用的方法
import common from './commonFunction/index.js';
Vue.prototype.common = common;

Vue.use(ElementUI, { size: 'small' })
Vue.use(MyPlugin)
Vue.prototype.$qs = qs
Vue.prototype.$axios = axios
fontawesome.library.add(brands, solids)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
