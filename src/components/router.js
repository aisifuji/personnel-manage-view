import Vue from 'vue'
import VueRouter from 'vue-router'
import {encryptDesNoKey, decryptDesNoKey } from '../des'

import HomePage from '../pages/HomePage.vue'

// 首页
import axios from '../axios/http';
import TYPE from '../store/storeType';
import store from '../store/index';
import index from '../pages/index.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/opinion' },
  { meta: { title: '首页' }, path: '/home', name: 'home', component: HomePage,
    children: [
        // 首页
      { path: '/index', name: 'index', component: index },
      { path: '/platformIndex', name: 'platformIndex', component:resolve => require(['~/pages/Index/platformIndex.vue'],resolve)}, // 平台运营首页
        // 功能单页
      { meta: { title: '绘制地图' }, path: '/map', name: 'map', component:resolve => require(['~/pages/map/map.vue'],resolve)}, //地图
      { meta: { title: '巡检轨迹' }, path: '/polylineMap', name: 'polylineMap', component:resolve => require(['~/pages/map/polylineMap.vue'],resolve)}, //折线地图
      { meta: { title: '查询地图' }, path: '/elMap', name: 'elMap', component:resolve => require(['~/components/map/el-map.vue'],resolve)}, //查询地图
        //基础信息管理
      { meta: { title: '基础信息管理 / banner管理' }, path: '/bannerManage', name: 'bannerManage', component:resolve => require(['~/pages/systemManage/bannerManage/bannerManage.vue'],resolve)}, // banner管理
      { meta: { title: '基础信息管理 / 区域管理' }, path: '/regionManage', name: 'regionManage', component:resolve => require(['~/pages/systemManage/regionManage/regionManage.vue'],resolve)}, // 区域管理
      { meta: { title: '基础信息管理 / 场所管理' }, path: '/placeManage', name: 'placeManage', component:resolve => require(['~/pages/systemManage/placeManage/placeManage.vue'],resolve)}, // 场所管理
      { meta: { title: '基础信息管理 / 品牌管理' }, path: '/brandManage', name: 'brandManage', component:resolve => require(['~/pages/systemManage/brandManage/brandManage.vue'],resolve)}, // 品牌管理
      { meta: { title: '基础信息管理 / 物资管理' }, path: '/materialManage', name: 'materialManage', component:resolve => require(['~/pages/systemManage/materialManage/materialManage.vue'],resolve)}, // 物资管理
        // 系统管理
      { meta: { title: '系统管理 / 登录日志查询' }, path: '/dictionaryManage', name: 'dictionaryManage', component:resolve => require(['~/pages/systemManage/dictionaryManage.vue'],resolve)}, // 登录日志查询
      { meta: { title: '系统管理 / 数据字典组管理' }, path: '/dictionaryGoupManage', name: 'dictionaryGoupManage', component:resolve => require(['~/pages/systemManage/dictionaryGoupManage.vue'],resolve)}, // 数据字典组管理
      { meta: { title: '系统管理 / 角色管理' }, path: '/roleManage', name: 'roleManage', component:resolve => require(['~/pages/systemManage/roleManage.vue'],resolve)}, // 角色管理
      { meta: { title: '系统管理 / 用户管理' }, path: '/userManage', name: 'userManage', component:resolve => require(['~/pages/systemManage/userManage.vue'],resolve)}, // 用户管理
      { meta: { title: '系统管理 / 部门管理' }, path: '/departmentManage', name: 'departmentManage', component:resolve => require(['~/pages/systemManage/departmentManage.vue'],resolve)}, // 部门管理
      { meta: { title: '系统管理 / 资源管理' }, path: '/resourceManage', name: 'resourceManage', component:resolve => require(['~/pages/systemManage/resourceManage.vue'],resolve)}, // 资源管理
      { meta: { title: '系统管理 / 二维码管理' }, path: '/qrCodeManage', name: 'qrCodeManage', component:resolve => require(['~/pages/systemManage/qrCodeManage/qrCodeManage.vue'],resolve)}, // 二维码管理
      { meta: { title: '系统管理 / 预警配置' }, path: '/earlyWarning', name: 'earlyWarning', component:resolve => require(['~/pages/systemManage/earlyWarning/earlyWarning.vue'],resolve)}, // 预警配置
      { meta: { title: '系统管理 / 微信用户管理' }, path: '/wxUserManage', name: 'wxUserManage', component:resolve => require(['~/pages/systemManage/wxUserManage/wxUserManage.vue'],resolve)}, // 微信用户管理
      // 器材管理
      { meta: { title: '器材管理 / 器材管理' }, path: '/equipmentManage', name: 'equipmentManage', component:resolve => require(['~/pages/equipmentManage/equipmentManage.vue'],resolve)} ,// 器材管理
      // 器材维修
      { meta: { title: '器材维修 / 我待办的' }, path: '/userAgency', name: 'userAgency', component:resolve => require(['~/pages/equipmentRepair/userAgency.vue'],resolve)} ,// 我代办的
      { meta: { title: '器材维修 / 综合查询' },path: '/synthetical', name: 'synthetical', component:resolve => require(['~/pages/equipmentRepair/synthetical.vue'],resolve)} ,// 综合查询
      // 器材巡检
      { meta: { title: '器材巡检 / 巡检纪录' }, path: '/inspectionPlan', name: 'inspectionPlan', component:resolve => require(['~/pages/Inspection/inspectionPlan.vue'],resolve)} ,// 巡检纪录
      { meta: { title: '器材巡检 / 巡检计划' }, path: '/inspectionRecord', name: 'inspectionRecord', component:resolve => require(['~/pages/Inspection/inspectionRecord.vue'],resolve)} ,// 巡检计划
      // 意见征集管理
      { meta: { title: '意见征集管理 / 意见征集管理' }, path: '/opinion', name: 'opinion', component:resolve => require(['~/pages/opinion/opinion.vue'],resolve)} ,// 意见征集管理
      // 健身指导
      { meta: { title: '健身指导 / 健身指导' }, path: '/Bodybuilding', name: 'Bodybuilding', component:resolve => require(['~/pages/Bodybuilding/Bodybuilding.vue'],resolve)} ,// 健身指导
      // 报废管理
      { meta: { title: '报废管理 / 报废管理' }, path: '/scrapManage', name: 'scrapManage', component:resolve => require(['~/pages/scrapManage/scrapManage.vue'],resolve)} ,// 报废管理
      // 统计分析
      { meta: { title: '统计分析 / 维修统计' }, path: '/repair', name: 'repair', component:resolve => require(['~/pages/StatisticsManage/repair.vue'],resolve)} ,// 维修统计
      { meta: { title: '统计分析 / 区域报修统计' }, path: '/regionRepair', name: 'regionRepair', component:resolve => require(['~/pages/StatisticsManage/regionRepair.vue'],resolve)} ,// 区域报修统计

    ]
  },
  { path: '/login', name: 'login', component:resolve => require(['~/pages/loginPage.vue'],resolve)},
  { path: '/bigData', name: 'bigData', component:resolve => require(['~/pages/bigData.vue'],resolve)},
  { path: '/bulletinBoard', name: 'bulletinBoard', component:resolve => require(['~/pages/bulletinBoard.vue'],resolve)}
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
          setBtns(res.data.data);
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

