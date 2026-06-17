"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
  driftX: number;
  driftY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: "butterfly" | "glitter";
  color: string;
}

const COLORS = [
  "#a855f7",
  "#6366f1",
  "#ec4899",
  "#06b6d4",
  "#f59e0b",
  "#8b5cf6",
  "#10b981",
];

export default function FloatingParticles({ count = 18 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const items: Particle[] = [];
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 3,
        speed: Math.random() * 12 + 8,
        delay: Math.random() * 10,
        driftX: (Math.random() - 0.5) * 30,
        driftY: (Math.random() - 0.5) * 30 - 10,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
        opacity: Math.random() * 0.5 + 0.2,
        type: i % 3 === 0 ? "butterfly" : "glitter",
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }
    setParticles(items);
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `butterfly-drift-${p.type === "butterfly" ? "wing" : "glow"} ${p.speed}s ease-in-out ${p.delay}s infinite alternate`,
            opacity: p.opacity,
          }}
        >
          <div
            style={{
              width: p.size,
              height: p.size,
              animation: `butterfly-spin ${p.rotationSpeed >= 0 ? p.rotationSpeed + 3 : Math.abs(p.rotationSpeed) + 3}s linear infinite`,
              transform: `rotate(${p.rotation}deg)`,
            }}
          >
            {p.type === "butterfly" ? (
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path
                  d="M10 4C8 8 4 9 4 9C4 9 6 11 10 16C14 11 16 9 16 9C16 9 12 8 10 4Z"
                  fill={p.color}
                  opacity="0.8"
                />
                <path
                  d="M10 7C10 7 10 10 10 12"
                  stroke={p.color}
                  strokeWidth="0.5"
                  opacity="0.6"
                />
              </svg>
            ) : (
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: p.color,
                  boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
