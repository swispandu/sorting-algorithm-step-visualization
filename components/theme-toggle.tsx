"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

/**
 * ThemeToggle Component
 * Provides a button to toggle between light and dark themes
 * Uses next-themes for theme management
 */
export function ThemeToggle() {
  // Get current theme and theme setter from next-themes
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed top-4 right-4 rounded-full w-10 h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {/* Sun icon for light theme */}
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      {/* Moon icon for dark theme */}
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}