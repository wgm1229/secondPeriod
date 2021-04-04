<template>
  <div>
    <ul>
      <li>
        <router-link to="/home/6666/123">首页</router-link>
      </li>
      <li>
        <router-link to="/">Hello</router-link>
      </li>
      <li>
        <router-link to="/product">公司产品</router-link>
      </li>
      <li>
        <el-button type="danger" round>危险按钮</el-button>
      </li>
    </ul>
    
  </div>
</template>

<script>
  export default {
    
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