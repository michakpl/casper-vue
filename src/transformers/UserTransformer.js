import BaseTransformer from './BaseTransformer'

class UserTransformer extends BaseTransformer {
  static fetch (user) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      gender: user.male,
      birthdate: user.birthdate,
      createdAt: user.created_at,
      updated_at: user.updated_at
    }
  }
}

export default UserTransformer
