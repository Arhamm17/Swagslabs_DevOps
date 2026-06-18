FROM mcr.microsoft.com/playwright:v1.60.0-jammy

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g allure-commandline --save-dev

# Fix: Tell the container where Java is
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV PATH=$JAVA_HOME/bin:$PATH

# Install Java in case it is missing
RUN apt-get update && apt-get install -y openjdk-11-jdk && apt-get clean

COPY . .

CMD ["sh", "-c", "npx playwright test && allure generate allure-results --clean -o allure-report"]