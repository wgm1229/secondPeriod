<template>
  <div id="app">
    <!-- 展示路由路径所匹配到的对应组件 -->
    <Nav/>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
export default {
  name: 'App',
  components:{
    Nav
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
