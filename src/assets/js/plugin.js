import Layout from '../../components/layout'
import {message, messageSuccess, messageWarn, messageError, notify, notifySuccess, notifyWarn, notifyError} from './vueGlobal'

const CCcomponents = {
  MTableList: Layout.TableList, // 表格显示公共布局
  MDialog: Layout.Dialog, // 弹出筐
}

export default {
  install (Vue) {
    /**
         * 返回上一级
         */
    Vue.prototype.goBack = () => { window.history.go(-1) }
    /**
         * 统一处理promise catch的错误
         * @param error 错误信息
         */
    Vue.prototype.handleError = (error) => { console.warn(error) }

    // 消息提示
    Vue.prototype.message = (msg) => { message(msg) }
    Vue.prototype.messageSuccess = (msg) => { messageSuccess(msg) }
    Vue.prototype.messageWarn = (msg) => { messageWarn(msg) }
    Vue.prototype.messageError = (msg) => { messageError(msg) }

    // 通知提示
    Vue.prototype.notify = (msg) => { notify(msg) }
    Vue.prototype.notifySuccess = (msg) => { notifySuccess(msg) }
    Vue.prototype.notifyWarn = (msg) => { notifyWarn(msg) }
    Vue.prototype.notifyError = (msg) => { notifyError(msg) }

   

    

  

 
    
    
  
 
    /*
        *批量注册组件
        * */
    Object.keys(CCcomponents).forEach((key) => {
      Vue.component(key, CCcomponents[key])
    })
  }
}
