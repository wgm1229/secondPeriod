import axios from 'axios'

const instance = axios.create({  //创造一个带有配置项的axios实例对象
  baseURL: 'https://ed0sfmxd.lc-cn-n1-shared.com',
  timeout: 1000,
  headers: {
    'X-LC-Id': 'ed0SfMxDkgLHKOMsPIoNiTlB-gzGzoHsz',
    'X-LC-Key': 'bBFIjH7SdBXNGYqVTXj5282M',
    'Content-Type': 'application/json'
  }
});

export default instance  