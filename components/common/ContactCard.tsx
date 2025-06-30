import { Card } from "@/types/card";
import { Image } from "expo-image";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../ThemedText";
import { VStack } from "./VStack";

export const ContactCard = ({
  firstName,
  lastName,
  company,
  phone,
  email,
  website,
  imageUrl,
  role,
}: Card) => {
  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();

  const cardHeight = height - insets.top - insets.bottom - 20 - 120;

  const fullImageUrl = imageUrl
    ? `https://zourhyiffiszvlpifmtc.supabase.co/storage/v1/object/public/card-images/${imageUrl}`
    : null;

  return (
    <VStack
      style={{
        borderWidth: 2,
        borderRadius: 12,
        width: width - 50,
        height: cardHeight,
        paddingTop: 50,
        alignItems: "center",
      }}
    >
      {fullImageUrl && (
        <Image
          source={{ uri: fullImageUrl }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            marginBottom: 10,
          }}
        />
      )}
      <ThemedText type="title">{`${firstName} ${lastName}`}</ThemedText>
      {role && <ThemedText>{role}</ThemedText>}
      {company && <ThemedText>{company}</ThemedText>}
      {email && <ThemedText>{email}</ThemedText>}
      {phone && <ThemedText>{phone}</ThemedText>}
      {website && <ThemedText>{website}</ThemedText>}
    </VStack>
  );
};
