# Cursor IDE Rules Configuration

## Overview
This document provides Cursor IDE-compatible rules for the Phaser Base Game Module project. Copy these rules to your Cursor IDE user settings to enforce consistent coding standards.

## Cursor IDE Rules Configuration

```json
{
  "rules": [
    {
      "name": "Logger Usage Rule",
      "description": "Always use Logger instead of console for all logging operations",
      "pattern": "console\\.(log|error|warn|info|debug)",
      "replacement": "this.logger.$1",
      "severity": "error",
      "message": "Use Logger.getInstance() instead of console methods. Import Logger from '../core/Logger' and use this.logger = Logger.getInstance() in constructor."
    },
    {
      "name": "Magic Number/String Prohibition",
      "description": "Prohibit magic numbers and strings - use constants instead",
      "pattern": "\\b(\\d+)\\b",
      "severity": "warning",
      "message": "Magic numbers are forbidden. Define constants in dedicated constants folders (src/system/constants/). Use meaningful constant names like DEFAULT_SIZE, MAX_RETRIES, TIMEOUT_MS."
    },
    {
      "name": "String Literal Prohibition",
      "description": "Prohibit string literals in type definitions - use enums instead",
      "pattern": "['\"]([a-zA-Z_][a-zA-Z0-9_-]*)['\"]\\s*\\|",
      "severity": "error",
      "message": "String literals in type definitions are forbidden. Define enums in dedicated enum folders (src/system/enums/) and use them instead of string unions."
    },
    {
      "name": "Any Type Prohibition",
      "description": "Prohibit 'any' type usage - use proper interfaces instead",
      "pattern": "\\bany\\b",
      "severity": "error",
      "message": "Using 'any' type is forbidden. Define proper interfaces in dedicated interface folders (src/system/interfaces/) or use 'unknown' for truly unknown types."
    },
    {
      "name": "Enum Organization Rule",
      "description": "Enums must be defined in dedicated enum folders",
      "pattern": "export\\s+enum\\s+\\w+",
      "severity": "warning",
      "message": "Enums must be defined in dedicated enum folders (src/system/enums/). Move enum definitions to appropriate enum files and import them where needed."
    },
    {
      "name": "Interface Organization Rule",
      "description": "Interfaces must be defined in dedicated interface folders",
      "pattern": "export\\s+interface\\s+I\\w+",
      "severity": "warning",
      "message": "Interfaces must be defined in dedicated interface folders (src/system/interfaces/). Move interface definitions to appropriate interface files and import them where needed."
    },
    {
      "name": "Constants Organization Rule",
      "description": "Constants must be defined in dedicated constants folders",
      "pattern": "export\\s+const\\s+\\w+\\s*=",
      "severity": "warning",
      "message": "Constants must be defined in dedicated constants folders (src/system/constants/). Move constant definitions to appropriate constants files and import them where needed."
    },
    {
      "name": "Semicolon Requirement",
      "description": "Require semicolons at end of statements",
      "pattern": "[^;]\\s*$",
      "severity": "warning",
      "message": "Semicolons are required at the end of all statements for consistency with C# style."
    },
    {
      "name": "Type Safety Rule",
      "description": "Enforce strict type safety and avoid casting to 'any'",
      "pattern": "as\\s+any",
      "severity": "error",
      "message": "Casting to 'any' is forbidden. Use proper type guards or define appropriate interfaces instead of using 'any' casts."
    },
    {
      "name": "Enum Usage Rule",
      "description": "Use enums instead of type aliases for defining sets of values",
      "pattern": "type\\s+\\w+\\s*=\\s*['\"][^'\"]*['\"]\\s*\\|",
      "severity": "error",
      "message": "Use enums instead of type aliases for defining sets of values. Define enums in dedicated enum folders (src/system/enums/)."
    },
    {
      "name": "Container Interface Rule",
      "description": "All container UI interfaces should extend IContainer",
      "pattern": "interface\\s+I\\w*Container",
      "severity": "warning",
      "message": "All container UI interfaces should extend IContainer interface for consistency."
    },
    {
      "name": "Style Properties Rule",
      "description": "Use IStyleProperties instead of LayoutProperties for style definitions",
      "pattern": "LayoutProperties",
      "severity": "warning",
      "message": "Use IStyleProperties instead of LayoutProperties for style definitions in config files."
    },
    {
      "name": "Documentation Organization Rule",
      "description": "Documentation files must be placed in system docs folders",
      "pattern": "\\.md$",
      "severity": "info",
      "message": "Documentation files should be placed in system docs folders (src/system/docs/) for proper organization."
    },
    {
      "name": "Single Responsibility Rule",
      "description": "Enums and interfaces must have single responsibility",
      "pattern": "enum\\s+\\w+\\s*{[^}]*\\w+\\s*=\\s*['\"][^'\"]*['\"][^}]*\\w+\\s*=\\s*['\"][^'\"]*['\"][^}]*}",
      "severity": "warning",
      "message": "Enums and interfaces must have single responsibility. Split enums/interfaces that handle multiple concerns into separate, focused definitions."
    },
    {
      "name": "Duplicate Prevention Rule",
      "description": "Prevent duplicate enums and interfaces across systems",
      "pattern": "export\\s+(enum|interface)\\s+\\w+",
      "severity": "warning",
      "message": "Duplicate enums and interfaces across systems are forbidden. Use shared enums/interfaces from src/shared/ folder instead of duplicating definitions."
    }
  ],
  "filePatterns": [
    "**/*.ts",
    "**/*.tsx",
    "**/*.js",
    "**/*.jsx"
  ],
  "excludePatterns": [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/*.d.ts"
  ],
  "settings": {
    "enforceStrictMode": true,
    "requireTypeAnnotations": true,
    "preferConst": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

## How to Apply These Rules in Cursor IDE

### Method 1: User Settings (Recommended)
1. Open Cursor IDE
2. Go to Settings (Ctrl/Cmd + ,)
3. Search for "rules" or "linting"
4. Add the above JSON configuration to your user settings
5. Restart Cursor IDE

### Method 2: Workspace Settings
1. Create a `.cursor` folder in your project root
2. Create a `rules.json` file with the above configuration
3. Restart Cursor IDE

### Method 3: Extension Configuration
1. Install a rules extension in Cursor IDE
2. Configure it with the above rules
3. Enable the extension

## Rule Categories

### Critical Rules (Error Level)
- **Logger Usage**: Never use console methods
- **String Literal Prohibition**: No string literals in type definitions
- **Any Type Prohibition**: No 'any' type usage
- **Type Safety**: No casting to 'any'

### Important Rules (Warning Level)
- **Magic Number/String Prohibition**: Use constants instead
- **Enum Organization**: Enums in dedicated folders
- **Interface Organization**: Interfaces in dedicated folders
- **Constants Organization**: Constants in dedicated folders
- **Semicolon Requirement**: Require semicolons
- **Enum Usage**: Use enums instead of type aliases
- **Container Interface**: Extend IContainer
- **Style Properties**: Use IStyleProperties
- **Single Responsibility**: Single responsibility principle
- **Duplicate Prevention**: No duplicate definitions

### Informational Rules (Info Level)
- **Documentation Organization**: Proper documentation placement

## Customization

You can customize these rules by:
1. Adjusting severity levels (error, warning, info)
2. Modifying patterns for specific use cases
3. Adding new rules for project-specific requirements
4. Excluding certain file patterns

## Integration with Existing Tools

These rules work alongside:
- TypeScript compiler
- ESLint
- Prettier
- Other linting tools

## Benefits

- **Consistency**: Enforces consistent coding standards
- **Quality**: Prevents common coding mistakes
- **Maintainability**: Improves code maintainability
- **Documentation**: Ensures proper documentation organization
- **Type Safety**: Enforces strict type safety
- **Architecture**: Maintains proper system architecture

## Troubleshooting

If rules are not working:
1. Check Cursor IDE version compatibility
2. Verify rule configuration syntax
3. Restart Cursor IDE
4. Check for conflicting extensions
5. Review file pattern exclusions

## Updates

These rules should be updated when:
- New coding standards are added
- Project architecture changes
- New TypeScript features are adopted
- Team preferences evolve
