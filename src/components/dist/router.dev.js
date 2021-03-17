"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _des = require("../des");

var _HomePage = _interopRequireDefault(require("../pages/HomePage.vue"));

var _http = _interopRequireDefault(require("../axios/http"));

var _storeType = _interopRequireDefault(require("../store/storeType"));

var _index = _interopRequireDefault(require("../store/index"));

var _index2 = _interopRequireDefault(require("../pages/index.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 首页
_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '/',
  redirect: '/opinion'
}, {
  meta: {
    title: '首页'
  },
  path: '/home',
  name: 'home',
  component: _HomePage["default"],
  children: [// 首页
  {
    path: '/index',
    name: 'index',
    component: _index2["default"]
  }, {
    path: '/platformIndex',
    name: 'platformIndex',
    component: function component(resolve) {
      return require(['~/pages/Index/platformIndex.vue'], resolve);
    }
  }, // 平台运营首页
  // 功能单页
  {
    meta: {
      title: '绘制地图'
    },
    path: '/map',
    name: 'map',
    component: function component(resolve) {
      return require(['~/pages/map/map.vue'], resolve);
    }
  }, //地图
  {
    meta: {
      title: '巡检轨迹'
    },
    path: '/polylineMap',
    name: 'polylineMap',
    component: function component(resolve) {
      return require(['~/pages/map/polylineMap.vue'], resolve);
    }
  }, //折线地图
  {
    meta: {
      title: '查询地图'
    },
    path: '/elMap',
    name: 'elMap',
    component: function component(resolve) {
      return require(['~/components/map/el-map.vue'], resolve);
    }
  }, //查询地图
  //基础信息管理
  {
    meta: {
      title: '基础信息管理 / banner管理'
    },
    path: '/bannerManage',
    name: 'bannerManage',
    component: function component(resolve) {
      return require(['~/pages/systemManage/bannerManage/bannerManage.vue'], resolve);
    }
  }, // banner管理
  {
    meta: {
      title: '基础信息管理 / 区域管理'
    },
    path: '/regionManage',
    name: 'regionManage',
    component: function component(resolve) {
      return require(['~/pages/systemManage/regionManage/regionManage.vue'], resolve);
    }
  }, // 区域管理
  {
    meta: {
      title: '基础信息管理 / 场所管理'
    },
    path: '/placeManage',
    name: 'placeManage',
    component: function component(resolve) {
      return require(['~/pages/systemManage/placeManage/placeManage.vue'], resolve);
    }
  }, // 场所管理
  {
    meta: {
      title: '基础信息管理 / 品牌管理'
    },
    path: '/brandManage',
    name: 'brandManage',
    component: function component(resolve) {
      return require(['~/pages/systemManage/brandManage/brandManage.vue'], resolve);
    }
  }, // 品牌管理
  {
    meta: {
      title: '基础信息管理 / 物资管理'
    },
    path: '/materialManage',
    name: 'materialManage',
    component: function component(resolve) {
      return require(['~/pages/systemManage/materialManage/materialManage.vue'], resolve);
    }
  }, // 物资管理
  // 系统管理
  {
    meta: {
      title: '系统管理 / 登录日志查询'
    },
    path: '/dictionaryManage',
    name: 'dictionaryManage',
    component: function component(resolve) {
      return require(['~/pages/systemManage/dictionaryManage.vue'], resolve);
    }
  }, // 登录日志查询
  {
    meta: {
      title: '系统管理 / 数据字典组管理'
    },
    path: '/dictionaryGoupManage',
    name: 'dictionaryGoupManage',
    component: function component(resolve) {
      return require(['~/pages/systemManage/dictionaryGoupManage.vue'], resolve);
    }
  }, // 数据字典组管理
  {
    meta: {
      title: '系统管理 / 角色管理'
    },
    path: '/roleManage',
    name: 'roleManage',
    component: function component(resolve) {
      return require(['~/pages/systemManage/roleManage.vue'], resolve);
    }
  }, // 角色管理
  {
    meta: {
      title: '系统管理 / 用户管理'
    },
    path: '/userManage',
    name: 'userManage',
    component: function component(resolve) {
      return require(['~/pages/systemManage/userManage.vue'], resolve);
    }
  }, // 用户管理
  {
    meta: {
      title: '系统管理 / 部门管理'
    },
    path: '/departmentManage',
    name: 'departmentManage',
    component: function component(resolve) {
      return require(['~/pages/systemManage/departmentManage.vue'], resolve);
    }
  }, // 部门管理
  {
    meta: {
      title: '系统管理 / 资源管理'
    },
    path: '/resourceManage',
    name: 'resourceManage',
    component: function component(resolve) {
      return require(['~/pages/systemManage/resourceManage.vue'], resolve);
    }
  }, // 资源管理
  {
    meta: {
      title: '系统管理 / 二维码管理'
    },
    path: '/qrCodeManage',
    name: 'qrCodeManage',
    component: function component(resolve) {
      return require(['~/pages/systemManage/qrCodeManage/qrCodeManage.vue'], resolve);
    }
  }, // 二维码管理
  {
    meta: {
      title: '系统管理 / 预警配置'
    },
    path: '/earlyWarning',
    name: 'earlyWarning',
    component: function component(resolve) {
      return require(['~/pages/systemManage/earlyWarning/earlyWarning.vue'], resolve);
    }
  }, // 预警配置
  {
    meta: {
      title: '系统管理 / 微信用户管理'
    },
    path: '/wxUserManage',
    name: 'wxUserManage',
    component: function component(resolve) {
      return require(['~/pages/systemManage/wxUserManage/wxUserManage.vue'], resolve);
    }
  }, // 微信用户管理
  // 器材管理
  {
    meta: {
      title: '器材管理 / 器材管理'
    },
    path: '/equipmentManage',
    name: 'equipmentManage',
    component: function component(resolve) {
      return require(['~/pages/equipmentManage/equipmentManage.vue'], resolve);
    }
  }, // 器材管理
  // 器材维修
  {
    meta: {
      title: '器材维修 / 我待办的'
    },
    path: '/userAgency',
    name: 'userAgency',
    component: function component(resolve) {
      return require(['~/pages/equipmentRepair/userAgency.vue'], resolve);
    }
  }, // 我代办的
  {
    meta: {
      title: '器材维修 / 综合查询'
    },
    path: '/synthetical',
    name: 'synthetical',
    component: function component(resolve) {
      return require(['~/pages/equipmentRepair/synthetical.vue'], resolve);
    }
  }, // 综合查询
  // 器材巡检
  {
    meta: {
      title: '器材巡检 / 巡检纪录'
    },
    path: '/inspectionPlan',
    name: 'inspectionPlan',
    component: function component(resolve) {
      return require(['~/pages/Inspection/inspectionPlan.vue'], resolve);
    }
  }, // 巡检纪录
  {
    meta: {
      title: '器材巡检 / 巡检计划'
    },
    path: '/inspectionRecord',
    name: 'inspectionRecord',
    component: function component(resolve) {
      return require(['~/pages/Inspection/inspectionRecord.vue'], resolve);
    }
  }, // 巡检计划
  // 意见征集管理
  {
    meta: {
      title: '意见征集管理 / 意见征集管理'
    },
    path: '/opinion',
    name: 'opinion',
    component: function component(resolve) {
      return require(['~/pages/opinion/opinion.vue'], resolve);
    }
  }, // 意见征集管理
  // 健身指导
  {
    meta: {
      title: '健身指导 / 健身指导'
    },
    path: '/Bodybuilding',
    name: 'Bodybuilding',
    component: function component(resolve) {
      return require(['~/pages/Bodybuilding/Bodybuilding.vue'], resolve);
    }
  }, // 健身指导
  // 报废管理
  {
    meta: {
      title: '报废管理 / 报废管理'
    },
    path: '/scrapManage',
    name: 'scrapManage',
    component: function component(resolve) {
      return require(['~/pages/scrapManage/scrapManage.vue'], resolve);
    }
  }, // 报废管理
  // 统计分析
  {
    meta: {
      title: '统计分析 / 维修统计'
    },
    path: '/repair',
    name: 'repair',
    component: function component(resolve) {
      return require(['~/pages/StatisticsManage/repair.vue'], resolve);
    }
  }, // 维修统计
  {
    meta: {
      title: '统计分析 / 区域报修统计'
    },
    path: '/regionRepair',
    name: 'regionRepair',
    component: function component(resolve) {
      return require(['~/pages/StatisticsManage/regionRepair.vue'], resolve);
    }
  } // 区域报修统计
  ]
}, {
  path: '/login',
  name: 'login',
  component: function component(resolve) {
    return require(['~/pages/loginPage.vue'], resolve);
  }
}, {
  path: '/bigData',
  name: 'bigData',
  component: function component(resolve) {
    return require(['~/pages/bigData.vue'], resolve);
  }
}, {
  path: '/bulletinBoard',
  name: 'bulletinBoard',
  component: function component(resolve) {
    return require(['~/pages/bulletinBoard.vue'], resolve);
  }
} // { path: '/login', name: 'login', components: {
//     login: () => import(/* webpackChunkName: "studentAttendanceIndex" */'../pages/loginPage.vue')
//   }
// }
];
var router = new _vueRouter["default"]({
  routes: routes
}, {}); // 导航控制

router.beforeEach(function (to, from, next) {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  if (to.path === '/login') {
    sessionStorage.removeItem('user_name');
  }

  var user = sessionStorage.getItem('user_name');

  if (!user && to.path !== '/login') {
    // 若本地token不存在,则任意路由跳转的时候,重定向至login 登陆页面
    next({
      path: '/login' // query: { redirect:to.fullPath}  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由

    });
  } else {
    if (to.path == '/login') {
      next();
      return;
    }

    if (_index["default"].state.ButtonByParent.length == 0) {
      var r = Math.random();

      _http["default"].get("sysResources/getMenu", r).then(function (res) {
        if (res.data.code == 200) {
          _index["default"].commit(_storeType["default"].ROUTER_LIST, res.data.data);

          setBtns(res.data.data);
        }
      });
    } else {
      next();
    }
  }

  function setBtns(list) {
    forRouter(list, to.path);
  }

  function getBtnId(routerArr, router) {
    return new Promise(function (resolve, rej) {
      function getId(routerArr, router) {
        for (var i = 0; i < routerArr.length; i++) {
          if (routerArr[i].url == router) {
            var id = routerArr[i].id;
            resolve(id);
          }

          if (routerArr[i].children && routerArr[i].children.length > 0) {
            getId(routerArr[i].children, router);
          }
        }
      }

      getId(routerArr, router);
      resolve('');
    });
  }

  function forRouter(routerArr, router) {
    getBtnId(routerArr, router).then(function (res) {
      var id = res;

      if (!id) {
        next();
      } else {
        _http["default"].post("sysResources/getButton", {
          id: id
        }).then(function (res) {
          if (res.data.code == 200) {
            _index["default"].commit(_storeType["default"].ButtonByParent, res.data.data);

            next();
            return;
          }
        });
      }
    });
  }
});

function openNewUrl(url) {
  window.open(url, '_blank');
}

var _default = router;
exports["default"] = _default;