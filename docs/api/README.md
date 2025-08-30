# API Reference

## 🔌 Game Backend API Documentation

Complete API reference for the Rust-based game backend with HTTP/HTTP2 and webhook support.

## 📋 Base Information

- **Base URL**: `http://localhost:8080/api`
- **Protocol**: HTTP/1.1 + HTTP/2
- **Content Type**: `application/json`
- **Authentication**: JWT Bearer Token

## 🔐 Authentication

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "player1",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "player1",
    "email": "player1@example.com",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "newplayer",
  "email": "newplayer@example.com",
  "password": "securepassword"
}
```

**Response:** Same as login response

## 🎮 Game Management

### Create Game
```http
POST /api/games
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Epic Battle",
  "max_players": 4,
  "game_type": "battle_royale"
}
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "Epic Battle",
  "status": "waiting",
  "player_count": 0,
  "max_players": 4,
  "game_type": "battle_royale",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### Get Game
```http
GET /api/games/{game_id}
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "Epic Battle",
  "status": "active",
  "player_count": 3,
  "max_players": 4,
  "game_data": {
    "level": 5,
    "score": 1250,
    "players": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440002",
        "username": "player1",
        "score": 450
      }
    ]
  },
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### Update Game
```http
PUT /api/games/{game_id}
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "status": "active",
  "game_data": {
    "level": 6,
    "score": 1500
  }
}
```

### List Games
```http
GET /api/games?status=active&limit=10&offset=0
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `status`: Filter by game status (waiting, active, finished, cancelled)
- `limit`: Number of games to return (default: 20, max: 100)
- `offset`: Number of games to skip (default: 0)

**Response:**
```json
{
  "games": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Epic Battle",
      "status": "active",
      "player_count": 3,
      "max_players": 4,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 25,
  "limit": 10,
  "offset": 0
}
```

### Delete Game
```http
DELETE /api/games/{game_id}
Authorization: Bearer <jwt_token>
```

**Response:** `204 No Content`

## 👥 Game Sessions

### Join Game
```http
POST /api/games/{game_id}/join
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "session_id": "550e8400-e29b-41d4-a716-446655440003",
  "game_id": "550e8400-e29b-41d4-a716-446655440001",
  "user_id": "550e8400-e29b-41d4-a716-446655440002",
  "joined_at": "2024-01-01T00:00:00Z"
}
```

### Leave Game
```http
DELETE /api/games/{game_id}/leave
Authorization: Bearer <jwt_token>
```

**Response:** `204 No Content`

### Get Game Players
```http
GET /api/games/{game_id}/players
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "players": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "username": "player1",
      "joined_at": "2024-01-01T00:00:00Z",
      "is_ready": true
    }
  ],
  "total": 3
}
```

## 📡 Webhook Management

### Register Webhook
```http
POST /api/webhooks
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "url": "https://frontend.example.com/webhooks",
  "events": ["game_start", "game_end", "player_join"],
  "secret": "webhook_secret_key"
}
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440004",
  "url": "https://frontend.example.com/webhooks",
  "events": ["game_start", "game_end", "player_join"],
  "is_active": true,
  "created_at": "2024-01-01T00:00:00Z"
}
```

### List Webhooks
```http
GET /api/webhooks
Authorization: Bearer <jwt_token>
```

### Delete Webhook
```http
DELETE /api/webhooks/{webhook_id}
Authorization: Bearer <jwt_token>
```

## 🔄 Webhook Events

### Webhook Payload Format
```json
{
  "event": "game_start",
  "game_id": "550e8400-e29b-41d4-a716-446655440001",
  "timestamp": 1704067200,
  "data": {
    "level": 1,
    "player_count": 4,
    "game_type": "battle_royale"
  },
  "signature": "sha256=abc123..."
}
```

### Available Events

#### `game_start`
Triggered when a game begins
```json
{
  "event": "game_start",
  "data": {
    "level": 1,
    "player_count": 4,
    "game_type": "battle_royale"
  }
}
```

#### `game_end`
Triggered when a game finishes
```json
{
  "event": "game_end",
  "data": {
    "winner_id": "550e8400-e29b-41d4-a716-446655440002",
    "final_score": 2500,
    "duration_seconds": 1800
  }
}
```

#### `player_join`
Triggered when a player joins a game
```json
{
  "event": "player_join",
  "data": {
    "player_id": "550e8400-e29b-41d4-a716-446655440002",
    "username": "player1",
    "player_count": 3
  }
}
```

#### `player_leave`
Triggered when a player leaves a game
```json
{
  "event": "player_leave",
  "data": {
    "player_id": "550e8400-e29b-41d4-a716-446655440002",
    "username": "player1",
    "player_count": 2
  }
}
```

#### `game_update`
Triggered when game state changes
```json
{
  "event": "game_update",
  "data": {
    "level": 5,
    "score": 1250,
    "time_remaining": 300
  }
}
```

## 📊 Game Events

### Send Game Event
```http
POST /api/games/{game_id}/events
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "event_type": "player_move",
  "data": {
    "player_id": "550e8400-e29b-41d4-a716-446655440002",
    "position": {"x": 100, "y": 200},
    "direction": "right"
  }
}
```

**Response:**
```json
{
  "event_id": "550e8400-e29b-41d4-a716-446655440005",
  "timestamp": "2024-01-01T00:00:00Z",
  "processed": true
}
```

### Get Game Events
```http
GET /api/games/{game_id}/events?limit=50&offset=0
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `event_type`: Filter by event type
- `limit`: Number of events to return (default: 50, max: 200)
- `offset`: Number of events to skip (default: 0)

## 🚀 HTTP/2 Features

### Server Push
The server can push game updates to clients using HTTP/2 Server Push:

```http
HTTP/2 200 OK
content-type: application/json
link: </api/games/{game_id}/updates>; rel=preload

{
  "game_id": "550e8400-e29b-41d4-a716-446655440001",
  "status": "active"
}
```

### Multiplexing
Multiple requests can be sent concurrently over a single connection:

```typescript
// Frontend example
const promises = [
  fetch('/api/games/1'),
  fetch('/api/games/1/players'),
  fetch('/api/games/1/events')
];

const [game, players, events] = await Promise.all(promises);
```

## 🔒 Security

### JWT Token Format
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload:**
```json
{
  "sub": "550e8400-e29b-41d4-a716-446655440002",
  "exp": 1704153600,
  "iat": 1704067200
}
```

### Webhook Signature Verification
```typescript
import crypto from 'crypto';

function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = 'sha256=' + 
    crypto.createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

## 📝 Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "max_players",
        "message": "Must be between 2 and 8"
      }
    ]
  },
  "timestamp": "2024-01-01T00:00:00Z",
  "request_id": "req_123456"
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Input validation failed |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource conflict |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

## 📊 Rate Limiting

### Rate Limit Headers
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1704153600
```

### Limits by Endpoint

| Endpoint | Limit | Window |
|-----------|-------|---------|
| Authentication | 5 requests | 1 minute |
| Game Creation | 10 requests | 1 hour |
| Game Updates | 100 requests | 1 minute |
| Webhook Registration | 20 requests | 1 hour |

## 🔍 Health Check

### Server Health
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "version": "1.0.0",
  "uptime": 3600,
  "database": "connected",
  "redis": "connected"
}
```

### Game Server Health
```http
GET /api/health/games
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "active_games": 15,
  "total_players": 67,
  "server_load": 0.45,
  "memory_usage": "256MB",
  "cpu_usage": "23%"
}
```

---

*For implementation examples and SDKs, see the [Development Guide](../development/README.md).*
