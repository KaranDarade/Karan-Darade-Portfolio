import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cn("mb-12 sm:mb-16", centered ? "text-center" : "text-left", className)}>
      <p className="section-eyebrow mb-3">{eyebrow}</p>
      <h2 className="font-display text-[1.75rem] leading-[1.12] font-bold tracking-tight sm:text-4xl lg:text-[2.6rem]">
        {title}
        {accent && <> <span className="text-gradient">{accent}</span></>}
      </h2>
      <div
        className={cn(
          "mt-5 h-px w-16 bg-gradient-to-r",
          centered
            ? "mx-auto from-transparent via-primary/60 to-transparent"
            : "from-primary/70 to-transparent"
        )}
      />
      {description && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-[15px] leading-relaxed text-muted",
            centered && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
