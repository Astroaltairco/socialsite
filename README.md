# Social Staking Platform

A modern web application for social token staking and creator engagement.

## Features

- **Social Staking**: Stake SOCIAL tokens on your favorite creators
- **Creator Discovery**: Browse and search through creator profiles
- **Profile Management**: Pin your favorite creators and track their performance
- **Social Integration**: Direct links to creators' Farcaster and X profiles
- **Portfolio Management**: Track your staking positions and rewards
- **Real-time Activity**: Stay updated with live staking events
- **Beautiful UI**: Modern design with smooth animations and transitions

## Key Components

- **Profiles Page**: Discover and manage creator profiles
  - Search and filter creators
  - Pin favorite creators
  - View social media links
  - Track staking amounts
  - Beautiful hover animations
  - Fallback avatars

- **Staking Interface**: Engage with creators
  - Featured creators section
  - Staking functionality
  - Real-time updates
  - Performance tracking

- **Portfolio Management**: Track your investments
  - Active stakes overview
  - Historical performance
  - Reward calculations
  - Transaction history

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn 3+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/social_staking.git
cd social_staking
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

The project is organized as a monorepo with the following packages:

- `webapp`: Main web application (Vite + React)
- `landing`: Marketing website (Next.js)

For detailed structure information, see [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).

## Development

### Commands

- `yarn dev`: Start development servers
- `yarn build`: Build all packages
- `yarn test`: Run tests
- `yarn lint`: Run linting
- `yarn format`: Format code

### Technology Stack

- **Frontend**: React, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: React Context, Local Storage
- **Build Tools**: Turborepo, TypeScript
- **Testing**: Vitest
- **Code Quality**: ESLint, Prettier

## Recent Updates

- Added comprehensive Profiles page with creator discovery
- Implemented pin/favorite system for creators
- Added social media integration (Farcaster, X)
- Enhanced UI animations and transitions
- Improved performance and mobile responsiveness
- Added comprehensive error handling
- Updated navigation with "Your Stakes" section

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors
- Inspired by modern social platforms
- Built with ❤️ for the creator economy
  