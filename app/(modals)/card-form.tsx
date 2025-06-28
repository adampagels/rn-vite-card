import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useCreateCard } from "@/hooks/useCard";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Image,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { CardFormData } from "./useCardForm";

export default function CardFormScreen() {
  const [image, setImage] = React.useState<string | null>(null);
  console.log(useCreateCard);
  const {
    setValue,
    formState: { errors },
  } = useFormContext<CardFormData>();

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Camera permission is required");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      setValue("imageUrl", uri);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity onPress={openCamera} style={styles.cameraButton}>
        {image ? (
          <Image source={{ uri: image }} style={styles.cameraImage} />
        ) : (
          <IconSymbol name="camera" color={"blue"} size={35} />
        )}
      </TouchableOpacity>

      {renderField(
        "First Name",
        "first_name",
        errors.first_name?.message,
        setValue
      )}
      {renderField(
        "Last Name",
        "last_name",
        errors.last_name?.message,
        setValue
      )}
      {renderField(
        "Email",
        "email",
        errors.email?.message,
        setValue,
        "email-address"
      )}
      {renderField(
        "Phone",
        "phone",
        errors.phone?.message,
        setValue,
        "phone-pad"
      )}
      {renderField("Company", "company", errors.company?.message, setValue)}
      {renderField(
        "Website",
        "website",
        errors.website?.message,
        setValue,
        "url"
      )}
    </ThemedView>
  );
}

function renderField(
  label: string,
  field: keyof CardFormData,
  error: string | undefined,
  setValue: (name: keyof CardFormData, value: string) => void,
  keyboardType: KeyboardTypeOptions = "default"
) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={`Enter ${label.toLowerCase()}`}
        onChangeText={(text) => setValue(field, text)}
        style={[styles.input, error && styles.inputError]}
        autoCapitalize="none"
        keyboardType={keyboardType}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 4,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
  },
  error: {
    color: "red",
    marginBottom: 8,
    fontSize: 14,
  },
  cameraButton: {
    backgroundColor: "#f0f0f0",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 16,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  cameraImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: "cover",
  },
});
