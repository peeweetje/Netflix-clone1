import * as React from 'react';
import { FC } from 'react';
import {
  CardContainer,
  MotionFlipCard,
  MotionCardFront,
  MotionCardBack,
} from './card.styles';
import { BackCard } from './back-card';
import { FrontCard } from './front-card';
import { motion } from 'framer-motion';
import { useState } from 'react';

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
          <FrontCard src={src} alt={alt} />
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
