import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  padding: ${(props) => props.theme.space[6]};
  height: 380px;
  cursor: pointer;
`;

export const FLipCard = styled.div`
  transform-style: preserve-3d;
  transition: 0.6s 0.1s;
  perspective: 1000px;
  z-index: 0;
  &:hover {
    transform: rotateY(180deg);
  }
`;

export const CardFront = styled.div`
  backface-visibility: hidden;
  transform: rotateY(0deg);
  z-index: 1;
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
  position: relative;
  padding: ${(props) => props.theme.space[3]};
  flex-wrap: nowrap;
  height: 350px;
  width: 250px;
  transform: translate(12px, -355px);
  box-shadow: ${(props) => props.theme.boderShadow[0]};
  overflow: hidden;
`;

export const TitleContainer = styled.h1`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.space[0]};
  font-size: ${(props) => props.theme.fontSize[2]};
`;

export const OverviewContainer = styled.p`
  display: flex;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSize[1]};
  line-height: ${(props) => props.theme.lineHeight[3]};
`;

export const ScoreContainer = styled.span<{ score: string | undefined }>`
  display: flex;
  justify-content: center;
  color: ${(props) => props.score};
`;

export const StyledScoreContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  transform: translateY(-50%);
`;
