<template>
  <div id="app">
    <h1>App.Vue</h1>
    <button id="helloBtn" @click="helloBtnClick">hello按钮</button>
    <a>{{ helloMsg }}</a>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      helloMsg: '',
    }
  },
  methods: {
    helloBtnClick() {
      fetch("/api/hello", {
        method: "get",
      }).then(res => {
        return res.json()
      })
        .then(res => this.helloMsg = JSON.stringify(res.content))
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#helloBtn {
  width: 100px;
  height: 60px;
}
</style>
