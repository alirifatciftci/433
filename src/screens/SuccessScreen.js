import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const CONFETTI_COLORS = ['#00ff88', '#00d4ff', '#ffd700', '#ff6b00', '#a855f7'];

const Confetti = ({ delay, color }) => {
    const translateY = useRef(new Animated.Value(-50)).current;
    const translateX = useRef(new Animated.Value(Math.random() * width)).current;
    const rotate = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const startAnimation = () => {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: height + 50,
                    duration: 3000 + Math.random() * 2000,
                    delay,
                    useNativeDriver: true,
                }),
                Animated.timing(rotate, {
                    toValue: 360,
                    duration: 2000,
                    delay,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 3000,
                    delay: delay + 2000,
                    useNativeDriver: true,
                }),
            ]).start();
        };
        startAnimation();
    }, []);

    return (
        <Animated.View
            style={[
                styles.confetti,
                {
                    backgroundColor: color,
                    transform: [
                        { translateY },
                        { translateX },
                        {
                            rotate: rotate.interpolate({
                                inputRange: [0, 360],
                                outputRange: ['0deg', '360deg'],
                            })
                        },
                    ],
                    opacity,
                },
            ]}
        />
    );
};

export default function SuccessScreen({ points, onContinue }) {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const pointsAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.timing(pointsAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const confettiPieces = Array.from({ length: 30 }, (_, i) => (
        <Confetti
            key={i}
            delay={i * 100}
            color={CONFETTI_COLORS[i % CONFETTI_COLORS.length]}
        />
    ));

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#0a0a0f', '#1a1a2e', '#0a0a0f']}
                style={StyleSheet.absoluteFill}
            />

            {confettiPieces}

            <View style={styles.content}>
                <Animated.View style={[styles.trophyContainer, { transform: [{ scale: scaleAnim }] }]}>
                    <LinearGradient
                        colors={['#ffd700', '#ffaa00']}
                        style={styles.trophyGlow}
                    >
                        <Text style={styles.trophyEmoji}>🏆</Text>
                    </LinearGradient>
                </Animated.View>

                <Text style={styles.title}>Victory!</Text>
                <Text style={styles.subtitle}>You got it right!</Text>

                <Animated.View style={[styles.pointsContainer, { opacity: pointsAnim }]}>
                    <View style={styles.coinsRow}>
                        <Text style={styles.coinEmoji}>🪙</Text>
                        <Text style={styles.coinEmoji}>🪙</Text>
                        <Text style={styles.coinEmoji}>🪙</Text>
                    </View>
                    <LinearGradient
                        colors={['#00ff88', '#00d4ff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.pointsBadge}
                    >
                        <Text style={styles.pointsText}>+{points}</Text>
                        <Text style={styles.pointsLabel}>Points</Text>
                    </LinearGradient>
                </Animated.View>

                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>Streak 🔥</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>2.3s</Text>
                        <Text style={styles.statLabel}>Time ⚡</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
                    <LinearGradient
                        colors={['#00ff88', '#00d4ff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.continueGradient}
                    >
                        <Text style={styles.continueText}>Continue Playing</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.shareButton}>
                    <Text style={styles.shareText}>📤 Share Result</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    confetti: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 2,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    trophyContainer: {
        marginBottom: 24,
    },
    trophyGlow: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#ffd700',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 30,
    },
    trophyEmoji: {
        fontSize: 60,
    },
    title: {
        color: '#fff',
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        color: '#888',
        fontSize: 16,
        marginBottom: 32,
    },
    pointsContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    coinsRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    coinEmoji: {
        fontSize: 32,
        marginHorizontal: 4,
    },
    pointsBadge: {
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 20,
        alignItems: 'center',
    },
    pointsText: {
        color: '#000',
        fontSize: 42,
        fontWeight: 'bold',
    },
    pointsLabel: {
        color: 'rgba(0,0,0,0.7)',
        fontSize: 14,
        fontWeight: '600',
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 32,
    },
    statItem: {
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    statValue: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    statLabel: {
        color: '#666',
        fontSize: 12,
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    continueButton: {
        width: '100%',
        borderRadius: 14,
        overflow: 'hidden',
        marginBottom: 16,
    },
    continueGradient: {
        padding: 18,
        alignItems: 'center',
    },
    continueText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    shareButton: {
        padding: 12,
    },
    shareText: {
        color: '#666',
        fontSize: 14,
    },
});
