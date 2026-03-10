import React from 'react';
import { Text, StyleSheet, useColorScheme } from 'react-native';
import Colors from '../constants/Color';

const ThemedHeader = ({ style, children, variant = 'header', ...props }) => {
  const scheme = useColorScheme();
  const theme = Colors[scheme] ?? Colors.light;
  const color = variant === 'title' ? theme.title : theme.text;

  return (
    <Text style={[{ color }, styles[variant] || styles.header, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

export default ThemedHeader;