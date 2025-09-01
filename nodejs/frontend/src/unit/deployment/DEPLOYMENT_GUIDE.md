# Unit System Deployment Guide

## Overview
This guide provides comprehensive instructions for deploying the refactored unit system with improved performance, monitoring, and A/B testing capabilities.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Feature Flags](#feature-flags)
5. [Monitoring Setup](#monitoring-setup)
6. [A/B Testing](#ab-testing)
7. [Performance Optimization](#performance-optimization)
8. [Migration](#migration)
9. [Rollback Procedures](#rollback-procedures)
10. [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements
- Node.js 16+ 
- TypeScript 4.5+
- Jest (for testing)
- Memory: Minimum 512MB available
- CPU: Multi-core recommended

### Dependencies
```bash
npm install --save-dev jest @types/jest
npm install --save typescript
```

### Environment Setup
- Development environment configured
- Staging environment available
- Production environment with monitoring tools
- Database for metrics storage (optional)

## Installation

### Step 1: Backup Current System
```bash
# Create backup of current unit system
cp -r src/unit src/unit.backup.$(date +%Y%m%d)
```

### Step 2: Install New Components
```bash
# The refactored system is already included in the codebase
# No additional installation required
```

### Step 3: Update Dependencies
```bash
# Ensure all dependencies are up to date
npm install
npm run build
```

### Step 4: Run Tests
```bash
# Verify system integrity
npm test -- --testPathPattern=unit
```

## Configuration

### Basic Configuration
Create a configuration file `unit-system.config.js`:

```javascript
module.exports = {
  // Feature flags
  featureFlags: {
    enabled: true,
    defaultEnvironment: 'development'
  },
  
  // Monitoring
  monitoring: {
    enabled: true,
    metricsCollectionInterval: 30000, // 30 seconds
    healthCheckInterval: 60000, // 1 minute
    alertingEnabled: true,
    performanceThresholds: {
      maxExecutionTime: 100, // ms
      maxMemoryUsage: 100 * 1024 * 1024, // 100MB
      minThroughput: 1000, // ops/sec
      maxErrorRate: 5 // percentage
    }
  },
  
  // Performance
  performance: {
    enableCaching: true,
    enableComposition: true,
    cacheSize: 1000,
    cacheTtl: 300000 // 5 minutes
  },
  
  // Logging
  logging: {
    level: 'info',
    enableDebugMode: false
  }
};
```

### Environment-Specific Configuration

#### Development
```javascript
module.exports = {
  ...baseConfig,
  monitoring: {
    ...baseConfig.monitoring,
    enabled: false, // Disable monitoring in dev
    alertingEnabled: false
  },
  logging: {
    level: 'debug',
    enableDebugMode: true
  }
};
```

#### Staging
```javascript
module.exports = {
  ...baseConfig,
  featureFlags: {
    ...baseConfig.featureFlags,
    defaultEnvironment: 'staging'
  },
  monitoring: {
    ...baseConfig.monitoring,
    metricsCollectionInterval: 15000 // More frequent in staging
  }
};
```

#### Production
```javascript
module.exports = {
  ...baseConfig,
  featureFlags: {
    ...baseConfig.featureFlags,
    defaultEnvironment: 'production'
  },
  monitoring: {
    ...baseConfig.monitoring,
    alertingEnabled: true
  },
  logging: {
    level: 'warn',
    enableDebugMode: false
  }
};
```

## Feature Flags

### Setting Up Feature Flags
```typescript
import { FeatureFlagSystem, FeatureFlagContext } from './deployment/FeatureFlagSystem';

const context: FeatureFlagContext = {
  environment: 'production',
  timestamp: new Date()
};

const featureFlagSystem = new FeatureFlagSystem(context);

// Register unit system rollout flag
const rolloutFlag = FeatureFlagSystem.createUnitSystemRolloutFlag(
  'unit-system-v2-rollout',
  10, // 10% rollout
  ['staging', 'production']
);

featureFlagSystem.registerFlag(rolloutFlag);

// Register A/B test flag
const abTestFlag = FeatureFlagSystem.createABTestFlag(
  'performance-ab-test',
  'Performance Comparison',
  50 // 50% A/B test
);

featureFlagSystem.registerFlag(abTestFlag);
```

### Using Feature Flags
```typescript
// Check if refactored system should be used
const result = featureFlagSystem.isEnabled('unit-system-v2-rollout', {
  userId: 'user123',
  sessionId: 'session456'
});

if (result.enabled) {
  // Use refactored system
  const calculator = new RefactoredSizeUnitCalculator(/* params */);
} else {
  // Use original system
  const calculator = new SizeUnitCalculator(/* params */);
}
```

## Monitoring Setup

### Initialize Monitoring System
```typescript
import { ProductionMonitoringSystem, MonitoringConfig } from './monitoring/ProductionMonitoringSystem';

const monitoringConfig: MonitoringConfig = {
  enabled: true,
  metricsCollectionInterval: 30000,
  healthCheckInterval: 60000,
  alertingEnabled: true,
  performanceThresholds: {
    maxExecutionTime: 100,
    maxMemoryUsage: 100 * 1024 * 1024,
    minThroughput: 1000,
    maxErrorRate: 5
  }
};

const monitoringSystem = new ProductionMonitoringSystem(monitoringConfig);
monitoringSystem.start();
```

### Recording Metrics
```typescript
// Record calculation performance
monitoringSystem.recordCalculationPerformance(
  'size-calculation',
  executionTime,
  memoryUsage,
  context,
  config
);

// Record cache performance
monitoringSystem.recordCachePerformance(
  'size-cache',
  hitRate,
  evictionRate,
  memoryUsage
);

// Record errors
try {
  // Perform calculation
} catch (error) {
  monitoringSystem.recordError(error, 'SizeUnitCalculator', {
    context,
    config
  });
}
```

### Health Check Endpoints
```typescript
// Create health check endpoint
app.get('/health/unit-system', (req, res) => {
  const statistics = monitoringSystem.getStatistics();
  const recentAlerts = monitoringSystem.getRecentAlerts(1); // Last hour
  
  res.json({
    status: statistics.systemStatus,
    statistics,
    recentAlerts: recentAlerts.length,
    timestamp: new Date()
  });
});
```

## A/B Testing

### Performance Comparison Setup
```typescript
import { PerformanceComparisonSystem, TestScenario } from './testing/performance/PerformanceComparisonSystem';

const performanceSystem = new PerformanceComparisonSystem();

// Create test scenarios
const scenarios: TestScenario[] = [
  {
    id: 'production-size-test',
    name: 'Production Size Calculation Test',
    description: 'Test size calculations with real production data',
    iterations: 1000,
    warmupIterations: 100,
    context: {
      scene: { width: 1920, height: 1080 },
      parent: { width: 800, height: 600 },
      viewport: { width: 1920, height: 1080 },
      content: { width: 100, height: 100 }
    },
    configs: [/* production configs */]
  }
];

// Run comparison
const results = await performanceSystem.runComparison(scenarios);
const report = performanceSystem.generateReport(results);
```

### Automated A/B Testing
```typescript
// Schedule regular A/B tests
setInterval(async () => {
  const results = await performanceSystem.runComparison(scenarios);
  
  // Check if improvements are statistically significant
  const significantImprovements = results.filter(r => 
    r.statisticalSignificance.isSignificant && 
    r.improvement.executionTime > 10
  );
  
  if (significantImprovements.length > 0) {
    // Increase rollout percentage
    featureFlagSystem.updateFlag('unit-system-v2-rollout', {
      rolloutPercentage: Math.min(100, currentPercentage + 10)
    });
  }
}, 24 * 60 * 60 * 1000); // Daily
```

## Performance Optimization

### Cache Configuration
```typescript
// Optimize cache settings based on usage patterns
const cacheConfig = {
  size: 2000, // Increase cache size
  ttl: 600000, // 10 minutes
  enableLRU: true
};
```

### Strategy Optimization
```typescript
// Adjust strategy weights based on performance data
const strategyWeights = {
  'pixel-strategy': 0.8,
  'percent-strategy': 0.6,
  'responsive-strategy': 0.9
};
```

### Memory Optimization
```typescript
// Monitor memory usage and optimize
const memoryThreshold = 80; // 80% memory usage
if (getMemoryUsage() > memoryThreshold) {
  // Clear caches
  // Reduce cache size
  // Force garbage collection
}
```

## Migration

### Step-by-Step Migration

#### Phase 1: Development Testing
1. Enable feature flags for development
2. Run comprehensive tests
3. Monitor performance metrics
4. Fix any issues

#### Phase 2: Staging Deployment
1. Deploy to staging environment
2. Enable monitoring
3. Run A/B tests
4. Validate performance improvements

#### Phase 3: Production Rollout
1. Start with 10% rollout
2. Monitor closely for 24 hours
3. Gradually increase to 50%
4. Monitor for another 24 hours
5. Increase to 100% if no issues

### Migration Checklist
- [ ] Backup current system
- [ ] Deploy to staging
- [ ] Run performance tests
- [ ] Enable monitoring
- [ ] Configure feature flags
- [ ] Start gradual rollout
- [ ] Monitor metrics
- [ ] Validate functionality
- [ ] Complete rollout

## Rollback Procedures

### Quick Rollback
```typescript
// Disable feature flag immediately
featureFlagSystem.updateFlag('unit-system-v2-rollout', {
  enabled: false
});

// Switch back to original system
const calculator = new SizeUnitCalculator(/* params */);
```

### Emergency Rollback Script
```bash
#!/bin/bash
# emergency-rollback.sh

echo "Starting emergency rollback..."

# Stop monitoring
echo "Stopping monitoring..."
# kill monitoring process

# Disable feature flags
echo "Disabling feature flags..."
# curl -X POST /api/feature-flags/disable

# Restore backup
echo "Restoring backup..."
cp -r src/unit.backup.* src/unit

# Restart services
echo "Restarting services..."
# systemctl restart unit-system

echo "Rollback completed"
```

### Rollback Triggers
- Error rate > 10%
- Performance degradation > 20%
- Memory usage > 90%
- Critical alerts > 5 in 1 hour

## Troubleshooting

### Common Issues

#### High Memory Usage
**Symptoms**: Memory usage > 80%
**Solutions**:
- Reduce cache size
- Clear unused caches
- Check for memory leaks
- Restart monitoring system

#### Performance Degradation
**Symptoms**: Execution time > threshold
**Solutions**:
- Check cache hit rates
- Optimize strategy selection
- Review composition settings
- Monitor system resources

#### Feature Flag Issues
**Symptoms**: Inconsistent behavior
**Solutions**:
- Verify flag configuration
- Check user targeting
- Validate environment settings
- Review rollout percentages

#### Monitoring Alerts
**Symptoms**: Too many alerts
**Solutions**:
- Adjust thresholds
- Review alert rules
- Check monitoring configuration
- Validate metrics collection

### Debug Mode
```typescript
// Enable debug mode
const debugConfig = {
  logging: {
    level: 'debug',
    enableDebugMode: true
  },
  monitoring: {
    enabled: true,
    metricsCollectionInterval: 5000 // More frequent
  }
};
```

### Log Analysis
```bash
# Search for errors
grep "ERROR" logs/unit-system.log

# Search for performance issues
grep "execution_time" logs/unit-system.log | awk '$2 > 100'

# Search for memory issues
grep "memory_usage" logs/unit-system.log | awk '$2 > 80'
```

### Performance Profiling
```typescript
// Enable performance profiling
const profiler = {
  enabled: true,
  sampleRate: 0.1, // 10% of requests
  outputFile: 'performance-profile.json'
};
```

## Best Practices

### Performance
- Monitor cache hit rates regularly
- Optimize strategy weights based on usage
- Use appropriate cache TTL values
- Monitor memory usage patterns

### Monitoring
- Set realistic thresholds
- Review alerts regularly
- Maintain monitoring dashboards
- Document alert procedures

### Deployment
- Always test in staging first
- Use gradual rollouts
- Monitor closely during deployment
- Have rollback procedures ready

### Maintenance
- Regular performance reviews
- Update thresholds based on usage
- Clean up old metrics data
- Review and optimize configurations

## Support

### Documentation
- [Unit System Architecture](./UNIT_SYSTEM_ANALYSIS.md)
- [SOLID Principles Implementation](./SOLID_REFACTORING_SUMMARY.md)
- [Performance Benchmarks](./performance-benchmarks.md)

### Contact
- Technical issues: tech-support@company.com
- Performance questions: performance-team@company.com
- Deployment assistance: devops-team@company.com

### Escalation Procedures
1. Check troubleshooting guide
2. Review monitoring dashboards
3. Contact technical support
4. Escalate to performance team
5. Emergency rollback if needed
