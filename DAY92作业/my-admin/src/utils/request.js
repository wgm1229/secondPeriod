import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://iaqhvhzs.lc-cn-n1-shared.com',
  timeout: 1000,
  headers: {
    'X-LC-Id': 'iaqHVhzSwqXu9PcDPooWgf2c-gzGzoHsz',
    'X-LC-Key': 'cfjcMi0tm3MOFGXzor059wW2',
    'Content-Type': 'application/json',
  }
})
export default instance