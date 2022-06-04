import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'
import { usersRepositoryLocalFile } from '@repositories/implementations/UsersRepositoryLocalFile'

const createUserUseCase = new CreateUserUseCase(usersRepositoryLocalFile)
const createUserController = new CreateUserController(createUserUseCase)

export { createUserController }
