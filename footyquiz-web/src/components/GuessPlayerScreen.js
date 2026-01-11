import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import ApiService from "../services/api";

const MAX_GUESSES = 8;

const COLORS = {
  correct: "#22c55e",
  close: "#eab308",
  wrong: "#6b7280",
};

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
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    color: #fff;
  }
`;

const GuessCounter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(57, 255, 20, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(57, 255, 20, 0.2);
`;

const CounterText = styled.span`
  color: #39ff14;
  font-size: 15px;
  font-weight: 600;
`;

const MysteryCard = styled.div`
  max-width: 600px;
  margin: 0 auto 24px;
  background: linear-gradient(
    145deg,
    rgba(30, 30, 40, 0.9) 0%,
    rgba(20, 20, 28, 0.9) 100%
  );
  border: 1px solid rgba(57, 255, 20, 0.15);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const MysteryEmoji = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(
    135deg,
    rgba(57, 255, 20, 0.2) 0%,
    rgba(0, 212, 255, 0.2) 100%
  );
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
`;

const MysteryTextContainer = styled.div`
  flex: 1;
`;

const MysteryTitle = styled.h2`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px 0;
`;

const MysterySubtitle = styled.p`
  color: #888;
  font-size: 13px;
  margin: 0;
`;

const QuestionMark = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(57, 255, 20, 0.1);
  border: 2px solid rgba(57, 255, 20, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #39ff14;
  font-weight: bold;
`;

const SearchSection = styled.div`
  max-width: 600px;
  margin: 0 auto 20px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  background: linear-gradient(
    145deg,
    rgba(30, 30, 40, 0.9) 0%,
    rgba(20, 20, 28, 0.9) 100%
  );
  border: 1px solid rgba(57, 255, 20, 0.2);
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
    border-color: #39ff14;
    box-shadow: 0 0 20px rgba(57, 255, 20, 0.1);
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
  max-height: ${(props) => (props.$expanded ? "300px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const PlayerList = styled.div`
  background: linear-gradient(
    145deg,
    rgba(30, 30, 40, 0.95) 0%,
    rgba(20, 20, 28, 0.95) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  overflow: hidden;
  max-height: 280px;
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
    background: rgba(57, 255, 20, 0.1);
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
`;

const GuessRow = styled(motion.div)`
  margin-bottom: 16px;
  background: linear-gradient(
    145deg,
    rgba(30, 30, 40, 0.6) 0%,
    rgba(20, 20, 28, 0.6) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 16px;
`;

const PlayerName = styled.div`
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 12px;
`;

const AttributesRow = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
`;

const flipAnimation = keyframes`
  0% {
    transform: scale(0) rotateY(180deg);
  }
  100% {
    transform: scale(1) rotateY(360deg);
  }
`;

const AttributeCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AttributeValue = styled(motion.div)`
  width: 100%;
  aspect-ratio: 1;
  background: ${(props) => COLORS[props.result]};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  animation: ${flipAnimation} 0.5s ease-out;
  animation-delay: ${(props) => props.delay}ms;
  animation-fill-mode: both;
`;

const CellImage = styled.img`
  width: 65%;
  height: 65%;
  object-fit: contain;
`;

const AttributeText = styled.span`
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
`;

const AttributeLabel = styled.span`
  color: #666;
  font-size: 10px;
  margin-top: 6px;
  font-weight: 600;
`;

const GameOverContainer = styled.div`
  max-width: 600px;
  margin: 24px auto;
  text-align: center;
`;

const ResultCard = styled.div`
  background: linear-gradient(
    145deg,
    rgba(30, 30, 40, 0.9) 0%,
    rgba(20, 20, 28, 0.9) 100%
  );
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
  color: ${(props) => (props.$won ? "#39FF14" : "#ef4444")};
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const ResultPlayer = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
`;

const PlayAgainButton = styled.button`
  background: linear-gradient(135deg, #39ff14 0%, #00d4ff 100%);
  border: none;
  border-radius: 14px;
  padding: 18px 32px;
  color: #000;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(57, 255, 20, 0.3);
  }
`;

const AnimatedCell = ({ value, result, label, delay, isImage }) => {
  return (
    <AttributeCell>
      <AttributeValue result={result} delay={delay}>
        {isImage ? (
          <CellImage src={value} alt={label} />
        ) : (
          <AttributeText>{value}</AttributeText>
        )}
      </AttributeValue>
      <AttributeLabel>{label}</AttributeLabel>
    </AttributeCell>
  );
};

const GuessPlayerScreen = ({ onBack, onComplete }) => {
  const [targetPlayer, setTargetPlayer] = useState(null);
  const [allPlayers, setAllPlayers] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGameData();
  }, []);

  const loadGameData = async () => {
    try {
      setLoading(true);
      const [players, randomPlayer] = await Promise.all([
        ApiService.getAllPlayers(),
        ApiService.getRandomPlayer(),
      ]);
      setAllPlayers(players);
      setTargetPlayer(randomPlayer);
    } catch (error) {
      console.error("Failed to load game data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredPlayers = () => {
    return allPlayers.filter(
      (p) =>
        !guesses.find((g) => g.id === p.id) &&
        (searchText === "" ||
          p.name.toLowerCase().includes(searchText.toLowerCase()))
    );
  };

  const handleSelectPlayer = (player) => {
    if (!targetPlayer || gameOver) return;

    const newGuess = {
      ...player,
      guessTime: Date.now(),
      results: comparePlayer(player, targetPlayer),
    };

    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);
    setSearchText("");
    setIsSearchFocused(false);

    if (player.id === targetPlayer.id) {
      setWon(true);
      setGameOver(true);
      setTimeout(
        () =>
          onComplete &&
          onComplete(500, {
            success: true,
            guesses: newGuesses.length,
            player: targetPlayer,
          }),
        1500
      );
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameOver(true);
    }
  };

  const comparePlayer = (guess, target) => {
    return {
      nationality:
        guess.nationality === target.nationality ? "correct" : "wrong",
      league: guess.league === target.league ? "correct" : "wrong",
      team: guess.team === target.team ? "correct" : "wrong",
      position: guess.position === target.position ? "correct" : "wrong",
      age: getAgeResult(guess.age, target.age),
      ageDirection:
        guess.age < target.age ? "↑" : guess.age > target.age ? "↓" : "",
      shirtNumber: getNumberResult(guess.shirt_number, target.shirt_number),
      shirtDirection:
        guess.shirt_number < target.shirt_number
          ? "↑"
          : guess.shirt_number > target.shirt_number
          ? "↓"
          : "",
    };
  };

  const getAgeResult = (guess, target) => {
    if (guess === target) return "correct";
    if (Math.abs(guess - target) <= 2) return "close";
    return "wrong";
  };

  const getNumberResult = (guess, target) => {
    if (guess === target) return "correct";
    if (Math.abs(guess - target) <= 5) return "close";
    return "wrong";
  };

  const resetGame = async () => {
    try {
      const randomPlayer = await ApiService.getRandomPlayer();
      setTargetPlayer(randomPlayer);
      setGuesses([]);
      setGameOver(false);
      setWon(false);
      setSearchText("");
    } catch (error) {
      console.error("Failed to reset game:", error);
    }
  };

  if (loading) {
    return (
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            color: "#fff",
            fontSize: "18px",
          }}
        >
          Oyun yükleniyor...
        </div>
      </Container>
    );
  }

  const renderGuessRow = (guess) => (
    <GuessRow
      key={guess.guessTime}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <PlayerName>{guess.name}</PlayerName>
      <AttributesRow>
        <AnimatedCell
          value={guess.nationality_flag}
          result={guess.results.nationality}
          label="NAT"
          delay={0}
          isImage
        />
        <AnimatedCell
          value={guess.league_logo}
          result={guess.results.league}
          label="LGE"
          delay={100}
          isImage
        />
        <AnimatedCell
          value={guess.team_logo}
          result={guess.results.team}
          label="TEAM"
          delay={200}
          isImage
        />
        <AnimatedCell
          value={guess.position}
          result={guess.results.position}
          label="POS"
          delay={300}
        />
        <AnimatedCell
          value={`${guess.age}${guess.results.ageDirection}`}
          result={guess.results.age}
          label="AGE"
          delay={400}
        />
        <AnimatedCell
          value={`#${guess.shirt_number}${guess.results.shirtDirection}`}
          result={guess.results.shirtNumber}
          label="SHIRT"
          delay={500}
        />
      </AttributesRow>
    </GuessRow>
  );

  if (!targetPlayer) return <div>Loading...</div>;

  const showPlayerList = isSearchFocused || searchText.length > 0;

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>← Geri</BackButton>
        <GuessCounter>
          <CounterText>
            {guesses.length} / {MAX_GUESSES}
          </CounterText>
        </GuessCounter>
      </Header>

      <MysteryCard>
        <MysteryEmoji>⚽</MysteryEmoji>
        <MysteryTextContainer>
          <MysteryTitle>Guess the Player</MysteryTitle>
          <MysterySubtitle>Bu futbolcu kim?</MysterySubtitle>
        </MysteryTextContainer>
        <QuestionMark>?</QuestionMark>
      </MysteryCard>

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
              {getFilteredPlayers()
                .slice(0, 10)
                .map((player) => (
                  <PlayerItem
                    key={player.id}
                    onClick={() => handleSelectPlayer(player)}
                  >
                    <PlayerLogo src={player.team_logo} alt={player.team} />
                    <PlayerInfo>
                      <PlayerItemName>{player.name}</PlayerItemName>
                      <PlayerItemTeam>{player.team}</PlayerItemTeam>
                    </PlayerInfo>
                    <PlayerFlag
                      src={player.nationality_flag}
                      alt={player.nationality}
                    />
                  </PlayerItem>
                ))}
            </PlayerList>
          </PlayerListContainer>
        </>
      )}

      <GuessesContainer>
        {[...guesses].reverse().map((guess) => renderGuessRow(guess))}
      </GuessesContainer>

      {gameOver && (
        <GameOverContainer>
          <ResultCard>
            <ResultEmoji>{won ? "🎉" : "😔"}</ResultEmoji>
            <ResultTitle $won={won}>{won ? "Doğru!" : "Yanlış!"}</ResultTitle>
            <ResultPlayer>
              {won
                ? `${guesses.length} tahminde bildin!`
                : `Cevap: ${targetPlayer?.name}`}
            </ResultPlayer>
          </ResultCard>
          <PlayAgainButton onClick={resetGame}>Tekrar Oyna</PlayAgainButton>
        </GameOverContainer>
      )}
    </Container>
  );
};

export default GuessPlayerScreen;
