<template>
  <el-form ref="form" :model="form" label-width="80px" label-position="left" style="width: 80%;" status-icon
           :rules="rules" v-loading="loading" element-loading-text="处理中">
    <el-form-item label="员工类型">
      <el-radio-group v-model="form.paytype">
        <el-radio label="小时工">小时工</el-radio>
        <el-radio label="带薪">带薪</el-radio>
        <el-radio label="销售员">销售员</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="小时薪资">
      <el-input type="text" v-model="form.hoursalary" maxlength="20" style="width: 5%" size="small"></el-input>
    </el-form-item>

    <el-form-item label="付款方式">
      <el-radio-group v-model="form.salaryway">
        <el-radio label="自取">自取</el-radio>
        <el-radio label="邮寄支票">邮寄支票</el-radio>
        <el-radio label="转账">转账</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="员工姓名">
      <el-input type="text" v-model="form.ename" maxlength="15" style="width: 10%"></el-input>
    </el-form-item>

    <el-form-item label="员工性别">
      <el-radio-group v-model="form.esex">
        <el-radio label="男">男</el-radio>
        <el-radio label="女">女</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="职务">
      <el-input type="text" v-model="form.eposition" maxlength="20" style="width: 20%"></el-input>
    </el-form-item>

    <el-form-item label="部门">
      <el-input type="text" v-model="form.department" maxlength="20" style="width: 20%"></el-input>
    </el-form-item>

    <el-form-item label="电话" prop="phonenumber" :rules="[{ type: 'number', message: '请输入正确格式'}]">
      <el-input v-model.number="form.phonenumber" auto-complete="off" maxlength="20" style="width: 20%"
                size="small"></el-input>
    </el-form-item>

    <el-form-item label="电子邮件">
      <el-input type="text" v-model="form.email" maxlength="20" style="width: 20%" size="small"></el-input>
    </el-form-item>

    <el-form-item label="税收减免">
      <el-input type="text" v-model="form.tex_remission" maxlength="20" style="width: 5%" size="small"></el-input>
    </el-form-item>

    <el-form-item label="工时限制">
      <el-input type="text" v-model="form.timelimit" maxlength="20" style="width: 5%" size="small"></el-input>
    </el-form-item>

    <el-form-item label="年假">
      <el-input type="text" v-model="form.vacation_day" maxlength="20" style="width: 5%" size="small"></el-input>
    </el-form-item>

    <el-form-item label="登录名" prop="eid" :rules="[{ required: true, mes2222sage: '请输入登录名', trigger: 'blur'}]">
      <el-input v-model="form.eid" maxlength="20" style="width: 20%" size="small"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '请输入密码',trigger: 'blur'}]">
      <el-input type="password" v-model="form.password" maxlength="20" style="width: 20%" size="small"
                show-password></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password1">
      <el-input type="password" v-model="form.password1" maxlength="20" style="width: 20%" size="small"
                show-password></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">添加员工</el-button>
      <el-button>撤销</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "Add",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        paytype: '带薪',
        salaryway: '自取',
        ename: null,
        esex: '男',
        eposition: null,
        department: null,
        phonenumber: null,
        email: null,
        tex_remission: 0,
        timelimit: 0,
        vacation_day: 0,
        eid: null,
        password: null,
        password1: null,

        hoursalary: 20,
      },
      rules: {
        password1: [
          {validator: validatePass2, trigger: 'blur'}
        ],
      },
      loading: false,
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          let Params = new URLSearchParams();
          Params.append("jsonString", JSON.stringify(this.form));
          fetch('/apis/employee/insert', {
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            },
            body: Params,
          }).then(res => res.json())
            .then(json => this.afterSubmit(json))
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    afterSubmit(json) {
      this.loading = false;
      if (JSON.stringify(json.status) === '200') {
        this.$message.success('添加成功');
      } else {
        console.error(json.content);
        this.$message.error(json.content);
      }
    },
  }
}
</script>

<style scoped>

</style>
