import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface HapticsContextType {
  hapticsEnabled: boolean;
  setHapticsEnabled: (enabled: boolean) => void;
  toggleHaptics: () => void;
}

const HapticsContext = createContext<HapticsContextType | undefined>(undefined);

const HAPTICS_STORAGE_KEY = "@haptics_enabled";

interface HapticsProviderProps {
  children: ReactNode;
}

export const HapticsProvider: React.FC<HapticsProviderProps> = ({
  children,
}) => {
  const [hapticsEnabled, setHapticsEnabledState] = useState(true);

  useEffect(() => {
    loadHapticsPreference();
  }, []);

  const loadHapticsPreference = async () => {
    try {
      const savedPreference = await AsyncStorage.getItem(HAPTICS_STORAGE_KEY);
      if (savedPreference !== null) {
        setHapticsEnabledState(JSON.parse(savedPreference));
      }
    } catch (error) {
      console.error("Error loading haptics preference:", error);
    }
  };

  const setHapticsEnabled = async (enabled: boolean) => {
    try {
      setHapticsEnabledState(enabled);
      await AsyncStorage.setItem(HAPTICS_STORAGE_KEY, JSON.stringify(enabled));
    } catch (error) {
      console.error("Error saving haptics preference:", error);
    }
  };

  const toggleHaptics = () => {
    setHapticsEnabled(!hapticsEnabled);
  };

  const value: HapticsContextType = {
    hapticsEnabled,
    setHapticsEnabled,
    toggleHaptics,
  };

  return (
    <HapticsContext.Provider value={value}>{children}</HapticsContext.Provider>
  );
};

export const useHaptics = (): HapticsContextType => {
  const context = useContext(HapticsContext);
  if (context === undefined) {
    throw new Error("useHaptics must be used within a HapticsProvider");
  }
  return context;
};
