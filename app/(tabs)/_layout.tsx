import { router, Tabs } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

import { HStack } from "@/components/common/HStack";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const SettingsButton = () => {
    return (
      <TouchableOpacity onPress={() => router.push("/(modals)/settings")}>
        <IconSymbol
          name="gearshape.fill"
          color={Colors[colorScheme ?? "light"].tertiary}
          style={{ marginHorizontal: 16 }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tertiary,
        tabBarStyle: {
          alignContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 10,
          height: 70,
          borderWidth: 2,
          borderTopWidth: 2,
          borderRadius: 50,
          borderColor: Colors[colorScheme ?? "light"].primary,
          marginBottom: 20,
          marginHorizontal: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          // marginBottom: 10,
          alignSelf: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Cards",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="list.bullet.rectangle.fill"
              color={color}
            />
          ),
          headerLeft: SettingsButton,
          headerRight: () => {
            return (
              <HStack spacing={15}>
                <TouchableOpacity
                  onPress={() => router.push("/(modals)/card-form")}
                >
                  <IconSymbol
                    name="plus"
                    color={Colors[colorScheme ?? "light"].tertiary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push("/(modals)/card-form")}
                >
                  <IconSymbol
                    name="pencil"
                    color={Colors[colorScheme ?? "light"].tertiary}
                    style={{ marginRight: 16 }}
                  />
                </TouchableOpacity>
              </HStack>
            );
          },
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.3.sequence.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
