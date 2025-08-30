# Development Guide

## 🛠️ Development Environment Setup

Complete guide for setting up your development environment and contributing to the game project.

## 📋 Prerequisites

### System Requirements
- **Operating System**: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **Memory**: 8GB RAM minimum, 16GB recommended
- **Storage**: 10GB free space
- **CPU**: Multi-core processor (4+ cores recommended)

### Required Software
- **Node.js**: 18.x or higher
- **Rust**: 1.70+ (stable channel)
- **Git**: 2.30+
- **Docker**: 20.10+ (optional, for containerized development)
- **PostgreSQL**: 14+ or Docker container
- **Redis**: 6+ or Docker container

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone <repository-url>
cd phaser-game
```

### 2. Install Dependencies
```bash
# Frontend dependencies
cd frontend
npm install

# Backend dependencies
cd ../backend
cargo build
```

### 3. Setup Environment
```bash
# Copy environment files
cp .env.example .env
cp frontend/.env.example frontend/.env

# Edit environment variables
# See Configuration section below
```

### 4. Start Development Servers
```bash
# Terminal 1: Backend
cd backend
cargo run

# Terminal 2: Frontend
cd frontend
npm run dev

# Terminal 3: Database (if using Docker)
docker-compose up -d
```

## ⚙️ Configuration

### Backend Environment (`.env`)
```env
# Server Configuration
SERVER_HOST=127.0.0.1
SERVER_PORT=8080
SERVER_WORKERS=4

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost/phaser_game
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRATION=3600

# Webhook Configuration
WEBHOOK_SECRET=your-webhook-secret-here
WEBHOOK_TIMEOUT=5000

# Logging
LOG_LEVEL=debug
RUST_LOG=debug

# Development
ENVIRONMENT=development
DEBUG=true
```

### Frontend Environment (`frontend/.env`)
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api
VITE_WS_BASE_URL=ws://localhost:8080/ws

# Game Configuration
VITE_GAME_TITLE=Phaser Game
VITE_GAME_VERSION=1.0.0

# Development
VITE_DEV_MODE=true
VITE_DEBUG=true
```

### Database Setup
```bash
# Create database
createdb phaser_game

# Run migrations
cd backend
cargo install sqlx-cli
sqlx migrate run
```

## 🏗️ Project Structure

```
phaser-game/
├── docs/                    # Documentation
├── frontend/               # Vite + Phaser frontend
│   ├── src/
│   │   ├── game/          # Game logic
│   │   ├── ui/            # UI components
│   │   ├── services/      # API services
│   │   └── assets/        # Game assets
│   ├── public/            # Static files
│   └── package.json
├── backend/                # Rust backend
│   ├── src/
│   │   ├── handlers/      # HTTP handlers
│   │   ├── services/      # Business logic
│   │   ├── models/        # Data models
│   │   └── database/      # Database layer
│   ├── Cargo.toml
│   └── .env
├── docker-compose.yml      # Development services
├── .gitignore
└── README.md
```

## 🔧 Development Tools

### Frontend Development
```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format
```

### Backend Development
```bash
# Run development server
cargo run

# Run with hot reload
cargo install cargo-watch
cargo watch -x run

# Run tests
cargo test

# Run specific tests
cargo test test_name

# Run tests with output
cargo test -- --nocapture

# Check code
cargo check

# Format code
cargo fmt

# Lint code
cargo clippy
```

### Database Development
```bash
# Create new migration
sqlx migrate add migration_name

# Run migrations
sqlx migrate run

# Revert last migration
sqlx migrate revert

# Generate SQLx macros
cargo install sqlx-cli
sqlx prepare --check
```

## 🧪 Testing

### Frontend Testing
```typescript
// Example test file: src/game/__tests__/Game.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { Game } from '../Game'

describe('Game', () => {
  let game: Game

  beforeEach(() => {
    game = new Game()
  })

  it('should initialize with correct configuration', () => {
    expect(game.config.width).toBe(1280)
    expect(game.config.height).toBe(720)
  })

  it('should start with waiting status', () => {
    expect(game.status).toBe('waiting')
  })
})
```

### Backend Testing
```rust
// Example test file: src/services/game_service.rs
#[cfg(test)]
mod tests {
    use super::*;
    use sqlx::PgPool;

    #[tokio::test]
    async fn test_create_game() {
        let pool = setup_test_db().await;
        let service = GameService::new(pool);
        
        let game = service.create_game("Test Game".to_string(), 4).await.unwrap();
        
        assert_eq!(game.name, "Test Game");
        assert_eq!(game.max_players, 4);
        assert_eq!(game.status, GameStatus::Waiting);
    }
}
```

### Integration Testing
```bash
# Run all tests
cargo test --test integration_tests

# Run specific integration test
cargo test --test game_api_tests

# Run with database
DATABASE_URL=postgresql://test:test@localhost/test_db cargo test
```

## 🔍 Debugging

### Frontend Debugging
```typescript
// Enable Phaser debug mode
const config: Phaser.Types.Core.GameConfig = {
  // ... other config
  physics: {
    default: 'arcade',
    arcade: {
      debug: true, // Enable physics debug
    },
  },
}

// Console logging
console.log('Game state:', gameState)
console.warn('Warning message')
console.error('Error message')

// Debug breakpoints
debugger; // Browser will pause here
```

### Backend Debugging
```rust
// Logging with different levels
use tracing::{info, warn, error, debug};

info!("Game created: {}", game_id);
warn!("Player left unexpectedly: {}", player_id);
error!("Database connection failed: {}", e);
debug!("Processing game event: {:?}", event);

// Debug assertions
debug_assert!(player_count > 0, "Player count must be positive");

// Panic with custom message
panic!("Game state is invalid: {:?}", state);
```

### Database Debugging
```sql
-- Enable query logging
SET log_statement = 'all';
SET log_min_duration_statement = 0;

-- Check active connections
SELECT * FROM pg_stat_activity;

-- Monitor slow queries
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC;
```

## 📊 Performance Monitoring

### Frontend Performance
```typescript
// Performance monitoring
class PerformanceMonitor {
  private frameCount = 0
  private lastTime = performance.now()

  update() {
    this.frameCount++
    const currentTime = performance.now()
    
    if (currentTime - this.lastTime >= 1000) {
      const fps = this.frameCount
      console.log(`FPS: ${fps}`)
      this.frameCount = 0
      this.lastTime = currentTime
    }
  }
}

// Memory usage
console.log('Memory usage:', performance.memory)
```

### Backend Performance
```rust
use std::time::Instant;

// Timing operations
let start = Instant::now();
let result = expensive_operation().await;
let duration = start.elapsed();
tracing::info!("Operation took: {:?}", duration);

// Memory profiling
#[cfg(debug_assertions)]
{
    let memory_info = sysinfo::System::new_all();
    tracing::info!("Memory usage: {} MB", memory_info.used_memory() / 1024 / 1024);
}
```

## 🚀 Deployment

### Development Deployment
```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd ../backend
cargo build --release

# Run production backend
./target/release/phaser-game-backend

# Serve frontend (using any static server)
cd ../frontend/dist
python -m http.server 8000
```

### Docker Deployment
```dockerfile
# Backend Dockerfile
FROM rust:1.70 as builder
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bullseye-slim
RUN apt-get update && apt-get install -y ca-certificates
COPY --from=builder /app/target/release/phaser-game-backend /usr/local/bin/
EXPOSE 8080
CMD ["phaser-game-backend"]
```

```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgresql://user:pass@db/phaser_game
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=phaser_game
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:6-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

## 🔒 Security Development

### JWT Token Development
```rust
// Generate test tokens for development
#[cfg(debug_assertions)]
pub fn generate_test_token(user_id: &str) -> Result<String> {
    let claims = Claims {
        sub: user_id.to_string(),
        exp: (chrono::Utc::now() + chrono::Duration::hours(24)).timestamp() as usize,
        iat: chrono::Utc::now().timestamp() as usize,
    };
    
    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret("test-secret".as_ref())
    )
}
```

### Webhook Testing
```bash
# Test webhook locally using ngrok
ngrok http 3000

# Send test webhook
curl -X POST http://localhost:8080/api/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-ngrok-url.ngrok.io/webhooks",
    "events": ["game_start", "game_end"]
  }'
```

## 📝 Code Style

### Rust Code Style
```rust
// Use rustfmt for consistent formatting
// Run: cargo fmt

// Use clippy for linting
// Run: cargo clippy

// Example of good Rust style
pub struct GameService {
    db_pool: PgPool,
    redis_client: redis::Client,
}

impl GameService {
    pub fn new(db_pool: PgPool, redis_client: redis::Client) -> Self {
        Self {
            db_pool,
            redis_client,
        }
    }
    
    pub async fn create_game(&self, name: String) -> Result<Game> {
        // Implementation
    }
}
```

### TypeScript Code Style
```typescript
// Use Prettier for formatting
// Use ESLint for linting

// Example of good TypeScript style
export class GameService {
  private readonly apiClient: ApiClient
  
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient
  }
  
  public async createGame(gameData: CreateGameRequest): Promise<Game> {
    try {
      const response = await this.apiClient.post('/games', gameData)
      return response.data
    } catch (error) {
      throw new GameCreationError('Failed to create game', error)
    }
  }
}
```

## 🤝 Contributing

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-game-mode

# Make changes and commit
git add .
git commit -m "feat: add new game mode with enhanced physics"

# Push and create pull request
git push origin feature/new-game-mode
```

### Commit Message Format
```
type(scope): description

feat(game): add multiplayer support
fix(auth): resolve JWT token validation issue
docs(api): update webhook documentation
test(backend): add integration tests for game service
refactor(frontend): optimize Phaser scene management
```

### Pull Request Checklist
- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
- [ ] Performance impact considered
- [ ] Security implications reviewed

## 🐛 Troubleshooting

### Common Issues

#### Frontend Issues
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev

# Check Phaser version compatibility
npm list phaser
```

#### Backend Issues
```bash
# Clean and rebuild
cargo clean
cargo build

# Check Rust version
rustc --version
cargo --version

# Update Rust
rustup update

# Check database connection
cargo run --bin check-db
```

#### Database Issues
```bash
# Reset database
dropdb phaser_game
createdb phaser_game
sqlx migrate run

# Check connection
psql -h localhost -U user -d phaser_game -c "SELECT 1"
```

### Performance Issues
```bash
# Monitor system resources
htop
iotop
nethogs

# Check database performance
EXPLAIN ANALYZE SELECT * FROM games WHERE status = 'active';

# Monitor network
netstat -tulpn | grep :8080
```

## 📚 Additional Resources

### Documentation
- [Phaser 3.9 Documentation](https://photonstorm.github.io/phaser3-docs/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Rust Book](https://doc.rust-lang.org/book/)
- [Axum Documentation](https://docs.rs/axum/)
- [SQLx Documentation](https://docs.rs/sqlx/)

### Tools
- [Rust Playground](https://play.rust-lang.org/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Postman](https://www.postman.com/) - API testing
- [DBeaver](https://dbeaver.io/) - Database management

### Community
- [Rust Community](https://www.rust-lang.org/community)
- [Phaser Discord](https://discord.gg/phaser)
- [Vite GitHub](https://github.com/vitejs/vite)

---

*For more specific development topics, see the individual documentation files in each section.*
