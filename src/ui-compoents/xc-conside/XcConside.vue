<template>
    <div class="side">
        <el-input
          v-model='areaName'
          v-if="showChild"
          :suffix-icon="showArea ==1?'el-icon-arrow-down':'el-icon-arrow-up'"
          readonly
          class="input"
          @click.native="clickArea"
          >
        </el-input>
        <div v-show="showArea ==1 && showChild">
          <div class="search-content">
            <el-input
              placeholder="搜索社区名"
              clearable
              suffix-icon="el-icon-search"
              v-model="searchValue"
              @click.native="getAreaList"
              >
            </el-input>
          </div>
          <div class="area-list" v-if="areaList.length>0">
            <div class="area-item"  :class="activeIndex == index && 'on'" v-for="(item,index) in areaList" :key="item.id">
              <p @click="activeClick(item,index)">{{item.communityNm}}</p>
            </div>
          </div>
          <div class="area-list" style="text-align: center;" v-if='areaList.length==0'>
            <p style="color:#909399">暂无数据</p>
          </div>
        </div>
        <div v-show="showArea ==2 || !showChild">
          <div class="search-content">
            <el-input
              :placeholder="showChild ? '搜索区域名' : '搜索行政区'"
              clearable
              suffix-icon="el-icon-search"
              v-model="filterText"
              >
            </el-input>
          </div>
          <div style="margin:20px;" v-show="showArea ==2 || !showChild">
            <el-tree
              ref="tree"
              :props="defaultProps"
              node-key="id"
              :highlight-current="true"
              :expand-on-click-node="showChild ? true : false"
              :check-on-click-node="true"
              :data="treeData"
              @node-click="handleNodeClick"
              :filter-node-method="filterNode"
            >
            </el-tree>
				  </div>
        </div>
    </div>
</template>

<script>
import API from '~/api/webpackAPI'
export default {
    props:{
      /**是否显示社区名 */ 
      showChild:{
        type:Boolean,
        default:true 
      }
    },
    name:'xcConside',
    data() {
        return {
            communityId:JSON.parse(sessionStorage.getItem('communityId')),
            areaName:'',
            showArea:1, // 1为显示搜索社区框，2为显示搜索区域框
            searchValue:'',
            areaList:[], // 行政区列表
            filterText:'',
            defaultProps: {
              children: 'children',
              label: 'name'
            },
            treeData:[],
            activeIndex:''
        }
    },
    methods: {
        // 显示左侧区域
      clickArea(){
        if(this.showArea ==1){
          this.showArea ++;
          this.filterText=''
        }else if(this.showArea ==2){
          this.showArea --;
          this.searchValue=''
        }
      },
      // 获取行政区数据
      getAreaList(){
        this.searchAreaName={
          areaCode:this.areaCode,
          communityName:''
        }
        if(this.searchValue){
          this.searchAreaName.communityName=this.searchValue
          let url='v1/sys/building/getCommunityList'
          let data=this.$encryptDesNoKey(JSON.stringify(this.searchAreaName))
          this.$axios.post(url,{data:data}).then(res=> {
            let data=JSON.parse(this.$decryptDesNoKey(res.data));
            if (data.code==200) {
              this.areaList = data.data;
            }
          })
        }
      },
      // node节点点击
      handleNodeClick(data) {
        if(this.showChild) {
          if(data.children==null){
            this.searchValue=''
            this.areaName=data.name
            this.areaCode=data.id
            this.getCommunityList(data.id)
          }
        }else{
          // sessionStorage.setItem('area_code',data.id);
          // sessionStorage.setItem('area_name',data.name);
          this.$emit('getCode',data.id)
        }
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      // 省市区三级树
      getTree() {
        this.$axios.post("v1/sys/CommunityManagerController/getCommunityNode").then(res=> {
          let data=JSON.parse(this.$decryptDesNoKey(res.data));
          if (data.code==200) {
            this.treeData = data.data;
          }
        })
      },
      // 社区列表
      getCommunityList(code){
        this.activeIndex=null
        let obj={
          code:code,
          current:1,
          size:99999
        }
        let params=this.$encryptDesNoKey(JSON.stringify(obj))
        this.$axios.post("v1/sys/CommunityManagerController/getCommunityList",{data:params}).then(res=> {
          let data=JSON.parse(this.$decryptDesNoKey(res.data));
          if(data.code==200) {
            this.showArea=1
            this.areaList = data.data.list;
            this.areaList.forEach((item,index)=>{
              if(this.communityId==item.id){
                this.activeIndex= index
              }
            })
          }
        })
      },
      activeClick(item,index){
        this.activeIndex=index
        this.communityNm=item.communityNm
        this.communityId=item.id
        this.updateArea()
        this.$emit('getId',item.id)
      },
      updateArea(){
        let obj={
          areaName:this.areaName,
          areaCode:this.areaCode,
          communityId:this.communityId,
          userId:sessionStorage.getItem('userId')
        }
        let params=this.$encryptDesNoKey(JSON.stringify(obj))
        this.$axios.post("v1/sys/SysUserController/updateArea",{data:params}).then(res=> {
          let data=JSON.parse(this.$decryptDesNoKey(res.data));
          if(data.code==200) {
            sessionStorage.setItem('area_code',data.data.areaCode);
            sessionStorage.setItem('area_name',data.data.areaName);
            sessionStorage.setItem('communityId',data.data.communityId);
          }
        })
      },
    },
    created() {
      if(this.showChild) {
        this.areaName = sessionStorage.getItem('area_name');
        this.areaCode = sessionStorage.getItem('area_code');
      }
      this.getTree();
      this.getCommunityList(this.areaCode);
    },
}
</script>

<style lang="less" scoped>
.side{
    .input{
      /deep/.el-input__inner{
        cursor: pointer;
        height: 64px;
        border: 0;
        border-radius: 0;
        border-bottom: 1px solid #EEEEEE;
      }
      /deep/.el-input__icon{
        color: #999999;
        font-weight: bold;
        font-size: 14px;
      }
    }
    .search-content{
      padding: 20px 20px 0 20px;
      /deep/.el-input__inner{
        background: #f2f2f2;
        border-radius: 16px;
        border: 0;
      }
    }
    .area-list{
      margin-top: 20px;
      .area-item{
        cursor: pointer;
        color: #333333;
        font-size: 14px;
        line-height: 30px;
        padding: 0 20px;
      }
    }
    .look-img{
      // width: 100%;
      max-height: 600px;
    }
} 
.on{
    background: #F5F7FA;
}
</style>
