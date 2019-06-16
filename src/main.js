// 引用全局所需
import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router/router";
// import store from "./store";
import iView from "iview";
import mockApi from "./mock/config/mockApi";
//所有的接口
import $api from "./api/api-server"
//公共方法
// import formatTime from "../static/util_js/formatTime";
//webuploader 上传文件
// import vueUploadWeb from "vue-upload-web";
import "../my-theme/index.less";

//过滤器
import * as filters from "./filter/filters"
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
//require引入
// var vueUploadWeb = require('VueUploadWeb')

// 引入echarts 全局引入会将所有的echarts图表打包，导致体积过大，最好还是按需引入
// 按需引入的模块列表见 https://github.com/ecomfe/echarts/blob/master/index.js
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts

Vue.prototype.$api = $api;

Vue.use(iView);
Vue.use(mockApi);
// Vue.use(formatTime);
// Vue.use(vueUploadWeb);

/*Vue.filter('reportType', function (value) {
  return 'test'
})*/

Vue.config.productionTip = false;

// 全局引入mockjs 这里之所以使用 require 而不是 import，是因为 require 可以直接从 node_modules 中查找，而 import 必须把路径写全
require("./mock/data/mock_data");

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  // store,
  components: {
    App
  },
  template: "<App/>"
  // render: h => h(App)
});
