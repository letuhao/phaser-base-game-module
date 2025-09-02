/**
 * Test file to demonstrate the new logger format
 * This shows how the logger now outputs single formatted strings
 */

import { Logger } from './Logger';

/**
 * Test the new logger format
 */
export function testLoggerFormat(): void {
  const logger = Logger.getInstance();

  console.log('=== Testing New Logger Format with Colors ===');
  console.log('All logs will now be single formatted strings with JSON.stringify for data');
  console.log('Each log level has its own color for better visual identification');
  console.log('');

  // Test different log levels with various data types
  logger.info('LoggerFormatTest', 'testLoggerFormat', 'Testing info level with simple data', {
    userId: 12345,
    action: 'login',
    timestamp: new Date().toISOString(),
  });

  logger.warn('LoggerFormatTest', 'testLoggerFormat', 'Testing warning with nested object', {
    error: {
      code: 'VALIDATION_ERROR',
      message: 'Invalid input provided',
      details: {
        field: 'email',
        value: 'invalid-email',
        expected: 'valid email format',
      },
    },
    context: {
      userAgent: 'Mozilla/5.0...',
      url: '/api/login',
    },
  });

  logger.error('LoggerFormatTest', 'testLoggerFormat', 'Testing error with complex data', {
    stackTrace: 'Error: Something went wrong\n    at testFunction (test.js:10:5)',
    metadata: {
      requestId: 'req-123-456',
      sessionId: 'sess-789-012',
      userId: 12345,
      timestamp: Date.now(),
    },
    errorDetails: {
      type: 'TypeError',
      message: 'Cannot read property of undefined',
      line: 42,
      column: 15,
    },
  });

  logger.debug('LoggerFormatTest', 'testLoggerFormat', 'Testing debug with array data', {
    performance: {
      loadTime: 1250,
      memoryUsage: 45.2,
      networkRequests: [
        { url: '/api/users', duration: 150, status: 200 },
        { url: '/api/posts', duration: 89, status: 200 },
        { url: '/api/comments', duration: 234, status: 200 },
      ],
    },
  });

  logger.info('LoggerFormatTest', 'testLoggerFormat', 'Testing with null data', null);

  logger.info('LoggerFormatTest', 'testLoggerFormat', 'Testing with undefined data', undefined);

  logger.info('LoggerFormatTest', 'testLoggerFormat', 'Testing with no data');

  console.log('');
  console.log('=== Benefits of New Format ===');
  console.log('1. Single string output - easier to save in Chrome console');
  console.log('2. JSON.stringify preserves data structure');
  console.log('3. Timestamp included for better debugging');
  console.log('4. Class.method format for easy identification');
  console.log('5. No data loss when saving console logs to files');
  console.log('6. Color-coded log levels for better visual identification');
  console.log('');
  console.log('=== Color Legend ===');
  console.log('🔴 ERROR - Red');
  console.log('🟡 WARN - Yellow');
  console.log('🔵 INFO - Cyan');
  console.log('🟢 DEBUG - Green');
  console.log('🟣 TRACE - Magenta');
}

// Export for easy testing
export default testLoggerFormat;
