import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/common/Button";
import { VStack } from "@/components/common/VStack";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <VStack spacing={10} style={{ alignItems: "center" }}>
        <ThemedText>No cards available</ThemedText>
        <Button
          title="Get started"
          variant="primary"
          onPress={() => router.push("/(modals)/card-form")}
        />
      </VStack>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    bottom: 0,
    height: 178,
    left: 0,
    position: "absolute",
    width: 290,
  },
});
