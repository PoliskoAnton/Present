package com.birthday.giftapp.service;

import com.birthday.giftapp.dto.*;
import com.birthday.giftapp.model.GameSession;
import com.birthday.giftapp.repository.GameSessionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Service layer for game session management
 * Handles business logic for game progress tracking and reward claims
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class GameService {

    private final GameSessionRepository gameSessionRepository;

    /**
     * Create a new game session with unique session ID
     */
    @Transactional
    public GameProgressResponse createSession() {
        String sessionId = UUID.randomUUID().toString();
        
        GameSession session = GameSession.builder()
                .sessionId(sessionId)
                .ticTacToeCompleted(false)
                .rockPaperScissorsCompleted(false)
                .findTheGiftCompleted(false)
                .finalRewardClaimed(false)
                .build();
        
        gameSessionRepository.save(session);
        log.info("Created new game session: {}", sessionId);
        
        return buildProgressResponse(session, "New game session created! 🎉");
    }

    /**
     * Get progress for an existing session or create new one
     */
    @Transactional(readOnly = true)
    public GameProgressResponse getProgress(String sessionId) {
        if (sessionId == null || sessionId.isEmpty()) {
            throw new IllegalArgumentException("Session ID cannot be empty");
        }
        
        GameSession session = gameSessionRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found: " + sessionId));
        
        return buildProgressResponse(session, "Progress retrieved successfully");
    }

    /**
     * Mark a specific game as completed
     */
    @Transactional
    public GameProgressResponse completeGame(GameCompletionRequest request) {
        GameSession session = gameSessionRepository.findBySessionId(request.getSessionId())
                .orElseThrow(() -> new RuntimeException("Session not found: " + request.getSessionId()));
        
        // Update the specific game completion status
        switch (request.getGameType()) {
            case TIC_TAC_TOE:
                if (!session.isTicTacToeCompleted()) {
                    session.setTicTacToeCompleted(true);
                    log.info("Tic-Tac-Toe completed for session: {}", request.getSessionId());
                }
                break;
            case ROCK_PAPER_SCISSORS:
                if (!session.isRockPaperScissorsCompleted()) {
                    session.setRockPaperScissorsCompleted(true);
                    log.info("Rock-Paper-Scissors completed for session: {}", request.getSessionId());
                }
                break;
            case FIND_THE_GIFT:
                if (!session.isFindTheGiftCompleted()) {
                    session.setFindTheGiftCompleted(true);
                    log.info("Find-the-Gift completed for session: {}", request.getSessionId());
                }
                break;
        }
        
        gameSessionRepository.save(session);
        
        String message = session.allGamesCompleted() 
            ? "🎊 Congratulations! All games completed! Claim your reward!" 
            : "🎮 Game completed! Keep going!";
        
        return buildProgressResponse(session, message);
    }

    /**
     * Claim the final reward (only if all games completed)
     */
    @Transactional
    public RewardClaimResponse claimReward(RewardClaimRequest request) {
        GameSession session = gameSessionRepository.findBySessionId(request.getSessionId())
                .orElseThrow(() -> new RuntimeException("Session not found: " + request.getSessionId()));
        
        // Check if all games are completed
        if (!session.allGamesCompleted()) {
            return RewardClaimResponse.builder()
                    .sessionId(request.getSessionId())
                    .success(false)
                    .message("Cannot claim reward - not all games completed yet!")
                    .build();
        }
        
        // Check if reward already claimed
        if (session.isFinalRewardClaimed()) {
            return RewardClaimResponse.builder()
                    .sessionId(request.getSessionId())
                    .success(false)
                    .message("Reward already claimed!")
                    .claimedAt(session.getRewardClaimedAt())
                    .build();
        }
        
        // Claim the reward
        session.setFinalRewardClaimed(true);
        session.setRewardClaimedAt(LocalDateTime.now());
        gameSessionRepository.save(session);
        
        log.info("Final reward claimed for session: {}", request.getSessionId());
        
        return RewardClaimResponse.builder()
                .sessionId(request.getSessionId())
                .success(true)
                .message("🎁 Reward claimed successfully!")
                .claimedAt(session.getRewardClaimedAt())
                .rewardMessage("🎂 Happy Birthday! 🎉 You've completed all challenges and earned your special gift!")
                .build();
    }

    /**
     * Helper method to build progress response from session
     */
    private GameProgressResponse buildProgressResponse(GameSession session, String message) {
        return GameProgressResponse.builder()
                .sessionId(session.getSessionId())
                .ticTacToeCompleted(session.isTicTacToeCompleted())
                .rockPaperScissorsCompleted(session.isRockPaperScissorsCompleted())
                .findTheGiftCompleted(session.isFindTheGiftCompleted())
                .finalRewardClaimed(session.isFinalRewardClaimed())
                .allGamesCompleted(session.allGamesCompleted())
                .progressPercentage(session.getProgressPercentage())
                .message(message)
                .build();
    }
}
