import * as React from 'react';
import { FC } from 'react';
import { StyledImg, CardFront } from './card.styles';

type FrontCardProps = {
  src: string;
  alt: string;
};

const FrontCard: FC<FrontCardProps> = ({ src, alt }) => {
  return (
    <CardFront>
      <StyledImg src={src} alt={alt} />
    </CardFront>
  );
};

export default FrontCard;
