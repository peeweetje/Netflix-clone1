import styled, { keyframes } from 'styled-components';



export const BannerContainer = styled.section<{ backgroundImage: string }>`
  position: relative;
  width: 100%;
  height: 75vh;
  min-height: 500px;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.backgroundImage});
  display: flex;
  align-items: stretch;
  justify-content: center;
`;

export const BannerOverlay = styled.div`
  position: absolute;
  top: ${(props) => props.theme.space[0]};
  left: ${(props) => props.theme.space[0]};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 2vw;
  z-index: 2;
`;

export const BannerTitle = styled.h1`
  font-size: ${(props) => props.theme.fontSize[7]};
  font-weight: bold;
  color: ${(props) => props.theme.colors.white};
  max-width: 30vw;
  text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.7);
`;

export const BannerOverview = styled.p`
  font-size: ${(props) => props.theme.fontSize[3]};
  color: ${(props) => props.theme.colors.white};
  max-width: 32vw;
  margin-left: ${(props) => props.theme.space[2]};
  text-align: right;
  text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.7);
  line-height: ${(props) => props.theme.lineHeight[3]};
`;

export const BannerButtons = styled.div`
  display: flex;
  gap: ${(props) => props.theme.space[7]};
  margin-top: ${(props) => props.theme.space[7]};
`;

export const BannerButton = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.buttonText};
  border: none;
  padding: 0.7rem 2rem;
  font-size: 1.1rem;
  border-radius: 0.3vw;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
  &:hover {
    background: ${(props) => props.theme.colors.primaryLight};
    color: ${(props) => props.theme.colors.black};
  }
`;

const fall = keyframes`
  0% { transform: translateY(-100vh) rotate(0deg); }
  100% { transform: translateY(100vh) rotate(360deg); }
`;

const leafFall = keyframes`
  0% {
    transform: translateY(-10vh) translateX(calc(var(--x-start) * 1px)) rotateZ(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) translateX(calc(var(--x-end) * 1px)) rotateZ(720deg);
    opacity: 0;
  }
`;

const fly = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(50px, -20px) rotate(5deg); }
  50% { transform: translate(100px, 0) rotate(0deg); }
  75% { transform: translate(50px, 20px) rotate(-5deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
`;



export const SnowContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
`;

export const LeafContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
`;

export const Leaf = styled.div`
  position: absolute;
  opacity: 0;
  animation: ${leafFall} linear infinite;
  top: -10px;
  width: 20px;
  height: 20px;
`;

export const Snow = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #fff;
  border-radius: 50%;
  opacity: 0.7;
  animation: ${fall} linear infinite;
  top: -10px;
`;

export const FlowersThemeContainer = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index: 3;
  pointer-events: none;
  width: 100%;
  height: 250px;
`;

export const ButterflyContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 3;
  pointer-events: none;
`;

export const AnimatedButterfly = styled.div`
  position: absolute;
  animation: ${fly} linear infinite;
`;