/**
 * Created by zzj on 2019/1/11 .
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import actions from './actions.js'
import mutations from './mutations.js'
import modules from './modules.js'
// //信息安全
// import securityInformation from './modules/securityInformation.js'
// //安全监察
// import safetyMonitor from './modules/safetyMonitor.js'
// //SAG管理
// import sagManagemen from './modules/sagManagemen.js'
// //奖惩管理
// import rewardManagement from './modules/rewardManagement.js'
// //风险管理
// import riskExpertLibrary from './modules/riskExpertLibrary.js'
// //安全责任书
// import safetyPerformanceManagement from './modules/safetyPerformanceManagement.js'
// //外站管理
// import externalStationManagement from './modules/externalStationManagement.js'
// //系统配置
// import systemConfiguration from './modules/systemConfiguration.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules
})
