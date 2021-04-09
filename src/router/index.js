import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from '../pages/HomePage.vue'

// 首页
import axios from '../axios/http';
import TYPE from '../store/storeType';
import store from '../store/index';
Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/opinion' },
  { meta: { title: '首页' }, path: '/home', name: 'home', component: HomePage,
    children: [
      { meta: { title: '系统管理 / 角色管理' }, path: '/roleManage', name: 'roleManage', component:resolve => require(['../pages/system/roleManage.vue'],resolve)}, // 角色管理
      { meta: { title: '系统管理 / 用户管理' }, path: '/userManage', name: 'userManage', component:resolve => require(['../pages/system/userManage.vue'],resolve)}, // 用户管理
      { meta: { title: '部门管理 / 部门信息' }, path: '/departmentManage', name: 'departmentManage', component:resolve => require(['../pages/system/departmentManage.vue'],resolve)}, // 部门管理
      { meta: { title: '系统管理 / 资源管理' }, path: '/resourceManage', name: 'resourceManage', component:resolve => require(['../pages/system/resourceManage.vue'],resolve)}, // 资源管理
      { meta: { title: '考勤管理 / 假期管理' }, path: '/employeeLeaveApplyManage', name: 'employeeLeaveApplyManage', component:resolve => require(['../pages/service/employeeLeaveApplyManage.vue'],resolve)}, // 亲加单
      { meta: { title: '通知管理 / 通知管理' }, path: '/noticeInfoManage', name: 'noticeInfoManage', component:resolve => require(['../pages/service/noticeInfoManage.vue'],resolve)}, // 通知管理
      { meta: { title: '员工管理 / 员工信息' }, path: '/employeeManage', name: 'employeeManage', component:resolve => require(['../pages/service/employeeManage.vue'],resolve)}, // 员工管理
      { meta: { title: '代办管理 / 代办信息' }, path: '/agencyInfoManage', name: 'agencyInfoManage', component:resolve => require(['../pages/service/agencyInfoManage.vue'],resolve)}, // 代办管理
      { meta: { title: '资料管理 / 资料下载' }, path: '/fileInfoManage', name: 'fileInfoManage', component:resolve => require(['../pages/service/fileInfoManage.vue'],resolve)}, // 文件管理
      { meta: { title: '考勤管理 / 员工考勤管理' }, path: '/employeeWorkAttendanceManage', name: 'employeeWorkAttendanceManage', component:resolve => require(['../pages/service/employeeWorkAttendanceManage.vue'],resolve)}, // 员工考勤管理

    ]
  },
  { path: '/login', name: 'login', component:resolve => require(['../pages/LoginPage.vue'],resolve)},
  // { path: '/bulletinBoard', name: 'bulletinBoard', component:resolve => require(['~/pages/bulletinBoard.vue'],resolve)}
  // { path: '/login', name: 'login', components: {
  //     login: () => import(/* webpackChunkName: "studentAttendanceIndex" */'../pages/loginPage.vue')
  //   }
  // }
]
const router = new VueRouter({ routes: routes }, {})

// 导航控制
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.path === '/login') {
    sessionStorage.removeItem('user_name')
  }
  let user = sessionStorage.getItem('user_name')

  if (!user && to.path !== '/login') {
    // 若本地token不存在,则任意路由跳转的时候,重定向至login 登陆页面
    next({
      path: '/login',
      // query: { redirect:to.fullPath}  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
    })
  } else {
    if(to.path == '/login'){
      next();
      return;
    }
    if (store.state.ButtonByParent.length == 0) {
      var r=Math.random()
      axios.get("sysResources/getMenu",r).then(res => {
        if (res.data.code == 200) {
          store.commit(TYPE.ROUTER_LIST, res.data.data);
          next();
          // setBtns(res.data.data);
        }
      });
    } else {
      next()
    }
  }

  function setBtns(list) {
    forRouter(list, to.path);
  }
  function getBtnId(routerArr,router){
    return new Promise((resolve,rej)=>{
      function getId(routerArr,router){
        for (var i = 0; i < routerArr.length; i++) {
          if (routerArr[i].url == router) {
            var id = routerArr[i].id;
            resolve(id);
          }
          if (routerArr[i].children && routerArr[i].children.length > 0) {
            getId(routerArr[i].children, router)
          }
        }
      }
      getId(routerArr,router);
      resolve('');
    })

  }
  function forRouter(routerArr, router) {
    getBtnId(routerArr, router).then(res=>{
      var id = res;
      if(!id){
        next();
      }else{
        axios.post("sysResources/getButton",{
          id,
        }).then(res => {
          if(res.data.code == 200){
            store.commit(TYPE.ButtonByParent, res.data.data);
            next();
            return;
          }
        });
      }
    })

  }
})

function openNewUrl (url) {
  window.open(url, '_blank')
}
export default router

