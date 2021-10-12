<template>
  <el-container>
    <el-table
      :data="tableData"
      border
      stripe
      v-loading="loading" element-loading-text="加载中"
      style="width: 100%">
      <el-table-column prop="eid" label="用户名" width="100"></el-table-column>
      <el-table-column prop="ename" label="姓名" width="90"></el-table-column>
      <el-table-column prop="password" label="密码" width="100"></el-table-column>
      <el-table-column prop="esex" label="性别" width="60"></el-table-column>
      <el-table-column prop="paytype" label="员工类型" width="80"></el-table-column>
      <el-table-column prop="salaryway" label="支付方式" width="100"></el-table-column>
      <el-table-column prop="eposition" label="职位" width="100"></el-table-column>
      <el-table-column prop="department" label="部门" width="100"></el-table-column>
      <el-table-column prop="phonenumber" label="电话" width="150"></el-table-column>
      <el-table-column prop="email" label="邮件" width="200"></el-table-column>
      <el-table-column prop="tex_remission" label="税收减免" width="80"></el-table-column>
      <el-table-column prop="timelimit" label="工时限制" width="80"></el-table-column>
      <el-table-column prop="vacation_day" label="年假" width="80"></el-table-column>
      <el-table-column prop="hoursalary" label="小时工资" width="80"></el-table-column>
      <el-table-column prop="salaryrate" label="佣金率" width="80"></el-table-column>
      <el-table-column prop="salary" label="工资" width="80"></el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogIndex=scope.$index;dialogFormVisible=true;">编辑</el-button>
          <el-button type="text" size="small" @click="deleteEmployee(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑员工" :visible.sync="dialogFormVisible">
      <el-form :model="tableData[dialogIndex]" :rules="rules">
        <el-form-item label="员工类型">
          <el-radio-group v-model="tableData[dialogIndex].paytype">
            <el-radio label="小时工">小时工</el-radio>
            <el-radio label="带薪">带薪</el-radio>
            <el-radio label="销售员">销售员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工资" v-if="tableData[dialogIndex].paytype === '带薪' || tableData[dialogIndex].paytype === '销售员'"
                      prop="salary" :rules="[{ type: 'number', message: '请输入正确格式'}]">
          <el-input v-model.number="tableData[dialogIndex].salary" auto-complete="off" maxlength="20" style="width: 12%"
                    size="small"></el-input>
        </el-form-item>

        <el-form-item label="佣金率" v-if="tableData[dialogIndex].paytype === '销售员'"
                      prop="salaryrate">
          <el-input v-model="tableData[dialogIndex].salaryrate" auto-complete="off" maxlength="20" style="width: 10%" type="float"
                    size="small"></el-input>
          %
        </el-form-item>
        <el-form-item label="小时薪资" v-if="tableData[dialogIndex].paytype === '小时工'"
                      prop="hoursalary" :rules="[{ type: 'number', message: '请输入正确格式'}]">
          <el-input v-model.number="tableData[dialogIndex].hoursalary" auto-complete="off" maxlength="20" style="width: 10%"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item label="付款方式">
          <el-radio-group  v-model="tableData[dialogIndex].salaryway">
            <el-radio label="自取">自取</el-radio>
            <el-radio label="邮寄支票">邮寄支票</el-radio>
            <el-radio label="转账">转账</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="员工姓名">
          <el-input type="text" v-model="tableData[dialogIndex].ename" maxlength="15" style="width: 10%"></el-input>
        </el-form-item>
        <el-form-item label="员工性别">
          <el-radio-group v-model="tableData[dialogIndex].esex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="职务">
          <el-input type="text" v-model="tableData[dialogIndex].eposition" maxlength="20" style="width: 20%"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input type="text" v-model="tableData[dialogIndex].department" maxlength="20" style="width: 20%"></el-input>
        </el-form-item>
        <el-form-item label="电话" :rules="[{ type: 'number', message: '请输入正确格式'}]">
          <el-input auto-complete="off" maxlength="20" style="width: 20%" v-model="tableData[dialogIndex].phonenumber"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item label="电子邮件">
          <el-input type="text" v-model="tableData[dialogIndex].email" maxlength="20" style="width: 20%" size="small"></el-input>
        </el-form-item>
        <el-form-item label="税收减免">
          <el-input type="text" v-model="tableData[dialogIndex].tex_remission" maxlength="20" style="width: 6%" size="small"></el-input>
        </el-form-item>
        <el-form-item label="工时限制">
          <el-input type="text" v-model="tableData[dialogIndex].timelimit" maxlength="20" style="width: 6%" size="small"></el-input>
        </el-form-item>
        <el-form-item label="年假">
          <el-input type="text" v-model="tableData[dialogIndex].vacation_day" maxlength="20" style="width: 6%" size="small"></el-input>
        </el-form-item>
        <el-form-item label="登录名">
          <el-input v-model="tableData[dialogIndex].eid" maxlength="20" style="width: 20%" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '请输入密码',trigger: 'blur'}]">
          <el-input type="password" maxlength="20" style="width: 20%" size="small" v-model="tableData[dialogIndex].password"
                    show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="()=>{this.dialogFormVisible = false;this.queryEmployee}">取 消</el-button>
        <el-button type="primary" @click="updateEmployee">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: "Query",
  data() {
    var validateAcquaintance = (rule, value, callback) => {
      if (value > 1) {
        callback(new Error('请输入小于1的小数'))
      } else {
        callback()
      }
    };
    return {
      tableData: [{}],
      loading: false,
      dialogFormVisible: false,
      dialogIndex: 0,
      rules: {
        salaryrate: [
          {pattern: /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/, message: '请输入大于两位的小数', trigger: 'blur'},
          {validator: validateAcquaintance, trigger: 'blur'}
        ],
      },
    }
  },
  created() {
    this.queryEmployee();
  },
  methods: {
    queryEmployee() {
      this.loading = true;
      setTimeout(() => {
        fetch('/apis/employee/queryAll', {method: 'get'})
          .then(res => res.json())
          .then(res => this.tableData = res.content)
          .then(() => this.loading = false)
          .catch(e => {
            this.loading = false;
            this.$message.error('读取员工失败')
          });
      }, 500);
    },
    deleteEmployee(index) {
      this.loading = true;
      fetch('/apis/employee/delete?eid=' + this.tableData[index].eid, {method: 'get'})
        .then(() => {
          this.$message.success('删除成功')
        })
        .then(() => {
          this.queryEmployee();
        })
    },
    updateEmployee() {
      this.dialogFormVisible = false;
      this.loading = true;
      let param = new URLSearchParams();
      param.append("jsonString", JSON.stringify(this.tableData[this.dialogIndex]));
      fetch('/apis/employee/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        },
        body: param,
      }).then(()=>{this.$message.success('修改成功')})
      .then(()=>{this.queryEmployee()})
    }
  }
}
</script>

