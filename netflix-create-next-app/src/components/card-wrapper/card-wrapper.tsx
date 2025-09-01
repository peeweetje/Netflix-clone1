'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import type { CardRef } from '../card/card';

interface CardWrapperProps {
  to: string;
  children: React.ReactElement;
}

export const CardWrapper = ({ to, children }:CardWrapperProps) => {
  const cardRef = useRef<CardRef>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
      cardRef.current?.flip();
    }
  };

  return (
    <Link
      href={to}
      onKeyDown={handleKeyDown}
    >
      {React.cloneElement(children, { ref: cardRef })}
    </Link>
  );
};
