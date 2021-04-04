<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div class="top-wrapper" ref="topwrapper">
      <div class="top-singer">
        <div class="item" v-for="(item,index) in hotList" :key="index" v-show="index<8">
          <img :src="item.singer_pic" alt />
          <p>{{item.singer_name}}</p>
        </div>
      </div>
    </div>

    <div class="cfy-wrapper" ref="cfywrapper">
      <div
        class="classify"
        v-for="(value, name, idx) in classifyList"
        :key="idx"
        v-show="name!=='index'"
      >
        <van-button
          size="mini"
          :round="true"
          :type="index==numArr[idx]?'primary':'default'"
          v-for="(item, index) in value"
          :key="index"
          @click="handleCfy(idx,index,item.id)"
        >{{item.name}}</van-button>
      </div>
    </div>

    <div class="singers">
      <div class="content">
        <ol>
          <li v-for="(item,index) in singerList" :key="index">
            <img :src="item.singer_pic" alt />
            <span>{{item.singer_name}}</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../utils/request";
import { getSingerList, getClassifyList } from "../api/singer";
import BScroll from "@better-scroll/core";
export default {
  data() {
    return {
      hotList: [],
      singerList: [],
      classifyList: [],
      numArr: [0, 0, 0, 0],
      idArr: [-100, -100, -100, -100],
    };
  },
  created() {
    getSingerList().then((res) => {
      this.singerList = res.data.data.list;
      this.hotList = res.data.data.list;
      //   console.log(this.singerList)
    });
    getClassifyList().then((res) => {
      this.classifyList = res.data.data;
      console.log(res);
    });
  },
  methods: {
    handleCfy(idx, index, id) {
      let numArr = this.numArr;
      let idArr = this.idArr;

      this.idArr[idx] = id;
      numArr[idx] = index;
      //   console.log(numArr)
      console.log(idArr);

      this.numArr = [...numArr];
      this.idArr = [...idArr];
      getSingerList(this.idArr[0], this.idArr[1], this.idArr[3]).then((res) => {
        this.singerList = res.data.data.list;
        // console.log(this.singerList)
      });
    },
  },
  mounted() {
    console.log(this.$refs.topwrapper);
    this.$refs.cfywrapper.children.forEach((item, index) => {
      if (index == 1) {
        let cfyScroll = new BScroll(item, {
          scrollX: true,
        });
      }
    });
    console.log(this.$refs.cfywrapper.children);
    let topScroll = new BScroll(this.$refs.topwrapper, {
      scrollX: true,
    });
    // let cfyScroll = new BScroll(this.$refs.cfywrapper.children, {
    //   scrollX: true,
    // });
  },
};
</script>

<style lang="less">
@import "../style/index.less";

.top-wrapper,.cfy-wrapper {
  width: 100%;
  overflow: hidden;
}

.top-singer {
  width: 200%;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 150 / @remSize;
    height: 220 / @remSize;
    // background-color: orange;
    margin-left: 25 / @remSize;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 6px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
    img {
      width: 90 / @remSize;
      height: 90 / @remSize;
      display: inline-block;
      border-radius: 50%;
      margin-top: 20 / @remSize;
      margin-bottom: 10 / @remSize;
    }
    p {
      font-size: 18 / @remSize;
    }
  }
}
.classify {
  padding: 10 / @remSize 20 / @remSize;
  width: 200%;
}
.singers {
  //   position: fixed;
  //   top:88px;
  //   bottom: 0px;
  //   left:0px;
  //   right: 0px;
  .quicklist {
    position: absolute;
    right: 10px;
    top: 40px;
    width: 20px;
    background: rgba(0, 0, 0, 0.3);
    font-size: @fs-xs;
    padding: 20px 0 20px;
    color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    text-align: center;
    ul {
      li {
        width: 20px;
        height: 18px;
      }
      .sel {
        color: @yellow;
      }
    }
  }
}
</style>
