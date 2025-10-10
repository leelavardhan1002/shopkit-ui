import ghpages from 'gh-pages';
import { execSync } from 'child_process';
import process from 'process';

const branchName = process.env.BRANCH_NAME || 
                   process.env.CHANGE_BRANCH || 
                   execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

const normalizedBranch = branchName.replace(/\//g, '-');

const config = {
    repo: execSync('git config --get remote.origin.url').toString().trim(),
    dest: normalizedBranch,
    user: {
        name: process.env.USERNAME || execSync('git config user.name').toString().trim(),
        email: process.env.EMAIL || execSync('git config user.email').toString().trim()
    }
};

console.log(`Deploying ${normalizedBranch} to gh-pages...`);

ghpages.publish('dist/default', config, async (err) => {
    if (err) {
        console.error('Deployment failed:', err);
        process.exit(1);
    }
    
    console.log(`✓ Deployed to ${normalizedBranch}`);
    
    if (branchName === 'develop') {
        console.log('Running cleanup for deleted branches...');
        try {
            const remoteBranches = execSync('git ls-remote --heads origin')
                .toString()
                .split('\n')
                .filter(line => line)
                .map(line => line.split('refs/heads/')[1])
                .map(branch => branch.replace(/\//g, '-'));

            ghpages.clean();
            
            const deployedFolders = execSync('git ls-tree -d --name-only gh-pages')
                .toString()
                .split('\n')
                .filter(folder => folder);

            const foldersToRemove = deployedFolders.filter(folder => !remoteBranches.includes(folder));

            if (foldersToRemove.length > 0) {
                console.log(`Removing ${foldersToRemove.length} orphaned folders:`, foldersToRemove);
                foldersToRemove.forEach(folder => {
                    execSync(`git rm -rf ${folder}`, { cwd: ghpages.defaults.dest });
                });
                execSync('git commit -m "Cleanup deleted branches"', { cwd: ghpages.defaults.dest });
                execSync('git push', { cwd: ghpages.defaults.dest });
            }
        } catch (cleanupErr) {
            console.warn('Cleanup failed:', cleanupErr.message);
        }
    }
    
    const repoUrl = config.repo
        .replace(/^https:\/\/github\.com\//, '')
        .replace(/^git@github\.com:/, '')
        .replace(/\.git$/, '');
    const [owner, repo] = repoUrl.split('/');
    console.log(`\nURL: https://${owner}.github.io/${repo}/${normalizedBranch}`);
});
