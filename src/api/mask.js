const { api } = require('../utils')

const url = {
  maskList: 'https://imgcache.qq.com/cloudsa3/wyj/ypgg_data_prd2020013101.json', // 穗康口罩list
  maskInfo: 'https://imgcache.qq.com/cloudsa3/wyj/wll_mp_prod_config.json', // 穗康口罩info
  preorderAdd: 'https://wyjgzyy.govcloud.tencent.com/preorder/add', // 穗康口罩预约
  wxInform(key) {
    return `https://sc.ftqq.com/${key}.send`
  }
}

const maskApi = {
  // 获取口罩list
  async getMaskList() {
    const data = await api.get(url.maskList)
    return data || []
  },
  // 口罩info
  async getMaskInfo() {
    const data = await api.get(url.maskInfo)
    return data || {}
  },
  // 口罩预约
  async maskPreorderAdd(data) {
    const config = {
      headers: {
        sessionid: '141aa522-ddcf-4699-8fae-0689fd628b85'
      }
    }
    const res = await api.post(url.preorderAdd, data, config)
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
