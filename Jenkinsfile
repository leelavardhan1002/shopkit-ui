pipeline {
    agent any
    
    environment {
        NODE_VERSION = '22'
        SONAR_TOKEN = credentials('sonar_token')
        NPM_TOKEN = credentials('npm_token')
        CI = 'true'
        NODE_ENV = 'production'
    }
    
    stages {
        stage('Setup') {
            steps {
                script {
                    sh 'node --version'
                    sh 'yarn --version'
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'yarn install --frozen-lockfile'
            }
        }
        
        stage('Build, Lint & Test') {
            parallel {
                stage('Build') {
                    steps { sh 'yarn build' }
                }
                stage('Lint') {
                    steps { sh 'yarn lint' }
                }
                stage('Unit Test') {
                    steps { sh 'yarn test' }
                }
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'
                    withSonarQubeEnv('SonarCloud') {
                        sh """
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.login=${SONAR_TOKEN}
                        """
                    }
                }
            }
        }
        
        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        
        stage('Storybook Build') {
            steps { sh 'yarn build-storybook' }
        }
        
        stage('NPM Alpha Release') {
            steps {
                script {
                    sh 'echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc'
                    sh 'yarn lerna publish --dist-tag alpha --preid alpha --yes --conventional-commits'
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
