<template>
  <div id="app">
    <Home></Home>
    <Detail></Detail>
  </div>
</template>

<script>
import Home from '@/views/Home'
import Detail from '@/views/Detail'

export default {
  name: 'App',
  components: {
    Home,
    Detail
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
