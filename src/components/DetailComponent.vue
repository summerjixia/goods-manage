<template>
  <div>
    <el-form
      label-width="5rem"
      :model="form"
    >
      <el-form-item
        v-for="(item,index) in columns"
        :key="index"
        :label="item.label"
      >
        <template v-if="item.type === 'input'">
          <el-input
            v-model="form[item.code]"
            size="small"
          />
        </template>
        <template v-if="item.type === 'textarea'">
          <el-input
            v-model="form[item.code]"
            size="small"
          />
        </template>
        <template v-if="selectFilter(item.type)[0] === 'select'">
          <el-select
            v-model="form[item.code]"
            placeholder="请选择"
            size="small"
            :multiple="Boolean(selectFilter(item.type)[1])"
          >
            <el-option
              v-for="oitem in library[item.code]"
              :key="oitem.id"
              :label="oitem.text"
              :value="oitem.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-form-item>
    </el-form>
    <div
      v-if="!isSearch"
      class="button"
    >
      <el-button
        type="primary"
        size="mini"
        @click="$emit('onSubmit',form)"
      >保存</el-button>
      <el-button
        @click="$emit('onCancel')"
        size="mini"
      >返回</el-button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let { mapState } = createNamespacedHelpers("library");
export default {
  data() {
    let formData = {};
    this.columns.forEach((item) => {
      formData[item.code] = this.rowData ? this.rowData[item.code] : "";
    });
    this.rowData && (formData.id = this.rowData.id);
    let library = JSON.parse(localStorage.getItem("library"));
    return {
      form: formData,
      library,
    };
  },
  // computed: {
  //   ...mapState(["library"]),
  // },
  methods: {
    selectFilter(type) {
      let arr = type.split(".");
      return arr;
    },
  },
  props: {
    rowData: {
      type: Object,
    },
    columns: {
      type: Array,
      required: true,
    },
    isSearch: {
      type: Boolean,
    },
    isDetail: {
      type: Boolean,
    },
    isAdd: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.el-form {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.el-form .el-input {
  width: 10rem;
}
.el-form .el-select {
  width: 10rem;
}
.button {
  display: flex;
  justify-content: center;
}
</style>