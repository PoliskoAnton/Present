import { motion } from 'framer-motion';
import './FinalReward.css';

/**
 * Final Reward Component
 * Displayed after all games are completed
 */
const FinalReward = ({ onClaimReward, rewardClaimed, rewardMessage }) => {
  return (
    <div className="final-reward">
      <motion.div
        className="reward-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <motion.div
          className="celebration-icon"
          animate={{
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🎊
        </motion.div>

        <motion.h2
          className="reward-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Congratulations!
        </motion.h2>

        <motion.p
          className="reward-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          You've completed all three challenges! 🎮
        </motion.p>

        {!rewardClaimed ? (
          <motion.button
            className="claim-btn"
            onClick={onClaimReward}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            🎁 Claim Your Reward
          </motion.button>
        ) : (
          <motion.div
            className="reward-message"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <motion.div
              className="gift-icon"
              animate={{
                rotate: [0, -10, 10, -10, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              🎁
            </motion.div>
            <h3 className="reward-heading">Your Special Gift</h3>
            <p className="reward-content">{rewardMessage}</p>
            <div className="birthday-wishes">
              <p>May your day be filled with:</p>
              <div className="wishes-list">
                <motion.div
                  className="wish-item"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  💖 Love
                </motion.div>
                <motion.div
                  className="wish-item"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  😄 Joy
                </motion.div>
                <motion.div
                  className="wish-item"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  ✨ Magic
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Confetti Animation */}
      <div className="confetti-container">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="confetti-piece"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: ['#FF6B9D', '#FFC75F', '#C780FA', '#51CF66', '#FF8C42'][
                Math.floor(Math.random() * 5)
              ],
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
            initial={{ y: -100, rotate: 0 }}
            animate={{
              y: window.innerHeight + 100,
              rotate: 720,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FinalReward;
