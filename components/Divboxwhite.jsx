import React from "react";
import { View, StyleSheet } from "react-native";

const Divboxwhite = ({ style, children, ...props }) => {
  return (
    <View style={[styles.divboxwhite, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  divboxwhite: {
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 5, // 3px margin on left and right
    marginVertical: 5, // Optional: add vertical margin for spacing between multiple boxes
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "97%", // Fixed width with margin 5px on both sides
  },
});

export default Divboxwhite;
