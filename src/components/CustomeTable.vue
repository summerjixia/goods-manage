<template>
  <div class="table-container">
    <el-table
      :data="data"
      tooltip-effect="dark"
      style="width: 100%"
      height='22rem'
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        width="160"
        v-for="(item,index) in filterColumn(column)"
        :key="index"
        :prop="item.code"
        :label="item.label"
      >
        <template slot-scope="scope">
          {{ !item.isClick ? scope.row[item.code] :''}}
          <el-link
            v-if="item.isClick"
            type="primary"
            @click="$emit('rowClickCb',scope.row)"
          >{{ scope.row[item.code] }}</el-link>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      layout="total, prev, pager, next"
      :total="total"
      :hide-on-single-page="total<10"
      @current-change="handleCurrentChange"
      :page-count="Math.ceil(total/10)"
      :page-size="10"
    >
    </el-pagination>
  </div>
</template>

<script>
/**
 *  :data数据[] :column列名{ code,label,isDetail: true}
 *   @selection复选框选中数组 @isDetail点中进入详情的行数据 :total分页的总数
 */
export default {
  data() {
    return {
      multipleSelection: [],
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
        this.$emit("selection", rows);
      } else {
        this.$refs.multipleTable.clearSelection();
        this.$emit("selection", []);
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit("selection", val);
    },
    filterColumn(column) {
      return column.filter((item) => {
        return item.isMainPage === true;
      });
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    column: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
    },
  },
};
</script>

<style scoped>
.table-container {
  margin-top: 0.2rem;
}
.table-container .el-pagination {
  position: absolute;
  right: 1rem;
  bottom: 0.2rem;
}
.el-table /deep/ td,th {
  padding: 0.4rem 0;
}
</style>