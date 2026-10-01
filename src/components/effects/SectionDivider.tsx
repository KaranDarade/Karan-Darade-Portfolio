export default function SectionDivider() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center gap-4 py-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-card-border to-transparent" />
        <div className="h-1 w-1 rounded-full bg-primary/50 animate-pulse-soft" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-card-border to-transparent" />
      </div>
    </div>
  );
}
