<template>
  <div>
    展示本公司所有热门产品，可以通过下面的菜单切换访问不同产品
    <!-- 通过路径的方式触发路由切换 -->
    <!-- <ul>
      <li @click="handleProd('/product')">
        产品1
      </li>
      <li @click="handleProd('/product/prod2')">
        产品2
      </li>
      <li @click="handleProd('/product/prod3')">
        产品3
      </li>
    </ul> -->
    <ul>
      <li @click="handleProdByName('pro1')">
        产品1
      </li>
      <li @click="handleProdByName('pro2')">
        产品2
      </li>
      <li @click="handleProdByName('pro3')">
        产品3
      </li>
    </ul>
    <!-- 这个router-view用来展示Product的子组件 -->
    <router-view></router-view>
    <!-- 下面的router-view展示命名视图的使用 -->
    <router-view name="ad"></router-view>
  </div>
</template>

<script>
  export default {
    methods: {
      // handleProd(target) {
      //   console.log(target);
      //   this.$router.push(target) //只需要切换路由
      // },
      handleProdByName(name) {
        console.log(name);
        this.$router.push({ //通过路由name跳转可传递params参数
          name:name,
          params:{
            id:'23333'
          }
        })
      }
    },
  }
</script>


<style scoped>
li{
  list-style: none;
  display: inline-block;
  padding: 10px 30px;
  background: #d8d8d8;
}
</style>