<template>
  <el-form ref="form" :model="form" label-width="100px" label-position="left" style="width: 80%;"
           status-icon v-loading="loading" element-loading-text="处理中">

    <el-form-item label="销售员姓名" maxlength="20" style="width: 20%" size="small">
      <el-input v-model="form.ename"></el-input>
    </el-form-item>

    <el-form-item label="销售员编号" maxlength="20" style="width: 20%" size="small">
      <el-input v-model="form.eid"></el-input>
    </el-form-item>
    <el-form-item label="日期" maxlength="300" style="width: 80%" size="small">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 40%;"></el-date-picker>
      </el-col>
    </el-form-item>

    <el-form-item label="产品名称" maxlength="20" style="width: 20%" size="small">
      <el-input v-model="form.pname"></el-input>
    </el-form-item>
    <el-form-item label="规格型号" maxlength="20" style="width: 20%" size="small">
      <el-input v-model="form.ptype"></el-input>
    </el-form-item>

    <el-form-item label="单价" prop="price" style="width: 15%" size="small"
                  :rules="[{ type: 'number', message: '请输入正确格式'}]">
      <el-input v-model.number="form.price"></el-input>
    </el-form-item>

    <el-form-item label="数量" prop="number" style="width: 15%" size="small"
                  :rules="[{ type: 'number', message: '请输入正确格式'}]">
      <el-input v-model.number="form.number" size="small"></el-input>
    </el-form-item>

    <el-form-item label="客户联系方式" prop="client_phone" :rules="[{ type: 'number', message: '请输入正确格式'}]">
      <el-input v-model.number="form.client_phone" auto-complete="off" maxlength="20" style="width: 20%"
                size="small"></el-input>
    </el-form-item>
    <el-form-item label="客户账单地址">
      <el-input v-model="form.client_address"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">添加账单</el-button>
      <el-button>撤销</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
export default {
  name: 'orderadd',
  data() {
    return {
      form: {
        ename: null,
        eid: null,
        date: '', //日期
        pname: null,
        ptype: null,
        price: 0,
        number: 0,
        client_phone: null,
        client_address: null,
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
          Params.append("form", JSON.stringify(this.form));
          fetch('/apis/order/add', {
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            },
            body: Params,
          }).then(res => res.json())
            .then(json => this.afterSubmit(json))
        }
      })
      console.log('submit!');
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
