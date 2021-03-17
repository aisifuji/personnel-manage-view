export default {
  data () {
    return {
      pagination: {
        pageNo: 1,
        total: 0,
        pageSize: 10
      }, // 分页
      formInline: {},
      tableData: [], // 表格数据
      dialogInfo: {}, // 弹出框信息
      // 输入框宽度控制
      formLabelWidth: this.$store.state.fromBox.formLabelWidth,
      formInputWidth: this.$store.state.fromBox.formInputWidth,
      sHeight: this.$store.state.bodyBox.tableHeight
    }
  }
}
