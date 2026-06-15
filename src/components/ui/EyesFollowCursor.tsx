"use client";

import { useEffect, useRef } from "react";

interface Eye {
  cx: number;
  cy: number;
}

export default function EyesFollowCursor({ eyeLeft, eyeRight }: { eyeLeft: Eye; eyeRight: Eye }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const centerX = vw / 2;
      const centerY = vh / 2;
      const dx = (mouseRef.current.x - centerX) / centerX;
      const dy = (mouseRef.current.y - centerY) / centerY;
      const maxOffset = 6;
      const offsetX = Math.max(-maxOffset, Math.min(maxOffset, dx * maxOffset));
      const offsetY = Math.max(-maxOffset, Math.min(maxOffset, dy * maxOffset));

      ctx.clearRect(0, 0, rect.width, rect.height);

      [eyeLeft, eyeRight].forEach((eye) => {
        const px = (eye.cx / 100) * rect.width;
        const py = (eye.cy / 100) * rect.height;

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(px, py, 10, 12, 0, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.restore();

        ctx.beginPath();
        ctx.arc(px + offsetX, py + offsetY, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [eyeLeft, eyeRight]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      aria-hidden="true"
    />
  );
}
