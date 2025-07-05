import { router, Tabs } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity } from "react-native";

import { HStack } from "@/components/common/HStack";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const SettingsButton = () => {
  return (
    <TouchableOpacity onPress={() => router.push("/(modals)/settings")}>
      <IconSymbol name="gearshape.fill" color={"blue"} />
    </TouchableOpacity>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
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
                  <IconSymbol name="plus" color={"blue"} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push("/(modals)/card-form")}
                >
                  <IconSymbol name="pencil" color={"blue"} />
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
