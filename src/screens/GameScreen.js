import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const TEAM_1 = { name: 'Real Madrid', color: '#fff', bgColor: '#1a1a2e' };
const TEAM_2 = { name: 'Manchester United', color: '#da291c', bgColor: '#1a1a2e' };
const CORRECT_ANSWER = 'ronaldo';

export default function GameScreen({ onSuccess, onBack }) {
    const [answer, setAnswer] = useState('');
    const [shake, setShake] = useState(false);

    const handleSubmit = () => {
        if (answer.toLowerCase().trim() === CORRECT_ANSWER) {
            onSuccess(500);
        } else {
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <LinearGradient
                colors={['#0a0a0f', '#1a1a2e', '#0a0a0f']}
                style={StyleSheet.absoluteFill}
            />

            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
                <View style={styles.timerBadge}>
                    <Text style={styles.timerText}>⏱️ 2:30</Text>
                </View>
            </View>

            <Text style={styles.questionTitle}>Guess the Common Player</Text>
            <Text style={styles.questionSubtitle}>Which player played for both teams?</Text>

            <View style={styles.teamsContainer}>
                <View style={styles.teamCard}>
                    <LinearGradient
                        colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.02)']}
                        style={styles.teamGradient}
                    >
                        <View style={[styles.teamLogo, { borderColor: TEAM_1.color }]}>
                            <Text style={styles.teamEmoji}>⚪</Text>
                        </View>
                        <Text style={styles.teamName}>{TEAM_1.name}</Text>
                    </LinearGradient>
                </View>

                <View style={styles.vsContainer}>
                    <LinearGradient
                        colors={['#00ff88', '#00d4ff']}
                        style={styles.vsGradient}
                    >
                        <Text style={styles.vsText}>VS</Text>
                    </LinearGradient>
                </View>

                <View style={styles.teamCard}>
                    <LinearGradient
                        colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.02)']}
                        style={styles.teamGradient}
                    >
                        <View style={[styles.teamLogo, { borderColor: TEAM_2.color }]}>
                            <Text style={styles.teamEmoji}>🔴</Text>
                        </View>
                        <Text style={styles.teamName}>{TEAM_2.name}</Text>
                    </LinearGradient>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <LinearGradient
                    colors={['rgba(0,255,136,0.2)', 'rgba(0,212,255,0.2)']}
                    style={styles.inputGlow}
                >
                    <TextInput
                        style={[styles.input, shake && styles.inputShake]}
                        placeholder="Type player name..."
                        placeholderTextColor="#666"
                        value={answer}
                        onChangeText={setAnswer}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </LinearGradient>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <LinearGradient
                        colors={['#00ff88', '#00d4ff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.submitGradient}
                    >
                        <Text style={styles.submitText}>Submit</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <View style={styles.hintContainer}>
                <TouchableOpacity style={styles.hintButton}>
                    <Text style={styles.hintText}>💡 Use Hint (-50 pts)</Text>
                </TouchableOpacity>
            </View>
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
    timerBadge: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    timerText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    questionTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
    },
    questionSubtitle: {
        color: '#666',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
    },
    teamsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        paddingHorizontal: 20,
    },
    teamCard: {
        flex: 1,
        maxWidth: 140,
    },
    teamGradient: {
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    teamLogo: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginBottom: 12,
    },
    teamEmoji: {
        fontSize: 30,
    },
    teamName: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    vsContainer: {
        marginHorizontal: 16,
    },
    vsGradient: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    vsText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputContainer: {
        paddingHorizontal: 20,
        marginTop: 40,
    },
    inputGlow: {
        borderRadius: 16,
        padding: 2,
    },
    input: {
        backgroundColor: '#1a1a2e',
        borderRadius: 14,
        padding: 18,
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
    inputShake: {
        borderColor: '#ff4444',
        borderWidth: 1,
    },
    submitButton: {
        marginTop: 16,
        borderRadius: 14,
        overflow: 'hidden',
    },
    submitGradient: {
        padding: 18,
        alignItems: 'center',
    },
    submitText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    hintContainer: {
        alignItems: 'center',
        marginTop: 24,
    },
    hintButton: {
        padding: 12,
    },
    hintText: {
        color: '#666',
        fontSize: 14,
    },
});
