import styled from 'styled-components';
import { motion } from 'framer-motion';



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


export const Leaf = styled(motion.div)`
  position: absolute;
  top: -10px;
  width: 20px;
  height: 20px;
`;

export const Snow = styled(motion.div)`
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #fff;
  border-radius: 50%;
  opacity: 0.7;
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



export const AnimatedButterfly = styled(motion.div)``;