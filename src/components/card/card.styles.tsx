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
  padding: ${(props) => props.theme.space[3]};
  flex-wrap: nowrap;
  height: 350px;
  width: 250px;
  transform: translate(12px, -355px);
  box-shadow: ${(props) => props.theme.boderShadow[0]};
  white-space: normal;
  flex-wrap: wrap;
`;

export const TitleContainer = styled.h1`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.space[0]};
  font-size: ${(props) => props.theme.fontSize[1]};
`;

export const OverviewContainer = styled.p`
  display: flex;
  justify-content: center;
  font-size: 0.8rem;
  line-height: 1.3;
`;

export const ScoreContainer = styled.span<{ score: string | undefined }>`
  display: flex;
  justify-content: center;
  color: ${(props) => props.score};
`;
