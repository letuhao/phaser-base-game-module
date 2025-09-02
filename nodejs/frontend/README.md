# 🎮 Phaser Base Game Module - Frontend

A modular Phaser 4.0 game development framework with TypeScript, featuring a complete unit system, game object management, and responsive design capabilities.

## 🚀 Quick Start

### Main Project
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### 🎰 Lucky Wheel Demo
For a quick demo and testing, check out the isolated Lucky Wheel game:

```bash
# Navigate to demo
cd demo

# Install demo dependencies
npm install

# Start demo development server
npm run dev
# Opens at: http://localhost:3001

# Build demo
npm run build

# Preview demo
npm run preview
# Opens at: http://localhost:4173
```

## 📁 Project Structure

```
frontend/
├── src/                    # Main source code
│   ├── unit/              # Unit system (size, position, scale)
│   ├── game-object/       # Game object management
│   ├── scene/             # Scene management
│   ├── layout/            # Layout and styling
│   └── core/              # Core utilities
├── demo/                  # 🎰 Lucky Wheel Demo
│   ├── src/main.ts        # Self-contained demo game
│   ├── package.json       # Demo dependencies
│   └── README.md          # Demo documentation
├── package.json           # Main project dependencies
└── README.md              # This file
```

## 🎯 Features

### Core Systems
- **Unit System**: Flexible size, position, and scale management
- **Game Object Management**: Container-based object hierarchy
- **Scene Management**: Dynamic scene loading and transitions
- **Layout System**: Responsive design with breakpoints
- **Theme System**: Dynamic theming and styling

### Demo Game
- **Lucky Wheel**: Interactive spinning wheel game
- **Phaser 4.0**: Latest Phaser features and performance
- **TypeScript**: Full type safety
- **Responsive**: Mobile and desktop support

## 🛠️ Development

### Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start main project development server |
| `npm run build` | Build main project |
| `npm run test` | Run test suite |
| `npm run demo` | Start demo development server |
| `npm run demo:build` | Build demo |
| `npm run demo:preview` | Preview demo build |

### Technology Stack
- **Phaser**: `^4.0.0-rc.5` - Game engine
- **TypeScript**: `^5.2.0` - Type safety
- **Vite**: `^5.0.0` - Build tool
- **Jest**: `^29.7.0` - Testing framework

## 📚 Documentation

- **[Demo README](./demo/README.md)** - Lucky Wheel demo documentation
- **[Unit System](./src/unit/docs/README.md)** - Unit system documentation
- **[Game Objects](./src/game-object/enums/README.md)** - Game object enums

## 🎮 Demo Game

The Lucky Wheel demo showcases:
- Phaser 4.0 integration
- Interactive game mechanics
- Responsive design
- TypeScript best practices
- Fast development workflow

**Try it now:**
```bash
cd demo && npm run dev
```

## 🏗️ Architecture

### Design Principles
- **Modular**: Each system is self-contained
- **Type-Safe**: Full TypeScript coverage
- **Responsive**: Mobile-first design
- **Extensible**: Easy to add new features
- **Testable**: Comprehensive test coverage

### Code Standards
- Interfaces for all public APIs
- Enums instead of string literals
- Constants for all magic values
- Proper error handling and logging
- SOLID principles (except demo for speed)

## 🐛 Troubleshooting

### Common Issues
1. **Demo not loading**: Ensure you're in the `demo/` folder
2. **Build errors**: Check TypeScript configuration
3. **Port conflicts**: Modify ports in config files

### Getting Help
- Check the demo README for quick examples
- Review the unit system documentation
- Run tests to verify functionality

## 📄 License

Part of the Phaser Base Game Module project.

---

**Ready to build amazing games! 🎮**
