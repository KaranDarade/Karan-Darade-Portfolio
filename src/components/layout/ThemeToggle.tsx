"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative p-3 rounded-full transition-all duration-300 hover:scale-110 min-w-[44px] min-h-[44px]",
        "bg-accent hover:bg-accent-hover border border-card-border",
        "text-foreground/70 hover:text-foreground",
        className
      )}
      aria-label="Toggle theme"
    >
      <Sun
        className={cn(
          "h-5 w-5 transition-all duration-300",
          theme === "dark" ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
        )}
        style={{ position: theme === "dark" ? "absolute" : "relative" }}
      />
      <Moon
        className={cn(
          "h-5 w-5 transition-all duration-300",
          theme === "light" ? "opacity-0 -rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
        )}
        style={{ position: theme === "light" ? "absolute" : "relative" }}
      />
    </button>
  );
}
