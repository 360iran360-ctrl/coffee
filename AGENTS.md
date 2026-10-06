# Cafeino — Persian RTL Cafe & Restaurant Website

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS 3
- Vazirmatn font (loaded via CDN in globals.css)
- No external services or database — all data is static in `lib/data.ts`

## Running the app
```
docker compose -f docker-compose.base44.yml up -d --build
```
The app runs on port 3000. Next.js dev server with live reload.

## Structure
- `app/` — Next.js App Router pages (/, /menu, /gallery, /reservation, /events, /about, /contact, /reels)
- `components/` — React components (Header, Footer, Hero, ReelCard, etc.)
- `lib/data.ts` — All sample data (menu items, reels, events, gallery, contact info)
- `lib/types.ts` — TypeScript types
- `components/Icon.tsx` — SVG icon system (inline, no dependency)

## Design System
- Background: deep navy (#0a1219 / #031C2C / #05263A / #07354A)
- Accent: soft cyan (#63bac6)
- Full RTL Persian layout
- Vazirmatn font throughout
- Rounded corners (16-24px) on all cards and containers
- Outer frame: max-width 1400px with thin cyan border, rounded

## Notes
- All UI content is in Persian (Farsi), RTL
- No external credentials needed — purely static site
- Images use Unsplash URLs
- The `next.config.js` sets `allowedDevOrigins` from `BASE44_PUBLIC_HOST_SUFFIX` for preview support
