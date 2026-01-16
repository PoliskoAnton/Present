import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RockPaperScissors.css';

/**
 * Rock Paper Scissors Game Component
 * Best of 3 rounds against computer
 */
const RockPaperScissors = ({ onGameComplete }) => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [round, setRound] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const choices = [
    { id: 'rock', emoji: '🪨', label: 'Rock' },
    { id: 'paper', emoji: '📄', label: 'Paper' },
    { id: 'scissors', emoji: '✂️', label: 'Scissors' }
  ];

  const determineWinner = (player, computer) => {
    if (player === computer) return 'draw';
    
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'player';
    }
    
    return 'computer';
  };

  const handleChoice = (choice) => {
    if (isPlaying || gameOver) return;

    setIsPlaying(true);
    setPlayerChoice(choice);

    // Computer makes random choice
    const computerPick = choices[Math.floor(Math.random() * choices.length)].id;
    
    setTimeout(() => {
      setComputerChoice(computerPick);

      const winner = determineWinner(choice, computerPick);
      
      let resultText = '';
      let newPlayerScore = playerScore;
      let newComputerScore = computerScore;

      if (winner === 'player') {
        resultText = '🎉 You win this round!';
        newPlayerScore++;
        setPlayerScore(newPlayerScore);
      } else if (winner === 'computer') {
        resultText = '😅 Computer wins this round!';
        newComputerScore++;
        setComputerScore(newComputerScore);
      } else {
        resultText = '🤝 This round is a draw!';
      }

      setResult(resultText);

      // Check if game is over
      if (newPlayerScore === 2 || newComputerScore === 2 || round === 3) {
        setTimeout(() => {
          setGameOver(true);
          if (newPlayerScore > newComputerScore) {
            setTimeout(() => onGameComplete(), 2000);
          }
        }, 1500);
      } else {
        setTimeout(() => {
          setRound(round + 1);
          resetRound();
        }, 2000);
      }
    }, 1000);
  };

  const resetRound = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setIsPlaying(false);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setPlayerScore(0);
    setComputerScore(0);
    setRound(1);
    setIsPlaying(false);
    setGameOver(false);
  };

  return (
    <div className="rock-paper-scissors">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="game-title"
      >
        ✊ Rock Paper Scissors
      </motion.h2>

      <motion.div
        className="score-board"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="score">
          <span className="score-label">You</span>
          <span className="score-value">{playerScore}</span>
        </div>
        <div className="round-info">Round {round}/3</div>
        <div className="score">
          <span className="score-label">Computer</span>
          <span className="score-value">{computerScore}</span>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {!gameOver ? (
          <motion.div
            key="gameplay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {!playerChoice ? (
              <motion.div
                className="choices"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="instruction">Choose your move:</p>
                <div className="choice-buttons">
                  {choices.map((choice, index) => (
                    <motion.button
                      key={choice.id}
                      className="choice-btn"
                      onClick={() => handleChoice(choice.id)}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <span className="choice-emoji">{choice.emoji}</span>
                      <span className="choice-label">{choice.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="battle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="battle-area">
                  <motion.div
                    className="player-choice"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    <div className="choice-display">
                      {choices.find(c => c.id === playerChoice)?.emoji}
                    </div>
                    <p>You</p>
                  </motion.div>

                  <motion.div
                    className="vs"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    VS
                  </motion.div>

                  <motion.div
                    className="computer-choice"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="choice-display">
                      {computerChoice 
                        ? choices.find(c => c.id === computerChoice)?.emoji 
                        : '❓'}
                    </div>
                    <p>Computer</p>
                  </motion.div>
                </div>

                {result && (
                  <motion.p
                    className="result-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {result}
                  </motion.p>
                )}
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="gameover"
            className="game-over"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="game-over-title">
              {playerScore > computerScore 
                ? '🎊 You Won!' 
                : playerScore < computerScore 
                ? '😅 Computer Won!' 
                : "🤝 It's a Tie!"}
            </h3>
            <p className="final-score">
              Final Score: {playerScore} - {computerScore}
            </p>
            {playerScore <= computerScore && (
              <motion.button
                className="play-again-btn"
                onClick={resetGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔄 Play Again
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RockPaperScissors;
