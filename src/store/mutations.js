/**
 * Created by yz on 2018/3/8 0008.
 */
import TYPE from './storeType';
import axios from '../axios/http';
import { type } from 'os';

const mutations = {
  // 用户USERID
  [TYPE.USER_ID] (state, msg) {
    state.USER_ID = msg
  },
  [TYPE.UserName] (state, msg) {
    state.UserName = msg
  },
  [TYPE.HEADTOGGLE] (state, msg) {
    state.buttonBox = msg
  },
  // 二级窗口状态控制
  [TYPE.CHILDSTATE] (state, msg) {
    state.dailogBox.childBox = msg
  },
  // 一级窗口状态控制
  [TYPE.PARENTSTATE] (state, msg) {
    state.dailogBox.parentBox = msg
  },
  // 设置pkid
  [TYPE.PKIDSET] (state, msg) {
    state.PKID = msg
  },
  [TYPE.PKIDSET_TOW] (state, msg) {
    state.PKID_TOW = msg
  },
  [TYPE.PKIDSET_THREE] (state, msg) {
    state.PKID_THREE = msg
  },
  // 设置dialog
  [TYPE.DIALOG] (state, msg) {
    state.DIALOG = msg
  },
  // 存储审核流程信息
  [TYPE.REVIEW_PROCESS_INFO] (state, msg) {
    state.REVIEW_PROCESS_INFO = msg
  },
  //存储页面按钮
  [TYPE.ButtonByParent] (state, msg) {
    state.ButtonByParent = msg
  },
  [TYPE.editableTabs] (state, msg) {
    state.editableTabs = msg
  },
  [TYPE.editableTabsValue] (state, msg) {
    state.editableTabsValue = msg
  },

  //设置页面路由
  [TYPE.ROUTER_LIST](state,msg){
    state.ROUTER_LIST = msg
  },
  //退出页面
  [TYPE.CLEAR_ALL](state,msg){
    state.ROUTER_LIST = [];
    state.ButtonByParent = [];
  },
  //设置学校列表
  [TYPE.SetSchool](state,msg){
    state.schoolList = msg;
  },
}

export default mutations
