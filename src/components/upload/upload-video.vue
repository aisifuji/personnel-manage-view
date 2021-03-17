<template>
<div>
  <!-- <el-form-item label="视频上传" prop="Video">
    <el-upload class="avatar-uploader el-upload--text" :limit="limit"  :action="url"  ref="videoClearFiles" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUploadVideo">
        <video v-if="videoList[0].url !='' && videoFlag == false" :src="videoList[0].url" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
        <i v-else-if="videoList[0].url =='' && videoFlag == false" class="el-icon-plus avatar-uploader-icon"></i>
    
    </el-upload>
    <P class="text">请保证视频格式正确，且不超过10M</P>
</el-form-item> -->
  <el-upload
    :action="url"
    ref="videoClearFiles"
    list-type="picture-card"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
    :on-exceed="handleExceed"
    :before-upload="beforeUploadVideo"
    :disabled="show"
    accept=".MP4,.M4V"
    :file-list="list"
    :limit="limit"
    >
    
     <!-- <video src="https://fengtusport-xz-test.oss-cn-beijing.aliyuncs.com/xzxy_sport/platformContent/20200919/f496cb67-fd3a-4919-8cba-3082b924fa23.mp4" class="avatar" controls="controls">您的浏览器不支持视频播放</video> -->
    <i class="el-icon-plus"></i>
    </el-upload>
    
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
        show:{
            type:Boolean,
            default:false
        },
         limit:{
            type:Number,
            default:1
        },
        clearFiles:{
            type:Boolean,
            default:false
        },
    },
    watch:{
      clearFiles(val){
        if(val){

          this.videoList=[]
          console.log('videoList',this.videoList)
          this.$emit('success', this.videoList);
          this.$refs.videoClearFiles.clearFiles()
          this.$emit("update:clearFiles", false);
        }
      }
    },
    data() {
      return {
        dialogImageUrl: '',
        videoList: []
      }
    },
    methods: {
      
handleExceed(files, fileList) {
  this.$message.warning(`请最多上传 ${this.limit} 个文件。`);
},
      beforeUploadVideo(file) {
             var fileSize = file.size / 1024 / 1024 < 100;
             if (['video/mp4','video/m4v'].indexOf(file.type) == -1) {
                 this.$message({
                   message:'请上传正确的视频格式',
                   type:'error'
                 })
                 return false;
             }
             if (!fileSize) {
               this.$message({
                   message:'视频大小不能超过100MB',
                   type:'error'
                 })
                 return false;
             }
            //  this.isShowUploadVideo = false;
         },
      handleRemove(file, fileList) {
          if(file){
              _.pull(this.videoList,file.url)
            this.$emit('success', this.videoList);
          }
      },

      handleSuccess(response, file, fileList){
        if(!response.data){
             this.$message({
                   message:'图片上传失败',
                   type:'error'
                 })
                 this.$refs.videoClearFiles.clearFiles()
                 return false;
        }
        // console.log('111111',this.videoList)
          this.videoList.push(response.data)
          this.$emit('success', this.videoList);
      }
    },
}
</script>

<style lang="less" scoped>

</style>
