# Deployment Configuration

## Current Setup

### Repository Structure
- Monorepo using npm workspaces
- Main repository: `saskasocial/socialsite`
- Contains two packages:
  1. `packages/landing` (Next.js landing page)
  2. `packages/webapp` (Vite-based main application)

### GitHub Configuration
- Repository hosted at `github.com:saskasocial/socialsite.git`
- Using SSH authentication with custom key for `saskasocial` account
- Main branch: `main`
- Git LFS enabled for handling large files (e.g., GIFs > 50MB)

### Vercel Configuration
- Project name: "landing"
- Connected to GitHub repository
- Auto-deployments enabled on push to `main` branch
- Build settings in `vercel.json`:
  ```json
  {
    "version": 2,
    "builds": [
      {
        "src": "packages/landing/package.json",
        "use": "@vercel/next",
        "config": {
          "rootDirectory": "packages/landing",
          "projectSettings": {
            "framework": "nextjs",
            "buildCommand": "npm run build",
            "outputDirectory": ".next"
          }
        }
      }
    ],
    "rewrites": [
      { "source": "/(.*)", "destination": "/" }
    ]
  }
  ```

### Package Configuration
- Landing package (`packages/landing/package.json`):
  - Name: `@social-staking/landing`
  - Using Next.js 14.0.4
  - Custom port (3001) for development

## Deployment Process

1. **Code Push**
   - Developer pushes to `main` branch
   - GitHub receives the code

2. **Vercel Integration**
   - Vercel detects push to `main`
   - Triggers automatic deployment
   - Uses configuration from `vercel.json`

3. **Build Process**
   - Runs in `packages/landing` directory
   - Executes `npm install`
   - Followed by `npm run build`
   - Outputs to `.next` directory

4. **Deployment**
   - Vercel serves the built files
   - Updates DNS for the domain
   - Maintains deployment history

## Current Challenges

1. **Monorepo Complexity**
   - Vercel needs special configuration to handle monorepo
   - Build process must be independent of root workspace
   - Dependencies must be available in landing package

2. **Routing Issues**
   - 404 errors due to routing misconfiguration
   - Solution: Updated routing rules in `vercel.json`

3. **Dependency Management**
   - Transitioned from Yarn to npm
   - Ensures all necessary packages are available

## Future Considerations

1. **Potential Improvements**
   - Consider splitting into separate repositories
   - Implement staging environment
   - Add build caching

2. **Monitoring Needs**
   - Add error tracking
   - Implement performance monitoring
   - Set up deployment notifications

3. **Security**
   - Regular dependency updates
   - Environment variable management
   - Access control review

## Troubleshooting

If deployment fails:
1. Check Vercel build logs
2. Verify package dependencies
3. Ensure build commands are correct
4. Check for routing-related issues
5. Verify GitHub permissions

## Environment Variables
Required for production:
- None currently set (add as needed)

## Domains
- Production: landing-[hash]-saska-socials-projects.vercel.app
- Custom domain: staking.socialdao.ai 