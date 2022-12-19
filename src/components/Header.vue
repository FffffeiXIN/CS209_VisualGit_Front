<template>
  <div style="float: left;" class="nav">
    <el-menu
      mode="horizontal"
      :ellipsis="false"
      text-color="#000000"
      active-text-color="#3989fa">
      <el-menu-item index="1">
        <router-link to="/getDevelopers">Developers</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/getIssues">Issues</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/Releases">Releases $ Commits</router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.el-menu.el-menu--horizontal {

  float: left;
  margin-left: 50px;
  background: transparent;
}

.el-menu--horizontal > .el-menu-item.is-active {
  /* border-bottom: 2px solid #3989fa;
  color: #3989fa; */
  font-weight: bold;
}

.el-menu--horizontal > .el-menu-item {
  font-size: 16px;
  margin: 0 15px;
}
</style>
