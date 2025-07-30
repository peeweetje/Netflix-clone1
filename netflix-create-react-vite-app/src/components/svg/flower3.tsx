import React from 'react';

const Flower3 = ({ width = 100, height = 100 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={width}
      height={height}
    >
      {/* Stem */}
      <rect x="48" y="70" width="4" height="30" fill="#228B22" />
      {/* Petals */}
      <ellipse cx="50" cy="50" rx="15" ry="25" fill="#87CEEB" transform="rotate(0 50 50)" />
      <ellipse cx="50" cy="50" rx="15" ry="25" fill="#87CEEB" transform="rotate(60 50 50)" />
      <ellipse cx="50" cy="50" rx="15" ry="25" fill="#87CEEB" transform="rotate(120 50 50)" />
      {/* Center */}
      <circle cx="50" cy="50" r="10" fill="#FFD700" />
    </svg>
  );
};

export default Flower3;
