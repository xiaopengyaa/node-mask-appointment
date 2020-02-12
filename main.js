const { maskApi } = require('./src/api')
const { scheduleJob } = require('./src/utils')

// 定时任务
const scheduleList = [
  {
    name: '***',
    rule: '*/2 * * * * *', // 每2s一次
    appointment: {
      name: '***',
      mobile: '110110110110',
      identityType: '身份证',
      identity: '44078***********',
      idcard: '身份证,44078***********',
      commodity_id: '100003',
      category: '普通防护口罩',
      number: 10
    }
  }
]

// 预约结果任务
const maskScheduleItem = {
  name: 'maskInfo',
  rule: '0 * * * * *' // 每1分钟一次
}

// 微信通知SCKEY
const SCKEY = '******'

const start = async function() {
  const list = await maskApi.getMaskList()
  const shopList = (list[0] && list[0].shop_list) || []
  const baseAppointmentData = {
    zone: list[0].name,
    shop_id: shopList[0].id,
    changeable: 'yes',
    time_code: '0',
    wxmsg: 1,
    mail_address: ''
  }
  scheduleList.forEach(schedule => {
    const { appointment, ...scheduleItem } = schedule
    scheduleJob.start(scheduleItem, async scheduleName => {
      const data = Object.assign({}, baseAppointmentData, appointment)
      await getAppointment(data, scheduleName)
    })
  })
}

// 预约
async function getAppointment(data, scheduleName) {
  const res = await maskApi.maskPreorderAdd(data)
  if (res.errcode === 0) {
    scheduleJob.cancel(scheduleName)
    console.log(`${scheduleName}申请预约成功！`)
    console.log('data:', res.data)
    // 微信通知
    await maskApi.wxInform(SCKEY, {
      text: '主人我已经申请预约成功啦！'
    })
    // 查看预约结果
    scheduleJob.start(maskScheduleItem, async name => {
      const maskInfo = await maskApi.getMaskInfo()
      if (maskInfo.personal_center_info.is_open === 1) {
        scheduleJob.cancel(name)
        // 微信通知
        await maskApi.wxInform(SCKEY, {
          text: '主人，预约结果出来啦，可以去查看啦！'
        })
      }
    })
  } else {
    console.log(res.detailErrMsg || res.errmsg)
  }
}

start()
