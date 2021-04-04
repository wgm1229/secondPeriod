<template>
  <div>
    <div class="lyric">{{text}}</div>
  </div>
</template>

<script>
import { getLyric } from "../api/singer";
import Lyric from "lyric-parser";
import { mapState } from "vuex";

export default {
  props: ["songid", "seektime",'single'],
  data() {
    return {
      text: "暂无歌词",
    };
  },
  computed: {
    ...mapState({
      isPlay: (state) => state.player.isPlay,
      currentSong: (state) => state.player.currentSong,
      songlist: (state) => state.player.songlist,
    }),
    song() {
      return this.songlist[this.currentSong];
    },
  },
  watch: {
    seektime(newTime, oldTime) {
      if (!this.lyric) {
        return false;
      }
      this.lyric.seek(newTime * 1000);
    },
    isPlay(newPlay) {
      console.log("歌词播放状态", newPlay);
      // console.log("this.lyric", this.lyric);
      if (!this.lyric) {
        return false;
      }
      if (newPlay) {
        this.lyric.play(this.seektime * 1000);
      } else {
        this.lyric.stop();
      }
    },
    currentSong() {
      let { mid } = this.song;
      this.getLyricFn(mid);
    },
    single(){
      console.log('single发生了变化')
      this.getLyricFn(this.songid);
    }
  },
  mounted() {
    // getLyric(this.songid).then((res) => {
    //   let lrc = res.data.data.lyric;
    //   this.lyric = new Lyric(lrc, (obj) => {
    //     this.text = obj.txt;
    //   });
    //   this.lyric.play();
    // });
    this.getLyricFn(this.songid);
  },
  methods: {
    getLyricFn(songid) {
      getLyric(songid).then((res) => {
        let lrc = res.data.data.lyric;
        this.lyric = new Lyric(lrc, (obj) => {
          this.text = obj.txt;
          console.log(this.text)
        });
        this.lyric.play();
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>