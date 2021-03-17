<template>
<div>
   <div class="video-cover" @click="dialogVisible=true">
       <img class="video-img" :src="srcImg" alt="">
   </div>
    <el-dialog :visible.sync="dialogVisible"  append-to-body title="视频播放">
        <div class="video-item">
       <video ref="video" controls controlslist="nodownload"
             width="600px" height="280px"  :src="srcVideo">
       </video>
   </div>
    </el-dialog>
</div>
</template>

<script>
export default {
    props:{
        srcVideo:{
            type:String,

        },
        srcImg:{
            type:String,
            default:''

        },
    },
    data() {
      return {
        dialogVisible:false,
        dialogImageUrl: '',
        imgList: []
      }
    },
    methods: {

    },
}
</script>

<style lang="less" scoped>
.video{
    &-cover{
        width: 80px;
        height: 80px;
        margin-left: 10px;
        cursor: pointer
    }
    &-img{
        width: 80px;
        height: 80px;
        max-width: 80px;
        max-height: 80px;
        border-radius: 4px;
    }
    &-item{
        display: flex;
        justify-content: center;
        margin-bottom: 0px;
        width: 600px;
        height: 300px;
        margin: 10px 10px 10px 20px;
    }
}
/deep/.el-form-item__label{
  margin-right: 12px;
}
/deep/ .el-dialog__headerbtn{
  top: 20px;
  right: 20px;
}
/deep/ .el-tabs__item{
  height:56px;
  line-height: 56px;
}
/deep/ .el-dialog__header{
    background-color: #fff;
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid #eee;
    padding-left: 20px;
    font-size: 14px;
}
</style>
