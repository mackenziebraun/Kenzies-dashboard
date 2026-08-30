import { useMemo, useState } from 'react'
import ViewHeader from '../components/layout/ViewHeader.jsx'
import Card, { CardTitle } from '../components/shared/Card.jsx'
import Checkbox from '../components/shared/Checkbox.jsx'
import OverflowMenu from '../components/shared/OverflowMenu.jsx'
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, MoonIcon } from '../components/shared/Icons.jsx'
import { useAppData } from '../context/AppDataContext.jsx'
import { dateKey, formatFullDate } from '../utils/date.js'

export default function PlannerDayView({ initialDate, onBack }) {
  const {
    getPlannerDay,
    toggleItemCompleted,
    removeTemplateItemForDay,
    restoreTemplateItemForDay,
    addCustomPlannerItem,
    removeCustomPlannerItem,
    addPileItemToPlannerDay,
    removePileItemFromPlannerDay,
    recurringTemplate,
    pile,
    reflections,
    saveEveningReflection,
  } = useAppData()

  const [date, setDate] = useState(initialDate || new Date())
  const key = dateKey(date)
  const plan = getPlannerDay(key)

  const removedTemplateIds = useMemo(() => {
    // Recompute which recurring items are hidden for this day, for the
    // "hidden today" list — getPlannerDay only returns the visible ones.
    const visibleIds = new Set(plan.morning.filter((i) => i.source === 'recurring').map((i) => i.id))
    return recurringTemplate.morning.filter((tpl) => !visibleIds.has(tpl.id))
  }, [plan, recurringTemplate])

  const availablePileItems = pile.filter(
    (p) => !p.completed && !plan.midday.some((m) => m.pileItemId === p.id),
  )

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <ViewHeader title="Daily Planner" onBack={onBack} />

      <div className="mb-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setDate((d) => shiftDay(d, -1))}
          className="grid h-8 w-8 place-items-center rounded-full border border-ink/15 hover:bg-ink/5"
          aria-label="Previous day"
        >
          <ChevronLeftIcon />
        </button>
        <h3 className="font-hand font-medium text-xl text-ink w-48 text-center">{formatFullDate(date)}</h3>
        <button
          type="button"
          onClick={() => setDate((d) => shiftDay(d, 1))}
          className="grid h-8 w-8 place-items-center rounded-full border border-ink/15 hover:bg-ink/5"
          aria-label="Next day"
        >
          <ChevronRightIcon />
        </button>
      </div>

      <PlannerSection
        title="Morning"
        tone="sage"
        items={plan.morning}
        onToggle={(id) => toggleItemCompleted(key, id)}
        onRemoveCustom={(id) => removeCustomPlannerItem(key, id)}
        onHideRecurring={(id) => removeTemplateItemForDay(key, id)}
        onAddCustom={(label) => addCustomPlannerItem(key, 'morning', label)}
      />

      {removedTemplateIds.length > 0 && (
        <p className="mb-6 -mt-3 text-xs text-ink-muted">
          Hidden today:{' '}
          {removedTemplateIds.map((tpl, i) => (
            <span key={tpl.id}>
              {i > 0 && ', '}
              <button
                type="button"
                onClick={() => restoreTemplateItemForDay(key, tpl.id)}
                className="underline decoration-dotted underline-offset-2 hover:text-ink"
              >
                {tpl.label}
              </button>
            </span>
          ))}
        </p>
      )}

      <Card tone="sage" className="mb-6">
        <CardTitle className="text-sage-text">Midday · 15-minute task</CardTitle>
        <p className="text-xs text-ink-muted mt-0.5 mb-3">
          Pulled from The Pile. The goal is just to work on it for 15 minutes — it doesn't need to be finished.
        </p>
        <ul className="space-y-2">
          {plan.midday.map((item) => (
            <li key={item.id} className="flex items-center gap-3 rounded-xl bg-cream-soft/70 px-3.5 py-2.5">
              <Checkbox tone="sage" checked={item.completed} onChange={() => toggleItemCompleted(key, item.id)} label={item.label} />
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{item.label}</span>
              <OverflowMenu
                actions={[
                  {
                    label: 'Remove from this day',
                    danger: true,
                    onSelect: () =>
                      item.source === 'pile'
                        ? removePileItemFromPlannerDay(key, item.pileItemId)
                        : removeCustomPlannerItem(key, item.id),
                  },
                ]}
              />
            </li>
          ))}
          {plan.midday.length === 0 && (
            <li className="text-sm text-ink-muted italic px-1">Nothing chosen for today yet.</li>
          )}
        </ul>
        {availablePileItems.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted mb-1.5">Choose from The Pile</p>
            <div className="flex flex-wrap gap-1.5">
              {availablePileItems.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => addPileItemToPlannerDay(key, p.id)}
                  className="rounded-full border border-sage-deep/30 bg-cream-soft px-3 py-1 text-xs text-ink hover:bg-sage-deep/10"
                >
                  + {p.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </Card>

      <PlannerSection
        title="All Day"
        tone="sage"
        items={plan.allDay}
        onToggle={(id) => toggleItemCompleted(key, id)}
        onRemoveCustom={(id) => removeCustomPlannerItem(key, id)}
        onHideRecurring={(id) => removeTemplateItemForDay(key, id)}
        onAddCustom={(label) => addCustomPlannerItem(key, 'allDay', label)}
      />

      <EveningSection dateKey={key} reflection={reflections[key]?.evening} onSave={saveEveningReflection} />
    </div>
  )
}

function PlannerSection({ title, tone, items, onToggle, onRemoveCustom, onHideRecurring, onAddCustom }) {
  const [draft, setDraft] = useState('')
  return (
    <Card tone={tone} className="mb-6">
      <CardTitle className="text-sage-text">{title}</CardTitle>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3 rounded-xl bg-cream-soft/70 px-3.5 py-2.5">
            <Checkbox tone={tone} checked={item.completed} onChange={() => onToggle(item.id)} label={item.label} />
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{item.label}</span>
            <OverflowMenu
              actions={[
                item.source === 'recurring'
                  ? { label: 'Hide just for today', onSelect: () => onHideRecurring(item.id) }
                  : { label: 'Remove', danger: true, onSelect: () => onRemoveCustom(item.id) },
              ]}
            />
          </li>
        ))}
      </ul>
      <form
        className="mt-3 flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          if (!draft.trim()) return
          onAddCustom(draft)
          setDraft('')
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Add a one-off ${title.toLowerCase()} item`}
          className="min-w-0 flex-1 rounded-full border border-sage-deep/25 bg-cream-soft px-3.5 py-1.5 text-sm outline-none"
        />
        <button
          type="submit"
          aria-label="Add item"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage-deep text-cream hover:opacity-90"
        >
          <PlusIcon />
        </button>
      </form>
    </Card>
  )
}

function EveningSection({ dateKey: key, reflection, onSave }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(reflection?.text || '')

  return (
    <Card tone="lavender">
      <div className="flex items-center gap-2 text-lavender-text">
        <MoonIcon className="h-5 w-5" />
        <CardTitle className="text-lavender-text">Evening Reflection</CardTitle>
      </div>
      <p className="text-xs text-ink-muted mt-0.5 mb-3">
        Name 3 ways you showed up for yourself today. They can be tiny.
      </p>
      {editing ? (
        <>
          <textarea
            autoFocus
            rows={3}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full resize-none rounded-xl border border-lavender-deep/30 bg-cream-soft/70 p-3 text-sm text-ink outline-none"
          />
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => {
                if (draft.trim()) onSave(key, draft.trim())
                setEditing(false)
              }}
              className="rounded-full bg-lavender-deep px-4 py-1.5 text-sm font-semibold text-cream hover:opacity-90"
            >
              Save
            </button>
            <button type="button" onClick={() => setEditing(false)} className="rounded-full px-4 py-1.5 text-sm text-lavender-text hover:bg-lavender-deep/10">
              Cancel
            </button>
          </div>
        </>
      ) : reflection ? (
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-ink">{reflection.text}</p>
          <button type="button" onClick={() => setEditing(true)} className="shrink-0 text-xs text-lavender-text underline decoration-dotted underline-offset-2">
            edit
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="rounded-full bg-lavender-deep px-4 py-2 text-sm font-semibold text-cream hover:opacity-90"
        >
          Write tonight's reflection
        </button>
      )}
    </Card>
  )
}

function shiftDay(date, delta) {
  const next = new Date(date)
  next.setDate(next.getDate() + delta)
  return next
}
