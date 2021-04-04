import axios from 'axios'  //引入axios

export default function ajax(url, data = {}, type = 'GET') {
  if (type === 'GET') {
    return axios.get(url, {  // 这个返回值是一个promise对象
      params: data
    })
  } else {
    return axios.post(url, data)
  }
}



