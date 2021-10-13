<template>

  <el-container class="main">
    <el-aside>
      <el-menu
        class="el-menu-vertical"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router="false"
      >
        <el-menu-item index="1" route="/Sheet">
          <i class="el-icon-finished"></i>
          <span slot="title">考勤卡</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/employee/add"><i class="el-icon-circle-plus-outline"></i>添加员工</el-menu-item>
            <el-menu-item index="/employee/query"><i class="el-icon-search"></i>查询员工信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>销售账单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/order/add"><i class="el-icon-circle-plus-outline"></i>添加订单</el-menu-item>
            <el-menu-item index="/order/query"><i class="el-icon-search"></i>查询订单</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4" route="/payroll">
          <i class="el-icon-wallet"></i>
          <span slot="title">工资条</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>

</template>

<script>
export default {
  name: "Main",
  methods: {}
}
</script>

<style scoped>

.el-aside {
  /*background-color: #D3DCE6;*/
  color: #333;
  width: 20%;
}

.el-main {
  /*background-color: #E9EEF3;*/
}

.el-menu {
  height: 94%;
  min-height: 900px;
  padding-top: 10%;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
