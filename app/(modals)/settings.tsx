import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useHaptics } from "@/contexts/HapticsContext";
import { useState } from "react";
import { StyleSheet, Switch, TouchableOpacity, View } from "react-native";

type SettingItemType = {
  title: string;
  subtitle: string;
  onPress: () => void;
  rightComponent: React.ReactNode;
};

export default function SettingsScreen() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { hapticsEnabled, toggleHaptics } = useHaptics();

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const SettingItem = ({
    title,
    subtitle,
    onPress,
    rightComponent,
  }: SettingItemType) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingContent}>
        <ThemedText style={styles.settingTitle}>{title}</ThemedText>
        {subtitle && (
          <ThemedText style={styles.settingSubtitle}>{subtitle}</ThemedText>
        )}
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.screenTitle}>Settings</ThemedText>

      <View style={styles.settingsGroup}>
        <ThemedText style={styles.groupTitle}>Appearance</ThemedText>

        <SettingItem
          title="Dark Theme"
          subtitle="Switch between light and dark themes"
          onPress={toggleTheme}
          rightComponent={
            <Switch
              value={isDarkTheme}
              onValueChange={toggleTheme}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDarkTheme ? "#f5dd4b" : "#f4f3f4"}
            />
          }
        />
      </View>

      <View style={styles.settingsGroup}>
        <ThemedText style={styles.groupTitle}>Interaction</ThemedText>

        <SettingItem
          title="Haptic Feedback"
          subtitle="Feel vibrations when interacting with the app"
          onPress={toggleHaptics}
          rightComponent={
            <Switch
              value={hapticsEnabled}
              onValueChange={toggleHaptics}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={hapticsEnabled ? "#f5dd4b" : "#f4f3f4"}
            />
          }
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    paddingVertical: 5,
  },
  settingsGroup: {
    marginBottom: 30,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    opacity: 0.8,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 16,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    opacity: 0.6,
  },
});
