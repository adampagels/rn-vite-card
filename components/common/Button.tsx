import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export const Button = ({
  title,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  onPress,
  style,
  textStyle,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    isDisabled && styles.disabled,
    style,
  ];

  const buttonTextStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    isDisabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      <Text style={buttonTextStyle}>{loading ? "Loading..." : title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
  },

  primary: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  primaryText: {
    color: "#FFFFFF",
  },

  secondary: {
    backgroundColor: "#6B7280",
    borderColor: "#6B7280",
  },
  secondaryText: {
    color: "#FFFFFF",
  },

  outline: {
    backgroundColor: "transparent",
    borderColor: "#007AFF",
  },
  outlineText: {
    color: "#007AFF",
  },

  ghost: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  ghostText: {
    color: "#007AFF",
  },

  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 32,
  },
  smText: {
    fontSize: 14,
  },

  md: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  mdText: {
    fontSize: 16,
  },

  lg: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 52,
  },
  lgText: {
    fontSize: 18,
  },

  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
});
