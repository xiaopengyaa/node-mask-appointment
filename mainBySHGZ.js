const { shgzApi } = require('./src/api')
const { scheduleJob, encrypt } = require('./src/utils')

// 定时任务（支持多账号同时预约，格式为：[obj1, obj2, ...]）
const scheduleList = [
  {
    name: 'xiaopengyaa', // 定时任务name（可自定义，多账号预约时不能相同）
    rule: '*/2 * * * * *', // 每2s轮循一次
    params: {
      openId: 'xxxxxxxxxx', // 对应微信小程序openId（多账号预约时不能相同）
      orderType: '0', // 预约类型（'0'为到店自取|'1'为邮寄）
      zone: 'zhanjiang', // 预约地区（目前支持湛江）
      sckey: 'xxxxxxxxxx' // 微信通知SCKEY
    },
    appointment: {
      // 邮寄时addressName、name、mobilePhone为必填
      locationLongitude: 120.33333,
      locationLatitude: 10.66666,
      addressName: 'xx市xx区xxxx',
      name: '张三',
      mobilePhone: '11011011011'
    }
  }
]

const start = function() {
  scheduleList.forEach(async schedule => {
    const {
      appointment,
      params: { openId, orderType = '0', zone = 'zhanjiang', sckey },
      ...scheduleItem
    } = schedule
    const list = await shgzApi.getMaskList(zone)
    // 默认取第一条
    const commodityList = list[orderType]
    scheduleJob.start(scheduleItem, async scheduleName => {
      const timestamp = new Date().getTime() + ''
      const baseAppointmentData = {
        type: commodityList.type,
        sign: encrypt(getEncryptionStr(openId, timestamp)),
        openId,
        timestamp
      }
      const data = Object.assign({}, baseAppointmentData, appointment)
      console.log(`${scheduleName}: `, data)
      await getAppointment(data, { scheduleName, zone, sckey })
    })
  })
}

// 预约
async function getAppointment(data, { scheduleName, zone, sckey }) {
  const res = await shgzApi.maskPreorderAdd(data, zone)
  if (res && res.result) {
    const text = `${scheduleName}申请预约成功！`
    scheduleJob.cancel(scheduleName)
    console.log(text)
    console.log('data:', res.data)
    // 微信通知
    await shgzApi.wxInform(sckey, {
      text
    })
  } else {
    console.log(res.data && res.data.errorMsg)
  }
}

// 获取加密str
function getEncryptionStr(openId, timestamp) {
  const randomStr = 'TykA3r6SV8k4EmIzxaKamH9Tg3ZIZUna'
  return `openId=${openId}&timestamp=${timestamp}&key=${randomStr}`
}

start()
