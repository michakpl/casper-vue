import qs from 'qs'
import jsonp from 'jsonp'

class LocationProxy {
  constructor () {
    this.endpoint = '//dev.virtualearth.net/REST/v1/Locations'
  }

  submit (url, data = null) {
    return new Promise((resolve, reject) => {
      if (data) {
        url += '?' + qs.stringify(data)
      }

      let params = {
        param: 'jsonp'
      }

      jsonp(url, params, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
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
}

export default LocationProxy
