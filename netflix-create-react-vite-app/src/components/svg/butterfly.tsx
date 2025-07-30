import React from 'react';
import styled, { keyframes } from 'styled-components';
import { wingFlap, AnimatedWings } from './butterfly.styles';




 export const Butterfly = ({ width = 50, height = 50, primaryColor = '#FFD700', secondaryColor = '#FFA500' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={width}
      height={height}
    >
      {/* Body */}
      <ellipse cx="50" cy="50" rx="8" ry="20" fill="#654321" />

      {/* Head */}
      <circle cx="50" cy="28" r="7" fill="#654321" />

      {/* Antennae */}
      <line x1="45" y1="25" x2="35" y2="10" stroke="#654321" strokeWidth="2" />
      <line x1="55" y1="25" x2="65" y2="10" stroke="#654321" strokeWidth="2" />

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


