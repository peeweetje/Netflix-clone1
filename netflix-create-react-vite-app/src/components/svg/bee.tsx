import React from 'react';
import { AnimatedWings } from './bee.styles';

export const Bee = ({ width = 30, height = 30 }) => {
  return (
    <svg
      height={height}
      viewBox="0 0 100 100"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <ellipse cx="50" cy="50" fill="#FFD700" rx="15" ry="25" />
      <path d="M50 25 v50" stroke="black" strokeWidth="5" />
      <path d="M50 35 v30" stroke="black" strokeWidth="5" />

      {/* Head */}
      <circle cx="50" cy="25" fill="#444" r="10" />

      {/* Antennae */}
      <line stroke="#444" strokeWidth="2" x1="45" x2="35" y1="20" y2="10" />
      <line stroke="#444" strokeWidth="2" x1="55" x2="65" y1="20" y2="10" />

      {/* Wings */}
      <AnimatedWings>
        {/* Top Left */}
        <path
          d="M50 40 Q20 20 10 40 Q20 60 50 50 Z"
          fill="rgba(255, 255, 255, 0.7)"
        />
        {/* Top Right */}
        <path
          d="M50 40 Q80 20 90 40 Q80 60 50 50 Z"
          fill="rgba(255, 255, 255, 0.7)"
        />
      </AnimatedWings>
      {/* Stinger */}
      <polygon fill="#444" points="50,75 45,85 55,85" />
    </svg>
  );
};
