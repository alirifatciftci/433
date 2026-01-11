-- Tüm oyuncuları veritabanına ekle
DELETE FROM player_previous_teams;
DELETE FROM players WHERE id > 3;

-- Oyuncuları ekle
INSERT INTO players (id, name, nationality, nationality_flag, league, league_logo, team, team_id, team_logo, position, age, shirt_number, image_url) VALUES
(4, 'Vinicius Junior', 'BR', 'https://flagcdn.com/w80/br.png', 'La Liga', 'https://media.api-sports.io/football/leagues/140.png', 'Real Madrid', 541, 'https://media.api-sports.io/football/teams/541.png', 'FW', 24, 7, 'https://media.api-sports.io/football/players/5845.png'),
(5, 'Mohamed Salah', 'EG', 'https://flagcdn.com/w80/eg.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png', 'Liverpool', 40, 'https://media.api-sports.io/football/teams/40.png', 'FW', 32, 11, 'https://media.api-sports.io/football/players/306.png'),
(6, 'Kevin De Bruyne', 'BE', 'https://flagcdn.com/w80/be.png', 'Serie A', 'https://media.api-sports.io/football/leagues/135.png', 'Napoli', 492, 'https://media.api-sports.io/football/teams/492.png', 'MF', 33, 11, 'https://media.api-sports.io/football/players/627.png'),
(7, 'Bukayo Saka', 'GB', 'https://flagcdn.com/w80/gb-eng.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png', 'Arsenal', 42, 'https://media.api-sports.io/football/teams/42.png', 'FW', 23, 7, 'https://media.api-sports.io/football/players/138926.png'),
(8, 'Rodri', 'ES', 'https://flagcdn.com/w80/es.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png', 'Manchester City', 50, 'https://media.api-sports.io/football/teams/50.png', 'MF', 28, 16, 'https://media.api-sports.io/football/players/47471.png'),
(9, 'Lamine Yamal', 'ES', 'https://flagcdn.com/w80/es.png', 'La Liga', 'https://media.api-sports.io/football/leagues/140.png', 'Barcelona', 529, 'https://media.api-sports.io/football/teams/529.png', 'FW', 17, 10, 'https://media.api-sports.io/football/players/406105.png'),
(10, 'Robert Lewandowski', 'PL', 'https://flagcdn.com/w80/pl.png', 'La Liga', 'https://media.api-sports.io/football/leagues/140.png', 'Barcelona', 529, 'https://media.api-sports.io/football/teams/529.png', 'FW', 36, 9, 'https://media.api-sports.io/football/players/521.png'),
(11, 'Harry Kane', 'GB', 'https://flagcdn.com/w80/gb-eng.png', 'Bundesliga', 'https://media.api-sports.io/football/leagues/78.png', 'Bayern Munich', 157, 'https://media.api-sports.io/football/teams/157.png', 'FW', 31, 9, 'https://media.api-sports.io/football/players/184.png'),
(12, 'Jamal Musiala', 'DE', 'https://flagcdn.com/w80/de.png', 'Bundesliga', 'https://media.api-sports.io/football/leagues/78.png', 'Bayern Munich', 157, 'https://media.api-sports.io/football/teams/157.png', 'MF', 21, 10, 'https://media.api-sports.io/football/players/162054.png'),
(13, 'Cole Palmer', 'GB', 'https://flagcdn.com/w80/gb-eng.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png', 'Chelsea', 49, 'https://media.api-sports.io/football/teams/49.png', 'MF', 22, 10, 'https://media.api-sports.io/football/players/290849.png'),
(14, 'Phil Foden', 'GB', 'https://flagcdn.com/w80/gb-eng.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png', 'Manchester City', 50, 'https://media.api-sports.io/football/teams/50.png', 'MF', 24, 47, 'https://media.api-sports.io/football/players/186590.png'),
(15, 'Bruno Fernandes', 'PT', 'https://flagcdn.com/w80/pt.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png', 'Manchester United', 33, 'https://media.api-sports.io/football/teams/33.png', 'MF', 30, 8, 'https://media.api-sports.io/football/players/1485.png'),
(16, 'Victor Osimhen', 'NG', 'https://flagcdn.com/w80/ng.png', 'Super Lig', 'https://media.api-sports.io/football/leagues/203.png', 'Galatasaray', 645, 'https://media.api-sports.io/football/teams/645.png', 'FW', 25, 45, 'https://media.api-sports.io/football/players/47380.png'),
(17, 'Son Heung-min', 'KR', 'https://flagcdn.com/w80/kr.png', 'MLS', 'https://media.api-sports.io/football/leagues/253.png', 'LA Galaxy', 1604, 'https://media.api-sports.io/football/teams/1604.png', 'FW', 32, 17, 'https://media.api-sports.io/football/players/186.png'),
(18, 'Virgil van Dijk', 'NL', 'https://flagcdn.com/w80/nl.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png', 'Liverpool', 40, 'https://media.api-sports.io/football/teams/40.png', 'DF', 33, 4, 'https://media.api-sports.io/football/players/647.png'),
(19, 'Arda Guler', 'TR', 'https://flagcdn.com/w80/tr.png', 'La Liga', 'https://media.api-sports.io/football/leagues/140.png', 'Real Madrid', 541, 'https://media.api-sports.io/football/teams/541.png', 'MF', 19, 15, 'https://media.api-sports.io/football/players/286781.png'),
(20, 'Declan Rice', 'GB', 'https://flagcdn.com/w80/gb-eng.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png', 'Arsenal', 42, 'https://media.api-sports.io/football/teams/42.png', 'MF', 25, 41, 'https://media.api-sports.io/football/players/180534.png'),
(21, 'Pedri', 'ES', 'https://flagcdn.com/w80/es.png', 'La Liga', 'https://media.api-sports.io/football/leagues/140.png', 'Barcelona', 529, 'https://media.api-sports.io/football/teams/529.png', 'MF', 22, 8, 'https://media.api-sports.io/football/players/161944.png'),
(22, 'Gavi', 'ES', 'https://flagcdn.com/w80/es.png', 'La Liga', 'https://media.api-sports.io/football/leagues/140.png', 'Barcelona', 529, 'https://media.api-sports.io/football/teams/529.png', 'MF', 20, 6, 'https://media.api-sports.io/football/players/286119.png'),
(23, 'Florian Wirtz', 'DE', 'https://flagcdn.com/w80/de.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png', 'Liverpool', 40, 'https://media.api-sports.io/football/teams/40.png', 'MF', 21, 7, 'https://media.api-sports.io/football/players/162051.png'),
(24, 'Khvicha Kvaratskhelia', 'GE', 'https://flagcdn.com/w80/ge.png', 'Ligue 1', 'https://media.api-sports.io/football/leagues/61.png', 'PSG', 85, 'https://media.api-sports.io/football/teams/85.png', 'FW', 23, 7, 'https://media.api-sports.io/football/players/50068.png'),
(25, 'Rafael Leao', 'PT', 'https://flagcdn.com/w80/pt.png', 'Serie A', 'https://media.api-sports.io/football/leagues/135.png', 'AC Milan', 489, 'https://media.api-sports.io/football/teams/489.png', 'FW', 25, 10, 'https://media.api-sports.io/football/players/19194.png'),
(26, 'Trent Alexander-Arnold', 'GB', 'https://flagcdn.com/w80/gb-eng.png', 'La Liga', 'https://media.api-sports.io/football/leagues/140.png', 'Real Madrid', 541, 'https://media.api-sports.io/football/teams/541.png', 'DF', 26, 12, 'https://media.api-sports.io/football/players/882.png'),
(27, 'Martin Odegaard', 'NO', 'https://flagcdn.com/w80/no.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png', 'Arsenal', 42, 'https://media.api-sports.io/football/teams/42.png', 'MF', 25, 8, 'https://media.api-sports.io/football/players/2833.png'),
(28, 'Marcus Rashford', 'GB', 'https://flagcdn.com/w80/gb-eng.png', 'La Liga', 'https://media.api-sports.io/football/leagues/140.png', 'Barcelona', 529, 'https://media.api-sports.io/football/teams/529.png', 'FW', 27, 14, 'https://media.api-sports.io/football/players/909.png'),
(29, 'Lautaro Martinez', 'AR', 'https://flagcdn.com/w80/ar.png', 'Serie A', 'https://media.api-sports.io/football/leagues/135.png', 'Inter Milan', 505, 'https://media.api-sports.io/football/teams/505.png', 'FW', 27, 10, 'https://media.api-sports.io/football/players/419.png'),
(30, 'Federico Valverde', 'UY', 'https://flagcdn.com/w80/uy.png', 'La Liga', 'https://media.api-sports.io/football/leagues/140.png', 'Real Madrid', 541, 'https://media.api-sports.io/football/teams/541.png', 'MF', 26, 8, 'https://media.api-sports.io/football/players/756.png'),
(31, 'Bernardo Silva', 'PT', 'https://flagcdn.com/w80/pt.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png', 'Manchester City', 50, 'https://media.api-sports.io/football/teams/50.png', 'MF', 30, 20, 'https://media.api-sports.io/football/players/633.png'),
(32, 'Ruben Dias', 'PT', 'https://flagcdn.com/w80/pt.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png', 'Manchester City', 50, 'https://media.api-sports.io/football/teams/50.png', 'DF', 27, 3, 'https://media.api-sports.io/football/players/2296.png'),
(33, 'Alisson Becker', 'BR', 'https://flagcdn.com/w80/br.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png', 'Liverpool', 40, 'https://media.api-sports.io/football/teams/40.png', 'GK', 32, 1, 'https://media.api-sports.io/football/players/2932.png'),
(34, 'Ederson', 'BR', 'https://flagcdn.com/w80/br.png', 'Super Lig', 'https://media.api-sports.io/football/leagues/203.png', 'Fenerbahce', 610, 'https://upload.wikimedia.org/wikipedia/tr/8/86/Fenerbah%C3%A7e_SK.png', 'GK', 31, 1, 'https://media.api-sports.io/football/players/617.png'),
(35, 'Thibaut Courtois', 'BE', 'https://flagcdn.com/w80/be.png', 'La Liga', 'https://media.api-sports.io/football/leagues/140.png', 'Real Madrid', 541, 'https://media.api-sports.io/football/teams/541.png', 'GK', 32, 1, 'https://media.api-sports.io/football/players/730.png'),
(36, 'Joshua Kimmich', 'DE', 'https://flagcdn.com/w80/de.png', 'Bundesliga', 'https://media.api-sports.io/football/leagues/78.png', 'Bayern Munich', 157, 'https://media.api-sports.io/football/teams/157.png', 'MF', 29, 6, 'https://media.api-sports.io/football/players/522.png'),
(37, 'Leroy Sane', 'DE', 'https://flagcdn.com/w80/de.png', 'Super Lig', 'https://media.api-sports.io/football/leagues/203.png', 'Galatasaray', 645, 'https://media.api-sports.io/football/teams/645.png', 'FW', 28, 10, 'https://media.api-sports.io/football/players/524.png'),
(38, 'Antoine Griezmann', 'FR', 'https://flagcdn.com/w80/fr.png', 'La Liga', 'https://media.api-sports.io/football/leagues/140.png', 'Atletico Madrid', 530, 'https://media.api-sports.io/football/teams/530.png', 'FW', 33, 7, 'https://media.api-sports.io/football/players/1863.png'),
(39, 'Joao Felix', 'PT', 'https://flagcdn.com/w80/pt.png', 'Saudi Pro League', 'https://media.api-sports.io/football/leagues/307.png', 'Al Nassr', 2931, 'https://media.api-sports.io/football/teams/2931.png', 'FW', 25, 27, 'https://media.api-sports.io/football/players/1866.png'),
(40, 'Nicolo Barella', 'IT', 'https://flagcdn.com/w80/it.png', 'Serie A', 'https://media.api-sports.io/football/leagues/135.png', 'Inter Milan', 505, 'https://media.api-sports.io/football/teams/505.png', 'MF', 27, 23, 'https://media.api-sports.io/football/players/1465.png'),
(41, 'Theo Hernandez', 'FR', 'https://flagcdn.com/w80/fr.png', 'Saudi Pro League', 'https://media.api-sports.io/football/leagues/307.png', 'Al Hilal', 2939, 'https://media.api-sports.io/football/teams/2939.png', 'DF', 27, 3, 'https://media.api-sports.io/football/players/5996.png'),
(42, 'Aurelien Tchouameni', 'FR', 'https://flagcdn.com/w80/fr.png', 'La Liga', 'https://media.api-sports.io/football/leagues/140.png', 'Real Madrid', 541, 'https://media.api-sports.io/football/teams/541.png', 'MF', 24, 18, 'https://media.api-sports.io/football/players/161923.png'),
(43, 'Eduardo Camavinga', 'FR', 'https://flagcdn.com/w80/fr.png', 'La Liga', 'https://media.api-sports.io/football/leagues/140.png', 'Real Madrid', 541, 'https://media.api-sports.io/football/teams/541.png', 'MF', 22, 6, 'https://media.api-sports.io/football/players/161921.png'),
(44, 'Dusan Vlahovic', 'RS', 'https://flagcdn.com/w80/rs.png', 'Serie A', 'https://media.api-sports.io/football/leagues/135.png', 'Juventus', 496, 'https://media.api-sports.io/football/teams/496.png', 'FW', 24, 9, 'https://media.api-sports.io/football/players/48118.png'),
(45, 'Achraf Hakimi', 'MA', 'https://flagcdn.com/w80/ma.png', 'Ligue 1', 'https://media.api-sports.io/football/leagues/61.png', 'PSG', 85, 'https://media.api-sports.io/football/teams/85.png', 'DF', 26, 2, 'https://media.api-sports.io/football/players/2285.png'),
(46, 'Cristiano Ronaldo', 'PT', 'https://flagcdn.com/w80/pt.png', 'Saudi Pro League', 'https://media.api-sports.io/football/leagues/307.png', 'Al Nassr', 2931, 'https://media.api-sports.io/football/teams/2931.png', 'FW', 39, 7, 'https://media.api-sports.io/football/players/874.png'),
(47, 'Karim Benzema', 'FR', 'https://flagcdn.com/w80/fr.png', 'Saudi Pro League', 'https://media.api-sports.io/football/leagues/307.png', 'Al Ittihad', 2932, 'https://media.api-sports.io/football/teams/2932.png', 'FW', 36, 9, 'https://media.api-sports.io/football/players/759.png'),
(48, 'Sadio Mane', 'SN', 'https://flagcdn.com/w80/sn.png', 'Saudi Pro League', 'https://media.api-sports.io/football/leagues/307.png', 'Al Nassr', 2931, 'https://media.api-sports.io/football/teams/2931.png', 'FW', 32, 10, 'https://media.api-sports.io/football/players/305.png'),
(49, 'Casemiro', 'BR', 'https://flagcdn.com/w80/br.png', 'Premier League', 'https://media.api-sports.io/football/leagues/39.png', 'Manchester United', 33, 'https://media.api-sports.io/football/teams/33.png', 'MF', 32, 18, 'https://media.api-sports.io/football/players/752.png'),
(50, 'Neymar Jr', 'BR', 'https://flagcdn.com/w80/br.png', 'Brasileirao', 'https://media.api-sports.io/football/leagues/71.png', 'Santos', 124, 'https://media.api-sports.io/football/teams/124.png', 'FW', 32, 10, 'https://media.api-sports.io/football/players/276.png');

-- Oyuncuların önceki takımlarını ekle
INSERT INTO player_previous_teams (player_id, team_id) VALUES
-- Haaland önceki takımları
(1, 1), (1, 569), (1, 165),
-- Mbappe önceki takımları  
(2, 91), (2, 85),
-- Bellingham önceki takımları
(3, 165),
-- Salah önceki takımları
(5, 49), (5, 497),
-- De Bruyne önceki takımları
(6, 49), (6, 50),
-- Rodri önceki takımları
(8, 530),
-- Lewandowski önceki takımları
(10, 165), (10, 157),
-- Kane önceki takımları
(11, 47),
-- Musiala önceki takımları
(12, 49),
-- Palmer önceki takımları
(13, 50),
-- Bruno Fernandes önceki takımları
(15, 212),
-- Osimhen önceki takımları
(16, 79), (16, 492),
-- Son önceki takımları
(17, 168), (17, 47),
-- Rice önceki takımları
(20, 48),
-- Wirtz önceki takımları
(23, 168),
-- Kvaratskhelia önceki takımları
(24, 492),
-- Leao önceki takımları
(25, 79),
-- Alexander-Arnold önceki takımları
(26, 40),
-- Odegaard önceki takımları
(27, 541),
-- Rashford önceki takımları
(28, 33),
-- Silva önceki takımları
(31, 91),
-- Dias önceki takımları
(32, 211),
-- Alisson önceki takımları
(33, 497),
-- Ederson önceki takımları
(34, 211), (34, 50),
-- Courtois önceki takımları
(35, 49), (35, 530),
-- Kimmich önceki takımları
(36, 173),
-- Sane önceki takımları
(37, 50), (37, 157),
-- Griezmann önceki takımları
(38, 529),
-- Joao Felix önceki takımları
(39, 211), (39, 530), (39, 49),
-- Theo Hernandez önceki takımları
(41, 541), (41, 489),
-- Tchouameni önceki takımları
(42, 91),
-- Hakimi önceki takımları
(45, 541), (45, 165), (45, 505),
-- Ronaldo önceki takımları
(46, 212), (46, 33), (46, 541), (46, 496),
-- Benzema önceki takımları
(47, 80), (47, 541),
-- Mane önceki takımları
(48, 40), (48, 157),
-- Casemiro önceki takımları
(49, 541),
-- Neymar önceki takımları
(50, 529), (50, 85), (50, 2939);