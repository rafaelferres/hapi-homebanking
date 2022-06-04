import { User } from '@entities/User'
import { IUsersRepository } from '@repositories/IUsersRepository'
import { ICreateUserDTO } from './CreateUserDTO'
import crypto from 'crypto'

export class CreateUserUseCase {
  constructor (private userRepository: IUsersRepository) {}

  public async execute (data: ICreateUserDTO) {
    const userAlreadyExists = this.userRepository.findByEmail(data.email)

    if (userAlreadyExists) {
      throw new Error('User already exists.')
    }

    data.password = crypto.createHash('md5').update(data.password).digest('hex')

    const user = new User({ ...data, funds: 0 })

    await this.userRepository.save(user)
  }
}
