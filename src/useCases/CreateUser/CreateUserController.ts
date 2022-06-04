import Hapi from '@hapi/hapi'
import { ICreateUserDTO } from './CreateUserDTO'
import { CreateUserUseCase } from './CreateUserUseCase'
import boom from '@hapi/boom'

export class CreateUserController {
  constructor (private createUserUseCase: CreateUserUseCase) {}

  public async handler (request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const data : ICreateUserDTO = request.payload as any
    try {
      await this.createUserUseCase.execute(data)
      return { created: true }
    } catch (e: any) {
      return boom.badData(e.message)
    }
  }
}
