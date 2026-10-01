import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[110px]" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-secondary/10 blur-[110px]" />
      </div>

      <span className="font-display text-gradient text-[6rem] font-black leading-none tracking-tight sm:text-[9rem]">
        404
      </span>
      <h1 className="font-display mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-card-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
