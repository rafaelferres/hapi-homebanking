import Hapi from '@hapi/hapi'
import Joi from 'joi'
import { createUserController } from '@useCases/CreateUser'
import { loginUserController } from '@useCases/LoginUser'
import { getFundsController } from '@useCases/GetFunds'
import { putFundsController } from '@useCases/PutFunds'
import { deleteFundsController } from '@useCases/DeleteFunds'

/**
 * Routes hapi
 */
export const routes = async (server: Hapi.Server): Promise<void> => {
  server.route([{
    method: 'POST',
    path: '/subscribe',
    options: {
      auth: false,
      tags: ['api', 'users'],
      description: 'Create a user.',
      handler: (request, h) => createUserController.handler(request, h),
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required()
        }).label('Create User Model')
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
  }, {
    method: 'POST',
    path: '/login',
    options: {
      auth: false,
      tags: ['api', 'users'],
      description: 'Login a user.',
      handler: (request, h) => loginUserController.handler(request, h),
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required()
        }).label('Login and create model')
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            201: {
              description: 'User login.'
            }
          }
        }
      }
    }
  }, {
    method: 'GET',
    path: '/funds',
    options: {
      auth: 'jwt',
      tags: ['api', 'users'],
      description: 'Login a user.',
      validate: {
        headers: Joi.object({ authorization: Joi.string().required() }).unknown()
      },
      handler: (request, h) => getFundsController.handler(request, h),
      plugins: {
        'hapi-swagger': {
          responses: {
            201: {
              description: 'Get user funds.'
            }
          }
        }
      }
    }
  }, {
    method: 'PUT',
    path: '/funds',
    options: {
      auth: 'jwt',
      tags: ['api', 'users'],
      description: 'Put user funds.',
      validate: {
        headers: Joi.object({ authorization: Joi.string().required() }).unknown(),
        payload: Joi.object({
          quantity: Joi.number().required()
        }).label('Put and delete funds model')
      },
      handler: (request, h) => putFundsController.handler(request, h),
      plugins: {
        'hapi-swagger': {
          responses: {
            201: {
              description: 'Put user funds.'
            }
          }
        }
      }
    }
  }, {
    method: 'DELETE',
    path: '/funds',
    options: {
      auth: 'jwt',
      tags: ['api', 'users'],
      description: 'Remove user funds.',
      validate: {
        headers: Joi.object({ authorization: Joi.string().required() }).unknown(),
        payload: Joi.object({
          quantity: Joi.number().required()
        }).label('Put and delete funds model')
      },
      handler: (request, h) => deleteFundsController.handler(request, h),
      plugins: {
        'hapi-swagger': {
          responses: {
            201: {
              description: 'Remove user funds.'
            }
          }
        }
      }
    }
  }])
}
