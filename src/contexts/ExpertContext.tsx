import {
  createContext,
  useContext,
  useState,
  useEffect,
  type JSX,
} from "react";

export interface ExpertSettings {
  isExpertModeEnabled: boolean;
  callbackUrl: string;
  parameters: string; // JSON string
  context: string; // JSON string
  redirectUrl: string;
  providerVersion: string;
  appId: string;
  appSecret: string;
  sharePageUrl: string;
}

interface ExpertContextType {
  settings: ExpertSettings;
  updateSettings: (newSettings: Partial<ExpertSettings>) => void;
  saveSettings: () => void;
}

const defaultSettings: ExpertSettings = {
  isExpertModeEnabled: false,
  callbackUrl: "",
  parameters: "",
  context: "",
  redirectUrl: "",
  providerVersion: "",
  appId: "",
  appSecret: "",
  sharePageUrl: "",
};

const ExpertContext = createContext<ExpertContextType | undefined>(undefined);

export const useExpertContext = () => {
  const context = useContext(ExpertContext);
  if (!context) {
    throw new Error(
      "useExpertContext must be used within an ExpertContextProvider",
    );
  }
  return context;
};

export const ExpertContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [settings, setSettings] = useState<ExpertSettings>(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const storedSettings = localStorage.getItem("reclaim_expert_settings");
    if (storedSettings) {
      try {
        setSettings(JSON.parse(storedSettings));
      } catch (e) {
        console.error("Failed to parse stored expert settings", e);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<ExpertSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const saveSettings = () => {
    // Here we could perform validation if needed, but for now we just persist
    localStorage.setItem("reclaim_expert_settings", JSON.stringify(settings));
    console.log("Expert settings saved:", settings);
  };

  return (
    <ExpertContext.Provider value={{ settings, updateSettings, saveSettings }}>
      {children}
    </ExpertContext.Provider>
  );
};
