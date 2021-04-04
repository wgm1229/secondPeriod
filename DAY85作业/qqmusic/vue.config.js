module.exports = {
    devServer:{
        proxy:{
            '/hehe':{
                target:'http://localhost:3300/',
                pathRewrite:{
                    '^/hehe':''
                }
            },
            '/music':{
                target:'https://api.qq.jsososo.com',
                pathRewrite:{
                    '^/music':''
                }
            }
        }
    }
}