#!/bin/bash
set -ex  # Exit on error and print each command

echo "=== Starting build process ==="

# Print debug information first
echo "=== Debug Information ==="
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la
echo "Parent directory contents:"
ls -la ..

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "Error: package.json not found"
  pwd
  exit 1
fi

# Print package.json content
echo "=== package.json content ==="
cat package.json

# Clean install with more verbosity
echo "=== Installing dependencies ==="
echo "Cleaning previous installations..."
rm -rf node_modules
rm -rf .next
echo "Running npm install..."
npm install --verbose

# Build with additional information
echo "=== Building Next.js application ==="
echo "Checking Next.js version:"
npm list next
echo "Starting build..."
npm run build --verbose

# Verify output with more detail
echo "=== Verifying build output ==="
if [ ! -d ".next" ]; then
  echo "Error: .next directory not found"
  echo "Current directory contents:"
  ls -la
  exit 1
fi

echo "=== Build completed successfully ==="
echo "Final directory structure:"
ls -la
ls -la .next 