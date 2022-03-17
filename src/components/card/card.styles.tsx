import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  padding: ${(props) => props.theme.space[6]};
  height: 400px;
  cursor: pointer;
`;

export const FLipCard = styled.div`
  transform-style: preserve-3d;
  transition: 0.6s 0.1s;
  perspective: 1000px;
  z-index: 1;
  &:hover {
    transform: rotateY(180deg);
  }
`;

export const CardFront = styled.div`
  backface-visibility: hidden;
  transform: rotateY(0deg);
  overflow: hidden;
  z-index: 2;
`;

export const CardBack = styled.div`
  backface-visibility: hidden;
  transform: rotateY(180deg);
  z-index: 1;
`;

export const CardBackContainer = styled.div`
  height: 350px;
  width: 250px;
`;

export const StyledImg = styled.img`
  border-radius: ${(props) => props.theme.borderRadius[3]};
  height: 350px;
  width: 250px;
`;
