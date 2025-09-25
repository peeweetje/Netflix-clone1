import React from 'react';
import { useTranslation } from 'react-i18next';
import { type MyListItem, useMyList } from '../../context/myListContext';
import { scoreColor } from '../../utils/score-color';
import { Chip } from '../chip/chip';
import {
  BackCardButton,
  CardBackContainer,
  OverviewContainer,
  StyledScoreContainer,
  TitleContainer,
} from './card.styles';

interface BackCardProps {
  id: number;
  media_type: 'movie' | 'tv';
  overview: string;
  title: string;
  vote_average: number;
}

export const BackCard = ({
  id,
  media_type,
  overview,
  title,
  vote_average,
}: BackCardProps) => {
  const { t } = useTranslation();
  const context = useMyList();
  const { myList, addToList } = context;

  if (typeof id !== 'number' || !media_type) return null;

  if (
    !(context && Array.isArray(context.myList)) ||
    typeof context.addToList !== 'function'
  )
    return null;

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
          disabled={isAdded}
          $isAdded={isAdded}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            addToList({ id, media_type });
          }}
        >
          {isAdded ? t('added') : t('add-to-list')}
        </BackCardButton>
        <Chip score={vote_average} />
      </StyledScoreContainer>
    </CardBackContainer>
  );
};
