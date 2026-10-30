# Piixpal Integration & UI Polish Specification

## Overview
This document records the design decisions, component selection, performance budget, and accessibility rules for integrating Piixpal pixel companions into the Karan Darade Portfolio.

## Goals & Philosophy
- **Lightweight Delight**: Introduce micro-interactions that reinforce the developer's tech-focused brand without introducing layout shifts, performance degradation, or visual distraction.
- **Progressive Enhancement**: Built as zero-dependency client custom elements that load safely in Next.js, bundle locally via npm, and fail gracefully without breaking the layout.
- **Accessibility by Design**:
  - Full support for `prefers-reduced-motion` (freezes animations, disables cursor-following eyes, and resets transforms).
  - Explicit `role="img"`, `title`, and descriptive `aria-label` tags for screen readers.
  - Zero disruption to keyboard navigation or focus order.
  - Interactive companion elements wrapped with `active:scale-95` and appropriate hover indicators.

## Architecture & Components

### 1. PiixCompanion Component (`src/components/ui/PiixCompanion.tsx`)
- Encapsulates `PiixSprite` from `piixpal/react`.
- Prevents hydration mismatch by rendering a placeholder box with matching dimensions until client-side hydration completes.
- Subscribes to `window.matchMedia("(prefers-reduced-motion: reduce)")` events to dynamically adjust `look` and `still` attributes.

### 2. Hero Section Companion (`src/components/sections/Hero.tsx`)
- Character: `robo`
- Position: Anchored at `-right-2 top-2` (mobile) and `-right-4 top-4` (desktop) on the outer floating avatar ring.
- Interaction:
  - Cursor tracking (`look="mouse"`).
  - Hop animation when clicked.
  - Idle breathing / sleep cycle when inactive.
  - Accompanying subtle `"hi!"` text chip visible on desktop screens.

### 3. Custom 404 Page Companion (`src/app/not-found.tsx`)
- Character: `alien` (lost space explorer theme)
- Position: Centered above the 404 gradient heading.
- Purpose: Adds character to the error boundary while keeping recovery buttons clearly visible.

### 4. Accessibility & Styling Safeguards (`src/app/globals.css`, `ProjectCard.tsx`)
- High-visibility keyboard focus rings (`:focus-visible`).
- Global `@media (prefers-reduced-motion: reduce)` rules disabling CSS transitions/animations on `piix-sprite` and `piix-pal`.
- 3D card tilt in `ProjectCard.tsx` disabled when reduced motion is preferred.
