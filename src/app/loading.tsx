export default function Loading() {
  return (
    <div className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-2 border-card-border" />
        <div className="absolute inset-0 h-12 w-12 animate-spin rounded-full border-2 border-t-primary" />
      </div>
      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">Loading</p>
    </div>
  );
}
