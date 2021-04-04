<template>
  <div>
    项目首页{{$route.params.id}}
  </div>
</template>

<script>
  export default {
    created () {
      let params = this.$route.params
      console.log('路由参数',params);
      
    },
  }
</script>

<style lang="scss" scoped>

</style>