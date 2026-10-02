import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { cardStyles } from './card.styles';

interface FrontCardProps {
  src: string;
  alt: string;
}

export const FrontCard = ({ src, alt }: FrontCardProps) => {
  return (
    <div {...stylex.props(cardStyles.front)}>
      <img {...stylex.props(cardStyles.image)} alt={alt} src={src} />
    </div>
  );
};
