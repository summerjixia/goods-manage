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
        v-bind="{data:orderList,column:orderColumn,total}"
        v-on="{selection,rowClickCb}"
      />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let { mapState } = createNamespacedHelpers("library");
import components from "@/components";
const { DetailComponent, CustomeTable, customeMessageBox } = components;
import { getOrderInfo, deleteOrderInfo, insertOrderInfo,updateOrderInfo } from "@/network/api";
import { orderMethods } from "../mixins"
export default {
  data() {
    return {
      orderList:[],
      orderColumn:[],
      rowSelection:[],
      isDetail : false,
      isSearch : false,
      isAdd : false,
      rowData:{},
    };
  },
  beforeCreate() {
    getOrderInfo().then(result => {
      if(result.length === 0 ) return;
      this.orderList = this.transOrderValue(result.data);
      this.orderColumn = this.transformOrderColumn(result[0]);
      this.total = result.total;
    })},
  components: {
    DetailComponent,
    CustomeTable,
  },
  computed:{ ...mapState(['library']) },
  mixins:[orderMethods],
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
         this.orderList = this.transOrderValue(result.data);
        this.total = result.count;
      };
      if(this.isDetail){
        updateOrderInfo(form).then(cb);
        this.isDetail = false;
      }else if(this.isSearch){
        getOrderInfoByLike(rowData).then(cb);
         this.isSearch = false;
      }else{
        insertOrderInfo(this.rowData).then(cb);
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
        this.orderList = this.transOrderValue(result.data);
        this.total = result.count;
      };
      deleteOrderInfo(this.multipleSelection).then(cb);
    }
   }
  }
</script>

<style scoped>
</style>