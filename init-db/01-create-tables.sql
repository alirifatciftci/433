-- FootyQuiz Veritabanı Tabloları

-- Takımlar tablosu
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    logo_url TEXT,
    league VARCHAR(100),
    league_logo TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Oyuncular tablosu
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    nationality VARCHAR(3),
    nationality_flag TEXT,
    league VARCHAR(100),
    league_logo TEXT,
    team VARCHAR(100),
    team_id INTEGER,
    team_logo TEXT,
    position VARCHAR(10),
    age INTEGER,
    shirt_number INTEGER,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Oyuncuların önceki takımları
CREATE TABLE player_previous_teams (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id),
    team_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Oyun skorları
CREATE TABLE game_scores (
    id SERIAL PRIMARY KEY,
    player_name VARCHAR(100),
    game_type VARCHAR(50),
    score INTEGER,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- İndeksler
CREATE INDEX idx_players_name ON players(name);
CREATE INDEX idx_players_team ON players(team);
CREATE INDEX idx_teams_name ON teams(name);
CREATE INDEX idx_game_scores_type ON game_scores(game_type);