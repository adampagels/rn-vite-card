import { Button } from "@/components/common/Button";
import { useAuth } from "@/contexts/AuthContext";
import { router, Stack } from "expo-router";
import { FormProvider } from "react-hook-form";
import useCardForm from "./useCardForm";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { useUploadCardWithImage } from "@/hooks/useCard";
import { TouchableOpacity } from "react-native";

export default function ModalLayout() {
  const form = useCardForm();
  const { user } = useAuth();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const { mutate, mutateAsync, isPending, isError, error, data } =
    useUploadCardWithImage();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      await mutateAsync({
        card: formData,
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
              <TouchableOpacity onPress={() => router.back()}>
                <IconSymbol name="xmark" color={"blue"} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </FormProvider>
  );
}
