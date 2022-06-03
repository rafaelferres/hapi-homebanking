import { UsersRepositoryLocalFile } from '@repositories/implementations/UsersRepositoryLocalFile'
import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'

const usersRepositoryLocalFile = new UsersRepositoryLocalFile()
const createUserUseCase = new CreateUserUseCase(usersRepositoryLocalFile)
const createUserController = new CreateUserController(createUserUseCase)

export { createUserController }
