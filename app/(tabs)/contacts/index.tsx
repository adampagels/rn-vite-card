import { HStack } from "@/components/common/HStack";
import { VStack } from "@/components/common/VStack";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/contexts/AuthContext";
import { useContacts } from "@/contexts/ContactsContext";
import { useFetchContacts } from "@/hooks/useCard";
import { ContactWithCard } from "@/types/contactWithCard";
import { Link } from "expo-router";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  const { user } = useAuth();
  const { setSelectedContact } = useContacts();
  const { data, isError, isPending } = useFetchContacts(user?.id ?? "");

  const renderContact = ({ item: contact }: { item: ContactWithCard }) => (
    <Link
      style={styles.contactItem}
      key={contact.id}
      href="/contacts/[id]"
      onPress={() => setSelectedContact(contact)}
    >
      <HStack spacing={20}>
        {contact.cards.imageUrl && (
          <Image
            source={{
              uri: `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/card-images/${contact.cards.imageUrl}`,
            }}
            style={{
              borderRadius: 100,
              borderWidth: 2,
              height: 80,
              width: 80,
            }}
          />
        )}
        <VStack>
          <Text style={styles.name}>
            {contact.cards.firstName} {contact.cards.lastName}
          </Text>
          {contact.cards.role && (
            <Text style={styles.role}>{contact.cards.role}</Text>
          )}

          {contact.cards.company && (
            <Text style={styles.company}>{contact.cards.company}</Text>
          )}
        </VStack>
      </HStack>
    </Link>
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
    height: 8,
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
