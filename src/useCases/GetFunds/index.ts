import { usersRepositoryLocalFile } from '@repositories/implementations/UsersRepositoryLocalFile'
import { GetFundsController } from './GetFundsController'
import { GetFundsUseCase } from './GetFundsUseCase'

const getFundsUseCase = new GetFundsUseCase(usersRepositoryLocalFile)
const getFundsController = new GetFundsController(getFundsUseCase)

export { getFundsController }
