# 🚀 Quick Start Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Java Development Kit (JDK) 17 or higher**
   - Download: https://adoptium.net/
   - Verify: `java -version`

2. **Maven 3.6 or higher**
   - Download: https://maven.apache.org/download.cgi
   - Verify: `mvn -version`

3. **Node.js 18 or higher**
   - Download: https://nodejs.org/
   - Verify: `node -version`

4. **npm (comes with Node.js)**
   - Verify: `npm -version`

---

## ⚡ Quick Start (Recommended)

### Option 1: Using Startup Scripts

**Linux/Mac:**
```bash
# Terminal 1 - Start Backend
./start-backend.sh

# Terminal 2 - Start Frontend (in a new terminal)
./start-frontend.sh
```

**Windows:**
```cmd
REM Terminal 1 - Start Backend
start-backend.bat

REM Terminal 2 - Start Frontend (in a new terminal)
start-frontend.bat
```

### Option 2: Manual Start

**Step 1: Start Backend**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
Wait for: `Birthday Gift Application Started Successfully!`

**Step 2: Start Frontend** (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Access the Application

Once both services are running:

1. **Frontend:** http://localhost:5173
2. **Backend API:** http://localhost:8080/api/health
3. **H2 Database Console:** http://localhost:8080/h2-console
   - JDBC URL: `jdbc:h2:mem:birthday_gift_db`
   - Username: `sa`
   - Password: (leave empty)

---

## ✅ Verification Steps

1. **Backend Health Check:**
```bash
curl http://localhost:8080/api/health
# Should return: 🎂 Birthday Gift Application is running!
```

2. **Frontend:** 
   - Open http://localhost:5173 in your browser
   - You should see the landing page with a gift box

3. **Full Flow Test:**
   - Click on the gift box to open it
   - Play through all three games
   - Claim your final reward

---

## 🛠️ Troubleshooting

### Backend won't start

**Problem:** Port 8080 is already in use
```bash
# Find process using port 8080
# Mac/Linux:
lsof -i :8080
# Windows:
netstat -ano | findstr :8080

# Kill the process or change the port in application.properties
```

**Problem:** Maven build fails
```bash
# Clean and rebuild
cd backend
mvn clean
mvn install -DskipTests
```

### Frontend won't start

**Problem:** Port 5173 is already in use
- Edit `vite.config.js` and change the port number

**Problem:** Dependencies installation fails
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Problem:** Cannot connect to backend
- Verify backend is running: `curl http://localhost:8080/api/health`
- Check CORS configuration in `CorsConfig.java`
- Verify the API URL in `frontend/src/services/api.js`

---

## 📦 Project Structure

```
birthday-gift-app/
├── backend/                 # Spring Boot backend
│   ├── src/
│   └── pom.xml
├── frontend/                # React frontend
│   ├── src/
│   └── package.json
├── README.md               # Full documentation
├── QUICKSTART.md          # This file
├── start-backend.sh       # Linux/Mac backend script
├── start-frontend.sh      # Linux/Mac frontend script
├── start-backend.bat      # Windows backend script
└── start-frontend.bat     # Windows frontend script
```

---

## 🎮 How to Play

1. **Landing Page:** Click the gift box to open it
2. **Game 1 - Tic-Tac-Toe:** Beat the computer to proceed
3. **Game 2 - Rock Paper Scissors:** Win best of 3 rounds
4. **Game 3 - Find the Gift:** Find the hidden gift in 3 attempts
5. **Final Reward:** Claim your birthday reward!

---

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Customize the birthday message in `GameService.java`
- Change colors in `App.css`
- Add your own games
- Deploy to production

---

## 💬 Need Help?

Common issues and solutions are in the main [README.md](README.md#-support).

---

**Happy Coding! 🎉**
