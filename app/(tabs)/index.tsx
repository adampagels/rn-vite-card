import { FlatList, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/common/Button";
import { ContactCard } from "@/components/common/ContactCard";
import { VStack } from "@/components/common/VStack";
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
          <Button
            title="Get started"
            variant="primary"
            onPress={() => router.push("/(modals)/card-form")}
          />
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
        scrollEnabled
        snapToAlignment="center"
        contentContainerStyle={styles.flatListContent}
        style={{ flex: 1 }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: "center",
    gap: 20,
    padding: 20,
  },
});
