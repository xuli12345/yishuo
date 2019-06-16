// 封装axios进行接口请求
import Axios from 'axios'
import qs from 'qs'
// Axios.defaults.headers.post['content-Type'] = 'application/json;charset=utf-8'

export function axios(url, data) {
  data = qs.stringify(data);
  return Axios.post(url, data, {headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }}).then((res) => {
    if (res.data) {
      return Promise.resolve(res.data)
    } else {
      return Promise.resolve(res)
    }
  }).catch((res) => {
    return Promise.reject(res)
  })
}
