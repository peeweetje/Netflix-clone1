import React from 'react';
import { useTheme } from '../../context/themeContext';
import { winterTheme } from '../../styles/themes/themes';
import { Card } from './card';
import { CardContainer } from './seasonal-card.styles';

type SeasonalCardProps = {
  src: string;
  alt: string;
  overview: string;
  title: string;
  vote_average: number;
  id: number;
  media_type: 'movie' | 'tv';
  onClick?: () => void;
};

export const SeasonalCard = (props: SeasonalCardProps) => {
  const { theme } = useTheme();

  return (
    <CardContainer>
      <Card {...props} />
    </CardContainer>
  );
};
