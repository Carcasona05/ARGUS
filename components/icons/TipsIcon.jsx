import React from 'react';
import Svg, { Path } from 'react-native-svg';

const TipsIcon = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 21h6m-6-4h6m-3-4V3m0 0l-3 3m3-3l3 3"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 3c-1.5 0-3 1.5-3 3 0 1.5 1.5 3 3 3s3-1.5 3-3c0-1.5-1.5-3-3-3z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default TipsIcon;