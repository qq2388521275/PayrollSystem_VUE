<template>
  <el-form ref="form" :model="form" label-width="100px" label-position="left" status-icon>
    <el-form-item style="width: 40%" label="查询" size="small">
      <el-input v-model="form.queryId" placeholder="请输入用户id"></el-input>
    </el-form-item>

    <el-button type="primary" @click="queryOrder()">查询</el-button>

    <el-table :data="form.tableData" border stripe v-loading="loading" element-loading-text="加载中">
      <el-table-column prop="aid" label="销售清单ID" width="100"></el-table-column>
      <el-table-column prop="ename" label="销售员姓名" width="100"></el-table-column>
      <el-table-column prop="eid" label="销售员编号" width="100"></el-table-column>
      <el-table-column prop="date" label="日期" width="100"></el-table-column>
      <el-table-column prop="pname" label="产品名称" width="100"></el-table-column>
      <el-table-column prop="ptype" label="产品型号" width="100"></el-table-column>
      <el-table-column prop="price" label="单价" width="80"></el-table-column>
      <el-table-column prop="number" label="数量" width="80"></el-table-column>
      <el-table-column prop="client_phone" label="客户联系方式" width="180"></el-table-column>
      <el-table-column prop="client_address" label="客户账单地址" width="400"></el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogIndex=scope.$index;dialogFormVisible=true;">编辑</el-button>
          <el-button type="text" size="small" @click="deleteOrder(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑账单" :visible.sync="dialogFormVisible">
      <el-form :model="form.tableData[dialogIndex]">

        <el-form-item label="销售员姓名" maxlength="20" style="width: 20%" size="small">
          <el-input v-model="form.tableData[dialogIndex].ename"></el-input>
        </el-form-item>
        <el-form-item label="销售员编号" maxlength="20" style="width: 20%" size="small">
          <el-input v-model="form.tableData[dialogIndex].eid"></el-input>
        </el-form-item>
        <el-form-item label="日期" maxlength="300" style="width: 80%" size="small">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.tableData[dialogIndex].date"
                            style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="产品名称" maxlength="20" style="width: 20%" size="small">
          <el-input v-model="form.tableData[dialogIndex].pname"></el-input>
        </el-form-item>
        <el-form-item label="规格型号" maxlength="20" style="width: 20%" size="small">
          <el-input v-model="form.tableData[dialogIndex].ptype"></el-input>
        </el-form-item>

        <el-form-item label="单价" prop="price" style="width: 20%" size="small"
                      :rules="[{ type: 'number', message: '请输入正确格式'}]">
          <el-input v-model.number="form.tableData[dialogIndex].price"></el-input>
        </el-form-item>

        <el-form-item label="数量" prop="number" style="width: 20%" size="small"
                      :rules="[{ type: 'number', message: '请输入正确格式'}]">
          <el-input v-model.number="form.tableData[dialogIndex].number" size="small"></el-input>
        </el-form-item>

        <el-form-item label="客户联系方式" prop="client_phone">
          <el-input v-model.number="form.tableData[dialogIndex].client_phone" auto-complete="off" maxlength="20"
                    style="width: 20%"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item label="客户账单地址">
          <el-input v-model="form.tableData[dialogIndex].client_address"></el-input>
        </el-form-item>

        <el-button type="primary" @click="updateOrder('form')">更新账单</el-button>
      </el-form>
    </el-dialog>

  </el-form>
</template>

<script>
export default {
  name: "OrderQuery",
  data() {
    return {
      form: {
        queryId: '',
        tableData: [{}],

      },
      loading: false,
      dialogFormVisible: false,
      dialogIndex: 0,
    }
  },
  methods: {
    // 查询当前id下的所有订单
    queryOrder() {
      this.loading = true;
      setTimeout(() => {
        fetch('/apis/order/selectByName?eid=' + this.form.queryId, {method: 'get'})
          .then(res => res.json())
          .then(res => this.judgeQuery(res))
          .catch(e => {
            this.loading = false;
            this.$message.error('读取销售单失败')
          });
      }, 500);
    },
    judgeQuery(res) {
      if (res.status !== 200) {
        this.$message.info("未查到信息");
      } else {
        this.form.tableData = res.content;
      }
      this.loading = false;
    },
    deleteOrder(index) {
      this.loading = true;
      fetch('/apis/order/delete?aid=' + this.form.tableData[index].aid, {method: 'get'})
        .then(() => {
          this.$message.success('删除成功');
          this.form.tableData = [{}];
        })
        .then(() => {
          this.queryOrder();
        })
    },
    updateOrder(index) {
      this.dialogFormVisible = false;
      this.loading = true;
      let param = new URLSearchParams();
      param.append("jsonString", JSON.stringify(this.form.tableData[this.dialogIndex]));
      fetch('/apis/order/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        },
        body: param,
      }).then(() => {
        this.$message.success('修改成功')
      })
        .then(() => {
          this.queryOrder()
        })
    }
  },
}
</script>

<style scoped>

</style>
