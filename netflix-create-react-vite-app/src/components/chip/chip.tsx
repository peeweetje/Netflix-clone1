import React from 'react';
import { scoreColor } from '../../utils/score-color';
import { ChipContainer } from './chip.styles';

interface ChipProps {
  score: number;
}

export const Chip = ({ score }: ChipProps) => {
  const roundedScore = Math.floor(score * 10) / 10;
  const color = scoreColor(score);

  return <ChipContainer color={color}>{roundedScore}</ChipContainer>;
};
