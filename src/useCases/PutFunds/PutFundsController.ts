import { PutFundsUseCase } from './PutFundsUseCase'
import Hapi from '@hapi/hapi'
import boom from '@hapi/boom'
import { IPutFundsDTO } from './PutFundsDTO'

export class PutFundsController {
  constructor (private putFundsUseCase: PutFundsUseCase) {}

  public async handler (request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const data : IPutFundsDTO = request.payload as any
      const response = await this.putFundsUseCase.execute(request.auth.credentials.user as string, data.quantity)
      return response
    } catch (e: any) {
      console.log(e)
      return boom.badData(e.message)
    }
  }
}
