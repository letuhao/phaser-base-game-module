# Phaser Minigame Backend

A lightweight Node.js backend server designed specifically for Phaser minigames with comprehensive logging capabilities.

## 🚀 Features

- **Fastify-based**: High-performance HTTP server
- **Comprehensive Logging**: Receive and store frontend logs for analysis
- **Minigame Support**: Ready for fortune wheel, loot box, puzzle games, etc.
- **API Documentation**: Built-in Swagger/OpenAPI docs
- **Security**: CORS, rate limiting, and security headers
- **Health Checks**: Kubernetes-ready health endpoints
- **File-based Log Storage**: Organized log files for later analysis

## 🏗️ Architecture

```
src/
├── controllers/          # Business logic controllers
│   └── loggingController.js  # Handles frontend log reception
├── middleware/           # Request/response middleware
├── routes/               # API route definitions
├── services/             # Business services (future)
├── utils/                # Utility functions
│   └── logger.js         # Winston-based logging
├── config/               # Configuration management
└── server.js             # Main server entry point
```

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🛠️ Installation

1. **Clone and navigate to backend directory:**
   ```bash
   cd nodejs/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 🌐 API Endpoints

### Logging Endpoints

- `POST /api/logs/log` - Receive single log entry
- `POST /api/logs/batch` - Receive batch logs
- `POST /api/logs/game-event` - Receive game events
- `GET /api/logs/stats` - Get logging statistics
- `POST /api/logs/flush` - Manually flush log buffer
- `DELETE /api/logs/buffer` - Clear log buffer
- `GET /api/logs/health` - Logging service health check

### Game Endpoints

- `GET /api/games` - List available minigames
- `GET /api/games/:id` - Get specific game details
- `POST /api/games/:id/play` - Start playing a game

### Health Endpoints

- `GET /api/health` - Basic health check
- `GET /api/health/ready` - Readiness check
- `GET /api/health/live` - Liveness check

### Documentation

- `GET /docs` - Swagger API documentation

## 📊 Logging System

The backend receives logs from the frontend and stores them in organized files:

### Log Storage Structure

```
logs/
├── frontend/
│   ├── frontend-logs-2024-01-15.jsonl    # Daily log files
│   ├── game-events-2024-01-15.jsonl      # Game event files
│   └── ...
├── application-2024-01-15.log            # Backend application logs
└── error-2024-01-15.log                  # Backend error logs
```

### Log Format

Logs are stored in JSONL format (one JSON object per line) for easy parsing and analysis:

```json
{
  "id": "log_uuid",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "level": "ERROR",
  "objectName": "Game",
  "message": "Failed to load asset",
  "data": { "assetId": "player-sprite" },
  "source": "frontend",
  "ip": "127.0.0.1",
  "userAgent": "Mozilla/5.0...",
  "sessionId": "session_123"
}
```

### Buffer Management

- **Automatic Flushing**: Logs are flushed every 5 seconds
- **Buffer Overflow Protection**: Automatic flush when buffer reaches 100 logs
- **Manual Control**: Endpoints for manual flush and buffer clearing

## 🔧 Configuration

### Environment Variables

```bash
# Server
PORT=3001
HOST=0.0.0.0
NODE_ENV=development

# CORS
ALLOWED_ORIGINS=http://localhost:3000

# Logging
LOG_LEVEL=info
LOG_BUFFER_SIZE=100
LOG_FLUSH_INTERVAL=5000

# Rate Limiting
RATE_LIMIT_MAX=1000
RATE_LIMIT_WINDOW=1 minute
```

## 📈 Monitoring & Analysis

### Real-time Statistics

- Buffer size and processing status
- File statistics (count, size)
- Log processing metrics

### Log Analysis

Logs are stored in structured format for easy analysis:

- **Performance Analysis**: Track FPS, memory usage, load times
- **Error Tracking**: Monitor error rates and patterns
- **User Behavior**: Analyze game events and player actions
- **Debugging**: Full stack traces and context information

### Analysis Tools

You can use various tools to analyze the JSONL log files:

- **jq**: Command-line JSON processor
- **Python pandas**: Data analysis and visualization
- **ELK Stack**: Elasticsearch, Logstash, Kibana
- **Custom scripts**: Parse and analyze specific metrics

## 🚀 Development

### Scripts

```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run build        # Build TypeScript (if using)
npm test             # Run tests
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

### Adding New Minigames

1. **Create game logic** in `src/services/`
2. **Add routes** in `src/routes/games.js`
3. **Update game list** in the games endpoint
4. **Add game-specific logging** as needed

## 🔒 Security Features

- **CORS Protection**: Configurable allowed origins
- **Rate Limiting**: Prevent abuse and DDoS
- **Security Headers**: Helmet.js for security headers
- **Input Validation**: JSON schema validation
- **Error Handling**: Secure error responses

## 📚 API Documentation

The server includes built-in Swagger documentation at `/docs`:

- Interactive API explorer
- Request/response schemas
- Example requests
- Response codes and formats

## 🐳 Docker Support

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 🔮 Future Enhancements

- **Database Integration**: PostgreSQL/MySQL for persistent data
- **Redis Caching**: Session and game state caching
- **WebSocket Support**: Real-time game updates
- **Authentication**: JWT-based user management
- **Analytics Dashboard**: Real-time metrics visualization
- **Log Aggregation**: Centralized log management
- **Game State Persistence**: Save/load game progress

## 🤝 Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Ensure all tests pass

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Check the API documentation at `/docs`
- Review the logs in the `logs/` directory
- Check the health endpoints for service status
