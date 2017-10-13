import BaseTransformer from './BaseTransformer'

class UserTransformer extends BaseTransformer {
  static fetch (user) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      gender: user.gender,
      birthdate: user.birthdate,
      createdAt: user.created_at,
      updated_at: user.updated_at
    }
  }

  static send (user) {
    return {
      username: user.username,
      email: user.email,
      gender: user.gender,
      password: user.password,
      password_confirmation: user.passwordConfirmation,
      birthdate: user.birthdate
    }
  }
}

export default UserTransformer
