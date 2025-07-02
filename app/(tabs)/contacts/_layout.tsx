import { ContactsProvider } from "@/contexts/ContactsContext";
import { Stack } from "expo-router";

export default function ContactsLayout() {
  return (
    <ContactsProvider>
      <Stack />
    </ContactsProvider>
  );
}
