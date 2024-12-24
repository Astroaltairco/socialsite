# Workspace Structure

This monorepo is organized using a modular architecture with shared packages and applications. Here's the structure:

## Root Structure
```
social-staking/
├── apps/                # Application packages
│   ├── landing/        # Landing page (Next.js)
│   └── webapp/         # Main web application (Vite)
├── packages/           # Shared packages
│   ├── ui/            # Shared UI components
│   ├── utils/         # Shared utilities
│   └── config/        # Shared configurations
├── docs/              # Documentation
└── scripts/           # Build and utility scripts
```

## Shared Packages

### UI Package (`packages/ui/`)
Contains reusable UI components organized by category:
- Layout components (Container, Section, Card)
- Form components (Button, Input, Select)
- Navigation components (Navbar, Sidebar, Tabs)
- Data display components (Table, List, Badge)
- Feedback components (Alert, Toast, Progress)
- Animation components
- Shared hooks and utilities

### Utils Package (`packages/utils/`)
Contains shared utilities and helper functions:
- Date utilities (formatting, parsing)
- Validation utilities (schemas, validators)
- Format utilities (numbers, strings, addresses)
- Contract utilities (ABI, events, transactions)
- Storage utilities (local, session)
- API utilities (fetcher, endpoints)
- Type definitions

### Config Package (`packages/config/`)
Contains shared configuration files:
- ESLint configuration
- Tailwind CSS preset
- TypeScript configuration
- Other shared configs

## Applications

### Landing Page (`apps/landing/`)
Next.js application for the landing page:
- Static pages and marketing content
- Server-side rendered components
- SEO optimization
- Landing-specific components

### Web Application (`apps/webapp/`)
Vite-based main application:
- Social staking functionality
- User dashboard
- Token management
- Profile management

## Development

### Scripts
- Build scripts for all packages
- Development utilities
- Deployment scripts

### Configuration Files
- `turbo.json`: Turborepo configuration
- `tsconfig.json`: TypeScript configuration
- `package.json`: Root package configuration
- `.env` files: Environment variables

## Best Practices

### Code Organization
1. Keep components modular and focused
2. Use shared packages for common functionality
3. Maintain clear package boundaries
4. Follow the single responsibility principle

### Development Workflow
1. Use pnpm for package management
2. Run tests before committing
3. Follow the established Git workflow
4. Keep documentation up to date

### Style Guide
1. Use TypeScript for type safety
2. Follow ESLint rules
3. Use Prettier for code formatting
4. Follow component naming conventions 