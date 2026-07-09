# MercyLife Church Dominion Temple — Website

The official website for **MercyLife Church Dominion Temple**, a welcoming Christian church located in Arlington, Texas. This is a modern, SEO-optimized landing page built with TanStack Start (React SSR) and Tailwind CSS.

🌐 **Live:** [mlcdallas.net](https://mlcdallas.net) | [mlcdallas.org](https://mlcdallas.org)

---

## About the Church

MercyLife Church Dominion Temple is a vibrant, faith-centered community offering weekly worship services in Arlington, TX:

- **Friday Night Worship** — 7:30 PM
- **Sunday Morning Service** — 10:00 AM

📍 3100 Pleasant Valley Ln, Arlington, TX 76015
📞 (817) 677-1407

---

## Tech Stack

| Layer         | Technology                                                                  |
| ------------- | --------------------------------------------------------------------------- |
| Framework     | [TanStack Start](https://tanstack.com/start) (React 19 + SSR)               |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com/)                                 |
| Build Tool    | [Vite 7](https://vite.dev/)                                                 |
| Fonts         | Google Fonts (Cormorant Garamond + Inter)                                   |
| Icons         | [Lucide React](https://lucide.dev/)                                         |
| UI Components | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| Server        | Nitro (Cloudflare-ready)                                                    |

---

## Features

### SEO & Local Search

- Optimized `<title>`, meta description, canonical URL, and robots directives
- Open Graph and Twitter/X card metadata for rich social sharing
- Complete JSON-LD structured data: `Church`, `Organization`, `WebSite`, `BreadcrumbList`
- Geo-location meta tags for local search visibility
- Local keyword optimization for Arlington, TX church searches

### Accessibility

- Semantic HTML (`<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<address>`)
- Skip-to-content link for keyboard navigation
- ARIA labels on all interactive elements and sections
- Proper heading hierarchy (single H1, nested H2/H3)
- Descriptive alt text on all images
- High contrast brand palette

### Performance

- Server-side rendered (SSR) for fast initial paint
- `fetchPriority="high"` on hero image (LCP optimization)
- `content-visibility: auto` on below-fold sections
- Lazy loading on below-fold images and Google Maps iframe
- `dns-prefetch` for third-party domains
- Google Fonts loaded with `display=swap`

### Conversion

- Prominent "Plan Your Visit" CTAs throughout the page
- Sticky mobile bottom bar with "Plan Your Visit" + "Call Now" buttons
- "What to Expect" section addressing first-time visitor concerns
- Direct "Call Now" and "Get Directions" action buttons
- Social media engagement section (Instagram + YouTube)

---

## Project Structure

```
src/
├── assets/               # Images (hero, community, logo)
├── components/ui/        # Reusable Radix/shadcn UI components
├── lib/
│   ├── seo-schema.ts     # JSON-LD structured data
│   └── ...
├── routes/
│   ├── __root.tsx         # Root layout (metadata, fonts, shell)
│   └── index.tsx          # Landing page (all sections)
├── styles.css             # Tailwind + custom design tokens
├── router.tsx             # TanStack Router setup
├── server.ts              # SSR server entry
└── start.ts               # TanStack Start config
public/
└── favicon.svg            # Brand favicon
```

---

## Getting Started

### Prerequisites

- Node.js 20+ (or Bun)
- npm or bun

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server starts at `http://localhost:8080` (or next available port).

---

## Future Roadmap

The site is structured to expand into a full multi-page website:

| Page       | URL           | Status     |
| ---------- | ------------- | ---------- |
| Home       | `/`           | ✅ Live    |
| About      | `/about`      | 🔜 Planned |
| Ministries | `/ministries` | 🔜 Planned |
| Events     | `/events`     | 🔜 Planned |
| Sermons    | `/sermons`    | 🔜 Planned |
| Giving     | `/giving`     | 🔜 Planned |
| Contact    | `/contact`    | 🔜 Planned |

---

## Social Links

- [Instagram — @mercylife_dallas](https://www.instagram.com/mercylife_dallas)
- [YouTube — @brianamoatengtv](https://www.youtube.com/@brianamoatengtv)

---

## License

© 2025 MercyLife Church Dominion Temple. All rights reserved.

Built by [Stackwave Digital](https://github.com/stackwave-digital).
