# Turborepo Setup Guide

## Overview

This project uses Turborepo to manage our monorepo structure with multiple applications and shared packages. The setup is optimized for development efficiency and build performance.

## Structure

```
social-staking/
├── apps/
│   ├── landing/        # Next.js landing page
│   └── webapp/         # Vite-based web application
├── packages/
│   ├── ui/            # Shared UI components
│   ├── utils/         # Shared utilities
│   └── config/        # Shared configurations
└── package.json       # Root package.json
```

## Configuration

### Root Configuration

#### turbo.json
```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "globalEnv": [
    "NODE_ENV",
    "NEXT_PUBLIC_*",
    "VITE_*",
    "VERCEL",
    "VERCEL_ENV"
  ],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**", "build/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

#### package.json
```json
{
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "clean": "turbo run clean",
    "format": "prettier --write \"**/*.{ts,tsx,md}\""
  },
  "devDependencies": {
    "turbo": "latest"
  }
}
```

## Development Workflow

### Installation
```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Build all packages
pnpm build
```

### Working with Apps

#### Landing Page (Next.js)
```bash
# Development
cd apps/landing
pnpm dev # Runs on port 3001

# Build
pnpm build
```

#### Web Application (Vite)
```bash
# Development
cd apps/webapp
pnpm dev # Runs on port 3000

# Build
pnpm build
```

### Working with Packages

#### UI Package
```bash
# Build
cd packages/ui
pnpm build

# Lint
pnpm lint
```

#### Utils Package
```bash
# Build
cd packages/utils
pnpm build

# Test
pnpm test
```

## Remote Caching

Turborepo supports remote caching for faster builds:

```bash
# Enable remote caching
npx turbo login
npx turbo link
```

## Environment Variables

### Global Environment Variables
- `NODE_ENV`: Environment mode
- `NEXT_PUBLIC_*`: Next.js public variables
- `VITE_*`: Vite environment variables

### App-Specific Variables
Each app has its own `.env` file:
- `apps/landing/.env`
- `apps/webapp/.env`

## Best Practices

### 1. Pipeline Organization
- Keep build dependencies accurate
- Use `dependsOn` appropriately
- Cache outputs correctly

### 2. Workspace Management
- Use workspace protocol for internal dependencies
- Keep shared dependencies at root
- Minimize cross-workspace dependencies

### 3. Performance Optimization
- Enable remote caching
- Use proper task dependencies
- Optimize build outputs

### 4. Development Experience
- Use consistent ports
- Maintain clear documentation
- Follow established patterns

## Troubleshooting

### Common Issues

1. Port Conflicts
```bash
# Kill processes on specific ports
lsof -ti:3000,3001 | xargs kill -9
```

2. Cache Issues
```bash
# Clear Turborepo cache
pnpm clean

# Clear and reinstall
pnpm clean && pnpm install
```

3. Build Failures
- Check dependency versions
- Verify environment variables
- Clear cache and rebuild

## Maintenance

### Regular Tasks
1. Update dependencies
2. Clean up cache
3. Review pipeline configuration
4. Update documentation

### Monitoring
1. Build performance
2. Cache hit rates
3. Development experience
4. Error patterns

## Future Improvements

### Short-term
- Optimize build caching
- Improve error handling
- Enhanced logging

### Long-term
- Automated testing
- Performance monitoring
- Enhanced documentation
``` 