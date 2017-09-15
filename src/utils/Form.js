import _ from 'lodash'
import Errors from './Errors'
// import NProgress from 'nprogress'
import axios from 'axios'
// import Notification from './Notification'

class Form {
  /**
   * Create a new Form instance.
   *
   * @param {object} data
   */
  constructor (data) {
    this.originalData = data

    for (let field in data) {
      this[field] = data[field]
    }

    this.errors = new Errors()
  }

  /**
   * Fetch all relevant data for the form.
   */
  data () {
    let data = new FormData()

    for (let property in this.originalData) {
      if (this[property] instanceof Array) {
        data.append(property, this[property][0], this[property][1])
      } else {
        data.append(property, this[property])
      }
    }

    return data
  }

  /**
   * Reset the form fields.
   */
  reset () {
    for (let field in this.originalData) {
      this[field] = ''
    }

    this.errors.clear()
  }

  /**
   * Send a POST request to the given URL.
   * .
   * @param {string} url
   */
  post (url) {
    return this.submit('post', url)
  }

  /**
   * Send a PUT request to the given URL.
   * .
   * @param {string} url
   */
  put (url) {
    return this.submit('put', url)
  }

  /**
   * Send a PATCH request to the given URL.
   * .
   * @param {string} url
   */
  patch (url) {
    return this.submit('patch', url)
  }

  /**
   * Send a DELETE request to the given URL.
   * .
   * @param {string} url
   */
  delete (url) {
    return this.submit('delete', url)
  }

  /**
   * Submit the form.
   *
   * @param {string} requestType
   * @param {string} url
   */
  submit (requestType, url) {
    // NProgress.start()

    this.errors.clear()

    let data = this.data()
    if (_.indexOf(['put', 'patch'], requestType) !== -1) {
      data.append('_method', _.upperCase(requestType))
      requestType = 'post'
    }

    return new Promise((resolve, reject) => {
      axios[requestType](url, data)
          .then(response => {
            // NProgress.done()

            this.onSuccess(response.data)

            resolve(response.data)
          })
          .catch(error => {
            // NProgress.done()

            this.onFail(error.response.data)

            reject(error.response.data)
          })
    })
  }

  /**
   * Handle a successful form submission.
   *
   * @param {object} data
   */
  onSuccess (data) {
    // Notification.success({
    //   message: data.message
    // })
  }

  /**
   * Handle a failed form submission.
   *
   * @param {object} errors
   */
  onFail (errors) {
    this.errors.record(errors)

    if (errors.message) {
      // Notification.error({
      //   message: errors.message
      // })
    }
  }
}

export default Form
