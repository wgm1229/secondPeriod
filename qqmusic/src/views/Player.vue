<template>
  <div class='player'>
  <!-- <audio src="http://m7.music.126.net/20201202122257/efeff7e7cd987c4645bfa06d379eefbc/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3"></audio> -->
  <div class='big'>
  <!-- 头部 -->
    <div class='top'> 
      <span>v</span>
      七里香
    </div>
    <!-- 背景 -->
    <div class='bg'>
      <img src="https://y.gtimg.cn/music/photo_new/T001R300x300M0000025NhlN2yWrP4.jpg?max_age=2592000" alt="">
    </div>
    <!-- 歌手 -->
    <p class='name'>周杰伦</p>
    <!-- 专辑图片 -->
    <div class='img'>
      <img :class="isPlay?'cd':'paused'" src="https://y.gtimg.cn/music/photo_new/T001R300x300M0000025NhlN2yWrP4.jpg?max_age=2592000" alt="">
    </div>
    <!-- 歌词 -->
    <!-- <Lyric :seekTime = 'seekTime' :play='play'></Lyric> -->
    <!-- 进度条 -->
    <MyProgress
    :startTime = 'start'
    :endTime = 'end'
    @trans-time="handleNewTime"
    ></MyProgress>
    <!-- 播放 -->
    <span>单曲循环</span>
    <button>上一曲</button>
    <button>播放</button>
    <span class="iconfont" >&#xe606;</span>

    <!-- 播放器 -->
    <audio 
      :src='songurl' 
      @canplay="canplay" 
      @timeupdate="timeupdate"
      ref="audio"
    ></audio>
  </div>
  <div class='small'>
    小屏
  </div>
  </div>
</template>

<script>
  import {getSongUrl} from '@/api/singer.js'
  import MyProgress from './Progress'
  export default {
    components:{MyProgress},
    data() {
      return {
        name: '演员',
        songurl:'',
        start:0, //音乐当前的播放时间
        end:0 //音乐总时长
      }
    },
    computed: {
      isPlay() { //从状态机提取标志音乐播放状态的布尔值
        return this.$store.state.player.isPlay 
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
    watch:{  
      isPlay(){//监听播放控制变量的变化，动态改变音乐播放状态
        console.log('监听到了isPlay的变化');
        let audio = this.$refs.audio;
        this.isPlay ? audio.play() : audio.pause()
      }
    },
    methods: {
      canplay() { //监听音频可以播放后，触发
        console.log('音乐可以播放了');
        let audio = this.$refs.audio;
        console.log(audio.currentTime,audio.duration);
        let {currentTime,duration} = audio
        this.start = currentTime;
        this.end = duration;
        audio.play()  //触发音乐播放
        this.$store.commit('player/isPlayMut',true)
      },
      timeupdate(){  //监听audio播放时间的变化
        let audio = this.$refs.audio;
        let {currentTime,duration} = audio
        this.start = currentTime;
      },
      handleNewTime(newTime){
        console.log(newTime);
        this.$refs.audio.currentTime = newTime;
      }
    },
  }
</script>

<style lang="less" scoped>
@import '../style/index.less';
.player{
  color: #fff;
  .big{
    position: fixed;
    top:0px;
    bottom: 0px;
    left:0;
    right:0;
    background: #222;
    .top{
      font-size: @fs-l;
      text-align: center
    }
    .name{
      font-size: @fs-s;
      text-align: center;
      padding: 10px;
    }
    .bg{
      position: absolute;
      z-index: -9;
      top: 0px;
      width: 100%;
      height: 100%;
      filter: blur(15px);
      img{
         width: 100%;
         height: 100%;
      }
    }
    .img{
    
      text-align: center;
      // background: red;
      .w(750);
      padding: 20px;
      box-sizing: border-box;
      img{
          width: 85%;
          border-radius:50%;
          border: 10px solid #ccc; 
          animation: rotate 10s linear infinite;
      }
      & .cd{
        animation-play-state: running;
      }
      & .paused{
        animation-play-state: paused;
      }
    }
  }
  .small{
    position: fixed;
    .w(750);
    bottom: 0px;
    height: 80px;
    background: lightgreen
  }
  @keyframes rotate {
    0% {
     transform: rotate(0deg)
    }
    100%{
      transform: rotate(360deg)
    }
  }
}  
.iconfont{
  color: @yellow;
  font-size: @fs-l;
}
</style>