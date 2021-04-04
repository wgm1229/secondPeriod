<template>
  <div class="player">
    <!-- <audio src="http://m7.music.126.net/20201202122257/efeff7e7cd987c4645bfa06d379eefbc/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3"></audio> -->
    <div class="big">
      <!-- 头部 -->
      <div class="top">
        <!-- <span>v</span> -->
        {{song.name}}
      </div>
      <!-- 背景 -->
      <div class="bg">
        <img :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.album.mid}.jpg`" alt />
      </div>
      <!-- 歌手 -->
      <p class="name">{{song.singer[0].name}}</p>
      <!-- 专辑图片 -->
      <div class="img">
        <img
          :class="isPlay?'cd':'paused'"
          :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.album.mid}.jpg`"
          alt
        />
      </div>
      <!-- 歌词 -->
      <Lyric class="lyric" :songid="songid" :seektime="seekTime" :single="single"></Lyric>
      <!-- 进度条 -->
      <Progress :startTime="start" :endTime="end" @trans-time="handleNewTime"></Progress>
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
        <i class="iconfont icon-15 sm" :class="`icon-${isPlay?15:24}`" @click="handlePlay"></i>
        <!-- 下一曲 -->
        <i class="iconfont icon-12 sm" @click="nextSong"></i>
        <!-- 划出歌曲列表 -->
        <i class="iconfont icon-25 sm"></i>
      </div>
      <!-- <span>单曲循环</span>
      <button>上一曲</button>
      <button>播放</button>
      <button @click="nextSong">下一曲</button>-->

      <!-- 播放器 -->
      <audio :src="songurl" @canplay="canplay" @timeupdate="timeupdate" @ended="ended" ref="audio"></audio>
    </div>
    <!-- <div class="small">小屏</div> -->
  </div>
</template>

<script>
import { getSongUrl } from "../api/singer";
import Progress from "@/components/Progress/index";
import Lyric from "@/components/Lyric";
import songurlList from "../utils/songs";
import { mapMutations, mapState, mapGetters } from "vuex";
export default {
  components: {
    Progress,
    Lyric,
  },
  data() {
    return {
      name: "演员",
      songurl: "",
      start: 0,
      end: 0,
      songid: "",
      seekTime: 0,
      single:false
    };
  },
  computed: {
    isPlay() {
      return this.$store.state.player.isPlay;
    },
    song() {
      let { songlist, currentSong } = this.$store.state.player;
      // console.log(songlist[currentSong])
      return songlist[currentSong];
    },
    currentSong() {
      return this.$store.state.player.currentSong;
    },
    ...mapGetters({
      loopObj: "player/loopObj",
    }),
    ...mapState({
      loop: (state) => state.player.loop,
    }),
  },
  created() {
    let { id } = this.$route.params;
    // console.log('歌曲id',id);
    this.getSongUrlFn(id);
    // getSongUrl(id).then((res) => {
    //   console.log(res.data.data[id]);
    //   this.songurl = res.data.data[id];
    // });
    this.$store.commit("player/isPlayMut", true);
    this.songid = id;
  },

  watch: {
    isPlay(newPlay) {
      // console.log('监听到了isPlay的变化',newPlay)
      let audio = this.$refs.audio;
      this.isPlay ? audio.play() : audio.pause();
    },
  },
  methods: {
    ...mapMutations({
      changeLoopFn: "player/loopMut",
      changeIsPlay: "player/isPlayMut",
      changeCurrent: "player/currentMut",
    }),
    getSongUrlFn(mid) {
      getSongUrl(mid).then((res) => {
        this.songurl = res.data.data[mid];
      });
    },
    canplay() {
      console.log("音乐可以播放了");
      let audio = this.$refs.audio;
      // console.log(audio.currentTime,audio.duration)
      let { currentTime, duration } = audio;
      this.start = currentTime;
      this.end = duration;
      audio.play();
    },
    timeupdate() {
      let audio = this.$refs.audio;
      let { currentTime, duration } = audio;
      this.start = currentTime;
      // console.log(this.start)
    },
    handleNewTime(newTime) {
      // console.log(newTime)
      this.$refs.audio.currentTime = newTime;
      this.seekTime = newTime;
    },
    prevSong() {
      this.$store.commit("player/currentMut", this.currentSong - 1);
      let { mid } = this.song;
      this.getSongUrlFn(mid);
    },
    nextSong() {
      this.$store.commit("player/currentMut", this.currentSong + 1);
      let { mid } = this.song;
      this.getSongUrlFn(mid);
    },
    handlePlay() {
      let bool = !this.isPlay;
      this.$store.commit("player/isPlayMut", bool);
    },
    ended() {
      console.log("播放结束");
      this.changeIsPlay(false);
      let mid;
      switch (this.loop) {
        case 0:
          console.log("单曲播放");
          this.changeIsPlay(true);

          this.single = !this.single
          mid = this.song.mid;
          this.getSongUrlFn(mid);
          this.$refs.audio.play();
          break;
        case 1:
          this.nextSong();
          break;
        case 2:
          let num = parseInt(Math.random() * 19);
          this.changeCurrent(num);
          mid = this.song.mid;
          this.getSongUrlFn(mid);
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../style/index.less";
.player {
  color: #fff;
  button {
    color: #000;
  }
  .big {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    background: #222;
    .top {
      font-size: @fs-l;
      text-align: center;
    }
    .name {
      font-size: @fs-s;
      text-align: center;
      padding: 10px;
    }
    .bg {
      position: absolute;
      z-index: -9;
      top: 0px;
      width: 100%;
      height: 100%;
      filter: blur(15px);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .img {
      text-align: center;
      // background: red;
      .w(750);
      padding: 20px;
      box-sizing: border-box;
      img {
        width: 85%;
        border-radius: 50%;
        border: 10px solid #ccc;
        animation: rotate 10s linear infinite;
      }
      & .cd {
        animation-play-state: running;
      }
      & .paused {
        animation-play-state: paused;
      }
    }
  }
  .small {
    position: fixed;
    .w(750);
    bottom: 0px;
    height: 80px;
    background: lightgreen;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
.iconfont {
  color: @yellow;
  font-size: @fs-l;
}
.control {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  .iconfont {
    color: @yellow;
    font-size: 34px;
    margin: 0 10px;
  }
  .sm {
    font-size: 24px;
  }
}
.lyric {
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: center;
  margin-bottom: 30 / @remSize;
}
</style>