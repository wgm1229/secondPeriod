<template>
  <div class='progress' >
      <span>{{startTime | filterTime}}</span>
     <div class='wrapper' 
      ref='wrapper' 
      @touchstart="handleStart" 
      @touchmove="handleMove" 
      @touchend="handleEnd" 
      >
       <div class='content' ref='content'>
         <div class='dot' ref='dot'>
       </div>
         <div class='red'>
         </div>
       </div>
     </div>
     <span>{{endTime | filterTime}}</span>
     <!-- <button @click='jump'>跳转</button> -->
  </div>
</template>
<script>
export default {
  props:{
    startTime:{type:Number,default:0},
    endTime:{type:Number,default:0},    
  },
  data() {
    return {
      percent:0   //记录进度条百分比
    }
  },
  watch:{
    startTime(){ //监听播放时间的变化，同步修改进度条宽度
      let percent = (this.startTime / this.endTime)*100
      this.$refs.content.style.width = `${percent}%`
    }
  },
  methods: {
    handleStart(e) {
      console.log(e);
      this.$store.commit('player/isPlayMut',false)  //按下进度条，暂停播放
      e.preventDefault();
    },
    handleMove(e) {
      // console.log(e);
      //提取wrapper的横轴偏移量
      let wrapper = this.$refs.wrapper;
      let offsetX = wrapper.getBoundingClientRect().left; //获取wrapper的偏移量
      let max = wrapper.getBoundingClientRect().width;
      let {clientX} = e.targetTouches[0]
      let distance = clientX - offsetX; //鼠标指针，相对于wrapper左端点的距离
      if(distance<=max&&distance>0){
        let percent = (distance / max)*100
        this.percent = percent;  //每次拽进度条，实时记录百分比
        this.$refs.content.style.width = `${percent}%`
      }
    },
    handleEnd(e) {
      this.$store.commit('player/isPlayMut',true)  //手指从进度条抬起，开启播放
      let {percent,endTime} = this;
      let t = percent*endTime/100;
      console.log('新的播放时间',t);
      this.$emit('trans-time',t)  //手指抬起的时候，想父级传递最新播放时间
    }
  },
  filters:{ //组件局部过滤器
    'filterTime':(value)=>{
      let time = parseInt(value); //秒为单位的时间
      let m = parseInt(time/60)
      let s = time % 60
      m = m<9 ? `0${m}` : m;
      s = s<9 ? `0${s}` : s;
      return m+':'+s   // 6:06
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.progress{
  .w(750);
  height: 30px;
  // background: red;
  display: flex;
  font-size: @fs-s;
  align-items: center;
  justify-content: center;
  span{
    display: inline-block;
    // background: red;
    width: 30px;
  }
  .wrapper{
    margin: 0px 10px;
    .w(700);
    height: 4px;
    background: rgba(0,0,0,.3);
    position: relative;
    .content{
      height: 4px;
      width: 0%;
      background: @yellow;
      position: relative;
    }
    .dot{
      width: 16px;
      height: 16px;
      background: #fff;
      border-radius:50%; 
      position: absolute;
      top: -6px;
      right: -8px;
      .red{
        position: absolute;
        top:2px;
        left:2px;
        height: 12px;
        width: 12px;
        background: @yellow;
        border-radius:50%;
      }
    }
  }
}
</style>