import { motion } from 'framer-motion';
import './LandingPage.css';

/**
 * Landing Page - Initial screen with closed gift box
 * User must open the gift to reveal games
 */
const LandingPage = ({ onGiftOpen }) => {
  return (
    <div className="landing-page">
      <motion.div
        className="content-wrapper"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="birthday-title"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          🎂 Happy Birthday! 🎉
        </motion.h1>
        
        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Someone special has prepared a gift for you...
        </motion.p>

        <motion.div
          className="gift-container"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.9, duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <motion.div
            className="gift-box"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGiftOpen}
          >
            <div className="gift-top">
              <div className="gift-ribbon-horizontal"></div>
              <div className="gift-ribbon-vertical"></div>
              <div className="gift-bow">🎀</div>
            </div>
            <div className="gift-bottom"></div>
            
            <motion.div
              className="gift-sparkle"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✨
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.p
          className="instruction"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          Click the gift to open it! 🎁
        </motion.p>
      </motion.div>

      {/* Floating confetti decorations */}
      <div className="decoration-container">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
            initial={{ y: -50 }}
            animate={{ y: '110vh' }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
            }}
          >
            {['🎈', '🎊', '🎉', '🌟', '💝'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
