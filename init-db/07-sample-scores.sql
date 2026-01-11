-- Örnek daily challenge sonuçları
INSERT INTO user_daily_results (user_id, challenge_id, score, attempts, time_taken, result_data) VALUES
(1, 1, 850, 3, 120, '{"correct": true, "guesses": 3}'),
(2, 1, 720, 5, 180, '{"correct": true, "guesses": 5}'),
(3, 1, 650, 6, 240, '{"correct": true, "guesses": 6}');

-- Kullanıcı skorlarını güncelle
UPDATE users SET total_score = 850, games_played = 1 WHERE id = 1;
UPDATE users SET total_score = 720, games_played = 1 WHERE id = 2;
UPDATE users SET total_score = 650, games_played = 1 WHERE id = 3;