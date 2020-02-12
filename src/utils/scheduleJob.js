const schedule = require('node-schedule')

// 封装定时任务
const scheduleJob = {
  // 开启定时任务
  start (item, cb) {
    schedule.scheduleJob(item.name, item.rule, () => {
      if (typeof cb === 'function') {
        cb(item.name)
      }
    })
  },
  // 取消定时任务
  cancel (name) {
    schedule.cancelJob(name)
  }
}

module.exports = scheduleJob