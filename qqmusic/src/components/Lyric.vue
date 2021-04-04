<template>
  <div>
    <div class="lyric">
      {{text}}
    </div>
  </div>
</template>

<script>
  import {getLrc} from '../api/singer'
  import Lyric from 'lyric-parser'
  export default {
    props: ['songid','seektime'],
    data() {
      return {
        text: '暂无歌词'
      }
    },
    computed: {
      isPlay() {  //歌曲播放状态
        return this.$store.state.player.isPlay; 
      }
    },
    watch:{
      seektime(newTime,oldTime){ //newTime是变化后的值，oldTime是变化前的值
        // console.log('歌词监听到了时间变化',newTime,oldTime);
        if(!this.lrcObj){return false}
        this.lrcObj.seek(newTime*1000)
      },
      isPlay(newPlay,oldPlay){ //检测音乐的播放状态，同步切换歌词播放状态
        console.log('歌词播放状态',newPlay);
        if(!this.lrcObj){return false}
        this.lrcObj.togglePlay()  //切换歌词的播放状态
      }
    },
    mounted(){
      // console.log('歌词组件收到了id',this.songid);
      getLrc(this.songid).then(res=>{
        console.log(res);
        let lrc = res.data.data.lyric
        if(this.lrcObj){
          this.lrcObj.stop()
        }
        this.lrcObj = new Lyric(lrc,(obj)=>{  //初始化歌词对象
          //obj就是每次解析出来，存放每一行歌词的对象
          console.log(obj.txt);
          this.text = obj.txt
        })
        this.lrcObj.play()  //执行歌词对象的播放操作
      })
    },
  }
</script>

<style lang="scss" scoped>

</style>