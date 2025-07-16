import React from 'react';
import { scoreColor } from '../../utils/score-color';
import {
  CardBackContainer,
  OverviewContainer,
  ScoreContainer,
  StyledScoreContainer,
  TitleContainer,
} from './card.styles';
import { BackCardButton } from './card.styles';
import { useMyList, MyListItem } from '../../context/myListContext';

type BackCardProps = {
  id: number;
  media_type: 'movie' | 'tv';
  overview: string;
  title: string;
  vote_average: number;
};

const getRoundedScore = (score: number): number => Math.floor(score * 10) / 10;

export const BackCard = ({
  id,
  media_type,
  overview,
  title,
  vote_average,
}: BackCardProps) => {
  if (typeof id !== 'number' || !media_type) return null;
  const context = useMyList();
  if (
    !context ||
    !Array.isArray(context.myList) ||
    typeof context.addToList !== 'function'
  )
    return null;
  const { myList, addToList } = context;
  const isAdded = myList.some(
    (item: MyListItem) =>
      item &&
      typeof item.id === 'number' &&
      item.media_type &&
      item.id === id &&
      item.media_type === media_type
  );
  return (
    <CardBackContainer>
      <TitleContainer>{title}</TitleContainer>
      <OverviewContainer>{overview}</OverviewContainer>
      <StyledScoreContainer>
        <ScoreContainer score={scoreColor(vote_average)}>
          {getRoundedScore(vote_average)}
        </ScoreContainer>
      </StyledScoreContainer>
      <BackCardButton
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          addToList({ id, media_type });
        }}
        disabled={isAdded}
        isAdded={isAdded}
      >
        {isAdded ? 'Added' : 'Add to My List'}
      </BackCardButton>
    </CardBackContainer>
  );
};
