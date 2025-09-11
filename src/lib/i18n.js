// src/lib/i18n.js
export const translations = {
  en: {
    settings: "Settings",
    notifications: "Notifications",
    enabled: "Enabled",
    disabled: "Disabled",
    theme: "Theme",
    language: "Language",
    privacy: "Privacy",
    dark: "Dark",
    light: "Light",
    system: "System",
    english: "English",
    swedish: "Swedish",
    standard: "Standard",
    // Add more keys as needed
  },
  sv: {
    settings: "Inställningar",
    notifications: "Aviseringar",
    enabled: "Aktiverad",
    disabled: "Avaktiverad",
    theme: "Tema",
    language: "Språk",
    privacy: "Sekretess",
    dark: "Mörk",
    light: "Ljus",
    system: "System",
    english: "Engelska",
    swedish: "Svenska",
    standard: "Standard",
    // Add more keys as needed
  },
};

export function t(key, lang = "en") {
  return translations[lang]?.[key] || key;
}
