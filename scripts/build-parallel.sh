#!/bin/bash

# Parallel build script for optimized CI/CD
# Runs TypeScript checking and ESLint in parallel, then proceeds with build

set -e

echo "INFO: Starting parallel TypeScript and ESLint checks..."

# Run TypeScript check and ESLint in parallel
bunx tsc --noEmit --incremental --tsBuildInfoFile .tsbuildinfo &
TSC_PID=$!

# Use next lint directly to avoid npm script overhead
bunx next lint &
LINT_PID=$!

# Wait for both processes to complete
wait $TSC_PID
TSC_EXIT=$?

wait $LINT_PID  
LINT_EXIT=$?

# Check if either process failed
if [ $TSC_EXIT -ne 0 ]; then
  echo "ERROR: TypeScript check failed"
  exit 1
fi

if [ $LINT_EXIT -ne 0 ]; then
  echo "ERROR: ESLint check failed" 
  exit 1
fi

echo "SUCCESS: All checks passed! Proceeding with build..."

# Proceed with TinaCMS and Next.js build
echo "INFO: Building TinaCMS..."
if tinacms build; then
  echo "SUCCESS: TinaCMS build successful"
else
  echo "WARNING: TinaCMS build failed - proceeding with Next.js build only"
  echo "   This may happen due to missing environment variables in CI/CD"
fi

echo "INFO: Building Next.js..."
next build

echo "SUCCESS: Build completed successfully!"