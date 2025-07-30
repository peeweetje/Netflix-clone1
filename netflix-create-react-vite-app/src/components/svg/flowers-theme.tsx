import React from 'react';
import Flower1 from './flower1';
import Flower2 from './flower2';
import Flower3 from './flower3';

const FlowersTheme = ({ width = 300, height = 250 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 250"
      width={width}
      height={height}
    >
      {/* Flower 1 */}
      <g transform="translate(10, 190)">
        <Flower1 width="60" height="60" />
      </g>

      {/* Flower 2 */}
      <g transform="translate(40, 180)">
        <Flower2 width="70" height="70" />
      </g>

      {/* Flower 3 */}
      <g transform="translate(75, 200)">
        <Flower3 width="50" height="50" />
      </g>
    </svg>
  );
};

export default FlowersTheme;
