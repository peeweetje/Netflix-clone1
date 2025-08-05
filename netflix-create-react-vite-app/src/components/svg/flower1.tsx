import React from 'react';

const Flower1 = ({ width = 100, height = 100 }) => {
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
      <circle cx="50" cy="60" fill="#FFD700" r="20" />
      <circle cx="50" cy="40" fill="#b5f417ff" r="15" />
      <circle cx="70" cy="60" fill="#b5f417ff" r="15" />
      <circle cx="50" cy="80" fill="#b5f417ff" r="15" />
      <circle cx="30" cy="60" fill="#b5f417ff" r="15" />
      {/* Center */}
      <circle cx="50" cy="60" fill="#FFA500" r="10" />
    </svg>
  );
};

export default Flower1;
