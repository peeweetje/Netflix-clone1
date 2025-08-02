import React from 'react';
import { Bee } from './bee';

export const BeesTheme = ({ width = 300, height = 250 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 250"
      width={width}
      height={height}
    >
      {/* Bee 1 */}
      <g transform="translate(10, 190)">
        <Bee width="60" height="60" />
      </g>

      {/* Bee 2 */}
      <g transform="translate(40, 180)">
        <Bee width="70" height="70" />
      </g>

      {/* Bee 3 */}
      <g transform="translate(75, 200)">
        <Bee width="50" height="50" />
      </g>
    </svg>
  );
};