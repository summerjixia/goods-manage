<template>
  <div class="header-container">
    <span>商品管理后台</span>
    <el-tooltip
      placement="top"
      effect="light"
    >
      <div slot="content"><span
          class="exit"
          @click="exit"
        >退出</span></div>
      <i class="el-icon-user"></i>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  methods: {
    exit() {
      localStorage.removeItem("user");
      localStorage.removeItem("library");
      this.$router.push("/login");
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.header-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.exit:hover {
  cursor: pointer;
}
</style>