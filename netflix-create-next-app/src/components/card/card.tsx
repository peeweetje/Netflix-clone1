'use client';

import type React from 'react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { motion } from 'framer-motion';
import { FrontCard } from './front-card';
import { BackCard } from './back-card';

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
    const [isFlipped, setIsFlipped] = useState(false);

    useImperativeHandle(ref, () => ({
      flip: () => {
        setIsFlipped((prev) => !prev);
      },
    }));

    const handleMouseEnter = () => {
      setIsFlipped(true);
    };

    const handleMouseLeave = () => {
      setIsFlipped(false);
    };

    return (
      <div
        className="w-full h-[380px] flex cursor-pointer"
        style={{ perspective: '1000px' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-[250px] h-[350px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front of card */}
          <motion.div
            className="absolute w-full h-full z-10"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)'
            }}
          >
            <FrontCard src={src} alt={alt} />
          </motion.div>

          {/* Back of card */}
          <motion.div
            className="absolute w-full h-full z-0"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <BackCard
              id={id}
              media_type={media_type}
              overview={overview}
              title={title}
              vote_average={vote_average}
            />
          </motion.div>
        </motion.div>
      </div>
    );
  }
);

Card.displayName = 'Card';
