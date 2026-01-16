import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FindTheGift.css';

/**
 * Find the Gift Game Component
 * 3x3 grid with one hidden gift - limited attempts
 */
const FindTheGift = ({ onGameComplete }) => {
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [giftPosition, setGiftPosition] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [revealed, setRevealed] = useState(Array(9).fill(false));

  // Initialize game
  useEffect(() => {
    const randomPosition = Math.floor(Math.random() * 9);
    setGiftPosition(randomPosition);
  }, []);

  const handleCellClick = (index) => {
    if (gameOver || revealed[index]) return;

    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    if (index === giftPosition) {
      // Found the gift!
      setWon(true);
      setGameOver(true);
      setTimeout(() => onGameComplete(), 2000);
    } else {
      // Wrong cell
      const newAttempts = attemptsLeft - 1;
      setAttemptsLeft(newAttempts);

      if (newAttempts === 0) {
        // Game over - show gift position
        const allRevealed = Array(9).fill(true);
        setRevealed(allRevealed);
        setGameOver(true);
      }
    }
  };

  const resetGame = () => {
    const randomPosition = Math.floor(Math.random() * 9);
    setGiftPosition(randomPosition);
    setRevealed(Array(9).fill(false));
    setAttemptsLeft(3);
    setGameOver(false);
    setWon(false);
  };

  return (
    <div className="find-the-gift">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="game-title"
      >
        🎁 Find the Gift
      </motion.h2>

      <motion.div
        className="game-info"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="attempts-container">
          <span className="attempts-label">Attempts Left:</span>
          <div className="hearts">
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                className={`heart ${i < attemptsLeft ? 'active' : 'inactive'}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {i < attemptsLeft ? '❤️' : '🖤'}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.p
          className="instruction"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {gameOver
            ? won
              ? '🎉 You found it! Amazing!'
              : '😅 Game over! The gift was hidden...'
            : 'Click to find the hidden gift!'}
        </motion.p>
      </motion.div>

      <motion.div
        className="grid"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        {grid.map((_, index) => (
          <motion.button
            key={index}
            className={`grid-cell ${revealed[index] ? 'revealed' : ''} ${
              revealed[index] && index === giftPosition ? 'gift' : ''
            } ${revealed[index] && index !== giftPosition ? 'empty' : ''}`}
            onClick={() => handleCellClick(index)}
            disabled={gameOver || revealed[index]}
            whileHover={{
              scale: !revealed[index] && !gameOver ? 1.05 : 1,
            }}
            whileTap={{
              scale: !revealed[index] && !gameOver ? 0.95 : 1,
            }}
            initial={{ opacity: 0, rotateY: 0 }}
            animate={{
              opacity: 1,
              rotateY: revealed[index] ? 180 : 0,
            }}
            transition={{
              delay: 0.7 + index * 0.05,
              rotateY: { duration: 0.6 },
            }}
          >
            <div className="cell-front">
              <span className="mystery-icon">❓</span>
            </div>
            <div className="cell-back">
              {revealed[index] && (
                <AnimatePresence>
                  <motion.span
                    className="cell-content"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    {index === giftPosition ? '🎁' : '💔'}
                  </motion.span>
                </AnimatePresence>
              )}
            </div>
          </motion.button>
        ))}
      </motion.div>

      {gameOver && !won && (
        <motion.button
          className="reset-btn"
          onClick={resetGame}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔄 Try Again
        </motion.button>
      )}
    </div>
  );
};

export default FindTheGift;
