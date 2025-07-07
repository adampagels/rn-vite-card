import { ThemedStatusBar } from "@/components/ThemedStatusBar";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import "react-native-reanimated";

import { AuthProvider } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function NavigationLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modals)"
            options={{ headerShown: false, presentation: "fullScreenModal" }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <ThemedStatusBar />
      </ThemeProvider>
    </AuthProvider>
  );
}
