<template>
  <div class="aside-container">
    <div
      class="collapse"
      @click="isMobile = !isMobile"
    >
      <i class="el-icon-s-operation"></i>
    </div>
    <div :class="{'aside-nav':!isMobile,'aside-nav-mobile':isMobile}">
      <el-col>
        <el-menu
          :default-active="defaultIndex"
          class="el-menu-vertical-demo"
          @select="handleSelect"
        >
          <menu-component
            v-for="(item,index) in menu"
            :key="index"
            :indexKey="index"
            :data="item"
          />
        </el-menu>
      </el-col>
    </div>
  </div>
</template>

<script>
import MenuComponent from "./MenuComponent";
import { createNamespacedHelpers } from "vuex";
let { mapActions } = createNamespacedHelpers("tagView");
let { mapState: mapMenuState } = createNamespacedHelpers("menu");
export default {
  data() {
    return {
      defaultIndex: "",
      isMobile: false,
    };
  },
  components: { MenuComponent },
  computed: {
    ...mapMenuState(["menu"]),
  },
  created() {
    this.defaultIndex = "/user";
    this.addOpenView({
      name: this.$route.meta.name,
      route: this.$route.path,
      flag: true,
    });
  },
  watch: {
    $route(value) {
      this.addOpenView({
        name: value.meta.name,
        route: value.path,
        flag: true,
      });
      this.defaultIndex = value.path;
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      if (keyPath.length === 1) return;
      this.defaultIndex = key;
      this.$router.push(key);
    },
    ...mapActions(["addOpenView"]),
  },
};
</script>

<style scoped>
.aside-container {
  overflow: auto;
}
.aside-nav {
  transform: translateX(0rem);
}
.collapse {
  display: none;
}

@media screen and (max-device-width: 36rem) {
  .collapse {
    display: block;
    position: fixed;
    top: 1rem;
    left: 1.5rem;
  }
  .aside-nav {
    transform: translateX(-50rem);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 99999;
    position: fixed;
    top: 3rem;
    left: 0rem;
  }
  .aside-nav-mobile {
    transform: translateX(0rem);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 99999;
    position: fixed;
    top: 3rem;
    left: 0rem;
  }
}
@media screen and (min-device-width: 400rem) {
  .aside-nav {
    transform: translateX(0rem);
  }
  .aside-nav-mobile {
    transform: translateX(0rem);
  }
}
</style>