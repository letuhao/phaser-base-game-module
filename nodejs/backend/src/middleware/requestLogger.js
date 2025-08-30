import { logger } from '../utils/logger.js'

/**
 * Request logging middleware
 */
export const requestLogger = async (request, reply) => {
  const startTime = Date.now()
  
  // Store start time in request for later use
  request.startTime = startTime
}
