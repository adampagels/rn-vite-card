import { useThemeColor } from "@/hooks/useThemeColor";
import { TouchableOpacity, View } from "react-native";

interface NeubrutalButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  backgroundColor?: string;
  shadowColor?: string;
  borderColor?: string;
  shadowOffset?: number;
  disabled?: boolean;
  style?: any;
  shadowStyle?: any;
  buttonStyle?: any;
}

export const NeubrutalButton = ({
  children,
  onPress,
  variant = "primary",
  backgroundColor,
  shadowColor,
  borderColor,
  shadowOffset = 4,
  disabled = false,
  shadowStyle,
  buttonStyle,
}: NeubrutalButtonProps) => {
  const colors = {
    primary: {
      bg: useThemeColor({}, "secondary"),
      border: useThemeColor({}, "secondary"),
      shadow: useThemeColor({}, "primary"),
    },
    secondary: {
      bg: useThemeColor({}, "primary"),
      border: useThemeColor({}, "border"),
      shadow: useThemeColor({}, "text"),
    },
    tertiary: {
      bg: useThemeColor({}, "tertiary"),
      border: useThemeColor({}, "border"),
      shadow: useThemeColor({}, "text"),
    },
  };

  const fallback = colors.primary;
  const variantColors = colors[variant] || fallback;

  const finalBackgroundColor = backgroundColor ?? variantColors.bg;
  const finalBorderColor = borderColor ?? variantColors.border;
  const finalShadowColor = shadowColor ?? variantColors.shadow;

  return (
    <TouchableOpacity
      style={[{ position: "relative" }, shadowStyle]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.8}
    >
      <View
        style={[
          {
            backgroundColor: finalBackgroundColor,
            borderWidth: 2,
            borderColor: finalBorderColor,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            zIndex: 2,
            opacity: disabled ? 0.5 : 1,
          },
          buttonStyle,
        ]}
      >
        {children}
      </View>

      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: finalShadowColor,
          borderRadius: 8,
          transform: [
            { translateX: shadowOffset },
            { translateY: shadowOffset },
          ],
          zIndex: 1,
          opacity: disabled ? 0.3 : 1,
        }}
      />
    </TouchableOpacity>
  );
};
