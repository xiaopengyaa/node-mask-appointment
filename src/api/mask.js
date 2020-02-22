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
    maskList: 'https://wyj-1301196457.file.myqcloud.com/cloud/wyj/ypgg_data_prd.json', // 汕尾口罩list
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
    let data = await api.get(url[address].maskList, {
      t: +new Date()
    })
    if (typeof data === 'string') {
      data = JSON.parse(data.replace(/\r\n|\s/g, ''))
    }
    return data || []
  },
  // 口罩info
  async getMaskInfo(address = 'guangzhou') {
    let data = await api.get(url[address].maskInfo, {
      t: +new Date()
    })
    if (typeof data === 'string') {
      data = JSON.parse(data.replace(/\r\n|\s/g, ''))
    }
    return data || {}
  },
  // 口罩预约
  async maskPreorderAdd(data, address = 'guangzhou') {
    const sessionid = {
      guangzhou: '68e195a7-3ab2-4cd2-a57d-d5707c61d771',
      jiangmen: 'dd7322c3-73cf-4bba-b7d8-64dc7bcc8f45',
      shanwei: '147633a5-cf91-4233-934e-1601a4bb62f8'
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
