# Deployment Guide

## 🚀 Production Deployment Guide

Complete guide for deploying the game project to production environments with best practices for scalability, security, and monitoring.

## 📋 Prerequisites

### Production Requirements
- **Server**: Linux-based server (Ubuntu 20.04+ recommended)
- **CPU**: 4+ cores, 2.4GHz+
- **Memory**: 8GB RAM minimum, 16GB+ recommended
- **Storage**: 50GB+ SSD storage
- **Network**: High-bandwidth connection with static IP
- **Domain**: Registered domain name with SSL certificate

### Infrastructure Options
- **Cloud Providers**: AWS, Google Cloud, Azure, DigitalOcean
- **VPS**: Linode, Vultr, Hetzner
- **Container Platforms**: Docker, Kubernetes
- **Serverless**: AWS Lambda, Google Cloud Functions (limited support)

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Load          │    │   Application   │    │   Database      │
│   Balancer      │───►│   Servers       │───►│   Cluster       │
│   (Nginx)       │    │   (Rust)        │    │   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CDN           │    │   Cache         │    │   Monitoring    │
│   (CloudFlare)  │    │   (Redis)       │    │   (Prometheus)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 Server Setup

### 1. Initial Server Configuration
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y curl wget git build-essential \
    postgresql postgresql-contrib redis-server nginx \
    certbot python3-certbot-nginx

# Create deployment user
sudo adduser deploy
sudo usermod -aG sudo deploy
sudo usermod -aG docker deploy

# Switch to deployment user
su - deploy
```

### 2. Install Rust
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env

# Install additional tools
cargo install sqlx-cli
cargo install cargo-watch
```

### 3. Install Node.js
```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install global packages
npm install -g pm2
npm install -g yarn
```

### 4. Install Docker (Optional)
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## 🗄️ Database Setup

### PostgreSQL Configuration
```bash
# Create database and user
sudo -u postgres psql

CREATE DATABASE phaser_game;
CREATE USER game_user WITH ENCRYPTED PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE phaser_game TO game_user;
ALTER USER game_user CREATEDB;
\q

# Configure PostgreSQL for production
sudo nano /etc/postgresql/14/main/postgresql.conf
```

**Production PostgreSQL Settings:**
```ini
# Memory settings
shared_buffers = 256MB
effective_cache_size = 1GB
work_mem = 4MB
maintenance_work_mem = 64MB

# Connection settings
max_connections = 100
max_worker_processes = 4
max_parallel_workers = 4

# Logging
log_statement = 'none'
log_min_duration_statement = 1000
log_checkpoints = on
log_connections = on
log_disconnections = on

# Performance
random_page_cost = 1.1
effective_io_concurrency = 200
```

**PostgreSQL Access Control:**
```bash
# Edit pg_hba.conf
sudo nano /etc/postgresql/14/main/pg_hba.conf

# Add secure connections
host    phaser_game    game_user    127.0.0.1/32    md5
host    phaser_game    game_user    ::1/128         md5
```

### Redis Configuration
```bash
# Configure Redis for production
sudo nano /etc/redis/redis.conf
```

**Production Redis Settings:**
```ini
# Memory management
maxmemory 512mb
maxmemory-policy allkeys-lru

# Persistence
save 900 1
save 300 10
save 60 10000

# Security
bind 127.0.0.1
protected-mode yes
requirepass your_redis_password

# Performance
tcp-keepalive 300
tcp-backlog 511
```

## 🚀 Application Deployment

### 1. Clone and Build Application
```bash
# Clone repository
git clone <repository-url> /opt/phaser-game
cd /opt/phaser-game

# Build backend
cd backend
cargo build --release

# Build frontend
cd ../frontend
npm install
npm run build
```

### 2. Environment Configuration
```bash
# Backend environment
sudo nano /opt/phaser-game/backend/.env
```

**Production Backend Environment:**
```env
# Server Configuration
SERVER_HOST=0.0.0.0
SERVER_PORT=8080
SERVER_WORKERS=8

# Database Configuration
DATABASE_URL=postgresql://game_user:secure_password@localhost/phaser_game
REDIS_URL=redis://:your_redis_password@localhost:6379

# JWT Configuration
JWT_SECRET=your-super-secure-production-jwt-secret
JWT_EXPIRATION=3600

# Webhook Configuration
WEBHOOK_SECRET=your-production-webhook-secret
WEBHOOK_TIMEOUT=10000

# Logging
LOG_LEVEL=info
RUST_LOG=info

# Production
ENVIRONMENT=production
DEBUG=false
```

### 3. Systemd Service Configuration
```bash
# Create systemd service file
sudo nano /etc/systemd/system/phaser-game.service
```

**Systemd Service Configuration:**
```ini
[Unit]
Description=Phaser Game Backend
After=network.target postgresql.service redis-server.service
Wants=postgresql.service redis-server.service

[Service]
Type=simple
User=deploy
Group=deploy
WorkingDirectory=/opt/phaser-game/backend
Environment=RUST_LOG=info
Environment=RUST_BACKTRACE=1
ExecStart=/opt/phaser-game/backend/target/release/phaser-game-backend
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal
SyslogIdentifier=phaser-game

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ReadWritePaths=/opt/phaser-game/backend/logs

[Install]
WantedBy=multi-user.target
```

### 4. Start Services
```bash
# Enable and start services
sudo systemctl daemon-reload
sudo systemctl enable phaser-game
sudo systemctl start phaser-game

# Check status
sudo systemctl status phaser-game
sudo journalctl -u phaser-game -f
```

## 🌐 Web Server Configuration

### Nginx Configuration
```bash
# Create Nginx site configuration
sudo nano /etc/nginx/sites-available/phaser-game
```

**Nginx Configuration:**
```nginx
# Upstream backend servers
upstream backend {
    server 127.0.0.1:8080;
    # Add more servers for load balancing
    # server 127.0.0.1:8081;
    # server 127.0.0.1:8082;
}

# Rate limiting
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=webhook:10m rate=5r/s;

# Main server block
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Frontend static files
    location / {
        root /opt/phaser-game/frontend/dist;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # API endpoints
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }
    
    # Webhook endpoints
    location /api/webhooks/ {
        limit_req zone=webhook burst=10 nodelay;
        
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 30;
    }
    
    # Health check
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

### Enable Site and SSL
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/phaser-game /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test SSL configuration
curl -I https://your-domain.com/health
```

## 🔒 Security Configuration

### Firewall Setup
```bash
# Configure UFW firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# Check status
sudo ufw status verbose
```

### Fail2ban Configuration
```bash
# Install Fail2ban
sudo apt install -y fail2ban

# Configure Fail2ban
sudo nano /etc/fail2ban/jail.local
```

**Fail2ban Configuration:**
```ini
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
logpath = /var/log/nginx/error.log
maxretry = 3

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
logpath = /var/log/nginx/error.log
maxretry = 3
```

### Security Hardening
```bash
# Disable root login
sudo passwd -l root

# Configure SSH security
sudo nano /etc/ssh/sshd_config
```

**SSH Security Settings:**
```ini
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AllowUsers deploy
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2
```

## 📊 Monitoring and Logging

### Application Logging
```bash
# Create log directory
sudo mkdir -p /var/log/phaser-game
sudo chown deploy:deploy /var/log/phaser-game

# Configure log rotation
sudo nano /etc/logrotate.d/phaser-game
```

**Log Rotation Configuration:**
```
/var/log/phaser-game/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 deploy deploy
    postrotate
        systemctl reload phaser-game
    endscript
}
```

### System Monitoring
```bash
# Install monitoring tools
sudo apt install -y htop iotop nethogs

# Install Prometheus Node Exporter
wget https://github.com/prometheus/node_exporter/releases/download/v1.6.1/node_exporter-1.6.1.linux-amd64.tar.gz
tar xvf node_exporter-1.6.1.linux-amd64.tar.gz
sudo mv node_exporter-1.6.1.linux-amd64/node_exporter /usr/local/bin/

# Create systemd service for Node Exporter
sudo nano /etc/systemd/system/node_exporter.service
```

**Node Exporter Service:**
```ini
[Unit]
Description=Prometheus Node Exporter
After=network.target

[Service]
Type=simple
User=deploy
ExecStart=/usr/local/bin/node_exporter
Restart=always

[Install]
WantedBy=multi-user.target
```

### Health Checks
```bash
# Create health check script
sudo nano /usr/local/bin/health-check.sh
```

**Health Check Script:**
```bash
#!/bin/bash

# Check backend service
if ! curl -f http://localhost:8080/health > /dev/null 2>&1; then
    echo "Backend service is down"
    exit 1
fi

# Check database connection
if ! sudo -u postgres psql -d phaser_game -c "SELECT 1" > /dev/null 2>&1; then
    echo "Database connection failed"
    exit 1
fi

# Check Redis connection
if ! redis-cli ping > /dev/null 2>&1; then
    echo "Redis connection failed"
    exit 1
fi

echo "All services are healthy"
exit 0
```

```bash
# Make executable and add to cron
sudo chmod +x /usr/local/bin/health-check.sh
sudo crontab -e

# Add health check every 5 minutes
*/5 * * * * /usr/local/bin/health-check.sh
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Rust
      uses: actions-rs/toolchain@v1
      with:
        toolchain: stable
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Build Backend
      run: |
        cd backend
        cargo build --release
    
    - name: Build Frontend
      run: |
        cd frontend
        npm ci
        npm run build
    
    - name: Deploy to Server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.KEY }}
        script: |
          cd /opt/phaser-game
          git pull origin main
          cd backend && cargo build --release
          cd ../frontend && npm ci && npm run build
          sudo systemctl restart phaser-game
          sudo systemctl reload nginx
```

### Deployment Scripts
```bash
# Create deployment script
sudo nano /usr/local/bin/deploy.sh
```

**Deployment Script:**
```bash
#!/bin/bash

set -e

echo "Starting deployment..."

# Pull latest changes
cd /opt/phaser-game
git pull origin main

# Build backend
echo "Building backend..."
cd backend
cargo build --release

# Build frontend
echo "Building frontend..."
cd ../frontend
npm ci
npm run build

# Restart services
echo "Restarting services..."
sudo systemctl restart phaser-game
sudo systemctl reload nginx

# Run health checks
echo "Running health checks..."
sleep 10
/usr/local/bin/health-check.sh

echo "Deployment completed successfully!"
```

## 📈 Performance Optimization

### Backend Optimization
```rust
// Production configuration
#[derive(Config)]
pub struct Settings {
    #[config(default = 8)]
    pub server_workers: usize,
    
    #[config(default = 1000)]
    pub max_connections: usize,
    
    #[config(default = 30)]
    pub connection_timeout: u64,
}

// Connection pooling
pub async fn create_connection_pool() -> Result<PgPool> {
    PgPoolOptions::new()
        .max_connections(100)
        .min_connections(10)
        .acquire_timeout(Duration::from_secs(30))
        .idle_timeout(Duration::from_secs(600))
        .max_lifetime(Duration::from_secs(1800))
        .connect(&database_url)
        .await
}
```

### Frontend Optimization
```typescript
// Production build configuration
export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ['phaser'],
          vendor: ['lodash', 'axios'],
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
```

### Database Optimization
```sql
-- Create indexes for performance
CREATE INDEX CONCURRENTLY idx_games_status_created ON games(status, created_at);
CREATE INDEX CONCURRENTLY idx_game_sessions_game_user ON game_sessions(game_id, user_id);
CREATE INDEX CONCURRENTLY idx_events_game_timestamp ON game_events(game_id, timestamp);

-- Partition large tables
CREATE TABLE game_events_partitioned (
    LIKE game_events INCLUDING ALL
) PARTITION BY RANGE (timestamp);

-- Create partitions for each month
CREATE TABLE game_events_2024_01 PARTITION OF game_events_partitioned
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
```

## 🚨 Backup and Recovery

### Database Backup
```bash
# Create backup script
sudo nano /usr/local/bin/backup-db.sh
```

**Database Backup Script:**
```bash
#!/bin/bash

BACKUP_DIR="/opt/backups/database"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="phaser_game_$DATE.sql"

mkdir -p $BACKUP_DIR

# Create database backup
sudo -u postgres pg_dump phaser_game > $BACKUP_DIR/$BACKUP_FILE

# Compress backup
gzip $BACKUP_DIR/$BACKUP_FILE

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete

echo "Database backup completed: $BACKUP_FILE.gz"
```

### Application Backup
```bash
# Create application backup script
sudo nano /usr/local/bin/backup-app.sh
```

**Application Backup Script:**
```bash
#!/bin/bash

BACKUP_DIR="/opt/backups/application"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="phaser_game_app_$DATE.tar.gz"

mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/$BACKUP_FILE \
    --exclude='*/target/*' \
    --exclude='*/node_modules/*' \
    --exclude='*/dist/*' \
    /opt/phaser-game

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Application backup completed: $BACKUP_FILE"
```

### Automated Backups
```bash
# Add to crontab
sudo crontab -e

# Daily database backup at 2 AM
0 2 * * * /usr/local/bin/backup-db.sh

# Weekly application backup on Sunday at 3 AM
0 3 * * 0 /usr/local/bin/backup-app.sh
```

## 🔍 Troubleshooting

### Common Issues

#### Service Won't Start
```bash
# Check service status
sudo systemctl status phaser-game

# Check logs
sudo journalctl -u phaser-game -f

# Check configuration
sudo nginx -t
```

#### Database Connection Issues
```bash
# Test database connection
sudo -u postgres psql -d phaser_game -c "SELECT 1"

# Check PostgreSQL status
sudo systemctl status postgresql

# Check connection limits
sudo -u postgres psql -c "SHOW max_connections;"
```

#### Performance Issues
```bash
# Check system resources
htop
free -h
df -h

# Check network connections
netstat -tulpn | grep :8080

# Check database performance
sudo -u postgres psql -d phaser_game -c "SELECT * FROM pg_stat_statements ORDER BY mean_time DESC LIMIT 10;"
```

### Recovery Procedures

#### Database Recovery
```bash
# Restore from backup
sudo -u postgres psql -d phaser_game < /opt/backups/database/phaser_game_20240101_120000.sql

# Point-in-time recovery (if using WAL archiving)
sudo -u postgres pg_ctl stop
sudo -u postgres pg_ctl start -D /var/lib/postgresql/14/main -X -f /var/lib/postgresql/14/main/recovery.conf
```

#### Application Recovery
```bash
# Restore application files
cd /opt
sudo rm -rf phaser-game
sudo tar -xzf /opt/backups/application/phaser_game_app_20240101_120000.tar.gz

# Restart services
sudo systemctl restart phaser-game
sudo systemctl reload nginx
```

## 📊 Monitoring Dashboard

### Prometheus Configuration
```yaml
# /etc/prometheus/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'phaser-game'
    static_configs:
      - targets: ['localhost:8080']
    metrics_path: '/metrics'
    scrape_interval: 5s

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['localhost:9100']
```

### Grafana Dashboard
```json
{
  "dashboard": {
    "title": "Phaser Game Production Metrics",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{route}}"
          }
        ]
      },
      {
        "title": "Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "95th percentile"
          }
        ]
      }
    ]
  }
}
```

---

*For more specific deployment scenarios, see the individual deployment guides for different environments.*
