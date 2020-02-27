const { maskApi } = require('./src/api')
const { scheduleJob } = require('./src/utils')

// 定时任务（支持多账号同时预约，格式为：[obj1, obj2, ...]）
const scheduleList = [
  {
    name: 'xiaopengyaa', // 定时任务name（可自定义，多账号预约时不能相同）
    rule: '*/2 * * * * *', // 每2s轮循一次
    params: {
      sessionId: 'xxxxxxxxxx', // 对应微信小程序登录sessionId（多账号预约时不能相同）
      zone: 'jiangmen', // 预约地区（目前支持江门、汕尾，广州不支持）
      sckey: 'xxxxxxxxxx' // 微信通知SCKEY
    },
    appointment: {
      // 预约信息
      name: '张三',
      mobile: '11011011011',
      identityType: '身份证',
      identity: '440**********',
      idcard: '身份证,440**********'
    }
  }
]

// 预约结果任务
const maskScheduleItem = {
  name: 'maskInfo',
  rule: '0 * * * * *' // 每1分钟一次
}

const start = function() {
  scheduleList.forEach(async schedule => {
    const {
      appointment,
      params: { sessionId, zone = 'jiangmen', sckey },
      ...scheduleItem
    } = schedule
    const list = await maskApi.getMaskList(zone)
    // 默认取第一条
    const [shopList] = list[0].shop_list
    const [classList] = shopList.class_list
    const [commodityList] = classList.commodity_list
    const baseAppointmentData = {
      zone: shopList.address,
      shop_id: shopList.id,
      commodity_id: commodityList.id,
      category: commodityList.name,
      number: commodityList.min_order_number || commodityList.pre_order_number,
      changeable: 'yes',
      time_code: '0',
      wxmsg: 1,
      mail_address: ''
    }
    scheduleJob.start(scheduleItem, async scheduleName => {
      const data = Object.assign({}, baseAppointmentData, appointment)
      console.log(`${scheduleName}: `, data)
      await getAppointment(data, {
        scheduleName,
        sessionId,
        zone,
        sckey
      })
    })
  })
}

// 预约
async function getAppointment(data, { scheduleName, sessionId, zone, sckey }) {
  const res = await maskApi.maskPreorderAdd(data, { sessionId, zone })
  if (res.errcode === 0) {
    const text = `${scheduleName}申请预约成功！`
    scheduleJob.cancel(scheduleName)
    console.log(text)
    console.log('data:', res.data)
    // 微信通知
    await maskApi.wxInform(sckey, {
      text
    })
    // 查看预约结果
    scheduleJob.start(maskScheduleItem, async taskName => {
      const maskInfo = await maskApi.getMaskInfo(zone)
      if (maskInfo.personal_center_info.is_open === 1) {
        scheduleJob.cancel(taskName)
        // 微信通知
        await maskApi.wxInform(sckey, {
          text: '预约结果出来啦，可以去查看啦！'
        })
      }
    })
  } else {
    console.log(res.detailErrMsg || res.errmsg)
  }
}

start()
