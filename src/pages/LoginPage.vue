<template>
  <div class="login-view platform">
    <el-row type="flex" justify="center">
      <el-col :span="24">
        <div class="title">
          人事管理系统
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="24" >
        <div>
          <div class="login-form">
             <div class="login-title">登录</div>
               <el-divider></el-divider>
              <el-form :label-position="labelPosition" label-width="80px"  :model="formLabelAlign" :rules="rules" ref="ruleForm" :disabled="loading">
                <!-- <template v-if="activeIndex=='1'"> -->
                  <el-form-item label="账  号："  prop="loginName">
                    <el-input v-model.trim="formLabelAlign.loginName" placeholder="请输入账号" ></el-input>
                  </el-form-item>
                  <el-form-item label="密  码："  prop="password" >
                    <el-input type="password" v-model.trim="formLabelAlign.password" placeholder="请输入密码" ></el-input>
                  </el-form-item>
              </el-form>
              <el-button type="primary" class="button-bg" @click="login" v-loading="loading" element-loading-background="#0F4C75">登录</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue'
  import api from '../api/webpackAPI'
  export default {
    name: 'login',
    data() {
      let loginname = (rule, value, callback) => {
        if (value=='') {
          return  callback(new Error('请输入账号!'));
        }
        callback();
      };
      let password = (rule, value, callback) => {
        if (value=='') {
          return  callback(new Error('请输入密码!'));
        }
        callback();
      };
      return {
        imgUrl:api.ROOT,
        admin:false,
        loading:false,
        srcImg1:'',
        labelPosition: 'left',
        activeIndex:'1',
        formLabelAlign: {
          loginName: '',
          password:'',
          tel:'',
          code:''
        },
        rules:{
          loginName: [
            { validator: loginname, trigger: ['blur','change'] }
          ],
          password: [
            { validator: password, trigger: ['blur','change'] }
          ]
        }
      };
    },
    methods:{
      handleSelect(index) {
        this.formLabelAlign={
          loginName: '',
          password:'',
          code:'',
          tel:"",
        }
        if(index == '1'){
          this.activeIndex = '1'
        }else{
          this.activeIndex = '2'
        }
      },
       login(){
        if(this.formLabelAlign.loginName==''){
          this.$message({
            type: 'error',
            message: '账号不得为空'
          });
          return
        }else if(this.formLabelAlign.password==''){
          this.$message({
            type: 'error',
            message: '密码不得为空'
          });
          return
        }

        this.$axios.post('login',this.formLabelAlign).then((res) => {
          if(res.data.code==200){
            this.logging=false
            let result = res.data.data;
            // let localStorage = window.localStorage;
            // localStorage.setItem('id', result.id);
            // localStorage.setItem('user_name', result.name);
            sessionStorage.setItem('user_name', result.loginName)
            sessionStorage.setItem('userId',result.id)
            // this.$store.commit(TYPE.login,res.data.data)
            this.$router.push({path:'/home'})
            // 在请求成功后把document.onkeydown置为undefined
            document.onkeydown = undefined;
              this.$message({
                message: '登录成功!',
                type: 'success',
                duration: 1500,
                customClass: 'xz-alert-common'
              })
          }else{
                  this.$message({
                          message: res.data.msg,
                          type: 'warning'
                        });

                }
        })
      },
      getVcode(){
        console.log('getCode')
        Vue.nextTick(() => {
          let data =new Date()
        this.srcImg1=`getCode?${data}`
        })
      }
    },
    created() {
      this.getVcode()

        // this.$axios.get('getCode').then((res) => {
        // console.log('getCode',res.data)
        // this.srcImg1="getCode"
        // })
      //enter登录事件
      document.onkeydown = (e) => {
        let key = window.event.keyCode;
        if (key == 13) {
          this.login();
        }
      }
    },
    watch:{

    },
    computed:{
    }
  }
</script>

<style lang="less" scoped>
.platform /deep/.blue{
  color: #3282B7!important;
}
.el-menu{
  margin-bottom: 28px;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  color: #3282B7;
}
.el-menu.el-menu--horizontal {
    border-bottom: solid 1px rgba(153,153,153,1);
}
  .el-menu--horizontal>.el-menu-item {
    float: left;
    width: 50%;
    text-align: center;
    height: 60px;
    line-height: 60px;
    margin: 0;
    border-bottom: 2px solid transparent;
    color: #666;
    font-size: 16px;
    font-weight: 700;
  }
  .platform {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background: url(../assets/img/login_img.png) no-repeat left top;
  background-size: cover;
  }
  .login-view{
    .title {
      font-size: 60px;
      height: 35px;
      line-height: 35px;
      font-weight: bold;
      text-shadow: 0 0 5px rgba(0, 0, 0, .3);
      // padding-top: 160px;
      color: #69d6ff;
      margin: 50px 0 0 -44px;
      text-align: center;
      letter-spacing: 8px;
      margin-top: 8%;
      img{
        margin-right: 24px;
      }
    }
    .login-form {
      width: 425px;
      background: #313d84;
      color: #fff;
      padding: 30px 41px 60px 39px;
      margin: 0 auto;
      margin-top: 95px;
      box-sizing: border-box;
      background:rgba(255,255,255,1);;
      border:1px solid rgba(0,185,255,1);
      box-shadow:0px 15px 27px 0px rgba(79,78,78,0.52);
      border-radius:10px;
      .pp-code{
        display: flex;
        justify-content: flex-end;
        .send-code{
          display: inline-block;
          width:128px;
          height:46px;
          line-height: 46px;
          text-align: center;
          background:#2D97FB;
          border:1px solid #2D97FB;
          border-radius:0 4px 4px 0;
          cursor: pointer;
          font-family:Microsoft YaHei;
          font-weight:300;
          color:rgba(102,102,102,1);
        }
      }

    }
    .login-title{
      text-align: center;
      font-size: 24px;
      letter-spacing: 10px;
      color:#2E97FB;
      -webkit-background-clip:text;
      font-family:Microsoft YaHei;
      font-weight:bold;

    }
    .from-validateCode {
      display: flex;
      justify-content: end;
      align-items: center;
    }
    .validateCode{
      width: 128px;
      height: 46px;
      margin-left: 10px;
      background: #f1f1f1
    }
    .button-bg{
      margin-top: 28px;
      background: #2E97FB;
      border: none;
      display: block;
      color: #fff;
      text-align: center;
      font-size: 20px;
      letter-spacing: 15px;
      cursor: pointer;
      outline: none;
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
    .el-input{
      display: block;
    }
    .el-select{
      width: 100%;
    }
    .el-divider--horizontal{
      background:#2E97FB;
    }

    .foot-title{
      position: relative;
      bottom: -42px;
      color: #ccc;
      font-size: 1.25rem;
      letter-spacing: 5px;
      text-align: center;
    }
    .text-f .el-form-item__label{
      letter-spacing: 12px;
    }
    .forget-pas{
      font-size:12px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
      text-align: right;
      background:linear-gradient(0deg,rgba(20,81,255,1) 0.78125%, rgba(87,221,255,1) 60.888671875%, rgba(20,81,255,1) 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
    }
    .el-checkbox__label{
      font-size:12px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
      background:linear-gradient(0deg,rgba(20,81,255,1) 0.78125%, rgba(87,221,255,1) 60.888671875%, rgba(20,81,255,1) 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
    }
    .m-other{
      margin-bottom: 55px;
    }
  }
</style>

<style>

  .login-form .el-input__inner{
    font-size: 16px;
    height: 48px;
  }

  .login-form .el-form-item__label{
    font-size: 16px;
    line-height: 48px;
  }
  .login-box{
     width: 68px;
     height: 68px;
     margin: 0 auto;
  }
</style>
