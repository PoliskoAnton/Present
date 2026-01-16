import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './TicTacToe.css';

/**
 * Tic-Tac-Toe Game Component
 * User (X) vs Computer (O)
 */
const TicTacToe = ({ onGameComplete }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);

  // Check for winner
  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line };
      }
    }
    
    // Check for draw
    if (squares.every(square => square !== null)) {
      return { winner: 'draw', line: [] };
    }
    
    return null;
  };

  // Computer AI (random strategy with slight intelligence)
  const makeComputerMove = (currentBoard) => {
    const availableMoves = currentBoard
      .map((val, idx) => val === null ? idx : null)
      .filter(val => val !== null);

    if (availableMoves.length === 0) return;

    // Check if computer can win
    for (let move of availableMoves) {
      const testBoard = [...currentBoard];
      testBoard[move] = 'O';
      const result = checkWinner(testBoard);
      if (result && result.winner === 'O') {
        return move;
      }
    }

    // Block player from winning
    for (let move of availableMoves) {
      const testBoard = [...currentBoard];
      testBoard[move] = 'X';
      const result = checkWinner(testBoard);
      if (result && result.winner === 'X') {
        return move;
      }
    }

    // Take center if available
    if (availableMoves.includes(4)) {
      return 4;
    }

    // Take random corner
    const corners = [0, 2, 6, 8].filter(i => availableMoves.includes(i));
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    // Take random available move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  // Handle player click
  const handleClick = (index) => {
    if (board[index] || winner || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      if (result.winner === 'X') {
        setTimeout(() => onGameComplete(), 1500);
      }
      return;
    }

    setIsPlayerTurn(false);
  };

  // Computer turn
  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(() => {
        const computerMove = makeComputerMove(board);
        if (computerMove !== undefined) {
          const newBoard = [...board];
          newBoard[computerMove] = 'O';
          setBoard(newBoard);

          const result = checkWinner(newBoard);
          if (result) {
            setWinner(result.winner);
            setWinningLine(result.line);
          } else {
            setIsPlayerTurn(true);
          }
        }
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner, board]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setWinningLine([]);
  };

  return (
    <div className="tic-tac-toe">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="game-title"
      >
        🎮 Tic-Tac-Toe
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="game-instruction"
      >
        {winner 
          ? winner === 'X' 
            ? '🎉 You Won! Great job!' 
            : winner === 'O' 
            ? '😅 Computer wins. Try again!' 
            : "😊 It's a draw!"
          : isPlayerTurn 
          ? "Your turn (X)" 
          : "Computer thinking... (O)"}
      </motion.p>

      <motion.div
        className="board"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        {board.map((cell, index) => (
          <motion.button
            key={index}
            className={`cell ${cell} ${winningLine.includes(index) ? 'winning' : ''}`}
            onClick={() => handleClick(index)}
            disabled={cell !== null || winner !== null || !isPlayerTurn}
            whileHover={{ scale: cell === null && !winner ? 1.05 : 1 }}
            whileTap={{ scale: cell === null && !winner ? 0.95 : 1 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.05 }}
          >
            {cell && (
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {cell}
              </motion.span>
            )}
          </motion.button>
        ))}
      </motion.div>

      {winner && winner !== 'X' && (
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

export default TicTacToe;
