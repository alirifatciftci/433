import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { PLAYERS, getRandomCommonPlayerChallenge } from '../data/players';
import { TEAMS } from '../data/teams';

// Challenge türleri
const CHALLENGE_TYPES = ['guessPlayer', 'commonPlayer', 'transferTrivia'];

// Seed'den rastgele sayı üretici
const seededRandom = (seed) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

// Challenge oluştur
const generateChallenge = (seed) => {
  const challenges = [];
  for (let i = 0; i < 5; i++) {
    const type = CHALLENGE_TYPES[Math.floor(seededRandom(seed + i) * CHALLENGE_TYPES.length)];
    const playerIndex = Math.floor(seededRandom(seed + i + 100) * PLAYERS.length);
    
    if (type === 'guessPlayer') {
      challenges.push({ type, player: PLAYERS[playerIndex], questionNum: i + 1 });
    } else if (type === 'commonPlayer') {
      const challenge = getRandomCommonPlayerChallenge();
      if (challenge) challenges.push({ type, ...challenge, questionNum: i + 1 });
      else challenges.push({ type: 'guessPlayer', player: PLAYERS[playerIndex], questionNum: i + 1 });
    } else {
      const playersWithHistory = PLAYERS.filter(p => p.previousTeams?.length > 0);
      const idx = Math.floor(seededRandom(seed + i + 200) * playersWithHistory.length);
      challenges.push({ type, player: playersWithHistory[idx] || PLAYERS[0], questionNum: i + 1 });
    }
  }
  return challenges;
};

// URL'den seed al veya yeni oluştur
const getSeedFromURL = () => {
  const hash = window.location.hash;
  if (hash.startsWith('#challenge=')) {
    const data = hash.replace('#challenge=', '');
    try {
      return JSON.parse(atob(data));
    } catch { return null; }
  }
  return null;
};

const createShareURL = (seed, creatorName) => {
  const data = btoa(JSON.stringify({ seed, creator: creatorName }));
  return `${window.location.origin}${window.location.pathname}#challenge=${data}`;
};


// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%);
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 600px;
  margin: 0 auto 20px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 16px;
  cursor: pointer;
  &:hover { color: #fff; }
`;

const ProgressBar = styled.div`
  display: flex;
  gap: 8px;
  max-width: 600px;
  margin: 0 auto 24px;
`;

const ProgressDot = styled.div`
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: ${props => props.$completed ? '#39FF14' : props.$current ? '#a855f7' : 'rgba(255,255,255,0.1)'};
  transition: all 0.3s ease;
`;

const Card = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: linear-gradient(145deg, rgba(30, 30, 40, 0.9) 0%, rgba(20, 20, 28, 0.9) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 32px;
  text-align: center;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 28px;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  color: #888;
  font-size: 14px;
  margin: 0 0 24px 0;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #39FF14; }
  &::placeholder { color: #666; }
`;

const Button = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #39FF14, #00d4ff);
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  font-weight: 700;
  color: #000;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(57, 255, 20, 0.3); }
  &:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
`;

const QuestionCard = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const QuestionHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const QuestionType = styled.div`
  color: #a855f7;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const QuestionTitle = styled.h2`
  color: #fff;
  font-size: 20px;
  margin: 0;
`;


const TeamsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
`;

const TeamCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  flex: 1;
  max-width: 150px;
`;

const TeamLogo = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 8px;
`;

const TeamName = styled.div`
  color: #fff;
  font-size: 12px;
  font-weight: 600;
`;

const VsCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #39FF14, #00d4ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const TransferPath = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 20px 0;
`;

const TransferStep = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.$current ? 'rgba(255, 107, 53, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.$current ? 'rgba(255, 107, 53, 0.3)' : 'rgba(255, 255, 255, 0.08)'};
  border-radius: 12px;
  padding: 12px 16px;
  width: 100%;
  max-width: 350px;
`;

const StepLogo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-right: 12px;
`;

const StepInfo = styled.div`
  flex: 1;
  text-align: left;
`;

const StepName = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;

const StepLeague = styled.div`
  color: #888;
  font-size: 12px;
`;

const HiddenStep = styled.div`
  color: #666;
  font-size: 24px;
  text-align: center;
  flex: 1;
`;

const SearchSection = styled.div`
  position: relative;
  margin-top: 20px;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
`;

const SearchInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 14px 16px 14px 46px;
  font-size: 15px;
  color: #fff;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #a855f7; }
  &::placeholder { color: #666; }
`;

const PlayerList = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  margin-top: 12px;
  max-height: 250px;
  overflow-y: auto;
`;

const PlayerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  &:hover { background: rgba(168, 85, 247, 0.1); }
  &:last-child { border-bottom: none; }
`;

const PlayerLogo = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
`;

const PlayerInfo = styled.div`
  flex: 1;
`;

const PlayerName = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;

const PlayerTeam = styled.div`
  color: #888;
  font-size: 12px;
`;

const PlayerFlag = styled.img`
  width: 24px;
  height: 16px;
  border-radius: 2px;
`;


const ResultCard = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: linear-gradient(145deg, rgba(30, 30, 40, 0.9) 0%, rgba(20, 20, 28, 0.9) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 32px;
  text-align: center;
`;

const ScoreCircle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #39FF14, #00d4ff);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
`;

const ScoreNumber = styled.div`
  color: #000;
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
`;

const ScoreLabel = styled.div`
  color: #000;
  font-size: 14px;
  font-weight: 600;
`;

const ResultTitle = styled.h2`
  color: #fff;
  font-size: 24px;
  margin: 0 0 8px 0;
`;

const ResultSubtitle = styled.p`
  color: #888;
  font-size: 14px;
  margin: 0 0 24px 0;
`;

const ShareButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  &:hover { transform: translateY(-2px); }
`;

const LeaderboardSection = styled.div`
  margin-top: 24px;
  text-align: left;
`;

const LeaderboardTitle = styled.h3`
  color: #fff;
  font-size: 16px;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LeaderboardItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: ${props => props.$isYou ? 'rgba(57, 255, 20, 0.1)' : 'rgba(255, 255, 255, 0.03)'};
  border: 1px solid ${props => props.$isYou ? 'rgba(57, 255, 20, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  border-radius: 10px;
  margin-bottom: 8px;
`;

const Rank = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${props => props.$rank === 1 ? '#ffd700' : props.$rank === 2 ? '#c0c0c0' : props.$rank === 3 ? '#cd7f32' : 'rgba(255,255,255,0.1)'};
  color: ${props => props.$rank <= 3 ? '#000' : '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
`;

const LeaderName = styled.div`
  flex: 1;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
`;

const LeaderScore = styled.div`
  color: #39FF14;
  font-size: 16px;
  font-weight: 700;
`;

const CopiedToast = styled(motion.div)`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: #39FF14;
  color: #000;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
`;

const FeedbackCard = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${props => props.$correct ? 'rgba(34, 197, 94, 0.95)' : 'rgba(239, 68, 68, 0.95)'};
  padding: 24px 48px;
  border-radius: 16px;
  text-align: center;
  z-index: 100;
`;

const FeedbackEmoji = styled.div`
  font-size: 48px;
  margin-bottom: 8px;
`;

const FeedbackText = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;


// Main Component
const DailyChallengeScreen = ({ onBack }) => {
  const [phase, setPhase] = useState('name'); // name, playing, result
  const [playerName, setPlayerName] = useState('');
  const [seed, setSeed] = useState(null);
  const [creatorName, setCreatorName] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showFeedback, setShowFeedback] = useState(null);
  const [copied, setCopied] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [revealedSteps, setRevealedSteps] = useState(1);

  useEffect(() => {
    const urlData = getSeedFromURL();
    if (urlData) {
      setSeed(urlData.seed);
      setCreatorName(urlData.creator);
      const savedLeaderboard = localStorage.getItem(`leaderboard_${urlData.seed}`);
      if (savedLeaderboard) setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  const startChallenge = () => {
    if (!playerName.trim()) return;
    const newSeed = seed || Date.now();
    setSeed(newSeed);
    const generatedChallenges = generateChallenge(newSeed);
    setChallenges(generatedChallenges);
    setPhase('playing');
  };

  const handleAnswer = (player, isCorrect) => {
    const newAnswers = [...answers, { player, correct: isCorrect }];
    setAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setShowFeedback('correct');
    } else {
      setShowFeedback('wrong');
    }

    setTimeout(() => {
      setShowFeedback(null);
      if (currentQuestion < 4) {
        setCurrentQuestion(prev => prev + 1);
        setSearchText('');
        setRevealedSteps(1);
      } else {
        finishChallenge(newAnswers);
      }
    }, 1000);
  };

  const finishChallenge = (finalAnswers) => {
    const finalScore = finalAnswers.filter(a => a.correct).length;
    const newEntry = { name: playerName, score: finalScore, timestamp: Date.now() };
    const updatedLeaderboard = [...leaderboard, newEntry].sort((a, b) => b.score - a.score || a.timestamp - b.timestamp);
    setLeaderboard(updatedLeaderboard);
    localStorage.setItem(`leaderboard_${seed}`, JSON.stringify(updatedLeaderboard));
    setPhase('result');
  };

  const shareChallenge = () => {
    const url = createShareURL(seed, playerName);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const checkGuessPlayer = (selectedPlayer, targetPlayer) => {
    return selectedPlayer.id === targetPlayer.id;
  };

  const checkCommonPlayer = (selectedPlayer, challenge) => {
    const allTeams = [selectedPlayer.teamId, ...(selectedPlayer.previousTeams || [])];
    return allTeams.includes(challenge.team1) && allTeams.includes(challenge.team2);
  };

  const checkTransferTrivia = (selectedPlayer, targetPlayer) => {
    return selectedPlayer.id === targetPlayer.id;
  };

  const handlePlayerSelect = (player) => {
    const challenge = challenges[currentQuestion];
    let isCorrect = false;

    if (challenge.type === 'guessPlayer') {
      isCorrect = checkGuessPlayer(player, challenge.player);
    } else if (challenge.type === 'commonPlayer') {
      isCorrect = checkCommonPlayer(player, challenge);
    } else if (challenge.type === 'transferTrivia') {
      isCorrect = checkTransferTrivia(player, challenge.player);
      if (!isCorrect && revealedSteps < (challenge.player.previousTeams?.length || 0) + 1) {
        setRevealedSteps(prev => prev + 1);
      }
    }

    handleAnswer(player, isCorrect);
  };

  const getFilteredPlayers = () => {
    return PLAYERS.filter(p => 
      searchText === '' || p.name.toLowerCase().includes(searchText.toLowerCase())
    ).slice(0, 8);
  };


  const renderQuestion = () => {
    const challenge = challenges[currentQuestion];
    if (!challenge) return null;

    return (
      <QuestionCard>
        <QuestionHeader>
          <QuestionType>
            {challenge.type === 'guessPlayer' && '⚽ Oyuncu Tahmin'}
            {challenge.type === 'commonPlayer' && '🔗 Ortak Oyuncu'}
            {challenge.type === 'transferTrivia' && '✈️ Transfer Trivia'}
          </QuestionType>
          <QuestionTitle>Soru {currentQuestion + 1}/5</QuestionTitle>
        </QuestionHeader>

        {challenge.type === 'guessPlayer' && (
          <Card>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>❓</div>
            <Title style={{ fontSize: '18px' }}>Bu futbolcu kim?</Title>
            <Subtitle>
              {challenge.player.league} • {challenge.player.position} • {challenge.player.age} yaş
            </Subtitle>
          </Card>
        )}

        {challenge.type === 'commonPlayer' && (
          <Card>
            <Title style={{ fontSize: '18px', marginBottom: '16px' }}>Her iki takımda da oynamış oyuncuyu bul</Title>
            <TeamsRow>
              <TeamCard>
                <TeamLogo src={TEAMS[challenge.team1]?.logo} alt="" />
                <TeamName>{TEAMS[challenge.team1]?.name}</TeamName>
              </TeamCard>
              <VsCircle>🔗</VsCircle>
              <TeamCard>
                <TeamLogo src={TEAMS[challenge.team2]?.logo} alt="" />
                <TeamName>{TEAMS[challenge.team2]?.name}</TeamName>
              </TeamCard>
            </TeamsRow>
          </Card>
        )}

        {challenge.type === 'transferTrivia' && (
          <Card>
            <Title style={{ fontSize: '18px', marginBottom: '16px' }}>Kariyer yolundan oyuncuyu tahmin et</Title>
            <TransferPath>
              {challenge.player.previousTeams?.map((teamId, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <div style={{ color: '#ff6b35' }}>⬇️</div>}
                  <TransferStep $current={false}>
                    {idx < revealedSteps ? (
                      <>
                        <StepLogo src={TEAMS[teamId]?.logo} alt="" />
                        <StepInfo>
                          <StepName>{TEAMS[teamId]?.name}</StepName>
                          <StepLeague>{TEAMS[teamId]?.league}</StepLeague>
                        </StepInfo>
                      </>
                    ) : (
                      <HiddenStep>❓</HiddenStep>
                    )}
                  </TransferStep>
                </React.Fragment>
              ))}
              <div style={{ color: '#ff6b35' }}>⬇️</div>
              <TransferStep $current={true}>
                {revealedSteps > (challenge.player.previousTeams?.length || 0) ? (
                  <>
                    <StepLogo src={TEAMS[challenge.player.teamId]?.logo} alt="" />
                    <StepInfo>
                      <StepName>{TEAMS[challenge.player.teamId]?.name}</StepName>
                      <StepLeague>{TEAMS[challenge.player.teamId]?.league}</StepLeague>
                    </StepInfo>
                    <div style={{ background: '#ff6b35', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: '700', color: '#fff' }}>ŞİMDİ</div>
                  </>
                ) : (
                  <HiddenStep>❓</HiddenStep>
                )}
              </TransferStep>
            </TransferPath>
          </Card>
        )}

        <SearchSection>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            placeholder="Oyuncu ara..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </SearchSection>

        <PlayerList>
          {getFilteredPlayers().map(player => (
            <PlayerItem key={player.id} onClick={() => handlePlayerSelect(player)}>
              <PlayerLogo src={player.teamLogo} alt="" />
              <PlayerInfo>
                <PlayerName>{player.name}</PlayerName>
                <PlayerTeam>{player.team}</PlayerTeam>
              </PlayerInfo>
              <PlayerFlag src={player.nationalityFlag} alt="" />
            </PlayerItem>
          ))}
        </PlayerList>
      </QuestionCard>
    );
  };


  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>← Geri</BackButton>
        <div style={{ color: '#ffd700', fontWeight: '600' }}>🏆 Daily Challenge</div>
        <div style={{ width: '60px' }} />
      </Header>

      {phase !== 'name' && (
        <ProgressBar>
          {[0, 1, 2, 3, 4].map(i => (
            <ProgressDot key={i} $completed={i < currentQuestion || phase === 'result'} $current={i === currentQuestion && phase === 'playing'} />
          ))}
        </ProgressBar>
      )}

      {phase === 'name' && (
        <Card>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🏆</div>
          <Title>Daily Challenge</Title>
          <Subtitle>
            {creatorName 
              ? `${creatorName} seni bu challenge'a davet etti!` 
              : '5 soruluk challenge\'ı tamamla ve arkadaşlarınla yarış!'}
          </Subtitle>
          <Input
            placeholder="İsmini gir..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && startChallenge()}
          />
          <Button onClick={startChallenge} disabled={!playerName.trim()}>
            🚀 Başla
          </Button>
        </Card>
      )}

      {phase === 'playing' && renderQuestion()}

      {phase === 'result' && (
        <ResultCard>
          <ScoreCircle>
            <ScoreNumber>{score}</ScoreNumber>
            <ScoreLabel>/ 5</ScoreLabel>
          </ScoreCircle>
          <ResultTitle>
            {score === 5 ? '🎉 Mükemmel!' : score >= 3 ? '👏 İyi iş!' : '💪 Tekrar dene!'}
          </ResultTitle>
          <ResultSubtitle>
            {playerName}, {score} doğru cevap verdin!
          </ResultSubtitle>

          <ShareButton onClick={shareChallenge}>
            📤 Arkadaşlarınla Paylaş
          </ShareButton>

          <Button onClick={onBack}>
            Ana Sayfaya Dön
          </Button>

          {leaderboard.length > 0 && (
            <LeaderboardSection>
              <LeaderboardTitle>🏅 Skor Tablosu</LeaderboardTitle>
              {leaderboard.slice(0, 10).map((entry, idx) => (
                <LeaderboardItem key={idx} $isYou={entry.name === playerName && entry.timestamp === leaderboard.find(e => e.name === playerName)?.timestamp}>
                  <Rank $rank={idx + 1}>{idx + 1}</Rank>
                  <LeaderName>{entry.name} {entry.name === playerName && '(Sen)'}</LeaderName>
                  <LeaderScore>{entry.score}/5</LeaderScore>
                </LeaderboardItem>
              ))}
            </LeaderboardSection>
          )}
        </ResultCard>
      )}

      <AnimatePresence>
        {showFeedback && (
          <FeedbackCard
            $correct={showFeedback === 'correct'}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <FeedbackEmoji>{showFeedback === 'correct' ? '✅' : '❌'}</FeedbackEmoji>
            <FeedbackText>{showFeedback === 'correct' ? 'Doğru!' : 'Yanlış!'}</FeedbackText>
          </FeedbackCard>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {copied && (
          <CopiedToast
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            ✅ Link kopyalandı!
          </CopiedToast>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default DailyChallengeScreen;
