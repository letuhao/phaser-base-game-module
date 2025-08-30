import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

import { logger } from './utils/logger.js'
import { errorHandler } from './middleware/errorHandler.js'
import { requestLogger } from './middleware/requestLogger.js'
import { authMiddleware } from './middleware/auth.js'

import loggingRoutes from './routes/logging.js'
import gameRoutes from './routes/games.js'
import healthRoutes from './routes/health.js'

// Server setup function
async function setupServer() {
  const fastify = Fastify({
    logger: false, // We'll use our custom logger
    trustProxy: true,
    bodyLimit: 10 * 1024 * 1024, // 10MB limit for logs
  })

  // Register plugins
  await fastify.register(cors, {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })

  await fastify.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  })

  await fastify.register(rateLimit, {
    max: 1000, // Max 1000 requests per window
    timeWindow: '1 minute',
    allowList: ['127.0.0.1', '::1'], // Allow localhost
    errorResponseBuilder: (request, context) => ({
      code: 429,
      error: 'Too Many Requests',
      message: `Rate limit exceeded, retry in ${context.after}`,
      retryAfter: context.after
    })
  })

  // Swagger documentation
  await fastify.register(swagger, {
    swagger: {
      info: {
        title: 'Phaser Minigame Backend API',
        description: 'Lightweight backend for Phaser minigames with logging capabilities',
        version: '1.0.0'
      },
      host: process.env.HOST || 'localhost:3001',
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'Logging', description: 'Logging endpoints' },
        { name: 'Games', description: 'Minigame endpoints' },
        { name: 'Health', description: 'Health check endpoints' }
      ]
    }
  })

  await fastify.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    }
  })

  // Register middleware
  fastify.addHook('onRequest', requestLogger)
  fastify.addHook('onResponse', async (request, reply) => {
    if (request.startTime) {
      const responseTime = Date.now() - request.startTime
      
      logger.info('RequestLogger', `${request.method} ${request.url}`, {
        method: request.method,
        url: request.url,
        statusCode: reply.statusCode,
        responseTime: `${responseTime}ms`,
        ip: request.ip,
        userAgent: request.headers['user-agent'],
        contentLength: reply.getHeader('content-length') || 0
      })
    }
  })
  fastify.addHook('onError', errorHandler)

  // Register routes
  await fastify.register(loggingRoutes, { prefix: '/api/logs' })
  await fastify.register(gameRoutes, { prefix: '/api/games' })
  await fastify.register(healthRoutes, { prefix: '/api/health' })

  // Root endpoint
  fastify.get('/', async (request, reply) => {
    return {
      message: 'Phaser Minigame Backend',
      version: '1.0.0',
      status: 'running',
      timestamp: new Date().toISOString(),
      endpoints: {
        docs: '/docs',
        health: '/api/health',
        logs: '/api/logs',
        games: '/api/games'
      }
    }
  })

  return fastify
}

// Export the setup function so it can be used externally
export { setupServer }

// Example of how to start the server (commented out - you control when to start)
/*
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

// Uncomment the line below when you want to start the server
// start()
*/
