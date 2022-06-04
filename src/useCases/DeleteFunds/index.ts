import { usersRepositoryLocalFile } from '@repositories/implementations/UsersRepositoryLocalFile'
import { DeleteFundsController } from './DeleteFundsController'
import { DeleteFundsUseCase } from './DeleteFundsUseCase'

const deleteFundsUseCase = new DeleteFundsUseCase(usersRepositoryLocalFile)
const deleteFundsController = new DeleteFundsController(deleteFundsUseCase)

export { deleteFundsController }
