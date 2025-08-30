import { logger } from '../utils/logger.js'

/**
 * Global error handler middleware
 */
export const errorHandler = async (error, request, reply) => {
  // Log the error
  logger.error('ErrorHandler', 'Unhandled error occurred', {
    error: error.message,
    stack: error.stack,
    url: request.url,
    method: request.method,
    ip: request.ip,
    userAgent: request.headers['user-agent']
  })

  // Don't expose internal errors in production
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  const errorResponse = {
    success: false,
    message: isDevelopment ? error.message : 'Internal server error',
    ...(isDevelopment && { stack: error.stack })
  }

  // Set appropriate status code
  const statusCode = error.statusCode || 500
  reply.code(statusCode)

  return errorResponse
}
