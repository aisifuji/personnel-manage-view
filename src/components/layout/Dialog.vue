<template>
    <div class="Dialog">
        <el-dialog :title="msg.title || '提示'"
                :visible.sync="msg.dialogVisible"
                :width="msg.width || '95%'"
                height="100%"
                :disabled="true"
                :close-on-click-modal="false"
                @close="closed"
                append-to-body>
            <slot>暂无数据</slot>
        </el-dialog>
    </div>
</template>

<script>
import TYPE from '../../store/storeType'

export default {
  props: ['msg'],
  methods: {
    closed () {
      if (this.msg.clearPkid == true) {
        this.$store.dispatch(TYPE.PKIDSET, '')
      }
    }
  }
}
</script>
<style lang="less" scoped>
    .el-dialog {
        margin: 10px auto 0px auto !important;
        height: calc(100% - 20px);
    }

    .el-dialog__body {
        height: calc(100% - 50px)
    }

    .el-dialog__body > div {
        height: 100%;
    }

    .el-tabs__content {
        padding: 0 !important;
        height: calc(100% - 40px);
        overflow-y: auto;
    }

    .el-tabs__content > div {
        height: calc(100% - 6px);
        padding: 3px 0;
    }

    .el-dialog .el-dialog__header {
        padding: 5px 10px 0 10px;
        text-align: left;
    }

    .el-dialog .el-dialog__headerbtn {
        top: 10px;
    }

    .el-dialog .el-dialog__title {
        font-size: 14px;
        line-height: 0px;
    }

    /*.el-dialog .el-dialog__body {*/
    /*    padding:0px 5px 5px 5px !important;*/
    /*}*/
</style>
