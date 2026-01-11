-- Performans optimizasyonları

-- Ek indeksler
CREATE INDEX IF NOT EXISTS idx_players_position ON players(position);
CREATE INDEX IF NOT EXISTS idx_players_league ON players(league);
CREATE INDEX IF NOT EXISTS idx_players_nationality ON players(nationality);
CREATE INDEX IF NOT EXISTS idx_players_age ON players(age);
CREATE INDEX IF NOT EXISTS idx_player_previous_teams_player_id ON player_previous_teams(player_id);
CREATE INDEX IF NOT EXISTS idx_player_previous_teams_team_id ON player_previous_teams(team_id);

-- Composite indeksler (birden fazla sütun)
CREATE INDEX IF NOT EXISTS idx_players_team_position ON players(team, position);
CREATE INDEX IF NOT EXISTS idx_players_league_team ON players(league, team);

-- Veritabanı istatistiklerini güncelle
ANALYZE players;
ANALYZE teams;
ANALYZE player_previous_teams;

-- Performans test sorguları
-- Bu sorgular büyük veri setlerinde hızlı çalışmalı:

-- 1. Rastgele oyuncu seçme (oyun için)
EXPLAIN ANALYZE SELECT * FROM players ORDER BY RANDOM() LIMIT 1;

-- 2. Takıma göre oyuncu arama
EXPLAIN ANALYZE SELECT * FROM players WHERE team = 'Manchester City';

-- 3. Pozisyona göre filtreleme
EXPLAIN ANALYZE SELECT * FROM players WHERE position = 'FW';

-- 4. Ortak oyuncu bulma (en karmaşık sorgu)
EXPLAIN ANALYZE 
WITH team1_players AS (
    SELECT DISTINCT p.id, p.name 
    FROM players p 
    LEFT JOIN player_previous_teams ppt ON p.id = ppt.player_id 
    WHERE p.team_id = 50 OR ppt.team_id = 50
),
team2_players AS (
    SELECT DISTINCT p.id, p.name 
    FROM players p 
    LEFT JOIN player_previous_teams ppt ON p.id = ppt.player_id 
    WHERE p.team_id = 40 OR ppt.team_id = 40
)
SELECT t1.id, t1.name 
FROM team1_players t1 
INNER JOIN team2_players t2 ON t1.id = t2.id;