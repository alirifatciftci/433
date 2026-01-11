-- Kullanıcı sistemi ve Daily Challenge tabloları

-- Kullanıcılar tablosu
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    display_name VARCHAR(100),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_score INTEGER DEFAULT 0,
    games_played INTEGER DEFAULT 0
);

-- Daily Challenge tablosu (her gün için bir challenge)
CREATE TABLE daily_challenges (
    id SERIAL PRIMARY KEY,
    challenge_date DATE UNIQUE NOT NULL,
    challenge_type VARCHAR(50) NOT NULL, -- 'guess_player', 'common_player', 'grid_game'
    target_player_id INTEGER REFERENCES players(id),
    team1_id INTEGER,
    team2_id INTEGER,
    grid_config JSONB, -- Grid oyunu için konfigürasyon
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kullanıcı Daily Challenge sonuçları
CREATE TABLE user_daily_results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    challenge_id INTEGER REFERENCES daily_challenges(id),
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    score INTEGER NOT NULL,
    attempts INTEGER NOT NULL,
    time_taken INTEGER, -- saniye cinsinden
    is_completed BOOLEAN DEFAULT true,
    result_data JSONB, -- Detaylı sonuç bilgileri
    UNIQUE(user_id, challenge_id) -- Bir kullanıcı bir challenge'ı sadece bir kez yapabilir
);

-- Genel oyun skorları (mevcut tabloyu güncelle)
DROP TABLE IF EXISTS game_scores;
CREATE TABLE game_scores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    game_type VARCHAR(50) NOT NULL,
    score INTEGER NOT NULL,
    attempts INTEGER,
    time_taken INTEGER,
    player_name VARCHAR(100),
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    session_data JSONB
);

-- Leaderboard view'ları
CREATE OR REPLACE VIEW daily_leaderboard AS
SELECT 
    u.username,
    u.display_name,
    u.avatar_url,
    udr.score,
    udr.attempts,
    udr.time_taken,
    udr.completed_at,
    dc.challenge_date,
    dc.challenge_type,
    ROW_NUMBER() OVER (PARTITION BY dc.challenge_date ORDER BY udr.score DESC, udr.attempts ASC, udr.time_taken ASC) as rank
FROM user_daily_results udr
JOIN users u ON udr.user_id = u.id
JOIN daily_challenges dc ON udr.challenge_id = dc.id
WHERE dc.challenge_date = CURRENT_DATE;

CREATE OR REPLACE VIEW weekly_leaderboard AS
SELECT 
    u.username,
    u.display_name,
    u.avatar_url,
    SUM(udr.score) as total_score,
    COUNT(udr.id) as challenges_completed,
    AVG(udr.score) as avg_score,
    ROW_NUMBER() OVER (ORDER BY SUM(udr.score) DESC, COUNT(udr.id) DESC) as rank
FROM user_daily_results udr
JOIN users u ON udr.user_id = u.id
JOIN daily_challenges dc ON udr.challenge_id = dc.id
WHERE dc.challenge_date >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY u.id, u.username, u.display_name, u.avatar_url;

CREATE OR REPLACE VIEW all_time_leaderboard AS
SELECT 
    u.username,
    u.display_name,
    u.avatar_url,
    u.total_score,
    u.games_played,
    CASE WHEN u.games_played > 0 THEN u.total_score::FLOAT / u.games_played ELSE 0 END as avg_score,
    ROW_NUMBER() OVER (ORDER BY u.total_score DESC, u.games_played DESC) as rank
FROM users u
WHERE u.games_played > 0;

-- İndeksler
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_daily_challenges_date ON daily_challenges(challenge_date);
CREATE INDEX idx_user_daily_results_user_challenge ON user_daily_results(user_id, challenge_id);
CREATE INDEX idx_user_daily_results_challenge_score ON user_daily_results(challenge_id, score DESC);
CREATE INDEX idx_game_scores_user_type ON game_scores(user_id, game_type);

-- Örnek kullanıcılar
INSERT INTO users (username, display_name, avatar_url) VALUES
('guest_user', 'Misafir Kullanıcı', 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest'),
('player1', 'Futbol Aşığı', 'https://api.dicebear.com/7.x/avataaars/svg?seed=player1'),
('player2', 'Quiz Master', 'https://api.dicebear.com/7.x/avataaars/svg?seed=player2');

-- Bugün için örnek daily challenge
INSERT INTO daily_challenges (challenge_date, challenge_type, target_player_id) 
SELECT CURRENT_DATE, 'guess_player', id 
FROM players ORDER BY RANDOM() LIMIT 1;