<template>
  <div class="cont">
    项目首页{{count}}
    <button @click="handlePlus">+</button>
    <div v-for="(item,index) in fcart" :key="index">
      商品名称：{{item.title}},商品价格:{{item.price}}
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      count() {
        return this.$store.state.num  //获取状态机store中的state数据
      },
      fcart(){
        return this.$store.getters.filterCart //获取状态机store中的getters数据
      }
    },
    methods: {
      handlePlus() {
        this.$store.commit('plus')  //触发store状态机中的某个mutation
      }
    },
  }
</script>

<style scoped>
.cont{
  border: 4px solid #444;
  float: left;
  margin: 0 30px;
  width: 30%;
}
</style>