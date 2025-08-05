import React from 'react';
import { Bee } from './bee';

export const BeesTheme = ({ width = 300, height = 250 }) => {
  return (
    <svg
      height={height}
      viewBox="0 0 300 250"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bee 1 */}
      <g transform="translate(10, 190)">
        <Bee height="60" width="60" />
      </g>

      {/* Bee 2 */}
      <g transform="translate(40, 180)">
        <Bee height="70" width="70" />
      </g>

      {/* Bee 3 */}
      <g transform="translate(75, 200)">
        <Bee height="50" width="50" />
      </g>
    </svg>
  );
};
