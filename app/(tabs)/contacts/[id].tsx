import { ContactCard } from "@/components/common/ContactCard";
import { ThemedView } from "@/components/ThemedView";
import { useContacts } from "@/contexts/ContactsContext";
import { StyleSheet, Text, View } from "react-native";

export default function ContactDetails() {
  const { selectedContact } = useContacts();

  if (!selectedContact) {
    return (
      <View>
        <Text>No contact selected</Text>
      </View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ContactCard card={selectedContact.cards} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});
