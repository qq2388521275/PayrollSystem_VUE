<template>
  <div id="main">

    <div id="title">
      <h1>登录系统</h1>
    </div>

    <div id="userInput">
      <div id="userName_Input">
        <input placeholder="用户名" type="text" v-model="userName">
      </div>
      <div id="helloDelete_Input">
        <input placeholder="密码" type="password" v-model="password">
      </div>
    </div>

    <div id="login">
      <button id="loginBtn" @click="loginBtnClick">登录</button>
    </div>

  </div>

</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      userName: '',
      password: '',
    }
  },
  methods: {
    loginBtnClick() {
      fetch('/login?uid=' + this.userName + "&ans=" + this.password, {
        method: 'get',
      }).then(res => res.json())
        .then(res => this.checkLogin(res));
    },
    checkLogin(res) {
      if (JSON.stringify(res.status) === '200'){
        this.$cookies.set('userName', this.userName);
        this.$router.push('/Sheet');
      }
      else {
        alert(JSON.stringify(res.content));
      }
    }
  }
}
</script>

<style>
#main {
  position: fixed;
  text-align: center;
}

#userInput {
  display: inline-block;
}

#login {
  display: inline-block;
}

#loginBtn {
  width: 100px;
  height: 60px;
}
</style>
