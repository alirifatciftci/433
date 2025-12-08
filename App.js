import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import GuessPlayerScreen from './src/screens/GuessPlayerScreen';
import CommonPlayerScreen from './src/screens/CommonPlayerScreen';
import TransferTriviaScreen from './src/screens/TransferTriviaScreen';
import SuccessScreen from './src/screens/SuccessScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [points, setPoints] = useState(0);

  const navigateTo = (screen) => setCurrentScreen(screen);

  const handleSuccess = (earnedPoints) => {
    setPoints(prev => prev + earnedPoints);
    navigateTo('success');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {currentScreen === 'home' && (
        <HomeScreen onNavigate={navigateTo} totalPoints={points} />
      )}
      {currentScreen === 'game' && (
        <CommonPlayerScreen onSuccess={handleSuccess} onBack={() => navigateTo('home')} />
      )}
      {currentScreen === 'guessPlayer' && (
        <GuessPlayerScreen onSuccess={handleSuccess} onBack={() => navigateTo('home')} />
      )}
      {currentScreen === 'transferTrivia' && (
        <TransferTriviaScreen onSuccess={handleSuccess} onBack={() => navigateTo('home')} />
      )}
      {currentScreen === 'success' && (
        <SuccessScreen points={500} onContinue={() => navigateTo('home')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
});
