<template>
  <el-container>
    <el-header style="height:3rem">
      <header-component />
    </el-header>
    <el-container class="main-content">
      <aside-nav />
      <el-main>
        <header-tag />
        <div class="content">
          <keep-alive :include="cacheView">
            <router-view :key="key"></router-view>
          </keep-alive>
        </div>
      </el-main>
    </el-container>
    <el-footer>
      <footer-component />
    </el-footer>
  </el-container>
</template>

<script>
import { mapState, createNamespacedHelpers } from "vuex";
import { getMenu } from "@/network/api";
let { mapState: mapTagViewState } = createNamespacedHelpers("tagView");
let {
  mapState: mapMenuState,
  mapMutations: mapMenuMutations,
} = createNamespacedHelpers("menu");
let {
  mapState: mapLibraryState,
  mapMutations: mapLibraryMutations,
} = createNamespacedHelpers("library");
import components from "@/components";
let { asideNav, footerComponent, headerComponent, headerTag } = components;

export default {
  data() {
    return {};
  },
  computed: {
    ...mapTagViewState(["cacheView"]),
    ...mapState(["user"]),
     key() {
      return this.$route.path
    }
  },
  methods: {
    ...mapMenuMutations(["ADD_MENU"]),
    ...mapLibraryMutations(["ADD_LIBRARY"]),
  },
  mounted() {
    if (localStorage.getItem("user")) {
      getMenu({ role: localStorage.getItem("user") }).then((result) => {
        let { menuData, libraryData } = result;
        this.ADD_MENU(menuData);
        this.ADD_LIBRARY(libraryData);
        localStorage.setItem("library", JSON.stringify(libraryData));
      });
    } else {
      this.$router.push({ path: "/login" });
    }
  },
  components: {
    asideNav,
    footerComponent,
    headerComponent,
    headerTag,
  },
};
</script>

<style>
.el-header,
.el-footer {
  width: 100%;
  height: 5%;
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 40px;
  box-shadow: white;
  padding: 0 50px;
  position: fixed;
}
.el-header {
  top: 0;
  left: 0;
  box-shadow: 2px 2px 2px rgba(129, 92, 92, 0.1);
}
.el-footer {
  bottom: 0;
  left: 0;
}

.main-content {
  height: 80%;
  width: 100%;
  padding: 0 10px;
  margin-top: 5px;
  position: fixed;
  top: 60px;
  left: 0;
}

.el-aside {
  background-color: white;
}

.el-main {
  background-color: white;
  color: #333;
  padding: 0px;
}

.tag-container {
  position: fixed;
  z-index: 9999;
}

.content {
  margin-top: 50px;
}
</style>
