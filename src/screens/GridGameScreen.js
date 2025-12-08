import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    Modal,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { PLAYERS, getAllTeamsForPlayer } from '../data/players';
import { TEAMS, getTeamById } from '../data/teams';

// Fisher-Yates shuffle algoritması
const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

// Grid için uygun 6 takım seç
const generateValidGrid = () => {
    const teamIds = Object.keys(TEAMS).map(Number);
    let attempts = 0;
    const validGrids = [];

    while (attempts < 1000 && validGrids.length < 20) {
        const shuffled = shuffleArray(teamIds);
        const rowTeams = shuffled.slice(0, 3);
        const colTeams = shuffled.slice(3, 6);

        let valid = true;
        for (const rowTeam of rowTeams) {
            for (const colTeam of colTeams) {
                const commonPlayers = PLAYERS.filter(player => {
                    const allTeams = getAllTeamsForPlayer(player);
                    return allTeams.includes(rowTeam) && allTeams.includes(colTeam);
                });
                if (commonPlayers.length === 0) {
                    valid = false;
                    break;
                }
            }
            if (!valid) break;
        }

        if (valid) {
            validGrids.push({ rowTeams, colTeams });
        }
        attempts++;
    }

    if (validGrids.length > 0) {
        return validGrids[Math.floor(Math.random() * validGrids.length)];
    }

    const fallbacks = [
        { rowTeams: [541, 529, 157], colTeams: [165, 50, 49] },
        { rowTeams: [50, 40, 42], colTeams: [541, 157, 85] },
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};

// Logo komponenti
const AppLogo = ({ size = 'small' }) => {
    const isSmall = size === 'small';
    return (
        <View style={[styles.logoContainer, isSmall && styles.logoSmall]}>
            <Text style={[styles.logoIcon, isSmall && styles.logoIconSmall]}>⚽</Text>
            <View>
                <Text style={[styles.logoText, isSmall && styles.logoTextSmall]}>Footy</Text>
                <Text style={[styles.logoTextAccent, isSmall && styles.logoTextAccentSmall]}>Quiz</Text>
            </View>
        </View>
    );
};

const GridGameScreen = ({ navigation }) => {
    const [grid, setGrid] = useState(null);
    const [answers, setAnswers] = useState(Array(9).fill(null));
    const [selectedCell, setSelectedCell] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [usedPlayers, setUsedPlayers] = useState([]);
    const [score, setScore] = useState(0);
    const [guessesLeft, setGuessesLeft] = useState(9);

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        const newGrid = generateValidGrid();
        setGrid(newGrid);
        setAnswers(Array(9).fill(null));
        setUsedPlayers([]);
        setScore(0);
        setGuessesLeft(9);
    };

    const getCellIndex = (row, col) => row * 3 + col;

    const handleCellPress = (row, col) => {
        const index = getCellIndex(row, col);
        if (answers[index] || guessesLeft <= 0) return;
        setSelectedCell({ row, col, index });
        setSearchText('');
        setModalVisible(true);
    };

    const handlePlayerSelect = (player) => {
        if (!selectedCell || !grid) return;
        const { row, col, index } = selectedCell;
        const rowTeamId = grid.rowTeams[row];
        const colTeamId = grid.colTeams[col];
        const allTeams = getAllTeamsForPlayer(player);
        const isCorrect = allTeams.includes(rowTeamId) && allTeams.includes(colTeamId);

        if (isCorrect) {
            const newAnswers = [...answers];
            newAnswers[index] = player;
            setAnswers(newAnswers);
            setUsedPlayers([...usedPlayers, player.id]);
            setScore(score + 1);
        }
        setGuessesLeft(guessesLeft - 1);
        setModalVisible(false);
        setSelectedCell(null);
    };

    const filteredPlayers = PLAYERS.filter(player => {
        if (usedPlayers.includes(player.id)) return false;
        if (!searchText) return true;
        return player.name.toLowerCase().includes(searchText.toLowerCase());
    });

    const renderTeamLogo = (teamId, size = 50) => {
        const team = getTeamById(teamId);
        if (!team) return null;
        return (
            <View style={styles.teamLogoContainer}>
                <Image source={{ uri: team.logo }} style={[styles.teamLogo, { width: size, height: size }]} />
                <Text style={styles.teamName} numberOfLines={1}>{team.name}</Text>
            </View>
        );
    };

    const renderJersey = (shirtNumber, size = 50) => (
        <View style={[styles.jersey, { width: size, height: size * 1.1 }]}>
            <View style={styles.jerseyBody}>
                <Text style={[styles.jerseyNumber, { fontSize: size * 0.45 }]}>{shirtNumber}</Text>
            </View>
        </View>
    );

    const renderCell = (row, col) => {
        const index = getCellIndex(row, col);
        const answer = answers[index];
        return (
            <TouchableOpacity
                key={`${row}-${col}`}
                style={[styles.cell, answer && styles.cellFilled]}
                onPress={() => handleCellPress(row, col)}
                disabled={!!answer || guessesLeft <= 0}
            >
                {answer ? (
                    <View style={styles.answerContainer}>
                        {renderJersey(answer.shirtNumber, 45)}
                        <Text style={styles.playerName} numberOfLines={2}>{answer.name}</Text>
                    </View>
                ) : (
                    <Text style={styles.cellPlus}>+</Text>
                )}
            </TouchableOpacity>
        );
    };

    if (!grid) return null;
    const isGameOver = guessesLeft <= 0 || score === 9;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
                <AppLogo size="small" />
                <TouchableOpacity onPress={startNewGame} style={styles.newGameButton}>
                    <Text style={styles.newGameText}>Yeni</Text>
                </TouchableOpacity>
            </View>

            {/* Game Info Card */}
            <View style={styles.infoCard}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>SKOR</Text>
                    <Text style={styles.infoValue}>{score}/9</Text>
                </View>
                <View style={styles.infoDivider} />
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>KALAN</Text>
                    <Text style={styles.infoValue}>{guessesLeft}</Text>
                </View>
                <View style={styles.infoDivider} />
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>BAŞARI</Text>
                    <Text style={styles.infoValue}>{guessesLeft < 9 ? Math.round((score / (9 - guessesLeft)) * 100) : 0}%</Text>
                </View>
            </View>

            {/* Grid */}
            <View style={styles.gridContainer}>
                <View style={styles.topRow}>
                    <View style={styles.cornerCell} />
                    {grid.colTeams.map((teamId, i) => (
                        <View key={`col-${i}`} style={styles.headerCell}>
                            {renderTeamLogo(teamId, 40)}
                        </View>
                    ))}
                </View>
                {[0, 1, 2].map(row => (
                    <View key={`row-${row}`} style={styles.gridRow}>
                        <View style={styles.rowHeader}>
                            {renderTeamLogo(grid.rowTeams[row], 40)}
                        </View>
                        {[0, 1, 2].map(col => renderCell(row, col))}
                    </View>
                ))}
            </View>

            {/* Game Over veya İpucu */}
            {isGameOver ? (
                <View style={styles.bottomSection}>
                    <Text style={styles.gameOverText}>
                        {score === 9 ? '🎉 Mükemmel!' : `Oyun Bitti!`}
                    </Text>
                    <TouchableOpacity onPress={startNewGame} style={styles.playAgainButton}>
                        <Text style={styles.playAgainText}>Tekrar Oyna</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.bottomSection}>
                    <Text style={styles.hintText}>💡 Her iki takımda da oynamış oyuncuyu bul</Text>
                    <View style={styles.footerLogo}>
                        <Text style={styles.footerText}>Football Grid</Text>
                    </View>
                </View>
            )}

            {/* Modal */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <KeyboardAvoidingView
                    style={styles.modalOverlay}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Oyuncu Seç</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        {selectedCell && (
                            <View style={styles.selectedTeams}>
                                <View style={styles.selectedTeam}>
                                    {renderTeamLogo(grid.rowTeams[selectedCell.row], 30)}
                                </View>
                                <Text style={styles.andText}>&</Text>
                                <View style={styles.selectedTeam}>
                                    {renderTeamLogo(grid.colTeams[selectedCell.col], 30)}
                                </View>
                            </View>
                        )}
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Oyuncu ara..."
                            placeholderTextColor="#666"
                            value={searchText}
                            onChangeText={setSearchText}
                            autoFocus={false}
                        />
                        <FlatList
                            data={filteredPlayers}
                            keyExtractor={(item) => item.id.toString()}
                            keyboardShouldPersistTaps="handled"
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.playerItem}
                                    onPress={() => handlePlayerSelect(item)}
                                >
                                    {renderJersey(item.shirtNumber, 40)}
                                    <View style={styles.playerItemInfo}>
                                        <Text style={styles.playerItemName}>{item.name}</Text>
                                        <Text style={styles.playerItemTeam}>{item.team}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            style={styles.playerList}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        />
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0f',
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1a1a2e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backText: {
        color: '#39FF14',
        fontSize: 20,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoSmall: {
        transform: [{ scale: 0.8 }],
    },
    logoIcon: {
        fontSize: 32,
        marginRight: 8,
    },
    logoIconSmall: {
        fontSize: 24,
    },
    logoText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 22,
    },
    logoTextSmall: {
        fontSize: 16,
        lineHeight: 18,
    },
    logoTextAccent: {
        color: '#39FF14',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 22,
    },
    logoTextAccentSmall: {
        fontSize: 16,
        lineHeight: 18,
    },
    newGameButton: {
        backgroundColor: '#39FF14',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
    },
    newGameText: {
        color: '#0a0a0a',
        fontWeight: 'bold',
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#1a1a2e',
        marginHorizontal: 15,
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    infoItem: {
        alignItems: 'center',
        flex: 1,
    },
    infoLabel: {
        color: '#666',
        fontSize: 11,
        fontWeight: '600',
        marginBottom: 4,
    },
    infoValue: {
        color: '#39FF14',
        fontSize: 22,
        fontWeight: 'bold',
    },
    infoDivider: {
        width: 1,
        height: 30,
        backgroundColor: '#333',
    },
    gridContainer: {
        paddingHorizontal: 10,
    },
    topRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    cornerCell: {
        width: 80,
        height: 70,
    },
    headerCell: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
    },
    gridRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    rowHeader: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    teamLogoContainer: {
        alignItems: 'center',
    },
    teamLogo: {
        resizeMode: 'contain',
    },
    teamName: {
        color: '#fff',
        fontSize: 10,
        marginTop: 2,
        textAlign: 'center',
        width: 70,
    },
    cell: {
        flex: 1,
        aspectRatio: 1,
        backgroundColor: '#1a1a2e',
        borderRadius: 8,
        marginHorizontal: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#333',
    },
    cellFilled: {
        backgroundColor: '#0d3d0d',
        borderColor: '#39FF14',
    },
    cellPlus: {
        color: '#666',
        fontSize: 30,
    },
    answerContainer: {
        alignItems: 'center',
        padding: 5,
    },
    jersey: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    jerseyBody: {
        backgroundColor: '#2a2a35',
        borderRadius: 6,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#444',
    },
    jerseyNumber: {
        color: '#e0e0e0',
        fontWeight: 'bold',
    },
    playerName: {
        color: '#fff',
        fontSize: 10,
        textAlign: 'center',
        marginTop: 3,
    },
    bottomSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    hintText: {
        color: '#888',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
    },
    footerLogo: {
        marginTop: 10,
    },
    footerText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    gameOverText: {
        color: '#39FF14',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    playAgainButton: {
        backgroundColor: '#39FF14',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 12,
    },
    playAgainText: {
        color: '#0a0a0a',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#1a1a2e',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '70%',
        minHeight: '50%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    modalTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        color: '#fff',
        fontSize: 24,
        padding: 5,
    },
    selectedTeams: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        backgroundColor: '#0a0a0a',
        padding: 10,
        borderRadius: 10,
    },
    selectedTeam: {
        alignItems: 'center',
    },
    andText: {
        color: '#39FF14',
        fontSize: 20,
        marginHorizontal: 15,
    },
    searchInput: {
        backgroundColor: '#0a0a0a',
        borderRadius: 10,
        padding: 15,
        color: '#fff',
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#333',
    },
    playerList: {
        flex: 1,
    },
    playerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    playerItemInfo: {
        marginLeft: 12,
    },
    playerItemName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    playerItemTeam: {
        color: '#888',
        fontSize: 13,
    },
});

export default GridGameScreen;
