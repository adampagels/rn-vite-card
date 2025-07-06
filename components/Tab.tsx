import { useHaptics } from "@/contexts/HapticsContext";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";

export function Tab(props: BottomTabBarButtonProps) {
  const { hapticsEnabled } = useHaptics();

  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (hapticsEnabled) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
