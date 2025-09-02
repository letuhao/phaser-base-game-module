# Logging Level Guidelines

## Log Level Usage Rules

### 🚨 **ERROR** - Critical Issues
- **When to use:** System failures, exceptions, critical errors
- **Examples:** 
  - Asset loading failures
  - Scene creation errors
  - Configuration loading failures
  - Network connection failures
- **Production impact:** Always logged, never disabled

### ⚠️ **WARN** - Important Issues
- **When to use:** Recoverable problems, deprecated usage, performance issues
- **Examples:**
  - Missing optional configurations
  - Fallback mechanisms activated
  - Performance warnings
  - Deprecated API usage
- **Production impact:** Usually logged, can be disabled in high-performance scenarios

### ℹ️ **INFO** - Important Events
- **When to use:** Major system events, state changes, user actions
- **Examples:**
  - Game initialization
  - Scene transitions
  - Major configuration changes
  - User interactions
- **Production impact:** Can be disabled in production for performance

### 🔍 **DEBUG** - Development Details
- **When to use:** Detailed flow information, method entry/exit, variable states
- **Examples:**
  - Method calls with parameters
  - Configuration loading details
  - Asset loading progress
  - Object creation steps
- **Production impact:** Should be disabled in production

### 📊 **TRACE** - Verbose Details
- **When to use:** Very detailed information, loop iterations, frequent events
- **Examples:**
  - Loop iterations
  - Frequent resize events
  - Detailed object properties
  - Performance metrics
- **Production impact:** Should be disabled in production

## Current Logging Issues to Fix

### 1. **Excessive INFO Logs** (Change to DEBUG/TRACE)
- Configuration loading details → DEBUG
- Asset loading progress → DEBUG
- Object creation steps → DEBUG
- Responsive config caching → TRACE
- Method entry/exit → TRACE

### 2. **Missing ERROR Logs** (Add ERROR level)
- Game object creation failures → ERROR
- Asset loading failures → ERROR
- Configuration validation failures → ERROR

### 3. **Performance Impact**
- Large object serialization → Use TRACE
- Frequent events → Use TRACE
- Network retry attempts → Use DEBUG

## Production Logging Strategy

### Development Environment
- **Global Level:** DEBUG
- **Console:** Enabled
- **Server:** Enabled (if available)

### Production Environment
- **Global Level:** WARN
- **Console:** Disabled
- **Server:** Enabled (if available)

### Performance Critical
- **Global Level:** ERROR
- **Console:** Disabled
- **Server:** Disabled
