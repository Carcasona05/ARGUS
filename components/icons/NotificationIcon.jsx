import React from 'react';
import Svg, { Path } from 'react-native-svg';

const NotificationIcon = ({ size = 24, color = '#333' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C10.9 2 10 2.9 10 4V5.29C7.89 6.15 6.43 8.09 6.43 10.5V16H5C4.45 16 4 16.45 4 17S4.45 18 5 18H19C19.55 18 20 17.55 20 17S19.55 16 20 16H18.57V10.5C18.57 8.09 17.11 6.15 15 5.29V4C15 2.9 14.1 2 13 2H12ZM12 4H13V5.17C12.85 5.12 12.69 5.08 12.5 5.08C12.31 5.08 12.15 5.12 12 5.17V4ZM8.43 8.5C8.43 7.67 9.1 7 9.93 7H14.07C14.9 7 15.57 7.67 15.57 8.5V16H8.43V8.5ZM10.93 18H13.07C13.62 18 14.07 18.45 14.07 19S13.62 20 13.07 20H10.93C10.38 20 9.93 19.55 9.93 19S10.38 18 10.93 18Z"
      fill={color}
    />
  </Svg>
);

export default NotificationIcon;