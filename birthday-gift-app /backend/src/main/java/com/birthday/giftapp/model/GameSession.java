package com.birthday.giftapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Entity representing a user's game session
 * Tracks progress through all mini-games and final reward status
 */
@Entity
@Table(name = "game_sessions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String sessionId;

    // Game completion flags
    private boolean ticTacToeCompleted;
    private boolean rockPaperScissorsCompleted;
    private boolean findTheGiftCompleted;

    // Reward status
    private boolean finalRewardClaimed;

    // Timestamps
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime rewardClaimedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    /**
     * Check if all games are completed
     */
    public boolean allGamesCompleted() {
        return ticTacToeCompleted && rockPaperScissorsCompleted && findTheGiftCompleted;
    }

    /**
     * Get overall progress percentage
     */
    public int getProgressPercentage() {
        int completed = 0;
        if (ticTacToeCompleted) completed++;
        if (rockPaperScissorsCompleted) completed++;
        if (findTheGiftCompleted) completed++;
        return (completed * 100) / 3;
    }
}
