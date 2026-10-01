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
        "relative grid h-11 w-11 place-items-center rounded-full border border-card-border bg-accent text-foreground/70 transition-colors duration-300 hover:text-foreground",
        className
      )}
      aria-label="Toggle theme"
    >
      <Sun
        className={cn(
          "h-[18px] w-[18px] transition-all duration-300",
          theme === "dark" ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        )}
        style={{ position: theme === "dark" ? "absolute" : "relative" }}
      />
      <Moon
        className={cn(
          "h-[18px] w-[18px] transition-all duration-300",
          theme === "light" ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        )}
        style={{ position: theme === "light" ? "absolute" : "relative" }}
      />
    </button>
  );
}
