# Storybook Deployment with gh-pages

This document explains how to use gh-pages to publish branch-specific static Storybook builds.

## Overview

The project uses the `gh-pages` npm package to deploy Storybook builds to GitHub Pages, creating branch-specific deployments that allow teams to preview documentation for different branches.

## Setup Components

### 1. Dependencies

The gh-pages functionality is configured in `/apps/docs/package.json`:

```json
{
  "devDependencies": {
    "gh-pages": "latest"
  },
  "scripts": {
    "build": "node scripts/build.js",
    "publish": "node scripts/publish.js"
  }
}
```

### 2. Build Script (`/apps/docs/scripts/build.js`)

Builds the Storybook static files:

```javascript
const buildProcess = spawn('storybook', ['build', '-o', 'dist/default', '--debug', '--loglevel', 'verbose'], {
    stdio: 'inherit',
    shell: true
});
```

- Outputs to `dist/default` directory
- Uses verbose logging for debugging

### 3. Publish Script (`/apps/docs/scripts/publish.js`)

Handles the gh-pages deployment with branch-specific logic:

#### Key Features:

**Branch Detection:**
- Automatically detects current branch name
- Normalizes branch names (replaces `/` with `-`)
- Uses `BRANCH_NAME` environment variable if available

**Branch-Specific Deployment:**
```javascript
const config = {
    repo: 'git@github.com:your-org/your-repo.git',
    dest: `${branchName}`  // Each branch gets its own folder
};
```

**Cleanup for Develop Branch:**
- When deploying from `develop` branch, automatically cleans up folders for deleted branches
- Compares active branches with deployed folders
- Removes orphaned deployment folders

**Deployment URL:**
```
https://your-org.github.io/your-repo/${branchName}
```

## CI/CD Integration

### CI/CD Pipeline

The deployment can be automated through your CI/CD system:

```bash
# Example CI script
cd apps/docs
USERNAME=$CI_USER EMAIL=$CI_EMAIL BRANCH_NAME=$CI_BRANCH node scripts/publish.js
```

**Environment Variables:**
- `USERNAME`: Service account username
- `EMAIL`: Service account email
- `BRANCH_NAME`: Current branch name
- `CHANGE_BRANCH`: PR branch name (for pull requests)

## Branch-Specific Deployment Strategy

### Deployment Structure
```
gh-pages branch:
├── main/           # Main branch deployment
├── develop/        # Develop branch deployment
├── feature-xyz/    # Feature branch deployment
├── PR-123/         # Pull request deployment
└── ...
```

### Branch Name Normalization
- Forward slashes (`/`) are replaced with hyphens (`-`)
- Example: `feature/new-component` → `feature-new-component`

### Automatic Cleanup
- Runs only on `develop` branch deployments
- Fetches list of active branches from remote repository
- Removes deployment folders for deleted branches
- Commits cleanup changes to gh-pages branch

## Usage

### Manual Deployment
```bash
# From root
yarn deploy-storybook

# Or from apps/docs
cd apps/docs
yarn build
yarn publish
```

### Automatic Deployment
- Triggered automatically on every CI build
- Deploys to branch-specific URL
- Available immediately after successful deployment

### Accessing Deployments
- **Main branch:** `https://your-org.github.io/your-repo/main`
- **Develop branch:** `https://your-org.github.io/your-repo/develop`
- **Feature branch:** `https://your-org.github.io/your-repo/feature-name`
- **Pull request:** `https://your-org.github.io/your-repo/PR-123`

## Configuration Details

### Repository Configuration
- **Repository:** Auto-detected from git remote
- **Target Branch:** `gh-pages`
- **Source Directory:** `dist/default`

### Authentication
- Uses SSH key authentication via CI service account
- Service account configured through CI credentials
- Requires write access to repository

## Troubleshooting

### Common Issues

1. **Deployment Fails:**
   - Check CI credentials for service account
   - Verify SSH key access to repository

2. **Branch Name Issues:**
   - Branch names with special characters are normalized
   - Check the console output for the actual deployment path

3. **Cleanup Not Working:**
   - Cleanup only runs on `develop` branch
   - Requires access to list remote branches

### Debugging
- Build process uses verbose logging
- Check CI console output for deployment URLs
- Verify gh-pages branch content in repository

## Security Considerations

- Uses service account for deployments
- SSH key authentication
- Branch-specific isolation
- Automatic cleanup prevents accumulation of stale deployments
