import React from 'react';
import Flower1 from './flower1';
import Flower2 from './flower2';
import Flower3 from './flower3';

export const FlowersTheme = ({ width = 300, height = 250 }) => {
  return (
    <svg
      height={height}
      viewBox="0 0 300 250"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Flower 1 */}
      <g transform="translate(10, 190)">
        <Flower1 height="60" width="60" />
      </g>

      {/* Flower 2 */}
      <g transform="translate(40, 180)">
        <Flower2 height="70" width="70" />
      </g>

      {/* Flower 3 */}
      <g transform="translate(75, 200)">
        <Flower3 height="50" width="50" />
      </g>
    </svg>
  );
};
