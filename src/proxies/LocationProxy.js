import jsonpFallback from 'jsonp-fallback'

class LocationProxy {
  constructor () {
    this.endpoint = 'http://dev.virtualearth.net/REST/v1/Locations'
  }

  submit (url, data = null) {
    return new Promise((resolve, reject) => {
      jsonpFallback(url, data, {
        param: 'jsonp'
      })
        .then((response) => {
          resolve(response)
        })
        .catch(({response}) => {
          if (response) {
            reject(response.error)
          } else {
            reject()
          }
        })
    })
  }

  query (location) {
    const data = {
      q: location,
      key: process.env.BING_API_KEY
    }

    return this.submit(`${this.endpoint}`, data)
  }

  callback (data) {

  }
}

export default LocationProxy
