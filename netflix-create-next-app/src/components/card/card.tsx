'use client';

import type React from 'react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { motion } from 'framer-motion';
import { FrontCard } from './front-card';
import { BackCard } from './back-card';
import { Trash2 } from 'lucide-react';

export interface CardRef {
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
  showRemoveButton?: boolean;
  onRemove?: () => void;
}

export const Card = forwardRef<CardRef, CardProps>(
  ({ src, alt, overview, title, vote_average, id, media_type, showRemoveButton, onRemove }, ref) => {
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

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsFlipped((prev) => !prev);
      }
    };

    return (
      <div
        className="w-full h-[380px] flex cursor-pointer [perspective:1000px]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${title}`}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-[250px] h-[350px] [transform-style:preserve-3d]"
        >
          {/* Front of card */}
          <motion.div
            className="absolute w-full h-full z-10 [backface-visibility:hidden] [transform:rotateY(0deg)]"
          >
            <FrontCard src={src} alt={alt} />
          </motion.div>

          {/* Back of card */}
          <motion.div
            className="absolute w-full h-full z-0 [backface-visibility:hidden] [transform:rotateY(180deg)]"
          >
            <BackCard
              id={id}
              media_type={media_type}
              overview={overview}
              title={title}
              vote_average={vote_average}
            />
          </motion.div>

          {/* Remove button - always visible */}
          {showRemoveButton && (
            <button
              className={`absolute top-2 bg-red-600/80 hover:bg-red-600 text-white border-none rounded-full w-9 h-9 cursor-pointer flex items-center justify-center transition-colors z-30 ${
                isFlipped ? 'left-2' : 'right-2'
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemove?.();
              }}
              aria-label='Remove from list'
            >
              <Trash2 className='!w-5 !h-5' />
            </button>
          )}
        </motion.div>
      </div>
    );
  }
);

Card.displayName = 'Card';
