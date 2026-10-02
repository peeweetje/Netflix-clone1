import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { seasonalCardStyles } from './seasonal-card.styles';
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
    <div {...stylex.props(seasonalCardStyles.container)}>
      <Card {...props} />
    </div>
  );
};
