import { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Image,
    Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PLAYERS, getRandomCommonPlayerChallenge, findCommonPlayers } from '../data/players';
import { TEAMS } from '../data/teams';

const { width } = Dimensions.get('window');
const MAX_GUESSES = 6;

export default function CommonPlayerScreen({ onSuccess, onBack }) {
    const [challenge, setChallenge] = useState(null);
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [foundPlayers, setFoundPlayers] = useState([]);

    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        startNewGame();
    }, []);

    useEffect(() => {
        if (challenge) {
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }).start();
        }
    }, [challenge]);

    const startNewGame = () => {
        const newChallenge = getRandomCommonPlayerChallenge();
        setChallenge(newChallenge);
        setGuesses([]);
        setCurrentGuess('');
        setGameOver(false);
        setWon(false);
        setFoundPlayers([]);
        scaleAnim.setValue(0);
    };

    const handleInputChange = (text) => {
        setCurrentGuess(text);
        if (text.length > 1) {
            const filtered = PLAYERS.filter(
                (p) =>
                    p.name.toLowerCase().includes(text.toLowerCase()) &&
                    !guesses.includes(p.id) &&
                    !foundPlayers.includes(p.id)
            ).slice(0, 5);
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectPlayer = (player) => {
        if (!challenge || gameOver) return;

        const isCorrect = challenge.commonPlayers.some((p) => p.id === player.id);
        const newGuesses = [...guesses, player.id];
        setGuesses(newGuesses);
        setCurrentGuess('');
        setSuggestions([]);

        if (isCorrect) {
            const newFoundPlayers = [...foundPlayers, player.id];
            setFoundPlayers(newFoundPlayers);

            // Tüm ortak oyuncuları bulduysa veya 1 tane bulduysa kazandı
            if (newFoundPlayers.length >= 1) {
                setWon(true);
                setGameOver(true);
                setTimeout(() => onSuccess(500), 1500);
            }
        } else if (newGuesses.length >= MAX_GUESSES) {
            setGameOver(true);
        }
    };

    if (!challenge) {
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#0a0a0f', '#1a1a2e', '#0a0a0f']} style={StyleSheet.absoluteFill} />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    const team1 = TEAMS[challenge.team1];
    const team2 = TEAMS[challenge.team2];

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <LinearGradient colors={['#0a0a0f', '#1a1a2e', '#0a0a0f']} style={StyleSheet.absoluteFill} />

            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.guessCounter}>{guesses.length} / {MAX_GUESSES}</Text>
            </View>

            <Text style={styles.title}>Common Player</Text>
            <Text style={styles.subtitle}>Who played for both teams?</Text>

            <Animated.View style={[styles.teamsContainer, { transform: [{ scale: scaleAnim }] }]}>
                <View style={styles.teamCard}>
                    <Image source={{ uri: team1?.logo }} style={styles.teamLogo} />
                    <Text style={styles.teamName}>{team1?.name}</Text>
                </View>

                <View style={styles.vsContainer}>
                    <LinearGradient colors={['#00ff88', '#00d4ff']} style={styles.vsGradient}>
                        <Text style={styles.vsText}>🔗</Text>
                    </LinearGradient>
                </View>

                <View style={styles.teamCard}>
                    <Image source={{ uri: team2?.logo }} style={styles.teamLogo} />
                    <Text style={styles.teamName}>{team2?.name}</Text>
                </View>
            </Animated.View>

            <View style={styles.inputSection}>
                <TextInput
                    style={styles.input}
                    placeholder="Type player name..."
                    placeholderTextColor="#666"
                    value={currentGuess}
                    onChangeText={handleInputChange}
                    editable={!gameOver}
                />

                {suggestions.length > 0 && (
                    <View style={styles.suggestionsContainer}>
                        {suggestions.map((player) => (
                            <TouchableOpacity key={player.id} style={styles.suggestionItem} onPress={() => handleSelectPlayer(player)}>
                                <Image source={{ uri: player.teamLogo }} style={styles.suggestionLogo} />
                                <View style={styles.suggestionInfo}>
                                    <Text style={styles.suggestionText}>{player.name}</Text>
                                    <Text style={styles.suggestionTeam}>{player.team}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            <ScrollView style={styles.guessesContainer} showsVerticalScrollIndicator={false}>
                {[...guesses].reverse().map((playerId, index) => {
                    const player = PLAYERS.find((p) => p.id === playerId);
                    const isCorrect = challenge.commonPlayers.some((p) => p.id === playerId);
                    return (
                        <View key={index} style={[styles.guessRow, isCorrect ? styles.correctGuess : styles.wrongGuess]}>
                            <Image source={{ uri: player?.teamLogo }} style={styles.guessLogo} />
                            <Text style={styles.guessName}>{player?.name}</Text>
                            <Text style={styles.guessResult}>{isCorrect ? '✓' : '✗'}</Text>
                        </View>
                    );
                })}
            </ScrollView>

            {gameOver && (
                <View style={styles.gameOverContainer}>
                    <Text style={styles.gameOverText}>
                        {won ? '🎉 Correct!' : `❌ Answer: ${challenge.commonPlayers.map((p) => p.name).join(', ')}`}
                    </Text>
                    <TouchableOpacity style={styles.playAgainButton} onPress={startNewGame}>
                        <LinearGradient colors={['#00ff88', '#00d4ff']} style={styles.playAgainGradient}>
                            <Text style={styles.playAgainText}>Play Again</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            )}
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    backButton: {
        padding: 8,
    },
    backText: {
        color: '#888',
        fontSize: 16,
    },
    guessCounter: {
        color: '#00ff88',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    subtitle: {
        color: '#888',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 4,
    },
    teamsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 20,
    },
    teamCard: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 8,
    },
    teamLogo: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    teamName: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    vsContainer: {
        marginHorizontal: 8,
    },
    vsGradient: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    vsText: {
        fontSize: 20,
    },
    inputSection: {
        marginHorizontal: 20,
        marginTop: 24,
        position: 'relative',
        zIndex: 10,
    },
    input: {
        backgroundColor: '#1a1a2e',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#fff',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    suggestionsContainer: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        backgroundColor: '#1a1a2e',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        overflow: 'hidden',
        zIndex: 20,
    },
    suggestionItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    suggestionLogo: {
        width: 30,
        height: 30,
        marginRight: 12,
    },
    suggestionInfo: {
        flex: 1,
    },
    suggestionText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    suggestionTeam: {
        color: '#666',
        fontSize: 12,
    },
    guessesContainer: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20,
    },
    guessRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 12,
        marginBottom: 10,
    },
    correctGuess: {
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderWidth: 1,
        borderColor: '#22c55e',
    },
    wrongGuess: {
        backgroundColor: 'rgba(107, 114, 128, 0.2)',
        borderWidth: 1,
        borderColor: '#6b7280',
    },
    guessLogo: {
        width: 36,
        height: 36,
        marginRight: 12,
    },
    guessName: {
        flex: 1,
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    guessResult: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    gameOverContainer: {
        padding: 20,
        alignItems: 'center',
    },
    gameOverText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    playAgainButton: {
        borderRadius: 12,
        overflow: 'hidden',
        width: '100%',
    },
    playAgainGradient: {
        padding: 16,
        alignItems: 'center',
    },
    playAgainText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
