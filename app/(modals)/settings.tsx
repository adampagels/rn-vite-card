import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useHaptics } from "@/contexts/HapticsContext";
import { ThemeMode, useTheme } from "@/contexts/ThemeContext";
import { StyleSheet, Switch, TouchableOpacity, View } from "react-native";

type SettingItemType = {
  title: string;
  subtitle: string;
  onPress: () => void;
  rightComponent: React.ReactNode;
};

export default function SettingsScreen() {
  const { hapticsEnabled, toggleHaptics } = useHaptics();
  const { themeMode, setThemeMode } = useTheme();

  const getThemeDisplayName = (mode: ThemeMode): string => {
    switch (mode) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "system":
        return "System";
      default:
        return "System";
    }
  };

  const getThemeSubtitle = (mode: ThemeMode): string => {
    switch (mode) {
      case "light":
        return "Always use light theme";
      case "dark":
        return "Always use dark theme";
      case "system":
        return "Follow system appearance";
      default:
        return "Follow system appearance";
    }
  };

  const cycleTheme = () => {
    const modes: ThemeMode[] = ["system", "light", "dark"];
    const currentIndex = modes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setThemeMode(modes[nextIndex]);
  };

  const SettingItem = ({
    title,
    subtitle,
    onPress,
    rightComponent,
  }: SettingItemType) => (
    <TouchableOpacity onPress={onPress}>
      <ThemedView style={styles.settingItem} bordered>
        <View style={styles.settingContent}>
          <ThemedText style={styles.settingTitle}>{title}</ThemedText>
          {subtitle && (
            <ThemedText style={styles.settingSubtitle}>{subtitle}</ThemedText>
          )}
        </View>
        {rightComponent}
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.screenTitle}>Settings</ThemedText>

      <View style={styles.settingsGroup}>
        <ThemedText style={styles.groupTitle}>Appearance</ThemedText>

        <SettingItem
          title="Theme"
          subtitle={getThemeSubtitle(themeMode)}
          onPress={cycleTheme}
          rightComponent={
            <View style={styles.themeIndicator}>
              <ThemedText style={styles.themeText}>
                {getThemeDisplayName(themeMode)}
              </ThemedText>
            </View>
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
  themeIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  themeText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
