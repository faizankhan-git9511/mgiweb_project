# Stage 1: Build stage using Maven and Eclipse Temurin JDK 17
FROM maven:3.9-eclipse-temurin-17-alpine AS builder
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Package application jar skipping tests
RUN mvn clean package -DskipTests

# Stage 2: Runtime stage using lightweight Eclipse Temurin JRE 17
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Security: Create non-root system user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy compiled jar from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Set directory ownership to appuser
RUN chown -R appuser:appgroup /app
USER appuser

# Render dynamically binds port using PORT env variable
EXPOSE 8080

ENV PORT=8080 \
    SPRING_PROFILES_ACTIVE=postgres

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
