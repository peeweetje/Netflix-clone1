import React from 'react';
import styled, { keyframes } from 'styled-components';
import { AnimatedWings, wingFlap } from './butterfly.styles';

export const Butterfly = ({
  width = 50,
  height = 50,
  primaryColor = '#FFD700',
  secondaryColor = '#FFA500',
}) => {
  return (
    <svg
      height={height}
      viewBox="0 0 100 100"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <ellipse cx="50" cy="50" fill="#654321" rx="8" ry="20" />

      {/* Head */}
      <circle cx="50" cy="28" fill="#654321" r="7" />

      {/* Antennae */}
      <line stroke="#654321" strokeWidth="2" x1="45" x2="35" y1="25" y2="10" />
      <line stroke="#654321" strokeWidth="2" x1="55" x2="65" y1="25" y2="10" />

      {/* Wings */}
      <AnimatedWings>
        {/* Top Left */}
        <path d="M50 40 Q20 20 10 40 Q20 60 50 50 Z" fill={primaryColor} />
        {/* Top Right */}
        <path d="M50 40 Q80 20 90 40 Q80 60 50 50 Z" fill={primaryColor} />
        {/* Bottom Left */}
        <path d="M50 50 Q20 80 10 60 Q20 40 50 50 Z" fill={secondaryColor} />
        {/* Bottom Right */}
        <path d="M50 50 Q80 80 90 60 Q80 40 50 50 Z" fill={secondaryColor} />
      </AnimatedWings>
    </svg>
  );
};
