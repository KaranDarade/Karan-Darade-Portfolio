export default function Loading() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="w-12 h-12 border-2 border-card-border rounded-full" />
        <div className="absolute inset-0 w-12 h-12 border-2 border-t-primary rounded-full animate-spin" />
      </div>
      <p className="text-muted mt-4 text-sm">Loading...</p>
    </div>
  );
}
