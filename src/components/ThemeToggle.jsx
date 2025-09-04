import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        size="icon"
        aria-label="Toggle theme"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="rounded-full"
      >
        {isDark ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
}


