<template>
  <div>
    <van-nav-bar title="歌手" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div class="top-singer">
      <div 
        class="item" 
        v-for="(item,index) in slist" 
        :key="index" 
        v-show="index<4"
      >
        <img :src="item.singer_pic" alt="">
        <h4>{{item.singer_name}}</h4>
      </div>
    </div>
    <div class="cfy">
      <van-button 
        size="mini" 
        :round="true" 
        v-for="(item,index) in cfydata.area" 
        :key="index" 
        :type="index==0?'primary':'default'" 
      >
        {{item.name}}
      </van-button>
      <!-- <van-button type="primary" size="mini" :round="true">港台</van-button> -->
    </div>
    <div class="cfy">
      <van-button 
        size="mini" 
        :round="true" 
        v-for="(item,index) in cfydata.genre" 
        :key="index"
        :type="index==0?'primary':'default'" 
      >
        {{item.name}}
      </van-button>
    </div>
    <div class="cfy">
      <van-button 
        size="mini" 
        :round="true" 
        v-for="(item,index) in cfydata.sex" 
        :key="index"
        :type="index==0?'primary':'default'" 
      >
        {{item.name}}
      </van-button>
    </div>
    <div class='singers'>
      <!-- 滚动的列表 -->
      <div class='wrapper' ref='singerWrapper'>
        <div class='content'>
            <ul>
              <li>  
                <ol>
                  <li>
                    <img src="../assets/logo.png" alt="">
                    <span>周杰伦</span>
                  </li>
                </ol>
              </li>
            </ul>
        </div>
      </div>
      
  </div>
  </div>
</template>

<script>
  import request from '../utils/request'
  export default {
    data() {
      return {
        slist: [], //歌手数据列表
        cfydata:{}  //存放歌手分类数据
      }
    },
    created () {
      request.get('/hehe/singer/list')
          .then(res=>{
            // console.log(res);
            this.slist = res.data.data.list
          })

      request.get('/hehe/singer/category')
             .then(res=>{
               console.log(res);
               this.cfydata = res.data.data
             })
    },
  }
</script>

<style lang="less">
@import '../style/index.less';
.top-singer{
  display: flex;
  flex-wrap: wrap;
  padding: 20/@remSize;
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