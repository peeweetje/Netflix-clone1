import React, { useState } from 'react';
import { BackCard } from './back-card';
import {
  CardContainer,
  MotionCardBack,
  MotionCardFront,
  MotionFlipCard,
} from './card.styles';
import { FrontCard } from './front-card';

type CardProps = {
  src: string;
  alt: string;
  overview: string;
  title: string;
  vote_average: number;
};

export const Card = ({
  src,
  alt,
  overview,
  title,
  vote_average,
}: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <CardContainer
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <MotionFlipCard
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <MotionCardFront>
          <FrontCard alt={alt} src={src} />
        </MotionCardFront>
        <MotionCardBack>
          <BackCard
            overview={overview}
            title={title}
            vote_average={vote_average}
          />
        </MotionCardBack>
      </MotionFlipCard>
    </CardContainer>
  );
};
