import axios from '../axios/http';
import TYPE from '../store/storeType';
import store from '../store/index';
export default {
    //正则表达式
    checkStr(str, type) {
        switch (type) {
            case 'phone':   //手机号码
                return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
            case 'tel':     //座机
                return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
            case 'IDcard':    //身份证
                return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
            case 'pwd':     //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
                return /^[a-zA-Z]\w{5,17}$/.test(str)
            case 'postal':  //邮政编码
                return /[1-9]\d{5}(?!\d)/.test(str);
            case 'QQ':      //QQ号
                return /^[1-9][0-9]{4,9}$/.test(str);
            case 'email':   //邮箱
                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
            case 'money':   //金额(小数点2位)
                return /^\d*(?:\.\d{0,2})?$/.test(str);
            case 'URL':     //网址
                return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
            case 'IP':      //IP
                return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
            case 'date':    //日期时间
                return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
            case 'number':  //数字
                return /^[0-9]$/.test(str);
            case 'english': //英文
                return /^[a-zA-Z]+$/.test(str);
            case 'chinese': //中文
                return /^[\u4E00-\u9FA5]+$/.test(str);
            case 'lower':   //小写
                return /^[a-z]+$/.test(str);
            case 'upper':   //大写
                return /^[A-Z]+$/.test(str);
            case 'HTML':    //HTML标记
                return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
            default:
                return true;
        }
    },
    //获取学校列表
    getSchoolList() {
        return new Promise((resolve, rej) => {
            var schoolList = store.state.schoolList;
            if (schoolList.length == 0) {
                axios.get('baseSchool/findListSchool ', {}).then(res => {
                    if (res.data.code == 200) {
                        resolve(res.data.data);
                        store.commit(TYPE.SetSchool, res.data.data);
                    }
                })
            } else {
                resolve(schoolList)
            }
        })
    },
    //获取数据字典
    getDictionary(data) {
        return new Promise((resolve, rej) => {
            axios.post('sysDictionary/getDictByGroupCode', data).then(res => {
                // if (res.data.code == 200) {
                //     resolve(res.data.data.rows);
                //     store.commit(TYPE.gradeList,res.data.data.rows);
                // }
                resolve(res);
            })
        })
    }
}