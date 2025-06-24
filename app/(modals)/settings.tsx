// app/card-form.tsx
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/common/Button";
import { Stack, router } from "expo-router";
import { StyleSheet } from "react-native";

export default function CardFormScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Settings",
          presentation: "fullScreenModal",
          headerLeft: () => (
            <Button title="X" variant="ghost" onPress={() => router.back()} />
          ),
        }}
      />

      <ThemedView style={styles.container}>
        <ThemedText>Setting screen</ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
