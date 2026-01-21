# Kalrav Fest Website – React Architecture Guide

Framework: React + Vite + TypeScript
Styling: TailwindCSS + Framer Motion
3D: React Three Fiber
Backend: Supabase (Postgres + Storage + Edge Functions)
Goal: Production-grade, scalable, modular.

Rules:
- Use functional React components with TypeScript.
- Components are reusable, pure, and no side effects.
- Separate UI (components) from logic (hooks/lib).
- Use Context only for global state (auth, theme, tickets).
- Use lazy loading and dynamic imports for heavy modules (3D, video).
- Keep components under 200 lines; extract logic into hooks.
- Prefer composition over prop drilling.
- Centralize constants and environment variables.
