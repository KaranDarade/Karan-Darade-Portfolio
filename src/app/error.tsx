"use client";

import { useEffect } from "react";
import { RotateCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-red-500/10 blur-[110px]" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-secondary/10 blur-[110px]" />
      </div>

      <span className="font-mono text-sm uppercase tracking-[0.3em] text-red-400">Error</span>
      <h1 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
      >
        <RotateCw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  );
}
