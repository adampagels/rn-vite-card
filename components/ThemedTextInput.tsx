import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export function ThemedTextInput(props: TextInputProps) {
  const { style, placeholderTextColor, ...otherProps } = props;

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "border");
  const themePlaceholderColor = useThemeColor({}, "placeholder");

  return (
    <TextInput
      {...otherProps}
      placeholderTextColor={placeholderTextColor ?? themePlaceholderColor}
      style={[
        styles.input,
        { backgroundColor, color: textColor, borderColor },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
});
