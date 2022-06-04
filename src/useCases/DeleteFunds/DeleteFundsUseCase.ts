import { IUsersRepository } from '@repositories/IUsersRepository'

export class DeleteFundsUseCase {
  constructor (private userRepository: IUsersRepository) {}

  public async execute (id: string, quantity: number) {
    const findUser = this.userRepository.findById(id)
    if (findUser) {
      if (findUser.funds >= quantity) {
        const newFunds = findUser.funds - quantity
        await this.userRepository.updateFunds(findUser, newFunds)
        return { funds: newFunds }
      } else {
        throw new Error('It is not possible to withdraw an amount greater than what is available')
      }
    } else {
      throw new Error('Invalid user')
    }
  }
}
