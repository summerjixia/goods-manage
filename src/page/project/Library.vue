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
        v-bind="{data:libraryList,column:libraryColumn,total}"
        v-on="{selection,rowClickCb}"
      />
    </div>
  </div>
</template>

<script>
import components from "@/components";
const { DetailComponent, CustomeTable, customeMessageBox } = components;
import { getLibraryInfo, deleteLibraryInfo, insertLibraryInfo,updateLibraryInfo } from "@/network/api";
import { libraryMethods } from "../mixins"
export default {
  data() {
    return {
      libraryList:[],
      libraryColumn:[],
      rowSelection:[],
      isDetail : false,
      isSearch : false,
      isAdd : false,
      rowData:{},
    };
  },
  beforeCreate() {
    getLibraryInfo().then(result => {
      if(result.length === 0 ) return;
      this.libraryList = result.data;
      this.libraryColumn = this.transformLibraryColumn(result[0]);
      this.total = result.total;
    })},
  components: {
    DetailComponent,
    CustomeTable,
  },
  mixins:[libraryMethods],
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
         this.libraryList = result.data;
        this.total = result.count;
      };
      if(this.isDetail){
        updateLibraryInfo(form).then(cb);
        this.isDetail = false;
      }else if(this.isSearch){
        getLibraryInfoByLike(rowData).then(cb);
         this.isSearch = false;
      }else{
        insertLibraryInfo(this.rowData).then(cb);
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
        this.libraryList = result.data;
        this.total = result.count;
      };
      deleteLibraryInfo(this.multipleSelection).then(cb);
    }
   }
  }
</script>

<style scoped>
</style>