const api = require('./axios') // api封装
const scheduleJob = require('./scheduleJob') // 定时任务
const encrypt = require('./encryption') // 加密算法
const utils = {
  api,
  scheduleJob,
  encrypt
}

module.exports = utils