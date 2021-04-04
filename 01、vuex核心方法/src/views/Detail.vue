<template>
  <div class="cont">
    商品详情页{{count}}
    <button @click="handleMinu">-</button>
    <div>
      <button @click="handleAddCart">向cart购物车中新增商品</button>
      <button @click="handleAddDelay">异步action延迟向cart新增商品</button>
    </div>
    <div>
      <h3>cart中所有数据</h3>
      <p v-for="(item,index) in cart" :key="index">
        商品名称：{{item.title}},商品价格:{{item.price}}
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      count() {
        return this.$store.state.num 
      },
      cart() {
        return this.$store.state.cart 
      },
    },
    methods: {
      handleMinu() {
        this.$store.commit('minu')
      },
      makeGood(){ //生成随机商品的方法
        let price = Math.floor(Math.random()*100)+50;
        return {
          title:`价格为${price}的商品`,
          price:price
        }
      },
      handleAddCart(){ //向cart数据中，随机新增价格在50~150之间的商品
        let goods = this.makeGood()
        this.$store.commit('addCartMut',goods)
      },
      handleAddDelay(){
        let goods = this.makeGood()
        this.$store.dispatch('addCartAct',goods)
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