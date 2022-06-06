import Hapi from '@hapi/hapi'
import { routes } from './routes'
import dotenv from 'dotenv'
import Jwt from '@hapi/jwt'

const swaggerOptions: any = {
  info: {
    title: 'Test API Documentation',
    version: '1.0.0'
  }
}

/**
 * Load hapi configurations
 */

const init = async () => {
  dotenv.config()
  const server = Hapi.server({
    port: process.env.PORT || 4000,
    host: '0.0.0.0'
  })

  await server.register(Jwt)

  await server.register([
    require('@hapi/inert'),
    require('@hapi/vision'),
    {
      plugin: require('hapi-swagger'),
      options: swaggerOptions
    }
  ])

  await server.register({
    plugin: require('good'),
    options: {
      ops: {
        interval: 1000
      },
      reporters: {
        console: [{
          module: 'good-console'
        }, 'stdout']
      }
    }
  })

  server.auth.strategy('jwt', 'jwt', {
    keys: 'dwqdwqd',
    verify: {
      aud: 'urn:audience:homebanking',
      iss: 'urn:issuer:homebanking',
      sub: false,
      nbf: false,
      exp: true,
      maxAgeSec: 14400
    },
    validate: (artifacts, request, h) => {
      return {
        isValid: true,
        credentials: { user: artifacts.decoded.payload.id }
      }
    }
  })
  routes(server)
  server.start()
}

export { init }
