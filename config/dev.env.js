var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_LOCATION: '"http://api.casper.dev"',
  API_CLIENT_ID: '"3"',
  API_CLIENT_SECRET: '"YT1cP4iE3z762Hkre2sy2aLOos1m5FuWxJPl97e4"'
})
