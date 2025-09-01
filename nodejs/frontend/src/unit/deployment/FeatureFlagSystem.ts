export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number; // 0-100
  targetUsers: string[]; // specific user IDs
  targetEnvironments: string[]; // 'development', 'staging', 'production'
  startDate?: Date;
  endDate?: Date;
  metadata?: Record<string, any>;
}

export interface FeatureFlagContext {
  userId?: string;
  environment: string;
  sessionId?: string;
  timestamp: Date;
  userAgent?: string;
  ipAddress?: string;
}

export interface FeatureFlagResult {
  enabled: boolean;
  flagId: string;
  reason: string;
  metadata?: Record<string, any>;
}

export class FeatureFlagSystem {
  private flags: Map<string, FeatureFlag> = new Map();
  private readonly defaultContext: FeatureFlagContext;

  constructor(defaultContext: FeatureFlagContext) {
    this.defaultContext = defaultContext;
  }

  /**
   * Register a new feature flag
   */
  registerFlag(flag: FeatureFlag): void {
    this.flags.set(flag.id, flag);
  }

  /**
   * Check if a feature flag is enabled for the given context
   */
  isEnabled(flagId: string, context?: Partial<FeatureFlagContext>): FeatureFlagResult {
    const flag = this.flags.get(flagId);
    if (!flag) {
      return {
        enabled: false,
        flagId,
        reason: 'Flag not found'
      };
    }

    const fullContext = { ...this.defaultContext, ...context };

    // Check if flag is globally enabled
    if (!flag.enabled) {
      return {
        enabled: false,
        flagId,
        reason: 'Flag globally disabled'
      };
    }

    // Check environment targeting
    if (flag.targetEnvironments.length > 0 && 
        !flag.targetEnvironments.includes(fullContext.environment)) {
      return {
        enabled: false,
        flagId,
        reason: `Environment ${fullContext.environment} not targeted`
      };
    }

    // Check date range
    if (flag.startDate && fullContext.timestamp < flag.startDate) {
      return {
        enabled: false,
        flagId,
        reason: 'Flag not yet active'
      };
    }

    if (flag.endDate && fullContext.timestamp > flag.endDate) {
      return {
        enabled: false,
        flagId,
        reason: 'Flag expired'
      };
    }

    // Check specific user targeting
    if (flag.targetUsers.length > 0 && fullContext.userId) {
      if (flag.targetUsers.includes(fullContext.userId)) {
        return {
          enabled: true,
          flagId,
          reason: 'User explicitly targeted',
          metadata: flag.metadata
        };
      }
    }

    // Check rollout percentage
    if (flag.rolloutPercentage < 100) {
      const hash = this.hashString(fullContext.userId || fullContext.sessionId || fullContext.ipAddress || 'default');
      const percentage = (hash % 100) + 1;
      
      if (percentage > flag.rolloutPercentage) {
        return {
          enabled: false,
          flagId,
          reason: `Rollout percentage not met (${percentage} > ${flag.rolloutPercentage})`
        };
      }
    }

    return {
      enabled: true,
      flagId,
      reason: 'Flag enabled',
      metadata: flag.metadata
    };
  }

  /**
   * Get all registered flags
   */
  getAllFlags(): FeatureFlag[] {
    return Array.from(this.flags.values());
  }

  /**
   * Update flag configuration
   */
  updateFlag(flagId: string, updates: Partial<FeatureFlag>): boolean {
    const flag = this.flags.get(flagId);
    if (!flag) {
      return false;
    }

    this.flags.set(flagId, { ...flag, ...updates });
    return true;
  }

  /**
   * Remove a feature flag
   */
  removeFlag(flagId: string): boolean {
    return this.flags.delete(flagId);
  }

  /**
   * Get flag statistics
   */
  getFlagStatistics(_flagId: string): {
    totalChecks: number;
    enabledChecks: number;
    disabledChecks: number;
    enableRate: number;
  } {
    // This would typically be implemented with actual tracking
    // For now, return placeholder statistics
    return {
      totalChecks: 0,
      enabledChecks: 0,
      disabledChecks: 0,
      enableRate: 0
    };
  }

  /**
   * Simple hash function for consistent user assignment
   */
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Create a feature flag for unit system rollout
   */
  static createUnitSystemRolloutFlag(
    id: string,
    rolloutPercentage: number = 10,
    targetEnvironments: string[] = ['development', 'staging']
  ): FeatureFlag {
    return {
      id,
      name: 'Unit System Refactored Rollout',
      description: 'Gradual rollout of the refactored unit system with improved performance',
      enabled: true,
      rolloutPercentage,
      targetUsers: [],
      targetEnvironments,
      startDate: new Date(),
      metadata: {
        version: '2.0.0',
        improvements: [
          'Strategy Pattern implementation',
          'Performance caching',
          'Composition support',
          'Better error handling'
        ]
      }
    };
  }

  /**
   * Create a feature flag for A/B testing
   */
  static createABTestFlag(
    id: string,
    testName: string,
    rolloutPercentage: number = 50
  ): FeatureFlag {
    return {
      id,
      name: `A/B Test: ${testName}`,
      description: `A/B testing for ${testName}`,
      enabled: true,
      rolloutPercentage,
      targetUsers: [],
      targetEnvironments: ['staging', 'production'],
      startDate: new Date(),
      metadata: {
        testType: 'performance',
        variant: 'B',
        metrics: ['execution_time', 'memory_usage', 'throughput']
      }
    };
  }
}
