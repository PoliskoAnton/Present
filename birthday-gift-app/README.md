# 🎂 Birthday Gift Web Application

An interactive full-stack birthday celebration web application that delivers a delightful user experience through gamification. Users unwrap a virtual gift, complete three engaging mini-games, and unlock a special birthday reward.

## 🌟 Features

### User Experience Flow
1. **Landing Page** - Beautiful animated gift box with floating confetti
2. **Gift Opening Animation** - Smooth transition to games section
3. **Three Sequential Mini-Games:**
   - 🎮 **Tic-Tac-Toe** - Strategic game against AI
   - ✊ **Rock Paper Scissors** - Best of 3 rounds
   - 🎁 **Find the Gift** - Memory/luck game with limited attempts
4. **Final Reward Screen** - Congratulatory message with confetti celebration

### Technical Highlights
- **Full-stack Architecture** - React frontend + Spring Boot backend
- **Beautiful UI/UX** - Custom animations using Framer Motion
- **RESTful API** - Clean separation of concerns
- **Session Management** - Track user progress across games
- **Responsive Design** - Works on desktop and mobile devices
- **Production-ready** - Proper error handling and validation

---

## 🏗️ Architecture

### Backend (Spring Boot)

```
backend/
├── src/main/java/com/birthday/giftapp/
│   ├── BirthdayGiftApplication.java    # Main application entry point
│   ├── controller/
│   │   └── GameController.java         # REST API endpoints
│   ├── service/
│   │   └── GameService.java            # Business logic layer
│   ├── model/
│   │   └── GameSession.java            # Entity model
│   ├── dto/
│   │   ├── GameProgressResponse.java
│   │   ├── GameCompletionRequest.java
│   │   ├── RewardClaimRequest.java
│   │   └── RewardClaimResponse.java
│   ├── repository/
│   │   └── GameSessionRepository.java  # Data access layer
│   └── config/
│       └── CorsConfig.java             # CORS configuration
├── src/main/resources/
│   └── application.properties          # Application configuration
└── pom.xml                             # Maven dependencies
```

#### Key Components

**Controllers** - Handle HTTP requests and responses
- `POST /api/session/create` - Create new game session
- `GET /api/progress?sessionId={id}` - Get session progress
- `POST /api/game/complete` - Mark game as completed
- `POST /api/reward/claim` - Claim final reward

**Services** - Business logic and game state management
- Session creation and validation
- Game completion tracking
- Reward eligibility verification

**Models** - Database entities
- `GameSession` - Tracks user progress through all games

**DTOs** - Data transfer objects for API communication
- Type-safe request/response objects
- Bean validation for input

### Frontend (React + Vite)

```
frontend/
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx           # Gift box screen
│   │   ├── LandingPage.css
│   │   ├── TicTacToe.jsx             # Game 1
│   │   ├── TicTacToe.css
│   │   ├── RockPaperScissors.jsx     # Game 2
│   │   ├── RockPaperScissors.css
│   │   ├── FindTheGift.jsx           # Game 3
│   │   ├── FindTheGift.css
│   │   ├── FinalReward.jsx           # Reward screen
│   │   └── FinalReward.css
│   ├── services/
│   │   └── api.js                    # API service layer
│   ├── styles/
│   │   └── App.css                   # Global styles
│   ├── App.jsx                       # Main app component
│   └── main.jsx                      # Entry point
├── index.html
├── vite.config.js
└── package.json
```

#### Key Components

**App.jsx** - Main orchestrator
- Session management
- Screen navigation
- State management for game progress

**Component Structure**
- Each game is self-contained with own logic and styling
- Framer Motion for smooth animations
- Modular and reusable design

**API Service** - Centralized backend communication
- Axios-based HTTP client
- Clean async/await patterns
- Error handling

---

## 🔄 Data Flow

```
┌─────────────┐         HTTP/JSON        ┌──────────────┐
│   React     │ ◄─────────────────────► │ Spring Boot  │
│   Frontend  │      REST API            │   Backend    │
└─────────────┘                          └──────────────┘
      │                                         │
      │                                         │
      ▼                                         ▼
┌─────────────┐                          ┌──────────────┐
│   State     │                          │  H2 Database │
│ Management  │                          │   (In-Memory)│
└─────────────┘                          └──────────────┘
```

### API Communication Examples

**1. Create Session**
```javascript
POST /api/session/create
Response: {
  sessionId: "uuid",
  ticTacToeCompleted: false,
  rockPaperScissorsCompleted: false,
  findTheGiftCompleted: false,
  allGamesCompleted: false,
  finalRewardClaimed: false,
  progressPercentage: 0,
  message: "New game session created! 🎉"
}
```

**2. Complete Game**
```javascript
POST /api/game/complete
Request: {
  sessionId: "uuid",
  gameType: "TIC_TAC_TOE"
}
Response: {
  sessionId: "uuid",
  ticTacToeCompleted: true,
  // ... updated progress
  message: "🎮 Game completed! Keep going!"
}
```

**3. Claim Reward**
```javascript
POST /api/reward/claim
Request: {
  sessionId: "uuid"
}
Response: {
  sessionId: "uuid",
  success: true,
  message: "🎁 Reward claimed successfully!",
  claimedAt: "2024-01-16T12:00:00",
  rewardMessage: "🎂 Happy Birthday! ..."
}
```

---

## 🚀 Getting Started

### Prerequisites

- **Java 17+** - [Download JDK](https://adoptium.net/)
- **Maven 3.6+** - [Download Maven](https://maven.apache.org/download.cgi)
- **Node.js 18+** - [Download Node](https://nodejs.org/)
- **npm or yarn** - Comes with Node.js

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies (Maven will auto-download):**
```bash
mvn clean install
```

3. **Run the Spring Boot application:**
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

**Verify it's running:**
```bash
curl http://localhost:8080/api/health
# Should return: 🎂 Birthday Gift Application is running!
```

**Access H2 Console (Optional):**
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:birthday_gift_db`
- Username: `sa`
- Password: (leave empty)

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

**Build for production:**
```bash
npm run build
```

---

## 🎮 Game Logic

### Tic-Tac-Toe
- **Player:** X (human)
- **Computer:** O (AI)
- **AI Strategy:**
  1. Try to win
  2. Block player from winning
  3. Take center if available
  4. Take corner
  5. Random move
- **Win Condition:** User must win to proceed

### Rock Paper Scissors
- **Format:** Best of 3 rounds
- **Scoring:** First to 2 wins
- **Rules:** Standard RPS rules
- **Win Condition:** User must win overall match

### Find the Gift
- **Grid:** 3x3 (9 cells)
- **Attempts:** 3 tries
- **Hidden Item:** One gift randomly placed
- **Win Condition:** Find the gift within attempts

---

## 🎨 Design Philosophy

### Color Palette
- **Primary Pink:** `#FF6B9D` - Main brand color
- **Golden Yellow:** `#FFC75F` - Secondary accent
- **Purple:** `#C780FA` - Tertiary accent
- **Success Green:** `#51CF66` - Success states
- **Warm Gradients:** Soft pink to cream backgrounds

### Typography
- **Font Family:** Fredoka (Google Fonts)
- **Weights:** 300-700 for hierarchy
- **Style:** Friendly, rounded, playful

### Animation Principles
- **Entrance:** Fade + slide animations
- **Interaction:** Scale + rotate on hover/tap
- **Celebration:** Confetti and pulse effects
- **Transitions:** Smooth page transitions with opacity

---

## 📱 Responsive Design

The application is fully responsive and works across devices:

- **Desktop:** Full experience with all animations
- **Tablet:** Optimized touch interactions
- **Mobile:** Adapted layouts and font sizes

Media queries at: `768px` breakpoint

---

## 🔧 Configuration

### Backend Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# Server port
server.port=8080

# Database (H2 in-memory)
spring.datasource.url=jdbc:h2:mem:birthday_gift_db

# For production: Switch to PostgreSQL
# spring.datasource.url=jdbc:postgresql://localhost:5432/birthday_db
# spring.datasource.username=your_username
# spring.datasource.password=your_password
# spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

### Frontend Configuration

Edit `frontend/vite.config.js` to change ports or proxy settings:

```javascript
export default defineConfig({
  server: {
    port: 5173,  // Change frontend port
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  // Backend URL
        changeOrigin: true,
      }
    }
  }
})
```

---

## 🧪 Testing

### Backend Testing

Run unit tests:
```bash
cd backend
mvn test
```

Test API endpoints manually:
```bash
# Create session
curl -X POST http://localhost:8080/api/session/create

# Get progress
curl http://localhost:8080/api/progress?sessionId=YOUR_SESSION_ID

# Complete game
curl -X POST http://localhost:8080/api/game/complete \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"YOUR_SESSION_ID","gameType":"TIC_TAC_TOE"}'
```

### Frontend Testing

Manual testing checklist:
- [ ] Gift box opens smoothly
- [ ] All three games are playable
- [ ] Progress bar updates correctly
- [ ] Games must be won to proceed
- [ ] Final reward appears after all games
- [ ] Reward can only be claimed once
- [ ] Animations are smooth
- [ ] Mobile responsive

---

## 🚢 Deployment

### Backend Deployment

**Package as JAR:**
```bash
cd backend
mvn clean package
java -jar target/gift-app-1.0.0.jar
```

**Deploy to:**
- Heroku
- AWS Elastic Beanstalk
- Google Cloud Run
- Azure App Service

### Frontend Deployment

**Build production bundle:**
```bash
cd frontend
npm run build
```

**Deploy `dist/` folder to:**
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

**Environment Variables:**
Update API base URL in production:
```javascript
// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
```

---

## 📊 Database Schema

### GameSession Table

| Column                      | Type         | Description                    |
|-----------------------------|--------------|--------------------------------|
| id                          | BIGINT       | Primary key                    |
| session_id                  | VARCHAR(255) | Unique session identifier      |
| tic_tac_toe_completed       | BOOLEAN      | Game 1 completion status       |
| rock_paper_scissors_completed| BOOLEAN     | Game 2 completion status       |
| find_the_gift_completed     | BOOLEAN      | Game 3 completion status       |
| final_reward_claimed        | BOOLEAN      | Reward claim status            |
| created_at                  | TIMESTAMP    | Session creation time          |
| updated_at                  | TIMESTAMP    | Last update time               |
| reward_claimed_at           | TIMESTAMP    | Reward claim timestamp         |

---

## 🤝 Contributing

This is a portfolio project, but improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is created as a portfolio piece. Feel free to use it for learning purposes.

---

## 👨‍💻 Author

Created with ❤️ as a portfolio project demonstrating:
- Full-stack development skills
- Modern React patterns
- Spring Boot best practices
- RESTful API design
- Beautiful UI/UX design
- Animation and micro-interactions

---

## 🎯 Future Enhancements

Potential improvements for V2:
- [ ] User authentication system
- [ ] Leaderboard for game scores
- [ ] More mini-games
- [ ] Customizable themes
- [ ] Share results on social media
- [ ] Multi-language support
- [ ] Sound effects and background music
- [ ] Progressive Web App (PWA) support
- [ ] Real-time multiplayer games

---

## 💡 Tips for Customization

### Change Birthday Message
Edit `backend/src/main/java/com/birthday/giftapp/service/GameService.java`:
```java
.rewardMessage("🎂 [YOUR CUSTOM MESSAGE]")
```

### Modify Color Scheme
Edit `frontend/src/styles/App.css`:
```css
:root {
  --primary: #FF6B9D;     /* Change primary color */
  --secondary: #FFC75F;   /* Change secondary color */
  /* ... */
}
```

### Add New Games
1. Create new component in `frontend/src/components/`
2. Add game type to `GameCompletionRequest.java`
3. Update `GameSession.java` model with new field
4. Add game to rotation in `App.jsx`

---

## 📞 Support

If you encounter issues:
1. Check that both frontend and backend are running
2. Verify ports 5173 and 8080 are available
3. Check browser console for frontend errors
4. Check terminal for backend errors
5. Ensure Java 17+ and Node 18+ are installed

---

**Enjoy the Birthday Celebration! 🎉🎂🎁**
