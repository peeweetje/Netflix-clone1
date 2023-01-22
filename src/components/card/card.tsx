import * as React from 'react';
import { FC } from 'react';
import { CardContainer, FLipCard } from './card.styles';
import FrontCard from './front-card';
import BackCard from './back-card';

type CardProps = {
  src: string;
  alt: string;
  overview: string;
  title: string;
  vote_average: number;
};

const Card: FC<CardProps> = ({ src, alt, overview, title, vote_average }) => {
  return (
    <CardContainer>
      <FLipCard>
        <FrontCard src={src} alt={alt} />
        <BackCard
          overview={overview}
          title={title}
          vote_average={vote_average}
        />
      </FLipCard>
    </CardContainer>
  );
};

export default Card;
