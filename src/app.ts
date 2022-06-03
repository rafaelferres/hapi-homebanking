import Hapi from '@hapi/hapi'
import HapiSwagger from 'hapi-swagger'
import Inert from '@hapi/inert'
import { routes } from './routes'
import Vision from '@hapi/vision'
import dotenv from 'dotenv'

const swaggerOptions: any = {
  info: {
    title: 'Test API Documentation',
    version: '1.0.0'
  }
}

const init = async () => {
  dotenv.config()
  const server = Hapi.server({
    port: process.env.PORT || 4000,
    host: '0.0.0.0'
  })

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])
  routes(server)
  server.start()
}

export { init }
