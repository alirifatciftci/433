-- Eksik takımları ekle
INSERT INTO teams (id, name, logo_url, league, league_logo) VALUES
-- Super Lig
(645, 'Galatasaray', 'https://media.api-sports.io/football/teams/645.png', 'Super Lig', 'https://media.api-sports.io/football/leagues/203.png'),
(610, 'Fenerbahce', 'https://upload.wikimedia.org/wikipedia/tr/8/86/Fenerbah%C3%A7e_SK.png', 'Super Lig', 'https://media.api-sports.io/football/leagues/203.png'),

-- Saudi Pro League
(2931, 'Al Nassr', 'https://media.api-sports.io/football/teams/2931.png', 'Saudi Pro League', 'https://media.api-sports.io/football/leagues/307.png'),
(2932, 'Al Ittihad', 'https://media.api-sports.io/football/teams/2932.png', 'Saudi Pro League', 'https://media.api-sports.io/football/leagues/307.png'),
(2939, 'Al Hilal', 'https://media.api-sports.io/football/teams/2939.png', 'Saudi Pro League', 'https://media.api-sports.io/football/leagues/307.png'),

-- MLS
(1604, 'LA Galaxy', 'https://media.api-sports.io/football/teams/1604.png', 'MLS', 'https://media.api-sports.io/football/leagues/253.png'),

-- Ligue 1
(85, 'PSG', 'https://media.api-sports.io/football/teams/85.png', 'Ligue 1', 'https://media.api-sports.io/football/leagues/61.png'),
(91, 'Monaco', 'https://media.api-sports.io/football/teams/91.png', 'Ligue 1', 'https://media.api-sports.io/football/leagues/61.png'),

-- Serie A
(489, 'AC Milan', 'https://media.api-sports.io/football/teams/489.png', 'Serie A', 'https://media.api-sports.io/football/leagues/135.png'),
(492, 'Napoli', 'https://media.api-sports.io/football/teams/492.png', 'Serie A', 'https://media.api-sports.io/football/leagues/135.png'),
(496, 'Juventus', 'https://media.api-sports.io/football/teams/496.png', 'Serie A', 'https://media.api-sports.io/football/leagues/135.png'),
(505, 'Inter Milan', 'https://media.api-sports.io/football/teams/505.png', 'Serie A', 'https://media.api-sports.io/football/leagues/135.png'),
(497, 'AS Roma', 'https://media.api-sports.io/football/teams/497.png', 'Serie A', 'https://media.api-sports.io/football/leagues/135.png'),

-- La Liga
(530, 'Atletico Madrid', 'https://media.api-sports.io/football/teams/530.png', 'La Liga', 'https://media.api-sports.io/football/leagues/140.png'),
(536, 'Sevilla', 'https://media.api-sports.io/football/teams/536.png', 'La Liga', 'https://media.api-sports.io/football/leagues/140.png'),

-- Bundesliga
(168, 'Bayer Leverkusen', 'https://media.api-sports.io/football/teams/168.png', 'Bundesliga', 'https://media.api-sports.io/football/leagues/78.png'),
(173, 'RB Leipzig', 'https://media.api-sports.io/football/teams/173.png', 'Bundesliga', 'https://media.api-sports.io/football/leagues/78.png'),

-- Premier League
(47, 'Tottenham', 'https://media.api-sports.io/football/teams/47.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png'),
(48, 'West Ham', 'https://media.api-sports.io/football/teams/48.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png'),
(66, 'Aston Villa', 'https://media.api-sports.io/football/teams/66.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png'),
(34, 'Newcastle', 'https://media.api-sports.io/football/teams/34.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png'),

-- Diğer takımlar
(212, 'Sporting CP', 'https://media.api-sports.io/football/teams/212.png', 'Primeira Liga', 'https://media.api-sports.io/football/leagues/94.png'),
(211, 'Benfica', 'https://media.api-sports.io/football/teams/211.png', 'Primeira Liga', 'https://media.api-sports.io/football/leagues/94.png'),
(124, 'Santos', 'https://media.api-sports.io/football/teams/124.png', 'Brasileirao', 'https://media.api-sports.io/football/leagues/71.png'),
(79, 'Lille', 'https://media.api-sports.io/football/teams/79.png', 'Ligue 1', 'https://media.api-sports.io/football/leagues/61.png'),
(80, 'Lyon', 'https://media.api-sports.io/football/teams/80.png', 'Ligue 1', 'https://media.api-sports.io/football/leagues/61.png'),
(1, 'Bryne FK', 'https://media.api-sports.io/football/teams/1.png', 'Eliteserien', 'https://media.api-sports.io/football/leagues/103.png'),
(569, 'Molde FK', 'https://media.api-sports.io/football/teams/569.png', 'Eliteserien', 'https://media.api-sports.io/football/leagues/103.png'),
(584, 'Cagliari', 'https://media.api-sports.io/football/teams/584.png', 'Serie A', 'https://media.api-sports.io/football/leagues/135.png')

ON CONFLICT (id) DO NOTHING;