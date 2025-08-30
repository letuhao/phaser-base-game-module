# Coding Standards & Best Practices

This document defines the coding standards and best practices that **MUST** be strictly followed across the entire codebase. These rules ensure code quality, maintainability, and consistency.

## 📋 Table of Contents

1. [Naming Conventions](#naming-conventions)
2. [General Coding Rules](#general-coding-rules)
3. [Logging Standards](#logging-standards)
4. [Commenting Rules](#commenting-rules)
5. [Constants Usage](#constants-usage)
6. [Documentation Update Policy](#documentation-update-policy)
7. [Strong Typing Requirements](#strong-typing-requirements)
8. [Object-Oriented Programming (OOP) Policy](#object-oriented-programming-oop-policy)
9. [SOLID Principles](#solid-principles)
10. [Design Patterns](#design-patterns)
11. [Internationalization (i18n) Support](#internationalization-i18n-support)
12. [Configuration Rules](#configuration-rules)
13. [Additional Best Practices](#additional-best-practices)
14. [Code Review Checklist](#code-review-checklist)

---

## 🏷️ Naming Conventions

### Frontend (TypeScript/JavaScript)

#### Variables and Functions
```typescript
// ✅ CORRECT
const playerHealth = 100
const isGameActive = true
const MAX_PLAYERS = 4

function calculateDamage(baseDamage: number, multiplier: number): number {
  return baseDamage * multiplier
}

// ❌ INCORRECT
const player_health = 100
const isgameactive = true
const maxplayers = 4

function calculatedamage(basedamage: number, multiplier: number): number {
  return basedamage * multiplier
}
```

#### Classes and Interfaces
```typescript
// ✅ CORRECT
class GameManager { }
class PlayerController { }
interface GameState { }
interface PlayerData { }

// ❌ INCORRECT
class gamemanager { }
class player_controller { }
interface gamestate { }
interface playerdata { }
```

#### Files and Directories
```typescript
// ✅ CORRECT
src/
├── components/
│   ├── Player.ts
│   ├── GameBoard.ts
│   └── ScoreDisplay.ts
├── services/
│   ├── ApiService.ts
│   └── WebhookService.ts
└── utils/
    ├── MathUtils.ts
    └── ValidationUtils.ts

// ❌ INCORRECT
src/
├── Components/
├── player.ts
├── game-board.ts
└── api_service.ts
```

### Backend (Rust)

#### Variables and Functions
```rust
// ✅ CORRECT
let player_health: i32 = 100;
let is_game_active: bool = true;
const MAX_PLAYERS: i32 = 4;

fn calculate_damage(base_damage: i32, multiplier: f32) -> f32 {
    base_damage as f32 * multiplier
}

// ❌ INCORRECT
let playerHealth: i32 = 100;
let isGameActive: bool = true;
const maxPlayers: i32 = 4;

fn calculateDamage(baseDamage: i32, multiplier: f32) -> f32 {
    baseDamage as f32 * multiplier
}
```

#### Structs and Enums
```rust
// ✅ CORRECT
pub struct GameManager { }
pub struct PlayerController { }
pub enum GameState { }
pub enum PlayerAction { }

// ❌ INCORRECT
pub struct gameManager { }
pub struct player_controller { }
pub enum gameState { }
pub enum playerAction { }
```

#### Files and Modules
```rust
// ✅ CORRECT
src/
├── models/
│   ├── player.rs
│   ├── game.rs
│   └── score.rs
├── services/
│   ├── game_service.rs
│   └── webhook_service.rs
└── utils/
    ├── math_utils.rs
    └── validation_utils.rs

// ❌ INCORRECT
src/
├── Models/
├── Player.rs
├── game_service.rs
└── MathUtils.rs
```

---

## 📝 General Coding Rules

### 1. Code Organization
- **Maximum file length**: 500 lines
- **Maximum function length**: 50 lines
- **Maximum class length**: 300 lines
- **Indentation**: 2 spaces (Frontend), 4 spaces (Backend)
- **Line length**: Maximum 100 characters

### 2. Error Handling
```typescript
// ✅ CORRECT - Frontend
try {
  const result = await apiService.createGame(gameData)
  return result
} catch (error) {
  logger.error('Failed to create game', { error, gameData })
  throw new GameCreationError('Failed to create game', error)
}

// ✅ CORRECT - Backend
pub async fn create_game(&self, game_data: CreateGameRequest) -> Result<Game, GameError> {
    let game = self.game_repository.create(game_data).await
        .map_err(|e| {
            logger::error!("Failed to create game: {}", e);
            GameError::CreationFailed(e.to_string())
        })?;
    
    Ok(game)
}
```

### 3. Null Safety
```typescript
// ✅ CORRECT - Frontend
function processPlayer(player: Player | null): string {
  if (!player) {
    return 'Unknown Player'
  }
  return player.name
}

// ✅ CORRECT - Backend
fn process_player(player: Option<Player>) -> String {
    match player {
        Some(p) => p.name.clone(),
        None => "Unknown Player".to_string(),
    }
}
```

### 4. Magic Numbers
```typescript
// ✅ CORRECT - Frontend
const GAME_CONSTANTS = {
  MAX_PLAYERS: 4,
  GAME_TIMEOUT: 300000, // 5 minutes in milliseconds
  HEALTH_THRESHOLD: 0.2,
} as const

// ✅ CORRECT - Backend
const GAME_CONSTANTS: GameConstants = GameConstants {
    max_players: 4,
    game_timeout: Duration::from_secs(300), // 5 minutes
    health_threshold: 0.2,
};
```

---

## 📊 Logging Standards

### Frontend Logging
```typescript
// ✅ CORRECT
import { logger } from '@/utils/logger'

export class GameService {
  async createGame(gameData: CreateGameRequest): Promise<Game> {
    logger.info('Creating new game', { 
      gameType: gameData.type, 
      maxPlayers: gameData.maxPlayers 
    })
    
    try {
      const game = await this.apiClient.post('/games', gameData)
      logger.info('Game created successfully', { gameId: game.id })
      return game
    } catch (error) {
      logger.error('Failed to create game', { 
        error: error.message, 
        gameData 
      })
      throw error
    }
  }
}

// ❌ INCORRECT
console.log('Creating game...')
console.error('Error:', error)
```

### Backend Logging
```rust
// ✅ CORRECT
use tracing::{info, error, warn, debug};

pub async fn create_game(&self, game_data: CreateGameRequest) -> Result<Game, GameError> {
    info!(
        "Creating new game: type={}, max_players={}", 
        game_data.game_type, 
        game_data.max_players
    );
    
    match self.game_repository.create(game_data).await {
        Ok(game) => {
            info!("Game created successfully: id={}", game.id);
            Ok(game)
        }
        Err(e) => {
            error!("Failed to create game: {}", e);
            Err(GameError::CreationFailed(e.to_string()))
        }
    }
}

// ❌ INCORRECT
println!("Creating game...");
eprintln!("Error: {}", error);
```

### Log Levels
- **ERROR**: Application errors, exceptions, failures
- **WARN**: Warning conditions, deprecated usage
- **INFO**: General information, important events
- **DEBUG**: Detailed debugging information
- **TRACE**: Very detailed debugging information

---

## 💬 Commenting Rules

### Class Documentation
```typescript
// ✅ CORRECT - Frontend
/**
 * Manages the game state and coordinates between different game components.
 * 
 * This class handles:
 * - Game initialization and cleanup
 * - Player management
 * - Game state synchronization
 * - Event handling and routing
 * 
 * @example
 * ```typescript
 * const gameManager = new GameManager()
 * await gameManager.initialize()
 * gameManager.startGame()
 * ```
 */
export class GameManager {
  // Implementation...
}

// ✅ CORRECT - Backend
/// Manages the game state and coordinates between different game components.
/// 
/// This struct handles:
/// - Game initialization and cleanup
/// - Player management
/// - Game state synchronization
/// - Event handling and routing
/// 
/// # Examples
/// 
/// ```rust
/// let game_manager = GameManager::new();
/// game_manager.initialize().await?;
/// game_manager.start_game().await?;
/// ```
pub struct GameManager {
    // Fields...
}
```

### Method Documentation
```typescript
// ✅ CORRECT - Frontend
/**
 * Creates a new game session with the specified parameters.
 * 
 * @param gameData - Configuration data for the new game
 * @param options - Optional game creation options
 * @returns Promise resolving to the created game instance
 * @throws {GameCreationError} When game creation fails
 * @throws {ValidationError} When game data is invalid
 * 
 * @example
 * ```typescript
 * const game = await gameManager.createGame({
 *   name: 'My Game',
 *   maxPlayers: 4,
 *   gameType: 'strategy'
 * })
 * ```
 */
async createGame(gameData: CreateGameRequest, options?: GameOptions): Promise<Game> {
  // Implementation...
}

// ✅ CORRECT - Backend
/// Creates a new game session with the specified parameters.
/// 
/// # Arguments
/// 
/// * `game_data` - Configuration data for the new game
/// * `options` - Optional game creation options
/// 
/// # Returns
/// 
/// Returns a `Result` containing the created game instance on success,
/// or a `GameError` on failure.
/// 
/// # Errors
/// 
/// This function will return an error if:
/// - Game data validation fails
/// - Database operation fails
/// - Game creation rules are violated
/// 
/// # Examples
/// 
/// ```rust
/// let game = game_manager.create_game(game_data, None).await?;
/// ```
pub async fn create_game(
    &self,
    game_data: CreateGameRequest,
    options: Option<GameOptions>,
) -> Result<Game, GameError> {
    // Implementation...
}
```

### Inline Comments
```typescript
// ✅ CORRECT - Frontend
// Calculate damage with critical hit chance
const criticalMultiplier = Math.random() < CRITICAL_CHANCE ? 2.0 : 1.0
const finalDamage = baseDamage * criticalMultiplier * weaponMultiplier

// ❌ INCORRECT
const criticalMultiplier = Math.random() < CRITICAL_CHANCE ? 2.0 : 1.0 // crit
const finalDamage = baseDamage * criticalMultiplier * weaponMultiplier // calc damage

// ✅ CORRECT - Backend
// Calculate damage with critical hit chance
let critical_multiplier = if rand::random::<f32>() < CRITICAL_CHANCE { 2.0 } else { 1.0 };
let final_damage = base_damage * critical_multiplier * weapon_multiplier;

// ❌ INCORRECT
let critical_multiplier = if rand::random::<f32>() < CRITICAL_CHANCE { 2.0 } else { 1.0 }; // crit
let final_damage = base_damage * critical_multiplier * weapon_multiplier; // calc damage
```

---

## 🔧 Constants Usage

### Frontend Constants
```typescript
// ✅ CORRECT
// Game configuration constants
export const GAME_CONFIG = {
  // Player limits
  MAX_PLAYERS: 4,
  MIN_PLAYERS: 2,
  
  // Game timing
  GAME_TIMEOUT: 300000, // 5 minutes
  TURN_TIMEOUT: 30000,  // 30 seconds
  
  // Game mechanics
  HEALTH_MAX: 100,
  DAMAGE_MULTIPLIER: 1.5,
  CRITICAL_CHANCE: 0.1,
} as const

// API endpoints
export const API_ENDPOINTS = {
  GAMES: '/api/games',
  PLAYERS: '/api/players',
  WEBHOOKS: '/api/webhooks',
} as const

// Error messages
export const ERROR_MESSAGES = {
  GAME_NOT_FOUND: 'Game not found',
  INVALID_MOVE: 'Invalid move',
  PLAYER_DISCONNECTED: 'Player disconnected',
} as const

// ❌ INCORRECT
const maxPlayers = 4
const gameTimeout = 300000
const healthMax = 100
```

### Backend Constants
```rust
// ✅ CORRECT
// Game configuration constants
pub const GAME_CONFIG: GameConfig = GameConfig {
    // Player limits
    max_players: 4,
    min_players: 2,
    
    // Game timing
    game_timeout: Duration::from_secs(300), // 5 minutes
    turn_timeout: Duration::from_secs(30),  // 30 seconds
    
    // Game mechanics
    health_max: 100,
    damage_multiplier: 1.5,
    critical_chance: 0.1,
};

// API endpoints
pub const API_ENDPOINTS: ApiEndpoints = ApiEndpoints {
    games: "/api/games",
    players: "/api/players",
    webhooks: "/api/webhooks",
};

// Error messages
pub const ERROR_MESSAGES: ErrorMessages = ErrorMessages {
    game_not_found: "Game not found",
    invalid_move: "Invalid move",
    player_disconnected: "Player disconnected",
};

// ❌ INCORRECT
const max_players = 4;
const game_timeout = 300;
const health_max = 100;
```

---

## 📚 Documentation Update Policy

### When Documentation Must Be Updated

1. **Code Changes Requiring Documentation Updates:**
   - New public APIs or endpoints
   - Changes to existing public interfaces
   - New configuration options
   - Breaking changes to existing functionality
   - New error codes or messages
   - Changes to data models or schemas

2. **Documentation Update Checklist:**
   - [ ] Update API documentation
   - [ ] Update code examples
   - [ ] Update configuration documentation
   - [ ] Update deployment guides
   - [ ] Update contributing guidelines
   - [ ] Update README files
   - [ ] Update inline code comments
   - [ ] Update type definitions

3. **Documentation Update Process:**
   ```bash
   # 1. Update code and tests
   git add .
   git commit -m "feat: add new player ranking system"
   
   # 2. Update documentation
   # - Update API docs
   # - Update code examples
   # - Update configuration docs
   
   # 3. Commit documentation changes
   git add docs/
   git commit -m "docs: update documentation for player ranking system"
   
   # 4. Create pull request with both changes
   ```

4. **Documentation Review Requirements:**
   - All documentation changes must be reviewed
   - Documentation must be updated before merging code changes
   - Examples must be tested and verified
   - Links and references must be validated

---

## 🎯 Strong Typing Requirements

### Frontend (TypeScript)
```typescript
// ✅ CORRECT - Strict typing
interface Player {
  id: string
  name: string
  health: number
  position: Vector2
  inventory: Item[]
  lastSeen: Date
}

interface GameState {
  players: Map<string, Player>
  gameTime: number
  isActive: boolean
  winner?: string
}

// ❌ INCORRECT - Weak typing
const player: any = { id: 1, name: 'John' }
const gameState = { players: [], time: 'now' }

// ✅ CORRECT - Generic types
class Repository<T> {
  async findById(id: string): Promise<T | null> {
    // Implementation...
  }
  
  async save(entity: T): Promise<T> {
    // Implementation...
  }
}

// ✅ CORRECT - Union types
type GameEvent = 
  | { type: 'PLAYER_JOINED'; player: Player }
  | { type: 'PLAYER_LEFT'; playerId: string }
  | { type: 'GAME_ENDED'; winner: string }
```

### Backend (Rust)
```rust
// ✅ CORRECT - Strong typing
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Player {
    pub id: Uuid,
    pub name: String,
    pub health: i32,
    pub position: Vector2,
    pub inventory: Vec<Item>,
    pub last_seen: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GameState {
    pub players: HashMap<Uuid, Player>,
    pub game_time: Duration,
    pub is_active: bool,
    pub winner: Option<Uuid>,
}

// ❌ INCORRECT - Weak typing
let player: Value = serde_json::from_str(json_str)?;
let game_state: Value = serde_json::from_str(json_str)?;

// ✅ CORRECT - Generic types
pub struct Repository<T> {
    db_pool: PgPool,
    _phantom: PhantomData<T>,
}

impl<T> Repository<T> {
    pub async fn find_by_id(&self, id: Uuid) -> Result<Option<T>, Error> {
        // Implementation...
    }
    
    pub async fn save(&self, entity: &T) -> Result<T, Error> {
        // Implementation...
    }
}

// ✅ CORRECT - Enum types
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum GameEvent {
    PlayerJoined { player: Player },
    PlayerLeft { player_id: Uuid },
    GameEnded { winner: Uuid },
}
```

---

## 🏗️ Object-Oriented Programming (OOP) Policy

### 1. Class Design Principles
```typescript
// ✅ CORRECT - Frontend
abstract class BaseGameObject {
  protected id: string
  protected position: Vector2
  protected isActive: boolean

  constructor(id: string, position: Vector2) {
    this.id = id
    this.position = position
    this.isActive = true
  }

  abstract update(deltaTime: number): void
  abstract render(context: CanvasRenderingContext2D): void

  protected destroy(): void {
    this.isActive = false
  }
}

class Player extends BaseGameObject {
  private health: number
  private inventory: Item[]

  constructor(id: string, position: Vector2, health: number) {
    super(id, position)
    this.health = health
    this.inventory = []
  }

  update(deltaTime: number): void {
    // Player-specific update logic
  }

  render(context: CanvasRenderingContext2D): void {
    // Player-specific rendering logic
  }

  public takeDamage(amount: number): void {
    this.health = Math.max(0, this.health - amount)
    if (this.health <= 0) {
      this.destroy()
    }
  }
}

// ❌ INCORRECT - Poor OOP design
class GameObject {
  id: string
  position: Vector2
  health: number
  inventory: Item[]
  // Mixed responsibilities, no abstraction
}
```

### 2. Encapsulation
```typescript
// ✅ CORRECT - Proper encapsulation
class GameManager {
  private players: Map<string, Player> = new Map()
  private gameState: GameState
  private eventEmitter: EventEmitter

  constructor() {
    this.gameState = GameState.INITIAL
    this.eventEmitter = new EventEmitter()
  }

  public addPlayer(player: Player): void {
    this.players.set(player.id, player)
    this.eventEmitter.emit('playerAdded', player)
  }

  public getPlayer(id: string): Player | undefined {
    return this.players.get(id)
  }

  public getPlayerCount(): number {
    return this.players.size
  }

  // ❌ INCORRECT - Exposing internal state
  // public players: Map<string, Player>
}
```

### 3. Inheritance vs Composition
```typescript
// ✅ CORRECT - Use composition over inheritance
class PlayerController {
  private player: Player
  private inputHandler: InputHandler
  private physicsEngine: PhysicsEngine
  private animationManager: AnimationManager

  constructor(player: Player) {
    this.player = player
    this.inputHandler = new InputHandler()
    this.physicsEngine = new PhysicsEngine()
    this.animationManager = new AnimationManager()
  }

  update(deltaTime: number): void {
    const input = this.inputHandler.getInput()
    const newPosition = this.physicsEngine.calculatePosition(
      this.player.position, 
      input, 
      deltaTime
    )
    this.player.position = newPosition
    this.animationManager.updateAnimation(input, deltaTime)
  }
}

// ❌ INCORRECT - Deep inheritance hierarchy
class GameObject { }
class RenderableObject extends GameObject { }
class AnimatedObject extends RenderableObject { }
class Player extends AnimatedObject { }
class Enemy extends AnimatedObject { }
```

---

## 🔒 SOLID Principles

### 1. Single Responsibility Principle (SRP)
```typescript
// ✅ CORRECT - Single responsibility
class PlayerRepository {
  async findById(id: string): Promise<Player | null> {
    // Only handles player data retrieval
  }
  
  async save(player: Player): Promise<Player> {
    // Only handles player data persistence
  }
}

class PlayerValidator {
  validate(player: Player): ValidationResult {
    // Only handles player validation
  }
}

class PlayerService {
  constructor(
    private repository: PlayerRepository,
    private validator: PlayerValidator
  ) {}

  async createPlayer(playerData: CreatePlayerRequest): Promise<Player> {
    // Orchestrates player creation using dependencies
    const validation = this.validator.validate(playerData)
    if (!validation.isValid) {
      throw new ValidationError(validation.errors)
    }
    
    const player = new Player(playerData)
    return this.repository.save(player)
  }
}

// ❌ INCORRECT - Multiple responsibilities
class PlayerManager {
  async findById(id: string): Promise<Player | null> { }
  async save(player: Player): Promise<Player> { }
  validate(player: Player): ValidationResult { }
  sendNotification(player: Player, message: string): void { }
  calculateScore(player: Player): number { }
}
```

### 2. Open/Closed Principle (OCP)
```typescript
// ✅ CORRECT - Open for extension, closed for modification
interface Weapon {
  calculateDamage(baseDamage: number): number
}

class Sword implements Weapon {
  calculateDamage(baseDamage: number): number {
    return baseDamage * 1.2
  }
}

class Axe implements Weapon {
  calculateDamage(baseDamage: number): number {
    return baseDamage * 1.5
  }
}

class DamageCalculator {
  calculateDamage(weapon: Weapon, baseDamage: number): number {
    return weapon.calculateDamage(baseDamage)
  }
}

// ❌ INCORRECT - Not open for extension
class DamageCalculator {
  calculateDamage(weaponType: string, baseDamage: number): number {
    if (weaponType === 'sword') {
      return baseDamage * 1.2
    } else if (weaponType === 'axe') {
      return baseDamage * 1.5
    }
    // Need to modify this class to add new weapons
  }
}
```

### 3. Liskov Substitution Principle (LSP)
```typescript
// ✅ CORRECT - Subtypes are substitutable
interface GameEntity {
  update(deltaTime: number): void
  render(context: CanvasRenderingContext2D): void
}

class Player implements GameEntity {
  update(deltaTime: number): void {
    // Player-specific update logic
  }
  
  render(context: CanvasRenderingContext2D): void {
    // Player-specific rendering logic
  }
}

class Enemy implements GameEntity {
  update(deltaTime: number): void {
    // Enemy-specific update logic
  }
  
  render(context: CanvasRenderingContext2D): void {
    // Enemy-specific rendering logic
  }
}

class GameLoop {
  updateEntities(entities: GameEntity[], deltaTime: number): void {
    entities.forEach(entity => entity.update(deltaTime))
  }
  
  renderEntities(entities: GameEntity[], context: CanvasRenderingContext2D): void {
    entities.forEach(entity => entity.render(context))
  }
}

// ❌ INCORRECT - Violates LSP
class GameLoop {
  updateEntities(entities: GameEntity[], deltaTime: number): void {
    entities.forEach(entity => {
      if (entity instanceof Player) {
        // Player-specific logic
      } else if (entity instanceof Enemy) {
        // Enemy-specific logic
      }
    })
  }
}
```

### 4. Interface Segregation Principle (ISP)
```typescript
// ✅ CORRECT - Segregated interfaces
interface Renderable {
  render(context: CanvasRenderingContext2D): void
}

interface Updatable {
  update(deltaTime: number): void
}

interface Collidable {
  getBounds(): Bounds
  onCollision(other: Collidable): void
}

class Player implements Renderable, Updatable, Collidable {
  render(context: CanvasRenderingContext2D): void { }
  update(deltaTime: number): void { }
  getBounds(): Bounds { return new Bounds() }
  onCollision(other: Collidable): void { }
}

class StaticObject implements Renderable, Collidable {
  render(context: CanvasRenderingContext2D): void { }
  getBounds(): Bounds { return new Bounds() }
  onCollision(other: Collidable): void { }
  // No update method needed
}

// ❌ INCORRECT - Fat interface
interface GameObject {
  render(context: CanvasRenderingContext2D): void
  update(deltaTime: number): void
  getBounds(): Bounds
  onCollision(other: GameObject): void
  // Static objects don't need update method
}
```

### 5. Dependency Inversion Principle (DIP)
```typescript
// ✅ CORRECT - Depend on abstractions
interface PlayerRepository {
  findById(id: string): Promise<Player | null>
  save(player: Player): Promise<Player>
}

interface NotificationService {
  sendNotification(player: Player, message: string): Promise<void>
}

class PlayerService {
  constructor(
    private repository: PlayerRepository,
    private notificationService: NotificationService
  ) {}

  async createPlayer(playerData: CreatePlayerRequest): Promise<Player> {
    const player = new Player(playerData)
    const savedPlayer = await this.repository.save(player)
    await this.notificationService.sendNotification(savedPlayer, 'Welcome!')
    return savedPlayer
  }
}

// ❌ INCORRECT - Depend on concrete implementations
class PlayerService {
  constructor(
    private repository: PostgresPlayerRepository,
    private notificationService: EmailNotificationService
  ) {}
}
```

---

## 🎨 Design Patterns

### 1. Factory Pattern
```typescript
// ✅ CORRECT - Factory pattern
interface GameObjectFactory {
  createGameObject(type: GameObjectType, config: GameObjectConfig): GameObject
}

class GameObjectFactoryImpl implements GameObjectFactory {
  createGameObject(type: GameObjectType, config: GameObjectConfig): GameObject {
    switch (type) {
      case GameObjectType.PLAYER:
        return new Player(config.id, config.position, config.health)
      case GameObjectType.ENEMY:
        return new Enemy(config.id, config.position, config.health)
      case GameObjectType.ITEM:
        return new Item(config.id, config.position, config.itemType)
      default:
        throw new Error(`Unknown game object type: ${type}`)
    }
  }
}
```

### 2. Observer Pattern
```typescript
// ✅ CORRECT - Observer pattern
interface GameEventListener {
  onGameEvent(event: GameEvent): void
}

class GameEventManager {
  private listeners: Map<string, GameEventListener[]> = new Map()

  addEventListener(eventType: string, listener: GameEventListener): void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, [])
    }
    this.listeners.get(eventType)!.push(listener)
  }

  removeEventListener(eventType: string, listener: GameEventListener): void {
    const eventListeners = this.listeners.get(eventType)
    if (eventListeners) {
      const index = eventListeners.indexOf(listener)
      if (index > -1) {
        eventListeners.splice(index, 1)
      }
    }
  }

  notifyListeners(event: GameEvent): void {
    const eventListeners = this.listeners.get(event.type)
    if (eventListeners) {
      eventListeners.forEach(listener => listener.onGameEvent(event))
    }
  }
}
```

### 3. Strategy Pattern
```typescript
// ✅ CORRECT - Strategy pattern
interface DamageStrategy {
  calculateDamage(attacker: Character, target: Character): number
}

class PhysicalDamageStrategy implements DamageStrategy {
  calculateDamage(attacker: Character, target: Character): number {
    return Math.max(0, attacker.strength - target.armor)
  }
}

class MagicalDamageStrategy implements DamageStrategy {
  calculateDamage(attacker: Character, target: Character): number {
    return Math.max(0, attacker.intelligence - target.magicResistance)
  }
}

class Character {
  private damageStrategy: DamageStrategy

  constructor(damageStrategy: DamageStrategy) {
    this.damageStrategy = damageStrategy
  }

  setDamageStrategy(strategy: DamageStrategy): void {
    this.damageStrategy = strategy
  }

  attack(target: Character): number {
    return this.damageStrategy.calculateDamage(this, target)
  }
}
```

### 4. Command Pattern
```typescript
// ✅ CORRECT - Command pattern
interface GameCommand {
  execute(): void
  undo(): void
}

class MovePlayerCommand implements GameCommand {
  constructor(
    private player: Player,
    private oldPosition: Vector2,
    private newPosition: Vector2
  ) {}

  execute(): void {
    this.player.position = this.newPosition
  }

  undo(): void {
    this.player.position = this.oldPosition
  }
}

class CommandManager {
  private commands: GameCommand[] = []
  private currentIndex: number = -1

  executeCommand(command: GameCommand): void {
    command.execute()
    this.commands.splice(this.currentIndex + 1)
    this.commands.push(command)
    this.currentIndex++
  }

  undo(): void {
    if (this.currentIndex >= 0) {
      this.commands[this.currentIndex].undo()
      this.currentIndex--
    }
  }

  redo(): void {
    if (this.currentIndex < this.commands.length - 1) {
      this.currentIndex++
      this.commands[this.currentIndex].execute()
    }
  }
}
```

---

## 🌍 Internationalization (i18n) Support

### Frontend i18n
```typescript
// ✅ CORRECT - i18n implementation
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Translation files
const en = {
  game: {
    welcome: 'Welcome to the game!',
    playerJoined: '{{playerName}} joined the game',
    gameOver: 'Game Over! {{winner}} wins!',
    errors: {
      invalidMove: 'Invalid move',
      playerNotFound: 'Player not found',
    }
  }
}

const es = {
  game: {
    welcome: '¡Bienvenido al juego!',
    playerJoined: '{{playerName}} se unió al juego',
    gameOver: '¡Juego terminado! ¡{{winner}} gana!',
    errors: {
      invalidMove: 'Movimiento inválido',
      playerNotFound: 'Jugador no encontrado',
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources: { en, es },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

// Usage in components
function GameUI() {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('game.welcome')}</h1>
      <p>{t('game.playerJoined', { playerName: 'John' })}</p>
      <p>{t('game.gameOver', { winner: 'Alice' })}</p>
    </div>
  )
}
```

### Backend i18n
```rust
// ✅ CORRECT - Backend i18n
use rust_i18n::t;

rust_i18n::i18n!("locales");

#[derive(Debug, Serialize)]
pub struct LocalizedMessage {
    pub key: String,
    pub locale: String,
    pub message: String,
}

pub struct LocalizationService {
    supported_locales: Vec<String>,
}

impl LocalizationService {
    pub fn new() -> Self {
        Self {
            supported_locales: vec!["en".to_string(), "es".to_string(), "fr".to_string()],
        }
    }

    pub fn get_message(&self, key: &str, locale: &str) -> String {
        if !self.supported_locales.contains(&locale.to_string()) {
            return self.get_message(key, "en"); // Fallback to English
        }

        match key {
            "game.welcome" => match locale {
                "en" => "Welcome to the game!".to_string(),
                "es" => "¡Bienvenido al juego!".to_string(),
                "fr" => "Bienvenue au jeu!".to_string(),
                _ => "Welcome to the game!".to_string(),
            },
            "game.player_joined" => match locale {
                "en" => "{} joined the game".to_string(),
                "es" => "{} se unió al juego".to_string(),
                "fr" => "{} a rejoint le jeu".to_string(),
                _ => "{} joined the game".to_string(),
            },
            _ => key.to_string(),
        }
    }
}
```

### i18n Best Practices
1. **Use translation keys**: Never hardcode text strings
2. **Support pluralization**: Handle different plural forms
3. **Context-aware translations**: Consider context when translating
4. **Fallback languages**: Always provide fallback to default language
5. **Cultural considerations**: Respect cultural differences in text formatting
6. **Testing**: Test with different languages and locales

---

## ⚙️ Configuration Rules

### Frontend Configuration
```typescript
// ✅ CORRECT - Configuration management
interface GameConfig {
  // Game settings
  game: {
    maxPlayers: number
    gameTimeout: number
    turnTimeout: number
  }
  
  // API settings
  api: {
    baseUrl: string
    timeout: number
    retryAttempts: number
  }
  
  // Feature flags
  features: {
    enableChat: boolean
    enableSpectators: boolean
    enableReplays: boolean
  }
  
  // Localization
  i18n: {
    defaultLocale: string
    supportedLocales: string[]
    fallbackLocale: string
  }
}

// Environment-based configuration
const config: GameConfig = {
  game: {
    maxPlayers: parseInt(process.env.VITE_MAX_PLAYERS || '4'),
    gameTimeout: parseInt(process.env.VITE_GAME_TIMEOUT || '300000'),
    turnTimeout: parseInt(process.env.VITE_TURN_TIMEOUT || '30000'),
  },
  api: {
    baseUrl: process.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
    timeout: parseInt(process.env.VITE_API_TIMEOUT || '10000'),
    retryAttempts: parseInt(process.env.VITE_API_RETRY_ATTEMPTS || '3'),
  },
  features: {
    enableChat: process.env.VITE_ENABLE_CHAT === 'true',
    enableSpectators: process.env.VITE_ENABLE_SPECTATORS === 'true',
    enableReplays: process.env.VITE_ENABLE_REPLAYS === 'true',
  },
  i18n: {
    defaultLocale: process.env.VITE_DEFAULT_LOCALE || 'en',
    supportedLocales: (process.env.VITE_SUPPORTED_LOCALES || 'en,es,fr').split(','),
    fallbackLocale: process.env.VITE_FALLBACK_LOCALE || 'en',
  },
}

export default config
```

### Backend Configuration
```rust
// ✅ CORRECT - Backend configuration
use serde::Deserialize;
use config::{Config, Environment, File};

#[derive(Debug, Deserialize)]
pub struct DatabaseConfig {
    pub url: String,
    pub max_connections: u32,
    pub min_connections: u32,
    pub timeout: Duration,
}

#[derive(Debug, Deserialize)]
pub struct ServerConfig {
    pub host: String,
    pub port: u16,
    pub workers: usize,
    pub timeout: Duration,
}

#[derive(Debug, Deserialize)]
pub struct GameConfig {
    pub max_players: u32,
    pub game_timeout: Duration,
    pub turn_timeout: Duration,
}

#[derive(Debug, Deserialize)]
pub struct AppConfig {
    pub database: DatabaseConfig,
    pub server: ServerConfig,
    pub game: GameConfig,
    pub environment: String,
    pub log_level: String,
}

impl AppConfig {
    pub fn new() -> Result<Self, config::ConfigError> {
        let config = Config::builder()
            // Start with default values
            .add_source(File::with_name("config/default"))
            // Add environment-specific config
            .add_source(File::with_name("config/local").required(false))
            // Add environment variables
            .add_source(Environment::with_prefix("APP"))
            .build()?;

        config.try_deserialize()
    }
}

// Usage
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let config = AppConfig::new()?;
    
    println!("Server will run on {}:{}", config.server.host, config.server.port);
    println!("Database URL: {}", config.database.url);
    
    // Start server with config
    start_server(config).await?;
    
    Ok(())
}
```

### Configuration Best Practices
1. **Environment-based**: Use environment variables for different environments
2. **Validation**: Validate configuration values at startup
3. **Defaults**: Provide sensible default values
4. **Secrets**: Never commit secrets to version control
5. **Documentation**: Document all configuration options
6. **Type safety**: Use strongly-typed configuration structures

---

## 🚀 Additional Best Practices

### 1. Performance Optimization
```typescript
// ✅ CORRECT - Performance optimization
class GameObjectPool<T> {
  private pool: T[] = []
  private factory: () => T

  constructor(factory: () => T, initialSize: number = 10) {
    this.factory = factory
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.factory())
    }
  }

  acquire(): T {
    return this.pool.pop() || this.factory()
  }

  release(obj: T): void {
    this.pool.push(obj)
  }
}

// Usage
const bulletPool = new GameObjectPool(() => new Bullet(), 50)
const bullet = bulletPool.acquire()
// Use bullet...
bulletPool.release(bullet)
```

### 2. Memory Management
```typescript
// ✅ CORRECT - Memory management
class ResourceManager {
  private resources: Map<string, any> = new Map()
  private referenceCounts: Map<string, number> = new Map()

  loadResource(id: string, loader: () => any): any {
    if (this.resources.has(id)) {
      this.referenceCounts.set(id, this.referenceCounts.get(id)! + 1)
      return this.resources.get(id)
    }

    const resource = loader()
    this.resources.set(id, resource)
    this.referenceCounts.set(id, 1)
    return resource
  }

  unloadResource(id: string): void {
    const count = this.referenceCounts.get(id) || 0
    if (count <= 1) {
      this.resources.delete(id)
      this.referenceCounts.delete(id)
    } else {
      this.referenceCounts.set(id, count - 1)
    }
  }
}
```

### 3. Error Boundaries
```typescript
// ✅ CORRECT - Error boundaries
class GameErrorBoundary {
  private errorHandler: (error: Error) => void

  constructor(errorHandler: (error: Error) => void) {
    this.errorHandler = errorHandler
  }

  wrap<T>(fn: () => T): T | null {
    try {
      return fn()
    } catch (error) {
      this.errorHandler(error as Error)
      return null
    }
  }

  wrapAsync<T>(fn: () => Promise<T>): Promise<T | null> {
    return fn().catch(error => {
      this.errorHandler(error as Error)
      return null
    })
  }
}
```

### 4. Security Best Practices
```typescript
// ✅ CORRECT - Security practices
class SecurityUtils {
  // Input validation
  static validateInput(input: string): boolean {
    // Sanitize and validate user input
    const sanitized = input.replace(/[<>\"'&]/g, '')
    return sanitized.length > 0 && sanitized.length <= 1000
  }

  // Rate limiting
  static checkRateLimit(userId: string, action: string): boolean {
    // Implement rate limiting logic
    return true
  }

  // XSS prevention
  static escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
  }
}
```

### 5. Testing Best Practices
```typescript
// ✅ CORRECT - Testing practices
describe('GameService', () => {
  let gameService: GameService
  let mockRepository: jest.Mocked<PlayerRepository>

  beforeEach(() => {
    mockRepository = createMockPlayerRepository()
    gameService = new GameService(mockRepository)
  })

  describe('createPlayer', () => {
    it('should create a player successfully', async () => {
      // Arrange
      const playerData = { name: 'John', health: 100 }
      const expectedPlayer = new Player('1', playerData.name, playerData.health)
      mockRepository.save.mockResolvedValue(expectedPlayer)

      // Act
      const result = await gameService.createPlayer(playerData)

      // Assert
      expect(result).toEqual(expectedPlayer)
      expect(mockRepository.save).toHaveBeenCalledWith(expect.any(Player))
    })

    it('should throw error when validation fails', async () => {
      // Arrange
      const invalidData = { name: '', health: -1 }

      // Act & Assert
      await expect(gameService.createPlayer(invalidData))
        .rejects.toThrow(ValidationError)
    })
  })
})
```

### 6. Code Organization and Structure
```typescript
// ✅ CORRECT - Well-organized code structure
// src/
// ├── components/          # Reusable UI components
// │   ├── Player.ts
// │   ├── GameBoard.ts
// │   └── ScoreDisplay.ts
// ├── services/           # Business logic services
// │   ├── GameService.ts
// │   ├── PlayerService.ts
// │   └── ApiService.ts
// ├── models/            # Data models and types
// │   ├── Player.ts
// │   ├── Game.ts
// │   └── types.ts
// ├── utils/             # Utility functions
// │   ├── MathUtils.ts
// │   ├── ValidationUtils.ts
// │   └── Constants.ts
// ├── hooks/             # Custom React hooks
// │   ├── useGameState.ts
// │   └── usePlayerActions.ts
// └── tests/             # Test files
//     ├── components/
//     ├── services/
//     └── utils/
```

### 7. Error Handling Patterns
```typescript
// ✅ CORRECT - Comprehensive error handling
class GameError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message)
    this.name = 'GameError'
  }
}

class GameService {
  async createGame(gameData: CreateGameRequest): Promise<Game> {
    try {
      // Validate input
      const validation = this.validator.validate(gameData)
      if (!validation.isValid) {
        throw new GameError(
          'Invalid game data',
          'VALIDATION_ERROR',
          400,
          validation.errors
        )
      }

      // Check business rules
      if (!this.canCreateGame(gameData)) {
        throw new GameError(
          'Cannot create game',
          'BUSINESS_RULE_VIOLATION',
          403
        )
      }

      // Create game
      const game = await this.repository.create(gameData)
      
      // Log success
      this.logger.info('Game created successfully', { gameId: game.id })
      
      return game
    } catch (error) {
      // Log error with context
      this.logger.error('Failed to create game', {
        error: error.message,
        gameData,
        stack: error.stack
      })

      // Re-throw if it's our custom error
      if (error instanceof GameError) {
        throw error
      }

      // Wrap unexpected errors
      throw new GameError(
        'Internal server error',
        'INTERNAL_ERROR',
        500,
        { originalError: error.message }
      )
    }
  }
}
```

### 8. Performance Monitoring
```typescript
// ✅ CORRECT - Performance monitoring
class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map()

  startTimer(operation: string): () => void {
    const startTime = performance.now()
    return () => {
      const duration = performance.now() - startTime
      this.recordMetric(operation, duration)
    }
  }

  recordMetric(operation: string, value: number): void {
    if (!this.metrics.has(operation)) {
      this.metrics.set(operation, [])
    }
    this.metrics.get(operation)!.push(value)
  }

  getAverageTime(operation: string): number {
    const values = this.metrics.get(operation) || []
    if (values.length === 0) return 0
    
    const sum = values.reduce((acc, val) => acc + val, 0)
    return sum / values.length
  }

  getMetrics(): Record<string, { count: number; average: number; min: number; max: number }> {
    const result: Record<string, any> = {}
    
    for (const [operation, values] of this.metrics) {
      if (values.length > 0) {
        result[operation] = {
          count: values.length,
          average: this.getAverageTime(operation),
          min: Math.min(...values),
          max: Math.max(...values)
        }
      }
    }
    
    return result
  }
}

// Usage
const monitor = new PerformanceMonitor()

async function createGame() {
  const stopTimer = monitor.startTimer('createGame')
  try {
    // Game creation logic
    const game = await gameService.createGame(gameData)
    return game
  } finally {
    stopTimer()
  }
}
```
```typescript
// ✅ CORRECT - Performance optimization
class GameObjectPool<T> {
  private pool: T[] = []
  private factory: () => T

  constructor(factory: () => T, initialSize: number = 10) {
    this.factory = factory
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.factory())
    }
  }

  acquire(): T {
    return this.pool.pop() || this.factory()
  }

  release(obj: T): void {
    this.pool.push(obj)
  }
}

// Usage
const bulletPool = new GameObjectPool(() => new Bullet(), 50)
const bullet = bulletPool.acquire()
// Use bullet...
bulletPool.release(bullet)
```

### 2. Memory Management
```typescript
// ✅ CORRECT - Memory management
class ResourceManager {
  private resources: Map<string, any> = new Map()
  private referenceCounts: Map<string, number> = new Map()

  loadResource(id: string, loader: () => any): any {
    if (this.resources.has(id)) {
      this.referenceCounts.set(id, this.referenceCounts.get(id)! + 1)
      return this.resources.get(id)
    }

    const resource = loader()
    this.resources.set(id, resource)
    this.referenceCounts.set(id, 1)
    return resource
  }

  unloadResource(id: string): void {
    const count = this.referenceCounts.get(id) || 0
    if (count <= 1) {
      this.resources.delete(id)
      this.referenceCounts.delete(id)
    } else {
      this.referenceCounts.set(id, count - 1)
    }
  }
}
```

### 3. Error Boundaries
```typescript
// ✅ CORRECT - Error boundaries
class GameErrorBoundary {
  private errorHandler: (error: Error) => void

  constructor(errorHandler: (error: Error) => void) {
    this.errorHandler = errorHandler
  }

  wrap<T>(fn: () => T): T | null {
    try {
      return fn()
    } catch (error) {
      this.errorHandler(error as Error)
      return null
    }
  }

  wrapAsync<T>(fn: () => Promise<T>): Promise<T | null> {
    return fn().catch(error => {
      this.errorHandler(error as Error)
      return null
    })
  }
}
```

---

## ✅ Code Review Checklist

### Before Submitting Code
- [ ] Code follows naming conventions
- [ ] All functions have proper documentation
- [ ] Error handling is implemented
- [ ] Logging is added where appropriate
- [ ] Constants are used instead of magic numbers
- [ ] Strong typing is enforced
- [ ] SOLID principles are followed
- [ ] Appropriate design patterns are used
- [ ] i18n support is implemented for user-facing text
- [ ] Configuration is properly managed
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] Performance considerations are addressed
- [ ] Security best practices are followed
- [ ] Code is properly organized and structured

### During Code Review
- [ ] Code readability and maintainability
- [ ] Performance considerations
- [ ] Security implications
- [ ] Error handling completeness
- [ ] Logging adequacy
- [ ] Type safety
- [ ] Design pattern appropriateness
- [ ] Internationalization coverage
- [ ] Configuration management
- [ ] Test coverage
- [ ] Error boundary implementation
- [ ] Memory management practices
- [ ] Input validation and sanitization
- [ ] Rate limiting implementation
- [ ] XSS prevention measures

### After Code Review
- [ ] All feedback is addressed
- [ ] Tests still pass
- [ ] Documentation is updated
- [ ] Code is ready for merge
- [ ] Performance benchmarks are met
- [ ] Security review is completed
- [ ] Code coverage requirements are met

### Quality Gates
- [ ] **Code Quality**: All linting rules pass
- [ ] **Test Coverage**: Minimum 80% code coverage
- [ ] **Performance**: No performance regressions
- [ ] **Security**: Security scan passes
- [ ] **Documentation**: All public APIs documented
- [ ] **Accessibility**: WCAG 2.1 AA compliance
- [ ] **Internationalization**: All user-facing text uses i18n
- [ ] **Error Handling**: Comprehensive error handling implemented
- [ ] **Logging**: Appropriate logging at all levels
- [ ] **Configuration**: Environment-based configuration implemented

---

## 📋 Summary

These coding standards **MUST** be strictly followed across the entire codebase. They ensure:

1. **Consistency**: Uniform code style and structure
2. **Maintainability**: Easy to understand and modify code
3. **Quality**: High-quality, robust code
4. **Performance**: Optimized and efficient implementations
5. **Security**: Secure coding practices
6. **Scalability**: Code that can grow with the project
7. **Internationalization**: Support for multiple languages
8. **Documentation**: Comprehensive and up-to-date documentation

**Remember**: Code quality is everyone's responsibility. These standards are not optional - they are mandatory requirements for all contributions to the project.

---

*Last updated: [Current Date]*
*Version: 1.0.0*
