<template>
  <div id="main">
    <div id="helloQuery">
      <h1>  工资管理系统</h1>
      <button id="helloQueryBtn" @click="helloQueryBtnClick">查询</button>
      <a>{{ helloMsg }}</a>
    </div>

    <div id="helloAdd">
      <input placeholder="待插入文本" type="text" v-model="addMsg">
      <button id="helloAddBtn" @click="helloAddBtnClick">添加</button>
    </div>

    <div id="helloDelete">
      <input placeholder="待删除文本" type="text" v-model="deleteMsg">
      <button id="helloDeleteBtn" @click="helloDeleteBtnClick">删除</button>
    </div>

    <div id="helloUpdate">
      <input placeholder="修改前" type="text" v-model="updateOldMsg">
      <input placeholder="修改后" type="text" v-model="updateNewMsg">
      <button id="helloUpdateBtn" @click="helloUpdateBtnClick">修改</button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      helloMsg: '',
      addMsg: '',
      deleteMsg: '',
      updateOldMsg: '',
      updateNewMsg: '',
    }
  },
  methods: {
    helloQueryBtnClick() {
      fetch("/hello", {
        method: "get",
      }).then(res => {
        return res.json()
      })
        .then(res => this.helloMsg = JSON.stringify(res.content))
    },

    helloAddBtnClick() {
      if (this.addMsg === '') {
        alert("无法插入空值")
      } else {
        fetch('/hello/add?msg=' + this.addMsg, {
          method: 'get',
        }).then(this.helloQueryBtnClick)
      }
    },

    helloDeleteBtnClick() {
      fetch('/hello/delete?msg=' + this.deleteMsg, {
        method: 'get',
      }).then(this.helloQueryBtnClick)
    },

    helloUpdateBtnClick() {
      fetch('/hello/update?oldMsg=' + this.updateOldMsg + "&newMsg=" + this.updateNewMsg, {
        method: 'get',
      }).then(this.helloQueryBtnClick)
    }
  }
}

</script>

<style>
#helloQueryBtn {
  width: 100px;
  height: 60px;
}
</style>
