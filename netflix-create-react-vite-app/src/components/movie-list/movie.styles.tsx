import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.space[8]};
  justify-content: center;
  align-items: flex-start;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const RowContainer = styled.section`
  position: relative;
  &:hover .arrow {
    opacity: 2;
    pointer-events: auto;
  }
`;

export const RowTitle = styled.h2`
  color: ${(props) => props.theme.colors.lightPurple};
  font-size: ${(props) => props.theme.fontSize[5]};
  margin-left: ${(props) => props.theme.space[4]};
  margin-bottom: ${(props) => props.theme.space[4]};
`;

export const CardsViewport = styled.div<{ width: number }>`
  overflow: hidden;
  width: ${({ width }) => width}px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
`;

export const CardsWrapper = styled(motion.div)`
  display: flex;
  gap: ${(props) => props.theme.space[7]};
`;

export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSize[6]};
  width: 48px;
  height: 64px;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  border-radius: ${(props) => props.theme.borderRadius[1]};
  &.left {
    left: -2rem;
  }
  &.right {
    right: -1.5rem;
  }
  &:hover {
    backgroundcolor: ${(props) => props.theme.colors.lightPurple};
   
  }
  &.active {
    opacity: 1;
    pointer-events: auto;
  }
`;

export const CardWrapper = styled.div`
  position: relative;
`;

