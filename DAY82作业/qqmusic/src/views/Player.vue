<template>
  <div>
    <van-nav-bar :title="name" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <audio :src="songurl" autoplay></audio>
  </div>
</template>

<script>
import { getSongUrl } from "../api/singer";

export default {
    data() {
        return {
            name: '演员',
            songurl:''
        }
    },
    created () {
        let {id} = this.$route.params 
        console.log(id)
        getSongUrl(id).then(res=>{
            console.log(res)
            this.songurl = res.data.data[id]
        })
    },
};
</script>

<style lang="less" scoped>
</style>