# Deployment Log

## Deep Analysis of Path Resolution Issue

### Path Structure Analysis
1. **Vercel's Path Resolution**
   ```
   /vercel/path0/packages/landing/packages/landing/out/routes-manifest.json
   ```
   - Base path: `/vercel/path0/`
   - First package path: `packages/landing/`
   - Duplicated path: `packages/landing/`
   - Output directory: `out/`
   - Target file: `routes-manifest.json`

2. **Build Process Flow**
   ```bash
   1. npm ci                                 # Root installation
   2. npm run build -w @social-staking/landing # Workspace build
   3. Next.js builds to 'out' directory      # Build output
   4. Vercel looks for output               # Path resolution
   ```

3. **Configuration Layers**
   - Vercel Configuration
   - Next.js Configuration
   - npm Workspace Configuration
   - Build Process Configuration

### Root Cause Analysis

1. **Path Duplication**
   - Vercel adds `packages/landing` prefix
   - Workspace flag adds another package path
   - Results in doubled package path

2. **Workspace Resolution**
   - npm workspace flag affects path resolution
   - Vercel's monorepo handling adds complexity
   - Path resolution happens at multiple levels

3. **Build Context**
   - Build runs in workspace context
   - Output paths relative to workspace
   - Vercel expects different path structure

## Attempted Solutions

### Attempt 12 - Output Path Alignment
- **Changes Made:**
  - Updated Next.js output configuration
  - Adjusted Vercel output directory path
  - Ensured consistent path resolution
- **Error:** Still seeing duplicated package paths
- **Analysis:** Path duplication persists despite aligned configuration

### Attempt 13 - Workspace Root Configuration (Current)
- **Changes Made:**
  - Added explicit `workspaceRoot` in Vercel config
  - Changed to direct directory navigation
  - Simplified output path resolution
  - Removed workspace flag from build command
- **Status:** In Progress
- **Reasoning:** 
  1. `workspaceRoot` tells Vercel where to start
  2. Direct `cd` avoids workspace path issues
  3. Simpler output path reduces resolution complexity

## Technical Insights
1. **Path Resolution Layers**
   - Vercel's base path: `/vercel/path0/`
   - Workspace resolution: `packages/landing`
   - Build output: `out`
   - Each layer can affect final path

2. **Monorepo Complexity**
   - Multiple package resolution mechanisms
   - Competing path resolution strategies
   - Configuration at multiple levels

3. **Build Context Impact**
   - Working directory affects path resolution
   - Output paths relative to build context
   - Need to align all path resolutions

## Next Steps if Current Attempt Fails
1. **Direct Path Strategy**
   ```bash
   # Build script approach
   cd packages/landing && \
   npm ci && \
   npm run build && \
   cp -r out/* ../../out/
   ```

2. **Custom Build Pipeline**
   - Create custom build script
   - Handle path resolution explicitly
   - Manage output copying manually

3. **Repository Split**
   - Move landing to separate repository
   - Use standard Next.js deployment
   - Eliminate monorepo complexity 