# Core Logger System

A comprehensive, production-ready logging system designed specifically for Phaser game development. This system provides advanced debugging capabilities, performance monitoring, server integration, and comprehensive error tracking.

## 🏗️ **Architecture Overview**

```
Core Logger System
├── Logger.ts              # Main logger class with enhanced features
├── ErrorTracker.ts        # Comprehensive error tracking and analytics
├── LogServerClient.ts     # Server integration with retry logic
├── types/
│   └── LoggerTypes.ts     # Type definitions and interfaces
├── config/
│   └── LoggerConfig.ts    # Configuration management
└── index.ts               # Main exports
```

## 🚀 **Key Features**

### **🎯 Enhanced Logging**
- **5 Log Levels**: TRACE, DEBUG, INFO, WARN, ERROR
- **Object-specific logging** with granular control
- **Method name tracking** for better debugging context
- **Data sanitization** (removes sensitive info, handles circular references)
- **Stack trace capture** for errors

### **📊 Performance Monitoring**
- **Real-time FPS monitoring** with threshold alerts
- **Memory usage tracking** (Chrome DevTools compatible)
- **Network performance** monitoring
- **Custom performance metrics** support
- **Automatic performance alerts**

### **🌐 Server Integration**
- **Automatic log forwarding** to backend servers
- **Batch processing** for efficiency
- **Retry logic** with exponential backoff
- **Offline support** with queue management
- **Game event logging** for analytics

### **🔍 Error Tracking**
- **Comprehensive error statistics**
- **Error rate monitoring** with alert levels
- **Trend analysis** over time
- **Most frequent error identification**
- **Memory usage optimization**

### **⚡ Smart Buffering**
- **Configurable buffer sizes**
- **Automatic flushing** on intervals
- **Page unload protection**
- **Memory-efficient storage**

## 📖 **Usage Examples**

### **Basic Logging**
```typescript
import { logger, logError, logInfo, logPerformance } from '@/core'

// Simple logging
logger.info('Game', 'Player joined the game', { playerId: '123', level: 5 })
logger.error('Network', 'Failed to connect to server', { endpoint: '/api/game' })

// Convenience functions
logInfo('Scene', 'Scene loaded successfully')
logError('Player', 'Invalid move detected', { position: { x: 100, y: 200 } })
```

### **Performance Monitoring**
```typescript
import { logPerformance } from '@/core'

// Track custom performance metrics
logPerformance('renderTime', 16.67, 'ms', { scene: 'main', objects: 150 })
logPerformance('memoryUsage', 45.2, 'MB', { type: 'textures' })
logPerformance('networkLatency', 120, 'ms', { endpoint: '/api/update' })
```

### **Game Event Logging**
```typescript
import { logGameEvent } from '@/core'

// Log important game events
logGameEvent('player_death', {
  cause: 'enemy_attack',
  playerLevel: 15,
  location: { x: 500, y: 300 }
}, 'player_123')

logGameEvent('level_completed', {
  level: 3,
  time: 120000,
  score: 8500,
  collectibles: 8
}, 'player_123')
```

### **Advanced Configuration**
```typescript
import { Logger, createDevelopmentConfig, createProductionConfig } from '@/core'

// Development environment
const devLogger = Logger.getInstance(createDevelopmentConfig())

// Production environment
const prodLogger = Logger.getInstance(createProductionConfig())

// Custom configuration
const customLogger = Logger.getInstance({
  globalLevel: LogLevel.DEBUG,
  server: {
    enabled: true,
    endpoint: 'https://your-server.com/api/logs',
    apiKey: 'your-api-key'
  },
  performance: {
    enabled: true,
    fpsThreshold: 25,
    memoryThreshold: 70
  }
})
```

## ⚙️ **Configuration Options**

### **Environment-Specific Configs**
```typescript
import { getEnvironmentConfig } from '@/core/config/LoggerConfig'

// Automatically get appropriate config for environment
const config = getEnvironmentConfig(process.env.NODE_ENV || 'development')
const logger = Logger.getInstance(config)
```

### **Object-Specific Settings**
```typescript
const config = createLoggerConfig({
  objects: [
    { name: 'Game', enabled: true, level: LogLevel.DEBUG, includePerformance: true, includeStackTrace: true },
    { name: 'Player', enabled: true, level: LogLevel.INFO, includePerformance: false, includeStackTrace: true },
    { name: 'Network', enabled: true, level: LogLevel.WARN, includePerformance: true, includeStackTrace: false }
  ]
})
```

### **Server Integration Settings**
```typescript
const config = createLoggerConfig({
  server: {
    enabled: true,
    endpoint: '/api/logs',
    batchSize: 100,
    retryAttempts: 5,
    retryDelay: 2000,
    timeout: 10000,
    sendErrorsImmediately: true,
    sendGameEventsImmediately: true
  }
})
```

## 🔧 **Advanced Features**

### **Error Tracking & Analytics**
```typescript
import { logger } from '@/core'

// Get comprehensive error statistics
const errorStats = logger.getErrorStatistics()
console.log('Total errors:', errorStats.totalErrors)
console.log('Error rate:', errorStats.errorRate, 'errors/minute')
console.log('Most frequent errors:', errorStats.recentErrors)

// Check error rate alerts
const alertLevel = logger.getErrorStatistics().errorRate > 20 ? 'critical' : 'normal'
```

### **Performance Metrics**
```typescript
import { logger } from '@/core'

// Get current performance data
const metrics = logger.getPerformanceMetrics()
console.log('Current FPS:', metrics.get('fps')?.value)
console.log('Memory usage:', metrics.get('memory')?.value)

// Export performance data
const performanceData = Array.from(metrics.entries()).map(([key, metric]) => ({
  metric: key,
  value: metric.value,
  timestamp: metric.timestamp
}))
```

### **Server Status Monitoring**
```typescript
import { logger } from '@/core'

// Check server connectivity
const serverStatus = await logger.getServerStatus()
console.log('Server online:', serverStatus.online)
console.log('Endpoint:', serverStatus.endpoint)

// Test connection
const isConnected = await logger.testConnection()
if (!isConnected) {
  console.warn('Log server is unreachable')
}
```

## 🚨 **Error Handling & Debugging**

### **Automatic Error Capture**
```typescript
// Global errors are automatically captured
window.addEventListener('error', (event) => {
  // Logger automatically captures this
})

// Unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  // Logger automatically captures this
})
```

### **Data Sanitization**
```typescript
// Sensitive data is automatically redacted
logger.info('Auth', 'User login attempt', {
  username: 'john_doe',
  password: 'secret123',        // Will be redacted
  token: 'jwt_token_here'      // Will be redacted
})

// Circular references are handled
const obj: any = { name: 'test' }
obj.self = obj
logger.debug('Test', 'Object with circular reference', obj) // Handles circular refs
```

## 📊 **Performance Considerations**

### **Memory Management**
- **Configurable buffer sizes** prevent memory leaks
- **Automatic cleanup** of old error history
- **Efficient data structures** for high-volume logging

### **Network Optimization**
- **Batch processing** reduces HTTP requests
- **Configurable retry logic** handles network issues
- **Offline queue management** ensures no data loss

### **CPU Optimization**
- **Asynchronous processing** doesn't block main thread
- **Configurable flush intervals** balance real-time vs performance
- **Smart filtering** prevents unnecessary log processing

## 🔒 **Security Features**

### **Data Protection**
- **Automatic redaction** of sensitive fields
- **Configurable data depth limits**
- **Session ID management** for user tracking

### **Server Security**
- **API key authentication** support
- **HTTPS enforcement** recommendations
- **Rate limiting** through batch processing

## 🧪 **Testing & Development**

### **Testing Configuration**
```typescript
import { createTestingConfig } from '@/core/config/LoggerConfig'

// Minimal logging for tests
const testLogger = Logger.getInstance(createTestingConfig())
```

### **Development Tools**
```typescript
// Enable detailed logging in development
const devConfig = createDevelopmentConfig()
devConfig.console.colors = true
devConfig.console.showStackTrace = true
devConfig.performance.enabled = true

const devLogger = Logger.getInstance(devConfig)
```

## 📈 **Monitoring & Analytics**

### **Real-time Monitoring**
- **Live error rate tracking**
- **Performance threshold alerts**
- **Server connectivity status**

### **Data Export**
```typescript
// Export error data for analysis
const errorData = logger.exportErrorData()
console.log('Error trends:', errorData.errorTrends)
console.log('Most frequent errors:', errorData.mostFrequentErrors)

// Export performance data
const performanceData = logger.getPerformanceMetrics()
```

## 🚀 **Integration with Phaser**

### **Game Scene Integration**
```typescript
import { logInfo, logError, logPerformance } from '@/core'

export class GameScene extends Phaser.Scene {
  create() {
    logInfo('Scene', 'Game scene created', { sceneKey: this.scene.key })
    
    // Monitor scene performance
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        const fps = this.game.loop.actualFps
        logPerformance('sceneFPS', fps, 'fps', { scene: this.scene.key })
      },
      loop: true
    })
  }
  
  update(time: number, delta: number) {
    // Log performance issues
    if (delta > 20) {
      logError('Performance', 'Frame time exceeded threshold', { delta, threshold: 20 })
    }
  }
}
```

### **Player Action Logging**
```typescript
import { logGameEvent } from '@/core'

class Player extends Phaser.GameObjects.Sprite {
  moveTo(x: number, y: number) {
    logGameEvent('player_move', {
      from: { x: this.x, y: this.y },
      to: { x, y },
      distance: Phaser.Math.Distance.Between(this.x, this.y, x, y)
    }, this.playerId)
    
    // ... move logic
  }
}
```

## 🔧 **Troubleshooting**

### **Common Issues**

1. **Logs not appearing in console**
   - Check log level configuration
   - Verify object-specific settings
   - Ensure console logging is enabled

2. **Server integration not working**
   - Verify endpoint URL
   - Check network connectivity
   - Review retry configuration

3. **Performance impact**
   - Reduce log buffer size
   - Increase flush intervals
   - Disable performance monitoring if not needed

### **Debug Mode**
```typescript
// Enable debug mode for troubleshooting
const debugConfig = createDevelopmentConfig()
debugConfig.console.showData = true
debugConfig.console.showStackTrace = true
debugConfig.performance.enabled = true

const debugLogger = Logger.getInstance(debugConfig)
```

## 📚 **API Reference**

### **Core Classes**
- `Logger` - Main logging class
- `ErrorTracker` - Error monitoring and analytics
- `LogServerClient` - Server integration client

### **Configuration Functions**
- `createLoggerConfig()` - Create custom configuration
- `createDevelopmentConfig()` - Development environment config
- `createProductionConfig()` - Production environment config
- `createTestingConfig()` - Testing environment config

### **Convenience Functions**
- `logError()`, `logWarn()`, `logInfo()`, `logDebug()`, `logTrace()`
- `logPerformance()` - Performance metric logging
- `logGameEvent()` - Game event logging

## 🎯 **Best Practices**

1. **Use appropriate log levels** - Don't log everything at DEBUG
2. **Include relevant context** - Always provide useful data
3. **Monitor performance impact** - Balance logging detail with performance
4. **Configure for environment** - Use different configs for dev/prod
5. **Handle sensitive data** - Let the logger sanitize automatically
6. **Monitor error rates** - Set up alerts for critical thresholds

## 🔗 **Related Documentation**

- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
- [Console API](https://developer.mozilla.org/en-US/docs/Web/API/Console)

---

This enhanced Logger system provides everything you need for professional game development, from basic debugging to production monitoring and analytics. It's designed to scale with your game and provide insights that help improve both development experience and game performance.
