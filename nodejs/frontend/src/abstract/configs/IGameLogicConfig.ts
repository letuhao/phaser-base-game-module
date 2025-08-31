import type { IConfiguration } from '../interfaces/IConfiguration';

/**
 * Game logic configuration interface for game mechanics and systems
 * Manages game rules, player progression, and core gameplay systems
 */
export interface IGameLogicConfig extends IConfiguration {
  /** Game type/genre */
  readonly gameType:
    | 'action'
    | 'adventure'
    | 'puzzle'
    | 'rpg'
    | 'strategy'
    | 'simulation'
    | 'arcade';

  /** Game difficulty levels */
  readonly difficulty: {
    levels: Array<{
      name: string;
      value: number;
      multiplier: number;
      unlockCondition?: string;
    }>;
    default: string;
    adaptive: boolean;
    scaling: {
      enabled: boolean;
      factor: number;
      maxLevel: number;
    };
  };

  /** Player progression system */
  readonly progression: {
    /** Experience/level system */
    experience: {
      enabled: boolean;
      baseXP: number;
      scaling: 'linear' | 'exponential' | 'logarithmic';
      maxLevel: number;
      rewards: Array<{
        level: number;
        type: 'item' | 'ability' | 'currency' | 'unlock';
        value: string | number;
      }>;
    };
    /** Skill system */
    skills: {
      [skillId: string]: {
        name: string;
        maxLevel: number;
        costPerLevel: number;
        effects: Array<{
          level: number;
          type: 'stat' | 'ability' | 'passive';
          value: any;
        }>;
      };
    };
    /** Achievement system */
    achievements: {
      [achievementId: string]: {
        name: string;
        description: string;
        condition: string;
        reward: any;
        hidden: boolean;
      };
    };
  };

  /** Game economy system */
  readonly economy: {
    /** Currency types */
    currencies: {
      [currencyId: string]: {
        name: string;
        symbol: string;
        maxAmount: number;
        exchangeRate?: number;
      };
    };
    /** Item shop */
    shop: {
      [itemId: string]: {
        name: string;
        price: number;
        currency: string;
        category: string;
        unlockCondition?: string;
        stock: number | 'unlimited';
      };
    };
    /** Trading system */
    trading: {
      enabled: boolean;
      maxItems: number;
      taxRate: number;
      restrictions: string[];
    };
  };

  /** Combat system configuration */
  readonly combat: {
    enabled: boolean;
    type: 'turnBased' | 'realTime' | 'hybrid';
    /** Damage calculation */
    damage: {
      formula: string;
      criticalChance: number;
      criticalMultiplier: number;
      armorReduction: number;
    };
    /** Status effects */
    statusEffects: {
      [effectId: string]: {
        name: string;
        duration: number;
        stackable: boolean;
        effects: any[];
      };
    };
    /** Combat actions */
    actions: {
      [actionId: string]: {
        name: string;
        type: 'attack' | 'defend' | 'special' | 'item';
        cost: number;
        cooldown: number;
        range: number;
        effects: any[];
      };
    };
  };

  /** World/level system */
  readonly world: {
    /** Level structure */
    levels: {
      [levelId: string]: {
        name: string;
        difficulty: number;
        unlockCondition: string;
        objectives: string[];
        rewards: any[];
        timeLimit?: number;
      };
    };
    /** World map */
    worldMap: {
      size: { width: number; height: number };
      regions: Array<{
        id: string;
        name: string;
        position: { x: number; y: number };
        unlockCondition: string;
        connections: string[];
      }>;
    };
    /** Procedural generation */
    procedural: {
      enabled: boolean;
      seed: number;
      algorithm: string;
      parameters: Record<string, any>;
    };
  };

  /** AI system configuration */
  readonly ai: {
    enabled: boolean;
    /** AI difficulty */
    difficulty: {
      easy: number;
      normal: number;
      hard: number;
      expert: number;
    };
    /** AI behaviors */
    behaviors: {
      [behaviorId: string]: {
        name: string;
        type: 'aggressive' | 'defensive' | 'passive' | 'adaptive';
        parameters: Record<string, any>;
        conditions: string[];
      };
    };
    /** Pathfinding */
    pathfinding: {
      algorithm: 'astar' | 'dijkstra' | 'bfs' | 'dfs';
      gridSize: number;
      maxPathLength: number;
    };
  };

  /** Multiplayer configuration */
  readonly multiplayer: {
    enabled: boolean;
    maxPlayers: number;
    minPlayers: number;
    /** Game modes */
    modes: {
      [modeId: string]: {
        name: string;
        playerCount: { min: number; max: number };
        rules: string[];
        scoring: string;
      };
    };
    /** Synchronization */
    sync: {
      rate: number;
      interpolation: boolean;
      prediction: boolean;
      reconciliation: boolean;
    };
  };

  /** Save/load system */
  readonly saveSystem: {
    enabled: boolean;
    autoSave: boolean;
    autoSaveInterval: number;
    maxSaveSlots: number;
    cloudSave: boolean;
    encryption: boolean;
  };

  /** Performance settings */
  readonly performance: {
    targetFPS: number;
    maxEntities: number;
    cullingDistance: number;
    updateRate: number;
    renderRate: number;
  };

  /** Get difficulty configuration by name */
  getDifficulty(difficultyName: string): IGameLogicConfig['difficulty']['levels'][0] | null;

  /** Get skill configuration by ID */
  getSkill(skillId: string): IGameLogicConfig['progression']['skills'][string] | null;

  /** Get achievement configuration by ID */
  getAchievement(
    achievementId: string
  ): IGameLogicConfig['progression']['achievements'][string] | null;

  /** Get item shop configuration by ID */
  getShopItem(itemId: string): IGameLogicConfig['economy']['shop'][string] | null;

  /** Get level configuration by ID */
  getLevel(levelId: string): IGameLogicConfig['world']['levels'][string] | null;

  /** Get AI behavior configuration by ID */
  getAIBehavior(behaviorId: string): IGameLogicConfig['ai']['behaviors'][string] | null;

  /** Check if feature is enabled */
  isFeatureEnabled(feature: keyof IGameLogicConfig): boolean;

  /** Validate game logic configuration */
  validateGameLogic(): string[];

  /** Get game balance statistics */
  getBalanceStats(): {
    difficulty: Record<string, number>;
    progression: Record<string, number>;
    economy: Record<string, number>;
  };
}
