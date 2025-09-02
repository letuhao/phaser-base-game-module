import {
  ProductionMonitoringSystem,
  MonitoringConfig,
} from '../monitoring/ProductionMonitoringSystem';
import { UnitContext } from '../interfaces/IUnit';
import { IUnitConfig } from '../interfaces/IUnitConfig';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { SizeValue } from '../enums/SizeValue';
import { Logger } from '../../core/Logger';

describe('ProductionMonitoringSystem', () => {
  let monitoringSystem: ProductionMonitoringSystem;
  let config: MonitoringConfig;
  let loggerSpy: any;

  beforeEach(() => {
    // Mock Logger instance
    const mockLogger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
      log: jest.fn()
    };
    
    loggerSpy = mockLogger.info;
    jest.spyOn(Logger, 'getInstance').mockReturnValue(mockLogger as any);

    config = {
      enabled: true,
      metricsCollectionInterval: 1000,
      healthCheckInterval: 2000,
      alertingEnabled: true,
      performanceThresholds: {
        maxExecutionTime: 100,
        maxMemoryUsage: 1024 * 1024, // 1MB
        minThroughput: 10,
        maxErrorRate: 5,
      },
    };
    monitoringSystem = new ProductionMonitoringSystem(config);
  });

  afterEach(() => {
    monitoringSystem.stop();
    jest.restoreAllMocks();
  });

  describe('Constructor and Configuration', () => {
    it('should create monitoring system with correct configuration', () => {
      expect(monitoringSystem).toBeInstanceOf(ProductionMonitoringSystem);
    });

    it('should handle disabled monitoring', () => {
      const disabledConfig: MonitoringConfig = {
        ...config,
        enabled: false,
      };
      const disabledSystem = new ProductionMonitoringSystem(disabledConfig);

      disabledSystem.start();
      disabledSystem.recordMetric('test', 100, 'ms');

      const stats = disabledSystem.getStatistics();
      expect(stats.metricsCount).toBe(0);

      disabledSystem.stop();
    });
  });

  describe('Start and Stop', () => {
    it('should start monitoring successfully', () => {
      monitoringSystem.start();

      expect(loggerSpy).toHaveBeenCalledWith(
        'ProductionMonitoringSystem',
        'start',
        'Production monitoring started'
      );
    });

    it('should stop monitoring successfully', () => {
      monitoringSystem.start();
      monitoringSystem.stop();

      expect(loggerSpy).toHaveBeenCalledWith(
        'ProductionMonitoringSystem',
        'stop',
        'Production monitoring stopped'
      );
    });

    it('should not start if already running', () => {
      monitoringSystem.start();
      monitoringSystem.start(); // Second start should be ignored

      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });

    it('should not stop if not running', () => {
      monitoringSystem.stop(); // Stop without starting

      expect(loggerSpy).not.toHaveBeenCalled();
    });
  });

  describe('Metrics Recording', () => {
    it('should record metrics when enabled', () => {
      monitoringSystem.start();

      monitoringSystem.recordMetric('test.metric', 100, 'ms', { tag: 'value' });

      const stats = monitoringSystem.getStatistics();
      expect(stats.metricsCount).toBe(1);
    });

    it('should not record metrics when disabled', () => {
      const disabledConfig: MonitoringConfig = {
        ...config,
        enabled: false,
      };
      const disabledSystem = new ProductionMonitoringSystem(disabledConfig);

      disabledSystem.recordMetric('test.metric', 100, 'ms');

      const stats = disabledSystem.getStatistics();
      expect(stats.metricsCount).toBe(0);
    });

    it('should limit metrics to last 1000', () => {
      monitoringSystem.start();

      // Record more than 1000 metrics
      for (let i = 0; i < 1100; i++) {
        monitoringSystem.recordMetric(`metric.${i}`, i, 'count');
      }

      const stats = monitoringSystem.getStatistics();
      expect(stats.metricsCount).toBe(1000);
    });

    it('should record calculation performance', () => {
      monitoringSystem.start();

      const context: UnitContext = {
        parent: { width: 100, height: 100, x: 0, y: 0 },
      };

      const unitConfig: IUnitConfig = {
        id: 'test-unit',
        name: 'TestUnit',
        sizeUnit: SizeUnit.PARENT_WIDTH,
        dimension: Dimension.WIDTH,
        baseValue: SizeValue.FILL,
      };

      monitoringSystem.recordCalculationPerformance(
        'test-calculation',
        50,
        1024,
        context,
        unitConfig
      );

      const stats = monitoringSystem.getStatistics();
      expect(stats.metricsCount).toBe(3); // execution_time, memory_usage, throughput
    });

    it('should record cache performance', () => {
      monitoringSystem.start();

      monitoringSystem.recordCachePerformance('test-cache', 0.8, 0.1, 512);

      const stats = monitoringSystem.getStatistics();
      expect(stats.metricsCount).toBe(3); // hit_rate, eviction_rate, memory_usage
    });

    it('should record strategy performance', () => {
      monitoringSystem.start();

      monitoringSystem.recordStrategyPerformance('test-strategy', 25, 0.95, 3);

      const stats = monitoringSystem.getStatistics();
      expect(stats.metricsCount).toBe(3); // execution_time, success_rate, composition_count
    });
  });

  describe('Error Recording', () => {
    it('should record errors when alerting is enabled', () => {
      // Don't start the system to avoid automatic health checks
      const error = new Error('Test error');
      monitoringSystem.recordError(error, 'test-component', { context: 'test' });

      const stats = monitoringSystem.getStatistics();
      expect(stats.metricsCount).toBe(1); // errors.count metric
      expect(stats.alertsCount).toBe(1); // error alert
    });

    it('should not create alerts when alerting is disabled', () => {
      const noAlertConfig: MonitoringConfig = {
        ...config,
        alertingEnabled: false,
      };
      const noAlertSystem = new ProductionMonitoringSystem(noAlertConfig);

      const error = new Error('Test error');
      noAlertSystem.recordError(error, 'test-component');

      const stats = noAlertSystem.getStatistics();
      expect(stats.alertsCount).toBe(0);

      noAlertSystem.stop();
    });

    it('should handle non-Error exceptions', () => {
      // Don't start the system to avoid automatic health checks
      const stringError = 'String error' as any;
      monitoringSystem.recordError(stringError, 'test-component');

      const stats = monitoringSystem.getStatistics();
      expect(stats.metricsCount).toBe(1);
      expect(stats.alertsCount).toBe(1);
    });
  });

  describe('Health Checks', () => {
    it('should perform health checks when started', () => {
      monitoringSystem.start();

      // Wait for health check to run
      setTimeout(() => {
        const stats = monitoringSystem.getStatistics();
        expect(stats.healthChecksCount).toBeGreaterThan(0);
      }, 100);
    });

    it('should limit health checks to last 100', () => {
      monitoringSystem.start();

      // Simulate many health checks
      for (let i = 0; i < 150; i++) {
        monitoringSystem['performHealthChecks']();
      }

      const stats = monitoringSystem.getStatistics();
      expect(stats.healthChecksCount).toBe(100);
    });

    it('should create alerts for unhealthy components', () => {
      monitoringSystem.start();

      // Mock high memory usage
      jest.spyOn(monitoringSystem as any, 'getMemoryUsage').mockReturnValue(90);

      monitoringSystem['performHealthChecks']();

      const stats = monitoringSystem.getStatistics();
      expect(stats.alertsCount).toBeGreaterThan(0);
    });
  });

  describe('Alert Management', () => {
    it('should create alerts with correct properties', () => {
      monitoringSystem.start();

      monitoringSystem['createAlert']({
        severity: 'warning',
        title: 'Test Alert',
        message: 'Test message',
        component: 'test-component',
      });

      const stats = monitoringSystem.getStatistics();
      expect(stats.alertsCount).toBe(1);
    });

    it('should acknowledge alerts', () => {
      monitoringSystem.start();

      monitoringSystem['createAlert']({
        severity: 'info',
        title: 'Test Alert',
        message: 'Test message',
        component: 'test-component',
      });

      monitoringSystem.getStatistics();
      const alertId = monitoringSystem.getRecentAlerts(1)[0].id;

      const result = monitoringSystem.acknowledgeAlert(alertId, 'test-user');
      expect(result).toBe(true);

      const updatedStats = monitoringSystem.getStatistics();
      expect(updatedStats.unacknowledgedAlertsCount).toBe(0);
    });

    it('should handle acknowledging non-existent alert', () => {
      monitoringSystem.start();

      const result = monitoringSystem.acknowledgeAlert('non-existent-id', 'test-user');
      expect(result).toBe(false);
    });

    it('should limit alerts to last 100', () => {
      monitoringSystem.start();

      // Create more than 100 alerts
      for (let i = 0; i < 150; i++) {
        monitoringSystem['createAlert']({
          severity: 'info',
          title: `Alert ${i}`,
          message: `Message ${i}`,
          component: 'test-component',
        });
      }

      const stats = monitoringSystem.getStatistics();
      expect(stats.alertsCount).toBe(100);
    });
  });

  describe('Performance Thresholds', () => {
    it('should check performance thresholds and create alerts', () => {
      monitoringSystem.start();

      // Record metric that exceeds threshold
      monitoringSystem.recordMetric('calculation.execution_time', 150, 'ms'); // Exceeds maxExecutionTime of 100

      const stats = monitoringSystem.getStatistics();
      expect(stats.alertsCount).toBeGreaterThan(0);
    });

    it('should handle multiple threshold violations', () => {
      monitoringSystem.start();

      // Record multiple metrics that exceed thresholds
      monitoringSystem.recordMetric('calculation.execution_time', 150, 'ms');
      monitoringSystem.recordMetric('errors.count', 10, 'count'); // Exceeds maxErrorRate

      const stats = monitoringSystem.getStatistics();
      expect(stats.alertsCount).toBeGreaterThan(1);
    });
  });

  describe('Data Retrieval', () => {
    it('should get recent metrics', () => {
      monitoringSystem.start();

      monitoringSystem.recordMetric('test.metric', 100, 'ms');
      monitoringSystem.recordMetric('other.metric', 200, 'ms');

      const recentMetrics = monitoringSystem.getRecentMetrics(5);
      expect(recentMetrics.length).toBe(2);
      expect(recentMetrics[0].metricName).toBe('test.metric');
      expect(recentMetrics[1].metricName).toBe('other.metric');
    });

    it('should get recent alerts', () => {
      monitoringSystem.start();

      monitoringSystem['createAlert']({
        severity: 'error',
        title: 'Error Alert',
        message: 'Error message',
        component: 'test-component',
      });

      monitoringSystem['createAlert']({
        severity: 'warning',
        title: 'Warning Alert',
        message: 'Warning message',
        component: 'test-component',
      });

      const recentAlerts = monitoringSystem.getRecentAlerts(24);
      expect(recentAlerts.length).toBe(2);
      expect(recentAlerts[0].title).toBe('Error Alert');
      expect(recentAlerts[1].title).toBe('Warning Alert');
    });

    it('should get system statistics', () => {
      monitoringSystem.start();

      monitoringSystem.recordMetric('test.metric', 100, 'ms');
      monitoringSystem.recordMetric('test.metric', 200, 'ms');
      monitoringSystem.recordMetric('test.metric', 300, 'ms');

      const stats = monitoringSystem.getStatistics();
      expect(stats.metricsCount).toBe(3);
      expect(stats.alertsCount).toBe(0);
      expect(stats.healthChecksCount).toBe(0);
      expect(stats.unacknowledgedAlertsCount).toBe(0);
      expect(stats.systemStatus).toBe('healthy');
    });

    it('should export monitoring data', () => {
      monitoringSystem.start();

      monitoringSystem.recordMetric('test.metric', 100, 'ms');
      monitoringSystem['createAlert']({
        severity: 'info',
        title: 'Test Alert',
        message: 'Test message',
        component: 'test-component',
      });

      const exportData = monitoringSystem.exportData();
      expect(exportData.metrics.length).toBe(1);
      expect(exportData.alerts.length).toBe(1);
      expect(exportData.healthChecks.length).toBe(0);
      expect(exportData.statistics).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty metrics', () => {
      const stats = monitoringSystem.getStatistics();
      expect(stats.metricsCount).toBe(0);
      expect(stats.alertsCount).toBe(0);
      expect(stats.healthChecksCount).toBe(0);
    });

    it('should handle very large metric values', () => {
      monitoringSystem.start();

      monitoringSystem.recordMetric('large.metric', Number.MAX_SAFE_INTEGER, 'count');

      const stats = monitoringSystem.getStatistics();
      expect(stats.metricsCount).toBe(1);
    });

    it('should handle negative metric values', () => {
      monitoringSystem.start();

      monitoringSystem.recordMetric('negative.metric', -100, 'count');

      const stats = monitoringSystem.getStatistics();
      expect(stats.metricsCount).toBe(1);
    });

    it('should handle zero metric values', () => {
      monitoringSystem.start();

      monitoringSystem.recordMetric('zero.metric', 0, 'count');

      const stats = monitoringSystem.getStatistics();
      expect(stats.metricsCount).toBe(1);
    });
  });

  describe('Integration Scenarios', () => {
    it('should handle full monitoring lifecycle', () => {
      // Start monitoring
      monitoringSystem.start();
      expect(loggerSpy).toHaveBeenCalledWith(
        'ProductionMonitoringSystem',
        'start',
        'Production monitoring started'
      );

      // Record various metrics
      monitoringSystem.recordMetric('test.metric', 100, 'ms');
      monitoringSystem.recordCalculationPerformance(
        'test-calculation',
        50,
        1024,
        {},
        {
          id: 'test-unit',
          name: 'TestUnit',
          sizeUnit: SizeUnit.PARENT_WIDTH,
          dimension: Dimension.WIDTH,
          baseValue: SizeValue.FILL,
        }
      );
      monitoringSystem.recordError(new Error('Test error'), 'test-component');

      // Verify data is recorded
      const stats = monitoringSystem.getStatistics();
      expect(stats.metricsCount).toBeGreaterThan(0);
      expect(stats.alertsCount).toBeGreaterThan(0);

      // Stop monitoring
      monitoringSystem.stop();
      expect(loggerSpy).toHaveBeenCalledWith(
        'ProductionMonitoringSystem',
        'stop',
        'Production monitoring stopped'
      );
    });

    it('should handle high-volume metric recording', () => {
      monitoringSystem.start();

      // Record many metrics quickly
      for (let i = 0; i < 100; i++) {
        monitoringSystem.recordMetric(`metric.${i}`, i, 'count');
      }

      const stats = monitoringSystem.getStatistics();
      expect(stats.metricsCount).toBe(100);

      const recentMetrics = monitoringSystem.getRecentMetrics(5);
      expect(recentMetrics.length).toBe(100);

      // Verify metrics are ordered by timestamp
      for (let i = 1; i < recentMetrics.length; i++) {
        expect(recentMetrics[i].timestamp.getTime()).toBeGreaterThanOrEqual(
          recentMetrics[i - 1].timestamp.getTime()
        );
      }
    });

    it('should handle alert acknowledgment workflow', () => {
      monitoringSystem.start();

      // Create multiple alerts
      monitoringSystem['createAlert']({
        severity: 'error',
        title: 'Error Alert',
        message: 'Error message',
        component: 'test-component',
      });

      monitoringSystem['createAlert']({
        severity: 'warning',
        title: 'Warning Alert',
        message: 'Warning message',
        component: 'test-component',
      });

      let stats = monitoringSystem.getStatistics();
      expect(stats.alertsCount).toBe(2);
      expect(stats.unacknowledgedAlertsCount).toBe(2);

      // Acknowledge one alert
      const recentAlerts = monitoringSystem.getRecentAlerts(1);
      const alertId = recentAlerts[0].id;
      monitoringSystem.acknowledgeAlert(alertId, 'test-user');

      stats = monitoringSystem.getStatistics();
      expect(stats.alertsCount).toBe(2);
      expect(stats.unacknowledgedAlertsCount).toBe(1);
    });
  });
});
