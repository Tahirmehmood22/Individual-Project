


import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { t } from "@/lib/i18n";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";

export default function Settings() {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : true;
  });
  const [privacy] = useState("Standard");
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);
  // langCode for translation
  const langCode = language === "Swedish" ? "sv" : "en";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t("settings", langCode)}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex justify-between items-center border-b pb-2">
              <span className="font-medium text-gray-700 dark:text-gray-200">{t("notifications", langCode)}</span>
              <button
                className={`px-3 py-1 rounded ${notifications ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}
                onClick={() => setNotifications((v) => !v)}
              >
                {notifications ? t("enabled", langCode) : t("disabled", langCode)}
              </button>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
              <span className="font-medium text-gray-700 dark:text-gray-200">{t("theme", langCode)}</span>
              <select
                className="px-3 py-1 rounded border bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                value={theme}
                onChange={e => setTheme(e.target.value.toLowerCase())}
              >
                <option value="dark">{t("dark", langCode)}</option>
                <option value="light">{t("light", langCode)}</option>
                <option value="system">{t("system", langCode)}</option>
              </select>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
              <span className="font-medium text-gray-700 dark:text-gray-200">{t("language", langCode)}</span>
              <select
                className="px-3 py-1 rounded border bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                value={language}
                onChange={e => setLanguage(e.target.value)}
              >
                <option value="English">{t("english", langCode)}</option>
                <option value="Swedish">{t("swedish", langCode)}</option>
              </select>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
              <span className="font-medium text-gray-700 dark:text-gray-200">{t("privacy", langCode)}</span>
              <span className="text-gray-500 dark:text-gray-400">{t("standard", langCode)}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
