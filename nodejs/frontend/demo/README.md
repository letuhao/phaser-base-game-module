# 🎰 Lucky Wheel Demo - Phaser 4

A fast-built lucky wheel game demo using Phaser 4.0, designed for rapid development and testing.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm

### Installation & Setup

1. **Navigate to demo folder:**
   ```bash
   cd nodejs/frontend/demo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   - Opens at: `http://localhost:3001`

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```
   - Opens at: `http://localhost:4173`

## 🎮 Game Features

- **Interactive Lucky Wheel**: 8 colorful sections with different point values
- **Smooth Animations**: Phaser 4 tweens for spinning and celebration effects
- **Responsive Design**: Adapts to different screen sizes
- **Visual Effects**: Pulsing spin button and result animations
- **Point System**: Random rewards from 50 to 1000 points

## 🏗️ Project Structure

```
demo/
├── package.json          # Demo dependencies (Phaser 4 only)
├── tsconfig.json         # TypeScript config (isolated)
├── vite.config.ts        # Vite config (demo-only)
├── index.html            # Entry point
├── README.md             # This file
└── src/
    └── main.ts           # Complete game implementation
```

## 🎯 Game Sections

| Section | Color | Points |
|---------|-------|--------|
| 1 | Red | 100 |
| 2 | Teal | 200 |
| 3 | Blue | 500 |
| 4 | Yellow | 1000 |
| 5 | Orange | 50 |
| 6 | Dark Red | 300 |
| 7 | Purple | 750 |
| 8 | Light Purple | 150 |

## 🛠️ Technical Details

### Dependencies
- **Phaser**: `^4.0.0-rc.5` - Game engine
- **TypeScript**: `^5.2.0` - Type safety
- **Vite**: `^5.0.0` - Build tool

### Key Features
- **Self-contained**: No external dependencies on main project
- **TypeScript**: Full type safety with Phaser 4 types
- **Fast builds**: Only 7 modules (vs 124 in main project)
- **Clean isolation**: Completely separate from main codebase

### Build Output
- **Development**: Hot reload with Vite dev server
- **Production**: Optimized bundle in `../dist-demo/`
- **Assets**: Automatic asset optimization and hashing

## 🎨 Customization

### Adding New Sections
Edit the `wheelSections` array in `src/main.ts`:
```typescript
this.wheelSections = [
  { color: 0xff6b6b, text: '100', value: 100 },
  { color: 0x4ecdc4, text: '200', value: 200 },
  // Add more sections here...
];
```

### Changing Colors
Use hex color values:
```typescript
{ color: 0xff6b6b, text: '100', value: 100 } // Red
{ color: 0x4ecdc4, text: '200', value: 200 } // Teal
```

### Modifying Animations
Adjust tween parameters in `spinWheel()` method:
```typescript
this.tweens.add({
  targets: this.wheel,
  rotation: this.currentRotation,
  duration: 3000,        // Spin duration (ms)
  ease: 'Cubic.easeOut', // Easing function
  // ...
});
```

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot read properties of undefined"**
   - ✅ **Fixed**: Demo is now completely isolated from main project
   - No more old source code conflicts

2. **Build errors**
   - Ensure you're in the `demo/` folder
   - Run `npm install` to install dependencies
   - Check TypeScript config excludes main `src/` folder

3. **Port conflicts**
   - Development: Change port in `vite.config.ts`
   - Preview: Use `--port` flag: `npm run preview -- --port 4174`

### Development Tips

- **Hot Reload**: Changes to `src/main.ts` automatically reload
- **Debugging**: Game instance is available as `window.game` in browser console
- **Performance**: Check browser dev tools for frame rate and memory usage

## 📝 Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build |

## 🎯 Next Steps

This demo is designed for rapid prototyping. For production use, consider:

- Adding sound effects
- Implementing user authentication
- Adding more game mechanics
- Creating a proper game state management system
- Adding unit tests

## 📄 License

Part of the Phaser Base Game Module project.

---

**Happy Spinning! 🎰**
