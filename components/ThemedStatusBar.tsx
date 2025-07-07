import { useTheme } from "@/contexts/ThemeContext";
import { StatusBar } from "expo-status-bar";
import React from "react";

export function ThemedStatusBar() {
  const { colorScheme } = useTheme();

  return (
    <StatusBar
      style={colorScheme === "dark" ? "light" : "dark"}
      backgroundColor={colorScheme === "dark" ? "#000000" : "#ffffff"}
    />
  );
}
