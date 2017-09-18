import Vue from 'vue'

class BaseProxy {
  constructor (endpoint) {
    this.endpoint = endpoint
  }

  submit (requestType, url, data = null) {
    return new Promise((resolve, reject) => {
      Vue.$http[requestType](url, data)
        .then((response) => {
          resolve(response.data)
        })
        .catch(({response}) => {
          if (response) {
            reject(response.data)
          } else {
            reject()
          }
        })
    })
  }
}

export default BaseProxy
