import React from 'react';
import { Chip } from '../chip/chip';
import { scoreColor } from '../../utils/score-color';
import {
  CardBackContainer,
  OverviewContainer,
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

  // Truncate overview if too long
  const MAX_OVERVIEW_LENGTH = 500;
  const truncatedOverview =
    overview && overview.length > MAX_OVERVIEW_LENGTH
      ? overview.slice(0, MAX_OVERVIEW_LENGTH) + '...'
      : overview;

  return (
    <CardBackContainer>
      <TitleContainer>{title}</TitleContainer>
      <OverviewContainer>{truncatedOverview}</OverviewContainer>

      <StyledScoreContainer>
        <BackCardButton
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            addToList({ id, media_type });
          }}
          disabled={isAdded}
          isAdded={isAdded}
        >
          {isAdded ? 'Added' : 'Add to List'}
        </BackCardButton>
        <Chip score={vote_average} />
      </StyledScoreContainer>
    </CardBackContainer>
  );
};
