"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _webpackApi = _interopRequireDefault(require("../api/webpackApi.js"));

var _axios = _interopRequireDefault(require("axios"));

var _elementUi = require("element-ui");

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_axios["default"].defaults.withCredentials = true; // 意思是携带cookie 信息，保持session一致

_axios["default"].interceptors.request.use(function (config) {
  // 这里的config包含每次请求的内容
  // config.headers.common['userId'] = crypto.encrypt(utils.getCookie('userId'), 'adf4DGD8hjsc8hgf')
  // console.log("1111",crypto.encrypt(utils.getCookie("userId"),"adf4DGD8hjsc8hgf"))
  // console.log("222",crypto.decrypt(crypto.encrypt(utils.getCookie("userId"),"adf4DGD8hjsc8hgf"),"adf4DGD8hjsc8hgf"))
  // 判断localStorage中是否存在api_token

  /* if (localStorage.getItem('api_token')) {
      //  存在将api_token写入 request header
      config.headers.apiToken = `${localStorage.getItem('api_token')}`;
  } */
  return config;
}, function (err) {
  return Promise.reject(err);
});

_axios["default"].interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.resolve(error.response);
});

function checkStatus(response) {
  // console.log('response',response)
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    // if(response.data.code != 200){
    // Message({
    //   message: response.data.msg || '错误',
    //   type: 'warning'
    // })
    // }
    return response;
  } else {
    return {
      data: {
        code: 500
      }
    };
  }
}

function checkCode(res) {
  // loading = this.$loading({
  //   text: '审核中.....',
  //   background: 'rgba(0, 0, 0, 0.7)'
  // });
  // let loading = Vue.prototype.$loading(API.LOADING_INFO)
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  // console.log(res.data.code)
  if (res.data.code == 1006) {
    (0, _elementUi.Message)({
      message: '登录超时,请重新登录！',
      type: 'error',
      onClose: function onClose() {
        sessionStorage.removeItem('user_name');
        window.location.reload();
      }
    });
  } else if (res.code == 500) {// window.location.reload()
  }

  return res;
} // 请求方式的配置


var _default = {
  post: function post(url, data, contentType) {
    //  post
    return (0, _axios["default"])({
      method: 'post',
      url: url,
      baseURL: _webpackApi["default"].ROOT,
      processData: false,
      contentType: false,
      // baseURL: 'http://nocs.herocheer.com/school-platform',
      data: data,
      // data:data,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': contentType || 'application/json; charset=UTF-8'
      },
      timeout: 180000
    }).then(function (response) {
      return checkStatus(response);
    }).then(function (res) {
      return checkCode(res);
    });
  },
  get: function get(url, data) {
    // get
    return (0, _axios["default"])({
      method: 'get',
      url: url,
      withCredentials: true,
      crossDomain: true,
      baseURL: _webpackApi["default"].ROOT,
      processData: false,
      contentType: false,
      // baseURL: "http://192.168.1.73",
      params: data,
      // get 请求时带的参数
      timeout: 180000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(function (response) {
      return checkStatus(response);
    }).then(function (res) {
      return checkCode(res);
    });
  },
  "delete": function _delete(url, data) {
    // get
    return (0, _axios["default"])({
      method: 'delete',
      url: url,
      withCredentials: true,
      crossDomain: true,
      baseURL: _webpackApi["default"].ROOT,
      // baseURL: "http://192.168.1.73",
      params: data,
      // get 请求时带的参数
      timeout: 180000,
      paramsSerializer: function paramsSerializer(params) {
        return _qs["default"].stringify(params, {
          indices: false
        });
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest' // 'Content-Type': 'application/json; charset=UTF-8',

      }
    }).then(function (response) {
      return checkStatus(response);
    }).then(function (res) {
      return checkCode(res);
    });
  }
};
exports["default"] = _default;
