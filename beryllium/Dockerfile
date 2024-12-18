FROM maven:3-amazoncorretto-21-alpine AS builder
COPY pom.xml /app/
COPY src /app/src
RUN mvn -f /app/pom.xml clean package

FROM openjdk:21-jdk-slim
COPY --from=builder /app/target/*.jar /app/bubatz.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/bubatz.jar"]