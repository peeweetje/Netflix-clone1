import * as React from 'react';
import { FC } from 'react';
import {
  CardContainer,
  FLipCard,
  StyledImg,
  CardFront,
  CardBack,
  CardBackContainer,
} from './card.styles';

type CardProps = {
  src: string;
  alt: string;
};

const Card: FC<CardProps> = ({ src, alt }) => {
  return (
    <CardContainer>
      <FLipCard>
        <CardFront>
          <StyledImg src={src} alt={alt} />
        </CardFront>
        <CardBack>
          <CardBackContainer>
            informatie voor de achterkant van de kaart
          </CardBackContainer>
        </CardBack>
      </FLipCard>
    </CardContainer>
  );
};

export default Card;
