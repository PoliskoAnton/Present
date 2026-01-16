package com.birthday.giftapp.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request DTO for claiming the final reward
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RewardClaimRequest {
    
    @NotBlank(message = "Session ID is required")
    private String sessionId;
}
