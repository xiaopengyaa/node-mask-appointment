const api = require('./axios') // api封装
const scheduleJob = require('./scheduleJob')
const utils = {
  api,
  scheduleJob
}

module.exports = utils