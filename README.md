# Shinobi Coder Portfolio

Recovered from the live site (https://portfolio-shinobi-coder.vercel.app/) and rebuilt as a
modular **Vite + React** project.

## Stack

React 18 · Vite 6 · React Router 6 · Tailwind CSS (compiled, see notes) · framer-motion ·
lucide-react · react-icons · Supabase (Messages app) · canvas-confetti · Vercel Analytics

## Getting started

```bash
npm install
cp .env.example .env     # then fill in your Supabase values (see below)
npm run dev              # http://localhost:5173
npm run build            # production build in dist/
npm run preview
```

### Environment variables

| Variable | Used by |
| --- | --- |
| `VITE_SUPABASE_URL` | Messages app in the phone simulator |
| `VITE_SUPABASE_ANON_KEY` | Messages app in the phone simulator |

Without them the site still works; only the Messages app cannot load/send messages.
On Vercel add both under **Project → Settings → Environment Variables**.

> The values that were found in the public bundle have been placed in a local, git-ignored
> `.env`. They are Supabase *anon* keys (meant to be public and protected by Row Level Security),
> but you should still check your RLS policies, and rotate the key if you are unsure.

## Project structure

```
src/
├── main.jsx                  entry point
├── App.jsx                   providers, router, global overlays
├── pages/                    route components (Home, AllProjects)
├── components/
│   ├── layout/               Header, DockNavigation, Footer, NavLink
│   ├── sections/             Hero, About, Skills, Experience, Projects, Contact
│   ├── ui/                   ThemeToggle, LanguageToggle, Dock, CustomCursor, PageLoader, ...
│   ├── chat/                 AI assistant widget
│   ├── search/               Ctrl+K command palette
│   ├── phone/                iOS-style phone simulator (apps/, widgets/, lock screen, ...)
│   └── icons/                brand logos kept as exact copies
├── context/                  LanguageContext (EN / JA)
├── hooks/                    useTheme, useActiveSection
├── data/                     translations (en, ja), projects, experience, tech stack, phone data
├── lib/                      cn(), supabase client, moderation list, tech icon lookup
├── assets/phone/             icons imported by the phone simulator
└── styles/                   index.css (compiled Tailwind), runtime.css
public/                       images, sound, favicons, manifest (served as-is)
```

## Notes about the recovery

- The original source was no longer available, so this code was **reconstructed from the
  deployed production build**: components, hooks, data and imports were split into files and
  JSX was regenerated. Behaviour was checked by rendering the original bundle and this project
  in the same simulated browser and comparing the HTML of every component, in both languages
  (36 of 40 components byte-identical; the other 4 differ only in image URLs).
- Component and variable names were chosen during the recovery; some may differ from the
  names you originally used.
- `src/styles/index.css` is the **compiled** Tailwind v3 output of the original build. It
  contains every class the site uses, so the look is identical. If you want live Tailwind
  again, add `tailwindcss`, a `tailwind.config.js` with `content: ["./index.html", "./src/**/*.{js,jsx}"]`
  and move the custom (non-utility) rules out of that file.
- The AI chat widget and the contact form call two separate backends
  (`portfolio-chat-assist.vercel.app` and `portfolio-ss-api.vercel.app`). Those are not part of
  this repository and were not recoverable from the website.
- `weather.png`, `vite.svg` and `robots.txt` were referenced but do not exist on the server.

## Deploy

Push to GitHub and import the repo in Vercel (framework preset: **Vite**). `vercel.json`
rewrites every route to `index.html` so `/all-projects` works on refresh.
