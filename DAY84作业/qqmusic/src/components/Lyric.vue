<template>
  <div>
    <div class="lyric">{{text}}</div>
  </div>
</template>

<script>
import {getLyric} from '../api/singer'
 import Lyric from 'lyric-parser'
export default {
  props: ['songid'],
  data() {
      return {
          text: '暂无歌词'
      }
  },
  mounted () {
      getLyric(this.songid).then(res=>{
        //   console.log(res)
          let lrc = res.data.data.lyric
          this.lyric = new Lyric(lrc, (obj)=>{
              console.log(obj.txt)
              this.text=obj.txt
          })
          this.lyric.play()
      })
  },
};
</script>

<style lang="less" scoped>
</style>