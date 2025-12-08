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
import { PLAYERS } from '../data/players';
import { TEAMS } from '../data/teams';

const { width } = Dimensions.get('window');
const MAX_GUESSES = 5;

// Transfer geçmişi olan oyuncuları filtrele
const getPlayersWithHistory = () => {
    return PLAYERS.filter((p) => p.previousTeams && p.previousTeams.length > 0);
};

export default function TransferTriviaScreen({ onSuccess, onBack }) {
    const [targetPlayer, setTargetPlayer] = useState(null);
    const [revealedSteps, setRevealedSteps] = useState(1);
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [transferHistory, setTransferHistory] = useState([]);

    const stepAnims = useRef([]).current;

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        const playersWithHistory = getPlayersWithHistory();
        const randomPlayer = playersWithHistory[Math.floor(Math.random() * playersWithHistory.length)];

        // Transfer geçmişini oluştur - EN ESKİDEN EN YENİYE
        // previousTeams array'i en eskiden en yeniye sıralı
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
        setCurrentGuess('');
        setGameOver(false);
        setWon(false);

        // Animasyon değerlerini sıfırla
        stepAnims.length = 0;
        history.forEach(() => stepAnims.push(new Animated.Value(0)));

        // İlk adımı göster (en eski takım)
        setTimeout(() => revealStep(0), 300);
    };

    const revealStep = (index) => {
        if (stepAnims[index]) {
            Animated.spring(stepAnims[index], {
                toValue: 1,
                tension: 80,
                friction: 8,
                useNativeDriver: true,
            }).start();
        }
    };

    const handleInputChange = (text) => {
        setCurrentGuess(text);
        if (text.length > 1) {
            const filtered = PLAYERS.filter(
                (p) =>
                    p.name.toLowerCase().includes(text.toLowerCase()) &&
                    !guesses.some((g) => g.id === p.id)
            ).slice(0, 5);
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectPlayer = (player) => {
        if (!targetPlayer || gameOver) return;

        const isCorrect = player.id === targetPlayer.id;
        const newGuesses = [...guesses, { ...player, isCorrect }];
        setGuesses(newGuesses);
        setCurrentGuess('');
        setSuggestions([]);

        if (isCorrect) {
            setWon(true);
            setGameOver(true);
            // Tüm adımları göster
            transferHistory.forEach((_, i) => revealStep(i));
            setTimeout(() => onSuccess(500), 1500);
        } else {
            // Yanlış cevap - bir sonraki ipucunu göster
            if (revealedSteps < transferHistory.length) {
                const nextStep = revealedSteps;
                setRevealedSteps(nextStep + 1);
                setTimeout(() => revealStep(nextStep), 300);
            }

            if (newGuesses.length >= MAX_GUESSES) {
                setGameOver(true);
                // Tüm adımları göster
                transferHistory.forEach((_, i) => revealStep(i));
            }
        }
    };

    const getPointsForGuess = () => {
        // Ne kadar az ipucu ile bilirse o kadar çok puan
        const basePoints = 500;
        const bonus = (transferHistory.length - revealedSteps) * 100;
        return basePoints + bonus;
    };

    const renderTransferStep = (step, index) => {
        const isRevealed = index < revealedSteps || gameOver;
        const animValue = stepAnims[index] || new Animated.Value(0);

        return (
            <Animated.View
                key={index}
                style={[
                    styles.transferStep,
                    {
                        opacity: animValue,
                        transform: [
                            {
                                scale: animValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.5, 1],
                                }),
                            },
                        ],
                    },
                ]}
            >
                {index > 0 && <View style={styles.transferArrow}><Text style={styles.arrowText}>↓</Text></View>}
                <View style={[styles.teamStep, step.isCurrent && styles.currentTeam]}>
                    {isRevealed && step.team ? (
                        <>
                            <Image source={{ uri: step.team.logo }} style={styles.stepLogo} />
                            <View style={styles.stepInfo}>
                                <Text style={styles.stepTeamName}>{step.team.name}</Text>
                                <Text style={styles.stepLeague}>{step.team.league}</Text>
                            </View>
                            {step.isCurrent && (
                                <View style={styles.currentBadge}>
                                    <Text style={styles.currentBadgeText}>NOW</Text>
                                </View>
                            )}
                        </>
                    ) : (
                        <View style={styles.hiddenStep}>
                            <Text style={styles.hiddenText}>?</Text>
                        </View>
                    )}
                </View>
            </Animated.View>
        );
    };

    if (!targetPlayer) {
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#0a0a0f', '#1a1a2e', '#0a0a0f']} style={StyleSheet.absoluteFill} />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <LinearGradient colors={['#0a0a0f', '#1a1a2e', '#0a0a0f']} style={StyleSheet.absoluteFill} />

            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
                <View style={styles.headerRight}>
                    <Text style={styles.hintText}>💡 {revealedSteps}/{transferHistory.length}</Text>
                    <Text style={styles.guessCounter}>{guesses.length}/{MAX_GUESSES}</Text>
                </View>
            </View>

            <Text style={styles.title}>Transfer Trivia</Text>
            <Text style={styles.subtitle}>Guess the player from their career path</Text>

            <ScrollView style={styles.transferContainer} contentContainerStyle={styles.transferContent}>
                {transferHistory.map((step, index) => renderTransferStep(step, index))}
            </ScrollView>

            {!gameOver && (
                <View style={styles.inputSection}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type player name..."
                        placeholderTextColor="#666"
                        value={currentGuess}
                        onChangeText={handleInputChange}
                    />

                    {suggestions.length > 0 && (
                        <View style={styles.suggestionsContainer}>
                            {suggestions.map((player) => (
                                <TouchableOpacity
                                    key={player.id}
                                    style={styles.suggestionItem}
                                    onPress={() => handleSelectPlayer(player)}
                                >
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
            )}

            {guesses.length > 0 && !gameOver && (
                <View style={styles.wrongGuessesContainer}>
                    {guesses.filter(g => !g.isCorrect).map((guess, index) => (
                        <View key={index} style={styles.wrongGuessChip}>
                            <Text style={styles.wrongGuessText}>✗ {guess.name}</Text>
                        </View>
                    ))}
                </View>
            )}

            {gameOver && (
                <View style={styles.gameOverContainer}>
                    <View style={styles.resultCard}>
                        {won ? (
                            <>
                                <Text style={styles.resultEmoji}>🎉</Text>
                                <Text style={styles.resultTitle}>Correct!</Text>
                                <Text style={styles.resultPlayer}>{targetPlayer.name}</Text>
                            </>
                        ) : (
                            <>
                                <Text style={styles.resultEmoji}>😔</Text>
                                <Text style={styles.resultTitle}>It was...</Text>
                                <Text style={styles.resultPlayer}>{targetPlayer.name}</Text>
                            </>
                        )}
                        <Image source={{ uri: targetPlayer.nationalityFlag }} style={styles.resultFlag} />
                    </View>
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
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    hintText: {
        color: '#ffd700',
        fontSize: 14,
        fontWeight: '600',
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
        marginTop: 16,
    },
    subtitle: {
        color: '#888',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 4,
    },
    transferContainer: {
        flex: 1,
        marginTop: 20,
    },
    transferContent: {
        paddingHorizontal: 40,
        paddingBottom: 20,
        alignItems: 'center',
    },
    transferStep: {
        alignItems: 'center',
        width: '100%',
    },
    transferArrow: {
        marginVertical: 8,
    },
    arrowText: {
        color: '#00ff88',
        fontSize: 20,
    },
    teamStep: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 14,
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    currentTeam: {
        borderColor: '#00ff88',
        backgroundColor: 'rgba(0,255,136,0.1)',
    },
    stepLogo: {
        width: 45,
        height: 45,
        resizeMode: 'contain',
    },
    stepInfo: {
        flex: 1,
        marginLeft: 14,
    },
    stepTeamName: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    stepLeague: {
        color: '#888',
        fontSize: 12,
        marginTop: 2,
    },
    currentBadge: {
        backgroundColor: '#00ff88',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    currentBadgeText: {
        color: '#000',
        fontSize: 10,
        fontWeight: 'bold',
    },
    hiddenStep: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
    },
    hiddenText: {
        color: '#666',
        fontSize: 28,
        fontWeight: 'bold',
    },
    inputSection: {
        marginHorizontal: 20,
        marginBottom: 20,
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
        bottom: 60,
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
    wrongGuessesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        marginBottom: 10,
        gap: 8,
    },
    wrongGuessChip: {
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.3)',
    },
    wrongGuessText: {
        color: '#ef4444',
        fontSize: 12,
        fontWeight: '500',
    },
    gameOverContainer: {
        padding: 20,
        alignItems: 'center',
    },
    resultCard: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        width: '100%',
        marginBottom: 16,
    },
    resultEmoji: {
        fontSize: 48,
        marginBottom: 12,
    },
    resultTitle: {
        color: '#888',
        fontSize: 14,
    },
    resultPlayer: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 4,
    },
    resultFlag: {
        width: 40,
        height: 28,
        marginTop: 12,
        borderRadius: 4,
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
