import { usersRepositoryLocalFile } from '@repositories/implementations/UsersRepositoryLocalFile'
import { LoginUserController } from './LoginUserController'
import { LoginUserUseCase } from './LoginUserUseCase'

const loginUserUseCase = new LoginUserUseCase(usersRepositoryLocalFile)
const loginUserController = new LoginUserController(loginUserUseCase)

export { loginUserController }
