import { useThemeColor } from "@/hooks/useThemeColor";
import { View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  lightBorderColor?: string;
  darkBorderColor?: string;
  bordered?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  lightBorderColor,
  darkBorderColor,
  bordered = false,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const borderColor = useThemeColor({}, "border");

  const borderStyle = bordered
    ? {
        borderWidth: 1,
        borderColor,
      }
    : {};

  return (
    <View style={[{ backgroundColor }, borderStyle, style]} {...otherProps} />
  );
}
