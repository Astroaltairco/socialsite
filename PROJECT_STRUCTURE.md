# Project Structure

## Root Directory
- `package.json` - Root package configuration for the monorepo
- `turbo.json` - Turborepo configuration for managing the monorepo
- `tsconfig.json` - Base TypeScript configuration
- `.yarnrc.yml` - Yarn Berry configuration
- `.gitignore` - Git ignore rules
- `.gitattributes` - Git attributes configuration
- `CHANGELOG.md` - Project changelog
- `README.md` - Project documentation
- `PROJECT_STRUCTURE.md` - This file, documenting the project structure

## Web Application Package
- `/packages/webapp/` - Main web application
  - `package.json` - Web app dependencies and scripts
  - `vite.config.ts` - Vite configuration
  - `tsconfig.json` - TypeScript configuration for web app
  - `tsconfig.node.json` - TypeScript configuration for Vite
  - `tailwind.config.js` - Tailwind CSS configuration
  - `postcss.config.js` - PostCSS configuration
  - `/src/` - Source code
    - `main.tsx` - Application entry point
    - `App.tsx` - Root React component with routing
    - `index.css` - Global styles
    - `/components/` - React components
      - `CreatorsTable.tsx` - Sortable table of creators
      - `FeaturedCreatorCard.tsx` - Featured creator display
      - `RecentActivity.tsx` - Activity feed component
    - `/hooks/` - Custom React hooks
      - `useLocalStorage.ts` - Local storage state management
    - `/layouts/` - Layout components
      - `AppLayout.tsx` - Main application layout with navigation
    - `/pages/` - Application pages
      - `SocialStaking.tsx` - Main staking interface
      - `Portfolio.tsx` - User portfolio overview
      - `Rewards.tsx` - Staking rewards page
      - `Profiles.tsx` - Creator profiles and discovery
    - `/utils/` - Utility functions
      - `cn.ts` - Class name utility

## Component Features

### Profiles Page
- Grid layout of creator profiles with:
  - Profile cards with avatar and bio
  - Social media links (Farcaster, X)
  - Pin/favorite functionality
  - Search and filtering
  - Hover animations
  - Fallback avatars
  - Total staked amount display

### Social Staking Page
- Featured Creators section with:
  - Profile cards with social links
  - Engagement metrics
  - Staking statistics
  - Hover animations
- Recent Activity feed with:
  - Scrollable interface
  - Real-time updates
  - Transaction history
- Creator table with:
  - Sorting functionality
  - Search capability
  - Filtering options

### Portfolio Page
- Portfolio overview
- Active stakes tracking
- Performance metrics
- Historical data

### Rewards Page
- Rewards tracking
- APY calculations
- Distribution history
- Upcoming rewards

## Navigation and Layout
- Sidebar navigation with:
  - Main menu items
  - Your Stakes section
  - Pinned profiles
  - Active state indicators
- Responsive layout system
- Dark mode support

## Styling and Animations
- Tailwind CSS for styling
- Framer Motion for animations
- GPU acceleration for performance
- Gradient effects and transitions
- Responsive design patterns
- Custom animations for:
  - Card hover effects
  - Zoom transitions
  - Glow effects
  - Social media interactions

## State Management
- React Context for global state
- Local Storage for persistence
- Custom hooks for reusable logic
- Optimized re-rendering

## Current Status
- Social staking interface complete
- Portfolio tracking implemented
- Rewards system integrated
- Activity feed functional
- Creator profiles with social links
- Performance optimizations applied
- Mobile responsiveness improved
- Profile discovery and management added

## Next Steps
- [ ] Implement wallet integration
- [ ] Add real-time staking updates
- [ ] Enhance social features
- [ ] Improve mobile experience
- [ ] Add more analytics
- [ ] Implement notifications system
- [ ] Add user preferences
- [ ] Enhance security features
- [ ] Expand profile management features
- [ ] Add profile analytics