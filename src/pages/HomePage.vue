<template>
  <el-container id="app">
    <el-header id="app-header" style="height:60px;line-height: 50px;" v-show="headFlag">
      <div id="app-header-system">
        <img src="../assets/img/xal-logo.png" style="height: 28px;width: 30px;margin-right: 0px;margin-left: 15px;"/>
        <span>人事管理平台</span>
      </div>
      <i style="margin-left:5px;margin-top: 20px;cursor: pointer;color:#409EFF" :class="tableShow?'el-icon-s-fold':'el-icon-s-unfold'" @click="clickIcon"></i>
      <div id="app-header-user">
        <ul>
          <!-- <li class="name">
            <div>
              欢迎您：
              <i class="el-icon-s-custom"></i>
              {{userInfo.LoginName}}
            </div>
          </li> -->
          <li class="headLiBox" @click="changePassword">
            <div class="news">
              <i class="el-icon-message-solid"></i>
            消息提醒
            <el-badge  class="item" >
            </el-badge>
            </div>
          </li>
          <!--<li class="headLiBox" @click="changePassword">修改密码</li>-->
          <li class="headLiBox" @click="cancelInfo" style="line-height:64px">
            <i class="el-icon-switch-button"></i>
            注销
          </li>
        </ul>
      </div>
    </el-header>
    <el-container>
        <el-aside id="app-aside" v-show="tableShow" width="240px" :class="!headFlag && 'no-head'">
            <menu-component :menu="user.menuList"></menu-component>
        </el-aside>
      <el-main class="app-main" :style="{height:headFlag ? 'calc(100vh - 50px)' : '100vh'}">
          <breadcrumb>
          </breadcrumb>
        <transition name="el-fade-in-linear">
          <router-view :headFlag.sync="headFlag"></router-view>
        </transition>
      </el-main>
    </el-container>
    <!-- 修改密码 -->
    <div>
      <el-dialog
        title="修改密码"
        custom-class="dialog-type-column2"
        :visible.sync="passwordDialog"
        :close-on-click-modal="false"
        @close="closed"
        width="550px"
      >
        <div :v-loading="loading">
          <el-form
            :model="passwordForm"
            ref="passwordForm"
            label-position="right"
            label-width="110px"
            :rules="passwordRules"
          >
            <el-form-item label="原密码：" prop="oldPassword" :label-width="formLabelWidth">
              <el-input
                placeholder="原密码"
                v-model.trim="passwordForm.oldPassword"
                style="width: 320px"
                maxlength="32"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码：" prop="password" :label-width="formLabelWidth">
              <el-input
                placeholder="请输入密码"
                v-model.trim="passwordForm.password"
                style="width: 320px"
                maxlength="32"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item label="重复密码：" prop="repeatPassword" :label-width="formLabelWidth">
              <el-input
                placeholder="请输入密码"
                v-model.trim="passwordForm.repeatPassword"
                style="width: 320px"
                maxlength="32"
                type="password"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="passwordDialog = false"
            class="dialog_back_btn"
            style="margin-right:5px"
          >返回</el-button>
          <el-button type="primary" @click="savePassword" class="dialog_sure_btn">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </el-container>
</template>
<script>
import Vue from "vue";
import MenuComponent from "../components/MenuComponent.vue";
import ssoutil from "../components/ssoutil";
import utils from "../components/utils";
import breadcrumb from "./breadcrumb.vue";
// storeType
import TYPE from "../store/storeType";

export default {
  components: { MenuComponent,breadcrumb},
  data() {
    return {
      headFlag:true,
      tableShow:true,
      editableTabsValue: "",
      editableTabs: [],
      formLabelWidth: "120px",
      user: {
        mfId: "",
        menuList: []
      },
      CarrierValue: "3",
      userInfo: {
        UserId: "",
        UserName: "",
        Office: "",
        Carrier: [
          {
            value: "3",
            label: "校园体育"
          },
          {
            value: "2",
            label: "校园安全"
          }
        ]
      },
      loading: false, //修改密码加载中
      // 修改密码弹窗
      passwordDialog: false,
      //修改密码的参数
      passwordForm: {
        id: "",
        loginName: "",
        password: "",
        oldPassword: "",
        repeatPassword: "",
        userType:'',
      },
      // 修改密码的必填项校验
      passwordRules: {
        oldPassword: [
          {
            required: true,
            message: "请输入原密码",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: ["blur", "change"] }
        ],
        repeatPassword: [
          { required: true, message: "请输入密码", trigger: ["blur", "change"] }
        ]
      }
    };
  },
  methods: {
    clickIcon(){
      this.tableShow = !this.tableShow
    },
    //保存修改密码
    savePassword() {
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          if (this.passwordForm.password == this.passwordForm.repeatPassword) {
            this.passwordForm.id = sessionStorage.getItem("userId");
            this.passwordForm.loginName = sessionStorage.getItem("user_name");
            this.passwordForm.userType = sessionStorage.getItem('userType');
            this.$axios
              .post("sysUser/updatePasswordNew", this.passwordForm)
              .then(res => {
                if (res.data.code == 200) {
                  this.passwordDialog = false;
                  this.$message({
                    type: "success",
                    message: "修改成功",
                    duration: 1500
                  });
                }
              });
          }
        } else {
          this.$message({
            type: "warning",
            message: "请完善信息",
            duration: 1500
          });
        }
      });
    },
    //消息模板
    changePassword() {
      // this.passwordDialog = true;
      console.log('消息模板')
    },

    closed() {
      this.$refs.passwordForm.resetFields();
    },


    /** **清除缓存END****/
    // 注销
    cancelInfo() {
      this.$confirm("是否确定注销?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.get("/logout").then(res => {
          // let data=JSON.parse(this.$decryptDesNoKey(res.data));
            if ((res.data.code == 200)) {
              this.$message({
                type: "success",
                message: "注销成功!"
              });
              this.$router.push("login");
              this.$store.commit(TYPE.CLEAR_ALL);
              this.$store.commit(TYPE.editableTabs, []);
              this.$store.commit(TYPE.SetSchool, []);
            }
          });
        })
        .catch(() => {
          // this.$message({
          //   showClose: true,
          //   type: "info",
          //   message: "已取消注销"
          // });
        });
    },
    // 提前存储所有下拉选择数据
    getSelectCode() {
      // 存在缓存数据用缓存数据
      if (
        this.$manageSessionStorage({ type: "has", text: "SelectColdeAll" })
          .isStatus
      ) {
        let UserInfos = this.$manageSessionStorage({
          type: "get",
          text: "UserInfo"
        }).value;
        // 存储用户信息
        this.userInfo = UserInfos;
        this.$store.dispatch(TYPE.UserName, UserInfos.UserName);
        return false;
      }
      // 请求数据
      this.$axios.get(API.COMMON_INFO_SOURCE, {}).then(res => {
        let data = res.data;
        let office_value = data.Office;
        let office_Index = office_value.indexOf("_");
        let NEW_Office = office_value.substring(office_Index + 1);
        // 将用户信息存储到sessionStorage中
        (this.userInfo.UserId = data.UserId),
          (this.userInfo.UserName = data.UserName),
          (this.userInfo.Office = NEW_Office),
          this.$store.dispatch(TYPE.UserName, data.UserName);
        // 存储用户信息
        // 将数据存储到sessionStorage中
        this.$manageSessionStorage({
          type: "add",
          text: "SelectColdeAll",
          value: data.CodeList
        });
        this.$manageSessionStorage({
          type: "add",
          text: "UserInfo",
          value: this.userInfo
        });
      });
    },
    // 一进入页面设置按钮
    setBtns() {
      var list = this.user.menuList;
      var router = this.$route.path;
      this.forRouter(list, router);
    },
    // 对路由进行循环判断
    forRouter(routerArr, router) {
      for (var i = 0; i < routerArr.length; i++) {
        if (routerArr[i].url == router) {
          this.$store.commit(TYPE.ButtonByParent, routerArr[i]);
          return;
        }
        if (routerArr[i].children && routerArr[i].children.length > 0) {
          this.forRouter(routerArr[i].children, router);
        }
      }
    }
  },
  created() {
    this.userInfo.LoginName = sessionStorage.getItem("user_name");
    // console.log(this.userInfo.LoginName);
    // this.$axios.get("permission/getMenu").then(res => {
    //   if (res.data.code == 200) {
    //     this.user.menuList=res.data.result
    //     // this.setBtns();
    //   }
    // });
    //新代码注释
    this.user.menuList = this.$store.state.ROUTER_LIST;
    this.editableTabs = this.$store.state.editableTabs;
  },
  computed: {
    // 获取最新数据
    listenDataUSER_ID() {
      return this.$store.state.USER_ID;
    },
    editableTab() {
      return this.$store.state.editableTabs;
    },
    editableTabsV() {
      return this.$store.state.editableTabsValue;
    }
  },
  watch: {
    // 监听用户信息 改变重新请求数据
    editableTab: function() {
      // 请求下拉选择数据
      // this.getSelectCode()
      this.editableTabs = this.editableTab;
    },
    editableTabsV: function() {
      // 请求下拉选择数据
      // this.getSelectCode()
      this.editableTabsValue = this.editableTabsV;
    }
  }
};
</script>

<style lang="less">

.news{
    height: 37px;
    padding: 0 7px;
    line-height: 37px;
    /* border-left: 2px dashed;
    border-right: 2px dashed; */
}
#app {
  font-family: Helvetica, sans-serif;
  height: 100%;
}
#app-header {
  background-color: #00060C;
  color: white;
  font-size: 18px;
  vertical-align: center;
}
.app-main{
  min-width: 1280px;
}
/* #app-header div {
  height: 100%;
} */

#app-header-system {
  float: left;
  height: 100%;
  font-weight: bold;
  letter-spacing: 3px;
}

#app-header-system span,
#app-header-system img {
  display: inline-block;
  vertical-align: middle;
}
#app-header-user {
  float: right;
}
#app-header-user ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
}
#app-header-user ul li {
  /* display: inline-table;
  height: 44px;
  line-height: 44px; */
  padding: 0 5px;
  overflow: hidden;
  font-size: 14px;
}
#app-header-user ul .name {
  margin-right: 20px;
  color: #67c23a;
}
#app-header-user ul li.headLiBox:hover {
  /* background: #143358; */
  cursor: pointer;
  /* color: #e6a23c; */
}
#app-header-user .cairrBox {
  width: 110px;
}

#app-aside {
  width: 240px;
  overflow: hidden;
  overflow-y: auto;
  background: #001931;
  height: calc(100vh - 50px);
}
#app-aside::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
#app-aside {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}

#app-header .headLiBox img {
  position: relative;
  top: 10px;
  height: 26px;
}

.headPopver button {
  display: inline-block;
  height: 100%;
  padding: 0;
  background: none;
  border: none;
}
.headPopver button:hover {
  background: none;
}
.headLiBox span {
  display: inline-block;
  height: 100%;
}
.no-head{
  height: 100vh !important;
}
</style>
