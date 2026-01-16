import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * API Service for communicating with Spring Boot backend
 */
const GameAPI = {
  /**
   * Create a new game session
   */
  createSession: async () => {
    const response = await apiClient.post('/session/create');
    return response.data;
  },

  /**
   * Get progress for a session
   */
  getProgress: async (sessionId) => {
    const response = await apiClient.get(`/progress?sessionId=${sessionId}`);
    return response.data;
  },

  /**
   * Mark a game as completed
   */
  completeGame: async (sessionId, gameType) => {
    const response = await apiClient.post('/game/complete', {
      sessionId,
      gameType,
    });
    return response.data;
  },

  /**
   * Claim the final reward
   */
  claimReward: async (sessionId) => {
    const response = await apiClient.post('/reward/claim', {
      sessionId,
    });
    return response.data;
  },

  /**
   * Health check
   */
  healthCheck: async () => {
    const response = await apiClient.get('/health');
    return response.data;
  },
};

export default GameAPI;
