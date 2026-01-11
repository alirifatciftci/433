const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL bağlantısı
const pool = new Pool({
  user: process.env.DB_USER || "footyquiz_user",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "footyquiz",
  password: process.env.DB_PASSWORD || "footyquiz_pass",
  port: process.env.DB_PORT || 5432,
});

// Test endpoint
app.get("/api/health", (req, res) => {
  res.json({ message: "FootyQuiz API is running!" });
});

// Tüm oyuncuları getir
app.get("/api/players", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM players ORDER BY name");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Rastgele oyuncu getir
app.get("/api/players/random", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM players ORDER BY RANDOM() LIMIT 1"
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Takıma göre oyuncuları getir
app.get("/api/players/team/:teamId", async (req, res) => {
  try {
    const { teamId } = req.params;
    const result = await pool.query(
      "SELECT * FROM players WHERE team_id = $1",
      [teamId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Ortak oyuncuları bul
app.get("/api/players/common/:team1/:team2", async (req, res) => {
  try {
    const { team1, team2 } = req.params;

    const query = `
      WITH team1_players AS (
        SELECT DISTINCT p.* 
        FROM players p 
        LEFT JOIN player_previous_teams ppt ON p.id = ppt.player_id 
        WHERE p.team_id = $1 OR ppt.team_id = $1
      ),
      team2_players AS (
        SELECT DISTINCT p.* 
        FROM players p 
        LEFT JOIN player_previous_teams ppt ON p.id = ppt.player_id 
        WHERE p.team_id = $2 OR ppt.team_id = $2
      )
      SELECT t1.* 
      FROM team1_players t1 
      INNER JOIN team2_players t2 ON t1.id = t2.id
    `;

    const result = await pool.query(query, [team1, team2]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Tüm takımları getir
app.get("/api/teams", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM teams ORDER BY name");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Skor kaydet
app.post("/api/scores", async (req, res) => {
  try {
    const {
      user_id,
      game_type,
      score,
      attempts,
      time_taken,
      player_name,
      session_data,
    } = req.body;
    const result = await pool.query(
      "INSERT INTO game_scores (user_id, game_type, score, attempts, time_taken, player_name, session_data) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        user_id,
        game_type,
        score,
        attempts,
        time_taken,
        player_name,
        JSON.stringify(session_data),
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Kullanıcı oluştur/getir
app.post("/api/users", async (req, res) => {
  try {
    const { username, display_name, email } = req.body;
    const result = await pool.query(
      "INSERT INTO users (username, display_name, email) VALUES ($1, $2, $3) ON CONFLICT (username) DO UPDATE SET last_login = CURRENT_TIMESTAMP RETURNING *",
      [username, display_name, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Kullanıcı bilgilerini getir
app.get("/api/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Bugünün daily challenge'ını getir
app.get("/api/daily-challenge", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT dc.*, p.name as target_player_name, p.team, p.position, p.nationality
      FROM daily_challenges dc
      LEFT JOIN players p ON dc.target_player_id = p.id
      WHERE dc.challenge_date = CURRENT_DATE AND dc.is_active = true
      LIMIT 1
    `);

    if (result.rows.length === 0) {
      // Bugün için challenge yoksa oluştur
      const randomPlayer = await pool.query(
        "SELECT * FROM players ORDER BY RANDOM() LIMIT 1"
      );
      const newChallenge = await pool.query(
        "INSERT INTO daily_challenges (challenge_date, challenge_type, target_player_id) VALUES (CURRENT_DATE, $1, $2) RETURNING *",
        ["guess_player", randomPlayer.rows[0].id]
      );

      const challengeWithPlayer = await pool.query(
        `
        SELECT dc.*, p.name as target_player_name, p.team, p.position, p.nationality
        FROM daily_challenges dc
        LEFT JOIN players p ON dc.target_player_id = p.id
        WHERE dc.id = $1
      `,
        [newChallenge.rows[0].id]
      );

      res.json(challengeWithPlayer.rows[0]);
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Daily challenge sonucunu kaydet
app.post("/api/daily-challenge/result", async (req, res) => {
  try {
    const { user_id, challenge_id, score, attempts, time_taken, result_data } =
      req.body;

    const result = await pool.query(
      `INSERT INTO user_daily_results (user_id, challenge_id, score, attempts, time_taken, result_data) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       ON CONFLICT (user_id, challenge_id) 
       DO UPDATE SET score = EXCLUDED.score, attempts = EXCLUDED.attempts, time_taken = EXCLUDED.time_taken, result_data = EXCLUDED.result_data
       RETURNING *`,
      [
        user_id,
        challenge_id,
        score,
        attempts,
        time_taken,
        JSON.stringify(result_data),
      ]
    );

    // Kullanıcının toplam skorunu güncelle
    await pool.query(
      "UPDATE users SET total_score = total_score + $1, games_played = games_played + 1 WHERE id = $2",
      [score, user_id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Günlük leaderboard
app.get("/api/leaderboard/daily", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM daily_leaderboard ORDER BY rank LIMIT 50"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Haftalık leaderboard
app.get("/api/leaderboard/weekly", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM weekly_leaderboard ORDER BY rank LIMIT 50"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Tüm zamanların leaderboard'u
app.get("/api/leaderboard/all-time", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM all_time_leaderboard ORDER BY rank LIMIT 50"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Kullanıcının daily challenge durumunu kontrol et
app.get("/api/users/:userId/daily-status", async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      `
      SELECT udr.*, dc.challenge_date, dc.challenge_type
      FROM user_daily_results udr
      JOIN daily_challenges dc ON udr.challenge_id = dc.id
      WHERE udr.user_id = $1 AND dc.challenge_date = CURRENT_DATE
    `,
      [userId]
    );

    res.json({
      hasCompletedToday: result.rows.length > 0,
      result: result.rows[0] || null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(port, () => {
  console.log(`FootyQuiz API running on port ${port}`);
});
