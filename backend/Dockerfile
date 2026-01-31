FROM mcr.microsoft.com/playwright/java:v1.43.0-jammy

WORKDIR /app

# Copy Spring Boot jar
COPY target/*.jar app.jar

# App Runner needs this
EXPOSE 8080

# Disable sandbox (REQUIRED on AWS)
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV JAVA_OPTS="--add-opens=java.base/java.lang=ALL-UNNAMED"

ENTRYPOINT ["java","-jar","app.jar"]
