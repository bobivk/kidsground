# the base image
FROM amazoncorretto:21

# the JAR file path
ARG JAR_FILE=target/*.jar

EXPOSE 8009

# Copy the JAR file from the build context into the Docker image
COPY ${JAR_FILE} application.jar

COPY src/main/resources/keystore.p12 keystore.p12

CMD apt-get update -y

# Set the default command to run the Java application
ENTRYPOINT ["java", "-jar", "/application.jar"]
