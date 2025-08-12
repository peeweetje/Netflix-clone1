import React from 'react';
import { CardFront, StyledImg } from './card.styles';

interface FrontCardProps {
  src: string;
  alt: string;
}

export const FrontCard = ({ src, alt }: FrontCardProps) => {
  return (
    <CardFront>
      <StyledImg alt={alt} src={src} />
    </CardFront>
  );
};
