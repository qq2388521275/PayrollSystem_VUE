<template>
  <div id="app">
    <h3><router-link to="/test">test画面</router-link></h3>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{

    }
  },
  //实现跨域
  created() {
    // axios方式发送请求
    this.$axios.get("/api/hello").then(res=>{
      alert(res)
    })
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
</style>
