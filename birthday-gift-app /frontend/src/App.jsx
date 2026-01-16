import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameAPI from './services/api';
import LandingPage from './components/LandingPage';
import TicTacToe from './components/TicTacToe';
import RockPaperScissors from './components/RockPaperScissors';
import FindTheGift from './components/FindTheGift';
import FinalReward from './components/FinalReward';
import './styles/App.css';

/**
 * Main Application Component
 * Manages game flow and state
 */
function App() {
  const [currentScreen, setCurrentScreen] = useState('landing'); // landing, games, reward
  const [sessionId, setSessionId] = useState(null);
  const [gameProgress, setGameProgress] = useState({
    ticTacToeCompleted: false,
    rockPaperScissorsCompleted: false,
    findTheGiftCompleted: false,
    allGamesCompleted: false,
    finalRewardClaimed: false,
  });
  const [rewardMessage, setRewardMessage] = useState('');
  const [currentGame, setCurrentGame] = useState(0); // 0: TicTacToe, 1: RPS, 2: FindTheGift

  // Initialize session on mount
  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = async () => {
    try {
      const response = await GameAPI.createSession();
      setSessionId(response.sessionId);
      setGameProgress({
        ticTacToeCompleted: response.ticTacToeCompleted,
        rockPaperScissorsCompleted: response.rockPaperScissorsCompleted,
        findTheGiftCompleted: response.findTheGiftCompleted,
        allGamesCompleted: response.allGamesCompleted,
        finalRewardClaimed: response.finalRewardClaimed,
      });
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  const handleGiftOpen = () => {
    setCurrentScreen('games');
  };

  const handleGameComplete = async (gameType) => {
    if (!sessionId) return;

    try {
      const response = await GameAPI.completeGame(sessionId, gameType);
      setGameProgress({
        ticTacToeCompleted: response.ticTacToeCompleted,
        rockPaperScissorsCompleted: response.rockPaperScissorsCompleted,
        findTheGiftCompleted: response.findTheGiftCompleted,
        allGamesCompleted: response.allGamesCompleted,
        finalRewardClaimed: response.finalRewardClaimed,
      });

      // Move to next game or reward screen
      if (response.allGamesCompleted) {
        setCurrentScreen('reward');
      } else {
        setCurrentGame(currentGame + 1);
      }
    } catch (error) {
      console.error('Failed to complete game:', error);
    }
  };

  const handleClaimReward = async () => {
    if (!sessionId) return;

    try {
      const response = await GameAPI.claimReward(sessionId);
      if (response.success) {
        setRewardMessage(response.rewardMessage);
        setGameProgress({
          ...gameProgress,
          finalRewardClaimed: true,
        });
      }
    } catch (error) {
      console.error('Failed to claim reward:', error);
    }
  };

  const renderGameScreen = () => {
    const games = [
      {
        component: TicTacToe,
        gameType: 'TIC_TAC_TOE',
        completed: gameProgress.ticTacToeCompleted,
      },
      {
        component: RockPaperScissors,
        gameType: 'ROCK_PAPER_SCISSORS',
        completed: gameProgress.rockPaperScissorsCompleted,
      },
      {
        component: FindTheGift,
        gameType: 'FIND_THE_GIFT',
        completed: gameProgress.findTheGiftCompleted,
      },
    ];

    const CurrentGameComponent = games[currentGame].component;

    return (
      <div className="games-container">
        <motion.div
          className="progress-bar-container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="progress-info">
            <span className="progress-text">
              Game {currentGame + 1} of 3
            </span>
            <span className="progress-percentage">
              {Math.round(((currentGame) / 3) * 100)}%
            </span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(currentGame / 3) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentGame}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <CurrentGameComponent
              onGameComplete={() => handleGameComplete(games[currentGame].gameType)}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {currentScreen === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onGiftOpen={handleGiftOpen} />
          </motion.div>
        )}

        {currentScreen === 'games' && (
          <motion.div
            key="games"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderGameScreen()}
          </motion.div>
        )}

        {currentScreen === 'reward' && (
          <motion.div
            key="reward"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FinalReward
              onClaimReward={handleClaimReward}
              rewardClaimed={gameProgress.finalRewardClaimed}
              rewardMessage={rewardMessage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
