import utils from './utils'
import axios from 'axios'
const webpackAPI = require('../api/webpackAPI.js')

export default{
  // login: new Promise(function (resolve, reject) {
  //   var serviceUrl = window.location.origin
  //   var ticket = utils.getCookie('ticket')
  //   if (ticket) {
  //     axios.get('/sso/validate?ticket=' + ticket + '&service=' + serviceUrl).then(response => {
  //       // console.log(response)
  //       if (response.data.indexOf('no') >= 0) {
  //         utils.setCookie('ticket', '', -10)
  //         window.location.href = webpackAPI.SSO_URL + '/sso/login?service=' + serviceUrl
  //       }
  //       resolve(/\d{5}/.exec(response.data)[0])
  //     })
  //   } else {
  //     var ticket = utils.getQueryString('ticket')
  //     if (ticket) {
  //       utils.setCookie('ticket', ticket)
  //       if (window.location.href != utils.getCookie('preUrl')) {
  //         var a = utils.getCookie('preUrl')
  //         window.location.href = utils.getCookie('preUrl')
  //       }
  //     } else {
  //       utils.setCookie('preUrl', window.location.href)
  //       window.location.href = webpackAPI.SSO_URL + '/sso/login?service=' + serviceUrl
  //     }
  //   }
  // }),
  // menu: mfid => {
  //   return new Promise((resolve, reject) => {
  //     axios.get('/menu/Restful/HMenu.ashx?systemCode=' + webpackAPI.SYSTEM_CODE + '&pcode=' + mfid).then(
  //       response => {
  //         resolve(response.data)
  //         // console.log(response.data)
  //       }
  //     )
  //   })
  // }
}
