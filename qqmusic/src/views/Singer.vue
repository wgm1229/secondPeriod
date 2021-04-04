<template>
  <div>
    <div class="top-singer">
      <div class="item" v-for="(item,index) in slist" :key="index">
        <img :src="item.singer_pic" alt="">
        <h4>{{item.singer_name}}</h4>
      </div>
    </div>
  </div>
</template>

<script>
  import request from '../utils/request'
  export default {
    data() {
      return {
        slist: [] //歌手数据列表
      }
    },
    created () {
      request.get('/hehe/singer/list')
          .then(res=>{
            console.log(res);
            this.slist = res.data.data.list
          })
    },
  }
</script>

<style lang="less">
@import '../style/index.less';
.top-singer{
  display: flex;
  flex-wrap: wrap;
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
</style>