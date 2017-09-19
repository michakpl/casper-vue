var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_LOCATION: '"http://api.casper.dev"',
  API_CLIENT_ID: '"3"',
  API_CLIENT_SECRET: '"6hFwOduFcMvchxZI4b7Sgn3b5PWIlwItnIuN6HVu"'
})
