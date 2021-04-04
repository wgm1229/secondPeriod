<template>
  <div>
    <div class="progress">
      <span>{{startTime | filterTime}}</span>
      <div
        class="wrapper"
        ref="wrapper"
        @touchstart="handleStart"
        @touchmove="handleMove"
        @touchend="handleEnd"
      >
        <div class="content" ref="content">
          <div class="dot" ref="dot"></div>
          <div class="red"></div>
        </div>
      </div>
      <span>{{endTime | filterTime}}</span>
      <!-- <button @click='jump'>跳转</button> -->
    </div>
  </div>
</template>

<script>
export default {
    props: {
        startTime: {
            type: Number,
            default: 0
        },
        endTime: {
            type: Number,
            default: 0
        },
    },
    data() {
        return {
            percent:0
        }
    },
    watch: {
        startTime() {
            let percent = (this.startTime/this.endTime)*100
            // console.log(this.$refs.content)
            this.$refs.content.style.width = `${percent}%`
        }
    },
    methods: {
        handleStart(e) {
            console.log('按下进度条')
            // console.log(e)
            this.$store.commit('player/isPlayMut',false)
            // e.preventDefault()
        },
        handleMove(e){
            let wrapper = this.$refs.wrapper
            let offsetX = wrapper.getBoundingClientRect().left;
            let width = wrapper.getBoundingClientRect().width
            let {clientX} = e.targetTouches[0]
            let distance = clientX - offsetX
            if(distance<=width&&distance>0){
                let percent = (distance/width)*100
                this.percent = percent;
                this.$refs.content.style.width = `${percent}%`
                // console.log(this.$refs.content.style.width)
            }
        },
        handleEnd(){
            this.$store.commit('player/isPlayMut', true)
            let {percent,endTime} = this
            let newTime = percent*endTime/100
            this.$emit('trans-time',newTime)
        }
    },
    filters: {
        'filterTime': function(value) {
            let time = parseInt(value)
            let minute = parseInt(time/60)
            let seconds = time%60
            minute = minute<9 ? `0${minute}` : minute
            seconds = seconds<9 ? `0${seconds}` : seconds
            return minute + ':' + seconds;
        }
    }
};
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
      width: 50%;
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