"use client";

import { useEffect, useState } from "react";
import { PiixSprite } from "piixpal/react";

interface PiixCompanionProps {
  name?: string;
  size?: number;
  scale?: number;
  color?: string;
  look?: "mouse" | "wander" | "none";
  className?: string;
  title?: string;
}

export default function PiixCompanion({
  name = "robo",
  size = 46,
  scale,
  color,
  look = "mouse",
  className = "",
  title = "Pixel companion (click to interact)",
}: PiixCompanionProps) {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`inline-block opacity-0 ${className}`}
        style={{ width: size, height: size }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center select-none cursor-pointer transition-transform duration-200 active:scale-95 ${className}`}
      title={title}
      aria-label={title}
      role="img"
    >
      <PiixSprite
        name={name}
        size={size}
        scale={scale}
        color={color}
        look={prefersReducedMotion ? "none" : look}
        still={prefersReducedMotion}
      />
    </div>
  );
}
