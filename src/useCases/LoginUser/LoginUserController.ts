import { LoginUserUseCase } from './LoginUserUseCase'
import Hapi from '@hapi/hapi'
import boom from '@hapi/boom'
import { ILoginUserDTO } from './LoginUserDTO'

export class LoginUserController {
  constructor (private loginUserUseCase: LoginUserUseCase) {}

  public async handler (request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const data : ILoginUserDTO = request.payload as any
    try {
      const response = await this.loginUserUseCase.execute(data)
      return h.response(response).code(201)
    } catch (e: any) {
      console.log(e)
      return boom.badData(e.message)
    }
  }
}
