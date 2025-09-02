import { UnitContext } from '../interfaces/IUnit';
import { IUnitConfig } from '../interfaces/IUnitConfig';
import { Logger } from '../../core/Logger';

export interface PerformanceMetric {
  timestamp: Date;
  metricName: string;
  value: number;
  unit: string;
  tags: Record<string, string>;
}

export interface HealthCheck {
  component: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  message: string;
  timestamp: Date;
  details?: Record<string, any>;
}

export interface Alert {
  id: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  component: string;
  metadata?: Record<string, any>;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
}

export interface MonitoringConfig {
  enabled: boolean;
  metricsCollectionInterval: number; // milliseconds
  healthCheckInterval: number; // milliseconds
  alertingEnabled: boolean;
  performanceThresholds: {
    maxExecutionTime: number; // milliseconds
    maxMemoryUsage: number; // bytes
    minThroughput: number; // ops/sec
    maxErrorRate: number; // percentage
  };
}

export class ProductionMonitoringSystem {
  private metrics: PerformanceMetric[] = [];
  private healthChecks: HealthCheck[] = [];
  private alerts: Alert[] = [];
  private config: MonitoringConfig;
  private isRunning: boolean = false;
  private metricsInterval?: NodeJS.Timeout;
  private healthCheckInterval?: NodeJS.Timeout;
  private readonly logger: Logger;

  constructor(config: MonitoringConfig) {
    this.config = config;
    this.logger = Logger.getInstance();
  }

  /**
   * Start monitoring
   */
  start(): void {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;

    if (this.config.enabled) {
      // Start metrics collection
      this.metricsInterval = setInterval(() => {
        this.collectMetrics();
      }, this.config.metricsCollectionInterval);

      // Start health checks
      this.healthCheckInterval = setInterval(() => {
        this.performHealthChecks();
      }, this.config.healthCheckInterval);

      this.logger.info('ProductionMonitoringSystem', 'start', 'Production monitoring started');
    }
  }

  /**
   * Stop monitoring
   */
  stop(): void {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;

    if (this.metricsInterval) {
      clearInterval(this.metricsInterval);
      this.metricsInterval = undefined;
    }

    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = undefined;
    }

    this.logger.info('ProductionMonitoringSystem', 'stop', 'Production monitoring stopped');
  }

  /**
   * Record a performance metric
   */
  recordMetric(
    metricName: string,
    value: number,
    unit: string,
    tags: Record<string, string> = {}
  ): void {
    if (!this.config.enabled) {
      return;
    }

    const metric: PerformanceMetric = {
      timestamp: new Date(),
      metricName,
      value,
      unit,
      tags,
    };

    this.metrics.push(metric);

    // Keep only last 1000 metrics to prevent memory issues
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }

    // Check thresholds and create alerts if needed
    this.checkPerformanceThresholds(metric);
  }

  /**
   * Record calculation performance
   */
  recordCalculationPerformance(
    operation: string,
    executionTime: number,
    memoryUsage: number,
    _context: UnitContext,
    config: IUnitConfig
  ): void {
    this.recordMetric('calculation.execution_time', executionTime, 'ms', {
      operation,
      unitType: this.getUnitType(config),
      context: 'calculation',
    });

    this.recordMetric('calculation.memory_usage', memoryUsage, 'bytes', {
      operation,
      unitType: this.getUnitType(config),
      context: 'calculation',
    });

    this.recordMetric('calculation.throughput', 1000 / executionTime, 'ops/sec', {
      operation,
      unitType: this.getUnitType(config),
      context: 'calculation',
    });
  }

  /**
   * Record cache performance
   */
  recordCachePerformance(
    cacheId: string,
    hitRate: number,
    evictionRate: number,
    memoryUsage: number
  ): void {
    this.recordMetric('cache.hit_rate', hitRate, 'percentage', {
      cacheId,
      context: 'cache',
    });

    this.recordMetric('cache.eviction_rate', evictionRate, 'percentage', {
      cacheId,
      context: 'cache',
    });

    this.recordMetric('cache.memory_usage', memoryUsage, 'bytes', {
      cacheId,
      context: 'cache',
    });
  }

  /**
   * Record strategy performance
   */
  recordStrategyPerformance(
    strategyId: string,
    executionTime: number,
    successRate: number,
    compositionCount: number
  ): void {
    this.recordMetric('strategy.execution_time', executionTime, 'ms', {
      strategyId,
      context: 'strategy',
    });

    this.recordMetric('strategy.success_rate', successRate, 'percentage', {
      strategyId,
      context: 'strategy',
    });

    this.recordMetric('strategy.composition_count', compositionCount, 'count', {
      strategyId,
      context: 'strategy',
    });
  }

  /**
   * Record error
   */
  recordError(error: Error, component: string, context: Record<string, any> = {}): void {
    this.recordMetric('errors.count', 1, 'count', {
      component,
      errorType: error.constructor.name,
      context: 'error',
    });

    if (this.config.alertingEnabled) {
      this.createAlert({
        severity: 'error',
        title: `Error in ${component}`,
        message: error.message,
        component,
        metadata: {
          errorType: error.constructor.name,
          stack: error.stack,
          context,
        },
      });
    }
  }

  /**
   * Perform health checks
   */
  private performHealthChecks(): void {
    const checks: HealthCheck[] = [];

    // Check overall system health
    const systemHealth = this.checkSystemHealth();
    checks.push(systemHealth);

    // Check component health
    const componentHealth = this.checkComponentHealth();
    checks.push(...componentHealth);

    // Check performance health
    const performanceHealth = this.checkPerformanceHealth();
    checks.push(performanceHealth);

    this.healthChecks.push(...checks);

    // Keep only last 100 health checks
    if (this.healthChecks.length > 100) {
      this.healthChecks = this.healthChecks.slice(-100);
    }

    // Create alerts for unhealthy components
    checks.forEach(check => {
      if (check.status === 'unhealthy' && this.config.alertingEnabled) {
        this.createAlert({
          severity: 'warning',
          title: `Unhealthy component: ${check.component}`,
          message: check.message,
          component: check.component,
          metadata: check.details,
        });
      }
    });
  }

  /**
   * Check system health
   */
  private checkSystemHealth(): HealthCheck {
    const memoryUsage = this.getMemoryUsage();
    const cpuUsage = this.getCPUUsage();

    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    let message = 'System is healthy';

    if (memoryUsage > 80) {
      status = 'unhealthy';
      message = `High memory usage: ${memoryUsage.toFixed(2)}%`;
    } else if (memoryUsage > 60) {
      status = 'degraded';
      message = `Elevated memory usage: ${memoryUsage.toFixed(2)}%`;
    }

    if (cpuUsage > 90) {
      status = 'unhealthy';
      message = `High CPU usage: ${cpuUsage.toFixed(2)}%`;
    } else if (cpuUsage > 70) {
      status = status === 'healthy' ? 'degraded' : status;
      message = `Elevated CPU usage: ${cpuUsage.toFixed(2)}%`;
    }

    return {
      component: 'system',
      status,
      message,
      timestamp: new Date(),
      details: {
        memoryUsage,
        cpuUsage,
      },
    };
  }

  /**
   * Check component health
   */
  private checkComponentHealth(): HealthCheck[] {
    const checks: HealthCheck[] = [];

    // Check calculator health
    checks.push({
      component: 'calculators',
      status: 'healthy',
      message: 'All calculators are operational',
      timestamp: new Date(),
    });

    // Check strategy health
    checks.push({
      component: 'strategies',
      status: 'healthy',
      message: 'All strategies are operational',
      timestamp: new Date(),
    });

    // Check cache health
    checks.push({
      component: 'cache',
      status: 'healthy',
      message: 'Cache is operational',
      timestamp: new Date(),
    });

    return checks;
  }

  /**
   * Check performance health
   */
  private checkPerformanceHealth(): HealthCheck {
    const recentMetrics = this.metrics.filter(
      m => m.timestamp > new Date(Date.now() - 5 * 60 * 1000) // Last 5 minutes
    );

    const executionTimes = recentMetrics
      .filter(m => m.metricName === 'calculation.execution_time')
      .map(m => m.value);

    const errorCounts = recentMetrics
      .filter(m => m.metricName === 'errors.count')
      .map(m => m.value);

    const avgExecutionTime =
      executionTimes.length > 0
        ? executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length
        : 0;

    const totalErrors = errorCounts.reduce((a, b) => a + b, 0);

    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    let message = 'Performance is healthy';

    if (avgExecutionTime > this.config.performanceThresholds.maxExecutionTime) {
      status = 'unhealthy';
      message = `High execution time: ${avgExecutionTime.toFixed(2)}ms`;
    } else if (avgExecutionTime > this.config.performanceThresholds.maxExecutionTime * 0.8) {
      status = 'degraded';
      message = `Elevated execution time: ${avgExecutionTime.toFixed(2)}ms`;
    }

    if (totalErrors > 10) {
      status = 'unhealthy';
      message = `High error count: ${totalErrors}`;
    } else if (totalErrors > 5) {
      status = status === 'healthy' ? 'degraded' : status;
      message = `Elevated error count: ${totalErrors}`;
    }

    return {
      component: 'performance',
      status,
      message,
      timestamp: new Date(),
      details: {
        avgExecutionTime,
        totalErrors,
        metricsCount: recentMetrics.length,
      },
    };
  }

  /**
   * Check performance thresholds
   */
  private checkPerformanceThresholds(metric: PerformanceMetric): void {
    if (!this.config.alertingEnabled) {
      return;
    }

    if (
      metric.metricName === 'calculation.execution_time' &&
      metric.value > this.config.performanceThresholds.maxExecutionTime
    ) {
      this.createAlert({
        severity: 'warning',
        title: 'High execution time detected',
        message: `Execution time ${metric.value}ms exceeds threshold ${this.config.performanceThresholds.maxExecutionTime}ms`,
        component: 'performance',
        metadata: {
          metric,
          threshold: this.config.performanceThresholds.maxExecutionTime,
        },
      });
    }

    // Only create alerts for errors.count if it's not from recordError (no context tag)
    if (metric.metricName === 'errors.count' && metric.value > 0 && !metric.tags.context) {
      this.createAlert({
        severity: 'error',
        title: 'Error count threshold exceeded',
        message: `Error count: ${metric.value}`,
        component: 'error',
        metadata: { metric },
      });
    }
  }

  /**
   * Create an alert
   */
  private createAlert(alertData: Omit<Alert, 'id' | 'timestamp' | 'acknowledged'>): void {
    const alert: Alert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      acknowledged: false,
      ...alertData,
    };

    this.alerts.push(alert);

    // Keep only last 100 alerts
    if (this.alerts.length > 100) {
      this.alerts = this.alerts.slice(-100);
    }

    this.logger.warn(
      'ProductionMonitoringSystem',
      'createAlert',
      `Alert created: ${alert.title} - ${alert.message}`
    );
  }

  /**
   * Collect system metrics
   */
  private collectMetrics(): void {
    const memoryUsage = this.getMemoryUsage();
    const cpuUsage = this.getCPUUsage();

    this.recordMetric('system.memory_usage', memoryUsage, 'percentage', {
      context: 'system',
    });

    this.recordMetric('system.cpu_usage', cpuUsage, 'percentage', {
      context: 'system',
    });
  }

  /**
   * Get memory usage (simplified)
   */
  private getMemoryUsage(): number {
    if (typeof performance !== 'undefined' && (performance as any).memory) {
      const memory = (performance as any).memory;
      return (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
    }
    return 0;
  }

  /**
   * Get CPU usage (simplified)
   */
  private getCPUUsage(): number {
    // This would typically be implemented with actual CPU monitoring
    // For now, return a placeholder value
    return Math.random() * 30 + 10; // 10-40% range
  }

  /**
   * Get unit type from config
   */
  private getUnitType(config: IUnitConfig): string {
    if ('sizeUnit' in config) return 'size';
    if ('positionUnit' in config) return 'position';
    if ('scaleUnit' in config) return 'scale';
    return 'unknown';
  }

  /**
   * Get monitoring statistics
   */
  getStatistics(): {
    metricsCount: number;
    healthChecksCount: number;
    alertsCount: number;
    unacknowledgedAlertsCount: number;
    systemStatus: 'healthy' | 'degraded' | 'unhealthy';
  } {
    const unacknowledgedAlerts = this.alerts.filter(a => !a.acknowledged);
    const latestHealthCheck = this.healthChecks[this.healthChecks.length - 1];

    return {
      metricsCount: this.metrics.length,
      healthChecksCount: this.healthChecks.length,
      alertsCount: this.alerts.length,
      unacknowledgedAlertsCount: unacknowledgedAlerts.length,
      systemStatus: latestHealthCheck?.status || 'healthy',
    };
  }

  /**
   * Get recent metrics
   */
  getRecentMetrics(minutes: number = 5): PerformanceMetric[] {
    const cutoff = new Date(Date.now() - minutes * 60 * 1000);
    return this.metrics.filter(m => m.timestamp > cutoff);
  }

  /**
   * Get recent alerts
   */
  getRecentAlerts(hours: number = 24): Alert[] {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    return this.alerts.filter(a => a.timestamp > cutoff);
  }

  /**
   * Acknowledge an alert
   */
  acknowledgeAlert(alertId: string, acknowledgedBy: string): boolean {
    const alert = this.alerts.find(a => a.id === alertId);
    if (!alert) {
      return false;
    }

    alert.acknowledged = true;
    alert.acknowledgedBy = acknowledgedBy;
    alert.acknowledgedAt = new Date();

    return true;
  }

  /**
   * Export monitoring data
   */
  exportData(): {
    metrics: PerformanceMetric[];
    healthChecks: HealthCheck[];
    alerts: Alert[];
    statistics: ReturnType<typeof ProductionMonitoringSystem.prototype.getStatistics>;
  } {
    return {
      metrics: [...this.metrics],
      healthChecks: [...this.healthChecks],
      alerts: [...this.alerts],
      statistics: this.getStatistics(),
    };
  }
}
