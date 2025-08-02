import React from 'react';
import { AnimatedWings } from './bee.styles';

export const Bee = ({ width = 30, height = 30 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={width}
      height={height}
    >
      {/* Body */}
      <ellipse cx="50" cy="50" rx="15" ry="25" fill="#FFD700" />
      <path d="M50 25 v50" stroke="black" strokeWidth="5" />
      <path d="M50 35 v30" stroke="black" strokeWidth="5" />


      {/* Head */}
      <circle cx="50" cy="25" r="10" fill="#444" />

      {/* Antennae */}
      <line x1="45" y1="20" x2="35" y2="10" stroke="#444" strokeWidth="2" />
      <line x1="55" y1="20" x2="65" y2="10" stroke="#444" strokeWidth="2" />

      {/* Wings */}
      <AnimatedWings>
        {/* Top Left */}
        <path d="M50 40 Q20 20 10 40 Q20 60 50 50 Z" fill="rgba(255, 255, 255, 0.7)" />
        {/* Top Right */}
        <path d="M50 40 Q80 20 90 40 Q80 60 50 50 Z" fill="rgba(255, 255, 255, 0.7)" />
      </AnimatedWings>
       {/* Stinger */}
       <polygon points="50,75 45,85 55,85" fill="#444" />
    </svg>
  );
};