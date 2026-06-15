# Karan Darade — Portfolio

A modern, responsive personal portfolio website showcasing projects with full admin CRUD, auto-generation from GitHub repositories, server-side pagination, and a rich dark/light themed UI with animated design elements.

![Portfolio Preview](/avatar.jpg)

## Features

### Frontend
- **Hero Section** — Avatar with gradient border animation, word-stagger text reveal, marquee ticker, floating decorative shapes
- **Projects Grid** — 6 pinned projects on the homepage, auto-rotation when new projects are pinned
- **All Projects Page** — Server-side pagination (6/page), newest/oldest sort, loading states
- **Project Detail Pages** — SSG with full description, tech stack badges, features list, deployment/GitHub links
- **About Section** — Bio, tech stack badges, animated decorative elements
- **Contact Section** — Contact cards, social links, animated gradient-border email card
- **Dark/Light Theme** — CSS variables with localStorage persistence and system preference detection
- **Responsive Design** — Mobile-first, touch-friendly (44px minimum touch targets throughout)
- **Scroll Animations** — Framer Motion viewport reveals, staggered children, 3D card tilt on hover
- **Cursor Glow** — Subtle radial gradient following the mouse on desktop

### Admin Panel
- **Login** — Password-based JWT authentication (`/admin/login`)
- **Dashboard** — View all projects, pin/unpin with auto-rotation (max 6 pinned), drag-to-reorder pinned projects
- **Auto-Create Project** — Submit just Title + GitHub URL + Deployment URL; auto-fetches repo data, generates descriptions, extracts features/tech stack, and captures a screenshot via Puppeteer
- **Full CRUD** — Create, edit, delete projects with the full form
- **Responsive Admin UI** — Works on mobile with accessible touch targets

### Performance & Scalability
- **In-memory project cache** — 10s TTL, auto-invalidated on writes, avoids repeated disk reads
- **Server-side pagination** — API supports `?page=N&perPage=N&sort=newest` queries; frontend fetches only the current page
- **Static Site Generation** — All project detail pages pre-rendered at build time
- **Optimized images** — Next.js `Image` component with responsive `sizes` props

## Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | Next.js 16 (App Router, webpack) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Animation** | Framer Motion 12 |
| **Icons** | lucide-react |
| **Font** | Geist (sans/mono), Bricolage Grotesque (display) |
| **Auth** | jose (JWT), bcryptjs |
| **Screenshots** | puppeteer-core (system Chrome) |
| **Testing** | Vitest + React Testing Library |

## Getting Started

### Prerequisites
- Node.js 20+
- Google Chrome (for Puppeteer screenshots)

### Environment Variables
Copy `.env.example` to `.env` and configure:
```bash
ADMIN_PASSWORD=your-password
JWT_SECRET=your-secret
GITHUB_TOKEN=           # Optional: for higher GitHub API rate limits
```

### Install & Run
```bash
npm install
npm run dev --webpack     # Start dev server
```

The app will be available at `http://localhost:3000`.

### Commands
| Command | Description |
|---|---|
| `npm run dev --webpack` | Start development server |
| `npm run build --webpack` | Production build |
| `npm start` | Start production server |
| `npm test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint |
| `npm run screenshots` | Capture deployment screenshots for all projects |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/              # Admin panel (login, dashboard, CRUD)
│   ├── api/                # API routes (auth, projects)
│   ├── projects/           # All projects + detail pages
│   ├── globals.css         # Theme variables, animations
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── not-found.tsx       # 404 page
│   ├── error.tsx           # Error boundary
│   └── loading.tsx         # Loading state
├── components/
│   ├── admin/              # ProjectForm (auto-create + full edit)
│   ├── effects/            # CursorGlow, SectionDivider
│   ├── layout/             # Header, Footer, ThemeToggle
│   ├── providers/          # ThemeProvider, AnimatedSection
│   ├── sections/           # Hero, ProjectsGrid, AboutSection, ContactSection
│   └── ui/                 # ProjectCard, Pagination, icons
├── data/                   # projects.json
├── lib/                    # Server utilities
│   ├── auth.ts             # JWT authentication
│   ├── projects.ts         # CRUD with in-memory cache
│   ├── github.ts           # GitHub API client
│   ├── autoGenerate.ts     # Content generation from README
│   └── screenshot.ts       # Puppeteer screenshot service
└── __tests__/              # Vitest tests
```

## Auto-Create Project Flow

1. Admin submits **Title** + **GitHub URL** + **Deployment URL**
2. Backend extracts `owner/repo` from the GitHub URL
3. Fetches repo description, languages, topics, and README via GitHub API
4. Generates: slug, short description, detailed description, tech stack, features
5. Captures a 1280×720 screenshot of the deployment URL via Puppeteer
6. Saves the project to `projects.json`

## Admin Access

Navigate to `/admin/login` and enter your configured `ADMIN_PASSWORD`.

- **Dashboard**: `/admin/projects` — Pin/unpin, reorder, delete projects
- **New Project**: `/admin/projects/new` — Auto-create with just 3 fields
- **Edit Project**: `/admin/projects/[id]/edit` — Full form editing

## Responsive Breakpoints

- **Mobile**: 320px+ (stacked layouts, hidden desktop decorations)
- **Tablet**: 768px+ (2-column grids)
- **Desktop**: 1024px+ (3-column grids, cursor glow)
- **Wide**: 1280px+ (max-width containers)

All interactive elements meet 44×44px minimum touch target recommendations (WCAG 2.1).

## License

MIT
