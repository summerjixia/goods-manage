<template>
  <div class="tag-container">
    <el-tag
      v-for="tag in openView"
      :key="tag.name"
      :title="tag.name"
      closable
      :effect="tag.flag?'dark':'light'"
      @close="handleClose(tag)"
      @click="handleClick(tag)"
    >
      {{tag.name}}
    </el-tag>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
let { mapState, mapActions } = createNamespacedHelpers("tagView");
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["openView", "cacheView"]),
  },
  methods: {
    handleClick(tag) {
      this.updateCacheView(tag);
      this.$router.push(tag.route);
    },
    handleClose(tag) {
      this.deleteOpenView(tag);
      this.$router.push(`${this.openView[this.openView.length-1].route}`)
    },
    ...mapActions(["updateCacheView", "deleteOpenView"]),
  },
};
</script>
<style scoped>
.tag-container {
  overflow: auto;
}
::-webkit-scrollbar {
  width: 0rem;
  height: 0rem;
}
span.el-tag.el-tag--light:hover {
  cursor: pointer;
}
.el-tag {
  color: black;
}
.el-tag .el-icon-close {
  color: black;
  height: 10rem;
}
</style>