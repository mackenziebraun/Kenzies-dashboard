# Kenzie's Dashboard

A cozy, personal wellness/planning dashboard, rebuilt from your mockup as a
Vite + React + Tailwind app.

## Running it

This was written in a sandbox with no npm registry access, so it's never
actually been `npm install`ed or built — do that first on your machine:

```
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

I did check every file carefully before handing it off: every JS/JSX file
passed an esbuild syntax check, the whole import graph resolves cleanly
(no broken paths, no missing exports), and I server-rendered every view
(dashboard + all 5 secondary views) with React to confirm they mount
without runtime errors. What I *couldn't* verify here is Tailwind actually
compiling your exact class list and a real browser paint — if anything
looks off on first run, it's most likely a Tailwind class typo, and those
are easy to spot/fix once you can see it rendered.

## What's here

- **State & persistence** — `src/context/AppDataContext.jsx` is the one
  place all app data lives (thoughts, reflections, the pile, the planner,
  calendar events). It persists to `localStorage` via
  `src/hooks/useLocalStorage.js`. When you're ready for a real backend,
  that hook is the thing to swap — the rest of the app only ever talks to
  `useAppData()`.
- **Routing** — there's no react-router; `src/App.jsx` is a tiny manual
  view switcher (dashboard + 5 secondary views: past thoughts, past
  reflections, the full pile, a date's planner, and the full calendar).
  Kept it dependency-free since the app is small; every view already takes
  its params as props, so swapping in react-router later is contained.
- **The recurring-vs-per-day planner model** — `src/data/recurringPlannerTemplate.js`
  holds the template (the morning list, the coping-skill item). Editing a
  single day never touches that file; `plannerOverrides` in the context
  (also localStorage-backed) tracks per-day hidden items, one-off custom
  items, completions, and which Pile tasks were pulled in as that day's
  15-minute task. `getPlannerDay(dateKey)` merges the two into what each
  view actually renders.
- **The Pile → Planner link** — choosing a Pile task for a day's plan
  never removes it from the Pile; it just adds that task's id to that
  day's `middayPileItemIds`. The Pile stays the ongoing collection.
- **Affirmations** — `src/data/affirmations.js` is a hardcoded list today.
  `getAffirmationForSlot(slot, date)` is the one function every widget
  calls, and its docstring shows the async version to drop in once you
  have a real source — nothing else needs to change.
- **Streak** — currently a placeholder heuristic (consecutive days with a
  saved morning reflection). Easy to find and change in
  `AppDataContext.jsx` once you've decided what "showing up" should mean.

## Decorative assets — the discussion you asked for

Short version: **PNG with a transparent background** for the raccoon and
florals (they read as painted/textured, not flat vector — SVG buys you
nothing there and just adds conversion work), **SVG** for anything that
*is* flat line art. Both are supported by the same system.

How it's wired:

- `src/assets/decorative/` is the folder your real files go in (see the
  README inside it for export/sizing notes).
- `src/data/decorativeAssets.js` is the one file that maps a short key
  (`"raccoon"`, `"flower-purple"`) to either a placeholder component
  (what's there now) or an imported image. Swapping one in is a 2-line
  change, documented at the top of that file.
- `src/components/decorative/Decoration.jsx` is what every widget/layout
  actually renders — it looks up the key and doesn't care whether it
  resolved to a placeholder or a real image.
- `src/components/layout/DecorativeLayer.jsx` positions a cluster of them
  around the dashboard grid (absolutely positioned, `pointer-events-none`,
  `aria-hidden`) rather than inside any card — so they can never block a
  click or get announced by a screen reader, and several are hidden below
  `md`/`lg` so small screens don't feel cluttered.

Reusability/responsiveness comes for free from that structure: any widget
can drop in `<Decoration asset="sprig" className="..." />` with its own
Tailwind position/size classes, and there's exactly one file to touch when
you're ready to bring in your real art.

## Honest gaps (placeholder-level for now, by design)

- Editing the recurring template itself (vs. a single day) has no UI yet
  — `setRecurringTemplate` exists in the context, ready for a settings
  view.
- The 15-minute task has no timer yet (you mentioned this is intentional
  — data relationship first).
- No backend/API/sync — everything is local to one browser via
  `localStorage`.
