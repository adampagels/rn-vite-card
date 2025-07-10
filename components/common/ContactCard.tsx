import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Card } from "@/types/card";
import { Image } from "expo-image";
import { Linking, useWindowDimensions } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { IconSymbol } from "../ui/IconSymbol";
import { HStack } from "./HStack";
import { NeubrutalButton } from "./NeubrutalButton";

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
  const colorScheme = useColorScheme();

  const cardHeight = height - insets.top - insets.bottom - 20 - 120;

  const fullImageUrl = imageUrl
    ? `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/card-images/${imageUrl}`
    : null;

  return (
    <ThemedView
      style={{
        borderWidth: 2,
        borderRadius: 12,
        width: width - 45,
        height: cardHeight,
        paddingTop: 50,
        alignItems: "center",
        display: "flex",
        alignSelf: "center",
      }}
      darkColor={"#000"}
      lightColor={Colors.light.secondary}
      bordered
    >
      {fullImageUrl && (
        <ThemedView
          bordered
          style={{
            height: 200,
            width: 200,
            borderRadius: 100,
            overflow: "hidden",
            borderWidth: 2,
          }}
        >
          <Image
            source={{ uri: fullImageUrl }}
            style={{
              height: "100%",
              width: "100%",
            }}
            contentFit="cover"
          />
        </ThemedView>
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
      <HStack spacing={20} style={{ marginTop: 20 }}>
        {email && (
          <NeubrutalButton
            borderColor={Colors[colorScheme ?? "light"].primary}
            onPress={() => Linking.openURL(`mailto:${email}`)}
            buttonStyle={{ padding: 10 }}
          >
            <IconSymbol
              name="envelope"
              size={40}
              color={Colors[colorScheme ?? "light"].primary}
            />
          </NeubrutalButton>
        )}

        {phone && (
          // <ThemedView
          //   style={{ borderRadius: 20 }}
          //   darkColor={Colors.light.secondary}
          //   lightColor={Colors.light.primary}
          //   bordered
          // >
          //   <Pressable
          //     onPress={() => Linking.openURL(`tel:${phone}`)}
          //     style={{
          //       backgroundColor: "#e6ffe6",
          //       width: 40,
          //       height: 40,
          //       borderRadius: 20,
          //       alignItems: "center",
          //       justifyContent: "center",
          //     }}
          //   >
          <NeubrutalButton
            borderColor={Colors[colorScheme ?? "light"].primary}
            onPress={() => Linking.openURL(`mailto:${email}`)}
            buttonStyle={{ padding: 10 }}
          >
            <IconSymbol
              name="phone"
              size={40}
              color={Colors[colorScheme ?? "light"].primary}
            />
          </NeubrutalButton>
        )}

        {website && (
          <NeubrutalButton
            borderColor={Colors[colorScheme ?? "light"].primary}
            onPress={() => {
              const url = website.startsWith("http")
                ? website
                : `https://${website}`;
              Linking.openURL(url);
            }}
            buttonStyle={{ padding: 10 }}
          >
            <IconSymbol
              name="globe"
              size={40}
              color={Colors[colorScheme ?? "light"].primary}
            />
          </NeubrutalButton>
        )}
      </HStack>
    </ThemedView>
  );
};
