// Default starter set — seeds the very first load of the dashboard. Every
// line here is fully editable and removable from the "Manage affirmations"
// screen (reached via the pencil icon on the Affirmation card), and new,
// personal ones can be added there at any time. This file only supplies
// the initial seed; the live, user-owned list lives in localStorage via
// AppDataContext.jsx (see the `affirmations` state and its CRUD actions).
//
// --- Swapping this for a real API later ---
// If a live source (an API, a database) is wanted *in addition to* a
// personal list, the cleanest spot is `getAffirmationForSlot` in
// AppDataContext.jsx — make it async (fetch, then fall back to
// `pickAffirmation` below on failure) and wrap the one call site in
// AffirmationCard.jsx with a small useEffect + useState. Nothing else
// needs to change, since nothing else imports this file directly.

export const DEFAULT_AFFIRMATIONS = [
  { id: 'aff-seed-1', text: 'Small steps still count.' },
  { id: 'aff-seed-2', text: 'I am allowed to take things one step at a time.' },
  { id: 'aff-seed-3', text: 'Rest is productive too.' },
  { id: 'aff-seed-4', text: 'You do not have to earn your worth today.' },
  { id: 'aff-seed-5', text: 'Progress, not perfection.' },
  { id: 'aff-seed-6', text: 'It is okay to leave things undone.' },
  { id: 'aff-seed-7', text: 'You showed up. That is enough.' },
  { id: 'aff-seed-8', text: 'One tiny step forward is still forward.' },
  { id: 'aff-seed-9', text: 'Be as kind to yourself as you would be to a friend.' },
  { id: 'aff-seed-10', text: 'You are not behind. You are exactly on time for your own life.' },
]

/**
 * Deterministic "pick" so the same slot shows the same line all day (no
 * flicker on re-render), but different slots diverge. Operates on
 * whatever list is passed in — normally the user's own, editable list —
 * so it stays correct as items are added/edited/removed.
 */
export function pickAffirmation(list, slot, date = new Date()) {
  if (!list || list.length === 0) return null
  const dayNumber = Math.floor(date.getTime() / (1000 * 60 * 60 * 24))
  const slotOffset = hashString(slot)
  const index = (dayNumber + slotOffset) % list.length
  return list[index]
}

function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0
  }
  return hash
}
