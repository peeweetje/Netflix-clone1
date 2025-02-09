import * as React from 'react';
import { FC } from 'react';
import { StyledImg, CardFront } from './card.styles';

type FrontCardProps = {
  src: string;
  alt: string;
};

const FrontCard = ({ src, alt }: FrontCardProps) => {
  return (
    <CardFront>
      <StyledImg src={src} alt={alt} />
    </CardFront>
  );
};

export default FrontCard;
