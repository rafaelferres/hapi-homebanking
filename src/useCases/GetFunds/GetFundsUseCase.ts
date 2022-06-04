import { IUsersRepository } from '@repositories/IUsersRepository'

export class GetFundsUseCase {
  constructor (private userRepository: IUsersRepository) {}

  public async execute (id: string) {
    const findUser = this.userRepository.findById(id)
    if (findUser) {
      return { funds: findUser.funds }
    } else {
      throw new Error('Invalid user')
    }
  }
}
