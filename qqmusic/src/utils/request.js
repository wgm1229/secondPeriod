import axios from 'axios'

let instance = axios.create({
  // baseURL: 'http://localhost:3300',  //开发环境的接口地址
  // baseURL:'https://shopapi.smartisan.com', //生产环境的接口地址
})

export default instance;