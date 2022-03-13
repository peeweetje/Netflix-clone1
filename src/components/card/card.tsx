import * as React from 'react';
import { FC } from 'react';
import { CardContainer, StyledImg } from './card.styles';

type CardProps = {
  onClick: () => void;
  src: string;
  alt: string;
};

const Card: FC<CardProps> = ({ onClick, src, alt }) => {
  return (
    <CardContainer onClick={onClick}>
      <StyledImg src={src} alt={alt} />
    </CardContainer>
  );
};

export default Card;
