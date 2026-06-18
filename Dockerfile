FROM mcr.microsoft.com/playwright:v1.60.0-jammy

# Install lightweight Java runtime required by the Allure CLI tool
RUN apt-get update && apt-get install -y openjdk-21-jre-headless && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g allure-commandline --save-dev

COPY . .

# (Optional backup default instruction)
CMD ["sh", "-c", "npx playwright test && allure generate allure-results --clean -o allure-report"]