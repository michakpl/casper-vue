import _ from 'lodash'
import BaseTransformer from './BaseTransformer'

class ErrorTransformer extends BaseTransformer {
  static fetch (errors) {
    return _.forEach(errors, (error, key) => {
      let originKey = key
      key = _.camelCase(key)

      delete errors[originKey]
      errors[key] = error
    })
  }
}

export default ErrorTransformer
