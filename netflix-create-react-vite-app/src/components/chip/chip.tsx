import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { useTranslation } from 'react-i18next';
import { scoreColor } from '../../utils/score-color';
import { chipStyles } from './chip.styles';

interface ChipProps {
  score: number;
  title?: string;
}

export const Chip = ({ score, title }: ChipProps) => {
  const { t } = useTranslation();
  const roundedScore = Math.floor(score * 10) / 10;
  const color = scoreColor(score);

  return (
    <div
      {...stylex.props(chipStyles.container)}
      style={{ '--chip-color': color } as React.CSSProperties}
      aria-label={`${t('rating', 'Rating')}: ${roundedScore} ${t('out-of-10', 'out of 10')}${title ? ` ${t('for', 'for')} ${title}` : ''}`}
      title={`${t('rating', 'Rating')}: ${roundedScore}/10`}
    >
      {roundedScore}
    </div>
  );
};
