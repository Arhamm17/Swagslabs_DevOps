FROM mcr.microsoft.com/playwright:v1.44.0-jammy

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g allure-commandline --save-dev

COPY . .

CMD ["sh", "-c", "npx playwright test && allure generate allure-results --clean -o allure-report"]