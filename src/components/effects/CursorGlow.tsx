"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let mouseX = -200;
    let mouseY = -200;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      if (glowRef.current) {
        glowRef.current.style.left = `${mouseX}px`;
        glowRef.current.style.top = `${mouseY}px`;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-[9999] hidden lg:block"
      style={{
        width: 600,
        height: 600,
        transform: "translate(-50%, -50%)",
        background:
          "radial-gradient(circle at center, rgba(124,108,246,0.06) 0%, rgba(91,157,255,0.03) 30%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}
