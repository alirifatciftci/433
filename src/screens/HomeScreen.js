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
    { id: 4, title: 'Football Grid', subtitle: '3x3 team puzzle', icon: '🎯', color: '#a855f7', screen: 'gridGame' },
];

// Logo komponenti
const AppLogo = () => (
    <View style={styles.logoContainer}>
        <Text style={styles.logoIcon}>⚽</Text>
        <View>
            <Text style={styles.logoText}>Footy</Text>
            <Text style={styles.logoTextAccent}>Quiz</Text>
        </View>
    </View>
);

export default function HomeScreen({ onNavigate, totalPoints }) {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(0,255,136,0.1)', 'transparent']}
                style={styles.gradientOverlay}
            />

            {/* Header with Logo */}
            <View style={styles.header}>
                <AppLogo />
                <View style={styles.pointsBadge}>
                    <Text style={styles.pointsIcon}>🪙</Text>
                    <Text style={styles.pointsText}>{totalPoints}</Text>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Welcome Section */}
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeText}>Hoş geldin! 👋</Text>
                    <Text style={styles.welcomeSubtext}>Bugün hangi oyunu oynamak istersin?</Text>
                </View>

                {/* Games Section */}
                <Text style={styles.sectionTitle}>🎮 Oyunlar</Text>

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
                                    <Text style={styles.playButtonText}>Oyna</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Stats Section */}
                <View style={styles.statsSection}>
                    <Text style={styles.sectionTitle}>📊 İstatistikler</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>4</Text>
                            <Text style={styles.statLabel}>Oyun</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>50</Text>
                            <Text style={styles.statLabel}>Oyuncu</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>40+</Text>
                            <Text style={styles.statLabel}>Takım</Text>
                        </View>
                    </View>
                </View>

                {/* Daily Challenge - Bottom */}
                <View style={styles.featuredCard}>
                    <LinearGradient
                        colors={['#00ff88', '#00d4ff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.featuredGradient}
                    >
                        <View style={styles.featuredContent}>
                            <View style={styles.featuredLeft}>
                                <Text style={styles.featuredBadge}>🔥 GÜNLÜK</Text>
                                <Text style={styles.featuredTitle}>Daily Challenge</Text>
                                <Text style={styles.featuredSubtitle}>1000 bonus puan kazan!</Text>
                            </View>
                            <TouchableOpacity style={styles.featuredButton}>
                                <Text style={styles.featuredButtonText}>Başla</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>FootyQuiz v1.0</Text>
                    <Text style={styles.footerSubtext}>Made with ⚽ for football fans</Text>
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
        paddingBottom: 15,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoIcon: {
        fontSize: 36,
        marginRight: 10,
    },
    logoText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 26,
    },
    logoTextAccent: {
        color: '#39FF14',
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 26,
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
    welcomeSection: {
        marginBottom: 25,
    },
    welcomeText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '600',
    },
    welcomeSubtext: {
        color: '#666',
        fontSize: 14,
        marginTop: 4,
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
    statsSection: {
        marginTop: 10,
        marginBottom: 5,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statCard: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 4,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    statValue: {
        color: '#39FF14',
        fontSize: 28,
        fontWeight: 'bold',
    },
    statLabel: {
        color: '#666',
        fontSize: 12,
        marginTop: 4,
    },
    featuredCard: {
        marginTop: 20,
        borderRadius: 20,
        overflow: 'hidden',
    },
    featuredGradient: {
        padding: 20,
    },
    featuredContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    featuredLeft: {
        flex: 1,
    },
    featuredBadge: {
        color: 'rgba(0,0,0,0.6)',
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    featuredTitle: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    featuredSubtitle: {
        color: 'rgba(0,0,0,0.7)',
        fontSize: 13,
        marginTop: 2,
    },
    featuredButton: {
        backgroundColor: '#000',
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 12,
    },
    featuredButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 30,
        marginTop: 10,
    },
    footerText: {
        color: '#333',
        fontSize: 14,
        fontWeight: '600',
    },
    footerSubtext: {
        color: '#222',
        fontSize: 12,
        marginTop: 4,
    },
});
