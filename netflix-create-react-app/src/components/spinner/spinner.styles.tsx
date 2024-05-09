import styled, { keyframes } from 'styled-components';

export const SpinAnimation = keyframes`
    0% { transform: rotate(0); }
    100% { transform: rotate(360deg); }
`;

export const SpinnerWrapper = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid ${(props) => props.theme.colors.blue};
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: ${SpinAnimation} 1s linear infinite;
`;
