package com.birthday.giftapp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Response DTO for reward claim operations
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RewardClaimResponse {
    private String sessionId;
    private boolean success;
    private String message;
    private LocalDateTime claimedAt;
    private String rewardMessage;
}
