import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: #1a1625;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto 24px;
`;

const Logo = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  gap: 10px;
  
  span {
    font-size: 24px;
  }
`;

const ScoreBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #2d2640;
  padding: 10px 18px;
  border-radius: 8px;
  color: #c8ff00;
  font-weight: 700;
  font-size: 16px;
`;

const MainContent = styled.div`
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageCard = styled.div`
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-height: 280px;
  position: relative;
  background: #2d8a4e;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.4);
  }
  
  &:hover > div {
    opacity: 1;
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    min-height: 200px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
`;

const PlayButton = styled.div`
  position: absolute;
  bottom: 6px;
  right: 6px;
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #c8ff00 0%, #a8e600 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(200, 255, 0, 0.4);
  transition: all 0.3s ease;
  opacity: 0.95;
  z-index: 10;
  
  &::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 12px solid #1a1625;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    margin-left: 3px;
  }
`;

const DailyCard = styled.div`
  grid-column: span 2;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  height: 160px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.4);
  }
  
  &:hover > div:last-child {
    opacity: 1;
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    grid-column: span 1;
    flex-direction: column;
    height: auto;
  }
`;

const DailyVisual = styled.div`
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56px;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

const DailyContent = styled.div`
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DailyBadge = styled.span`
  background: rgba(0,0,0,0.25);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 6px;
  display: inline-block;
  margin-bottom: 10px;
  width: fit-content;
  letter-spacing: 1px;
`;

const DailyTitle = styled.h3`
  color: #fff;
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 6px 0;
`;

const DailyDesc = styled.p`
  color: rgba(255,255,255,0.85);
  font-size: 13px;
  margin: 0;
`;

const DailyPlayButton = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 48px;
  height: 48px;
  background: rgba(0,0,0,0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: 0.9;
  
  &::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 14px solid #fff;
    border-top: 9px solid transparent;
    border-bottom: 9px solid transparent;
    margin-left: 4px;
  }
`;

const Footer = styled.div`
  text-align: center;
  padding: 32px 0 16px;
  color: #555;
  font-size: 12px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const DesignerLink = styled.a`
  color: #888;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #c8ff00;
  }
`;

const HomeScreen = ({ onNavigate, totalPoints }) => {
  return (
    <Container>
      <Header>
        <Logo>
          <span>⚽</span>
          GAPS
        </Logo>
        <ScoreBadge>
          🪙 {totalPoints}
        </ScoreBadge>
      </Header>

      <MainContent>
        <GamesGrid>
          {/* Daily Challenge - Büyük Kart */}
          <DailyCard onClick={() => onNavigate('dailyChallenge')}>
            <DailyVisual>🏆</DailyVisual>
            <DailyContent>
              <DailyBadge>🔥 GÜNLÜK MEYDAN OKUMA</DailyBadge>
              <DailyTitle>Daily Challenge</DailyTitle>
              <DailyDesc>5 soruluk yarışmayı tamamla, arkadaşlarınla paylaş!</DailyDesc>
            </DailyContent>
            <DailyPlayButton />
          </DailyCard>

          {/* Guess the Player */}
          <ImageCard onClick={() => onNavigate('guessPlayer')}>
            <CardImage src="/guess.png" alt="Guess Player" />
            <PlayButton />
          </ImageCard>

          {/* Football Grid */}
          <ImageCard onClick={() => onNavigate('gridGame')}>
            <CardImage src="/grid.png" alt="Football Grid" />
            <PlayButton />
          </ImageCard>

          {/* Common Player */}
          <ImageCard onClick={() => onNavigate('commonPlayer')}>
            <CardImage src="/common.png" alt="Common Player" />
            <PlayButton />
          </ImageCard>

          {/* Transfer Trivia */}
          <ImageCard onClick={() => onNavigate('transferTrivia')}>
            <CardImage src="/transfer.png" alt="Transfer Trivia" />
            <PlayButton />
          </ImageCard>
        </GamesGrid>
      </MainContent>

      <Footer>
        GAPS © 2025 • Futbol tutkunları için
        <br />
        <DesignerLink href="https://www.linkedin.com/in/alirifatciftci" target="_blank" rel="noopener noreferrer">
          designed by alirifatciftci
        </DesignerLink>
      </Footer>
    </Container>
  );
};

export default HomeScreen;
