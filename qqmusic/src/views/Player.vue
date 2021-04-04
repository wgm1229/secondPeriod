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
      <img :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.album.mid}.jpg`" alt="">
    </div>
    <!-- 歌手 -->
    <p class='name'>{{song.singer[0].name}}</p>
    <!-- 专辑图片 -->
    <div class='img'>
      <img :class="isPlay?'cd':'paused'" :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.album.mid}.jpg`" alt="">
    </div>
    <!-- 歌词 -->
    <Lyric :songid="songid" :seektime="seekTime" :single="single"></Lyric>
    <!-- 进度条 -->
    <MyProgress
    :startTime = 'start'
    :endTime = 'end'
    @trans-time="handleNewTime"
    ></MyProgress>
    <!-- 播放 -->
    <div class="control">
      <!-- 控制播放模式 
          单曲循环  icon-16
          顺序播放  icon-17
          随机播放  icon-19
      -->
      <i class="iconfont sm" :class="loopObj.icon" @click="changeLoopFn"></i>
      <!-- 上一曲 -->
      <i class="iconfont icon-14 sm" @click="prevSong"></i>
      <!-- 播放暂停  icon-24暂停  icon-15播放-->
      <i class="iconfont" :class="`icon-${isPlay?15:24}`" @click="handlePlay"></i>
      <!-- 下一曲 -->
      <i class="iconfont icon-12 sm" @click="nextSong"></i>
      <!-- 划出歌曲列表 -->
      <i class="iconfont icon-25 sm"></i>
    </div>
    

    <!-- 播放器 -->
    <audio 
      :src='songurl' 
      @canplay="canplay" 
      @timeupdate="timeupdate" 
      @ended="ended"
      ref="audio"
    ></audio>
  </div>
  <!-- <div class='small'>
    小屏
  </div> -->
  </div>
</template>

<script>
  import {getSongUrl} from '@/api/singer.js'
  import MyProgress from '../components/Progress'
  import Lyric from '../components/Lyric'
  import songs from '../utils/songs'  //存放歌曲播放链接的模拟数据包
  import {mapMutations,mapGetters,mapState} from 'vuex'
  export default {
    components:{MyProgress,Lyric},
    data() {
      return {
        name: '演员',
        songurl:'',
        start:0, //音乐当前的播放时间
        end:0, //音乐总时长
        songid:'',   //歌曲id
        seekTime:0,  //存放歌曲当前的播放时间
        single:true  //存放单曲循环的布尔值
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
      },
      // loopObj(){  //普通方法提取getters
      //   return this.$store.getters['player/loopObj']
      // },
      ...mapGetters({  //通过辅助函数提取getters
        loopObj:'player/loopObj'
      }),
      // loop(){ //普通方法提取state
      //   return this.$store.state.player.loop
      // },
      ...mapState({  //通过辅助函数提取state
        loop:state=>state.player.loop
      })
    },
    created() {
      console.log('歌曲id',this.$route.params.id)
      console.log('歌曲列表1111',this.song)
      let {id} = this.$route.params
      getSongUrl(id).then(res=>{   //【方法1】需要在线的服务器接口正常后使用
        this.songurl = res.data.data[id]
      })

      // this.songurl = songs[id]  //【方法2】利用本地模拟数据包，代替在线播放接口
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
      ...mapMutations({
        changeLoopFn:'player/changeLoop'
      }),
      handlePlay(){ //控制歌曲播放暂停
        let bool = !this.isPlay;
        this.$store.commit('player/isPlayMut',bool)
      },
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
      ended(){   //当前歌曲播放完毕后
        console.log('播放结束')
        this.$store.commit('player/isPlayMut',false)
        let mid;
        switch (this.loop) { 
          case 0:
            this.$store.commit('player/isPlayMut',true)
            this.single = !this.single //改变单曲循环的布尔值
            mid = this.song.mid
            getSongUrl(mid).then(res=>{   //重新获取新的歌曲播放路径
              this.songurl = res.data.data[mid]
            })
            break;
          case 1:
            this.nextSong()
            break;
          case 2:
            let num = parseInt(Math.random()*10) //根据歌曲列表的总条数，生成一个范围内的随机数
            console.log('随机数',num);
            this.$store.commit('player/currentMut',num) //切换歌曲数据包
            mid = this.song.mid
            getSongUrl(mid).then(res=>{   //重新获取新的歌曲播放路径
              this.songurl = res.data.data[mid]
            })
            break;
          default:
            break;
        }
      },
      handleNewTime(newTime){ //拖拽进度条的时候，换算出的当前播放时间
        console.log(newTime);
        this.$refs.audio.currentTime = newTime;
        this.seekTime = newTime;  //想歌词组件中传递最新的事件
      },
      nextSong(){ //下一曲
        let next = this.currentSong+1
        this.$store.commit('player/currentMut',next) //切换歌曲数据包
        let {mid} = this.song
        getSongUrl(mid).then(res=>{   //重新获取新的歌曲播放路径
          this.songurl = res.data.data[mid]
        })
      },
      prevSong(){ //上一曲
        if(this.currentSong>0){
          let prve = this.currentSong-1
          this.$store.commit('player/currentMut',prve) //切换歌曲数据包
          let {mid} = this.song
          getSongUrl(mid).then(res=>{   //重新获取新的歌曲播放路径
            this.songurl = res.data.data[mid]
          })
        }
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
.control{
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  .iconfont{
    color: @yellow;
    font-size: 34px;
    margin: 0 10px;
  }
  .sm{
    font-size: 24px;
  }
}
</style>