"use client";

/* eslint-disable @next/next/no-img-element */

const GRADIENTS: [string, string][] = [
  ["#6366f1", "#a855f7"],
  ["#8b5cf6", "#ec4899"],
  ["#06b6d4", "#3b82f6"],
  ["#10b981", "#06b6d4"],
  ["#f59e0b", "#ef4444"],
  ["#8b5cf6", "#06b6d4"],
  ["#ec4899", "#f97316"],
  ["#a855f7", "#3b82f6"],
];

export default function ProjectPreviewImage({ imageUrl, title }: { imageUrl: string; title: string }) {
  const gradientIndex = Math.abs(
    title.split("").reduce((h, c) => h + c.charCodeAt(0), 0)
  ) % GRADIENTS.length;
  const [c1, c2] = GRADIENTS[gradientIndex];

  return (
    <div
      className="glow-ring relative mb-10 aspect-video overflow-hidden rounded-2xl border border-card-border"
      style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="px-6 text-center text-3xl font-bold leading-tight tracking-tight text-white/90 sm:text-5xl">
          {title}
        </span>
      </div>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      )}
    </div>
  );
}
