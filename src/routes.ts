import Hapi from '@hapi/hapi'
import Joi from 'joi'
import { createUserController } from '@useCases/CreateUser'

export const routes = async (server: Hapi.Server): Promise<void> => {
  server.route({
    method: 'POST',
    path: '/subscribe',
    options: {
      auth: false,
      tags: ['api', 'users'],
      description: 'Create a user.',
      handler: (request, h) => createUserController.handler(request, h),
      validate: {
        payload: Joi.object({
          email: Joi.string().email(),
          passwrod: Joi.string()
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            201: {
              description: 'User created.'
            }
          }
        }
      }
    }
  })
}
