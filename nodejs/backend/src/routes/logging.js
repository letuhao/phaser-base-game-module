import loggingController from '../controllers/loggingController.js'

/**
 * Logging routes for receiving frontend logs
 */
export default async function (fastify, options) {
  
  /**
   * POST /api/logs/log
   * Receive a single log entry from frontend
   */
  fastify.post('/log', {
    schema: {
      description: 'Receive a single log entry from frontend',
      tags: ['Logging'],
      summary: 'Receive single log',
      body: {
        type: 'object',
        required: ['objectName', 'message', 'level'],
        properties: {
          level: { type: 'string', enum: ['ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'] },
          objectName: { type: 'string' },
          message: { type: 'string' },
          data: { type: 'object' },
          methodName: { type: 'string' },
          stackTrace: { type: 'string' },
          performance: { type: 'object' }
        },
        additionalProperties: true // Allow additional properties
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            logId: { type: 'string' },
            timestamp: { type: 'string' }
          }
        }
      }
    }
  }, loggingController.receiveLog.bind(loggingController))

  /**
   * POST /api/logs/batch
   * Receive batch logs from frontend
   */
  fastify.post('/batch', {
    schema: {
      description: 'Receive batch logs from frontend',
      tags: ['Logging'],
      summary: 'Receive batch logs',
              body: {
          type: 'object',
          required: ['logs', 'sessionId', 'timestamp', 'version'],
          properties: {
            logs: {
              type: 'array',
              items: {
                type: 'object',
                required: ['objectName', 'message', 'level'],
                properties: {
                  level: { type: 'string', enum: ['ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'] },
                  objectName: { type: 'string' },
                  message: { type: 'string' },
                  data: { type: 'object' },
                  methodName: { type: 'string' },
                  stackTrace: { type: 'string' },
                  performance: { type: 'object' }
                },
                additionalProperties: true // Allow additional properties
              }
            },
            sessionId: { type: 'string' },
            timestamp: { type: 'string', format: 'date-time' },
            version: { type: 'string' }
          },
          additionalProperties: true // Allow additional properties
        },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            batchId: { type: 'string' },
            logIds: { type: 'array', items: { type: 'string' } },
            timestamp: { type: 'string' }
          }
        }
      }
    }
  }, loggingController.receiveBatchLogs.bind(loggingController))

  /**
   * POST /api/logs/game-event
   * Receive game event from frontend
   */
  fastify.post('/game-event', {
    schema: {
      description: 'Receive game event from frontend',
      tags: ['Logging'],
      summary: 'Receive game event',
      body: {
        type: 'object',
        required: ['eventName', 'eventData'],
        properties: {
          eventName: { type: 'string' },
          eventData: { type: 'object' },
          playerId: { type: 'string' },
          timestamp: { type: 'string', format: 'date-time' },
          gameState: { type: 'object' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            eventId: { type: 'string' },
            timestamp: { type: 'string' }
          }
        }
      }
    }
  }, loggingController.receiveGameEvent.bind(loggingController))

  /**
   * GET /api/logs/stats
   * Get logging statistics
   */
  fastify.get('/stats', {
    schema: {
      description: 'Get logging statistics',
      tags: ['Logging'],
      summary: 'Get log stats',
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                bufferSize: { type: 'number' },
                isProcessing: { type: 'boolean' },
                lastFlush: { type: 'string' },
                totalLogsProcessed: { type: 'number' },
                fileStats: {
                  type: 'object',
                  properties: {
                    totalFiles: { type: 'number' },
                    logFiles: { type: 'number' },
                    gameEventFiles: { type: 'number' },
                    totalSize: { type: 'number' }
                  }
                }
              }
            }
          }
        }
      }
    }
  }, loggingController.getLogStats.bind(loggingController))

  /**
   * POST /api/logs/flush
   * Manually flush log buffer
   */
  fastify.post('/flush', {
    schema: {
      description: 'Manually flush log buffer',
      tags: ['Logging'],
      summary: 'Manual flush',
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            timestamp: { type: 'string' }
          }
        }
      }
    }
  }, loggingController.manualFlush.bind(loggingController))

  /**
   * DELETE /api/logs/buffer
   * Clear log buffer
   */
  fastify.delete('/buffer', {
    schema: {
      description: 'Clear log buffer',
      tags: ['Logging'],
      summary: 'Clear buffer',
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            timestamp: { type: 'string' }
          }
        }
      }
    }
  }, loggingController.clearBuffer.bind(loggingController))

  /**
   * GET /api/logs/status
   * Get logging controller status
   */
  fastify.get('/status', {
    schema: {
      description: 'Get logging controller status',
      tags: ['Logging'],
      summary: 'Get status',
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                isInitialized: { type: 'boolean' },
                bufferSize: { type: 'number' },
                isProcessing: { type: 'boolean' },
                logsDirectory: { type: 'string' },
                lastFlush: { type: 'string' }
              }
            }
          }
        }
      }
    }
  }, loggingController.getStatus.bind(loggingController))

  /**
   * GET /api/logs/health
   * Health check for logging service
   */
  fastify.get('/health', {
    schema: {
      description: 'Health check for logging service',
      tags: ['Logging'],
      summary: 'Logging health check',
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            timestamp: { type: 'string' },
            service: { type: 'string' },
            bufferStatus: {
              type: 'object',
              properties: {
                size: { type: 'number' },
                isProcessing: { type: 'boolean' }
              }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'logging-service',
      bufferStatus: {
        size: loggingController.logBuffer.length,
        isProcessing: loggingController.isProcessing,
        isInitialized: loggingController.isInitialized
      }
    }
  })
}
