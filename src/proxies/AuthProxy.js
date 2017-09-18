import BaseProxy from './BaseProxy'

class AuthProxy extends BaseProxy {
  constructor () {
    super('oauth')
  }

  login ({ username, password }) {
    const data = {
      username,
      password,
      client_id: process.env.API_CLIENT_ID,
      client_secret: process.env.API_CLIENT_SECRET,
      grant_type: 'password',
      scope: ''
    }

    return this.submit('post', `${this.endpoint}/token`, data)
  }
}

export default AuthProxy
