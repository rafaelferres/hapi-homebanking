import { IUsersRepository } from '@repositories/IUsersRepository'
import { ILoginUserDTO } from './LoginUserDTO'
import * as Jwt from 'jsonwebtoken'
import { User } from '@entities/User'
import crypto from 'crypto'

export class LoginUserUseCase {
  constructor (private userRepository: IUsersRepository) {}

  public async execute (data: ILoginUserDTO) {
    data.password = crypto.createHash('md5').update(data.password).digest('hex')

    const user = this.userRepository.login(data.email, data.password)
    if (user) {
      return { token: this.generateToken(user) }
    } else {
      throw new Error('Invalid email or password')
    }
  }

  private generateToken (user: User) {
    const jwtSecret = 'dwqdwqd'
    const jwtExpiration = 14400
    const payload = { id: user.id }

    return Jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration, audience: 'urn:audience:homebanking', issuer: 'urn:issuer:homebanking' })
  }
}
