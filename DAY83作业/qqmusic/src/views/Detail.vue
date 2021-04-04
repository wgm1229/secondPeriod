<template>
  <div>
    <van-nav-bar :title="name" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div class="top-img">
      <img
        :src="`https://y.gtimg.cn/music/photo_new/T001R300x300M000${mid}.jpg?max_age=2592000`"
        alt
      />
    </div>
    <van-tabs v-model="active">
      <van-tab title="歌曲">
        <div class="songs" ref="wrapper1">
          <div class="content">
            <ul>
              <li v-for="(item) in songList" :key="item.id">
                <router-link :to="'/player/'+item.mid">
                  <h4>{{item.name}}</h4>
                  <p>
                    <span v-for="(itm) in item.singer" :key="itm.id">{{itm.name}}</span>
                    .{{item.album.name}}
                  </p>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </van-tab>
      <van-tab title="介绍">
        <div class="introduce" ref="wrapper2">
          <div class="content">{{desc}}</div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getSongs, getDesc } from "../api/singer";
import BScroll from "@better-scroll/core";

export default {
  data() {
    return {
      active: 0,
      name: "",
      mid: "0025NhlN2yWrP4",
      songList: [],
      desc: "",
    };
  },
  methods: {
    handlePlayer(songmid) {
      this.$route.push("/player");
    },
  },
  created() {
    let { params } = this.$route;
    console.log(params);
    let { singer_name, singer_mid } = params.singer_mid
      ? params
      : (params = {
          singer_mid: "002J4UUk29y8BY",
          singer_name: "薛之谦",
        });
    this.name = params.singer_name;
    this.mid = params.singer_mid;

    getSongs(singer_mid).then((res) => {
      //   console.log(res);
      this.songList = res.data.data.list;
    });

    getDesc(singer_mid).then((res) => {
      //   console.log(res);
      this.desc = res.data.data.desc;
    });
  },
  updated() {
    console.log(this.$refs);
    let scroll1 = new BScroll(this.$refs.wrapper1, {
        click:true
    });
    let scroll2 = new BScroll(this.$refs.wrapper2, {});
  },
};
</script>

<style lang="less" scoped>
@import "../style/index.less";
* {
  margin: 0;
  padding: 0;
}

.top-img {
  width: 100%;
  height: 676 / @remSize;
  img {
    width: 100%;
    height: 100%;
  }
}
.songs {
  height: 600 / @remSize;
  overflow: hidden;
  li {
    height: 80 / @remSize;
    display: flex;
    flex-direction: column;
    padding: 22 / @remSize 28 / @remSize;
    background-color: #d8d8d8;
    h4 {
      font-size: 26 / @remSize;
      line-height: 26 / @remSize;
      margin-top: 14 / @remSize;
      margin-bottom: 13 / @remSize;
    }
    p {
      font-size: 19 / @remSize;
      line-height: 19 / @remSize;
    }
  }
}
.introduce {
  height: 600 / @remSize;
  overflow: hidden;
  padding: 25px;
  font-size: 25 / @remSize;
}
</style>