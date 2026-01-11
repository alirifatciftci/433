-- Örnek takım verileri
INSERT INTO teams (id, name, logo_url, league, league_logo) VALUES
(50, 'Manchester City', 'https://media.api-sports.io/football/teams/50.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png'),
(40, 'Liverpool', 'https://media.api-sports.io/football/teams/40.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png'),
(42, 'Arsenal', 'https://media.api-sports.io/football/teams/42.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png'),
(33, 'Manchester United', 'https://media.api-sports.io/football/teams/33.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png'),
(49, 'Chelsea', 'https://media.api-sports.io/football/teams/49.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png'),
(541, 'Real Madrid', 'https://media.api-sports.io/football/teams/541.png', 'La Liga', 'https://media.api-sports.io/football/leagues/140.png'),
(529, 'Barcelona', 'https://media.api-sports.io/football/teams/529.png', 'La Liga', 'https://media.api-sports.io/football/leagues/140.png'),
(157, 'Bayern Munich', 'https://media.api-sports.io/football/teams/157.png', 'Bundesliga', 'https://media.api-sports.io/football/leagues/78.png'),
(165, 'Borussia Dortmund', 'https://media.api-sports.io/football/teams/165.png', 'Bundesliga', 'https://media.api-sports.io/football/leagues/78.png');

-- Örnek oyuncu verileri
INSERT INTO players (id, name, nationality, nationality_flag, league, league_logo, team, team_id, team_logo, position, age, shirt_number, image_url) VALUES
(1, 'Erling Haaland', 'NO', 'https://flagcdn.com/w80/no.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png', 'Manchester City', 50, 'https://media.api-sports.io/football/teams/50.png', 'FW', 24, 9, 'https://media.api-sports.io/football/players/152998.png'),
(2, 'Mohamed Salah', 'EG', 'https://flagcdn.com/w80/eg.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png', 'Liverpool', 40, 'https://media.api-sports.io/football/teams/40.png', 'FW', 32, 11, 'https://media.api-sports.io/football/players/306.png'),
(3, 'Kylian Mbappe', 'FR', 'https://flagcdn.com/w80/fr.png', 'La Liga', 'https://media.api-sports.io/football/leagues/140.png', 'Real Madrid', 541, 'https://media.api-sports.io/football/teams/541.png', 'FW', 25, 9, 'https://media.api-sports.io/football/players/1313.png');

-- Oyuncuların önceki takımları
INSERT INTO player_previous_teams (player_id, team_id) VALUES
(1, 1),    -- Haaland - Bryne FK
(1, 569),  -- Haaland - Molde FK  
(1, 165),  -- Haaland - Borussia Dortmund
(2, 50),   -- Salah - Chelsea (önceki)
(2, 584);  -- Salah - AS Roma