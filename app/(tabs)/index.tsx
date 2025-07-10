import { FlatList, StyleSheet, Text } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ContactCard } from "@/components/common/ContactCard";
import { NeubrutalButton } from "@/components/common/NeubrutalButton";
import { VStack } from "@/components/common/VStack";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { useFetchCards } from "@/hooks/useCard";
import { router } from "expo-router";

export default function HomeScreen() {
  const { user } = useAuth();
  const { data, isError, isPending } = useFetchCards(user?.id ?? "");

  if (isPending) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading cards...</ThemedText>
      </ThemedView>
    );
  }

  if (isError) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Error loading cards. Please try again later.</ThemedText>
      </ThemedView>
    );
  }

  if (data?.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <VStack spacing={10} style={{ alignItems: "center" }}>
          <ThemedText>No cards available</ThemedText>
          <NeubrutalButton
            backgroundColor={Colors.dark.tertiary}
            borderColor={Colors.light.border}
            onPress={() => router.push("/(modals)/card-form")}
          >
            {
              <Text
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  fontWeight: "500",
                  fontSize: 16,
                }}
              >
                Get started
              </Text>
            }
          </NeubrutalButton>
        </VStack>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ContactCard card={item} />}
        keyExtractor={(item, index) => item.id || index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        contentContainerStyle={styles.flatListContent}
        style={{ flexGrow: 0 }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    margin: 20,
  },
});
