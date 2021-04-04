<template>
  <div>
    <!-- <ul>
      <li @click="handleProd('/product')">产品1</li>
    </ul>
    <ul>
      <li @click="handleProd('/product/prod2')">产品2</li>
    </ul>
    <ul>
      <li @click="handleProd('/product/prod3')">产品3</li>
    </ul> -->

    <ul>
      <li @click="handleProdByName('pro1')">产品1</li>
    </ul>
    <ul>
      <li @click="handleProdByName('pro2')">产品2</li>
    </ul>
    <ul>
      <li @click="handleProdByName('pro3')">产品3</li>
    </ul>
    <router-view></router-view>
    <router-view name="ad"></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    // handleProd(path) {
    //   this.$router.push(path);
    // },
    handleProdByName(name) {
      this.$router.push({
          name:name,
          params:{
              id:'123456'
          }
      });
    //   console.log(this.$route.params)
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
  display: inline-block;
  padding: 10px 30px;
  background: #d8d8d8;
}
</style>