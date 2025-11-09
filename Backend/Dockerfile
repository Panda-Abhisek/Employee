# Use an official Maven image for the build
FROM maven:3.8.8-eclipse-temurin-21 AS build
WORKDIR /app

# Copy project files
COPY . .

# Ensure Maven Wrapper is executable
RUN chmod +x mvnw

# Build the application (will use the Maven Wrapper scripts)
RUN ./mvnw clean package -DskipTests

# Use a lightweight JRE for running the app
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port (match Spring Boot's server.port)
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]
