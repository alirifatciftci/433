import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PLAYERS, getRandomCommonPlayerChallenge } from '../data/players';
import { TEAMS } from '../data/teams';

const MAX_GUESSES = 6;

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  max-width: 600px;
  margin: 0 auto 20px;
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

const GuessCounter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 212, 255, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(0, 212, 255, 0.2);
`;

const CounterText = styled.span`
  color: #00d4ff;
  font-size: 15px;
  font-weight: 600;
`;

const TitleCard = styled.div`
  max-width: 600px;
  margin: 0 auto 24px;
  text-align: center;
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

const TeamsContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin: 0 auto 28px;
  gap: 20px;
`;

const TeamCard = styled.div`
  flex: 1;
  max-width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(145deg, rgba(30, 30, 40, 0.9) 0%, rgba(20, 20, 28, 0.9) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 24px 16px;
`;

const TeamLogo = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 12px;
`;

const TeamName = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;

const TeamLeague = styled.span`
  color: #666;
  font-size: 11px;
  margin-top: 4px;
`;

const VsContainer = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00d4ff, #39FF14);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 24px;
`;

const SearchSection = styled.div`
  max-width: 600px;
  margin: 0 auto 20px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  background: linear-gradient(145deg, rgba(30, 30, 40, 0.9) 0%, rgba(20, 20, 28, 0.9) 100%);
  border: 1px solid rgba(0, 212, 255, 0.2);
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
    border-color: #00d4ff;
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.1);
  }
  
  &:disabled {
    opacity: 0.5;
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
    background: rgba(0, 212, 255, 0.1);
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

const GuessesContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  max-height: 300px;
  overflow-y: auto;
`;

const GuessRow = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 14px;
  margin-bottom: 12px;
  background: ${props => props.$isCorrect 
    ? 'linear-gradient(145deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)' 
    : 'linear-gradient(145deg, rgba(107, 114, 128, 0.2) 0%, rgba(107, 114, 128, 0.1) 100%)'};
  border: 1px solid ${props => props.$isCorrect ? 'rgba(34, 197, 94, 0.3)' : 'rgba(107, 114, 128, 0.2)'};
`;

const GuessLogo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-right: 14px;
`;

const GuessInfo = styled.div`
  flex: 1;
`;

const GuessName = styled.span`
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  display: block;
`;

const GuessTeam = styled.span`
  color: #888;
  font-size: 12px;
`;

const GuessResult = styled.div`
  font-size: 24px;
`;

const GameOverContainer = styled.div`
  max-width: 600px;
  margin: 24px auto;
  text-align: center;
`;

const ResultCard = styled.div`
  background: linear-gradient(145deg, rgba(30, 30, 40, 0.9) 0%, rgba(20, 20, 28, 0.9) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 20px;
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

const ResultText = styled.div`
  color: #fff;
  font-size: 16px;
`;

const PlayAgainButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #00d4ff, #39FF14);
  border: none;
  border-radius: 14px;
  padding: 18px;
  font-size: 16px;
  font-weight: 700;
  color: #000;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 212, 255, 0.3);
  }
`;

const LoadingText = styled.div`
  color: #fff;
  font-size: 18px;
  text-align: center;
  margin-top: 100px;
`;

const CommonPlayerScreen = ({ onSuccess, onBack }) => {
  const [challenge, setChallenge] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [foundPlayers, setFoundPlayers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newChallenge = getRandomCommonPlayerChallenge();
    setChallenge(newChallenge);
    setGuesses([]);
    setGameOver(false);
    setWon(false);
    setFoundPlayers([]);
    setSearchText('');
  };

  const getFilteredPlayers = () => {
    return PLAYERS.filter(
      (p) =>
        !guesses.includes(p.id) &&
        !foundPlayers.includes(p.id) &&
        (searchText === '' || p.name.toLowerCase().includes(searchText.toLowerCase()))
    );
  };

  const handleSelectPlayer = (player) => {
    if (!challenge || gameOver) return;

    const isCorrect = challenge.commonPlayers.some((p) => p.id === player.id);
    const newGuesses = [...guesses, player.id];
    setGuesses(newGuesses);
    setSearchText('');
    setIsSearchFocused(false);

    if (isCorrect) {
      const newFoundPlayers = [...foundPlayers, player.id];
      setFoundPlayers(newFoundPlayers);

      if (newFoundPlayers.length >= 1) {
        setWon(true);
        setGameOver(true);
        setTimeout(() => onSuccess && onSuccess(500), 1500);
      }
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameOver(true);
    }
  };

  if (!challenge) {
    return (
      <Container>
        <LoadingText>Loading...</LoadingText>
      </Container>
    );
  }

  const team1 = TEAMS[challenge.team1];
  const team2 = TEAMS[challenge.team2];
  const showPlayerList = isSearchFocused || searchText.length > 0;

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>← Geri</BackButton>
        <GuessCounter>
          <CounterText>{guesses.length} / {MAX_GUESSES}</CounterText>
        </GuessCounter>
      </Header>

      <TitleCard>
        <Title>🔗 Common Player</Title>
        <Subtitle>Her iki takımda da oynamış oyuncuyu bul</Subtitle>
      </TitleCard>

      <TeamsContainer
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', tension: 50, friction: 7 }}
      >
        <TeamCard>
          <TeamLogo src={team1?.logo} alt={team1?.name} />
          <TeamName>{team1?.name}</TeamName>
          <TeamLeague>{team1?.league}</TeamLeague>
        </TeamCard>

        <VsContainer>🔗</VsContainer>

        <TeamCard>
          <TeamLogo src={team2?.logo} alt={team2?.name} />
          <TeamName>{team2?.name}</TeamName>
          <TeamLeague>{team2?.league}</TeamLeague>
        </TeamCard>
      </TeamsContainer>

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

      <GuessesContainer>
        {[...guesses].reverse().map((playerId, index) => {
          const player = PLAYERS.find((p) => p.id === playerId);
          const isCorrect = challenge.commonPlayers.some((p) => p.id === playerId);
          return (
            <GuessRow
              key={index}
              $isCorrect={isCorrect}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GuessLogo src={player?.teamLogo} alt={player?.team} />
              <GuessInfo>
                <GuessName>{player?.name}</GuessName>
                <GuessTeam>{player?.team}</GuessTeam>
              </GuessInfo>
              <GuessResult>{isCorrect ? '✅' : '❌'}</GuessResult>
            </GuessRow>
          );
        })}
      </GuessesContainer>

      {gameOver && (
        <GameOverContainer>
          <ResultCard>
            <ResultEmoji>{won ? '🎉' : '😔'}</ResultEmoji>
            <ResultTitle $won={won}>
              {won ? 'Doğru!' : 'Yanlış!'}
            </ResultTitle>
            <ResultText>
              {won 
                ? `${guesses.length} tahminde bildin!` 
                : `Cevap: ${challenge.commonPlayers.map((p) => p.name).join(', ')}`
              }
            </ResultText>
          </ResultCard>
          <PlayAgainButton onClick={startNewGame}>Tekrar Oyna</PlayAgainButton>
        </GameOverContainer>
      )}
    </Container>
  );
};

export default CommonPlayerScreen;
