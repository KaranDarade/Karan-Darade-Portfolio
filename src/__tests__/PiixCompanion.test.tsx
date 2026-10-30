import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import PiixCompanion from "@/components/ui/PiixCompanion";

describe("PiixCompanion", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("renders with accessible role and title", () => {
    render(<PiixCompanion name="robo" title="Robot companion" />);
    const el = screen.getByRole("img");
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("aria-label", "Robot companion");
  });

  it("applies custom className", () => {
    render(<PiixCompanion name="robo" className="custom-test-class" />);
    const el = screen.getByRole("img");
    expect(el.className).toContain("custom-test-class");
  });
});
