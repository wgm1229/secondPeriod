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
    props: ['songid','seektime','single'],
    data() {
      return {
        text: '暂无歌词'
      }
    },
    computed: {
      isPlay() {  //歌曲播放状态
        return this.$store.state.player.isPlay; 
      },
      song(){  //提取正在播放的歌曲对象
        let {songlist,currentSong} = this.$store.state.player;
        return songlist[currentSong];  //提取正在播放的歌曲数据
      },
      currentSong(){ //提取正在播放的歌曲列表序号
        return this.$store.state.player.currentSong
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
        // this.lrcObj.togglePlay()  //切换歌词的播放状态
        if(newPlay){
          this.lrcObj.play(this.seektime*1000) //从新指定的时间点开始播放歌词
        }else{
          this.lrcObj.stop()  //停止歌词的切换
        }
      },
      currentSong(){ //监听歌曲下标的变化
        console.log('歌词组件监听下标',this.song);
        
        let {mid} = this.song;
        this.getLrcById(mid) //重新加载新歌曲对应的歌词
      },
      single(){  //监听单曲循环的布尔值
      console.log('single发生了变化')
      this.getLyricFn(this.songid); //重新获取歌词
    }
    },
    mounted(){
      // console.log('歌词组件收到了id',this.songid);
      this.getLrcById(this.songid)  //歌词组件初始化的时候，第一次加载歌词
    },
    methods: {
      getLrcById(songid) { //根据歌曲id，获取歌词的方法
        getLrc(songid).then(res=>{
          console.log(res);
          let lrc = res.data.data.lyric
          if(this.lrcObj){  //如果已经有歌词在播放，先关闭前一个歌词的滚动
            this.lrcObj.stop()
          }
          this.lrcObj = new Lyric(lrc,(obj)=>{  //初始化歌词对象
            //obj就是每次解析出来，存放每一行歌词的对象
            console.log(obj.txt);
            this.text = obj.txt
          })
          this.lrcObj.play()  //执行歌词对象的播放操作
        })
      }
    },
    beforeDestroy(){
      console.log('歌词组件即将销毁')
      this.lrcObj.stop()
    }
  }
</script>

<style lang="less" scoped>
.lyric{
  text-align: center;
  font-size: 14px;
}
</style>