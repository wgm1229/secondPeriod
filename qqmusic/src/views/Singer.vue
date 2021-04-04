<template>
  <div>
    <van-nav-bar title="歌手" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div class="top-wrapper" ref="topwrapper">
      <div class="top-singer">
        <div 
          class="item" 
          v-for="(item,index) in hotlist" 
          :key="index" 
          v-show="index<10"
        >
          <img :src="item.singer_pic" alt="">
          <h4>{{item.singer_name}}</h4>
        </div>
      </div>
    </div>
    <div 
      class="cfy" 
      v-for="(value,name,idx) in cfydata" 
      :key="name" 
      v-show="name!='index'"
    >
      <van-button 
        size="mini" 
        :round="true" 
        v-for="(item,index) in value" 
        :key="index" 
        :type="index==numArr[idx]?'primary':'default'" 
        @click="handleCfy(idx,index,item.id)" 
      >
        {{item.name}}
      </van-button>
      <!-- <van-button type="primary" size="mini" :round="true">港台</van-button> -->
    </div>
    <div class='singers'>
      <!-- 滚动的列表 -->
      <div class='wrapper' ref='singerWrapper'>
        <div class='content'>
            <ol>
              <li v-for="(item,index) in slist" :key="index">
                <img :src="item.singer_pic" alt="">
                <span>{{item.singer_name}}</span>
              </li>
            </ol>
        </div>
      </div>
      
  </div>
  </div>
</template>

<script>
  import request from '../utils/request'
  import {getSingerList,getCfyList} from '../api/singer.js'
  import BScroll from '@better-scroll/core'
  export default {
    data() {
      return {
        slist: [], //歌手数据列表
        hotlist:[], //顶部热门歌手
        cfydata:{},  //存放歌手分类数据
        numArr:[0,0,0,0], //记录四个不同分类的被激活序号
        idArr:[-100,-100,-100,-100] // 记录当前被点击分类的id
      }
    },
    created () {
      getSingerList().then(res=>{ //加载歌手数据
        this.slist = res.data.data.list
        this.hotlist = res.data.data.list
      })

      getCfyList().then(res=>{ //加载分类数据
        this.cfydata = res.data.data
      }) 
    },
    mounted() {
      console.log(this.$refs);
      let scroll = new BScroll(this.$refs.topwrapper,{
        scrollX:true
      })
    },
    methods: {
      handleCfy(idx,index,id) {
        //idx 是四个主分类的下标
        // index 是讴歌主分类下的，具体某个按钮的下标
        let numArr = this.numArr;
        let idArr = this.idArr;
        numArr[idx] = index;
        idArr[idx] = id;
        console.log(idArr);
        // this.numArr = numArr; //视图无法更新，由于对象引用的原因，导致vue没有发现numArr的内部变化
        // console.log(numArr,...numArr); //对比拓展运算符处理前后的数组形态变化
        this.numArr = [...numArr]; //ES6拓展运算符，将一个集合展开为一堆内容
        this.idArr = [...idArr];
        getSingerList(idArr[0],idArr[1],idArr[3]).then(res=>{ //携带新的条件，发起新的请求
          this.slist = res.data.data.list
        })
      }
    },
  }
</script>

<style lang="less">
@import '../style/index.less';
.top-wrapper{
  width: 100%;
  overflow: hidden;
  // border:1px solid red;
}
.top-singer{
  display: flex;
  flex-wrap: wrap;
  padding: 20/@remSize;
  .w(1900);
  .item{
    height: 220/@remSize;
    width: 150/@remSize;
    margin-right: 25/@remSize;
    // background: orange;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 6px;
    box-shadow: 0 0 10px 2px rgba(0,0,0,0.2);
    img{
      height: 90/@remSize;
      width: 90/@remSize;
      border-radius: 50%;
      margin-top: 20/@remSize;
      background: #d8d8d8;
    }
    h4{
      font-size: 18/@remSize;
    }
  }
}
.cfy{
  padding:10/@remSize 20/@remSize;
}
.singers{
  // position: fixed;
  // top:88px;
  // bottom: 0px;
  // left:0px;
  // right: 0px;
  .quicklist{
    position: absolute;
    right: 10px;
    top:40px;
    width: 20px;
    background: rgba(0,0,0,.3);
    font-Size:@fs-xs;
    padding: 20px 0 20px;
    color:rgba(255,255,255,.5);
    border-radius:10px; 
    text-align: center;
    ul{
      li{
        width: 20px;
        height: 18px;
      }
      .sel{
        color: @yellow;
      }
    }
  }
  .wrapper{
    height: 100%;  
    // background: red;
    overflow: hidden;
    .content{
      .w(750);
      h3{
        height: 30px;
        line-height: 30px;
        background: #333;
        color:rgba(255,255,255,0.5);
        font-size: @fs-s;
        padding-left:20px;
      }
      ol{
        li{
          .w(750);
          height: 70px;
          box-sizing: border-box;
          padding: 20px 0px 0px 30px;
          display: flex;
          align-items: center;
          img{
            width: 50px;
            height: 50px;
            border-radius:25px; 
          }
          span{
            padding-left:20px; 
            display: inline-block;
            height: 50px;
            line-height: 50px;
            font-size: @fs-s;
          }
        }
      }
    }
    }
}
</style>