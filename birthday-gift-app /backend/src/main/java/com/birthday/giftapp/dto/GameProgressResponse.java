package com.birthday.giftapp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response DTO for game progress information
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameProgressResponse {
    private String sessionId;
    private boolean ticTacToeCompleted;
    private boolean rockPaperScissorsCompleted;
    private boolean findTheGiftCompleted;
    private boolean finalRewardClaimed;
    private boolean allGamesCompleted;
    private int progressPercentage;
    private String message;
}
