<template>
  <div class="height-100 bg-color resourceManage">
    <el-row class="height-100 bg-color">
      <el-col :span="4" class="height-100 pr5">
        <div class="xz_tree">
          <el-tree
            ref="tree"
            :props="defaultProps"
            node-key="id"
            :highlight-current="true"
            :expand-on-click-node="false"
            :check-on-click-node="true"
            :data="treeData"
            @node-click="handleNodeClick"
          >
          </el-tree>
        </div>
      </el-col>
      <el-col :span="20" class="height-100 pl-5">
        <div class="xz_content">
    <M-Table-List >
      <div slot="Info">
        <el-form :inline="true" :model="searchForm" size="mini">
          <el-form-item label="资源名称：">
            <el-input v-model.trim="searchForm.name" :style="{width:formInputWidth}"
                      placeholder="资源名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="资源类型：">
            <el-select v-model="searchForm.type" :style="{width:formInputWidth}">
              <el-option label="菜单" :value="0"></el-option>
              <el-option label="按钮" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchClick" icon="el-icon-search">查询</el-button>
            <el-button type="primary" @click="reactRecord" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
          <el-form-item class="float-right">
           <span >
             <el-button type="primary" @click="addInfo"  >新增</el-button>
          </span>
          </el-form-item>
        </el-form>
      </div>
      <div slot="TableDom">
        <el-table :data="tableData" :stripe="true" style="width: 100%" class="xz_table" border ref="xzTable" :height="sHeight">
          <el-table-column type="index" label="序号" width="55" align="center">
          </el-table-column>
          <el-table-column prop="name" label="资源名" min-width="200" align="center">
          </el-table-column>
          <el-table-column prop="type" label="资源类型" min-width="100" align="center" :formatter="stateType">
          </el-table-column>
          <el-table-column prop="url" label="url地址" min-width="200" align="center">
          </el-table-column>
          <el-table-column prop="percode" label="资源描述" min-width="200" align="center">
          </el-table-column>
          <el-table-column prop="sort" label="排序值" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="statusCode" label="状态" min-width="100" align="center" :formatter="statusCode">
          </el-table-column>
          <!-- <el-table-column prop="createTime" label="创建时间" align="center" min-width="200" ></el-table-column>
          <el-table-column prop="modifyTime" label="修改时间" align="center" min-width="200" ></el-table-column> -->
           <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <span >
              <el-link type="primary" style='margin-right:5px'  @click="editInfo(scope.row)" >编辑</el-link>
              <el-link type="danger" style="margin-right:5px"  @click="handleDelete(scope.row)"  >删除</el-link>
              <!-- <el-button type="info" @click="handleStop(scope.row)" v-if="btn.percode === 'state'">{{scope.row.statusCode == 0?'停用':'启用'}}</el-button> -->
            </span>
          </template>
        </el-table-column>
        </el-table>
      </div>
      <div slot="Pagination">
        <pagination-Common @refreshList="onRefresList" :msg="pagination"></pagination-Common>
      </div>
      <div slot="Dialog">
      </div>
    </M-Table-List>
    </div>
      </el-col>
    </el-row>

    <div >
      <!--新增弹窗-->
      <el-dialog :title="'系统资源管理-新增'" :visible.sync="addDialog" custom-class="dialog-type-column1" :close-on-click-modal="false" @close="closed">
        <div class="dialog-form" v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-position="right" label-width="80px">
            <el-form-item label="上级资源：" prop="parentId" :label-width="formLabelWidth">
              <el-input placeholder="请选择上级资源" v-model="ruleForm.pidLabel" @click.native="openPidBox" style="width: 400px;"></el-input>
              <div class="pidList" v-show="pidBoxShow">
                <el-tree
                  ref="tree2"
                  :props="defaultProps"
                  node-key="id"
                  :highlight-current="true"
                  :expand-on-click-node="false"
                  :check-on-click-node="true"
                  :data="treeData"
                  @node-click="handleNodeClick2">
                </el-tree>
              </div>
            </el-form-item>
            <el-form-item label="资源名：" prop="name" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.name" placeholder="请输入资源名" style="width: 400px;" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="资源类型：" prop="type" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.type" placeholder="请选择资源类型" style="width: 400px;">
                <el-option label="菜单" :value="0"></el-option>
                <el-option label="按钮" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="url地址：" prop="url" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.url" placeholder="请输入url地址" style="width: 400px;" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="资源描述：" prop="percode" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.percode" placeholder="请输入资源描述" style="width: 400px;" maxlength="20"></el-input>
            </el-form-item>
             <el-form-item label="icon图标：" prop="icon" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.icon  " placeholder="请输入icon" style="width: 400px;" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="排序值：" prop="sort" :label-width="formLabelWidth" >
              <el-input v-model.number.trim="ruleForm.sort" placeholder="请输入排序值" style="width: 400px;" maxlength="6"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="statusCode" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.statusCode" placeholder="请选择状态" style="width: 400px;">
                <el-option label="启用" :value="0"></el-option>
                <el-option label="停用" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false" class="dialog_back_btn">返回</el-button>
          <el-button type="primary" @click="addClick" class="dialog_sure_btn" :disabled="isDisable">保 存</el-button>
        </div>
      </el-dialog>
    </div>

    <div >
      <!--编辑弹窗-->
      <el-dialog :title="'系统资源管理-编辑'" :visible.sync="editDialog" custom-class="dialog-type-column1" :close-on-click-modal="false" @close="closed">
        <div class="dialog-form" v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-position="right" label-width="80px">
             <el-form-item label="上级资源：" prop="parentId" :label-width="formLabelWidth">
              <el-input placeholder="请选择上级资源" v-model="ruleForm.pidLabel" @click.native="openPidBox" style="width: 400px;"></el-input>
              <div class="pidList" v-show="pidBoxShow">
                <el-tree
                  ref="tree2"
                  :props="defaultProps"
                  node-key="id"
                  :highlight-current="true"
                  :expand-on-click-node="false"
                  :check-on-click-node="true"
                  :data="treeData"
                  @node-click="handleNodeClick2">
                </el-tree>
              </div>
            </el-form-item>
            <el-form-item label="资源名：" prop="name" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.name" placeholder="请输入资源名" style="width: 400px;" maxlength="32" ></el-input>
            </el-form-item>
            <el-form-item label="资源类型：" prop="type" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.type" placeholder="请选择资源类型" style="width: 400px;">
                <el-option label="菜单" :value="0"></el-option>
                <el-option label="按钮" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="url地址：" prop="url" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.url" placeholder="请输入url地址" style="width: 400px;" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="资源描述：" prop="percode" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.percode" placeholder="请输入资源描述" style="width: 400px;" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="icon图标：" prop="icon" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.icon" placeholder="请输入icon" style="width: 400px;" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="排序值：" prop="sort" :label-width="formLabelWidth" >
              <el-input v-model.number.trim="ruleForm.sort" placeholder="请输入排序值" style="width: 400px;" maxlength="6"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="statusCode" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.statusCode" placeholder="请选择状态" style="width: 400px;">
                <el-option label="启用" :value="0"></el-option>
                <el-option label="停用" :value="1"></el-option>
              </el-select>
              </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialog = false" class="dialog_back_btn">返回</el-button>
          <el-button type="primary" @click="editClick" class="dialog_sure_btn" :disabled="isDisable">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import paginationCommon from '~/components/Pagination.vue'
  import tableCommonData from "~/components/mixin/table.js";
  import API from '../../api/webpackAPI'
  export default {
    components: {paginationCommon},
    mixins: [tableCommonData],
    name: "ResourceManage",
    data() {
      return {
        inputWidth:'width:200px',
        loading:false,
        isDisable:false,
        pidBoxShow: false,
        // 控制新增弹窗
        addDialog: false,
         // 控制编辑弹窗
        editDialog: false,
        formLabelWidth: this.$store.state.fromBox.formLabelWidth,
        formInputWidth: this.$store.state.fromBox.formInputWidth,
        sHeight: this.$store.state.bodyBox.tableHeight,
        // 表单属性-- 新增和编辑
        ruleForm: {
          id: "",
          name: "",
          type: "",
          url:"",
          percode:"",
          sort:"",
          parentId:'',
          pidLabel:'',
          statusCode:'',
          icon:''
        },
        // 查询表单
        searchForm: {
          id: '',
          name: '',
          type:''
        },
        pagination: {
          pageNo: 1,
          total: 0,
          pageSize: 20
        },
        // 表单验证规则
        rules: {
          name: [
            {required: true, message: '请输入资源名', trigger: ['blur','change']},
          ],
          type: [{required: true, message: '请选择资源类型', trigger: 'change'},],
          statusCode: [{
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }],
           sort: [
            {type:'number',required: true, message: '请输入数字排序值', trigger: ['blur','change']},
          ],
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        treeData:[],
        tableData: [],
        tableItem: [],
        btns: [],
      };
    },
    computed: {
      btnList:function(){
        return this.$store.state.ButtonByParent;
      }
    },
    created: function() {
      this.refreshData();
      // this.getBtns();
      this.getTree();
    },
    methods: {
      // handleStop(row){
      //   var id=row.id
      //   var statusCode = row.statusCode == 1?0:1
      //   var url=''
      //   if(statusCode==1) {
      //     url='是否停用'
      //   }else{
      //     url='是否启用'
      //   }
      //   this.ruleForm=Object.assign({}, row);
      //   this.ruleForm.id=id
      //   this.ruleForm.statusCode=statusCode
      //   this.$confirm(url + row.name + "?", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   }).then(() => {
      //       this.$axios.post('/sysResources/updateResources',this.ruleForm).then(res=>{
      //         if(res.data.code==200){
      //           this.$message({
      //             type: "success",
      //             message: res.data.msg,
      //             duration:1500,
      //           });
      //           this.refreshData()
      //         }
      //       })
      //     }).catch(() => {});
      // },
      closed(){
        this.$refs.ruleForm.resetFields();
        this.pidBoxShow = false;
      },
      //获取页面的按钮
      getBtns() {
        var btns = this.$store.state.ButtonByParent;
        this.btns=btns;
      },
       // 权限树
      getTree: function () {
        let that = this;
        that.treeData = [];
        this.$axios.get("/sysResources/getTreeSysResources").then(function (res) {
          if (res.data.code==200) {
            that.treeData = res.data.data;
          }
        })
      },
      // node节点点击
      handleNodeClick(data) {
        this.searchForm.rpid = data.id;
        this.refreshData();
      },
      // 打开上级的下拉树
      openPidBox: function (e) {
        this.pidBoxShow = true;
        let that = this;
        //第一种方式:点击其他区域, 消失树
        document.onclick=function(){
          　that.pidBoxShow=false;
        }
        e.stopPropagation();//阻止冒泡
        //离开区域的时候树消失
        that.$refs.tree2.$el.onmouseleave = function () {
            that.pidBoxShow = false;
        }
        that.$refs.tree2.$el.onmouseleave = function () {
            that.pidBoxShow = false;
        }
      },
      handleNodeClick2(data) {
        this.ruleForm.parentId = data.id;
        this.ruleForm.pidLabel = data.name;
        this.pidBoxShow = false;
      },
      // 重置信息
      reactRecord() {
        this.searchForm = {
          name:'',
          type:''
        };
        this.refreshData();
      },
      // 确认查询
      searchClick: function() {
        this.pagination.pageNo=1
        this.refreshData();
      },
      // 表格数据
      refreshData: function() {
        this.tableData = [];
        this.tableItem = [];
        let that = this;
        // Object.assign(this.searchForm, this.pagination);
        this.searchForm.pageNo=this.pagination.pageNo
        this.searchForm.pageSize=this.pagination.pageSize
        this.$axios.post("/sysResources/findListResources", this.searchForm).then(function(res) {
          if(res.data.code==200) {
            that.tableData = res.data.data.rows;
            that.pagination.total = res.data.data.total*1;
          }
        })
      },
      // 新增
      addInfo(){
        this.addDialog = true; //弹窗显示
        this.getTree()
        this.ruleForm={}
      },
      // 新增保存
      addClick(){
        this.isDisable = true;
        setTimeout(() => {
          this.isDisable = false;
        }, 1500);
          this.$refs.ruleForm.validate(valid=>{
            if(valid){
              let params=this.ruleForm
              let that = this;
              that.loading=true
              this.$axios.post("/sysResources/saveResources", params).then(function(res) {
                that.loading=false
                if(res.data.code==200) {
                  that.$message({
                    message: '新增成功',
                    type: 'success',
                    duration: 1500,
                    customClass: 'xz-alert-common'
                  })
                  that.addDialog = false;
                  that.refreshData();
                  that.getTree()
                }
              })
            }else{
              this.$message({
              type: "warning",
              message: "请将信息填写完整",
              duration:1500
              });
            }
        })
      },
      // 编辑
      editInfo(row){
        this.editDialog = true;//弹窗显示
        this.getTree()
        this.ruleForm=Object.assign({}, row);
        if(row.parentId!=0){
          let node = this.$refs.tree.getNode(row.parentId);
          this.ruleForm.pidLabel=node.data.name
        }
      },
      editClick(){
        this.isDisable = true;
        setTimeout(() => {
        this.isDisable = false;
        }, 1500);
        this.$refs.ruleForm.validate(valid=>{
          if(valid){
             let params=this.ruleForm
            let that = this;
            that.loading=true
            this.$axios.post("/sysResources/updateResources", params).then(function(res) {
              that.loading=false
              if(res.data.code==200) {
                that.$message({
                  message: '编辑成功',
                  type: 'success',
                  duration: 1500,
                  customClass: 'xz-alert-common'
                });
                that.editDialog = false; //关闭弹窗
                that.refreshData();
                that.getTree()
              }
            })
          }else{
            this.$message({
            type: "warning",
            message: "请将信息填写完整",
            duration:1500
            });
            }
        })
      },
      // 删除
      handleDelete(row) {
      this.$confirm("即将删除选中的数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.$axios
            .post("sysResources/deleteResources", { id: row.id })
            .then(res => {
              if (res.data.code==200) {
                this.$message({
                  message: '删除成功',
                  type: 'success',
                  duration: 1500,
                  customClass: 'xz-alert-common'
                });
                this.refreshData();
                this.getTree()
              }
            });
        }).catch(() => {
          this.$message({
            showClose: true,
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 更新数据
    onRefresList (msg) {
      this.pagination.pageNo = msg.pageNo
      this.pagination.pageSize = msg.pageSize
      this.refreshData()
    },
    statusCode(row){
      return row.statusCode=='0'?'启用':row.statusCode=='1'?'停用':''
    },
    stateType(row){
      return row.type=='0'?'菜单':row.type=='1'?'按钮':''
    }
    }
  }
</script>

<style scoped>
  .pidList {
    width: 100%;
    min-height: 50px;
    padding: 10px 5px;
    background-color: #fff;
    position: absolute;
    top: 40px;
    left: 0;
    z-index: 10;
    display: inline-block;
    border: 1px solid #ccc;
  }
  .el-form-item__content{
    margin: 0 5px 0 79px !important;
  }
  .el-form-item__label{
    width: 79px !important;
    text-align: center !important;
  }
</style>
<style scoped lang="less">
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
  /deep/ .el-dialog__headerbtn{
      top: 20px;
      right: 20px;
  }
  /deep/.el-form-item__label{
  margin-right: 12px;
}
/deep/.el-form-item--small.el-form-item{
  margin-bottom: 20px;
}
</style>