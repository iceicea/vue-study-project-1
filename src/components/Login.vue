<template>
  <div class="login">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>通用后台管理系统</span>
        </div>
      </template>
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="form"
        style="max-width: 460px"
        ref="form"
        :rules="rules"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input tpye="password" v-model="form.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { nameRule, passwordRule } from "../utils/validate.js";
import { setToken, getToken, removeToken } from "../utils/setToken.js";
import { Login } from "../api/api.js";
export default {
  data() {
    return {
      rules: {
        username: [{ validator: nameRule, trigger: "blur" }],
        password: [{ validator: passwordRule, trigger: "blur" }],
      },
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(this.form);
          // 封装成api使用
          // this.service.post("/login", this.form).then((res) => {
          //   if (res.data.status === 200) {
          //     setToken("username", res.data.username);
          //     setToken("token", res.data.token);
          //     this.$message({ message: res.data.message, type: "success" });
          //     this.$router.push("/home");
          //   }
          //   console.log(res);
          // });
          Login(this.form).then((res) => {
            if (res.data.status === 200) {
              setToken("username", res.data.username);
              setToken("token", res.data.token);
              this.$message({ message: res.data.message, type: "success" });
              this.$router.push("/home");
            }
          });
        } else {
          console.error(this.form);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("../assets/bg.jpg") center no-repeat;
  .el-card {
    background: #65768557;
  }
  .box-card {
    width: 450px;
    margin: 200px auto;
    color: #fff;
    .el-form .el-form-item__label {
      color: #fff;
    }
    .el-card__header {
      font-size: 34px;
      text-align: center;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
