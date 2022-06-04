import { IUsersRepository } from '@repositories/IUsersRepository'

export class PutFundsUseCase {
  constructor (private userRepository: IUsersRepository) {}

  public async execute (id: string, quantity: number) {
    const findUser = this.userRepository.findById(id)
    if (findUser) {
      const newFunds = findUser.funds + quantity
      await this.userRepository.updateFunds(findUser, newFunds)
      return { funds: findUser.funds }
    } else {
      throw new Error('Invalid user')
    }
  }
}
