import { BackCard } from './back-card';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  padding: ${(props) => props.theme.space[0]}; /* Remove extra padding */
  height: 380px;
  cursor: pointer;
  perspective: 1000px;
`;

export const FLipCard = styled.div`
  transform-style: preserve-3d;
  transition: 0.6s 0.1s;
  perspective: 1000px;
  z-index: 0;
`;

export const CardFront = styled.div`
  backface-visibility: hidden;
  transform: rotateY(0deg);
  z-index: 1;
`;

export const StyledImg = styled.img`
  border-radius: ${(props) => props.theme.borderRadius[3]};
  height: 350px;
  width: 250px;
`;

export const CardBack = styled.div`
  backface-visibility: hidden;
  transform: rotateY(180deg);
  z-index: 1;
`;

export const CardBackContainer = styled.div`
  position: relative;
  padding: ${(props) => props.theme.space[3]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 350px;
  width: 250px;
  overflow: visible;
  background: ${(props) => props.theme.colors.grey};
  border-radius: ${(props) => props.theme.borderRadius[3]};
`;

export const TitleContainer = styled.h1`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.space[1]};
  font-size: ${(props) => props.theme.fontSize[2]};
`;

export const OverviewContainer = styled.p`
  display: flex;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSize[1]};
  line-height: ${(props) => props.theme.lineHeight[3]};
`;

export const ScoreContainer = styled.span<{ score: string | undefined }>`
  display: flex;
  justify-content: center;
  color: ${(props) => props.score};
`;

export const StyledScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  margin-bottom: ${(props) => props.theme.space[0]};
`;

export const MotionFlipCard = styled(motion.div)`
  position: relative;
  width: 250px;
  height: 350px;
  transform-style: preserve-3d;
`;

export const MotionCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  z-index: 2;
`;

export const MotionCardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  z-index: 1;
  background: ${({ theme }) => theme.colors.black};
  border-radius: ${(props) => props.theme.borderRadius[3]};
`;

export const BackCardButton = styled.button<{ isAdded: boolean }>`
  width: 160px;
  height: 32px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${(props) => props.theme.space[2]};
  background: ${({ isAdded, theme }) =>
    isAdded ? theme.colors.black : theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  border: none;
  border-radius: 4px;
  padding: 6px 16px;
  font-size: 0.95rem;
  cursor: ${({ isAdded }) => (isAdded ? 'not-allowed' : 'pointer')};
`;
