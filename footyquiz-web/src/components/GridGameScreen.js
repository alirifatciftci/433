import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { PLAYERS, getAllTeamsForPlayer } from '../data/players';
import { TEAMS, getTeamById } from '../data/teams';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #0a0a0f 0%, #12121a 50%, #0a0a0f 100%);
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 600px;
  margin: 0 auto 20px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
  
  &:hover {
    color: #fff;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LogoEmoji = styled.span`
  font-size: 24px;
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoTitle = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.1;
`;

const LogoAccent = styled.span`
  color: #a855f7;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.1;
`;

const InfoCard = styled.div`
  display: flex;
  background: linear-gradient(145deg, rgba(30, 30, 40, 0.9) 0%, rgba(20, 20, 28, 0.9) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 18px 24px;
  max-width: 450px;
  margin: 0 auto 20px;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const InfoItem = styled.div`
  text-align: center;
  min-width: 80px;
`;

const InfoEmoji = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

const InfoLabel = styled.div`
  color: #666;
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const InfoValue = styled.div`
  color: ${props => props.color || '#a855f7'};
  font-size: 22px;
  font-weight: 700;
`;

const InfoDivider = styled.div`
  width: 1px;
  height: 50px;
  background: rgba(255, 255, 255, 0.08);
`;

const GridContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(3, 1fr);
  gap: 6px;
  margin-bottom: 6px;
`;

const CornerCell = styled.div`
  height: 75px;
`;

const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(3, 1fr);
  gap: 6px;
  margin-bottom: 6px;
`;

const RowHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TeamLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamLogo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const TeamName = styled.div`
  color: #888;
  font-size: 10px;
  margin-top: 4px;
  text-align: center;
  width: 70px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Cell = styled(motion.div)`
  aspect-ratio: 1;
  background: ${props => props.filled 
    ? 'linear-gradient(145deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)' 
    : 'linear-gradient(145deg, rgba(30, 30, 40, 0.9) 0%, rgba(20, 20, 28, 0.9) 100%)'};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.filled ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255, 255, 255, 0.08)'};
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  transition: all 0.3s ease;
  
  &:hover {
    ${props => !props.disabled && !props.filled && `
      border-color: rgba(168, 85, 247, 0.5);
      background: linear-gradient(145deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%);
    `}
  }
`;

const CellPlus = styled.span`
  font-size: 28px;
  color: #a855f7;
  opacity: 0.6;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
`;

const Jersey = styled.div`
  width: 45px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const JerseyBody = styled.div`
  background: #2a2a35;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #444;
`;

const JerseyNumber = styled.span`
  color: #e0e0e0;
  font-weight: 700;
  font-size: 20px;
`;

const PlayerName = styled.div`
  color: #fff;
  font-size: 10px;
  text-align: center;
  margin-top: 4px;
  font-weight: 500;
`;

const BottomSection = styled.div`
  max-width: 600px;
  margin: 24px auto;
  text-align: center;
  padding: 20px;
`;

const HintCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(145deg, rgba(30, 30, 40, 0.6) 0%, rgba(20, 20, 28, 0.6) 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
`;

const HintText = styled.div`
  color: #888;
  font-size: 14px;
`;

const FooterText = styled.div`
  color: #333;
  font-size: 14px;
  font-weight: 600;
`;

const GameOverCard = styled.div`
  background: linear-gradient(145deg, rgba(30, 30, 40, 0.9) 0%, rgba(20, 20, 28, 0.9) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 20px;
`;

const GameOverEmoji = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const GameOverText = styled.div`
  color: ${props => props.perfect ? '#39FF14' : '#a855f7'};
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const GameOverScore = styled.div`
  color: #fff;
  font-size: 18px;
`;

const PlayAgainButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  color: #fff;
  border: none;
  padding: 18px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(168, 85, 247, 0.3);
  }
`;

// Modal styles
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: linear-gradient(180deg, #1a1a2e 0%, #12121a 100%);
  border-radius: 24px 24px 0 0;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: none;
`;

const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.h3`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #888;
  font-size: 20px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
  }
`;

const SelectedTeams = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: rgba(168, 85, 247, 0.1);
  padding: 14px;
  margin: 16px 24px;
  border-radius: 12px;
  border: 1px solid rgba(168, 85, 247, 0.2);
`;

const SearchWrapper = styled.div`
  position: relative;
  margin: 0 24px 16px;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
`;

const SearchInputStyled = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 14px 16px;
  padding-left: 46px;
  font-size: 15px;
  color: #fff;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #a855f7;
  }
  
  &::placeholder {
    color: #666;
  }
`;

const PlayerList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 12px 20px;
`;

const PlayerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(168, 85, 247, 0.1);
  }
`;

const PlayerItemInfo = styled.div`
  flex: 1;
`;

const PlayerItemName = styled.div`
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 2px;
`;

const PlayerItemTeam = styled.div`
  color: #888;
  font-size: 13px;
`;

const PlayerFlag = styled.img`
  width: 28px;
  height: 20px;
  border-radius: 3px;
  object-fit: cover;
`;

// Wrong Answer Popup
const WrongPopup = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(145deg, #ff4444 0%, #cc0000 100%);
  padding: 24px 48px;
  border-radius: 16px;
  z-index: 2000;
  text-align: center;
  box-shadow: 0 8px 32px rgba(255, 0, 0, 0.4);
`;

const WrongEmoji = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
`;

const WrongText = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
`;

const GridGameScreen = ({ onBack }) => {
    const [grid, setGrid] = useState(null);
    const [answers, setAnswers] = useState(Array(9).fill(null));
    const [selectedCell, setSelectedCell] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [usedPlayers, setUsedPlayers] = useState([]);
    const [score, setScore] = useState(0);
    const [guessesLeft, setGuessesLeft] = useState(9);
    const [showWrong, setShowWrong] = useState(false);

    const generateValidGrid = useCallback(() => {
        const teamIds = Object.keys(TEAMS).map(Number);
        
        // Fisher-Yates shuffle
        const shuffle = (arr) => {
            const a = [...arr];
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        };
        
        let attempts = 0;
        const validGrids = [];
        
        while (attempts < 500 && validGrids.length < 30) {
            const shuffled = shuffle(teamIds);
            const rowTeams = shuffled.slice(0, 3);
            const colTeams = shuffled.slice(3, 6);

            let valid = true;
            for (const rowTeam of rowTeams) {
                for (const colTeam of colTeams) {
                    const hasCommon = PLAYERS.some(player => {
                        const allTeams = getAllTeamsForPlayer(player);
                        return allTeams.includes(rowTeam) && allTeams.includes(colTeam);
                    });
                    if (!hasCommon) {
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

        return { rowTeams: [541, 529, 157], colTeams: [165, 50, 49] };
    }, []);

    useEffect(() => {
        const newGrid = generateValidGrid();
        setGrid(newGrid);
    }, [generateValidGrid]);

    const startNewGame = () => {
        const newGrid = generateValidGrid();
        setGrid(newGrid);
        setAnswers(Array(9).fill(null));
        setUsedPlayers([]);
        setScore(0);
        setGuessesLeft(9);
        setSelectedCell(null);
        setSearchText('');
        setModalVisible(false);
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

        setModalVisible(false);
        
        if (isCorrect) {
            const newAnswers = [...answers];
            newAnswers[index] = player;
            setAnswers(newAnswers);
            setUsedPlayers([...usedPlayers, player.id]);
            setScore(score + 1);
        } else {
            // Show wrong popup
            setShowWrong(true);
            setTimeout(() => {
                setShowWrong(false);
            }, 1500);
        }
        
        setGuessesLeft(guessesLeft - 1);
        setSelectedCell(null);
    };

    const filteredPlayers = PLAYERS.filter(player => {
        if (usedPlayers.includes(player.id)) return false;
        if (!searchText) return true;
        return player.name.toLowerCase().includes(searchText.toLowerCase());
    });

    const renderTeamLogo = (teamId) => {
        const team = getTeamById(teamId);
        if (!team) return null;
        return (
            <TeamLogoContainer>
                <TeamLogo src={team.logo} alt={team.name} />
                <TeamName>{team.name}</TeamName>
            </TeamLogoContainer>
        );
    };

    const renderJersey = (shirtNumber) => (
        <Jersey>
            <JerseyBody>
                <JerseyNumber>{shirtNumber}</JerseyNumber>
            </JerseyBody>
        </Jersey>
    );

    const renderCell = (row, col) => {
        const index = getCellIndex(row, col);
        const answer = answers[index];
        const disabled = !!answer || guessesLeft <= 0;
        
        return (
            <Cell
                key={`${row}-${col}`}
                filled={!!answer}
                disabled={disabled}
                onClick={() => !disabled && handleCellPress(row, col)}
                whileHover={!disabled ? { scale: 1.02 } : {}}
                whileTap={!disabled ? { scale: 0.98 } : {}}
            >
                {answer ? (
                    <AnswerContainer>
                        {renderJersey(answer.shirtNumber)}
                        <PlayerName>{answer.name}</PlayerName>
                    </AnswerContainer>
                ) : (
                    <CellPlus>+</CellPlus>
                )}
            </Cell>
        );
    };

    if (!grid) return null;
    const isGameOver = guessesLeft <= 0 || score === 9;

    return (
        <Container>
            <Header>
                <BackButton onClick={onBack}>← Geri</BackButton>
                <LogoContainer>
                    <LogoEmoji>🎯</LogoEmoji>
                    <LogoText>
                        <LogoTitle>Football</LogoTitle>
                        <LogoAccent>Grid</LogoAccent>
                    </LogoText>
                </LogoContainer>
                <div style={{ width: '80px' }} />
            </Header>

            <InfoCard>
                <InfoItem>
                    <InfoEmoji>✅</InfoEmoji>
                    <InfoLabel>SKOR</InfoLabel>
                    <InfoValue color="#39FF14">{score}/9</InfoValue>
                </InfoItem>
                <InfoDivider />
                <InfoItem>
                    <InfoEmoji>🎯</InfoEmoji>
                    <InfoLabel>KALAN</InfoLabel>
                    <InfoValue color="#00d4ff">{guessesLeft}</InfoValue>
                </InfoItem>
                <InfoDivider />
                <InfoItem>
                    <InfoEmoji>📊</InfoEmoji>
                    <InfoLabel>BAŞARI</InfoLabel>
                    <InfoValue color="#a855f7">{guessesLeft < 9 ? Math.round((score / (9 - guessesLeft)) * 100) : 0}%</InfoValue>
                </InfoItem>
            </InfoCard>

            <GridContainer>
                <TopRow>
                    <CornerCell />
                    {grid.colTeams.map((teamId, i) => (
                        <HeaderCell key={`col-${i}`}>
                            {renderTeamLogo(teamId)}
                        </HeaderCell>
                    ))}
                </TopRow>
                {[0, 1, 2].map(row => (
                    <GridRow key={`row-${row}`}>
                        <RowHeader>
                            {renderTeamLogo(grid.rowTeams[row])}
                        </RowHeader>
                        {[0, 1, 2].map(col => renderCell(row, col))}
                    </GridRow>
                ))}
            </GridContainer>

            {isGameOver ? (
                <BottomSection>
                    <GameOverCard>
                        <GameOverEmoji>{score === 9 ? '🎉' : '🏁'}</GameOverEmoji>
                        <GameOverText perfect={score === 9}>
                            {score === 9 ? 'Mükemmel!' : 'Oyun Bitti!'}
                        </GameOverText>
                        <GameOverScore>
                            {score}/9 doğru cevap
                        </GameOverScore>
                    </GameOverCard>
                    <PlayAgainButton onClick={startNewGame}>
                        Tekrar Oyna
                    </PlayAgainButton>
                </BottomSection>
            ) : (
                <BottomSection>
                    <HintCard>
                        <span>💡</span>
                        <HintText>Her iki takımda da oynamış oyuncuyu bul</HintText>
                    </HintCard>
                    <FooterText>Football Grid</FooterText>
                </BottomSection>
            )}

            {/* Wrong Answer Popup */}
            <AnimatePresence>
                {showWrong && (
                    <WrongPopup
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                    >
                        <WrongEmoji>❌</WrongEmoji>
                        <WrongText>Yanlış!</WrongText>
                    </WrongPopup>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {modalVisible && (
                    <ModalOverlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setModalVisible(false)}
                    >
                        <ModalContent
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ModalHeader>
                                <ModalTitle>Oyuncu Seç</ModalTitle>
                                <CloseButton onClick={() => setModalVisible(false)}>×</CloseButton>
                            </ModalHeader>
                            
                            {selectedCell && (
                                <SelectedTeams>
                                    {renderTeamLogo(grid.rowTeams[selectedCell.row])}
                                    <span style={{ fontSize: '24px' }}>🔗</span>
                                    {renderTeamLogo(grid.colTeams[selectedCell.col])}
                                </SelectedTeams>
                            )}
                            
                            <SearchWrapper>
                                <SearchIcon>🔍</SearchIcon>
                                <SearchInputStyled
                                    type="text"
                                    placeholder="Oyuncu ara..."
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    autoFocus
                                />
                            </SearchWrapper>
                            
                            <PlayerList>
                                {filteredPlayers.map((player) => (
                                    <PlayerItem key={player.id} onClick={() => handlePlayerSelect(player)}>
                                        {renderJersey(player.shirtNumber)}
                                        <PlayerItemInfo>
                                            <PlayerItemName>{player.name}</PlayerItemName>
                                            <PlayerItemTeam>{player.team}</PlayerItemTeam>
                                        </PlayerItemInfo>
                                        <PlayerFlag src={player.nationalityFlag} alt={player.nationality} />
                                    </PlayerItem>
                                ))}
                            </PlayerList>
                        </ModalContent>
                    </ModalOverlay>
                )}
            </AnimatePresence>
        </Container>
    );
};

export default GridGameScreen;
