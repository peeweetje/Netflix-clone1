import React from 'react';

export const Beehive = ({ width = 100, height = 100 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={width}
      height={height}
    >
      <path
        d="M50 10 C 80 10, 90 40, 90 50 C 90 80, 60 90, 50 90 C 40 90, 10 80, 10 50 C 10 40, 20 10, 50 10 Z"
        fill="#8B4513"
        stroke="#654321"
        strokeWidth="2"
      />
      {/* Hexagonal cells - Denser fill */}
      <polygon points="40,25 45,22 50,25 45,28 40,28 35,25" fill="#FFD700" opacity="0.7" />
      <polygon points="55,30 60,27 65,30 60,33 55,33 50,30" fill="#FFD700" opacity="0.7" />
      <polygon points="45,40 50,37 55,40 50,43 45,43 40,40" fill="#FFD700" opacity="0.7" />
      <polygon points="30,45 35,42 40,45 35,48 30,48 25,45" fill="#FFD700" opacity="0.7" />
      <polygon points="60,45 65,42 70,45 65,48 60,48 55,45" fill="#FFD700" opacity="0.7" />
      <polygon points="35,55 40,52 45,55 40,58 35,58 30,55" fill="#FFD700" opacity="0.7" />
      <polygon points="53,60 58,57 63,60 58,63 53,63 48,60" fill="#FFD700" opacity="0.7" />
      
      {/* Additional hexagons to fill the hive */}
      <polygon points="47,32 52,29 57,32 52,35 47,35 42,32" fill="#FFD700" opacity="0.7" />
      <polygon points="33,35 38,32 43,35 38,38 33,38 28,35" fill="#FFD700" opacity="0.7" />
      <polygon points="62,38 67,35 72,38 67,41 62,41 57,38" fill="#FFD700" opacity="0.7" />
      <polygon points="40,50 45,47 50,50 45,53 40,53 35,50" fill="#FFD700" opacity="0.7" />
      <polygon points="55,50 60,47 65,50 60,53 55,53 50,50" fill="#FFD700" opacity="0.7" />
      <polygon points="47,65 52,62 57,65 52,68 47,68 42,65" fill="#FFD700" opacity="0.7" />

      {/* More hexagons for denser fill */}
      <polygon points="30,20 35,17 40,20 35,23 30,23 25,20" fill="#FFD700" opacity="0.7" />
      <polygon points="65,20 70,17 75,20 70,23 65,23 60,20" fill="#FFD700" opacity="0.7" />
      <polygon points="25,35 30,32 35,35 30,38 25,38 20,35" fill="#FFD700" opacity="0.7" />
      <polygon points="70,35 75,32 80,35 75,38 70,38 65,35" fill="#FFD700" opacity="0.7" />
      <polygon points="20,50 25,47 30,50 25,53 20,53 15,50" fill="#FFD700" opacity="0.7" />
      <polygon points="75,50 80,47 85,50 80,53 75,53 70,50" fill="#FFD700" opacity="0.7" />
      <polygon points="25,65 30,62 35,65 30,68 25,68 20,65" fill="#FFD700" opacity="0.7" />
      <polygon points="70,65 75,62 80,65 75,68 70,68 65,65" fill="#FFD700" opacity="0.7" />
      <polygon points="40,70 45,67 50,70 45,73 40,73 35,70" fill="#FFD700" opacity="0.7" />
      <polygon points="55,70 60,67 65,70 60,73 55,73 50,70" fill="#FFD700" opacity="0.7" />

      {/* Even more hexagons for maximum density */}
      <polygon points="47,20 52,17 57,20 52,23 47,23 42,20" fill="#FFD700" opacity="0.7" />
      <polygon points="33,25 38,22 43,25 38,28 33,28 28,25" fill="#FFD700" opacity="0.7" />
      <polygon points="62,25 67,22 72,25 67,28 62,28 57,25" fill="#FFD700" opacity="0.7" />
      <polygon points="20,30 25,27 30,30 25,33 20,33 15,30" fill="#FFD700" opacity="0.7" />
      <polygon points="75,30 80,27 85,30 80,33 75,33 70,30" fill="#FFD700" opacity="0.7" />
      <polygon points="15,45 20,42 25,45 20,48 15,48 10,45" fill="#FFD700" opacity="0.7" />
      <polygon points="80,45 85,42 90,45 85,48 80,48 75,45" fill="#FFD700" opacity="0.7" />
      <polygon points="15,60 20,57 25,60 20,63 15,63 10,60" fill="#FFD700" opacity="0.7" />
      <polygon points="80,60 85,57 90,60 85,63 80,63 75,60" fill="#FFD700" opacity="0.7" />
      <polygon points="30,75 35,72 40,75 35,78 30,78 25,75" fill="#FFD700" opacity="0.7" />
      <polygon points="65,75 70,72 75,75 70,78 65,78 60,75" fill="#FFD700" opacity="0.7" />
      <polygon points="47,70 52,67 57,70 52,73 47,73 42,70" fill="#FFD700" opacity="0.7" />


      <path
        d="M45 68 Q 35 70 38 78 Q 50 85 62 78 Q 65 70 55 68 Z"
        fill="#A0522D"
      />
      <circle cx="50" cy="75" r="10" fill="#444" />
    </svg>
  );
};