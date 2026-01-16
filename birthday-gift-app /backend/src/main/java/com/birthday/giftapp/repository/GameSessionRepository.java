package com.birthday.giftapp.repository;

import com.birthday.giftapp.model.GameSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for GameSession entity
 * Provides database operations for game session management
 */
@Repository
public interface GameSessionRepository extends JpaRepository<GameSession, Long> {
    
    /**
     * Find a game session by session ID
     */
    Optional<GameSession> findBySessionId(String sessionId);
    
    /**
     * Check if a session exists by session ID
     */
    boolean existsBySessionId(String sessionId);
}
