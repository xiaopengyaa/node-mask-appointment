const { api } = require('../utils')

const url = {
  guangzhou: {
    maskList: 'https://imgcache.qq.com/cloudsa3/wyj/ypgg_data_prd2020013101.json', // 穗康口罩list
    maskInfo: 'https://imgcache.qq.com/cloudsa3/wyj/wll_mp_prod_config.json', // 穗康口罩info
    preorderAdd: 'https://skyy.gzonline.gov.cn/preorder/add', // 穗康口罩预约
  },
  jiangmen: {
    maskList: 'https://wyj-1301191558.file.myqcloud.com/cloudsa3/uc/ypgg_data_prd20200206.json', // 江门口罩list
    maskInfo: 'https://wyj-1301191558.file.myqcloud.com/cloudsa3/uc/wll_mp_dev_config.json', // 江门口罩info
    preorderAdd: 'https://jkjm.jiangmen.cn/preorder/add', // 江门口罩预约
  },
  wxInform(key) {
    return `https://sc.ftqq.com/${key}.send`
  }
}

const maskApi = {
  // 获取口罩list
  async getMaskList(address = 'guangzhou') {
    const data = await api.get(url[address].maskList)
    return data || []
  },
  // 口罩info
  async getMaskInfo(address = 'guangzhou') {
    const data = await api.get(url[address].maskInfo)
    return data || {}
  },
  // 口罩预约
  async maskPreorderAdd(data, address = 'guangzhou') {
    const sessionid = {
      guangzhou: 'a8b799c0-308a-4a30-89b5-74bd77acd3d1',
      jiangmen: '16c453a1-a25b-405a-a60d-43bbbe565604'
    }
    const config = {
      headers: {
        sessionid: sessionid[address]
      }
    }
    const res = await api.post(url[address].preorderAdd, data, config)
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
