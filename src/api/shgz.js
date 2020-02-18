const qs = require('querystring')
const { api } = require('../utils')

const url = {
  zhanjiang: {
    maskList: 'https://huiyang-app.oss-cn-shenzhen.aliyuncs.com/zjfy/productList.json', // 口罩list
    preorderAdd: 'https://dapi.zjfy.zjzwy.com/api/book/bookOrder.action', // 口罩预约
  },
  wxInform(key) {
    return `https://sc.ftqq.com/${key}.send`
  }
}

const maskApi = {
  // 获取口罩list
  async getMaskList(address = 'zhanjiang') {
    const data = await api.get(url[address].maskList, {
      t: +new Date()
    })
    return data || []
  },
  // 口罩预约
  async maskPreorderAdd(data, address = 'zhanjiang') {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const res = await api.post(url[address].preorderAdd, qs.stringify(data), config)
    return res
  },
  // 微信通知
  async wxInform(key, data) {
    const res = await api.get(url.wxInform(key), data)
    const isSuccessed = res.errno === 0
    isSuccessed && console.log('微信通知成功')
    return isSuccessed
  }
}

module.exports = maskApi
