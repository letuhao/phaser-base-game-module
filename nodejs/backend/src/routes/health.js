/**
 * Health check routes
 */
export default async function (fastify, options) {
  
  /**
   * GET /api/health
   * Basic health check
   */
  fastify.get('/', {
    schema: {
      description: 'Basic health check',
      tags: ['Health'],
      summary: 'Health check',
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            timestamp: { type: 'string' },
            uptime: { type: 'number' },
            memory: {
              type: 'object',
              properties: {
                used: { type: 'number' },
                total: { type: 'number' },
                free: { type: 'number' }
              }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    const memUsage = process.memoryUsage()
    
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        used: Math.round(memUsage.heapUsed / 1024 / 1024), // MB
        total: Math.round(memUsage.heapTotal / 1024 / 1024), // MB
        free: Math.round((memUsage.heapTotal - memUsage.heapUsed) / 1024 / 1024) // MB
      }
    }
  })

  /**
   * GET /api/health/ready
   * Readiness check
   */
  fastify.get('/ready', {
    schema: {
      description: 'Readiness check',
      tags: ['Health'],
      summary: 'Readiness check',
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            timestamp: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    return {
      status: 'ready',
      timestamp: new Date().toISOString()
    }
  })

  /**
   * GET /api/health/live
   * Liveness check
   */
  fastify.get('/live', {
    schema: {
      description: 'Liveness check',
      tags: ['Health'],
      summary: 'Liveness check',
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            timestamp: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    return {
      status: 'alive',
      timestamp: new Date().toISOString()
    }
  })
}
