
import moment from 'moment'
export default {
  setCookie: function (c_name, value, expireSeconds) {
    var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1
    var isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
    var expirestr = (isIE || isIE11) ? 'At the end of the Session' : 'session'
    if (typeof expireSeconds === 'number') {
      var exdate = moment().add('second', expireSeconds)
      expirestr = exdate.toDate().toGMTString()
    }
    document.cookie = c_name + '=' + encodeURI(value) + ';expires=' + expirestr
  },
  getCookie: function (c_name) {
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(c_name + '=')
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1
        var c_end = document.cookie.indexOf(';', c_start)
        if (c_end == -1) c_end = document.cookie.length
        return decodeURI(document.cookie.substring(c_start, c_end))
      }
    }
    return ''
  },
  getQueryString: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return decodeURI(r[2])
    return null
  }
}
