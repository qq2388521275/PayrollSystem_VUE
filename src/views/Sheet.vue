<template>
  <div id="sheetMain" style="text-align: center">

    <div id="title">
      <h1>{{ this.$cookies.get('userName') }}考勤卡</h1>
    </div>

    <div id="timeCards" v-loading="loading" element-loading-text="拼命加载中">
      <table style="width: 100%;text-align: center;font-size: 30px">
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
          <td>
            <el-time-select
              placeholder="上班时间"
              v-model="cards.Mon.start"
              default-value="10:00"
              :disabled="cards.Mon.commit"
              :picker-options="{
                start: '07:00',
                step: '00:30',
                end: '21:30',
                maxTime: cards.Mon.end
              }"></el-time-select>
          </td>
          <td>
            <el-time-select
              placeholder="下班时间"
              v-model="cards.Mon.end"
              default-value="20:00"
              :disabled="cards.Mon.commit"
              :picker-options="{
                start: '07:30',
                step: '00:30',
                end: '22:00',
                minTime: cards.Mon.start,
              }"></el-time-select>
          </td>
          <td>
            <button id="MonSubmit" @click="confirmSubmit(1)">提交</button>
          </td>
        </tr>
        <tr>
          <td>周二</td>
          <td>
            <el-time-select
              placeholder="上班时间"
              v-model="cards.Tue.start"
              default-value="10:00"
              :disabled="cards.Tue.commit"
              :picker-options="{
                start: '07:00',
                step: '00:30',
                end: '21:30',
                maxTime: cards.Tue.end
              }"></el-time-select>
          </td>
          <td>
            <el-time-select
              placeholder="下班时间"
              v-model="cards.Tue.end"
              default-value="20:00"
              :disabled="cards.Tue.commit"
              :picker-options="{
                start: '07:30',
                step: '00:30',
                end: '22:00',
                minTime: cards.Tue.start,
              }"></el-time-select>
          </td>
          <td>
            <button id="TueSubmit" @click="confirmSubmit(2)">提交</button>
          </td>
        </tr>
        <tr>
          <td>周三</td>
          <td>
            <el-time-select
              placeholder="上班时间"
              v-model="cards.Wed.start"
              default-value="10:00"
              :disabled="cards.Wed.commit"
              :picker-options="{
                start: '07:00',
                step: '00:30',
                end: '21:30',
                maxTime: cards.Wed.end
              }"></el-time-select>
          </td>
          <td>
            <el-time-select
              placeholder="下班时间"
              v-model="cards.Wed.end"
              default-value="20:00"
              :disabled="cards.Wed.commit"
              :picker-options="{
                start: '07:30',
                step: '00:30',
                end: '22:00',
                minTime: cards.Wed.start,
              }"></el-time-select>
          </td>
          <td>
            <button id="WedSubmit" @click="confirmSubmit(3)">提交</button>
          </td>
        </tr>
        <tr>
          <td>周四</td>
          <td>
            <el-time-select
              placeholder="上班时间"
              v-model="cards.Thu.start"
              default-value="10:00"
              :disabled="cards.Thu.commit"
              :picker-options="{
                start: '07:00',
                step: '00:30',
                end: '21:30',
                maxTime: cards.Thu.end
              }"></el-time-select>
          </td>
          <td>
            <el-time-select
              placeholder="下班时间"
              v-model="cards.Thu.end"
              default-value="20:00"
              :disabled="cards.Thu.commit"
              :picker-options="{
                start: '07:30',
                step: '00:30',
                end: '22:00',
                minTime: cards.Thu.start,
              }"></el-time-select>
          </td>
          <td>
            <button id="ThuSubmit" @click="confirmSubmit(4)">提交</button>
          </td>
        </tr>
        <tr>
          <td>周五</td>
          <td>
            <el-time-select
              placeholder="上班时间"
              v-model="cards.Fri.start"
              default-value="10:00"
              :disabled="cards.Fri.commit"
              :picker-options="{
                start: '07:00',
                step: '00:30',
                end: '21:30',
                maxTime: cards.Fri.end
              }"></el-time-select>
          </td>
          <td>
            <el-time-select
              placeholder="下班时间"
              v-model="cards.Fri.end"
              default-value="20:00"
              :disabled="cards.Fri.commit"
              :picker-options="{
                start: '07:30',
                step: '00:30',
                end: '22:00',
                minTime: cards.Fri.start,
              }"></el-time-select>
          </td>
          <td>
            <button id="FriSubmit" @click="confirmSubmit(5)">提交</button>
          </td>
        </tr>
        </tbody>
      </table>

      <div id="saveCards">
        <button id="saveCardsBtn" @click="saveAllCards">保存</button>
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
          aid: null,
          commit: 0,
        },
        Tue: {
          start: '',
          end: '',
          aid: null,
          commit: 0,
        },
        Wed: {
          start: '',
          end: '',
          aid: null,
          commit: 0,
        },
        Thu: {
          start: '',
          end: '',
          aid: null,
          commit: 0,
        },
        Fri: {
          start: '',
          end: '',
          aid: null,
          commit: 0,
        },
      },
      sheetVO: [],
      loading: false,
    }
  },
  created() {
    this.querySheet(this.$cookies.get('userName'));
  },
  methods: {
    querySheet(id) {
      this.loading = true
      fetch('/apis/Sheet/query?eid=' + id, {method: 'get'})
        .then(res => res.json())
        .then(res => this.parseQuery(res.content))
        .then(() => this.loading = false)
        .catch(e => {this.loading = false; this.$message.error('读取考勤卡失败')})
    },
    parseQuery(res) {
      res.forEach((item, i) => {
          if (item != null) {
            switch (i) {
              case 0:
                this.cards.Mon.start = item.workstart
                this.cards.Mon.end = item.workend
                this.cards.Mon.aid = item.aid
                this.cards.Mon.commit = item.commit
                break
              case 1:
                this.cards.Tue.start = item.workstart
                this.cards.Tue.end = item.workend
                this.cards.Tue.aid = item.aid
                this.cards.Tue.commit = item.commit
                break
              case 2:
                this.cards.Wed.start = item.workstart
                this.cards.Wed.end = item.workend
                this.cards.Wed.aid = item.aid
                this.cards.Wed.commit = item.commit
                break
              case 3:
                this.cards.Thu.start = item.workstart
                this.cards.Thu.end = item.workend
                this.cards.Thu.aid = item.aid
                this.cards.Thu.commit = item.commit
                break
              case 4:
                this.cards.Fri.start = item.workstart
                this.cards.Fri.end = item.workend
                this.cards.Fri.aid = item.aid
                this.cards.Fri.commit = item.commit
                break
            }
          }
        }
      );
      this.checkCommitted();
    },
    //根据commit字段和今日星期，确定信息是否可修改
    checkCommitted() {
      let week = new Date().getDay();
      if (week === 0)
        week = 7;
      if (this.cards.Mon.commit === 1 || week < 1) {
        document.getElementById("MonSubmit").disabled = true;
        this.cards.Mon.commit = 1;
      }
      if (this.cards.Tue.commit === 1 || week < 2) {
        document.getElementById("TueSubmit").disabled = true;
        this.cards.Tue.commit = 1;
      }
      if (this.cards.Wed.commit === 1 || week < 3) {
        document.getElementById("WedSubmit").disabled = true;
        this.cards.Wed.commit = 1;
      }
      if (this.cards.Thu.commit === 1 || week < 4) {
        document.getElementById("ThuSubmit").disabled = true;
        this.cards.Thu.commit = 1;
      }
      if (this.cards.Fri.commit === 1 || week < 5) {
        document.getElementById("FriSubmit").disabled = true;
        this.cards.Fri.commit = 1;
      }
    },
    confirmSubmit(weekend) {
      let confirm = window.confirm('确认提交吗，提交后将不可修改');
      if (confirm === true) {
        this.submitOneCard(weekend);
      }
    },
    submitOneCard(weekend) {
      switch (weekend) {
        case 1:
          if (this.cards.Mon.aid == null) {
            fetch('/apis/Sheet/add?eid=' + this.$cookies.get('userName')
              + '&workstart=' + this.cards.Mon.start + '&workend=' + this.cards.Mon.end + '&weekday=1&commit=1',
              {method: 'get'})
          } else {
            fetch('/apis/Sheet/update?aid=' + this.cards.Mon.aid
              + '&workstart=' + this.cards.Mon.start + '&workend=' + this.cards.Mon.end + '&commit=1',
              {method: 'get'})
          }
          break
        case 2:
          if (this.cards.Tue.aid == null) {
            fetch('/apis/Sheet/add?eid=' + this.$cookies.get('userName')
              + '&workstart=' + this.cards.Tue.start + '&workend=' + this.cards.Tue.end + '&weekday=2&commit=1',
              {method: 'get'})
          } else {
            fetch('/apis/Sheet/update?aid=' + this.cards.Tue.aid
              + '&workstart=' + this.cards.Tue.start + '&workend=' + this.cards.Tue.end + '&commit=1',
              {method: 'get'})
          }
          break
        case 3:
          if (this.cards.Wed.aid == null) {
            fetch('/apis/Sheet/add?eid=' + this.$cookies.get('userName')
              + '&workstart=' + this.cards.Wed.start + '&workend=' + this.cards.Wed.end + '&weekday=3&commit=1',
              {method: 'get'})
          } else {
            fetch('/apis/Sheet/update?aid=' + this.cards.Wed.aid
              + '&workstart=' + this.cards.Wed.start + '&workend=' + this.cards.Wed.end + '&commit=1',
              {method: 'get'})
          }
          break
        case 4:
          if (this.cards.Thu.aid == null) {
            fetch('/apis/Sheet/add?eid=' + this.$cookies.get('userName')
              + '&workstart=' + this.cards.Thu.start + '&workend=' + this.cards.Thu.end + '&weekday=4&commit=1',
              {method: 'get'})
          } else {
            fetch('/apis/Sheet/update?aid=' + this.cards.Thu.aid
              + '&workstart=' + this.cards.Thu.start + '&workend=' + this.cards.Thu.end + '&commit=1',
              {method: 'get'})
          }
          break
        case 5:
          if (this.cards.Fri.aid == null) {
            fetch('/apis/Sheet/add?eid=' + this.$cookies.get('userName')
              + '&workstart=' + this.cards.Fri.start + '&workend=' + this.cards.Fri.end + '&weekday=5&commit=1',
              {method: 'get'})
          } else {
            fetch('/apis/Sheet/update?aid=' + this.cards.Fri.aid
              + '&workstart=' + this.cards.Fri.start + '&workend=' + this.cards.Fri.end + '&commit=1',
              {method: 'get'})
          }
          break
      }
      setTimeout(() => {
        this.querySheet(this.$cookies.get('userName'))
      }, 300)
    },
    saveAllCards() {
      this.loading = true
      if (this.cards.Mon.start !== '' && this.cards.Mon.commit !== '' && this.cards.Mon.commit !== 1) {
        if (this.cards.Mon.aid == null) {
          fetch('/apis/Sheet/add?eid=' + this.$cookies.get('userName')
            + '&workstart=' + this.cards.Mon.start + '&workend=' + this.cards.Mon.end + '&weekday=1&commit=0',
            {method: 'get'})
        } else {
          fetch('/apis/Sheet/update?aid=' + this.cards.Mon.aid
            + '&workstart=' + this.cards.Mon.start + '&workend=' + this.cards.Mon.end + '&commit=0',
            {method: 'get'})
        }
      }

      if (this.cards.Tue.start !== '' && this.cards.Tue.commit !== '' && this.cards.Tue.commit !== 1) {
        if (this.cards.Tue.aid == null) {
          fetch('/apis/Sheet/add?eid=' + this.$cookies.get('userName')
            + '&workstart=' + this.cards.Tue.start + '&workend=' + this.cards.Tue.end + '&weekday=2&commit=0',
            {method: 'get'})
        } else {
          fetch('/apis/Sheet/update?aid=' + this.cards.Tue.aid
            + '&workstart=' + this.cards.Tue.start + '&workend=' + this.cards.Tue.end + '&commit=0',
            {method: 'get'})
        }
      }

      if (this.cards.Wed.start !== '' && this.cards.Wed.commit !== '' && this.cards.Wed.commit !== 1) {
        if (this.cards.Wed.aid == null) {
          fetch('/apis/Sheet/add?eid=' + this.$cookies.get('userName')
            + '&workstart=' + this.cards.Wed.start + '&workend=' + this.cards.Wed.end + '&weekday=3&commit=0',
            {method: 'get'})
        } else {
          fetch('/apis/Sheet/update?aid=' + this.cards.Wed.aid
            + '&workstart=' + this.cards.Wed.start + '&workend=' + this.cards.Wed.end + '&commit=0',
            {method: 'get'})
        }
      }

      if (this.cards.Thu.start !== '' && this.cards.Thu.commit !== '' && this.cards.Thu.commit !== 1) {
        if (this.cards.Thu.aid == null) {
          fetch('/apis/Sheet/add?eid=' + this.$cookies.get('userName')
            + '&workstart=' + this.cards.Thu.start + '&workend=' + this.cards.Thu.end + '&weekday=4&commit=0',
            {method: 'get'})
        } else {
          fetch('/apis/Sheet/update?aid=' + this.cards.Thu.aid
            + '&workstart=' + this.cards.Thu.start + '&workend=' + this.cards.Thu.end + '&commit=0',
            {method: 'get'})
        }
      }

      if (this.cards.Fri.start !== '' && this.cards.Fri.commit !== '' && this.cards.Fri.commit !== 1) {
        if (this.cards.Fri.aid == null) {
          fetch('/apis/Sheet/add?eid=' + this.$cookies.get('userName')
            + '&workstart=' + this.cards.Fri.start + '&workend=' + this.cards.Fri.end + '&weekday=5&commit=0',
            {method: 'get'})
        } else {
          fetch('/apis/Sheet/update?aid=' + this.cards.Fri.aid
            + '&workstart=' + this.cards.Fri.start + '&workend=' + this.cards.Fri.end + '&commit=0',
            {method: 'get'})
        }
      }
      setTimeout(() => {
        this.querySheet(this.$cookies.get('userName'), this.$message({message: '保存成功', type: 'success'}))
      }, 400);
    },
  }
}
</script>

<style scoped>
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
  position: relative;
  top: 0;
  border: 0;
  cursor: pointer;
  background: #9ccc65;
  color: white;
  border-radius: 3px;
  line-height: 1;
  font-size: 25px;
  padding: 15px 25px;
  outline: 0;
  margin-top: 5%;
  width: 20%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

  background: linear-gradient(-45deg, #9ccc65 50%, #699833 60%, #9ccc65 70%);
  background-size: 600% 100%;
  -webkit-animation: shine 20s infinite;
  animation: shine 20s infinite;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
}

@-webkit-keyframes shine {
  0% {
    background-position-x: 400%;
  }
  50% {
    background-position-x: 0%;
  }
  100% {
    background-position-x: -400%;
  }
}

@keyframes shine {
  0% {
    background-position-x: 400%;
  }
  50% {
    background-position-x: 0%;
  }
  100% {
    background-position-x: -400%;
  }
}

input {
  font-size: 30px;
  padding: 2%;
}

button {
  font-size: 30px;
  padding-left: 8%;
  padding-right: 8%;
}
</style>
