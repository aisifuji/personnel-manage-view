/**
 * Created by yz on 2018/3/8 0008.
 */
const state = {
  // 表单元素宽度控制
  fromBox: {
    formLabelWidth: '100px',
    formInputWidth: '200px',
    formTitleWidth: '433px'
  },
  bodyBox: {
    tableHeight: '620px',
    // itemWidth:'width:22%;margin-top: 10px;margin-bottom: 10px',
    itemWidth:'margin-top: 0px;margin-bottom: 10px',
    itemLineWidth:'margin-top: 0px;margin-bottom: 10px'
  },
  // 弹出框控制信息
  dailogBox: {
    // 一级弹出框状态控制
    parentBox: {
      dialogVisible: false,
      title: '',
      pageType: ''
    },
    // 二级弹出框状态控制
    childBox: {
      dialogVisible: false,
      title: '',
      pageType: ''
    }
  },
  // PKID
  PKID: '',
  PKID_TOW: '',
  PKIDSET_THREE: 'PKIDSET_THREE', // PKID
  DIALOG: '',
  // 审核流程信息
  REVIEW_PROCESS_INFO: {},
  // 用户ID
  USER_ID: '',
  UserName: '',

  //页面配置的按钮
  ButtonByParent:[],
  editableTabs:[],
  editableTabsValue:'',
  //页面路由
  ROUTER_LIST:[],
  //学校列表
  schoolList:[],
}
export default state
