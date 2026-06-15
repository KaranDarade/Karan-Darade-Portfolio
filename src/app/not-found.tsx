import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl" />
      </div>
      <span className="text-[8rem] sm:text-[12rem] font-bold font-[family-name:var(--font-display)] leading-none bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent animate-pulse">
        404
      </span>
      <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] mt-4">
        Page Not Found
      </h1>
      <p className="text-muted mt-2 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200 font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>
    </div>
  );
}
