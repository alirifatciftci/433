import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ApiService from "../services/api";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%);
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  max-width: 600px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 16px;
  cursor: pointer;
  padding: 8px;

  &:hover {
    color: #fff;
  }
`;

const Title = styled.h1`
  color: #fff;
  font-size: 24px;
  font-weight: 700;
`;

const ChallengeCard = styled(motion.div)`
  max-width: 600px;
  margin: 0 auto 24px;
  background: linear-gradient(
    145deg,
    rgba(30, 30, 40, 0.9) 0%,
    rgba(20, 20, 28, 0.9) 100%
  );
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 20px;
  padding: 24px;
  text-align: center;
`;

const ChallengeTitle = styled.h2`
  color: #ffd700;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const ChallengeDate = styled.p`
  color: #888;
  font-size: 14px;
  margin-bottom: 16px;
`;

const StatusCard = styled.div`
  background: ${(props) =>
    props.$completed ? "rgba(34, 197, 94, 0.1)" : "rgba(255, 215, 0, 0.1)"};
  border: 1px solid
    ${(props) =>
      props.$completed ? "rgba(34, 197, 94, 0.3)" : "rgba(255, 215, 0, 0.3)"};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
`;

const StatusText = styled.div`
  color: ${(props) => (props.$completed ? "#22c55e" : "#FFD700")};
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ScoreText = styled.div`
  color: #fff;
  font-size: 14px;
`;

const PlayButton = styled.button`
  background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
  border: none;
  border-radius: 14px;
  padding: 16px 32px;
  color: #000;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  margin-bottom: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 215, 0, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const LeaderboardSection = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const LeaderboardTitle = styled.h3`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: center;
`;

const LeaderboardCard = styled.div`
  background: linear-gradient(
    145deg,
    rgba(30, 30, 40, 0.9) 0%,
    rgba(20, 20, 28, 0.9) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 20px;
`;

const LeaderboardItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
  }
`;

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Rank = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${(props) =>
    props.$rank === 1
      ? "#FFD700"
      : props.$rank === 2
      ? "#C0C0C0"
      : props.$rank === 3
      ? "#CD7F32"
      : "rgba(255, 255, 255, 0.1)"};
  color: ${(props) => (props.$rank <= 3 ? "#000" : "#fff")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
`;

const PlayerName = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;

const PlayerScore = styled.div`
  color: #888;
  font-size: 12px;
`;

const ScoreInfo = styled.div`
  text-align: right;
`;

const Score = styled.div`
  color: #39ff14;
  font-size: 16px;
  font-weight: 700;
`;

const Attempts = styled.div`
  color: #888;
  font-size: 12px;
`;

const LoadingText = styled.div`
  color: #fff;
  text-align: center;
  font-size: 18px;
  padding: 40px;
`;

const DailyChallengeScreen = ({ onBack, onStartChallenge }) => {
  const [challenge, setChallenge] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadDailyChallengeData();
  }, []);

  const loadDailyChallengeData = async () => {
    try {
      setLoading(true);

      // Kullanıcı oluştur/getir (şimdilik guest user)
      const user = await ApiService.createOrGetUser(
        "guest_user",
        "Misafir Kullanıcı"
      );
      setCurrentUser(user);

      // Daily challenge'ı getir
      const dailyChallenge = await ApiService.getDailyChallenge();
      setChallenge(dailyChallenge);

      // Kullanıcının bugünkü durumunu kontrol et
      const status = await ApiService.getUserDailyStatus(user.id);
      setUserStatus(status);

      // Günlük leaderboard'u getir
      const dailyLeaderboard = await ApiService.getDailyLeaderboard();
      setLeaderboard(dailyLeaderboard);
    } catch (error) {
      console.error("Failed to load daily challenge data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartChallenge = () => {
    if (challenge && currentUser) {
      if (onStartChallenge) {
        onStartChallenge({
          challenge,
          user: currentUser,
          onComplete: handleChallengeComplete,
        });
      } else {
        // Fallback: Direkt guess player oyununa git
        alert("Daily Challenge başlatılıyor! (Demo)");
      }
    }
  };

  const handleChallengeComplete = async (
    score,
    attempts,
    timeTaken,
    resultData
  ) => {
    try {
      await ApiService.saveDailyChallengeResult(
        currentUser.id,
        challenge.id,
        score,
        attempts,
        timeTaken,
        resultData
      );

      // Verileri yenile
      await loadDailyChallengeData();
    } catch (error) {
      console.error("Failed to save challenge result:", error);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingText>Daily Challenge yükleniyor...</LoadingText>
      </Container>
    );
  }

  const today = new Date().toLocaleDateString("tr-TR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>← Geri</BackButton>
        <Title>Daily Challenge</Title>
        <div></div>
      </Header>

      <ChallengeCard
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ChallengeTitle>🏆 Günün Meydan Okuması</ChallengeTitle>
        <ChallengeDate>{today}</ChallengeDate>

        {userStatus?.hasCompletedToday ? (
          <StatusCard $completed={true}>
            <StatusText $completed={true}>
              ✅ Bugünün challenge'ını tamamladınız!
            </StatusText>
            <ScoreText>
              Skorunuz: {userStatus.result.score} puan (
              {userStatus.result.attempts} tahmin)
            </ScoreText>
          </StatusCard>
        ) : (
          <StatusCard $completed={false}>
            <StatusText $completed={false}>
              ⭐ Bugünün challenge'ı sizi bekliyor!
            </StatusText>
            <ScoreText>
              {challenge?.challenge_type === "guess_player"
                ? "Oyuncu Tahmin Oyunu"
                : "Bilinmeyen Challenge"}
            </ScoreText>
          </StatusCard>
        )}

        <PlayButton
          onClick={handleStartChallenge}
          disabled={userStatus?.hasCompletedToday}
        >
          {userStatus?.hasCompletedToday ? "Tamamlandı" : "Challenge'ı Başlat"}
        </PlayButton>
      </ChallengeCard>

      <LeaderboardSection>
        <LeaderboardTitle>🏅 Günlük Sıralama</LeaderboardTitle>
        <LeaderboardCard>
          {leaderboard.length === 0 ? (
            <div
              style={{ textAlign: "center", color: "#888", padding: "20px" }}
            >
              Henüz kimse challenge'ı tamamlamadı
            </div>
          ) : (
            leaderboard.slice(0, 10).map((player, index) => (
              <LeaderboardItem key={player.username}>
                <PlayerInfo>
                  <Rank $rank={player.rank}>{player.rank}</Rank>
                  <div>
                    <PlayerName>
                      {player.display_name || player.username}
                    </PlayerName>
                    <PlayerScore>{player.attempts} tahmin</PlayerScore>
                  </div>
                </PlayerInfo>
                <ScoreInfo>
                  <Score>{player.score} puan</Score>
                  <Attempts>
                    {Math.floor(player.time_taken / 60)}:
                    {(player.time_taken % 60).toString().padStart(2, "0")}
                  </Attempts>
                </ScoreInfo>
              </LeaderboardItem>
            ))
          )}
        </LeaderboardCard>
      </LeaderboardSection>
    </Container>
  );
};

export default DailyChallengeScreen;
