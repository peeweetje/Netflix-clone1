import React from 'react';
import { CardContainer } from './seasonal-card.styles';
import { Card } from './card';

interface SeasonalCardProps {
  src: string;
  alt: string;
  overview: string;
  title: string;
  vote_average: number;
  id: number;
  media_type: 'movie' | 'tv';
  onClick?: () => void;
}

export const SeasonalCard = (props: SeasonalCardProps) => {

  return (
    <CardContainer>
      <Card {...props} />
    </CardContainer>
  );
};
