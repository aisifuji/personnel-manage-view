/**
 * Created by yz on 2018/3/7 0007.
 */
import TYPE from './storeType'

const actions = {
  // userid信息
  [TYPE.USER_ID] ({commit, state}, msg) {
    commit(TYPE.USER_ID, msg)
  },
  [TYPE.UserName] ({commit, state}, msg) {
    commit(TYPE.UserName, msg)
  },
  [TYPE.HEADTOGGLE] ({commit, state}, msg) {
    commit(TYPE.HEADTOGGLE, msg)
  },
  // 二级窗口状态控制
  [TYPE.CHILDSTATE] ({commit, state}, msg) {
    commit(TYPE.CHILDSTATE, msg)
  },
  // 一级弹出框状态控制
  [TYPE.PARENTSTATE] ({commit, state}, msg) {
    commit(TYPE.PARENTSTATE, msg)
  },
  // 设置pkid
  [TYPE.PKIDSET] ({commit, state}, msg) {
    commit(TYPE.PKIDSET, msg)
  },
  [TYPE.PKIDSET_TOW] ({commit, state}, msg) {
    commit(TYPE.PKIDSET_TOW, msg)
  },
  [TYPE.PKIDSET_THREE] ({commit, state}, msg) {
    commit(TYPE.PKIDSET_THREE, msg)
  },
  // 设置dialog
  [TYPE.DIALOG] ({commit, state}, msg) {
    commit(TYPE.DIALOG, msg)
  },
  // 存储审核流程信息
  [TYPE.REVIEW_PROCESS_INFO] ({commit, state}, msg) {
    commit(TYPE.REVIEW_PROCESS_INFO, msg)
  }
}

export default actions
