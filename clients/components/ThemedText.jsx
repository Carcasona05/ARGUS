import React from "react";
import { Text, StyleSheet, useColorScheme } from "react-native";
import Colors from "../constants/Color";

const ThemedText = ({ style, children, variant = "body", ...props }) => {
  const scheme = useColorScheme();
  const theme = Colors[scheme] ?? Colors.light;
  const color = variant === "title" ? theme.title : theme.text;

  return (
    <Text style={[{ color }, styles[variant] || styles.body, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  body: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  small: {
    fontSize: 13,
  },
});

export default ThemedText;
