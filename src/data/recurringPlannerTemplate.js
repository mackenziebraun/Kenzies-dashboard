// Default recurring structure for the Daily Planner. This is the
// "template" — editing it changes every future day. An individual day can
// diverge from the template (skip an item, add a one-off item) without
// touching this file; see plannerOverrides in AppDataContext.

export const DEFAULT_RECURRING_TEMPLATE = {
  morning: [
    { id: 'tpl-wake-up', label: 'Wake up' },
    { id: 'tpl-drink-water', label: 'Drink water' },
    { id: 'tpl-get-dressed', label: 'Get dressed' },
    { id: 'tpl-movement', label: 'Rowing machine OR go outside for 5 minutes' },
    { id: 'tpl-breakfast', label: 'Make coffee and breakfast' },
    { id: 'tpl-shower', label: 'Shower?' },
  ],
  // "All day" recurring items — not tied to a time of day.
  allDay: [
    { id: 'tpl-coping-skill', label: 'Use at least one coping skill' },
  ],
  // Midday and evening are structural, not simple labels:
  //  - midday is always "work on a task from The Pile for 15 minutes"
  //  - evening is always linked to that day's evening reflection
  // so they're generated in AppDataContext rather than listed here.
}
