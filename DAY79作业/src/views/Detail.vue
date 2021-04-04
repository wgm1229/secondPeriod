<template>
    <div class="cont">
        商品详情页{{count}}
        <button @click="handlePlus">+</button><br>
        价格小于100的商品
        <div v-for="(item,index) in cartList" :key="index">
            {{item.title}},商品价格:{{item.price}}
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            count() {
                return this.$store.state.num 
            },
            cartList(){
                return this.$store.getters.filterCart
            }
        },
        methods: {
            handlePlus() {
                this.$store.commit('plus')
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