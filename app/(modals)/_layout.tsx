import { Button } from "@/components/common/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useUploadImage } from "@/hooks/useCard";
import { router, Stack } from "expo-router";
import { FormProvider } from "react-hook-form";
import useCardForm from "./useCardForm";

export default function ModalLayout() {
  const form = useCardForm();
  const { user } = useAuth();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const { mutate, mutateAsync, isPending, isError, error, data } =
    useUploadImage();

  const onSubmit = handleSubmit(async (formData) => {
    console.log("Form data submitted:", formData);
    try {
      await mutateAsync({
        localImagePath: formData.imageUrl ?? "",
        userId: user?.id ?? "",
      });
    } catch (error) {
      console.error("Upload failed:", error);
    }

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
