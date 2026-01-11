import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import HomeScreen from "./components/HomeScreen";
import GuessPlayerScreen from "./components/GuessPlayerScreen";
import CommonPlayerScreen from "./components/CommonPlayerScreen";
import TransferTriviaScreen from "./components/TransferTriviaScreen";
import GridGameScreen from "./components/GridGameScreen";
import DailyChallengeScreen from "./components/DailyChallengeScreen";
import SuccessScreen from "./components/SuccessScreen";

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  overflow-x: hidden;
`;

const GAMES = {
  HOME: "home",
  GUESS_PLAYER: "guessPlayer",
  COMMON_PLAYER: "commonPlayer",
  TRANSFER_TRIVIA: "transferTrivia",
  GRID_GAME: "gridGame",
  DAILY_CHALLENGE: "dailyChallenge",
  SUCCESS: "success",
};

function App() {
  const [currentScreen, setCurrentScreen] = useState(GAMES.HOME);
  const [totalPoints, setTotalPoints] = useState(2500);
  const [gameResult, setGameResult] = useState(null);
  const [gridKey, setGridKey] = useState(0);

  // URL'de challenge varsa direkt oraya git
  useEffect(() => {
    if (window.location.hash.startsWith("#challenge=")) {
      setCurrentScreen(GAMES.DAILY_CHALLENGE);
    }
  }, []);

  const navigateToScreen = (screen, result = null) => {
    setGameResult(result);
    if (screen === GAMES.GRID_GAME) {
      setGridKey((prev) => prev + 1);
    }
    setCurrentScreen(screen);
  };

  const handleGameComplete = (points, result) => {
    setTotalPoints((prev) => prev + points);
    setGameResult(result);
    setCurrentScreen(GAMES.SUCCESS);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case GAMES.HOME:
        return (
          <HomeScreen onNavigate={navigateToScreen} totalPoints={totalPoints} />
        );
      case GAMES.GUESS_PLAYER:
        return (
          <GuessPlayerScreen
            onBack={() => setCurrentScreen(GAMES.HOME)}
            onComplete={handleGameComplete}
          />
        );
      case GAMES.COMMON_PLAYER:
        return (
          <CommonPlayerScreen
            onBack={() => setCurrentScreen(GAMES.HOME)}
            onComplete={handleGameComplete}
          />
        );
      case GAMES.TRANSFER_TRIVIA:
        return (
          <TransferTriviaScreen
            onBack={() => setCurrentScreen(GAMES.HOME)}
            onComplete={handleGameComplete}
          />
        );
      case GAMES.GRID_GAME:
        return (
          <GridGameScreen
            key={`grid-${gridKey}`}
            onBack={() => {
              setGridKey((prev) => prev + 1);
              setCurrentScreen(GAMES.HOME);
            }}
            onComplete={handleGameComplete}
          />
        );
      case GAMES.DAILY_CHALLENGE:
        return (
          <DailyChallengeScreen
            onBack={() => {
              window.location.hash = "";
              setCurrentScreen(GAMES.HOME);
            }}
            onStartChallenge={(challengeData) => {
              // Daily challenge'ı guess player olarak başlat
              setCurrentScreen(GAMES.GUESS_PLAYER);
            }}
          />
        );
      case GAMES.SUCCESS:
        return (
          <SuccessScreen
            result={gameResult}
            onPlayAgain={() => setCurrentScreen(GAMES.HOME)}
          />
        );
      default:
        return (
          <HomeScreen onNavigate={navigateToScreen} totalPoints={totalPoints} />
        );
    }
  };

  return (
    <AppContainer>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </AppContainer>
  );
}

export default App;
