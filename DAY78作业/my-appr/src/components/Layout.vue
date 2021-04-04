<template>
<el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu @select="handleMenu" :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>导航一</template>
        <el-menu-item-group>
          
          <el-menu-item index="/hello">hello</el-menu-item>
          <el-menu-item index="/product">产品</el-menu-item>
        </el-menu-item-group>
        
      </el-submenu>
      
    </el-menu>
  </el-aside>
  
  <el-container>
    <router-view></router-view>
  </el-container>
</el-container>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
      methods: {
          handleMenu(path) {
              console.log(path)
              this.$router.push(path)
          }
      },
    }

</script>
