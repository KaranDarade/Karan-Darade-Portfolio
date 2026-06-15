export default function SectionDivider() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center gap-4 py-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-pulse-soft" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
    </div>
  );
}
