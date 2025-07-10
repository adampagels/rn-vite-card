import { HStack } from "@/components/common/HStack";
import { NeubrutalButton } from "@/components/common/NeubrutalButton";
import { VStack } from "@/components/common/VStack";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { useContacts } from "@/contexts/ContactsContext";
import { useFetchContacts } from "@/hooks/useCard";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ContactWithCard } from "@/types/contactWithCard";
import { Link } from "expo-router";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  const { user } = useAuth();
  const { setSelectedContact } = useContacts();
  const { data, isError, isPending } = useFetchContacts(user?.id ?? "");
  const colorScheme = useColorScheme();

  const renderContact = ({ item: contact }: { item: ContactWithCard }) => (
    <NeubrutalButton
      borderColor={Colors[colorScheme ?? "light"].primary}
      buttonStyle={{ padding: 10 }}
      style={{ width: "100%" }}
      backgroundColor={Colors[colorScheme ?? "light"].pure}
    >
      <Link
        key={contact.id}
        href="/contacts/[id]"
        onPress={() => setSelectedContact(contact)}
      >
        <HStack spacing={20} style={{ width: "100%" }}>
          {contact.cards.imageUrl && (
            <ThemedView
              bordered
              style={{
                height: 80,
                width: 80,
                borderRadius: 100,
                overflow: "hidden",
                borderWidth: 2,
              }}
            >
              <Image
                source={{
                  uri: `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/card-images/${contact.cards.imageUrl}`,
                }}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
            </ThemedView>
          )}
          <VStack>
            <ThemedText style={styles.name}>
              {contact.cards.firstName} {contact.cards.lastName}
            </ThemedText>
            {contact.cards.role && (
              <Text style={styles.role}>{contact.cards.role}</Text>
            )}

            {contact.cards.company && (
              <Text style={styles.company}>{contact.cards.company}</Text>
            )}
          </VStack>
        </HStack>
      </Link>
    </NeubrutalButton>
  );

  if (isPending) {
    return (
      <ThemedView style={styles.container}>
        <Text>Loading contacts...</Text>
      </ThemedView>
    );
  }

  if (isError) {
    return (
      <ThemedView style={styles.container}>
        <Text>Error loading contacts</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={data || []}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <VStack style={styles.emptyState}>
            <Text style={styles.emptyText}>No contacts yet</Text>
            <Text style={styles.emptySubtext}>
              Scan your first business card to get started
            </Text>
          </VStack>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  contactItem: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    marginBottom: 2,
    borderWidth: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  role: {
    fontSize: 16,
    color: "#666",
    marginBottom: 2,
  },
  email: {
    fontSize: 14,
    color: "#007AFF",
  },
  separator: {
    height: 25,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
