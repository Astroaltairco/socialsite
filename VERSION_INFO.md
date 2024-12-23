# Version Information & Technical Notes

## Core Package Versions

### Package Managers & Build Tools
- **Yarn**: 4.5.3
  - Note: Using modern Yarn with PnP (Plug'n'Play)
  - Some peer dependency warnings are expected, especially with `recharts`
  - IMPORTANT: Use ONLY Yarn commands (`yarn dev`, `yarn install`, etc.) - do not mix with npm
  - Root package.json specifies: `"packageManager": "yarn@4.5.3"`
  - Common commands:
    ```bash
    # Install dependencies
    yarn install

    # Start development servers
    yarn dev

    # Clean project
    yarn clean

    # Build project
    yarn build

    # Run tests
    yarn test
    ```
  - Each package has its own clean script to remove:
    - node_modules
    - .next or dist
    - .turbo
- **Turbo**: 1.10.16
  - Uses `pipeline` instead of `tasks` in turbo.json
  - Requires careful configuration for dev server persistence
  - Manages concurrent development servers:
    - Landing: http://localhost:3001
    - Webapp: http://localhost:3002

### Frontend Frameworks
- **React**: 18.2.0
- **React DOM**: 18.2.0
- **Next.js**: 14.2.21 (landing)
- **Vite**: 5.4.11 (webapp)

### Styling & CSS
- **Tailwind CSS**: 3.4.17
  - Standardized across all packages
  - Previously had version mismatches (3.4.0, 3.3.6)
- **PostCSS**: 8.4.49
  - Standardized across packages
  - Required for proper Tailwind processing
- **Autoprefixer**: 10.4.20
  - Standardized across packages

### Animation & UI
- **Framer Motion**: 10.16.16
- **@headlessui/react**: 1.7.17
- **@heroicons/react**: 2.0.18

### Type Checking & Development
- **TypeScript**: 5.2.2 (webapp), 5.3.3 (landing)
- **ESLint**: 8.55.0 (webapp), 8.56.0 (landing)

## Important Dependencies by Package

### Landing Package (@social-staking/landing)
```json
{
  "dependencies": {
    "next": "14.2.21",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "framer-motion": "10.16.16"
  },
  "devDependencies": {
    "tailwindcss": "3.4.17",
    "postcss": "8.4.49",
    "autoprefixer": "10.4.20"
  }
}
```

### Webapp Package (@social-staking/webapp)
```json
{
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "recharts": "2.10.3",
    "prop-types": "15.8.1"
  },
  "devDependencies": {
    "tailwindcss": "3.4.17",
    "postcss": "8.4.49",
    "autoprefixer": "10.4.20",
    "vite": "5.4.11"
  }
}
```

## Known Issues & Learnings

### Package Manager (Yarn)
1. Peer Dependency Warnings:
   - `recharts` requires `prop-types` as peer dependency
   - Solution: Added `prop-types` to webapp package
   - Warning can be safely ignored after adding the dependency

### Development Servers
1. Port Conflicts:
   - Landing runs on port 3001
   - Webapp runs on port 3002
   - Use `lsof -ti:3001,3002 | xargs kill -9` to clear ports

2. Server Persistence:
   - Both servers should be started together using `yarn dev`
   - Individual starts may cause port conflicts
   - Turbo manages concurrent development properly

### CSS Processing
1. Version Alignment:
   - All CSS-related packages (Tailwind, PostCSS, Autoprefixer) should be on same version
   - Mismatched versions can cause inconsistent styling
   - Use root package.json versions as source of truth

2. VSCode Configuration:
   - Disable CSS validation to prevent unknown @tailwind rule warnings
   - Added proper language support for TypeScript/React files
   - Configured for better Tailwind class suggestions

3. PostCSS Setup:
   - Uses `tailwindcss/nesting` for proper CSS nesting
   - Configured `postcss-preset-env` to avoid nesting conflicts
   - Order of plugins matters: nesting -> tailwind -> autoprefixer -> preset-env

### Build Configuration
1. Turbo Configuration:
   - Uses `pipeline` key in turbo.json
   - Dev tasks should be marked as `persistent: true`
   - Cache should be disabled for dev tasks

2. Next.js Configuration:
   - Uses app router
   - Requires specific port configuration
   - Has deprecation warning for `punycode` module (can be ignored)

### Type System
1. TypeScript Configurations:
   - Different versions between packages (5.2.2 vs 5.3.3)
   - Both versions are compatible with current setup
   - Consider aligning in future updates

## Development Workflow Notes

1. Always run `yarn install` after dependency changes
2. Use `yarn dev` to start both servers concurrently
3. Watch for peer dependency warnings during installation
4. Keep CSS processing packages in sync across all packages
5. Monitor port usage for development servers

## Future Considerations

1. Align TypeScript versions across packages
2. Monitor Yarn 4.x compatibility with all packages
3. Consider upgrading Vite when 5.5 is released
4. Keep track of Next.js updates for app router improvements