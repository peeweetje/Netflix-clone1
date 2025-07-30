import React from 'react';

const Flower1 = ({ width = 100, height = 100 }) => {
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
      <circle cx="50" cy="60" r="20" fill="#FFD700" />
      <circle cx="50" cy="40" r="15" fill="#b5f417ff" />
      <circle cx="70" cy="60" r="15" fill="#b5f417ff" />
      <circle cx="50" cy="80" r="15" fill="#b5f417ff" />
      <circle cx="30" cy="60" r="15" fill="#b5f417ff" />
      {/* Center */}
      <circle cx="50" cy="60" r="10" fill="#FFA500" />
    </svg>
  );
};

export default Flower1;
