# Fortune Wheel Assets

## 📁 Folder Structure

```
levis2025r3wheel/
├── background/          # Background images
├── wheel/              # Wheel textures
├── ui/                 # UI elements
├── audio/              # Sound effects and music
├── sfx/                # Legacy sound effects
├── sprite/             # Legacy sprites
└── icon/               # Social media icons
```

## 🎨 Required Assets

### Background Images (3 files)
- `desktop_16x9.png` - Desktop background (1920x1080)
- `mobile_16x9.png` - Mobile background (1080x1920)
- `mobile_origin.png` - Mobile background (original ratio)

### Wheel Textures (4 files)
- `fortune_wheel_base.png` - Main wheel with segments (800x800)
- `wheel_pointer.png` - Wheel pointer/arrow (100x150)
- `wheel_center.png` - Center hub (120x120)
- `wheel_glow_effect.png` - Glow effect (900x900)

### UI Elements (3 files)
- `spin_button.png` - Main spin button
- `prize_popup_background.png` - Prize popup background (400x300)
- `close_button.png` - Close button for popups

### Audio Files (9 files)
- `wheel_spin.mp3` - Wheel spinning sound (3.5s, loop)
- `wheel_tick.mp3` - Tick when pointer hits segments (0.1s)
- `wheel_stop.mp3` - Sound when wheel stops (0.8s)
- `prize_popup.mp3` - Prize popup appears (1.2s)
- `big_win.mp3` - Big prize win sound (2.5s)
- `small_win.mp3` - Small prize win sound (1.0s)
- `button_click.mp3` - Button click (0.3s)
- `button_hover.mp3` - Button hover (0.2s)
- `background_music.mp3` - Background music (120s, loop)

## 🎯 Asset Specifications

### Image Requirements
- **Format**: PNG with transparency support
- **Quality**: High resolution for crisp display
- **Optimization**: Compressed for web delivery
- **Transparency**: Alpha channel for overlays

### Audio Requirements
- **Format**: MP3 for compatibility
- **Quality**: 128kbps minimum
- **Duration**: As specified in config
- **Volume**: Normalized levels

## 🚀 Quick Start

1. **Replace existing assets** with your custom designs
2. **Keep the same filenames** as specified above
3. **Test asset loading** using the asset system
4. **Optimize file sizes** for better performance

## 📝 Notes

- All assets are loaded through the asset system
- Fallback system handles missing assets gracefully
- Responsive loading adapts to device capabilities
- Priority system ensures critical assets load first
