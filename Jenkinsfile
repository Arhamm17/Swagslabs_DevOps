pipeline {
    agent any

    tools {
        jdk 'java21' // Tells Jenkins to prepare the tool context
    }

    environment {
        PROJECT_NAME   = 'Swagslabs_DevOps'
        ALLURE_RESULTS = 'allure-results'
        ALLURE_REPORT  = 'allure-report'
        
        // 👈 Explicitly forces the environment paths inside the pipeline stages
        JAVA_HOME      = '/usr/lib/jvm/java-21-openjdk-amd64'
        PATH           = "${JAVA_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo '[Swagslabs_DevOps] Checking out code from GitHub'
                checkout scm
            }
        }

        stage('Build Test Runner Image') {
            steps {
                echo '[Swagslabs_DevOps] Building Docker image'
                sh 'docker build -t swagslabs-test-runner .'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo '[Swagslabs_DevOps] Running Playwright tests'
                sh '''
                    docker run --rm \
                        -v "${WORKSPACE}/allure-results":/app/allure-results \
                        swagslabs-test-runner \
                        npx playwright test
                '''
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo '[Swagslabs_DevOps] Generating Allure Report'
                sh '''
                    docker run --rm \
                        -v "${WORKSPACE}/allure-results":/app/allure-results \
                        -v "${WORKSPACE}/allure-report":/app/allure-report \
                        swagslabs-test-runner \
                        allure generate allure-results --clean -o allure-report
                '''
            }
        }

        stage('Publish Allure Report') {
            steps {
                echo '[Swagslabs_DevOps] Publishing Allure Report'
                allure([
                    includeProperties: false,
                    jdk: 'java21',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
        always {
            echo '[Swagslabs_DevOps] Pipeline finished'
        }
        success {
            echo '[Swagslabs_DevOps] All tests passed!'
        }
        failure {
            echo '[Swagslabs_DevOps] Tests failed. Check Allure Report'
        }
    }
}