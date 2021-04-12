

const base_dev = 'http://localhost:8009/';

const img_url = 'http://localhost:8009/common/showFile';

const test_prod = 'http://192.168.100.126:9120/sport-manager/'//测试环境

 const base_prod = 'http://192.168.100.126:9120/sport-manager/'//目前正式环境
// 开发配置
const dev = {
  ROOT: base_dev,
  // img_url: base_dev.substring(0,base_dev.length-4)
  img_url: img_url
}

// 生产测试配置
const prod_test = {
  // 配置根路劲
  ROOT: test_prod , // 测试环境
  // img_url: test_prod.substring(0,test_prod.length-4)
  img_url: base_dev
}

// 正式生产配置
const prod = {
  // 配置根路劲
  ROOT: base_prod ,
  // img_url: base_prod.substring(0,base_prod.length-4)
  img_url: base_dev
}



let NEW_API = {}
if (process.env.NODE_ENV === 'production') {
  NEW_API = prod
} else if (process.env.NODE_ENV === 'productionTest') {
  NEW_API = prod_test
} else {
  NEW_API = dev
}
module.exports = NEW_API
