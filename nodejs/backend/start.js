import { setupServer } from './src/server.js'
import { logger } from './src/utils/logger.js'

const start = async () => {
  try {
    const fastify = await setupServer()
    const port = process.env.PORT || 3001
    const host = process.env.HOST || '0.0.0.0'
    
    await fastify.listen({ port, host })
    
    logger.info('Server', `Server is running on http://${host}:${port}`)
    logger.info('Server', `API Documentation available at http://${host}:${port}/docs`)
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      logger.info('Server', 'Received SIGINT, shutting down gracefully...')
      await fastify.close()
      process.exit(0)
    })
    
    process.on('SIGTERM', async () => {
      logger.info('Server', 'Received SIGTERM, shutting down gracefully...')
      await fastify.close()
      process.exit(0)
    })
    
  } catch (err) {
    logger.error('Server', 'Failed to start server', err)
    process.exit(1)
  }
}

start()
