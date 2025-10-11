# Jenkins Setup Guide for Shopkit

## Prerequisites

1. Jenkins server with Node.js plugin installed
2. SonarQube/SonarCloud account
3. NPM account with publish access
4. (Optional) Chromatic account for Storybook visual testing

## Jenkins Configuration

### 1. Install Required Plugins

- NodeJS Plugin
- SonarQube Scanner Plugin
- Pipeline Plugin
- Git Plugin
- Credentials Plugin

### 2. Configure Credentials

Add the following credentials in Jenkins (Manage Jenkins → Credentials):

#### NPM Token
- Kind: Secret text
- ID: `npm-token`
- Secret: Your NPM authentication token
- Get from: `npm login` then check `~/.npmrc`

#### SonarQube Token
- Kind: Secret text
- ID: `sonar-token`
- Secret: Your SonarCloud token
- Get from: SonarCloud → My Account → Security → Generate Token

#### Chromatic Token (Optional)
- Kind: Secret text
- ID: `chromatic-token`
- Secret: Your Chromatic project token
- Get from: https://www.chromatic.com/
- Only needed if using Chromatic for visual regression testing

### 3. Configure SonarQube Server

1. Go to Manage Jenkins → Configure System
2. Find SonarQube servers section
3. Add SonarQube server:
   - Name: `SonarCloud`
   - Server URL: `https://sonarcloud.io`
   - Server authentication token: Select `sonar-token` credential

### 4. Configure SonarScanner

1. Go to Manage Jenkins → Global Tool Configuration
2. Find SonarQube Scanner section
3. Add SonarQube Scanner:
   - Name: `SonarScanner`
   - Install automatically: Check this
   - Version: Latest

### 5. Configure Node.js

1. Go to Manage Jenkins → Global Tool Configuration
2. Find NodeJS section
3. Add NodeJS:
   - Name: `Node 18`
   - Version: 18.x
   - Install automatically: Check this

## Pipeline Stages

### Stage 1: Build, Lint & Unit Test
- Runs in parallel for faster execution
- Build: Compiles all packages using Turborepo
- Lint: Checks code quality with ESLint
- Unit Test: Runs Jest tests with coverage

### Stage 2: SonarQube Analysis
- Performs static code analysis
- Checks code quality, security vulnerabilities
- Uploads coverage reports
- Waits for Quality Gate to pass

### Stage 3: Storybook Build
- Builds Storybook static site
- Ready to deploy to any static hosting (S3, Netlify, Vercel)
- Optional: Publish to Chromatic for visual regression testing
- Only runs on `main` branch

### Stage 4: NPM Release
- Uses Lerna for monorepo versioning
- Follows conventional commits for versioning
- Publishes packages to NPM registry
- Only runs on `main` branch

## Create Jenkins Pipeline Job

1. New Item → Pipeline
2. Name: `shopkit-release-pipeline`
3. Pipeline Definition: Pipeline script from SCM
4. SCM: Git
5. Repository URL: Your Git repository URL
6. Script Path: `Jenkinsfile`
7. Save

## Local Testing

Before pushing to Jenkins, test locally:

```bash
# Install dependencies
yarn install

# Run all checks
yarn build
yarn lint
yarn test

# Test release (dry-run)
yarn lerna version --no-push --no-git-tag-version

# Build Storybook
yarn build-storybook
```

## NPM Package Configuration

For packages you want to publish, update their `package.json`:

```json
{
  "name": "@shopkit/ui-core",
  "version": "0.1.0",
  "private": false,  // Change to false
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

## Conventional Commits

Use conventional commits for automatic versioning:

- `feat:` - New feature (minor version bump)
- `fix:` - Bug fix (patch version bump)
- `BREAKING CHANGE:` - Breaking change (major version bump)
- `chore:` - Maintenance (no version bump)
- `docs:` - Documentation (no version bump)

Example:
```bash
git commit -m "feat: add new Button component"
git commit -m "fix: resolve styling issue in Card"
```

## Troubleshooting

### Pipeline fails at SonarQube stage
- Verify SonarQube token is valid
- Check `sonar-project.properties` configuration
- Ensure coverage reports are generated

### NPM publish fails
- Verify NPM token has publish access
- Check package.json `private: false`
- Ensure package name is available on NPM

### Storybook build fails
- Check Storybook builds locally first: `yarn build-storybook`
- Ensure all stories are valid
- Check for missing dependencies

## Security Best Practices

1. Never commit tokens or credentials
2. Use Jenkins credentials store
3. Rotate tokens regularly
4. Use branch protection rules
5. Enable 2FA on NPM account
