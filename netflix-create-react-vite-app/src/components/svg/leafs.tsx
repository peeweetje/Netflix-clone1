import React from 'react';

interface LeafIconProps {
  width?: string;
  height?: string;
  color?: string;
}

export const LeafIcon: React.FC<LeafIconProps> = ({ width = '24', height = '24', color = 'currentColor' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 30 C 20 10, 80 10, 90 30 C 95 50, 75 70, 50 90 C 25 70, 5 50, 10 30 Z"
      fill={color}
    />
    <path
      d="M50 10 L50 90"
      stroke="#808080"
      strokeWidth="5"
    />
    <path
      d="M50 30 L30 45"
      stroke="#000"
      strokeWidth="2"
    />
    <path
      d="M50 50 L70 65"
      stroke="#000"
      strokeWidth="2"
    />
    <path
      d="M50 10 L50 0"
      stroke="#000"
      strokeWidth="3"
    />
  </svg>
);
