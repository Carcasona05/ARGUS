import React from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import Colors from "../constants/Color";

const ThemedCard = ({ style, children, padding = 16, ...props }) => {
  const scheme = useColorScheme();
  const theme = Colors[scheme] ?? Colors.light;

  return (
    <View
      style={[
        {
          backgroundColor: theme.uiBackground,
          padding,
          borderRadius: 8,
        },
        styles.card,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 8,
  },
});

export default ThemedCard;
