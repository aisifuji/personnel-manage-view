<template>
<div  class="breadcrumb">
  <!-- 当前位置: -->
当前位置 :  <span class="text">{{this.levelList[1].name}}</span>

<!-- <el-breadcrumb separator="/" class="breadcrumb">
   
  <el-breadcrumb-item  v-for="(item,index)  in levelList" :key="index" :to="{ path:item.path }" :class="index==levelList.length-1?'.last':''">{{item.name}}</el-breadcrumb-item>
</el-breadcrumb> -->
</div>
</template>

<script>
export default {
  data() {
      return {
          levelList: null
      }
  },
  methods: {
          /**
           * 生成面包屑的方法
           */
    getBreadcrumb() {
            let matched = this.$route.matched.filter(item => item.name)
            this.levelList=matched.map((e)=>{
              return{
                name:e.meta.title,
                path:e.path,
              }
            })
    }
  },
  mounted() {
    this.getBreadcrumb();
  },
  watch: {
    $route(to, from) {
      this.getBreadcrumb();
    }
  }
}
</script>
<style ang="less">
  .breadcrumb{
    height: 50px;
    line-height: 50px;   
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #999999;
    padding-left: 23px;
  }
  .text{
    margin-left: 5px;
  }
  .last{
    
  }
</style>
