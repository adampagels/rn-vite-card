import { Card } from "@/types/card";
import { Image } from "expo-image";
import { useWindowDimensions } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../ThemedText";
import { VStack } from "./VStack";

interface ContactCardProps {
  card: Card;
}

export const ContactCard = ({ card }: ContactCardProps) => {
  const {
    firstName,
    lastName,
    company,
    phone,
    email,
    website,
    imageUrl,
    role,
    id,
  } = card;

  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();

  const cardHeight = height - insets.top - insets.bottom - 20 - 120;

  const fullImageUrl = imageUrl
    ? `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/card-images/${imageUrl}`
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
            borderRadius: 100,
            borderWidth: 2,
            height: 200,
            marginBottom: 10,
            width: 200,
          }}
        />
      )}
      <ThemedText type="title">{`${firstName} ${lastName}`}</ThemedText>
      {role && <ThemedText>{role}</ThemedText>}
      {company && <ThemedText>{company}</ThemedText>}
      <QRCode
        // TODO: Implement deeplinking for card scan
        value={`https://vite-card.com/c/${id}`}
        size={120}
        color="#000000"
        backgroundColor="#FFFFFF"
      />
      {email && <ThemedText>{email}</ThemedText>}
      {phone && <ThemedText>{phone}</ThemedText>}
      {website && <ThemedText>{website}</ThemedText>}
    </VStack>
  );
};
