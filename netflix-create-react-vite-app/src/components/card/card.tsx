import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackCard } from './back-card';
import {
  CardContainer,
  MotionCardBack,
  MotionCardFront,
  MotionFlipCard,
} from './card.styles';
import { FrontCard } from './front-card';

 interface CardRef {
  flip: () => void;
}

interface CardProps {
  src: string;
  alt: string;
  overview: string;
  title: string;
  vote_average: number;
  id: number;
  media_type: 'movie' | 'tv';
}

export const Card = forwardRef<CardRef, CardProps>(
  ({ src, alt, overview, title, vote_average, id, media_type }, ref) => {
    const { t } = useTranslation();
    const [isFlipped, setIsFlipped] = useState(false);

    useImperativeHandle(ref, () => ({
      flip: () => {
        setIsFlipped((prev) => !prev);
      },
    }));

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsFlipped((prev) => !prev);
      }
    };

    return (
      <CardContainer
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onFocus={() => setIsFlipped(true)}
        onBlur={() => setIsFlipped(false)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`${t('view-details-for')} ${title}`}
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
              id={id}
              media_type={media_type}
              overview={overview}
              title={title}
              vote_average={vote_average}
            />
          </MotionCardBack>
        </MotionFlipCard>
      </CardContainer>
    );
  }
);
