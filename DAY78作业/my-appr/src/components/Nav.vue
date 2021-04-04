<template>
  <div>
    <ul>
      <li>
        <router-link to="/home/6666/张三">home页面</router-link>
      </li>
      <li>
        <router-link to="/">hello页面</router-link>
      </li>
      <li>
        <router-link to="/product">公司产品</router-link>
      </li>
    </ul>
    <el-button type="danger" plain>危险按钮</el-button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
li {
  list-style: none;
  display: inline-block;
  padding: 10px 30px;
  background: #d8d8d8;
}
</style>