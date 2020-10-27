<template>
  <el-menu-item
    v-if="data.children.length === 0"
    :index="''+indexKey"
  >
    <template slot="title">
      <i :class="'el-icon-'+data.icon"></i>
      <span>{{data.name}}</span>
    </template>
  </el-menu-item>

  <el-submenu
    v-else
    :index="''+indexKey"
  >
    <template slot="title">
      <i :class="'el-icon-'+data.icon"></i>
      <span>{{data.name}}</span>
    </template>
    <template v-if="data.children.length !== 0">
      <el-menu-item-group>
        <menu-component
          v-for="(item,index) in data.children"
          :key="index"
          :indexKey="item.path?item.path:index"
          :data="item"
        />
      </el-menu-item-group>
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: "menu-component",
  components: { MenuComponent: () => import("./MenuComponent") },
  props: {
    data: {
      type: Object,
      required: true,
    },
    indexKey: {
      required: true,
    },
  },
};
</script>

<style>
</style>