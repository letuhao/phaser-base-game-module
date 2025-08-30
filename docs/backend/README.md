# Backend Documentation

## 🦀 Rust Game Server Implementation

This section covers the backend implementation using Rust for high-performance, concurrent game server capabilities with HTTP/HTTP2 and webhook support.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Backend Architecture                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   HTTP/2    │  │  WebSocket  │  │  Webhook    │        │
│  │   Server    │  │   Server    │  │  Handler    │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Game      │  │  Session    │  │  Event      │        │
│  │   Engine    │  │  Manager    │  │  System     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Database  │  │   Cache     │  │   Queue     │        │
│  │   Layer     │  │   (Redis)   │  │   System    │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites
- Rust 1.70+ (stable)
- Cargo package manager
- PostgreSQL 14+
- Redis 6+
- Docker (optional)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd phaser-game

# Install dependencies
cargo build

# Run development server
cargo run

# Run tests
cargo test

# Run with hot reload
cargo install cargo-watch
cargo watch -x run
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── main.rs                 # Application entry point
│   ├── lib.rs                  # Library exports
│   ├── config/                 # Configuration management
│   │   ├── mod.rs
│   │   └── settings.rs
│   ├── server/                 # HTTP server setup
│   │   ├── mod.rs
│   │   ├── http.rs
│   │   └── middleware.rs
│   ├── handlers/               # HTTP request handlers
│   │   ├── mod.rs
│   │   ├── game.rs
│   │   ├── auth.rs
│   │   └── webhook.rs
│   ├── models/                 # Data models
│   │   ├── mod.rs
│   │   ├── game.rs
│   │   ├── user.rs
│   │   └── events.rs
│   ├── services/               # Business logic
│   │   ├── mod.rs
│   │   ├── game_service.rs
│   │   ├── session_service.rs
│   │   └── webhook_service.rs
│   ├── database/               # Database operations
│   │   ├── mod.rs
│   │   ├── connection.rs
│   │   └── migrations/
│   └── utils/                  # Utility functions
├── Cargo.toml                  # Dependencies and metadata
├── .env                        # Environment variables
└── docker-compose.yml          # Development environment
```

## ⚙️ Configuration

### Cargo.toml Dependencies
```toml
[package]
name = "phaser-game-backend"
version = "0.1.0"
edition = "2021"

[dependencies]
# Web framework
axum = "0.7"
tower = "0.4"
tower-http = { version = "0.5", features = ["cors", "compression", "trace"] }

# Async runtime
tokio = { version = "1.0", features = ["full"] }

# HTTP/2 support
hyper = { version = "1.0", features = ["full"] }
http = "1.0"

# Serialization
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"

# Database
sqlx = { version = "0.7", features = ["postgres", "runtime-tokio-rustls"] }
redis = { version = "0.23", features = ["tokio-comp"] }

# Authentication
jsonwebtoken = "9.0"
bcrypt = "0.15"

# Logging
tracing = "0.1"
tracing-subscriber = "0.3"

# Configuration
config = "0.14"
dotenv = "0.15"

# Utilities
uuid = { version = "1.0", features = ["v4", "serde"] }
chrono = { version = "0.4", features = ["serde"] }
anyhow = "1.0"
thiserror = "1.0"
```

### Environment Configuration (`.env`)
```env
# Server Configuration
SERVER_HOST=127.0.0.1
SERVER_PORT=8080
SERVER_WORKERS=4

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost/phaser_game
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION=3600

# Webhook Configuration
WEBHOOK_SECRET=your-webhook-secret
WEBHOOK_TIMEOUT=5000

# Logging
LOG_LEVEL=info
RUST_LOG=info
```

## 🏗️ Server Implementation

### Main Application (`src/main.rs`)
```rust
use axum::{
    routing::{get, post, put, delete},
    Router,
    http::Method,
};
use tower_http::cors::{CorsLayer, Any};
use tracing_subscriber;

mod config;
mod server;
mod handlers;
mod services;
mod models;
mod database;

#[tokio::main]
async fn main() {
    // Initialize logging
    tracing_subscriber::fmt::init();
    
    // Load configuration
    let config = config::Settings::new().expect("Failed to load configuration");
    
    // Setup database connection
    let db_pool = database::establish_connection(&config.database_url)
        .await
        .expect("Failed to connect to database");
    
    // Setup Redis connection
    let redis_client = redis::Client::open(config.redis_url)
        .expect("Failed to connect to Redis");
    
    // Create application state
    let app_state = AppState {
        db_pool,
        redis_client,
        config: config.clone(),
    };
    
    // Setup CORS
    let cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::DELETE])
        .allow_origin(Any)
        .allow_headers(Any);
    
    // Create router
    let app = Router::new()
        .route("/health", get(health_check))
        .route("/api/games", get(handlers::game::list_games))
        .route("/api/games", post(handlers::game::create_game))
        .route("/api/games/:id", get(handlers::game::get_game))
        .route("/api/games/:id", put(handlers::game::update_game))
        .route("/api/games/:id", delete(handlers::game::delete_game))
        .route("/api/webhooks", post(handlers::webhook::receive_webhook))
        .route("/api/auth/login", post(handlers::auth::login))
        .route("/api/auth/register", post(handlers::auth::register))
        .layer(cors)
        .with_state(app_state);
    
    // Start server
    let listener = tokio::net::TcpListener::bind(
        format!("{}:{}", config.server_host, config.server_port)
    ).await.unwrap();
    
    tracing::info!("Server running on {}:{}", config.server_host, config.server_port);
    
    axum::serve(listener, app).await.unwrap();
}

async fn health_check() -> &'static str {
    "OK"
}
```

### HTTP/2 Server Configuration (`src/server/http.rs`)
```rust
use axum::{
    Router,
    http::{HeaderValue, Method},
    response::Response,
};
use tower_http::{
    compression::CompressionLayer,
    cors::CorsLayer,
    trace::TraceLayer,
    http2::Http2ServerLayer,
};
use hyper::server::conn::http2;

pub struct HttpServer {
    router: Router,
    config: ServerConfig,
}

impl HttpServer {
    pub fn new(router: Router, config: ServerConfig) -> Self {
        Self { router, config }
    }
    
    pub async fn run(self) -> Result<(), Box<dyn std::error::Error>> {
        let addr = format!("{}:{}", self.config.host, self.config.port)
            .parse()?;
        
        let listener = tokio::net::TcpListener::bind(addr).await?;
        
        // Enable HTTP/2
        let http2_layer = Http2ServerLayer::new();
        
        let app = self.router
            .layer(http2_layer)
            .layer(CompressionLayer::new())
            .layer(TraceLayer::new_for_http());
        
        axum::serve(listener, app).await?;
        Ok(())
    }
}
```

## 🎮 Game Service Implementation

### Game Service (`src/services/game_service.rs`)
```rust
use sqlx::{PgPool, Row};
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use anyhow::Result;

#[derive(Debug, Serialize, Deserialize)]
pub struct Game {
    pub id: Uuid,
    pub name: String,
    pub status: GameStatus,
    pub player_count: i32,
    pub max_players: i32,
    pub created_at: chrono::DateTime<chrono::Utc>,
    pub updated_at: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum GameStatus {
    Waiting,
    Active,
    Finished,
    Cancelled,
}

pub struct GameService {
    db_pool: PgPool,
}

impl GameService {
    pub fn new(db_pool: PgPool) -> Self {
        Self { db_pool }
    }
    
    pub async fn create_game(&self, name: String, max_players: i32) -> Result<Game> {
        let game = sqlx::query_as!(
            Game,
            r#"
            INSERT INTO games (name, max_players, status, player_count)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, status as "status!: GameStatus", 
                      player_count, max_players, created_at, updated_at
            "#,
            name,
            max_players,
            GameStatus::Waiting as GameStatus,
            0
        )
        .fetch_one(&self.db_pool)
        .await?;
        
        Ok(game)
    }
    
    pub async fn get_game(&self, id: Uuid) -> Result<Option<Game>> {
        let game = sqlx::query_as!(
            Game,
            r#"
            SELECT id, name, status as "status!: GameStatus", 
                   player_count, max_players, created_at, updated_at
            FROM games
            WHERE id = $1
            "#,
            id
        )
        .fetch_optional(&self.db_pool)
        .await?;
        
        Ok(game)
    }
    
    pub async fn update_game_state(&self, id: Uuid, state: GameState) -> Result<()> {
        sqlx::query!(
            r#"
            UPDATE games
            SET status = $2, player_count = $3, updated_at = NOW()
            WHERE id = $1
            "#,
            id,
            state.status as GameStatus,
            state.player_count
        )
        .execute(&self.db_pool)
        .await?;
        
        Ok(())
    }
    
    pub async fn list_active_games(&self) -> Result<Vec<Game>> {
        let games = sqlx::query_as!(
            Game,
            r#"
            SELECT id, name, status as "status!: GameStatus", 
                   player_count, max_players, created_at, updated_at
            FROM games
            WHERE status = $1
            ORDER BY created_at DESC
            "#,
            GameStatus::Active as GameStatus
        )
        .fetch_all(&self.db_pool)
        .await?;
        
        Ok(games)
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GameState {
    pub status: GameStatus,
    pub player_count: i32,
}
```

## 🔌 Webhook Implementation

### Webhook Service (`src/services/webhook_service.rs`)
```rust
use axum::{
    http::StatusCode,
    response::Response,
    body::Body,
};
use serde::{Deserialize, Serialize};
use hmac::{Hmac, Mac};
use sha2::Sha256;
use anyhow::Result;

#[derive(Debug, Serialize, Deserialize)]
pub struct WebhookPayload {
    pub event: String,
    pub data: serde_json::Value,
    pub timestamp: i64,
    pub signature: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct WebhookEvent {
    pub event_type: String,
    pub game_id: String,
    pub payload: serde_json::Value,
}

pub struct WebhookService {
    secret: String,
    timeout: std::time::Duration,
}

impl WebhookService {
    pub fn new(secret: String, timeout: u64) -> Self {
        Self {
            secret,
            timeout: std::time::Duration::from_millis(timeout),
        }
    }
    
    pub fn verify_signature(&self, payload: &[u8], signature: &str) -> Result<bool> {
        let mut mac = Hmac::<Sha256>::new_from_slice(self.secret.as_bytes())?;
        mac.update(payload);
        
        let expected_signature = hex::encode(mac.finalize().into_bytes());
        Ok(signature == expected_signature)
    }
    
    pub async fn send_webhook(&self, url: &str, event: WebhookEvent) -> Result<()> {
        let client = reqwest::Client::new();
        
        let response = client
            .post(url)
            .timeout(self.timeout)
            .json(&event)
            .send()
            .await?;
        
        if !response.status().is_success() {
            return Err(anyhow::anyhow!("Webhook failed: {}", response.status()));
        }
        
        Ok(())
    }
    
    pub async fn broadcast_game_event(&self, game_id: &str, event_type: &str, data: serde_json::Value) -> Result<()> {
        let event = WebhookEvent {
            event_type: event_type.to_string(),
            game_id: game_id.to_string(),
            payload: data,
        };
        
        // Get webhook URLs from database or configuration
        let webhook_urls = self.get_webhook_urls(game_id).await?;
        
        // Send webhook to all registered endpoints
        let mut futures = Vec::new();
        for url in webhook_urls {
            let event_clone = event.clone();
            let url_clone = url.clone();
            futures.push(self.send_webhook(&url_clone, event_clone));
        }
        
        // Wait for all webhooks to complete
        let results = futures::future::join_all(futures).await;
        
        // Check for any failures
        for result in results {
            if let Err(e) = result {
                tracing::error!("Webhook failed: {}", e);
            }
        }
        
        Ok(())
    }
    
    async fn get_webhook_urls(&self, game_id: &str) -> Result<Vec<String>> {
        // This would typically query a database for registered webhook URLs
        // For now, return a default list
        Ok(vec![
            "http://localhost:3000/api/webhooks".to_string(),
        ])
    }
}
```

## 🔐 Authentication & Authorization

### Auth Service (`src/services/auth_service.rs`)
```rust
use jsonwebtoken::{encode, decode, Header, Validation, EncodingKey, DecodingKey};
use bcrypt::{hash, verify, DEFAULT_COST};
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use anyhow::Result;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String, // User ID
    pub exp: usize,  // Expiration time
    pub iat: usize,  // Issued at
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RegisterRequest {
    pub username: String,
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AuthResponse {
    pub token: String,
    pub user: User,
}

pub struct AuthService {
    jwt_secret: String,
    db_pool: sqlx::PgPool,
}

impl AuthService {
    pub fn new(jwt_secret: String, db_pool: sqlx::PgPool) -> Self {
        Self { jwt_secret, db_pool }
    }
    
    pub async fn register(&self, req: RegisterRequest) -> Result<AuthResponse> {
        // Check if user already exists
        let existing_user = sqlx::query!(
            "SELECT id FROM users WHERE username = $1 OR email = $2",
            req.username,
            req.email
        )
        .fetch_optional(&self.db_pool)
        .await?;
        
        if existing_user.is_some() {
            return Err(anyhow::anyhow!("User already exists"));
        }
        
        // Hash password
        let hashed_password = hash(req.password.as_bytes(), DEFAULT_COST)?;
        
        // Create user
        let user = sqlx::query_as!(
            User,
            r#"
            INSERT INTO users (username, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING id, username, email, created_at
            "#,
            req.username,
            req.email,
            hashed_password
        )
        .fetch_one(&self.db_pool)
        .await?;
        
        // Generate JWT token
        let token = self.generate_token(&user.id)?;
        
        Ok(AuthResponse { token, user })
    }
    
    pub async fn login(&self, req: LoginRequest) -> Result<AuthResponse> {
        // Find user
        let user = sqlx::query_as!(
            UserWithPassword,
            r#"
            SELECT id, username, email, password_hash, created_at
            FROM users
            WHERE username = $1
            "#,
            req.username
        )
        .fetch_optional(&self.db_pool)
        .await?
        .ok_or_else(|| anyhow::anyhow!("Invalid credentials"))?;
        
        // Verify password
        if !verify(req.password.as_bytes(), &user.password_hash)? {
            return Err(anyhow::anyhow!("Invalid credentials"));
        }
        
        // Generate JWT token
        let token = self.generate_token(&user.id)?;
        
        let user_response = User {
            id: user.id,
            username: user.username,
            email: user.email,
            created_at: user.created_at,
        };
        
        Ok(AuthResponse { token, user: user_response })
    }
    
    pub fn verify_token(&self, token: &str) -> Result<Claims> {
        let token_data = decode::<Claims>(
            token,
            &DecodingKey::from_secret(self.jwt_secret.as_ref()),
            &Validation::default()
        )?;
        
        Ok(token_data.claims)
    }
    
    fn generate_token(&self, user_id: &Uuid) -> Result<String> {
        let now = chrono::Utc::now();
        let exp = (now + chrono::Duration::hours(1)).timestamp() as usize;
        let iat = now.timestamp() as usize;
        
        let claims = Claims {
            sub: user_id.to_string(),
            exp,
            iat,
        };
        
        let token = encode(
            &Header::default(),
            &claims,
            &EncodingKey::from_secret(self.jwt_secret.as_ref())
        )?;
        
        Ok(token)
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub id: Uuid,
    pub username: String,
    pub email: String,
    pub created_at: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug)]
struct UserWithPassword {
    pub id: Uuid,
    pub username: String,
    pub email: String,
    pub password_hash: String,
    pub created_at: chrono::DateTime<chrono::Utc>,
}
```

## 🗄️ Database Schema

### Database Migrations (`src/database/migrations/001_initial_schema.sql`)
```sql
-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create games table
CREATE TABLE games (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'waiting',
    player_count INTEGER NOT NULL DEFAULT 0,
    max_players INTEGER NOT NULL,
    game_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create game_sessions table
CREATE TABLE game_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(game_id, user_id)
);

-- Create webhooks table
CREATE TABLE webhooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url VARCHAR(500) NOT NULL,
    game_id UUID REFERENCES games(id) ON DELETE CASCADE,
    events TEXT[] NOT NULL DEFAULT '{}',
    secret VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_games_status ON games(status);
CREATE INDEX idx_games_created_at ON games(created_at);
CREATE INDEX idx_game_sessions_game_id ON game_sessions(game_id);
CREATE INDEX idx_webhooks_game_id ON webhooks(game_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_games_updated_at BEFORE UPDATE ON games
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 🧪 Testing

### Test Configuration (`tests/common/mod.rs`)
```rust
use sqlx::PgPool;
use tower::ServiceExt;
use axum::{
    body::Body,
    http::{Request, StatusCode},
    response::Response,
};

pub async fn create_test_app() -> axum::Router {
    // Setup test database
    let database_url = std::env::var("TEST_DATABASE_URL")
        .unwrap_or_else(|_| "postgresql://test:test@localhost/test_db".to_string());
    
    let pool = PgPool::connect(&database_url).await.unwrap();
    
    // Run migrations
    sqlx::migrate!("./migrations").run(&pool).await.unwrap();
    
    // Create test app
    crate::create_app(pool).await
}

pub async fn send_request(
    app: axum::Router,
    method: &str,
    uri: &str,
    body: Option<&str>,
) -> Response {
    let body = body.map(Body::from).unwrap_or_else(Body::empty);
    
    let request = Request::builder()
        .method(method)
        .uri(uri)
        .header("content-type", "application/json")
        .body(body)
        .unwrap();
    
    app.oneshot(request).await.unwrap()
}
```

### Integration Test Example (`tests/game_tests.rs`)
```rust
use super::common::*;

#[tokio::test]
async fn test_create_game() {
    let app = create_test_app().await;
    
    let game_data = r#"{"name": "Test Game", "max_players": 4}"#;
    
    let response = send_request(
        app,
        "POST",
        "/api/games",
        Some(game_data)
    ).await;
    
    assert_eq!(response.status(), StatusCode::CREATED);
    
    let body = hyper::body::to_bytes(response.into_body()).await.unwrap();
    let game: serde_json::Value = serde_json::from_slice(&body).unwrap();
    
    assert_eq!(game["name"], "Test Game");
    assert_eq!(game["max_players"], 4);
    assert_eq!(game["status"], "waiting");
}
```

## 🚀 Performance Optimization

### Connection Pooling
- SQLx connection pooling for database
- Redis connection pooling
- HTTP client connection pooling

### Async Processing
- Tokio runtime with multiple worker threads
- Non-blocking I/O operations
- Efficient task scheduling

### Caching Strategy
- Redis for session data
- In-memory caching for frequently accessed data
- Database query result caching

## 🔒 Security Features

### Input Validation
- Serde validation for all inputs
- SQL injection prevention with parameterized queries
- XSS protection with proper content types

### Rate Limiting
- Per-IP rate limiting
- Per-user rate limiting
- DDoS protection

### Authentication
- JWT token validation
- Secure password hashing with bcrypt
- Session management

## 📊 Monitoring & Logging

### Structured Logging
```rust
use tracing::{info, error, warn, debug};

// Example usage
info!(game_id = %game.id, "Game created successfully");
error!(error = %e, "Failed to process webhook");
warn!(user_id = %user.id, "User attempted unauthorized access");
debug!(request_id = %request_id, "Processing request");
```

### Metrics Collection
- Request/response timing
- Database query performance
- Memory usage monitoring
- Error rate tracking

---

*For more detailed implementation examples, see the individual service documentation files.*
