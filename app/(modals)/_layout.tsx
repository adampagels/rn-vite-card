import { Button } from "@/components/common/Button";
import { router, Stack } from "expo-router";
import { FormProvider } from "react-hook-form";
import useCardForm from "./useCardForm";

export default function ModalLayout() {
  const form = useCardForm();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    console.log("Form data submitted:", data);
    // TODO: Update with actual service call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    router.back();
  });

  return (
    <FormProvider {...form}>
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
                title={isSubmitting ? "Saving..." : "Save"}
                variant="ghost"
                onPress={onSubmit}
                disabled={isSubmitting}
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
    </FormProvider>
  );
}
