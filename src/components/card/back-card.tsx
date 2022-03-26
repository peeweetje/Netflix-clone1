import * as React from 'react';
import {
  CardBackContainer,
  CardBack,
  OverviewContainer,
  TitleContainer,
  ScoreContainer,
} from './card.styles';
import { FC } from 'react';

type BackCardProps = {
  overview: string;
  title: string;
  vote_average: number;
};

const BackCard: FC<BackCardProps> = ({ overview, title, vote_average }) => {
  return (
    <CardBack>
      <CardBackContainer>
        <TitleContainer>{title}</TitleContainer>
        <OverviewContainer>{overview}</OverviewContainer>
        <ScoreContainer> Score: {vote_average}</ScoreContainer>
      </CardBackContainer>
    </CardBack>
  );
};

export default BackCard;
