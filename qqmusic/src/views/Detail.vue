<template>
  <div class='detail'>
    <!-- 头部导航 -->
     <!-- <div class='top'>
       <span>back</span>
       <span>周杰伦</span>
     </div> -->
     <van-nav-bar :title="name" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
     <!-- 头像 -->
     <div class='avator' 
     :style="{'background-image':`url(https://y.gtimg.cn/music/photo_new/T001R300x300M000${mid}.jpg?max_age=2592000)`}" 
     ref='img'
     >
       <!-- <div class='shadow'></div> -->
     </div>
     <!-- 歌曲列表 -->
     <van-tabs v-model="active" @click="handleTab">
      <van-tab title="歌曲"></van-tab>
      <van-tab title="关于"></van-tab>
    </van-tabs>
     <div class='songlist' ref='wrapper1' v-show="active==0">
        <div class='content'>
          <ul>
            <li 
              v-for='(item) in songlist' 
              :key='item.id' 
            >
               <router-link :to="'/player/'+item.mid">
                 <h2>{{item.name}}</h2>
               <p>
                 <span v-for="itm in item.singer" :key="itm.id">
                   {{itm.name}}
                 </span>
                 ·
                 {{item.album.name}}
               </p>
               </router-link>
            </li>
          </ul>
        </div>
     </div>
     <div class='songlist' ref='wrapper2' v-show="active==1">
        <div class='content'>
          {{desc}}
        </div>
     </div>
  </div>
</template>
<script>
import {getSongs,getDesc} from '@/api/singer.js'
import BScroll from '@better-scroll/core'
export default {
  data() {
    return {
      name: '', //存放歌手名称
      mid:'', //存放歌手mid
      songlist:[],  //歌曲列表
      active:0,
      desc:''  //存放歌手介绍
    }
  },
  created() {
    console.log(this.$route)
    let {params} = this.$route
    let {singer_mid,singer_name} = params.singer_mid ? params : {
      singer_mid:'002J4UUk29y8BY',
      singer_name:'薛之谦'
    }
    this.name = singer_name
    this.mid = singer_mid

    // 根据singer_mid获取歌手的热门歌曲
    getSongs(singer_mid).then(res=>{
      // console.log(res);
      this.songlist = res.data.data.list
      
    })

    // 根据singer_mid获取歌手的介绍
    getDesc(singer_mid).then(res=>{
      console.log(res);
      this.desc = res.data.data.desc
    })
  },
  updated() {
    // console.log('Detail组件的mounted',this.$refs);
    let scroll1 = new BScroll(this.$refs.wrapper1,{
      click:true
    }) //歌曲滑动容器
    let scroll2 = new BScroll(this.$refs.wrapper2)
  },
  methods: {
    handleTab() {
      console.log(this.active);
      
    },
    handlePlayer(songmid){
      console.log(songmid);
      
      // this.$router.push('/player')
    }
  },
}
</script>
<style lang="less" scoped>
@import '../style/index.less';
.detail{
  position: fixed;
  top: 0px;
  bottom: 0px;
  // background: #222;
  left:0px;
  right: 0px;
  // 头部
  .top{
    height: 40px;
    color: #fff;
    position: absolute;
    top:0;
    z-index: 3;
    background: red;
    width: 100%;
  }
  // 头像
  .avator{
    .w(750);
    padding-top: 70%;
    background-size:cover; 
    position: absolute;
    top: 0px;
    z-index: -1;
    .shadow{
      position: absolute;
      top: 0;
      background: rgba(7,17,27,0.3);
      width: 100%;
      height: 100%;
    }
  }
  // 歌曲列表
  .songlist{
   position: fixed;
  //  background: #222;
   overflow: hidden;
   top:270px;
   bottom: 0px;
   left:0;
   right: 0;
   .content{
     padding: 10px 30px;
    //  background: #222;
     li{
       font-size: @fs-s;
      //  color: #fff;
       height: 61px;
       h2{
        height: 20px;
        font-size: @fs-l
       }
       p{
        margin-top:3px; 
        height:20px ;
       }
     }
   }
  }
}
</style>