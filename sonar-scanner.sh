#!/bin/bash

# SonarCloud Scanner Script

if [ -z "$SONAR_TOKEN" ]; then
    echo "Error: SONAR_TOKEN environment variable is not set"
    exit 1
fi

echo "Running tests with coverage..."
yarn test

echo "Running SonarCloud analysis..."
sonar-scanner -Dsonar.login=$SONAR_TOKEN

echo "SonarCloud analysis completed!"
