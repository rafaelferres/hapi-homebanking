import { GetFundsUseCase } from './GetFundsUseCase'
import Hapi from '@hapi/hapi'
import boom from '@hapi/boom'

export class GetFundsController {
  constructor (private getFundsUseCase: GetFundsUseCase) {}

  public async handler (request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const funds = await this.getFundsUseCase.execute(request.auth.credentials.user as string)
      return funds
    } catch (e: any) {
      console.log(e)
      return boom.badData(e.message)
    }
  }
}
