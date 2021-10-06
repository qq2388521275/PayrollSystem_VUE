<template>
  <div id="main">

    <div id="title">
      <h1>{{this.$cookies.get('userName')}}考勤卡</h1>
    </div>

    <div id="timeCards">
      <table style="width: 100%;text-align: center">
        <thead>
        <tr>
          <th></th>
          <th>上班时间</th>
          <th>下班时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>周一</td>
          <td><input placeholder="上班时间" type="time" v-model="cards.Mon.start"></td>
          <td><input placeholder="下班时间" type="time" v-model="cards.Mon.end"></td>
          <td>
            <button id="loginBtn" @click="loginBtnClick">提交</button>
          </td>
        </tr>
        <tr>
          <td>周二</td>
          <td><input placeholder="上班时间" type="time" v-model="cards.Tue.start"></td>
          <td><input placeholder="下班时间" type="time" v-model="cards.Tue.end"></td>
          <td>
            <button id="loginBtn" @click="loginBtnClick">提交</button>
          </td>
        </tr>
        <tr>
          <td>周三</td>
          <td><input placeholder="上班时间" type="time" v-model="cards.Wed.start"></td>
          <td><input placeholder="下班时间" type="time" v-model="cards.Wed.end"></td>
          <td>
            <button id="loginBtn" @click="loginBtnClick">提交</button>
          </td>
        </tr>
        <tr>
          <td>周四</td>
          <td><input placeholder="上班时间" type="time" v-model="cards.Thu.start"></td>
          <td><input placeholder="下班时间" type="time" v-model="cards.Thu.end"></td>
          <td>
            <button id="loginBtn" @click="loginBtnClick">提交</button>
          </td>
        </tr>
        <tr>
          <td>周五</td>
          <td><input placeholder="上班时间" type="time" v-model="cards.Fri.start"></td>
          <td><input placeholder="下班时间" type="time" v-model="cards.Fri.end"></td>
          <td>
            <button id="loginBtn" @click="loginBtnClick">提交</button>
          </td>
        </tr>
        </tbody>
      </table>

      <div id="saveCards">
        <button id="saveCardsBtn" @click="jumpToHello">保存</button>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      cards: {
        Mon: {
          start: '',
          end: '',
        },
        Tue: {
          start: '',
          end: '',
        },
        Wed: {
          start: '',
          end: '',
        },
        Thu: {
          start: '',
          end: '',
        },
        Fri: {
          start: '',
          end: '',
        },
      },
      sheetVO: [],
    }
  },
  methods: {
    loginBtnClick() {
      fetch('/login?uid=' + this.userName + "&ans=" + this.password, {
        method: 'get',
      }).then(res => res.json())
        .then(res => alert(JSON.stringify(res.content)))
    },
  }
}
</script>

<style>
#main {
  position: fixed;
  float: left;
  height: 100%;
  max-width: 80%;
  text-align: center;
}

table {
  border: 1px solid #e9e9e9;
  border-collapse: collapse;
  border-spacing: 0;
}

th, td {
  background-color: white;
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
}

th {
  background-color: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
}

#saveCardsBtn {
  margin-top: 5%;
  width: 20%;
  padding: 2%;
  font-size: 30px;
  max-width: 50%;
}


</style>
