<template>
  <div class="height-100 bg-color roleManage">
    <M-Table-List>
      <div slot="Info">
        <el-form :inline="true" :model="searchForm" label-width="60px" size="mini">
          <el-form-item label="角色名称：">
            <el-input
              v-model.trim="searchForm.roleName"
              clearable
              placeholder="角色名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchClick" icon="el-icon-search">查询</el-button>
            <el-button type="primary" @click="reactRecord" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
          <el-form-item class="float-right">
            <span >
             <el-button type="primary" @click="addInfo" >新增</el-button>
          </span>
          </el-form-item>
        </el-form>
      </div>
      <div slot="TableDom">
        <el-table :data="tableData" :stripe="true" border   ref="xzTable">
          <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
          <el-table-column prop="roleName" label="角色名称" min-width="150" align="center"></el-table-column>
          <el-table-column prop="roleCode" label="角色编码" min-width="100" align="center"></el-table-column>
          <!-- <el-table-column prop="statusCode" label="状态" align="center" min-width="100" :formatter="statusCode"></el-table-column> -->
          <el-table-column prop="remark" label="角色描述" min-width="100" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center" min-width="100" :formatter="dateFormat"></el-table-column>
          <el-table-column prop="modifyTime" label="修改时间" align="center" min-width="100" :formatter="dateFormat" ></el-table-column>
           <el-table-column label="操作" align="center" width="400">
          <template slot-scope="scope">
            <span >
              <el-link type="primary" style='margin-right:5px'  @click="editInfo(scope.row)">编辑</el-link>
              <el-link type="danger" style='margin-right:5px' @click="handleDelete(scope.row)" >删除</el-link>
              <!-- <el-button type="info" style='margin-right:5px' @click="handleStop(scope.row)" v-if="btn.percode === 'state'">{{scope.row.statusCode == 0?'停用':'启用'}}</el-button> -->
              <el-link type="success" style='margin-right:5px' @click="permissionConfig(scope.row,1)" >功能权限</el-link>
<!--              <el-link type="success" @click="permissionConfig(scope.row,2)"  >数据权限</el-link>-->
            </span>
          </template>
        </el-table-column>
        </el-table>
      </div>
      <div slot="Pagination">
        <pagination-Common @refreshList="onRefresList" :msg="pagination"></pagination-Common>
      </div>
      <div slot="Dialog"></div>
    </M-Table-List>
    <!--新增弹窗-->
    <div>
      <el-dialog :title="'角色管理-新增'" :visible.sync="addDialog" :close-on-click-modal="false" custom-class="dialog-type-column1" @close="closed">
        <div class="dialog-form" :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-position="right" label-width="80px">
              <el-row>
                <el-col>
                  <el-form-item label="角色名称：" prop="roleName" >
                    <el-input placeholder="请输入角色名称" v-model.trim="ruleForm.roleName"  maxlength="32" :style="inputWidth"></el-input>
                  </el-form-item>
                  <el-form-item label="角色编码：" prop="roleCode" >
                    <el-input placeholder="请输入角色编码" v-model.trim="ruleForm.roleCode"  maxlength="32" :style="inputWidth"></el-input>
                  </el-form-item>
                  <el-form-item label="角色描述：" prop="remark" >
                    <el-input placeholder="请输入..." v-model="ruleForm.remark" maxlength="100" :style="inputWidth"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false" class="dialog_back_btn" style='margin-right:5px'>返回</el-button>
          <el-button type="primary" @click="addClick" class="dialog_sure_btn" :disabled="isDisable">确 定
          </el-button>
        </div>
      </el-dialog>
    </div>

    <!--编辑弹窗-->
    <div>
      <el-dialog :title="'角色管理-编辑'" :visible.sync="editDialog" :close-on-click-modal="false" custom-class="dialog-type-column1" @close="closed">
        <div class="dialog-form" :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-position="right" label-width="80px">
              <el-form-item label="角色名称：" prop="roleName" >
                <el-input placeholder="请输入角色名称" v-model.trim="ruleForm.roleName"  maxlength="32" :style="inputWidth"></el-input>
              </el-form-item>
              <el-form-item label="角色编码：" prop="roleCode" >
                <el-input placeholder="请输入角色编码" v-model.trim="ruleForm.roleCode"  maxlength="32" :style="inputWidth"></el-input>
              </el-form-item>
              <!-- <el-form-item label="状态：" prop="statusCode" >
              <el-select v-model="ruleForm.statusCode" placeholder="请选择状态" >
                <el-option label="启用" :value="0"></el-option>
                <el-option label="停用" :value="1"></el-option>
              </el-select>
              </el-form-item> -->
              <el-form-item label="角色描述：" prop="remark" >
                <el-input placeholder="请输入..." type="textarea" v-model="ruleForm.remark" maxlength="100" :style="inputWidth"></el-input>
              </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialog = false" class="dialog_back_btn" style='margin-right:5px'>返回</el-button>
          <el-button type="primary" @click="editClick" class="dialog_sure_btn" :disabled="isDisable">确 定
          </el-button>
        </div>
      </el-dialog>
    </div>

    <!--系统角色授权-->
    <div>
      <el-dialog
        :title="this.searchForm.type=='1'?'功能权限授权':this.searchForm.type=='2'?'数据权限授权':''"
        :visible.sync="permissionVisiable"
        :close-on-click-modal="false"
        custom-class="dialog-type-column1">
        <div style="height: 350px;overflow-y: scroll;padding-left: 10px; padding-right: 10px;">
          <el-row>
            <el-button size="mini" @click="AseleteAllTree" class="xz_btn xz_btn_nodelete ml-60">全选</el-button>
            <!--<el-button size="mini" @click="seleteReverseTree">反选</el-button>-->
            <el-button size="mini" @click="AcancleAllTree" class="xz_btn ml-15">清空</el-button>
          </el-row>
          <!-- 功能权限树勾选父节点-->
          <div v-if="this.searchForm.type=='1'">
            <!-- <p class="pl-60">{{this.searchForm.type=='1'?'功能权限':this.searchForm.type=='2'?'数据权限':''}}</p> -->
            <!-- <p class="pl-60">功能权限</p> -->
            <div class="pl-60 pr60">
              <el-tree
                ref="permissionTree"
                :props="defaultProps"
                node-key="id"
                :default-expand-all="true"
                :highlight-current="true"
                :check-on-click-node="true"
                :data="permissionData"
                :check-strictly="true"
                :show-checkbox="true"
                @check-change="handCheckChangeByPer"
              ></el-tree>
            </div>
          </div>
          <!-- 数据权限树不勾选父节点 -->
          <div v-else>
            <!-- <p class="pl-60">数据权限</p> -->
            <div class="pl-60 pr60">
              <el-tree
                ref="permissionTree"
                :props="defaultProps"
                node-key="id"
                :default-expand-all="true"
                :highlight-current="true"
                :check-on-click-node="true"
                :data="permissionData"
                :check-strictly="true"
                :show-checkbox="true"
              ></el-tree>
            </div>
          </div>

        </div>
        <div slot="footer" class="dialog-footer absolute-bottom">
          <el-button @click="permissionVisiable = false" class="dialog_back_btn">返回</el-button>
          <el-button @click="accredit()" class="dialog_sure_btn" >授权</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>
<script>
  import Vue from "vue";
  import paginationCommon from "~/components/Pagination.vue";
  import tableCommonData from "~/components/mixin/table.js";
  import API from '../../api/webpackAPI'
  import TYPE from '../../store/storeType';
  import _ from "lodash";
  // 引入时间戳插件
  import moment from 'moment'
export default {
  components: { paginationCommon },
  mixins: [tableCommonData],
  name: "RoleManage",
  data() {
    return {
      inputWidth:'width:500px',
      loading:false,
      isDisable:false,
      formLabelWidth: this.$store.state.fromBox.formLabelWidth,
      formInputWidth: this.$store.state.fromBox.formInputWidth,
      sHeight: this.$store.state.bodyBox.tableHeight,
      currentNodeId: "", // 记录当前点击的资源节点
      pidBoxShow: false, // 控制选择组织编号下拉
      // 部门下角色属性
      defaultProps: {
        children: "children",
        label: "name"
      },
      // 表单属性-- 新增和编辑
      ruleForm: {
        id: "",
        roleName: "",
        roleCode:"",
        statusCode:"",
        description: ""
      },
      // 表单属性-查询
      searchForm: {
        roleName: "",
      },
      pagination: {
        pageNo: 1,
        total: 0,
        pageSize: 20
      },
      // 权限分配对象
      permissionParams: {
        roleId: "",
        resourcesIds: "",
        permissionIds: "",
      },
      // 表单验证规则
      rules: {
        roleName: [{ required: true, message: "请输入角色名称", trigger: ["blur","change" ]}],
        statusCode: [{required: true,message: '请选择状态',trigger: 'change' }],
        // roleCode: [{required: true,message: '请选择角色编码',trigger: ["blur","change" ]}],
      },
      // 控制新增弹窗
       addDialog: false,
        // 控制编辑弹窗
       editDialog: false,
      tableData: [],
      btns: [],
      // 权限树是否显示
      permissionVisiable: false,
      permissionData: [],
      perAlreadyData: [],
      // 编辑、新增、删除操作之后要刷新树 需要把resolve缓存下来
      node: null,
      resolve: null
    };
  },
  computed: {
    btnList:function(){
     return this.$store.state.ButtonByParent;
    }
  },
  created (){
    // this.getBtns();
    this.refreshData2();
  },
  methods: {
    // handleStop(row){
    //   var id=row.id
    //   var statusCode = row.statusCode == 1?0:1
    //   var url=''
    //     if(statusCode==1) {
    //       url='是否停用'
    //     }else{
    //       url='是否启用'
    //   }
    //   this.ruleForm=Object.assign({}, row);
    //     this.ruleForm.id=id
    //     this.ruleForm.statusCode=statusCode
    //   this.$confirm(url + row.roleName + "?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   }).then(() => {
    //       this.$axios.post('/sysRole/updateRole',this.ruleForm).then(res=>{
    //         if(res.data.code==200){
    //           this.$message({
    //             type: "success",
    //             message: res.data.msg,
    //             duration:1500,
    //           });
    //           this.refreshData2()
    //         }
    //       })
    //     }).catch(() => {});
    // },
    // 时间格式化
    dateFormat:function(row,column){   
      var date = row[column.property];
      if(date == undefined){return ''}; 
      return moment(date).format("YYYY-MM-DD HH:mm:ss")
    },
    closed(){
      this.$refs.ruleForm.resetFields();
    },
    //获取页面的按钮
    getBtns() {
      var btns = this.$store.state.ButtonByParent;
      this.btns=btns;
    },
    // 加载表格数据-- 查询专用
    refreshData2: function() {
      this.tableData = [];
      let that = this;
      // Object.assign(this.searchForm, this.pagination);
      this.searchForm.pageNo=this.pagination.pageNo;
      this.searchForm.pageSize=this.pagination.pageSize;
      this.$axios.post("/sysRole/queryPage", this.searchForm).then(res => {
        if (res.data.code==200) {
          that.tableData = res.data.data.dataList;
          that.pagination.total = res.data.data.totalCount*1;
        }
      });
    },
    // 重置信息
    reactRecord() {
      this.searchForm={
        roleName: '',
      },
      this.refreshData2();
    },
    // 确认查询
    searchClick: function() {
      this.pagination.pageNo = 1;
      this.refreshData2();
    },
     // 新增
      addInfo(){
        this.addDialog = true; //弹窗显示
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
                this.$axios.post("/sysRole/save", params).then(function(res) {
                  that.loading=false
                  if(res.data.code==200) {
                    that.addDialog = false;
                    that.$message({
                      message: '新增成功',
                      type: 'success',
                      duration: 1500,
                      customClass: 'xz-alert-common'
                    })
                    that.refreshData2();
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
            this.$axios.post("/sysRole/update", params).then(function(res) {
                that.loading=false
                if(res.data.code==200) {
                  that.$message({
                    message: '编辑成功',
                    type: 'success',
                    duration: 1500,
                    customClass: 'xz-alert-common'
                  });
                  that.editDialog = false; //关闭弹窗
                  that.refreshData2();
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
            .post("/sysRole/delete", { id: row.id })
            .then(res => {
              if (res.data.code==200) {
                this.$message({
                  message: '删除成功',
                  type: 'success',
                  duration: 1500,
                  customClass: 'xz-alert-common'
                });
                this.refreshData2();
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
    /*************权限分配start******************/
    // 点击按钮展示权限树
    permissionConfig(row,type) {
      this.searchForm.type=type
      this.permissionVisiable = true;
      // this.permissionParams = {
      //   roleId: "",
      //   resourcesIds: "",
      //   permissionIds:''
      // };
      this.permissionParams.roleId = row.id;
      var url=''
      // type=1时为功能权限；type=2时为数据权限
      if(type==1) {
        url='/sysResources/getTreeSysResources'
      }else{
        url='/sysRoleDataPermission/getDataTree'
      }
      this.$axios.get(url).then(res => {
        if (res.data.code==200) {
          if(type==1){
            this.getGnPer(this.permissionParams.roleId);
          }else{
            this.getdataPer(this.permissionParams.roleId);
          }
          this.permissionData = res.data.data;
        }
      });
    },
    // 设置角色已经拥有功能权限为选中状态
    setPermissionCheck1: function(arr) {
      let newArray = [];
      for (let i = 0; i < arr.length; i++) {
        newArray.push(arr[i].resourcesId);
      }
      this.$refs.permissionTree.setCheckedKeys(newArray);
    },
    // 设置角色已经拥有数据权限为选中状态
    setPermissionCheck2: function(arr) {
      let newArray = [];
      for (let i = 0; i < arr.length; i++) {
        newArray.push(arr[i].permissionId);
      }
      console.log(newArray)
      this.$refs.permissionTree.setCheckedKeys(newArray);
    },
    // 获取角色已经拥有的功能权限
    getGnPer(id) {
      this.perAlreadyData = [];
      this.$axios.post("/sysResources/findRoleResources" , {id:id}).then(res => {
        if (res.data.code==200) {
          this.perAlreadyData = res.data.data;
          this.setPermissionCheck1(this.perAlreadyData);
        }
      });
    },
    // 获取角色已经拥有的数据权限
    getdataPer(id) {
      this.perAlreadyData = [];
      this.$axios.post("/sysRoleDataPermission/findRoleDataPermission" , {roleId:id}).then(res => {
        if (res.data.code==200) {
          this.perAlreadyData = res.data.data;
          this.setPermissionCheck2(this.perAlreadyData);
        }
      });
    },

    // 确认分配数据权限
    accredit() {
      let arr = this.$refs.permissionTree.getCheckedKeys();
      var url=''
      var data=''
      if(this.searchForm.type==1){
        this.permissionParams.resourcesIds = arr
        url="/sysResources/saveRoleResourceRel"
        data='功能权限'
      }else{
        let data =_.map(this.$refs.permissionTree.getCheckedNodes(),(e)=>{
        return {
          id:e.id,
          type:e.type
        }

      })
        this.permissionParams.permissionIds = data
        url="/sysRoleDataPermission/saveRoleDataPermission"
        data='数据权限'
      }
      if(arr==''){
        this.$message({
          type: "error",
          message: '不能授予空的权限',
          duration: 1500,
          customClass: "xz-alert-common"
        });
        return
      }
      this.$axios.post(url, this.permissionParams).then(res => {
        if (res.data.code==200) {
          this.permissionVisiable = false;
          this.$message({
            type: "success",
            message: data+"分配成功",
            duration: 1500,
            customClass: "xz-alert-common"
          });
          this.$store.commit(TYPE.SetSchool, []);
        }
      });
    },
    // 选中状态改变时
    handCheckChangeByPer: function (data, checked, childChecked) {
      if (checked) {
        let node = this.$refs.permissionTree.getNode(data);
        this.$refs.permissionTree.setChecked(node.parent.data, true);
      } else {
        let node = this.$refs.permissionTree.getNode(data);
        let childes = node.childNodes;
        for (let i = 0; i < childes.length; i++) {
          this.$refs.permissionTree.setChecked(childes[i].data, false);
        }
      }
    },
    // handCheckChangeByPer(data, checked, childChecked) {
    //   if (checked) {
    //     let node = this.$refs.permissionTree.getNode(data);
    //     let childes = node.childNodes;
    //     for (let i = 0; i < childes.length; i++) {
    //       this.$refs.permissionTree.setChecked(childes[i].data, true);
    //     }
    //   } else{
    //     let node = this.$refs.permissionTree.getNode(data);
    //     let childes = node.childNodes;
    //     for (let i = 0; i < childes.length; i++) {
    //       this.$refs.permissionTree.setChecked(childes[i].data, false);
    //     }
    //   }
    // },
    // 全选
    AseleteAllTree: function() {
      let arr = [];
      for (let m = 0; m < this.permissionData.length; m++) {
        // 一级
        arr.push(this.permissionData[m]);
        if (this.permissionData[m].children) {
          let temp1 = this.permissionData[m].children;
          for (let n = 0; n < temp1.length; n++) {
            // 二级
            arr.push(temp1[n]);
            if (temp1[n].children) {
              let temp2 = temp1[n].children;
              for (let k = 0; k < temp2.length; k++) {
                // 三级
                arr.push(temp2[k]);
                if (temp2[k].children) {
                  let temp3 = temp2[k].children;
                  for (let o = 0; o < temp3.length; o++) {
                    // 四级
                    arr.push(temp3[o]);
                    if(temp3[o].children){
                      let temp4=temp3[o].children;
                      for(let p=0;p<temp4.length;p++){
                        // 五级
                        arr.push(temp4[p])
                        if(temp4[p].children){
                          let temp5=temp4[p].children
                          for(let q=0;q<temp5.length;q++){
                            // 六级
                            arr.push(temp5[q])
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      this.$refs.permissionTree.setCheckedNodes(arr);
    },
    // 取消全选
    AcancleAllTree() {
      this.$refs.permissionTree.setCheckedKeys([]);
    },
    /***************功能授权end******************/
    // 更新数据
    onRefresList(msg) {
      this.pagination.pageNo = msg.pageNo;
      this.pagination.pageSize = msg.pageSize;
      this.refreshData2();
    },
    statusCode: function(row) {
      return row.statusCode == "0"? "启用": row.statusCode == "1"? "停用": "";
    },
  }
};
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
/deep/.el-form-item--small.el-form-item{
  margin-bottom: 20px;
}
</style>
