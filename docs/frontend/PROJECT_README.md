# Phaser Game Frontend

A Vite + Phaser 3.9 game frontend project.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (LTS)
- npm (comes with Node.js)

### Running the Project

#### Option 1: Use Batch Files (Windows)
1. **Install dependencies**: Double-click `install.bat`
2. **Run development server**: Double-click `run-dev.bat`
3. **Build for production**: Double-click `build.bat`
4. **Preview production build**: Double-click `preview.bat`

#### Option 2: Use Command Line
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── main.ts              # Entry point
├── game/
│   ├── Game.ts         # Main game class
│   └── scenes/
│       └── MainScene.ts # Main game scene
```

## 🎮 Game Features

- **800x600 game canvas**
- **Responsive scaling** - fits any screen size
- **Physics engine** - Arcade physics enabled
- **Interactive elements** - click to restart scene
- **Asset loading** - loads sample images from Phaser labs

## 🔧 Development

- **Hot reload** - changes reflect immediately
- **TypeScript** - full type safety
- **ESLint** - code quality enforcement
- **Source maps** - easy debugging

## 📦 Build Output

After building, the `dist/` folder contains:
- Optimized JavaScript files
- Minified code
- Asset files
- Source maps for debugging

## 🌐 Development Server

- **URL**: http://localhost:3000
- **Auto-open**: Browser opens automatically
- **Hot reload**: Changes reflect immediately
- **Network access**: Available on local network

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## 🎯 Next Steps

1. **Add your game assets** to `src/assets/`
2. **Create new scenes** in `src/game/scenes/`
3. **Implement game logic** in scene classes
4. **Add sprites and animations**
5. **Implement game mechanics**

## 🔗 Useful Links

- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
