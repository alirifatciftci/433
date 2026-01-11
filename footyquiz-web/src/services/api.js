const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Tüm oyuncuları getir
  async getAllPlayers() {
    return this.request("/api/players");
  }

  // Rastgele oyuncu getir
  async getRandomPlayer() {
    return this.request("/api/players/random");
  }

  // Takıma göre oyuncuları getir
  async getPlayersByTeam(teamId) {
    return this.request(`/api/players/team/${teamId}`);
  }

  // Ortak oyuncuları bul
  async getCommonPlayers(team1Id, team2Id) {
    return this.request(`/api/players/common/${team1Id}/${team2Id}`);
  }

  // Tüm takımları getir
  async getAllTeams() {
    return this.request("/api/teams");
  }

  // Skor kaydet
  async saveScore(
    userId,
    gameType,
    score,
    attempts,
    timeTaken,
    playerName,
    sessionData
  ) {
    return this.request("/api/scores", {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        game_type: gameType,
        score: score,
        attempts: attempts,
        time_taken: timeTaken,
        player_name: playerName,
        session_data: sessionData,
      }),
    });
  }

  // Kullanıcı oluştur/getir
  async createOrGetUser(username, displayName, email) {
    return this.request("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        display_name: displayName,
        email: email,
      }),
    });
  }

  // Kullanıcı bilgilerini getir
  async getUser(username) {
    return this.request(`/api/users/${username}`);
  }

  // Bugünün daily challenge'ını getir
  async getDailyChallenge() {
    return this.request("/api/daily-challenge");
  }

  // Daily challenge sonucunu kaydet
  async saveDailyChallengeResult(
    userId,
    challengeId,
    score,
    attempts,
    timeTaken,
    resultData
  ) {
    return this.request("/api/daily-challenge/result", {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        challenge_id: challengeId,
        score: score,
        attempts: attempts,
        time_taken: timeTaken,
        result_data: resultData,
      }),
    });
  }

  // Leaderboard'ları getir
  async getDailyLeaderboard() {
    return this.request("/api/leaderboard/daily");
  }

  async getWeeklyLeaderboard() {
    return this.request("/api/leaderboard/weekly");
  }

  async getAllTimeLeaderboard() {
    return this.request("/api/leaderboard/all-time");
  }

  // Kullanıcının bugünkü durumunu kontrol et
  async getUserDailyStatus(userId) {
    return this.request(`/api/users/${userId}/daily-status`);
  }
}

export default new ApiService();
