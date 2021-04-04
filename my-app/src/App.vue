<template>
  <div id="app">
    <!-- <My /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Cart />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import My from './components/My.vue'
import Cart from './views/Cart'

export default {
  name: 'App',
  components: {
    HelloWorld,
    My,
    Cart
  }
}
</script>

<style lang="less">

</style>
