<template>
  <div class="height-100 departmentManage">
    <el-row class="height-100 bg-color">
      <el-col :span="20" class="height-100 pl-5">
        <div class="xz_content">
          <M-Table-List >
            <div slot="Info">
              <el-form :inline="true" :model="searchForm" label-width="40px" size="mini">
                <el-form-item label="事项名称：">
                  <el-input v-model.trim="searchForm.itemName" :style="{width:formInputWidth}"
                            placeholder="事项名称" clearable></el-input>
                </el-form-item>
                <el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="searchClick" icon="el-icon-search">查询</el-button>
                    <el-button type="primary" @click="reactRecord" icon="el-icon-refresh">重置</el-button>
                  </el-form-item>
                </el-form-item>
              <el-form-item class="float-right">
                <span>
                  <el-button type="primary" v-if="userId == 1" @click="addInfo"  >新增代办</el-button>
                </span>
              </el-form-item>
              </el-form>
            </div>
            <div slot="TableDom">
              <el-table :data="tableData" :stripe="true" :highlight-current-row="true" style="width: 100%;" border class="xz_table" ref="xzTable">
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="itemName" label="项目名称" min-width="120" align="center"></el-table-column>
                <el-table-column prop="planTime" label="计划时间" min-width="100" align="center"></el-table-column>
                <el-table-column prop="itemContent" label="项目内容" min-width="100" align="center"></el-table-column>
                <el-table-column prop="isFinish" label="是否完成" min-width="100" align="center" :formatter="stateType"></el-table-column>
                 <el-table-column label="操作" align="center" width="200">
                  <template slot-scope="scope">
                    <span>
                      <el-link type="danger" @click="editInfo(scope.row)"  >编辑</el-link>
                      <el-link type="danger" @click="handleDelete(scope.row)"  >删除</el-link>
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div slot="Pagination">
              <pagination-Common @refreshList="onRefresList" :msg="pagination"></pagination-Common>
            </div>
          </M-Table-List>
        </div>
      </el-col>
    </el-row>
    <!--新增弹窗-->
    <div>
      <el-dialog :title="'新建代办'" :visible.sync="addDialog" :close-on-click-modal="false" custom-class="dialog-type-column1" @close="closed">
        <div class="dialog-form" :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-position="right" label-width="80px">
            <el-form-item label="项目名称：" prop="itemName">
              <el-input v-model.trim="ruleForm.itemName" :style="inputWidth" placeholder="请输入标题" style="width: 100%;" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="计划时间：" prop="planTime">
              <el-date-picker
                v-model="ruleForm.planTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="内容：" prop="itemContent">
              <el-input
                type="textarea"
                v-model="ruleForm.itemContent"
                placeholder="请在此输入内容"
                style="height: 100px; width: 90%"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否完成：" prop="leaveTp">
              <el-select v-model="ruleForm.isFinish" style="width: 100%" :style="inputWidth">
                <el-option label="否" :value="0"></el-option>
                <el-option label="是" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false" class="dialog_back_btn">返回</el-button>
          <el-button type="primary" @click="addClick" class="dialog_sure_btn" :disabled="isDisable">确 定
          </el-button>
        </div>
      </el-dialog>
    </div>

    <!--编辑弹窗-->
    <div>
      <el-dialog :title="'通知管理-编辑'" :visible.sync="editDialog" :close-on-click-modal="false" custom-class="dialog-type-column1" @close="closed">
        <div class="dialog-form" :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-position="right" label-width="80px">
            <el-form-item label="项目名称：" prop="itemName">
              <el-input v-model.trim="ruleForm.itemName" :style="inputWidth" placeholder="请输入标题" style="width: 100%;" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="计划时间：" prop="planTime">
              <el-date-picker
                v-model="ruleForm.planTime"
                type="datetime"
                placeholder="选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="内容：" prop="itemContent">
              <el-input
                type="textarea"
                v-model="ruleForm.itemContent"
                placeholder="请在此输入内容"
                style="height: 100px; width: 90%"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否完成：" prop="leaveTp">
              <el-select v-model="ruleForm.isFinish" style="width: 100%" :style="inputWidth">
                <el-option label="否" :value="0"></el-option>
                <el-option label="是" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialog = false" class="dialog_back_btn">返回</el-button>
          <el-button type="primary" @click="editClick" class="dialog_sure_btn" :disabled="isDisable" v-if="userId == 1">确 定
          </el-button>
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
    name: "agencyInfoManage",
    data() {
      return {
        inputWidth:'width:500px',
         loading:false,
        isDisable:false,
        formInputWidth: this.$store.state.fromBox.formInputWidth,
        sHeight: this.$store.state.bodyBox.tableHeight,
        pidBoxShow: false,
        userId:sessionStorage.getItem('userId'),
        selectTreeName: '',
        // 查询表单
        searchForm: {
          orgName: '',
          // parentId: "",
        },
        // 表单属性
        ruleForm: {
          id: '',
          orgName: "",
          code:"",
          sort:"",
          statusCode:"",
          parentId:'',
          pidLabel:'',
        },
        pagination: {
          pageNo: 1,
          total: 0,
          pageSize: 20
        },
        // 表单验证规则
        rules: {
          orgName: [
            {required: true, message: '请输入组织名称', trigger: ['blur','change']},
          ],
          // code: [
          //   {required: true, message: '请输入组织编码', trigger: ['blur','change']},
          // ],
          sort: [{
            type:'number',
            required: true,
            message: '请输入数字排序值',
            trigger: ['blur','change']
          }],
          parentId: [{
            required: true,
            message: '请选择上级组织',
            trigger: 'change'
          }],
          statusCode: [{
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }],
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        // 控制新增弹窗
        addDialog: false,
        // 控制编辑弹窗
        editDialog: false,
        treeData:[],
        tableData: [],
        currentTreeId: '',
        node: null,
        btns: [],
      };
    },
    created: function () {
      // this.getBtns();
      this.refreshData();
      // this.getTree();
    },
    computed: {
      btnList:function(){
        return this.$store.state.ButtonByParent;
      }
    },
    methods: {
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
        this.$axios.get("/sysOrganization/getOrganizationTree",).then(function (res) {
          if (res.data.code==200) {
            that.treeData = res.data.data;
          }
        })
      },
      stateType:function(row){
        return row.isFinish == '0' ? '未完成' : row.isFinish == '1' ? '已完成' : ''
      },
      // 查询
      searchClick: function () {
        this.pagination.pageNo=1
        this.refreshData();
      },
       // 重置信息
      reactRecord() {
        this.searchForm={
          orgName: '',
        },
        this.refreshData();
      },
      //加载树节点
      loadNode1: function (node, resolve) {

      },
      // node节点点击
      handleNodeClick(data) {
        this.searchForm.orgId = data.id;
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
      loadNode2: function (node, resolve) {

      },
      handleNodeClick2(data) {
        this.ruleForm.parentId = data.id;
        this.ruleForm.pidLabel = data.name;
        this.pidBoxShow = false;
      },
      //表格数据
      refreshData: function () {
        let that = this;
        that.tableData = [];
        // Object.assign(this.searchForm, this.pagination);
        this.searchForm.pageNo=this.pagination.pageNo;
        this.searchForm.pageSize=this.pagination.pageSize;
        this.$axios.post('/agencyInfo/queryPage', this.searchForm).then(function (res) {
          if(res.data.code==200){
            that.tableData = res.data.data.dataList;
            that.pagination.total = res.data.data.totalCount*1;
          }
        });
      },
      // 新增
      addInfo(){
        this.addDialog = true; //弹窗显示
        // this.getTree();
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
              let params=this.ruleForm;
              let that = this;
                that.loading=true;
                this.$axios.post("/agencyInfo/save", params).then(function(res) {
                  that.loading=false
                  if(res.data.code==200) {
                    that.addDialog = false;
                    that.$message({
                      message: '新增成功',
                      type: 'success',
                      duration: 1500,
                      customClass: 'xz-alert-common'
                    })
                    that.refreshData();
                    // that.getTree()
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
      // 修改
      editInfo(row){
        this.editDialog = true;//弹窗显示
        this.ruleForm=Object.assign({}, row);
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
            this.$axios.post("/agencyInfo/update", params).then(function(res) {
                that.loading=false;
                if(res.data.code==200) {
                  that.$message({
                    message: '修改成功',
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
            .post("/agencyInfo/delete", { id: row.id })
            .then(res => {
              if (res.data.code==200) {
                this.$message({
                  message: '删除成功',
                  type: 'success',
                  duration: 1500,
                  customClass: 'xz-alert-common'
                });
                this.refreshData();
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
      // 当前分页改变时
      onRefresList: function (msg) {
        this.pagination.pageNo = msg.pageNo
        this.pagination.pageSize = msg.pageSize
        this.refreshData();
      },
      leaveTp(row){
        return row.leaveTp == '1'?'病假':row.leaveTp=='2'?'年假':row.leaveTp=='3'?'调休':row.leaveTp=='4'?'婚假':row.leaveTp=='5'?'事假':''
      },
      stateCode(row){
        return row.type == '1'?'企业新闻':row.type=='2'?'企业招聘':row.type=='3'?'会议通知':row.type=='4'?"人事制度":"";
      },
      fommatetime: function (row) {
      var value=row.createTime
      var year = value.substr(0, 4)
      var month = value.substr(5, 2)
      var day = value.substr(8, 2)
      var hour = value.substr(11, 2)
      var min = value.substr(14, 2)
      var second = value.substr(17, 2)
      return year + "-" + month + "-" + day + " " + hour + ":" + min + ":"+second
      }
    }
  }
</script>

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
  /*.departmentManage .el-dialog__body {*/
  /*  max-height: 50vh;*/
  /*  overflow: auto;*/
  /*  padding:40px 40px 20px 30px !important;*/
  /*}*/
/deep/.el-form-item--small.el-form-item{
  margin-bottom: 20px;
}
</style>
