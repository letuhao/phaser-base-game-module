# Contributing Guidelines

## 🤝 How to Contribute

Thank you for your interest in contributing to our game project! This document provides guidelines for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

## 📜 Code of Conduct

### Our Pledge
We are committed to making participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
Examples of behavior that contributes to creating a positive environment include:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior include:
- The use of sexualized language or imagery and unwelcome sexual attention or advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18.x or higher
- [Rust](https://rust-lang.org/) 1.70+ (stable channel)
- [Git](https://git-scm.com/) 2.30+
- [PostgreSQL](https://www.postgresql.org/) 14+ or Docker
- [Redis](https://redis.io/) 6+ or Docker

### Setup Development Environment
1. Fork the repository
2. Clone your fork locally
3. Install dependencies
4. Set up environment variables
5. Run the development servers

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/phaser-game.git
cd phaser-game

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
cargo build

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Start development servers
cargo run  # Backend
npm run dev  # Frontend
```

## 🔄 Development Workflow

### Branch Strategy
We use a simplified Git flow approach:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature development branches
- `bugfix/*` - Bug fix branches
- `hotfix/*` - Critical production fixes

### Creating a Feature Branch
```bash
# Ensure you're on develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/amazing-feature

# Make your changes and commit
git add .
git commit -m "feat: add amazing new feature"

# Push to your fork
git push origin feature/amazing-feature
```

### Commit Message Format
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(game): add multiplayer support
fix(auth): resolve JWT token validation issue
docs(api): update webhook documentation
test(backend): add integration tests for game service
refactor(frontend): optimize Phaser scene management
style(backend): format code with rustfmt
```

## 📝 Code Standards

### Rust Code Standards
- Use `rustfmt` for consistent formatting
- Use `clippy` for linting
- Follow Rust naming conventions
- Write comprehensive documentation
- Use proper error handling with `Result<T, E>`

```rust
// Good example
pub struct GameService {
    db_pool: PgPool,
    redis_client: redis::Client,
}

impl GameService {
    /// Creates a new game service instance
    pub fn new(db_pool: PgPool, redis_client: redis::Client) -> Self {
        Self {
            db_pool,
            redis_client,
        }
    }
    
    /// Creates a new game with the specified parameters
    pub async fn create_game(&self, name: String, max_players: i32) -> Result<Game> {
        // Implementation
    }
}
```

### TypeScript/JavaScript Standards
- Use ESLint and Prettier
- Follow TypeScript best practices
- Use proper type annotations
- Write JSDoc comments for public APIs
- Use async/await for asynchronous operations

```typescript
// Good example
export class GameService {
  private readonly apiClient: ApiClient
  
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient
  }
  
  /**
   * Creates a new game with the specified parameters
   * @param gameData - The game creation data
   * @returns Promise resolving to the created game
   * @throws {GameCreationError} When game creation fails
   */
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

### Database Standards
- Use SQLx for type-safe database operations
- Write clear, readable SQL queries
- Use proper indexing for performance
- Follow naming conventions consistently
- Document complex queries

```sql
-- Good example
CREATE INDEX CONCURRENTLY idx_games_status_created 
ON games(status, created_at);

-- Document complex queries
-- This query finds active games with players ready to start
SELECT 
    g.id,
    g.name,
    g.player_count,
    g.max_players,
    COUNT(gs.user_id) as ready_players
FROM games g
LEFT JOIN game_sessions gs ON g.id = gs.game_id AND gs.is_ready = true
WHERE g.status = 'waiting'
GROUP BY g.id, g.name, g.player_count, g.max_players
HAVING COUNT(gs.user_id) = g.max_players;
```

## 🧪 Testing Guidelines

### Frontend Testing
- Write unit tests for all game logic
- Use Vitest for testing framework
- Test UI components with @testing-library
- Maintain high test coverage (>80%)
- Test edge cases and error conditions

```typescript
// Good test example
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

  it('should handle player movement correctly', () => {
    const initialPosition = game.player.position
    game.movePlayer('right')
    expect(game.player.position.x).toBeGreaterThan(initialPosition.x)
  })

  it('should throw error for invalid move', () => {
    expect(() => game.movePlayer('invalid')).toThrow('Invalid direction')
  })
})
```

### Backend Testing
- Write unit tests for all services
- Use integration tests for API endpoints
- Test database operations with test database
- Mock external dependencies
- Test error conditions and edge cases

```rust
// Good test example
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

    #[tokio::test]
    async fn test_create_game_invalid_players() {
        let pool = setup_test_db().await;
        let service = GameService::new(pool);
        
        let result = service.create_game("Test Game".to_string(), 0).await;
        assert!(result.is_err());
    }
}
```

### Integration Testing
- Test complete API workflows
- Test frontend-backend integration
- Use test databases and mock services
- Test authentication and authorization
- Test error handling and edge cases

## 📚 Documentation

### Code Documentation
- Document all public APIs
- Use clear, concise descriptions
- Include usage examples
- Document error conditions
- Keep documentation up-to-date

### API Documentation
- Document all endpoints
- Include request/response examples
- Document error codes
- Keep OpenAPI/Swagger specs updated
- Include authentication requirements

### User Documentation
- Write clear setup instructions
- Include troubleshooting guides
- Provide configuration examples
- Document deployment procedures
- Keep README files updated

## 🔀 Pull Request Process

### Before Submitting
1. Ensure your code follows project standards
2. Write comprehensive tests
3. Update documentation
4. Test locally with all services
5. Check for linting errors

### Pull Request Checklist
- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
- [ ] Performance impact considered
- [ ] Security implications reviewed
- [ ] Commit messages follow convention
- [ ] Branch is up-to-date with develop

### Review Process
1. Automated checks must pass
2. At least one maintainer must approve
3. Address all review comments
4. Maintainers may request changes
5. Once approved, maintainers will merge

### After Merging
- Delete feature branch
- Update local develop branch
- Celebrate your contribution! 🎉

## 🐛 Reporting Issues

### Bug Reports
When reporting bugs, please include:

- **Description**: Clear description of the problem
- **Steps to Reproduce**: Detailed steps to reproduce
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: OS, browser, versions
- **Screenshots**: If applicable
- **Logs**: Relevant error logs

### Feature Requests
When requesting features, please include:

- **Description**: Clear description of the feature
- **Use Case**: Why this feature is needed
- **Proposed Solution**: How you think it should work
- **Alternatives**: Other solutions you've considered
- **Additional Context**: Any other relevant information

### Issue Templates
We provide issue templates for:
- Bug reports
- Feature requests
- Documentation improvements
- Security vulnerabilities

## 🏆 Recognition

### Contributors
All contributors are recognized in:
- Project README
- Release notes
- Contributor hall of fame
- GitHub contributors page

### Special Recognition
Special recognition for:
- Major feature contributions
- Bug fixes for critical issues
- Documentation improvements
- Community support
- Long-term contributions

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and discussions
- **Discord**: For real-time chat and support
- **Email**: For security issues

### Resources
- [Project Documentation](./README.md)
- [Development Guide](./development/README.md)
- [API Reference](./api/README.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## 🙏 Thank You

Thank you for contributing to our game project! Your contributions help make the project better for everyone. Whether you're fixing bugs, adding features, improving documentation, or helping other contributors, your work is appreciated.

---

*For questions about contributing, please open an issue or join our community discussions.*
