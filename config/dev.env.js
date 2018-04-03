'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE_URL: '"http://api.wenchao.dev.geek-zoo.cn"',
  FILE_BASE_URL: '""',
  SIGN_KEY: '"q781cXa9Z8hp0Z7aJL8ssG5oiP1R9nA7"',
  ENCRYPT_KEY: '"aV2woc00FmtOi8HCLsbPMQD0iih0vQ3h"'
})