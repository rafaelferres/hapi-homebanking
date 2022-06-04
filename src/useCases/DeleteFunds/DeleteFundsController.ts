import { DeleteFundsUseCase } from './DeleteFundsUseCase'
import Hapi from '@hapi/hapi'
import boom from '@hapi/boom'
import { IDeleteFundsDTO } from './DeleteFundsDTO'

export class DeleteFundsController {
  constructor (private deleteFundsUseCase: DeleteFundsUseCase) {}

  public async handler (request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const data : IDeleteFundsDTO = request.payload as any
      const response = await this.deleteFundsUseCase.execute(request.auth.credentials.user as string, data.quantity)
      return response
    } catch (e: any) {
      console.log(e)
      return boom.badData(e.message)
    }
  }
}
