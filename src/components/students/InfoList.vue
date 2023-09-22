<template>
  <div class="infoList">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="small"
    >
      <el-form-item>
        <el-button type="primary" @click="addStudent"
          >新增</el-button
        ></el-form-item
      >
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="sex" label="性别" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center">
      </el-table-column>
      <el-table-column prop="father" label="父亲" align="center">
      </el-table-column>
      <el-table-column prop="mother" label="母亲" align="center">
      </el-table-column>
      <el-table-column prop="address" label="家庭住址" align="center">
      </el-table-column>
      <el-table-column prop="time" label="入校时间" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="danger" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加学生信息" v-model="dialogFormVisible" width="500px">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="父亲姓名"
          :label-width="formLabelWidth"
          prop="father"
        >
          <el-input v-model="form.father" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="母亲姓名"
          :label-width="formLabelWidth"
          prop="mother"
        >
          <el-input v-model="form.mohter" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="家庭住址"
          :label-width="formLabelWidth"
          prop="address"
        >
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="入校时间"
          :label-width="formLabelWidth"
          prop="time"
        >
          <el-date-picker
            v-model="form.time"
            format="YYYY 年 MM月 DD日"
            value-format="yyyy-MM-DD"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="联系方式"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { info, getInfo, updateInfo, delInfo } from "../../api/api.js";
export default {
  data() {
    return {
      tableData: [],
      formInline: {},
      dialogFormVisible: false,
      form: {
        name: "",
        sex: "1",
        age: "",
        father: "",
        mother: "",
        address: "",
        time: "",
        phone: "",
      },
      formLabelWidth: "100px",
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        sex: [{ required: true }],
        age: [{ required: true, message: "请输入年龄" }],
        address: [{ required: true, message: "请输入地址" }],
        time: [{ required: true, message: "请输入入学时间" }],
        phone: [{ required: true, message: "请输入联系方式" }],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  methods: {
    del(row) {
      this.$alert("确定删除?", "提示", {
        confirmButtonText: "确定",
        callback: () => {
          delInfo(row.id).then((res) => {
            if (res.data.status === 200) {
              console.log(res);

              this.getData();
              this.$message({ message: res.data.message, type: "success" });
            }
          });
        },
      });
    },
    edit(row) {
      this.dialogFormVisible = true;
      this.form = row;
    },
    addStudent() {
      this.dialogFormVisible = true;
    },
    getData() {
      getInfo().then((res) => {
        if (res.data.status === 200) {
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    sure(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(this.form);
          info(this.form).then((res) => {
            console.log(res);
            if (res.data.status === 200) {
              this.getData();
              this.dialogFormVisible = false;
              this.$refs["form"].resetFields();
              this.$message({ type: "success", message: res.data.message });
              this.form = {};
            }
          });
        }
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>
<style lang="scss">
.infoList {
  .demo-form-inline,
  .el-form-item {
    text-align: left;
  }
}
</style>
