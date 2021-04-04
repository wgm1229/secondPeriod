<template>
  <van-button type="primary" @click="handleCookie">
    设置真实cookie
  </van-button>
</template>

<script>
import request from '../utils/request'
export default {
  methods: {
    handleCookie() {
      request.post(`/hehe/user/setCookie`,{
        data:`写入自己获取到的真实cookie`
      })
    }
  },
}
</script>

