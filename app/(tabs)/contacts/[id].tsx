import { ContactCard } from "@/components/common/ContactCard";
import { useContacts } from "@/contexts/ContactsContext";
import { Text, View } from "react-native";

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
    <View>
      <ContactCard card={selectedContact.cards} />
    </View>
  );
}
