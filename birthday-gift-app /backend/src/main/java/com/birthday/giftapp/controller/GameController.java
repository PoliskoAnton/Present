package com.birthday.giftapp.controller;

import com.birthday.giftapp.dto.*;
import com.birthday.giftapp.service.GameService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for Birthday Gift Application
 * Provides endpoints for game session management, progress tracking, and reward claims
 */
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from React frontend
public class GameController {

    private final GameService gameService;

    /**
     * Health check endpoint
     * GET /api/health
     */
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("🎂 Birthday Gift Application is running!");
    }

    /**
     * Create a new game session
     * POST /api/session/create
     */
    @PostMapping("/session/create")
    public ResponseEntity<GameProgressResponse> createSession() {
        log.info("Creating new game session");
        GameProgressResponse response = gameService.createSession();
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Get game progress for a session
     * GET /api/progress?sessionId={sessionId}
     */
    @GetMapping("/progress")
    public ResponseEntity<GameProgressResponse> getProgress(
            @RequestParam String sessionId) {
        log.info("Getting progress for session: {}", sessionId);
        
        try {
            GameProgressResponse response = gameService.getProgress(sessionId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            log.error("Error getting progress: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Mark a game as completed
     * POST /api/game/complete
     */
    @PostMapping("/game/complete")
    public ResponseEntity<GameProgressResponse> completeGame(
            @Valid @RequestBody GameCompletionRequest request) {
        log.info("Completing game {} for session: {}", 
                request.getGameType(), request.getSessionId());
        
        try {
            GameProgressResponse response = gameService.completeGame(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            log.error("Error completing game: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Claim the final reward
     * POST /api/reward/claim
     */
    @PostMapping("/reward/claim")
    public ResponseEntity<RewardClaimResponse> claimReward(
            @Valid @RequestBody RewardClaimRequest request) {
        log.info("Claiming reward for session: {}", request.getSessionId());
        
        try {
            RewardClaimResponse response = gameService.claimReward(request);
            
            if (response.isSuccess()) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body(response);
            }
        } catch (RuntimeException e) {
            log.error("Error claiming reward: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Exception handler for validation errors
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        log.error("Validation error: {}", e.getMessage());
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    /**
     * Generic exception handler
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        log.error("Unexpected error: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An unexpected error occurred");
    }
}
