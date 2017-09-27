import BaseProxy from './BaseProxy'

class UserProxy extends BaseProxy {
  constructor () {
    super('user')
  }

  register (userData) {
    const data = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.password_confirmation,
      gender: userData.gender,
      birthdate: userData.birthdate
    }

    return this.submit('post', `${this.endpoint}/register`, data)
  }

  currentUser () {
    return this.submit('get', `${this.endpoint}/user/current`)
  }
}

export default UserProxy
