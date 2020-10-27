<template>
  <div class="login">
    <el-form
      :model="form"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item
        label="用户名"
        prop="userName"
      >
        <el-input
          placeholder="请输入用户名"
          v-model="form.userName"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          placeholder="请输入密码"
          v-model="form.password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="mini"
          plain
          @click="onSignIn"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations, createNamespacedHelpers } from "vuex";

import { login } from "@/network/api";
export default {
  data() {
    return {
      form: {
        userName: "",
        password: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations(["ADD_USER"]),

    onSignIn() {
      if (!this.form.userName || !this.form.password) return;
      login({ ...this.form }).then((result) => {
        let { flag, user } = result;
        if (flag) {
          this.ADD_USER(user);
          localStorage.setItem("user", user.role);
          this.$router.push({ path: "/user" });
        } else {
          this.$message.error("用户名或者密码错误");
        }
      });
    },
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
}
.el-form {
  width: 40%;
  position: absolute;
  top: 25%;
  left: 30%;
  font-family: none;
}
.el-input {
  width: 100%;
}
.el-button {
  margin-left: 40%;
}
</style>