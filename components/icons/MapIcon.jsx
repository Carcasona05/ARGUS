import React from "react";
import Svg, { Path } from "react-native-svg";

const MapIcon = ({ size = 24, color = "#333" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.5 4.5l-7 4V18l7-4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default MapIcon;
