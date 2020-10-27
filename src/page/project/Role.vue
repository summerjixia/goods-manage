<template>
  <div>
    <detail-component
      v-if="isDetail || isAdd"
      v-on="{onSubmit,onCancel}"
      v-bind="{rowData,columns:roleColumn,isSearch,isDetail,isAdd}"
    />
    <div v-else>
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-search"
        @click="searchOpen"
      >搜索</el-button>
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-edit"
        @click="(isAdd = true) && (rowData = null)"
      >新增</el-button>
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-delete"
        @click="deleteSelectRow"
      >删除</el-button>
      <custome-table
        v-bind="{data:roleList,column:roleColumn,total}"
         v-on="{selection,rowClickCb,handleCurrentChange}"
      />
      <div v-if="isSearch">
        <div id="mark-main-content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import components from "@/components";
const { detailComponent, customeTable, customeMessageBox } = components;
import {
  getRoleInfo,
  getRoleInfoByLike,
  deleteRoleInfo,
  insertRoleInfo,
  updateRoleInfo,
} from "@/network/api";
import { roleMethods } from "../mixins";
export default {
  name:"role",
  data() {
    return {
      roleList: [],
      roleColumn: [],
      rowSelection: [],
      isDetail: false,
      isSearch: false,
      isAdd: false,
      rowData: {},
      total: 0,
    };
  },
  beforeCreate() {
    getRoleInfo().then((result) => {
      if (result.length === 0) return;
      this.roleList = result.data;
      this.roleColumn = this.transformRoleColumn(result.data[0]);
      this.total = result.total;
    });
  },
  components: {
    detailComponent,
    customeTable,
  },
  mixins: [roleMethods],
  methods: {
    selection(arr) {
      this.rowSelection = arr;
    },
    rowClickCb(rowData) {
      this.isDetail = true;
      this.rowData = rowData;
    },
    onSubmit(rowData) {
      if (!this.isSearch) {
        for (let key in rowData) {
          if (!rowData[key] && rowData[key] !== 0) {
            this.$message.error("带*字段不能为空");
            return;
          }
        }
      }
      const cb = (result) => {
        this.roleList = result.data;
        this.total = result.total;
      };
      if (this.isDetail) {
        updateRoleInfo(rowData).then(cb);
        this.isDetail = false;
      } else if (this.isSearch) {
        getRoleInfoByLike(rowData).then(cb);
        this.isSearch = false;
      } else {
        insertRoleInfo(rowData).then(cb);
        this.isAdd = false;
      }
    },
    onCancel() {
      this.isDetail = false;
      this.isAdd = false;
    },
    searchOpen() {
      this.isSearch = true;
      this.$nextTick(() =>
        customeMessageBox({
          title: "角色查询",
          content: detailComponent,
          propsData: {
            props: {
              columns: this.roleColumn,
              isSearch: true,
              isDetail: false,
              isAdd: false,
            },
          },
          width: "32",
          height: "15",
          onSubmit: this.onSubmit.bind(this),
          onCancel: () => (this.isSearch = false),
        })
      );
    },
    deleteSelectRow() {
      const cb = (result) => {
        this.roleList = result.data;
        this.total = result.total;
      };
      deleteRoleInfo(this.rowSelection).then(cb);
    },
    handleCurrentChange(val) {
      getRoleInfo({ current: val }).then((result) => {
        this.userList = result.data;
        this.total = result.total;
      });
    },
  },
};
</script>

<style scoped>
</style>