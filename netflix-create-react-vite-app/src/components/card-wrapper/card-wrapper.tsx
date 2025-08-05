import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import type { CardRef } from '../card/card';

interface CardWrapperProps {
  to: string;
  children: React.ReactElement;
}

export const CardWrapper = ({ to, children }: CardWrapperProps) => {
  const cardRef = useRef<CardRef>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
      cardRef.current?.flip();
    }
  };

  return (
    <Link onKeyDown={handleKeyDown} to={to}>
      {React.cloneElement(children, { ref: cardRef })}
    </Link>
  );
};
