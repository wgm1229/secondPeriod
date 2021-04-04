module.exports = { //commonjs规范
  devServer:{ //本地服务
    proxy:{  //本地代理
      '/hehe':{ //标致代理接口的路径字段
        target: 'http://localhost:3300', //代理请求的目标服务器
        pathRewrite:{
          '^/hehe':''  //将多余的/hehe从整个接口路径中剔除
          // 1. 我们使用/hehe/singer/list 向代理服务发请求
          // 2. 如果写了pathRewrite，那么经过代理服务转发后请求的目标路径就是
                // http://localhost:3300/singer/list
          // 3. 如果不写pathRewrite，那么经过代理服务转发后请求的目标路径就是
                // http://localhost:3300/hehe/singer/list
                // 这个接口并不存在
        }
      },
      '/music': { //标致代理接口的路径字段
        target: 'https://api.qq.jsososo.com', //代理请求的目标服务器
        pathRewrite: {
          '^/music': ''
        }
      }
    }
  }
}