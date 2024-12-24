const fs = require('fs');
const path = require('path');
const util = require('util');

// Enable detailed logging
process.env.DEBUG = '*';
process.env.NEXT_DEBUG = 'true';

console.log('=== Build Debug Information ===');
console.log('Current working directory:', process.cwd());
console.log('Directory contents:', fs.readdirSync('.'));

// Log environment
console.log('\n=== Environment ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('NEXT_RUNTIME:', process.env.NEXT_RUNTIME);
console.log('Memory usage:', process.memoryUsage());

// Check package.json
try {
  const pkg = require('./package.json');
  console.log('\n=== Dependencies ===');
  console.log('Dependencies:', Object.keys(pkg.dependencies));
  console.log('DevDependencies:', Object.keys(pkg.devDependencies));
} catch (err) {
  console.error('Error reading package.json:', err);
}

// Check Next.js config
try {
  const nextConfig = require('./next.config.js');
  console.log('\n=== Next.js Config ===');
  console.log(util.inspect(nextConfig, { depth: null, colors: true }));
} catch (err) {
  console.error('Error reading next.config.js:', err);
}

// Check node_modules
console.log('\n=== Node Modules ===');
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
try {
  console.log('node_modules exists:', fs.existsSync(nodeModulesPath));
  console.log('next exists:', fs.existsSync(path.join(nodeModulesPath, 'next')));
} catch (err) {
  console.error('Error checking node_modules:', err);
}

// Export debug info
module.exports = () => {
  return {
    printDebugInfo: () => {
      console.log('\n=== Runtime Debug Info ===');
      console.log('Memory usage:', process.memoryUsage());
      console.log('Working directory:', process.cwd());
    }
  };
}; 