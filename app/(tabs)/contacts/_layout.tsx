import { Colors } from "@/constants/Colors";
import { ContactsProvider } from "@/contexts/ContactsContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";

export default function ContactsLayout() {
  const colorScheme = useColorScheme();
  return (
    <ContactsProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Contacts" }} />
        <Stack.Screen
          name="[id]"
          options={{
            title: "",
            headerBackButtonDisplayMode: "minimal",
            headerTintColor: Colors[colorScheme ?? "light"].tertiary,
          }}
        />
      </Stack>
    </ContactsProvider>
  );
}
