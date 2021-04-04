<template>
    <div class="cont">
        商品首页{{count}}
        <button @click="handleReduce">-</button><br>
        购物车中的所有商品
        <br>
        <button @click="handleAddCart">向购物车中添加商品</button>
        <button @click="handleAddCartDelay">延迟向购物车中添加商品</button>
        <div v-for="(item,index) in cartList" :key="index">
            {{item.title}},商品价格:{{item.price}}
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            count() {
                return this.$store.state.count.num 
            },
            cartList(){
                return this.$store.state.cartModel.cart
            }
        },
        methods: {
            handleReduce() {
                this.$store.commit('count/reduce')
            },
            makeGood(){
                let price = parseInt(Math.random()*100) + 50
                return {
                    title:`价格为${price}的商品`,
                    price:price
                }
            },
            handleAddCart(){
                let goods = this.makeGood()
                this.$store.commit('cartModel/addCartList', goods)
            },
            handleAddCartDelay(){
                let goods = this.makeGood()
                this.$store.dispatch('cartModel/addCartDelay', goods)
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