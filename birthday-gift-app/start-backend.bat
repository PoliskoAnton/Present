@echo off
echo 🎂 Starting Birthday Gift Backend...
echo.
echo Prerequisites Check:
echo - Java 17+ ✓
echo - Maven 3.6+ ✓
echo.

cd backend

echo Installing dependencies...
call mvn clean install -DskipTests

echo.
echo Starting Spring Boot application...
echo Backend will be available at: http://localhost:8080
echo H2 Console: http://localhost:8080/h2-console
echo.

call mvn spring-boot:run
pause
