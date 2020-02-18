const { api } = require('../utils')

const url = {
  guangzhou: {
    maskList: 'https://imgcache.gzonline.gov.cn/cloudsa3/wyj/ypgg_data_prd2020013101.json', // 穗康口罩list
    maskInfo: 'https://imgcache.gzonline.gov.cn/cloudsa3/wyj/wll_mp_prod_config.json', // 穗康口罩info
    preorderAdd: 'https://skyy.gzonline.gov.cn/preorder/add', // 穗康口罩预约
  },
  jiangmen: {
    maskList: 'https://wyj-1301191558.file.myqcloud.com/cloudsa3/uc/ypgg_data_prd20200206.json', // 江门口罩list
    maskInfo: 'https://wyj-1301191558.file.myqcloud.com/cloudsa3/uc/wll_mp_dev_config.json', // 江门口罩info
    preorderAdd: 'https://jkjm.jiangmen.cn/preorder/add', // 江门口罩预约
  },
  shanwei: {
    // maskList: 'https://wyj-1301191558.file.myqcloud.com/cloudsa3/uc/ypgg_data_prd20200206.json', // 汕尾口罩list
    maskInfo: 'https://wyj-1301196457.file.myqcloud.com/cloud/wyj/wll_mp_pro_config.json', // 汕尾口罩info
    preorderAdd: 'https://swgd-yy.tgovcloud.com/preorder/add', // 汕尾口罩预约
  },
  wxInform(key) {
    return `https://sc.ftqq.com/${key}.send`
  }
}

const maskApi = {
  // 获取口罩list
  async getMaskList(address = 'guangzhou') {
    const data = await api.get(url[address].maskList, {
      t: +new Date()
    })
    return data || []
  },
  // 口罩info
  async getMaskInfo(address = 'guangzhou') {
    const data = await api.get(url[address].maskInfo, {
      t: +new Date()
    })
    return data || {}
  },
  // 口罩预约
  async maskPreorderAdd(data, address = 'guangzhou') {
    const sessionid = {
      guangzhou: '68e195a7-3ab2-4cd2-a57d-d5707c61d771',
      jiangmen: '4c8c8faf-7eea-4f3b-8757-03df755a6fa0',
      shanwei: '925211d5-c59c-40a7-b925-7a0cc5e4d071'
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
