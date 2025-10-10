import React from 'react';
import { useTranslation } from 'react-i18next';
import { scoreColor } from '../../utils/score-color';
import { ChipContainer } from './chip.styles';

interface ChipProps {
  score: number;
  title?: string;
}

export const Chip = ({ score, title }: ChipProps) => {
  const { t } = useTranslation();
  const roundedScore = Math.floor(score * 10) / 10;
  const color = scoreColor(score);

  return (
    <ChipContainer
      color={color}
      aria-label={`${t('rating', 'Rating')}: ${roundedScore} ${t('out-of-10', 'out of 10')}${title ? ` ${t('for', 'for')} ${title}` : ''}`}
      title={`${t('rating', 'Rating')}: ${roundedScore}/10`}
    >
      {roundedScore}
    </ChipContainer>
  );
};
