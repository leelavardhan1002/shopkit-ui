require('dotenv').config();
const { execSync } = require('child_process');
const scanner = require('sonarqube-scanner').default;

if (!process.env.SONAR_TOKEN) {
  console.error('❌ ERROR: SONAR_TOKEN environment variable is not set!');
  console.error('Set it with: export SONAR_TOKEN="your_token" (mac/linux)');
  console.error('Or in PowerShell: $env:SONAR_TOKEN="your_token"');
  process.exit(1);
}

let branchName = 'main';
try {
  branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  console.log(`📦 Detected Git branch: ${branchName}`);
} catch {
  console.warn('⚠️ Could not detect branch. Defaulting to "main".');
}

const axios = require('axios');

async function checkQualityGate(projectKey, branchName, token) {
  try {
    const url = `https://sonarcloud.io/api/qualitygates/project_status?projectKey=${projectKey}&branch=${branchName}`;
    const response = await axios.get(url, {
      auth: { username: token, password: '' },
    });

    const status = response.data.projectStatus.status;
    console.log(`📊 Quality Gate Status: ${status}`);

    if (status !== 'OK') {
      console.error('❌ Quality Gate FAILED');
      process.exit(1);
    } else {
      console.log('✅ Quality Gate PASSED');
    }
  } catch (err) {
    console.error('⚠️ Could not fetch Quality Gate status:', err.message);
  }
}

scanner(
  {
    serverUrl: 'https://sonarcloud.io',
    token: process.env.SONAR_TOKEN,
    options: {
      'project.settings': 'sonar-project.properties',
      'sonar.branch.name': branchName,
    },
  },
  async (error) => {
    if (error) {
      console.error('❌ SonarCloud analysis failed:', error);
      process.exit(1);
    } else {
      console.log('✅ SonarCloud analysis completed successfully!');
      await checkQualityGate('shopkit-ui', branchName, process.env.SONAR_TOKEN);
    }
  }
);
