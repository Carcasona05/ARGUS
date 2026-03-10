import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const SettingsIcon = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 1v6m0 6v6m11-7h-6m-6 0H1m16.24-3.76l-4.24 4.24m-6-6L3.76 8.24m16.24 7.52l-4.24-4.24m-6 6L3.76 15.76"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={2} />
  </Svg>
);

export default SettingsIcon;