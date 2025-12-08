import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const GAMES = [
    { id: 1, title: 'Guess the Player', subtitle: 'Wordle style football', icon: '⚽', color: '#00ff88', screen: 'guessPlayer' },
    { id: 2, title: 'Common Player', subtitle: 'Find the link', icon: '🔗', color: '#00d4ff', screen: 'game' },
    { id: 3, title: 'Transfer Trivia', subtitle: 'Career path quiz', icon: '✈️', color: '#ff6b00', screen: 'transferTrivia' },
    { id: 4, title: 'Stadium Master', subtitle: 'Coming soon', icon: '🏟️', color: '#a855f7', screen: 'game' },
];

export default function HomeScreen({ onNavigate, totalPoints }) {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(0,255,136,0.1)', 'transparent']}
                style={styles.gradientOverlay}
            />

            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Welcome back!</Text>
                    <Text style={styles.title}>Game Hub</Text>
                </View>
                <View style={styles.pointsBadge}>
                    <Text style={styles.pointsIcon}>🪙</Text>
                    <Text style={styles.pointsText}>{totalPoints}</Text>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>🔥 Popular Games</Text>

                <View style={styles.gamesGrid}>
                    {GAMES.map((game) => (
                        <TouchableOpacity
                            key={game.id}
                            style={styles.gameCard}
                            onPress={() => onNavigate(game.screen)}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.02)']}
                                style={styles.cardGradient}
                            >
                                <View style={[styles.iconContainer, { shadowColor: game.color }]}>
                                    <Text style={styles.gameIcon}>{game.icon}</Text>
                                </View>
                                <Text style={styles.gameTitle}>{game.title}</Text>
                                <Text style={styles.gameSubtitle}>{game.subtitle}</Text>
                                <View style={[styles.playButton, { backgroundColor: game.color }]}>
                                    <Text style={styles.playButtonText}>Play</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.featuredCard}>
                    <LinearGradient
                        colors={['#00ff88', '#00d4ff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.featuredGradient}
                    >
                        <Text style={styles.featuredTitle}>Daily Challenge</Text>
                        <Text style={styles.featuredSubtitle}>Win 1000 bonus points!</Text>
                        <TouchableOpacity style={styles.featuredButton}>
                            <Text style={styles.featuredButtonText}>Start Now →</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0f',
    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 300,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    greeting: {
        color: '#888',
        fontSize: 14,
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    },
    pointsBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    pointsIcon: {
        fontSize: 18,
        marginRight: 6,
    },
    pointsText: {
        color: '#00ff88',
        fontSize: 16,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    gamesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gameCard: {
        width: (width - 52) / 2,
        marginBottom: 12,
        borderRadius: 16,
        overflow: 'hidden',
    },
    cardGradient: {
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    gameIcon: {
        fontSize: 24,
    },
    gameTitle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    gameSubtitle: {
        color: '#666',
        fontSize: 12,
        marginBottom: 12,
    },
    playButton: {
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    playButtonText: {
        color: '#000',
        fontWeight: '600',
        fontSize: 12,
    },
    featuredCard: {
        marginTop: 8,
        marginBottom: 30,
        borderRadius: 20,
        overflow: 'hidden',
    },
    featuredGradient: {
        padding: 24,
    },
    featuredTitle: {
        color: '#000',
        fontSize: 22,
        fontWeight: 'bold',
    },
    featuredSubtitle: {
        color: 'rgba(0,0,0,0.7)',
        fontSize: 14,
        marginTop: 4,
    },
    featuredButton: {
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginTop: 16,
    },
    featuredButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
});
