import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

type VStackProps = ViewProps & {
  spacing?: number;
  children: React.ReactNode;
};

export const VStack = ({
  spacing = 0,
  children,
  style,
  ...props
}: VStackProps) => {
  return (
    <View style={[styles.stack, { gap: spacing }, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  stack: {
    flexDirection: "column",
  },
});
