<template>
  <div class='player'>
  <!-- <audio src="http://m7.music.126.net/20201202122257/efeff7e7cd987c4645bfa06d379eefbc/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3"></audio> -->
  <div class='big'>
  <!-- 头部 -->
    <div class='top'> 
      <span>v</span>
      {{song.name}}
    </div>
    <!-- 背景 -->
    <div class='bg'>
      <img :src="`https://y.gtimg.cn/music/photo_new/T001R300x300M000${song.singer[0].mid}.jpg?max_age=2592000`" alt="">
    </div>
    <!-- 歌手 -->
    <p class='name'>{{song.singer[0].name}}</p>
    <!-- 专辑图片 -->
    <div class='img'>
      <img :class="isPlay?'cd':'paused'" :src="`https://y.gtimg.cn/music/photo_new/T001R300x300M000${song.singer[0].mid}.jpg?max_age=2592000`" alt="">
    </div>
    <!-- 歌词 -->
    <Lyric :songid="songid" :seektime="seekTime"></Lyric>
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
    <button @click="nextSong">下一曲</button>
    

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
  import MyProgress from '../components/Progress'
  import Lyric from '../components/Lyric'
  import songs from '../utils/songs'  //存放歌曲播放链接的模拟数据包
  export default {
    components:{MyProgress,Lyric},
    data() {
      return {
        name: '演员',
        songurl:'',
        start:0, //音乐当前的播放时间
        end:0, //音乐总时长
        songid:'',   //歌曲id
        seekTime:0  //存放歌曲当前的播放时间
      }
    },
    computed: {
      isPlay() { //从状态机提取标志音乐播放状态的布尔值
        return this.$store.state.player.isPlay 
      },
      song(){ 
        let {songlist,currentSong} = this.$store.state.player;
        return songlist[currentSong];  //提取正在播放的歌曲数据
      },
      currentSong(){
        return this.$store.state.player.currentSong
      }
    },
    created() {
      console.log('歌曲id',this.$route.params.id)
      console.log('歌曲列表1111',this.song)
      let {id} = this.$route.params
      // getSongUrl(id).then(res=>{   //【方法1】需要在线的服务器接口正常后使用
      //   console.log(res.data.data[id]);
      //   this.songurl = res.data.data[id]
      // })

      this.songurl = songs[id]  //【方法2】利用本地模拟数据包，代替在线播放接口
      this.songid = id;
    },
    watch:{  
      isPlay(){//监听播放控制变量的变化，动态改变音乐播放状态
        // console.log('监听到了isPlay的变化');
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
      handleNewTime(newTime){ //拖拽进度条的时候，换算出的当前播放时间
        console.log(newTime);
        this.$refs.audio.currentTime = newTime;
        this.seekTime = newTime;  //想歌词组件中传递最新的事件
      },
      nextSong(){
        let next = this.currentSong+1
        this.$store.commit('player/currentMut',next) //切换歌曲数据包
        this.songurl = songs[this.song.mid] //切换歌曲路径
      }
    },
  }
</script>

<style lang="less" scoped>
@import '../style/index.less';
.player{
  color: #fff;
  button{
    color: #444;
  }
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