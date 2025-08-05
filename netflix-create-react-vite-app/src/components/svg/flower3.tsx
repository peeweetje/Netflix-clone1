import React from 'react';

const Flower3 = ({ width = 100, height = 100 }) => {
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
      <ellipse
        cx="50"
        cy="50"
        fill="#87CEEB"
        rx="15"
        ry="25"
        transform="rotate(0 50 50)"
      />
      <ellipse
        cx="50"
        cy="50"
        fill="#87CEEB"
        rx="15"
        ry="25"
        transform="rotate(60 50 50)"
      />
      <ellipse
        cx="50"
        cy="50"
        fill="#87CEEB"
        rx="15"
        ry="25"
        transform="rotate(120 50 50)"
      />
      {/* Center */}
      <circle cx="50" cy="50" fill="#FFD700" r="10" />
    </svg>
  );
};

export default Flower3;
