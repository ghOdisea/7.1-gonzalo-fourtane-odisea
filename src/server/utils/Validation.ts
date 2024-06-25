export class Validation {
  static username (username: string): boolean {
    if (typeof username !== 'string') throw new Error('username must be a string')
    if (username.length < 3) throw new Error('username must be at least 3 characters long')
    else {
      return true
    }
  }

  static password (password: string): boolean {
    if (typeof password !== 'string') throw new Error('password must be a string')
    if (password.length < 6) throw new Error('password must be at least 6 characters long')

    else {
      return true
    }
  }

  confirmPass (password: string, samePassword: string): boolean {
    if (password !== samePassword) return false
    else {
      return true
    }
  }
}
