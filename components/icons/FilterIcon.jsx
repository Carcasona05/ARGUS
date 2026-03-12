import React from 'react';
import Svg, { Path } from 'react-native-svg';

const FilterIcon = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 4V6H21V4H3ZM3 11H9V9H3V11ZM3 18H15V16H3V18Z"
      fill={color}
    />
  </Svg>
);

export default FilterIcon;