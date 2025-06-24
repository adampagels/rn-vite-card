// app/(modals)/_layout.tsx
import { Button } from "@/components/common/Button";
import { router, Stack } from "expo-router";

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: "modal",
      }}
    >
      <Stack.Screen
        name="card-form"
        options={{
          title: "Create Card",
          presentation: "fullScreenModal",
          headerLeft: () => (
            <Button
              title="Cancel"
              variant="ghost"
              onPress={() => router.back()}
            />
          ),
          headerRight: () => (
            <Button
              title="Save"
              variant="ghost"
              onPress={() => router.back()}
            />
          ),
        }}
      />

      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
          presentation: "fullScreenModal",
          headerLeft: () => (
            <Button title="X" variant="ghost" onPress={() => router.back()} />
          ),
        }}
      />
    </Stack>
  );
}
