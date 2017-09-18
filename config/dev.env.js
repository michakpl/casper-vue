var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_LOCATION: '"http://api.casper.dev"',
  API_CLIENT_ID: '"3"',
  API_CLIENT_SECRET: '"RBsEsujI7bWfRAhYc1lPiJHMHQ4DREIKWzGdWn3M"'
})
