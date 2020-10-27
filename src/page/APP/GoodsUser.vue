<template>
  <div>
    <detail-component
      v-if="isDetail"
      v-on="{onSubmit,onCancel}"
      :rowData="rowData"
    />
    <div v-else>
      <el-button size="mini" type="primary" icon="el-icon-search" @click="searchOpen">搜索</el-button>
      <el-button size="mini" type="primary" icon="el-icon-edit" @click="(isDetail = true) && (rowData = null)"
      >新增</el-button>
      <el-button size="mini" type="primary" icon="el-icon-delete" @click="deleteSelectRow" >删除</el-button>
      <custome-table
        v-bind="{data:goodsUserList,column:goodsUserColumn,total}"
        v-on="{selection,rowClickCb}"
      />
    </div>
  </div>
</template>

<script>
import components from "@/components";
const { DetailComponent, CustomeTable, customeMessageBox } = components;
import { getGoodsUserInfo, deleteGoodsUserInfo, insertGoodsUserInfo,updateGoodsUserInfo } from "@/network/api";
import { goodsUserMethods } from "../mixins";
export default {
  data() {
    return {
      goodsUserList:[],
      goodsUserColumn:[],
      rowSelection:[],
      isDetail : false,
      isSearch : false,
      isAdd : false,
      rowData:{},
    };
  },
  beforeCreate() {
    getGoodsUserInfo().then(result => {
      if(result.length === 0 ) return;
      this.goodsUserList = result.data;
      this.goodsUserColumn = this.transformGoodsUserColumn(result[0]);
      this.total = result.total;
    })},
  components: {
    DetailComponent,
    CustomeTable,
  },
  mixins:[goodsUserMethods],
  methods:{
     selection(arr) {
      this.rowSelection = arr;
    },
    rowClickCb(rowData){
      this.isDetail = true;
      this.rowData = rowData
    },
    onSubmit(rowData) {
       const cb = result => {
         this.goodsUserList = result.data;
        this.total = result.count;
      };
      if(this.isDetail){
        updateGoodsUserInfo(form).then(cb);
        this.isDetail = false;
      }else if(this.isSearch){
        getGoodsUserInfoByLike(rowData).then(cb);
         this.isSearch = false;
      }else{
        insertGoodsUserInfo(this.rowData).then(cb);
        this.isAdd = false;
      }
    },
    onCancel(){
      this.isDetail = false;
      this.isAdd = false;
    },
    searchOpen(){
      customeMessageBox({
        title : "用户信息",
        message : DetailComponent,
        width : "5rem",
        height : "5rem",
        onClick:(form) => {
          this.onSubmit(form);
        }
      })
    },
    deleteSelectRow(){
       const cb = result => {
        this.goodsUserList = result.data;
        this.total = result.count;
      };
      deleteGoodsUserInfo(this.multipleSelection).then(cb);
    }
   }
  }
</script>

<style scoped>
</style>