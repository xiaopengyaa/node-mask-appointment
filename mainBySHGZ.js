const { shgzApi } = require('./src/api')
const { scheduleJob, encrypt } = require('./src/utils')

// 预约类型：'0'为到店自取|'1'为邮寄
const ORDERTYPE = '0'

// 定时任务
const scheduleList = [
  {
    name: 'wzp',
    rule: '*/2 * * * * *', // 每2s一次
    appointment: { // 邮寄时name、mobilePhone为必填
      locationLongitude: 120.33333,
      locationLatitude: 10.66666,
      addressName: 'xxxxxxxx',
      name: '张三',
      mobilePhone: '11011011011'
    }
  }
]

// 微信OPENID
const OPENID = 'xxxxxx'

// 微信通知SCKEY
const SCKEY = 'xxxxxx'

// 预约地区（目前支持湛江）
const ADDRESS = 'zhanjiang'

const start = async function() {
  const list = await shgzApi.getMaskList(ADDRESS)
  // 默认取第一条
  const commodityList = list[ORDERTYPE]
  scheduleList.forEach(schedule => {
    const { appointment, ...scheduleItem } = schedule
    scheduleJob.start(scheduleItem, async scheduleName => {
      const timestamp = new Date().getTime() + ''
      const baseAppointmentData = {
        type: commodityList.type,
        sign: encrypt(getEncryptionStr(OPENID, timestamp)),
        openId: OPENID,
        timestamp
      }
      const data = Object.assign({}, baseAppointmentData, appointment)
      console.log(data)
      await getAppointment(data, scheduleName)
    })
  })
}

// 预约
async function getAppointment(data, scheduleName) {
  const res = await shgzApi.maskPreorderAdd(data, ADDRESS)
  if (res && res.result) {
    scheduleJob.cancel(scheduleName)
    console.log(`${scheduleName}申请预约成功！`)
    console.log('data:', res.data)
    // 微信通知
    await shgzApi.wxInform(SCKEY, {
      text: '我已经申请预约成功啦！'
    })
  } else {
    console.log(res.data && res.data.errorMsg)
  }
}

// 获取加密str
function getEncryptionStr (openId, timestamp) {
  const randomStr = 'TykA3r6SV8k4EmIzxaKamH9Tg3ZIZUna'
  return `openId=${openId}&timestamp=${timestamp}&key=${randomStr}`
}

start()
