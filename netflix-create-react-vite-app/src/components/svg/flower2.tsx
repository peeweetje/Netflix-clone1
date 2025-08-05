import React from 'react';

const Flower2 = ({ width = 100, height = 100 }) => {
  return (
    <svg
      height={height}
      viewBox="0 0 100 100"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stem */}
      <rect fill="#228B22" height="30" width="4" x="48" y="70" />
      {/* Petals */}
      <path
        d="M50 30 Q60 10 80 30 L70 60 Q60 80 50 60 Q40 80 30 60 L20 30 Q40 10 50 30 Z"
        fill="#ea1919ff"
      />
      {/* Center */}
      <circle cx="50" cy="60" fill="#b22139ff" r="10" />
    </svg>
  );
};

export default Flower2;
