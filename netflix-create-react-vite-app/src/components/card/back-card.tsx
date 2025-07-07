import * as React from 'react';
import {
  CardBackContainer,
  CardBack,
  OverviewContainer,
  TitleContainer,
  ScoreContainer,
  StyledScoreContainer,
} from './card.styles';
import { FC } from 'react';
import { scoreColor } from '../../utils/score-color';

type BackCardProps = {
  overview: string;
  title: string;
  vote_average: number;
};

const getRoundedScore = (score: number): number => Math.floor(score * 10) / 10;

export const BackCard = ({ overview, title, vote_average }: BackCardProps) => {
  return (
    <CardBackContainer>
      <TitleContainer>{title}</TitleContainer>
      <OverviewContainer>{overview}</OverviewContainer>
      <StyledScoreContainer>
        <ScoreContainer score={scoreColor(vote_average)}>
          {getRoundedScore(vote_average)}
        </ScoreContainer>
      </StyledScoreContainer>
    </CardBackContainer>
  );
};
