import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuccessCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const SuccessIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

const SuccessTitle = styled.h1`
  color: #39FF14;
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 16px 0;
`;

const SuccessText = styled.p`
  color: #fff;
  font-size: 16px;
  margin: 0 0 24px 0;
`;

const PlayAgainButton = styled.button`
  background: #39FF14;
  color: #000;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    background: #2ecc71;
    transform: translateY(-2px);
  }
`;

const SuccessScreen = ({ result, onPlayAgain }) => {
  return (
    <Container>
      <SuccessCard
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SuccessIcon>
          {result?.success ? '🎉' : '😔'}
        </SuccessIcon>
        <SuccessTitle>
          {result?.success ? 'Tebrikler!' : 'Tekrar Dene!'}
        </SuccessTitle>
        <SuccessText>
          {result?.success 
            ? `${result.guesses} tahminde doğru cevabı buldun!`
            : 'Bu sefer olmadı, tekrar dene!'
          }
        </SuccessText>
        <PlayAgainButton onClick={onPlayAgain}>
          Ana Menüye Dön
        </PlayAgainButton>
      </SuccessCard>
    </Container>
  );
};

export default SuccessScreen;