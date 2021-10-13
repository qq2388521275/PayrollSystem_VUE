<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" label-position="left" style="margin-bottom: 2%">
      <el-form-item label="员工id:">
        <el-input type="text" v-model="form.eid" maxlength="15"
                  style="width: 20%"></el-input>
      </el-form-item>
      <el-form-item label="起始日期" maxlength="300" style="width: 100%" size="small">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.beginTime" style="width: 40%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="结束日期" maxlength="300" style="width: 100%" size="small">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" style="width: 40%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-button type="primary" @click="onSubmit()">查询</el-button>
    </el-form>

    <el-checkbox v-model="ShowWholeWorkingHours">显示总工作小时</el-checkbox>
    <el-checkbox v-model="ShowThisYearSalary">显示今年迄今工资</el-checkbox>

    <el-table id="battery" :data="tableData" border v-loading="loading" element-loading-text="查询中"
              style="min-height: 100px;width: 60%;margin-top: 2%;margin-bottom: 2%">
      <el-table-column prop="eid" label="员工id" width="100"></el-table-column>
      <el-table-column prop="ename" label="员工姓名" width="100"></el-table-column>
      <el-table-column prop="sumHour" label="总工作小时" width="100"
                       v-if="ShowWholeWorkingHours"></el-table-column>
      <el-table-column prop="sumSalary" label="工资" width="100"
                       v-if="ShowThisYearSalary"></el-table-column>
      <el-table-column prop="beginTime" label="起始日期" width="100"></el-table-column>
      <el-table-column prop="endTime" label="结束日期" width="100"></el-table-column>
    </el-table>

    <el-button type="success" @click="open">导出Excel</el-button>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  name: "Admin",
  data() {
    return {
      form: {
        beginTime: null,
        endTime: null,
        eid: '',
      },
      ShowWholeWorkingHours: true,
      ShowThisYearSalary: true,
      tableData: [{
        eid: null,
        ename: null,
        sumHour: null,
        sumSalary: null,
        beginTime: null,
        endTime: null,
      }],
      loading: false,
    }
  },
  methods: {
    onSubmit(formName) {
      this.loading = true;
      let param = new URLSearchParams();
      param.append("jsonString", JSON.stringify(this.form));
      setTimeout(() => {
        fetch('/apis/getSalary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
          },
          body: param,
        }).then(res => res.json())
          .then(res => {
            this.tableData[0].eid = res.content.eid;
            this.tableData[0].ename = res.content.ename;
            this.tableData[0].sumHour = res.content.sumHour.toFixed(1);
            this.tableData[0].sumSalary = res.content.sumSalary;
            this.tableData[0].beginTime = this.form.beginTime.toLocaleDateString();
            this.tableData[0].endTime = this.form.endTime.toLocaleDateString();
          })
          .then(() => this.loading = false)
          .catch(e => {
            this.loading = false;
            this.$message.error('读取工资失败')
          });
      }, 500);
    },
    DownloadForm(Filename) {
      let wb = XLSX.utils.table_to_book(document.querySelector('#battery'))

      let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
      try {
        FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-strem'}), Filename + '.xlsx')

      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }

      return wbout
    },
    open() {
      this.$prompt("请输入导出文件名", '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
      }).then(({value}) => {
        this.$message({
          type: 'success',
          message: '导出文件名是: ' + value
        });
        this.DownloadForm(value);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
  },
}
</script>
