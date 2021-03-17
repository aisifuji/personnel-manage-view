"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _layout = _interopRequireDefault(require("../../components/layout"));

var _vueGlobal = require("./vueGlobal");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CCcomponents = {
  MTableList: _layout["default"].TableList,
  // 表格显示公共布局
  MDialog: _layout["default"].Dialog // 弹出筐

};
var _default = {
  install: function install(Vue) {
    /**
         * 返回上一级
         */
    Vue.prototype.goBack = function () {
      window.history.go(-1);
    };
    /**
         * 统一处理promise catch的错误
         * @param error 错误信息
         */


    Vue.prototype.handleError = function (error) {
      console.warn(error);
    }; // 消息提示


    Vue.prototype.message = function (msg) {
      (0, _vueGlobal.message)(msg);
    };

    Vue.prototype.messageSuccess = function (msg) {
      (0, _vueGlobal.messageSuccess)(msg);
    };

    Vue.prototype.messageWarn = function (msg) {
      (0, _vueGlobal.messageWarn)(msg);
    };

    Vue.prototype.messageError = function (msg) {
      (0, _vueGlobal.messageError)(msg);
    }; // 通知提示


    Vue.prototype.notify = function (msg) {
      (0, _vueGlobal.notify)(msg);
    };

    Vue.prototype.notifySuccess = function (msg) {
      (0, _vueGlobal.notifySuccess)(msg);
    };

    Vue.prototype.notifyWarn = function (msg) {
      (0, _vueGlobal.notifyWarn)(msg);
    };

    Vue.prototype.notifyError = function (msg) {
      (0, _vueGlobal.notifyError)(msg);
    };
    /*
        *批量注册组件
        * */


    Object.keys(CCcomponents).forEach(function (key) {
      Vue.component(key, CCcomponents[key]);
    });
  }
};
exports["default"] = _default;