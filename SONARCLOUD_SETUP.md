# SonarCloud Setup Guide

## Quick Start

### 1. SonarCloud Account Setup
1. Go to https://sonarcloud.io
2. Sign in with GitHub/Bitbucket/GitLab
3. Create organization or use existing
4. Import your repository

### 2. Configure Project
1. Update `sonar-project.properties`:
   - Replace `YOUR_SONARCLOUD_ORG` with your organization key
   - Replace `YOUR_ORG_shopkit-official` with your project key
2. Generate token: Account → Security → Generate Token
3. Set environment variable: `export SONAR_TOKEN=your_token`

### 3. Run Analysis

```bash
# Install scanner globally
npm install -g sonarqube-scanner

# Run analysis
yarn sonar

# Or use script
chmod +x sonar-scanner.sh
./sonar-scanner.sh
```

## Configuration

- **sonar-project.properties**: Main configuration
- Coverage path: `packages/ui-core/coverage/lcov.info`
- Exclusions: node_modules, build artifacts, tests

## View Results

Visit: https://sonarcloud.io/organizations/YOUR_ORG/projects
