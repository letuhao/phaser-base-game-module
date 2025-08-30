import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../../logs')

// Custom format for console output
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize(),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let metaStr = ''
    if (Object.keys(meta).length > 0) {
      metaStr = ` ${JSON.stringify(meta)}`
    }
    return `${timestamp} [${level}]: ${message}${metaStr}`
  })
)

// Custom format for file output
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
)

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: fileFormat,
  defaultMeta: { service: 'minigame-backend' },
  transports: [
    // Console transport
    new winston.transports.Console({
      format: consoleFormat,
      level: process.env.LOG_LEVEL || 'info'
    }),
    
    // Daily rotate file transport for all logs
    new DailyRotateFile({
      filename: path.join(logsDir, 'application-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info'
    }),
    
    // Daily rotate file transport for error logs
    new DailyRotateFile({
      filename: path.join(logsDir, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
      level: 'error'
    })
  ]
})

// Add stream for Morgan HTTP request logging
logger.stream = {
  write: (message) => {
    logger.info('HTTP', message.trim())
  }
}

// Helper methods for structured logging
export const logRequest = (req, res, responseTime) => {
  logger.info('Request', {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    responseTime: `${responseTime}ms`,
    statusCode: res.statusCode
  })
}

export const logError = (error, context = {}) => {
  logger.error('Error', {
    message: error.message,
    stack: error.stack,
    ...context
  })
}

export const logGameEvent = (eventName, eventData, playerId) => {
  logger.info('GameEvent', {
    eventName,
    playerId,
    timestamp: new Date().toISOString(),
    data: eventData
  })
}

export const logPerformance = (metricName, value, unit = '', metadata = {}) => {
  logger.info('Performance', {
    metricName,
    value,
    unit,
    timestamp: new Date().toISOString(),
    ...metadata
  })
}

export { logger }
