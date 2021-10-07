<template>

  <div id="main">

    <div id="sidebar">
      <div id="logo" style="margin-top: 4%;margin-left: 4%;width: 92%;height: 7%;font-size: 35px">
        <img src="../assets/logo.png" alt="logo" style="width: 28%;height: 100%">
        <b>工资管理</b>
      </div>
      <div id="sideHrefs" style="margin-top: 10%;margin-left: 8%;height: 80%;width: 84%;padding: 5%">
        <button id="loginBtn" style="width: 70%;height: 10%;font-size: 20px" @click="jumpToSheet">考勤卡管理</button>
      </div>
    </div>

    <div id="rightPage">
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
export default {
  name: "Main",
  methods: {
    jumpToSheet() {
      this.$router.push('/Sheet');
    },
  }
}
</script>

<style scoped>

#main {
  width: 100%;
  height: 100%;
}

#sidebar {
  height: 1000px;
  min-width: 15%;
  max-width: 15%;
  float: left;
  background: #EFEFBB;
  background: -webkit-linear-gradient(to top, #D4D3DD, #EFEFBB);
  background: linear-gradient(to top, #D4D3DD, #EFEFBB);
  overflow: hidden;
}

#rightPage {
  height: 1000px;
  width: 85%;
  float: left;
}

</style>
