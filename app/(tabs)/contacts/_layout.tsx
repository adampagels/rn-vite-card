import { ContactsProvider } from "@/contexts/ContactsContext";
import { Stack } from "expo-router";

export default function ContactsLayout() {
  return (
    <ContactsProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Contacts" }} />
        <Stack.Screen
          name="[id]"
          options={{
            title: "",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
      </Stack>
    </ContactsProvider>
  );
}
