package com.birthday.giftapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request DTO for marking a game as completed
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameCompletionRequest {
    
    @NotBlank(message = "Session ID is required")
    private String sessionId;
    
    @NotNull(message = "Game type is required")
    private GameType gameType;
    
    public enum GameType {
        TIC_TAC_TOE,
        ROCK_PAPER_SCISSORS,
        FIND_THE_GIFT
    }
}
