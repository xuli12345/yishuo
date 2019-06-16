// mock测试数据 无需引用，已在main.js内进行全局引用
import {
  axios
} from '../../api/axios.js'

// 为了供全局使用，无需重复调用
export default {
  install(Vue, options) {
    Vue.prototype.mockJsonData = function (url, data) {
      return axios(url, data)
    }
  }
}
// 使用mock生成的测试数据
// export function mockJsonData(url, data) {
//   return axios(url, data)
// }
