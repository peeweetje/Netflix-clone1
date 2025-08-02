import React from 'react';
import { ChipContainer } from './chip.styles';
import { scoreColor } from '../../utils/score-color';

type ChipProps = {
  score: number;
};

export const Chip = ({ score }: ChipProps) => {
  const roundedScore = Math.floor(score * 10) / 10;
  const color = scoreColor(score);

  return <ChipContainer color={color}>{roundedScore}</ChipContainer>;
};