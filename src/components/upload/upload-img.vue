<template>
<div>
  <el-upload
    ref="upload"
    :action="url"
    list-type="picture-card"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
    :on-preview="handlePictureCardPreview"
    :disabled="disabled"
    :on-exceed="handleExceed"
    :before-upload="beforeUploadVideo"
    :file-list="list"
    :limit="limit"
    accept=".JPG"
    >
    <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible"  append-to-body>
      <img width="100%" style="max-height: 700px;" :src="dialogImageUrl" alt="">
    </el-dialog>
    
</div>    
</template>

<script>
export default {
    props:{
        // 回显图片列表 格式[{url: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'}]
        list:{
            type:Array,
            default() {
              return []
            }
        },
        url:{
            type:String,
            default:"https://jsonplaceholder.typicode.com/posts/"
        },
        disabled:{
            type:Boolean,
            default:false
        },
        clearFiles:{
            type:Boolean,
            default:false
        },
        limit:{
            type:Number,
            default:5

        }
    },
    watch:{
      clearFiles(val){
        // console.log('11122223333',this.imgList)
        if(val){
          
          this.imgList=[]
          this.$emit('success', this.imgList);
          this.$refs.upload.clearFiles()
          this.$emit("update:clearFiles", false);
        }
      }
    },
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        imgList: []
      }
    },
    methods: {
      handleExceed(files, fileList) {
        this.$message.warning(`请最多上传 ${this.limit} 个文件。`);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
              // 
      
      // beforeUploadVideo(file) {
      //   console.log(file)
      //        if (['image/png','image/jpeg'].indexOf(file.type) == -1) {
      //             this.$message({
      //              message:'请上传正确的图片格式',
      //              type:'error'
      //            })
      //            return false;
      //        }
             
      //    },
      beforeUploadVideo(file) {
        const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        // if (!isLt2M) {
        //   this.$message.error('上传图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
        return isJPG 
      },
      handleRemove(file, fileList) {
        // console.log(111)
        // console.log(file) 

          // if(file.response.data){
          //     _.pull(this.imgList,file.response.data)
          //
          // }
        this.imgList = [];
        this.$emit('success', this.imgList);
      },

      handleSuccess(response, file, fileList){
        if(!response.data){
             this.$message({
                   message:'图片上传失败',
                   type:'error'
                 })
                 return false;
        }

        fileList.forEach((item,index)=>{
          if(item.response.code = 200){
            this.imgList.push(item.response.data.relativeFilePath)
          }
        })
          this.$emit('success', this.imgList);
      }
    },
}
</script>

<style lang="less" scoped>
// /deep/ .el-tabs__item{
//   height:56px;
//   line-height: 56px;
// }
// /deep/.el-dialog__header{
//     background-color: #fff;
//     height: 36px;
//     line-height: 36px;
//     margin-left: 14px;
//     font-size: 14px;
// }
</style>
