import Card, { CardTitle, CardSubtitle } from '../shared/Card.jsx'
import Checkbox from '../shared/Checkbox.jsx'
import { BookIcon, SunIcon, ClockIcon, LeafIcon, MoonIcon, ArrowRightIcon } from '../shared/Icons.jsx'
import { useAppData } from '../../context/AppDataContext.jsx'
import { todayKey } from '../../utils/date.js'

/**
 * Dashboard-level summary of today's plan. Morning is a multi-item
 * recurring block so it's shown as progress (fully editable in the Day
 * Planner detail view); the single-item sections (15-minute task, coping
 * skill) get a quick-toggle checkbox right here. Evening reflection is
 * read-only here — it's driven by the Daily Reflection widget/system.
 */
export default function DayPlannerCard({ onOpenPlanner }) {
  const { getPlannerDay, toggleItemCompleted } = useAppData()
  const key = todayKey()
  const plan = getPlannerDay(key)

  const morningDone = plan.morning.filter((i) => i.completed).length
  const middayItem = plan.midday[0]
  const copingItem = plan.allDay[0]
  const eveningItem = plan.evening[0]

  return (
    <Card tone="sage">
      <div className="flex items-center gap-2 text-sage-text">
        <BookIcon className="h-6 w-6" />
        <CardTitle className="text-sage-text">Day Planner</CardTitle>
      </div>
      <CardSubtitle className="text-sage-text/80">plan your day, your way</CardSubtitle>

      <ul className="mt-4 space-y-2">
        <li className="flex items-center gap-3 rounded-xl bg-cream-soft/70 px-3.5 py-2.5">
          <SunIcon className="h-4 w-4 text-sage-text/70 shrink-0" />
          <span className="min-w-0 flex-1 truncate text-sm text-ink">Morning routine</span>
          <span className="text-xs font-semibold text-sage-text shrink-0">
            {morningDone}/{plan.morning.length}
          </span>
        </li>

        <li className="flex items-center gap-3 rounded-xl bg-cream-soft/70 px-3.5 py-2.5">
          <ClockIcon className="h-4 w-4 text-sage-text/70 shrink-0" />
          {middayItem ? (
            <>
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{middayItem.label}</span>
              <Checkbox
                tone="sage"
                checked={middayItem.completed}
                onChange={() => toggleItemCompleted(key, middayItem.id)}
                label="Toggle 15-minute task"
              />
            </>
          ) : (
            <span className="min-w-0 flex-1 truncate text-sm text-ink-muted italic">
              no 15-minute task chosen yet
            </span>
          )}
        </li>

        <li className="flex items-center gap-3 rounded-xl bg-cream-soft/70 px-3.5 py-2.5">
          <LeafIcon className="h-4 w-4 text-sage-text/70 shrink-0" />
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{copingItem?.label}</span>
          {copingItem && (
            <Checkbox
              tone="sage"
              checked={copingItem.completed}
              onChange={() => toggleItemCompleted(key, copingItem.id)}
              label="Toggle coping skill"
            />
          )}
        </li>

        <li className="flex items-center gap-3 rounded-xl bg-cream-soft/70 px-3.5 py-2.5">
          <MoonIcon className="h-4 w-4 text-sage-text/70 shrink-0" />
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{eveningItem?.label}</span>
          <Checkbox tone="sage" checked={eveningItem?.completed} onChange={() => {}} label="Evening reflection status" />
        </li>
      </ul>

      <button
        type="button"
        onClick={onOpenPlanner}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-sage-deep px-4 py-2 text-sm font-semibold text-cream shadow-softer hover:opacity-90"
      >
        Open day planner <ArrowRightIcon />
      </button>
    </Card>
  )
}
