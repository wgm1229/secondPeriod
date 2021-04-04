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
  import {getSongUrl} from '@/api/singer.js'
  export default {
    data() {
      return {
        name: '演员',
        songurl:''
      }
    },
    created() {
      console.log('歌曲id',this.$route.params.id)
      let {id} = this.$route.params
      getSongUrl(id).then(res=>{
        console.log(res.data.data[id]);
        this.songurl = res.data.data[id]
      })
    },
  }
</script>

<style lang="scss" scoped>

</style>