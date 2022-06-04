import { PutFundsController } from './PutFundsController'
import { PutFundsUseCase } from './PutFundsUseCase'
import { usersRepositoryLocalFile } from '@repositories/implementations/UsersRepositoryLocalFile'

const putFundsUseCase = new PutFundsUseCase(usersRepositoryLocalFile)
const putFundsController = new PutFundsController(putFundsUseCase)

export { putFundsController }
