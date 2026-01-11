import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PLAYERS } from '../data/players';
import { TEAMS } from '../data/teams';

const MAX_GUESSES = 5;

const getPlayersWithHistory = () => {
  return PLAYERS.filter((p) => p.previousTeams && p.previousTeams.length > 0);
};

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  max-width: 600px;
  margin: 0 auto 16px;
  width: 100%;
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

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HintBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 215, 0, 0.1);
  padding: 8px 14px;
  border-radius: 20px;
  border: 1px solid rgba(255, 215, 0, 0.2);
  color: #ffd700;
  font-size: 14px;
  font-weight: 600;
`;

const GuessCounter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 107, 53, 0.1);
  padding: 8px 14px;
  border-radius: 20px;
  border: 1px solid rgba(255, 107, 53, 0.2);
`;

const CounterText = styled.span`
  color: #ff6b35;
  font-size: 14px;
  font-weight: 600;
`;

const TitleCard = styled.div`
  max-width: 600px;
  margin: 0 auto 20px;
  text-align: center;
  width: 100%;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 6px 0;
`;

const Subtitle = styled.p`
  color: #888;
  font-size: 14px;
  margin: 0;
`;

const TransferContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

const TransferStep = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TransferArrow = styled.div`
  margin: 10px 0;
  font-size: 24px;
  color: #ff6b35;
`;

const TeamStep = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.$isCurrent 
    ? 'linear-gradient(145deg, rgba(255, 107, 53, 0.15) 0%, rgba(255, 107, 53, 0.05) 100%)' 
    : 'linear-gradient(145deg, rgba(30, 30, 40, 0.9) 0%, rgba(20, 20, 28, 0.9) 100%)'};
  border: 1px solid ${props => props.$isCurrent ? 'rgba(255, 107, 53, 0.3)' : 'rgba(255, 255, 255, 0.08)'};
  border-radius: 16px;
  padding: 16px;
  width: 100%;
`;

const StepLogo = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

const StepInfo = styled.div`
  flex: 1;
  margin-left: 16px;
`;

const StepTeamName = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

const StepLeague = styled.div`
  color: #888;
  font-size: 13px;
  margin-top: 2px;
`;

const CurrentBadge = styled.div`
  background: linear-gradient(135deg, #ff6b35, #ff8c5a);
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
`;

const HiddenStep = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-size: 32px;
  color: #444;
`;

const SearchSection = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 20px auto;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  background: linear-gradient(145deg, rgba(30, 30, 40, 0.9) 0%, rgba(20, 20, 28, 0.9) 100%);
  border: 1px solid rgba(255, 107, 53, 0.2);
  border-radius: 14px;
  padding: 16px 20px;
  padding-left: 50px;
  font-size: 16px;
  color: #fff;
  box-sizing: border-box;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: #666;
  }
  
  &:focus {
    outline: none;
    border-color: #ff6b35;
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.1);
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
`;

const PlayerListContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto 20px;
  max-height: ${props => props.$expanded ? '250px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const PlayerList = styled.div`
  background: linear-gradient(145deg, rgba(30, 30, 40, 0.95) 0%, rgba(20, 20, 28, 0.95) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  overflow: hidden;
  max-height: 230px;
  overflow-y: auto;
`;

const PlayerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:hover {
    background: rgba(255, 107, 53, 0.1);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const PlayerLogo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const PlayerInfo = styled.div`
  flex: 1;
`;

const PlayerItemName = styled.div`
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 2px;
`;

const PlayerItemTeam = styled.div`
  color: #888;
  font-size: 13px;
`;

const PlayerFlag = styled.img`
  width: 28px;
  height: 20px;
  border-radius: 3px;
  object-fit: cover;
`;

const WrongGuessesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 600px;
  margin: 0 auto 16px;
  gap: 8px;
  width: 100%;
  padding: 0 20px;
`;

const WrongGuessChip = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(239, 68, 68, 0.15);
  padding: 8px 14px;
  border-radius: 20px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #ef4444;
  font-size: 13px;
  font-weight: 500;
`;

const GameOverContainer = styled.div`
  max-width: 600px;
  margin: 24px auto;
  text-align: center;
  width: 100%;
  padding: 0 20px;
`;

const ResultCard = styled.div`
  background: linear-gradient(145deg, rgba(30, 30, 40, 0.9) 0%, rgba(20, 20, 28, 0.9) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultEmoji = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const ResultTitle = styled.div`
  color: ${props => props.$won ? '#39FF14' : '#ef4444'};
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const ResultPlayer = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const ResultFlag = styled.img`
  width: 48px;
  height: 32px;
  border-radius: 4px;
  object-fit: cover;
`;

const PlayAgainButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #ff6b35, #ff8c5a);
  border: none;
  border-radius: 14px;
  padding: 18px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);
  }
`;

const LoadingText = styled.div`
  color: #fff;
  font-size: 18px;
  text-align: center;
  margin-top: 100px;
`;

const TransferTriviaScreen = ({ onSuccess, onBack }) => {
  const [targetPlayer, setTargetPlayer] = useState(null);
  const [revealedSteps, setRevealedSteps] = useState(1);
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [transferHistory, setTransferHistory] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const playersWithHistory = getPlayersWithHistory();
    const randomPlayer = playersWithHistory[Math.floor(Math.random() * playersWithHistory.length)];

    const history = [
      ...randomPlayer.previousTeams.map((teamId, index) => ({
        teamId,
        team: TEAMS[teamId],
        revealed: false,
        stepNumber: index + 1,
      })),
      {
        teamId: randomPlayer.teamId,
        team: TEAMS[randomPlayer.teamId],
        revealed: false,
        isCurrent: true,
        stepNumber: randomPlayer.previousTeams.length + 1,
      },
    ];

    setTargetPlayer(randomPlayer);
    setTransferHistory(history);
    setRevealedSteps(1);
    setGuesses([]);
    setGameOver(false);
    setWon(false);
    setSearchText('');
  };

  const getFilteredPlayers = () => {
    return PLAYERS.filter(
      (p) =>
        !guesses.some((g) => g.id === p.id) &&
        (searchText === '' || p.name.toLowerCase().includes(searchText.toLowerCase()))
    );
  };

  const handleSelectPlayer = (player) => {
    if (!targetPlayer || gameOver) return;

    const isCorrect = player.id === targetPlayer.id;
    const newGuesses = [...guesses, { ...player, isCorrect }];
    setGuesses(newGuesses);
    setSearchText('');
    setIsSearchFocused(false);

    if (isCorrect) {
      setWon(true);
      setGameOver(true);
      setRevealedSteps(transferHistory.length);
      setTimeout(() => onSuccess && onSuccess(500), 1500);
    } else {
      if (revealedSteps < transferHistory.length) {
        setRevealedSteps(prev => prev + 1);
      }

      if (newGuesses.length >= MAX_GUESSES) {
        setGameOver(true);
        setRevealedSteps(transferHistory.length);
      }
    }
  };

  const renderTransferStep = (step, index) => {
    const isRevealed = index < revealedSteps || gameOver;

    return (
      <TransferStep
        key={index}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isRevealed ? 1 : 0.4, scale: isRevealed ? 1 : 0.95 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        {index > 0 && <TransferArrow>⬇️</TransferArrow>}
        <TeamStep $isCurrent={step.isCurrent}>
          {isRevealed && step.team ? (
            <>
              <StepLogo src={step.team.logo} alt={step.team.name} />
              <StepInfo>
                <StepTeamName>{step.team.name}</StepTeamName>
                <StepLeague>{step.team.league}</StepLeague>
              </StepInfo>
              {step.isCurrent && <CurrentBadge>ŞİMDİ</CurrentBadge>}
            </>
          ) : (
            <HiddenStep>❓</HiddenStep>
          )}
        </TeamStep>
      </TransferStep>
    );
  };

  if (!targetPlayer) {
    return (
      <Container>
        <LoadingText>Loading...</LoadingText>
      </Container>
    );
  }

  const showPlayerList = isSearchFocused || searchText.length > 0;

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>← Geri</BackButton>
        <HeaderRight>
          <HintBadge>💡 {revealedSteps}/{transferHistory.length}</HintBadge>
          <GuessCounter>
            <CounterText>{guesses.length}/{MAX_GUESSES}</CounterText>
          </GuessCounter>
        </HeaderRight>
      </Header>

      <TitleCard>
        <Title>✈️ Transfer Trivia</Title>
        <Subtitle>Kariyer yolundan oyuncuyu tahmin et</Subtitle>
      </TitleCard>

      <TransferContainer>
        {transferHistory.map((step, index) => renderTransferStep(step, index))}
      </TransferContainer>

      {!gameOver && (
        <>
          <SearchSection>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput
              type="text"
              placeholder="Oyuncu ara..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />
          </SearchSection>

          <PlayerListContainer $expanded={showPlayerList}>
            <PlayerList>
              {getFilteredPlayers().slice(0, 10).map((player) => (
                <PlayerItem key={player.id} onClick={() => handleSelectPlayer(player)}>
                  <PlayerLogo src={player.teamLogo} alt={player.team} />
                  <PlayerInfo>
                    <PlayerItemName>{player.name}</PlayerItemName>
                    <PlayerItemTeam>{player.team}</PlayerItemTeam>
                  </PlayerInfo>
                  <PlayerFlag src={player.nationalityFlag} alt={player.nationality} />
                </PlayerItem>
              ))}
            </PlayerList>
          </PlayerListContainer>
        </>
      )}

      {guesses.length > 0 && !gameOver && (
        <WrongGuessesContainer>
          {guesses.filter(g => !g.isCorrect).map((guess, index) => (
            <WrongGuessChip key={index}>❌ {guess.name}</WrongGuessChip>
          ))}
        </WrongGuessesContainer>
      )}

      {gameOver && (
        <GameOverContainer>
          <ResultCard>
            <ResultEmoji>{won ? '🎉' : '😔'}</ResultEmoji>
            <ResultTitle $won={won}>
              {won ? 'Doğru!' : 'Yanlış!'}
            </ResultTitle>
            <ResultPlayer>{targetPlayer.name}</ResultPlayer>
            <ResultFlag src={targetPlayer.nationalityFlag} alt={targetPlayer.nationality} />
          </ResultCard>
          <PlayAgainButton onClick={startNewGame}>Tekrar Oyna</PlayAgainButton>
        </GameOverContainer>
      )}
    </Container>
  );
};

export default TransferTriviaScreen;
