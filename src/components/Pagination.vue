<template>
  <div class="pagination-box">
    <!-- <el-pagination
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="msg.pageNo"
    :page-sizes="pageSize"
    :page-size="msg.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="msg.total"
    ></el-pagination> -->
    <el-pagination
      background
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="msg.pageNo"
      :page-size="msg.pageSize"
       :page-sizes="[20,50,100,]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="msg.total"
    ></el-pagination>
  </div>
</template>

<script>

export default {
  name: "pagination",
  data() {
    return {
      pageSize: [10,50,100]
      // pageSize: API.PAGE_SIZE
      // msg:{
      //   pageSize:10,
      //   pageNo:1,
      //   total:100,
      // }
    };
  },
  props: ["msg"],

  methods: {
    //  handleCurrentChange(val) {
    //     console.log(`当前页: ${val}`);
    //   },
    handleSizeChange(val) {
      this.msg.pageSize = val;
      this.$emit("refreshList", this.msg);
    },
    handleCurrentChange(val) {
      this.msg.pageNo = val;
      this.$emit("refreshList", this.msg);
    }
  }
};
</script>
<style lang="less">
.pagination-box {
  .el-pagination .btn-next .el-icon,
  .el-pagination .btn-prev .el-icon {
    // color: #fff;
  }
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev {
    // background: linear-gradient(
    //   0deg,
    //   rgba(37, 184, 253, 1),
    //   rgba(27, 145, 254, 1)
    // );
  }
  .el-pagination__total{
    // color: #666;
    // font-weight: bold;
    // margin-left: 5px;
    font-size: 12px !important ;
  }
  .el-pagination .el-select .el-input .el-input__inner {
    border: none;
  }
}
</style>
