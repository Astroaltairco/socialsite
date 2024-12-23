#!/bin/bash
set -e  # Exit on error

echo "Starting build process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "Error: package.json not found"
  exit 1
fi

# Debug information
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la
echo "Environment variables:"
env | sort
echo "npm configuration:"
npm config list

# Clean install
echo "Installing dependencies..."
rm -rf node_modules
rm -rf .next
npm ci

# Build
echo "Building Next.js application..."
npm run build

# Verify output
if [ ! -d ".next" ]; then
  echo "Error: Build output not found"
  exit 1
fi

echo "Build completed successfully" 