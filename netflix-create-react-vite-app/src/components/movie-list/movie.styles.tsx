import { motion } from 'framer-motion';
import styled from 'styled-components';

export const FlexWrapper = styled.div`
  margin-top: ${(props) => props.theme.space[10]};
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.space[8]};
  justify-content: center;
  align-items: flex-start;
`;

export const RowContainer = styled.section`
  position: relative; 
`;

export const RowTitle = styled.h2`
  color: ${(props) => props.theme.colors.primaryLight};
  font-size: ${(props) => props.theme.fontSize[5]};
  margin-left: ${(props) => props.theme.space[4]};
  margin-bottom: ${(props) => props.theme.space[4]};

  @media (max-width: 768px) {
    font-size: ${(props) => props.theme.fontSize[4]};
  },
  @media (max-width: 992px) {
    font-size: ${(props) => props.theme.fontSize[3]};
  },
  @media (max-width: 1024px) {
    font-size: ${(props) => props.theme.fontSize[3]};
  },
  @media (max-width: 1200px) {
    font-size: ${(props) => props.theme.fontSize[2]};
  },
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
  gap: ${(props) => props.theme.space[6]};
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
  opacity: 0; /* Default: hidden */
  pointer-events: none; /* Default: not clickable */
  transition: opacity 0.2s, background-color 0.2s; /* Add background-color to transition */
  border-radius: ${(props) => props.theme.borderRadius[1]};
  &.left {
    left: -2rem;
  }
  &.right {
    right: -1.5rem;
  }
  &:hover {
    background-color: ${(props) => props.theme.colors.primaryLight};
    color: ${(props) => props.theme.colors.buttonText};
  }
  &.active {
    opacity: 0.3; /* Subtly visible when active */
    pointer-events: auto; /* Clickable when active */
    &:hover {
      opacity: 1; /* Fully visible on hover when active */
    }
  }
  &:disabled {
    opacity: 0; /* Completely hidden when disabled */
    pointer-events: none; /* Not clickable when disabled */
  }

  @media (max-width: 768px) {
    &.left {
      left: 0rem;
    }
    &.right {
      right: 0rem;
    }
  }
  @media (max-width: 992px) {
    &.left {
      left: -1rem;
    }
    &.right {
      right: -1rem;
    }
  },
  @media (max-width: 1024px) {
    &.left {
      left: -1.2rem;
    }
    &.right {
      right: -1.2rem;
    }
  },
   @media (max-width: 1200px) {
    &.left {
      left: -1.5rem;
    }
    &.right {
      right: -1.5rem;
    }
  },
`;

export const CardWrapper = styled.div`
  position: relative;
`;
