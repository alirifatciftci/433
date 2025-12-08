import React, { useState, useEffect, useRef } from 'react';
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
import { PLAYERS, getRandomPlayer } from '../data/players';

const { width } = Dimensions.get('window');
const MAX_GUESSES = 8;

const COLORS = {
    correct: '#22c55e',
    close: '#eab308',
    wrong: '#6b7280',
};

// Animasyonlu Attribute Cell
const AnimatedCell = ({ value, result, label, delay, isImage }) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(delay),
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 100,
                    friction: 8,
                    useNativeDriver: true,
                }),
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, []);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg'],
    });

    return (
        <View style={styles.attributeCell}>
            <Animated.View
                style={[
                    styles.attributeValue,
                    { backgroundColor: COLORS[result], transform: [{ scale: scaleAnim }, { rotateY: rotate }] },
                ]}
            >
                {isImage ? (
                    <Image source={{ uri: value }} style={styles.cellImage} />
                ) : (
                    <Text style={styles.attributeText}>{value}</Text>
                )}
            </Animated.View>
            <Text style={styles.attributeLabel}>{label}</Text>
        </View>
    );
};


export default function GuessPlayerScreen({ onSuccess, onBack }) {
    const [targetPlayer, setTargetPlayer] = useState(null);
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        setTargetPlayer(getRandomPlayer());
    }, []);

    const handleInputChange = (text) => {
        setCurrentGuess(text);
        if (text.length > 1) {
            const filtered = PLAYERS.filter(
                (p) => p.name.toLowerCase().includes(text.toLowerCase()) && !guesses.find((g) => g.id === p.id)
            ).slice(0, 5);
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
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
        setCurrentGuess('');
        setSuggestions([]);

        if (player.id === targetPlayer.id) {
            setWon(true);
            setGameOver(true);
            setTimeout(() => onSuccess(500), 1500);
        } else if (newGuesses.length >= MAX_GUESSES) {
            setGameOver(true);
        }
    };


    const comparePlayer = (guess, target) => {
        return {
            nationality: guess.nationality === target.nationality ? 'correct' : 'wrong',
            league: guess.league === target.league ? 'correct' : 'wrong',
            team: guess.team === target.team ? 'correct' : 'wrong',
            position: guess.position === target.position ? 'correct' : 'wrong',
            age: getAgeResult(guess.age, target.age),
            ageDirection: guess.age < target.age ? '↑' : guess.age > target.age ? '↓' : '',
            shirtNumber: getNumberResult(guess.shirtNumber, target.shirtNumber),
            shirtDirection: guess.shirtNumber < target.shirtNumber ? '↑' : guess.shirtNumber > target.shirtNumber ? '↓' : '',
        };
    };

    const getAgeResult = (guess, target) => {
        if (guess === target) return 'correct';
        if (Math.abs(guess - target) <= 2) return 'close';
        return 'wrong';
    };

    const getNumberResult = (guess, target) => {
        if (guess === target) return 'correct';
        if (Math.abs(guess - target) <= 5) return 'close';
        return 'wrong';
    };

    const resetGame = () => {
        setTargetPlayer(getRandomPlayer());
        setGuesses([]);
        setCurrentGuess('');
        setGameOver(false);
        setWon(false);
    };

    const renderGuessRow = (guess) => (
        <View key={guess.guessTime} style={styles.guessRow}>
            <Text style={styles.playerName}>{guess.name}</Text>
            <View style={styles.attributesRow}>
                <AnimatedCell key={`nat-${guess.guessTime}`} value={guess.nationalityFlag} result={guess.results.nationality} label="NAT" delay={0} isImage />
                <AnimatedCell key={`lge-${guess.guessTime}`} value={guess.leagueLogo} result={guess.results.league} label="LGE" delay={100} isImage />
                <AnimatedCell key={`team-${guess.guessTime}`} value={guess.teamLogo} result={guess.results.team} label="TEAM" delay={200} isImage />
                <AnimatedCell key={`pos-${guess.guessTime}`} value={guess.position} result={guess.results.position} label="POS" delay={300} />
                <AnimatedCell key={`age-${guess.guessTime}`} value={`${guess.age}${guess.results.ageDirection}`} result={guess.results.age} label="AGE" delay={400} />
                <AnimatedCell key={`shirt-${guess.guessTime}`} value={`#${guess.shirtNumber}${guess.results.shirtDirection}`} result={guess.results.shirtNumber} label="SHIRT" delay={500} />
            </View>
        </View>
    );


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <LinearGradient colors={['#0a0a0f', '#1a1a2e', '#0a0a0f']} style={StyleSheet.absoluteFill} />

            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.guessCounter}>
                    {guesses.length} / {MAX_GUESSES}
                </Text>
            </View>

            {/* Yeni Tasarım - Mystery Player Card */}
            <View style={styles.mysteryCard}>
                <LinearGradient colors={['#1a1a2e', '#252542']} style={styles.mysteryGradient}>
                    <View style={styles.mysteryIconContainer}>
                        <LinearGradient colors={['#00ff88', '#00d4ff']} style={styles.mysteryIconBg}>
                            <Text style={styles.mysteryIcon}>⚽</Text>
                        </LinearGradient>
                    </View>
                    <View style={styles.mysteryTextContainer}>
                        <Text style={styles.mysteryTitle}>Guess the Player</Text>
                        <Text style={styles.mysterySubtitle}>Who is this footballer?</Text>
                    </View>
                    <View style={styles.questionMarkContainer}>
                        <Text style={styles.questionMark}>?</Text>
                    </View>
                </LinearGradient>
            </View>

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
                {[...guesses].reverse().map((guess) => renderGuessRow(guess))}
            </ScrollView>

            {gameOver && (
                <View style={styles.gameOverContainer}>
                    <Text style={styles.gameOverText}>{won ? '🎉 Correct!' : `❌ It was ${targetPlayer?.name}`}</Text>
                    <TouchableOpacity style={styles.playAgainButton} onPress={resetGame}>
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
    mysteryCard: {
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 16,
        overflow: 'hidden',
    },
    mysteryGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,255,136,0.2)',
        borderRadius: 16,
    },
    mysteryIconContainer: {
        marginRight: 16,
    },
    mysteryIconBg: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mysteryIcon: {
        fontSize: 24,
    },
    mysteryTextContainer: {
        flex: 1,
    },
    mysteryTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    mysterySubtitle: {
        color: '#888',
        fontSize: 12,
        marginTop: 2,
    },
    questionMarkContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionMark: {
        fontSize: 24,
        color: '#00ff88',
        fontWeight: 'bold',
    },
    inputSection: {
        marginHorizontal: 20,
        marginTop: 20,
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
        marginBottom: 16,
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 12,
        padding: 12,
    },
    playerName: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    attributesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 6,
    },
    attributeCell: {
        alignItems: 'center',
        flex: 1,
    },
    attributeValue: {
        width: (width - 80) / 6,
        height: (width - 80) / 6,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    attributeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold',
    },
    cellImage: {
        width: '70%',
        height: '70%',
        resizeMode: 'contain',
    },
    attributeLabel: {
        color: '#666',
        fontSize: 9,
        marginTop: 4,
        fontWeight: '600',
    },
    gameOverContainer: {
        padding: 20,
        alignItems: 'center',
    },
    gameOverText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
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
