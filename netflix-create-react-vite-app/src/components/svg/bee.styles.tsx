import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

export const wingFlap = keyframes`
  0% {
    transform: rotateZ(0deg);
  }
  50% {
    transform: rotateZ(20deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
`;

export const AnimatedWings = styled.g`
  animation: ${wingFlap} 0.1s linear infinite;
  transform-origin: 50% 50%;
`;

export const AnimatedBee = styled(motion.div)``;
