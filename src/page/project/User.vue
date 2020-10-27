<template>
  <div>
    <detail-component
      v-if="isDetail || isAdd"
      v-on="{onSubmit,onCancel}"
      v-bind="{rowData,columns:userColumn,isSearch,isDetail,isAdd}"
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
        v-bind="{data:userList,column:userColumn,total}"
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
  getUserInfo,
  getUserInfoByLike,
  deleteUserInfo,
  insertUserInfo,
  updateUserInfo,
} from "@/network/api";
import { userMethods } from "../mixins";
export default {
  name:"user",
  data() {
    return {
      userList: [],
      userColumn: [],
      rowSelection: [],
      isDetail: false,
      isSearch: false,
      isAdd: false,
      rowData: {},
      total: 0,
    };
  },
  beforeCreate() {
    getUserInfo().then((result) => {
      if (result.data.length === 0) return;
      this.userList = result.data;
      this.userColumn = this.transformUserColumn(result.data[0]);
      this.total = result.total;
    });
  },
  components: {
    detailComponent,
    customeTable,
  },
  mixins: [userMethods],
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
        this.userList = result.data;
        this.total = result.total;
      };
      if (this.isDetail) {
        updateUserInfo(rowData).then(cb);
        this.isDetail = false;
      } else if (this.isSearch) {
        getUserInfoByLike(rowData).then(cb);
        this.isSearch = false;
      } else {
        insertUserInfo(rowData).then(cb);
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
          title: "员工信息",
          content: detailComponent,
          propsData: {
            props: {
              columns: this.userColumn,
              isSearch: true,
              isDetail: false,
              isAdd: false,
            },
          },
          width: "33",
          height: "17",
          onSubmit: this.onSubmit.bind(this),
          onCancel: () => (this.isSearch = false),
        })
      );
    },
    deleteSelectRow() {
      debugger;
      const cb = (result) => {
        this.userList = result.data;
        this.total = result.count;
      };
      deleteUserInfo(this.rowSelection).then(cb);
    },
    handleCurrentChange(val) {
      getUserInfo({ current: val }).then((result) => {
        this.userList = result.data;
        this.total = result.total;
      });
    },
  },
};
</script>

<style scoped>
</style>