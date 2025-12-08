import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PLAYERS, findPlayerByName, getRandomPlayer } from '../data/players';

const { width } = Dimensions.get('window');
const MAX_GUESSES = 8;

const COLORS = {
    correct: '#22c55e',
    close: '#eab308',
    wrong: '#6b7280',
    bg: '#0a0a0f',
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
            const filtered = PLAYERS.filter(p =>
                p.name.toLowerCase().includes(text.toLowerCase()) &&
                !guesses.find(g => g.id === p.id)
            ).slice(0, 5);
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const selectPlayer = (player) => {
        if (!targetPlayer || gameOver) return;

        const newGuess = {
            ...player,
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

    const renderGuessRow = (guess, index) => (
        <View key={index} style={styles.guessRow}>
            <Text style={styles.playerName}>{guess.name}</Text>
            <View style={styles.attributesRow}>
                <AttributeCell value={guess.nationality} result={guess.results.nationality} label="NAT" />
                <AttributeCell value={guess.league} result={guess.results.league} label="LGE" />
                <AttributeCell value={guess.teamLogo} result={guess.results.team} label="TEAM" />
                <AttributeCell value={guess.position} result={guess.results.position} label="POS" />
                <AttributeCell
                    value={`${guess.age}${guess.results.ageDirection}`}
                    result={guess.results.age}
                    label="AGE"
                />
                <AttributeCell
                    value={`#${guess.shirtNumber}${guess.results.shirtDirection}`}
                    result={guess.results.shirtNumber}
                    label="SHIRT"
                />
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
                <Text style={styles.guessCounter}>Guess {guesses.length} of {MAX_GUESSES}</Text>
            </View>

            <View style={styles.questionCard}>
                <View style={styles.leagueIcon}>
                    <Text style={styles.leagueEmoji}>🏴󠁧󠁢󠁥󠁮󠁧󠁿</Text>
                </View>
                <Text style={styles.questionMark}>?</Text>
            </View>

            <View style={styles.inputSection}>
                <TextInput
                    style={styles.input}
                    placeholder={`GUESS ${guesses.length + 1} OF ${MAX_GUESSES}`}
                    placeholderTextColor="#666"
                    value={currentGuess}
                    onChangeText={handleInputChange}
                    editable={!gameOver}
                />

                {suggestions.length > 0 && (
                    <View style={styles.suggestionsContainer}>
                        {suggestions.map((player) => (
                            <TouchableOpacity
                                key={player.id}
                                style={styles.suggestionItem}
                                onPress={() => selectPlayer(player)}
                            >
                                <Text style={styles.suggestionText}>{player.name}</Text>
                                <Text style={styles.suggestionTeam}>{player.team}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            <ScrollView style={styles.guessesContainer} showsVerticalScrollIndicator={false}>
                {guesses.map((guess, index) => renderGuessRow(guess, index))}
            </ScrollView>

            {gameOver && (
                <View style={styles.gameOverContainer}>
                    <Text style={styles.gameOverText}>
                        {won ? '🎉 Correct!' : `❌ It was ${targetPlayer?.name}`}
                    </Text>
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


const AttributeCell = ({ value, result, label }) => (
    <View style={styles.attributeCell}>
        <View style={[styles.attributeValue, { backgroundColor: COLORS[result] }]}>
            <Text style={styles.attributeText}>{value}</Text>
        </View>
        <Text style={styles.attributeLabel}>{label}</Text>
    </View>
);

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
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    questionCard: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 16,
        padding: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leagueIcon: {
        marginRight: 16,
    },
    leagueEmoji: {
        fontSize: 40,
    },
    questionMark: {
        fontSize: 60,
        color: '#9ca3af',
        fontWeight: 'bold',
    },
    inputSection: {
        marginHorizontal: 20,
        marginTop: 20,
        position: 'relative',
        zIndex: 10,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        fontWeight: '600',
    },
    suggestionsContainer: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        backgroundColor: '#1a1a2e',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        overflow: 'hidden',
    },
    suggestionItem: {
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        marginBottom: 12,
    },
    playerName: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    attributesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    attributeCell: {
        alignItems: 'center',
        flex: 1,
    },
    attributeValue: {
        width: (width - 60) / 6,
        height: (width - 60) / 6,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    attributeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    attributeLabel: {
        color: '#666',
        fontSize: 10,
        marginTop: 4,
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
