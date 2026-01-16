# 🏗️ System Architecture

## Overview

This document provides a detailed explanation of how the Birthday Gift Application components interact with each other.

---

## 🎯 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                       │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              React Application (Port 5173)          │    │
│  │                                                     │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐        │    │
│  │  │ Landing  │  │  Games   │  │  Reward  │        │    │
│  │  │   Page   │→ │Components│→ │  Screen  │        │    │
│  │  └──────────┘  └──────────┘  └──────────┘        │    │
│  │         │              │              │            │    │
│  │         └──────────────┴──────────────┘            │    │
│  │                        │                            │    │
│  │                   ┌────▼────┐                      │    │
│  │                   │ API.js  │                      │    │
│  │                   │ Service │                      │    │
│  │                   └────┬────┘                      │    │
│  └────────────────────────┼─────────────────────────┘    │
│                            │                               │
└────────────────────────────┼───────────────────────────────┘
                             │
                    HTTP/JSON │ REST API
                             │
┌────────────────────────────▼───────────────────────────────┐
│                  Spring Boot Backend (Port 8080)           │
│                                                             │
│  ┌──────────────────────────────────────────────────┐     │
│  │              GameController                       │     │
│  │          (REST API Endpoints)                     │     │
│  │  POST /api/session/create                         │     │
│  │  GET  /api/progress                               │     │
│  │  POST /api/game/complete                          │     │
│  │  POST /api/reward/claim                           │     │
│  └─────────────────┬────────────────────────────────┘     │
│                    │                                       │
│  ┌─────────────────▼────────────────────────────────┐     │
│  │              GameService                          │     │
│  │          (Business Logic)                         │     │
│  │  - Session management                             │     │
│  │  - Game completion tracking                       │     │
│  │  - Reward validation                              │     │
│  └─────────────────┬────────────────────────────────┘     │
│                    │                                       │
│  ┌─────────────────▼────────────────────────────────┐     │
│  │         GameSessionRepository                     │     │
│  │         (Data Access Layer)                       │     │
│  └─────────────────┬────────────────────────────────┘     │
│                    │                                       │
│  ┌─────────────────▼────────────────────────────────┐     │
│  │              H2 Database                          │     │
│  │           (In-Memory Storage)                     │     │
│  │                                                   │     │
│  │    Table: game_sessions                          │     │
│  │    - session_id                                   │     │
│  │    - game completion flags                        │     │
│  │    - timestamps                                   │     │
│  └───────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow Example: Complete a Game

### Step-by-Step Flow

```
1. USER ACTION
   └─> User wins Tic-Tac-Toe game
       └─> TicTacToe.jsx: onGameComplete() called

2. COMPONENT LAYER (React)
   └─> App.jsx: handleGameComplete('TIC_TAC_TOE')
       └─> Calls API service

3. API SERVICE LAYER
   └─> api.js: completeGame(sessionId, 'TIC_TAC_TOE')
       └─> HTTP POST to backend

4. NETWORK
   └─> POST http://localhost:8080/api/game/complete
       Body: {
         "sessionId": "abc-123",
         "gameType": "TIC_TAC_TOE"
       }

5. BACKEND - CONTROLLER
   └─> GameController.completeGame()
       ├─> Validates request
       └─> Calls service layer

6. BACKEND - SERVICE
   └─> GameService.completeGame()
       ├─> Fetches session from database
       ├─> Updates ticTacToeCompleted = true
       ├─> Checks if all games completed
       └─> Saves to database

7. BACKEND - REPOSITORY
   └─> GameSessionRepository.save()
       └─> Persists to H2 database

8. BACKEND - RESPONSE
   └─> Returns GameProgressResponse
       └─> JSON with updated progress

9. FRONTEND - RESPONSE HANDLING
   └─> api.js receives response
       └─> App.jsx updates state
           ├─> Updates gameProgress
           └─> Moves to next game or reward screen

10. UI UPDATE
    └─> React re-renders
        └─> User sees next game
```

---

## 🎮 Component Interaction Flow

### Session Lifecycle

```
1. Application Load
   │
   ├─> App.jsx: useEffect() runs
   │   └─> GameAPI.createSession()
   │       └─> Backend creates new session
   │           └─> Returns sessionId
   │
2. User Opens Gift
   │
   ├─> LandingPage: onGiftOpen()
   │   └─> App.jsx: setCurrentScreen('games')
   │       └─> Renders first game (TicTacToe)
   │
3. User Plays Games
   │
   ├─> Game 1: TicTacToe
   │   ├─> User wins
   │   └─> Completes via API
   │       └─> Moves to Game 2
   │
   ├─> Game 2: RockPaperScissors
   │   ├─> User wins
   │   └─> Completes via API
   │       └─> Moves to Game 3
   │
   ├─> Game 3: FindTheGift
   │   ├─> User wins
   │   └─> Completes via API
   │       └─> Moves to Reward
   │
4. Final Reward
   │
   └─> FinalReward: onClaimReward()
       └─> GameAPI.claimReward()
           └─> Backend validates all games complete
               └─> Marks reward as claimed
                   └─> Returns reward message
                       └─> Shows celebration
```

---

## 📊 Data Model

### GameSession Entity

```java
@Entity
public class GameSession {
    @Id
    @GeneratedValue
    private Long id;
    
    @Column(unique = true)
    private String sessionId;              // UUID
    
    // Game completion flags
    private boolean ticTacToeCompleted;
    private boolean rockPaperScissorsCompleted;
    private boolean findTheGiftCompleted;
    
    // Reward
    private boolean finalRewardClaimed;
    
    // Timestamps
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime rewardClaimedAt;
}
```

### State Flow

```
NEW SESSION
    sessionId: "uuid"
    all flags: false
    ↓
GAME 1 COMPLETE
    ticTacToeCompleted: true
    ↓
GAME 2 COMPLETE
    rockPaperScissorsCompleted: true
    ↓
GAME 3 COMPLETE
    findTheGiftCompleted: true
    allGamesCompleted: true
    ↓
REWARD CLAIMED
    finalRewardClaimed: true
    rewardClaimedAt: timestamp
```

---

## 🔐 Security Considerations

### Current Implementation
- **Session-based:** Each user gets unique sessionId
- **No authentication:** Simplified for demo purposes
- **In-memory database:** Data resets on server restart

### Production Recommendations
1. **Add Authentication:**
   - Spring Security
   - JWT tokens
   - OAuth2 integration

2. **Persistent Database:**
   - PostgreSQL or MySQL
   - User accounts
   - Game history

3. **Rate Limiting:**
   - Prevent API abuse
   - Throttle requests

4. **Input Validation:**
   - Already implemented with Bean Validation
   - Enhance for production use

---

## 🚀 Scalability Considerations

### Current Limitations
- Single server instance
- In-memory database
- No caching layer

### Scaling Strategies

**Horizontal Scaling:**
```
Load Balancer
    ├─> Backend Instance 1
    ├─> Backend Instance 2
    └─> Backend Instance 3
         ↓
    Shared Database
```

**Caching Layer:**
```
Frontend ──> CDN (Static Assets)
             ↓
Backend  ──> Redis (Session Cache)
             ↓
         PostgreSQL (Persistent Storage)
```

**Microservices (Future):**
```
API Gateway
    ├─> Session Service
    ├─> Game Logic Service
    └─> Reward Service
```

---

## 🎨 Frontend Architecture

### Component Hierarchy

```
App.jsx (Root)
    ├─> LandingPage.jsx
    │   └─> Gift box animation
    │
    ├─> Games Container
    │   ├─> Progress Bar
    │   ├─> TicTacToe.jsx
    │   ├─> RockPaperScissors.jsx
    │   └─> FindTheGift.jsx
    │
    └─> FinalReward.jsx
        └─> Confetti animation
```

### State Management

```javascript
// Global State (App.jsx)
{
  currentScreen: 'landing' | 'games' | 'reward',
  sessionId: string,
  gameProgress: {
    ticTacToeCompleted: boolean,
    rockPaperScissorsCompleted: boolean,
    findTheGiftCompleted: boolean,
    allGamesCompleted: boolean,
    finalRewardClaimed: boolean
  },
  currentGame: 0 | 1 | 2,
  rewardMessage: string
}

// Local State (Each Game Component)
- Game-specific state
- UI interaction state
- Animation state
```

---

## 🔧 Technology Stack

### Backend
- **Framework:** Spring Boot 3.2.0
- **Language:** Java 17
- **Database:** H2 (In-Memory)
- **Build Tool:** Maven
- **API Style:** RESTful
- **Data Format:** JSON

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite 5
- **Animation:** Framer Motion
- **HTTP Client:** Axios
- **Styling:** CSS3 (Custom)
- **Fonts:** Google Fonts (Fredoka)

---

## 📈 Performance Optimization

### Backend
- Lightweight H2 database
- Minimal dependencies
- Efficient JPA queries
- Connection pooling

### Frontend
- Vite fast dev server
- Code splitting ready
- Lazy loading capable
- Optimized animations (CSS + Framer Motion)
- Minimal bundle size

---

## 🧪 Testing Strategy

### Backend Testing
```
Unit Tests
    ├─> Service Layer
    │   ├─> Game completion logic
    │   └─> Reward validation
    │
    └─> Repository Layer
        └─> Data persistence

Integration Tests
    └─> API Endpoints
        ├─> POST /api/session/create
        ├─> GET /api/progress
        ├─> POST /api/game/complete
        └─> POST /api/reward/claim
```

### Frontend Testing
```
Component Tests
    ├─> LandingPage renders
    ├─> Games are playable
    └─> Reward screen displays

Integration Tests
    └─> Full user flow
        ├─> Open gift
        ├─> Complete all games
        └─> Claim reward

E2E Tests
    └─> Full application flow
        with backend integration
```

---

**This architecture provides a solid foundation for a production-ready birthday gift application!**
