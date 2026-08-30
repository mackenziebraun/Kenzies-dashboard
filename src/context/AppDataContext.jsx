import React, { createContext, useCallback, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { DEFAULT_RECURRING_TEMPLATE } from '../data/recurringPlannerTemplate.js'
import { DEFAULT_AFFIRMATIONS, pickAffirmation } from '../data/affirmations.js'
import { dateKey, todayKey } from '../utils/date.js'

const AppDataContext = createContext(null)

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

const emptyDayOverride = () => ({
  removedTemplateIds: [], // recurring items hidden just for this day
  completedIds: [], // ids (template ids, custom item ids, or "midday-<pileId>") marked done today
  customItems: [], // [{id, section, label}] one-off items added just for this day
  middayPileItemIds: [], // pile item ids chosen as today's 15-minute task(s)
})

export function AppDataProvider({ children }) {
  // ---- Thoughts ("what's on your mind") -----------------------------
  const [thoughts, setThoughts] = useLocalStorage('thoughts', [])

  const addThought = useCallback((text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setThoughts((prev) => [
      { id: makeId('thought'), text: trimmed, createdAt: new Date().toISOString() },
      ...prev,
    ])
  }, [setThoughts])

  // ---- Daily reflections (morning + evening) -------------------------
  // Shape: { [dateKey]: { morning: {text, savedAt}, evening: {text, savedAt} } }
  const [reflections, setReflections] = useLocalStorage('reflections', {})

  const saveMorningReflection = useCallback((key, text) => {
    setReflections((prev) => ({
      ...prev,
      [key]: { ...prev[key], morning: { text, savedAt: new Date().toISOString() } },
    }))
  }, [setReflections])

  const saveEveningReflection = useCallback((key, text) => {
    setReflections((prev) => ({
      ...prev,
      [key]: { ...prev[key], evening: { text, savedAt: new Date().toISOString() } },
    }))
  }, [setReflections])

  // ---- The Pile --------------------------------------------------------
  const [pile, setPile] = useLocalStorage('pile', [
    { id: 'pile-seed-1', text: 'clean my room', createdAt: new Date().toISOString(), completed: false },
    { id: 'pile-seed-2', text: 'email therapist', createdAt: new Date().toISOString(), completed: false },
    { id: 'pile-seed-3', text: 'organize photos', createdAt: new Date().toISOString(), completed: false },
  ])

  const addPileItem = useCallback((text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setPile((prev) => [
      { id: makeId('pile'), text: trimmed, createdAt: new Date().toISOString(), completed: false },
      ...prev,
    ])
  }, [setPile])

  const editPileItem = useCallback((id, text) => {
    setPile((prev) => prev.map((item) => (item.id === id ? { ...item, text } : item)))
  }, [setPile])

  const togglePileItemComplete = useCallback((id) => {
    setPile((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed, completedAt: !item.completed ? new Date().toISOString() : null }
          : item,
      ),
    )
  }, [setPile])

  const removePileItem = useCallback((id) => {
    setPile((prev) => prev.filter((item) => item.id !== id))
  }, [setPile])

  // ---- Affirmations — the user's own, fully editable list -------------
  // Seeded once from DEFAULT_AFFIRMATIONS; every line is then a normal
  // owned record (add/edit/remove), same shape as Pile items, so they can
  // write whatever actually speaks to them rather than being stuck with
  // whatever shipped with the app.
  const [affirmations, setAffirmations] = useLocalStorage('affirmations', DEFAULT_AFFIRMATIONS)

  const addAffirmation = useCallback((text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setAffirmations((prev) => [{ id: makeId('aff'), text: trimmed }, ...prev])
  }, [setAffirmations])

  const editAffirmation = useCallback((id, text) => {
    setAffirmations((prev) => prev.map((item) => (item.id === id ? { ...item, text } : item)))
  }, [setAffirmations])

  const removeAffirmation = useCallback((id) => {
    setAffirmations((prev) => prev.filter((item) => item.id !== id))
  }, [setAffirmations])

  /** Stable-per-day pick from the user's own list. See data/affirmations.js
   * for the picking logic and how to swap in a live API later. */
  const getAffirmationForSlot = useCallback(
    (slot) => pickAffirmation(affirmations, slot)?.text ?? null,
    [affirmations],
  )

  // ---- Daily Planner: recurring template + per-day overrides ---------
  const [recurringTemplate, setRecurringTemplate] = useLocalStorage(
    'recurringTemplate',
    DEFAULT_RECURRING_TEMPLATE,
  )
  const [plannerOverrides, setPlannerOverrides] = useLocalStorage('plannerOverrides', {})

  const getOverrideFor = useCallback(
    (key) => plannerOverrides[key] || emptyDayOverride(),
    [plannerOverrides],
  )

  const updateOverrideFor = useCallback((key, updater) => {
    setPlannerOverrides((prev) => ({
      ...prev,
      [key]: updater(prev[key] || emptyDayOverride()),
    }))
  }, [setPlannerOverrides])

  const toggleItemCompleted = useCallback((key, itemId) => {
    updateOverrideFor(key, (day) => ({
      ...day,
      completedIds: day.completedIds.includes(itemId)
        ? day.completedIds.filter((id) => id !== itemId)
        : [...day.completedIds, itemId],
    }))
  }, [updateOverrideFor])

  /** Hide a recurring template item for just this one day (template itself is untouched). */
  const removeTemplateItemForDay = useCallback((key, templateId) => {
    updateOverrideFor(key, (day) => ({
      ...day,
      removedTemplateIds: [...new Set([...day.removedTemplateIds, templateId])],
    }))
  }, [updateOverrideFor])

  const restoreTemplateItemForDay = useCallback((key, templateId) => {
    updateOverrideFor(key, (day) => ({
      ...day,
      removedTemplateIds: day.removedTemplateIds.filter((id) => id !== templateId),
    }))
  }, [updateOverrideFor])

  const addCustomPlannerItem = useCallback((key, section, label) => {
    const trimmed = label.trim()
    if (!trimmed) return
    updateOverrideFor(key, (day) => ({
      ...day,
      customItems: [...day.customItems, { id: makeId('custom'), section, label: trimmed }],
    }))
  }, [updateOverrideFor])

  const removeCustomPlannerItem = useCallback((key, itemId) => {
    updateOverrideFor(key, (day) => ({
      ...day,
      customItems: day.customItems.filter((item) => item.id !== itemId),
    }))
  }, [updateOverrideFor])

  /** Bring a Pile task into a day's Daily Planner as its 15-minute task.
   *  Does NOT remove the task from The Pile — the Pile is the ongoing
   *  collection, the Planner is just what's been chosen for that day. */
  const addPileItemToPlannerDay = useCallback((key, pileItemId) => {
    updateOverrideFor(key, (day) => ({
      ...day,
      middayPileItemIds: [...new Set([...day.middayPileItemIds, pileItemId])],
    }))
  }, [updateOverrideFor])

  const removePileItemFromPlannerDay = useCallback((key, pileItemId) => {
    updateOverrideFor(key, (day) => ({
      ...day,
      middayPileItemIds: day.middayPileItemIds.filter((id) => id !== pileItemId),
    }))
  }, [updateOverrideFor])

  /** Derives the full, renderable plan for a given day by merging the
   * recurring template with that day's overrides. This is the one place
   * that understands "recurring vs. per-day" — everything else just reads
   * the flat result. */
  const getPlannerDay = useCallback(
    (key) => {
      const day = getOverrideFor(key)

      const morning = recurringTemplate.morning
        .filter((tpl) => !day.removedTemplateIds.includes(tpl.id))
        .map((tpl) => ({
          id: tpl.id,
          label: tpl.label,
          section: 'morning',
          source: 'recurring',
          completed: day.completedIds.includes(tpl.id),
        }))
        .concat(
          day.customItems
            .filter((item) => item.section === 'morning')
            .map((item) => ({ ...item, source: 'custom', completed: day.completedIds.includes(item.id) })),
        )

      const midday = day.middayPileItemIds
        .map((pileItemId) => {
          const pileItem = pile.find((p) => p.id === pileItemId)
          if (!pileItem) return null
          const itemId = `midday-${pileItemId}`
          return {
            id: itemId,
            label: pileItem.text,
            section: 'midday',
            source: 'pile',
            pileItemId,
            completed: day.completedIds.includes(itemId),
          }
        })
        .filter(Boolean)
        .concat(
          day.customItems
            .filter((item) => item.section === 'midday')
            .map((item) => ({ ...item, source: 'custom', completed: day.completedIds.includes(item.id) })),
        )

      const allDay = recurringTemplate.allDay
        .filter((tpl) => !day.removedTemplateIds.includes(tpl.id))
        .map((tpl) => ({
          id: tpl.id,
          label: tpl.label,
          section: 'allDay',
          source: 'recurring',
          completed: day.completedIds.includes(tpl.id),
        }))
        .concat(
          day.customItems
            .filter((item) => item.section === 'allDay')
            .map((item) => ({ ...item, source: 'custom', completed: day.completedIds.includes(item.id) })),
        )

      const eveningReflectionDone = Boolean(reflections[key]?.evening)
      const evening = [
        {
          id: 'evening-reflection',
          label: 'Evening reflection',
          section: 'evening',
          source: 'reflection-link',
          completed: eveningReflectionDone,
        },
      ]

      return { dateKey: key, morning, midday, allDay, evening }
    },
    [recurringTemplate, pile, reflections, getOverrideFor],
  )

  // ---- Calendar events (appointments only — never planner/pile tasks) --
  const [events, setEvents] = useLocalStorage('events', [
    { id: 'event-seed-1', dateKey: todayKey(), time: '09:15', title: 'Therapy' },
  ])

  const addEvent = useCallback((event) => {
    setEvents((prev) => [...prev, { id: makeId('event'), ...event }])
  }, [setEvents])

  const updateEvent = useCallback((id, patch) => {
    setEvents((prev) => prev.map((ev) => (ev.id === id ? { ...ev, ...patch } : ev)))
  }, [setEvents])

  const deleteEvent = useCallback((id) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id))
  }, [setEvents])

  const getEventsForDay = useCallback(
    (key) =>
      events
        .filter((ev) => ev.dateKey === key)
        .sort((a, b) => (a.time || '').localeCompare(b.time || '')),
    [events],
  )

  // ---- Streak ------------------------------------------------------
  // Placeholder heuristic: consecutive days (ending today) with a saved
  // morning reflection. Swap for whatever definition of "showing up"
  // feels right once the reflection/planner systems are being used daily.
  const streak = useMemo(() => {
    let count = 0
    const cursor = new Date()
    // If today has no morning reflection yet, streak reflects days before today.
    if (!reflections[dateKey(cursor)]?.morning) {
      cursor.setDate(cursor.getDate() - 1)
    }
    while (reflections[dateKey(cursor)]?.morning) {
      count += 1
      cursor.setDate(cursor.getDate() - 1)
    }
    return count
  }, [reflections])

  const value = useMemo(
    () => ({
      thoughts,
      addThought,

      reflections,
      saveMorningReflection,
      saveEveningReflection,

      pile,
      addPileItem,
      editPileItem,
      togglePileItemComplete,
      removePileItem,

      affirmations,
      addAffirmation,
      editAffirmation,
      removeAffirmation,
      getAffirmationForSlot,

      recurringTemplate,
      setRecurringTemplate,
      getPlannerDay,
      toggleItemCompleted,
      removeTemplateItemForDay,
      restoreTemplateItemForDay,
      addCustomPlannerItem,
      removeCustomPlannerItem,
      addPileItemToPlannerDay,
      removePileItemFromPlannerDay,

      events,
      addEvent,
      updateEvent,
      deleteEvent,
      getEventsForDay,

      streak,
    }),
    [
      thoughts, addThought,
      reflections, saveMorningReflection, saveEveningReflection,
      pile, addPileItem, editPileItem, togglePileItemComplete, removePileItem,
      affirmations, addAffirmation, editAffirmation, removeAffirmation, getAffirmationForSlot,
      recurringTemplate, setRecurringTemplate, getPlannerDay, toggleItemCompleted,
      removeTemplateItemForDay, restoreTemplateItemForDay, addCustomPlannerItem,
      removeCustomPlannerItem, addPileItemToPlannerDay, removePileItemFromPlannerDay,
      events, addEvent, updateEvent, deleteEvent, getEventsForDay,
      streak,
    ],
  )

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used within an AppDataProvider')
  return ctx
}
