import styled, { keyframes } from 'styled-components';

export const wingFlap = keyframes`
  0% { transform: rotateX(0deg); }
  50% { transform: rotateX(45deg); }
  100% { transform: rotateX(0deg); }
`;

export const AnimatedButterfly = styled.g`
  .butterfly-wings {
    transform-origin: center;
    animation: ${wingFlap} 0.2s infinite alternate;
  }
`;

 export const AnimatedWings = styled.g`
  transform-origin: center;
  animation: ${wingFlap} 0.2s infinite alternate;
`;