/**
 * Created by yz on 2018/3/8 0008.
 */
const TYPE = {
  // 用户id
  USER_ID: 'USER_ID',
  UserName: 'UserName',
  // 用户信息
  USER_INFO: 'USER_INFO',
  PKIDSET: 'PKIDSET', // PKID
  HEADTOGGLE: 'HEADTOGGLE',
  PARENTSTATE: 'PARENTSTATE', // 父级模态框信息
  CHILDSTATE: 'CHILDSTATE', // 子u级模态框信息
  ButtonByParent:'ButtonByParent',//页面需要的按钮
  editableTabs:'editableTabs',
  editableTabsValue:'editableTabsValue',
  ROUTER_LIST:'ROUTER_LIST',//全部路由
  CLEAR_ALL:'CLEAR_ALL',//页面退出清除路由和按钮

  //获取学校列表
  SetSchool:'SetSchool',
  //年级列表
  gradeList:'gradeList',


  // 可靠性委员会管理
  ReliabilityCommitteeManage_LastTimeTitle_Add: 'ReliabilityCommitteeManage_LastTimeTitle_Add',
  ReliabilityCommitteeManage_LastTimeTitle_INFO: 'ReliabilityCommitteeManage_LastTimeTitle_INFO',
  ReliabilityCommitteeManage_LastTimeTitle_EDIT: 'ReliabilityCommitteeManage_LastTimeTitle_EDIT',
  ReliabilityCommitteeManage_LastTimeTitle_DELETE: 'ReliabilityCommitteeManage_LastTimeTitle_DELETE',
  ReliabilityCommitteeManage_NowTitle_Add: 'ReliabilityCommitteeManage_NowTitle_Add',
  ReliabilityCommitteeManage_NowTitle_INFO: 'ReliabilityCommitteeManage_NowTitle_INFO',
  ReliabilityCommitteeManage_NowTitle_DELETE: 'ReliabilityCommitteeManage_NowTitle_DELETE',
  ReliabilityCommitteeManage_ApprovalTitle_Add: 'ReliabilityCommitteeManage_ApprovalTitle_Add',
  ReliabilityCommitteeManage_ApprovalTitle_INFO: 'ReliabilityCommitteeManage_ApprovalTitle_INFO',
  ReliabilityCommitteeManage_ApprovalTitle_DELETE: 'ReliabilityCommitteeManage_ApprovalTitle_DELETE',

  REVIEW_PROCESS_INFO: 'REVIEW_PROCESS_INFO',

  // 系统配置模块
  SYSTEMCONFIGURATION_GET_INFO: 'SYSTEMCONFIGURATION_GET_INFO'// 当前行的信息

}

export default TYPE
