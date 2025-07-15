import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


export const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
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
  color: ${(props) => props.theme.colors.blue};
  font-size: 1.5rem;
  margin-left: 2rem;
  margin-bottom: 0.5rem;
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
  gap: 1rem;
`;

export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: #fff;
  font-size: 2rem;
  width: 48px;
  height: 64px;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  border-radius: 4px;
  &.left {
    left: -2rem;
  }
  &.right {
    right: -1.5rem;
  }
  &:hover {
    backgroundcolor: ${(props) => props.theme.colors.blue};
    color: #fff;
  }
  &.active {
    opacity: 1;
    pointer-events: auto;
  }
`;