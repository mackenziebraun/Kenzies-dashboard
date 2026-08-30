import { useMemo, useState } from 'react'
import Card from '../shared/Card.jsx'
import { ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from '../shared/Icons.jsx'
import { useAppData } from '../../context/AppDataContext.jsx'
import { addMonths, dateKey, isSameMonth, isToday, monthGrid, monthLabel, weekdayLabels } from '../../utils/date.js'

/**
 * Mini month view. This card is strictly about *events/appointments* (see
 * the project brief) — it never shows Daily Planner or Pile items. Dots
 * mark days with at least one event; "View this day" hands the selected
 * date off to the full Calendar view.
 */
export default function CalendarCard({ onViewDay }) {
  const { events } = useAppData()
  const [cursor, setCursor] = useState(() => new Date())
  const [selected, setSelected] = useState(() => new Date())

  const weeks = useMemo(() => monthGrid(cursor), [cursor])

  const eventCountByDay = useMemo(() => {
    const map = {}
    for (const ev of events) map[ev.dateKey] = (map[ev.dateKey] || 0) + 1
    return map
  }, [events])

  return (
    <Card tone="cream">
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => setCursor((c) => addMonths(c, -1))}
          className="grid h-8 w-8 place-items-center rounded-full border border-tan-deep/30 text-tan-text hover:bg-tan-deep/10"
        >
          <ChevronLeftIcon />
        </button>
        <h3 className="font-hand font-medium text-xl text-ink">{monthLabel(cursor)}</h3>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setCursor((c) => addMonths(c, 1))}
          className="grid h-8 w-8 place-items-center rounded-full border border-tan-deep/30 text-tan-text hover:bg-tan-deep/10"
        >
          <ChevronRightIcon />
        </button>
      </div>

      <table className="mt-3 w-full text-center text-base select-none font-hand">
        <thead>
          <tr className="text-ink-muted">
            {weekdayLabels().map((d, i) => (
              <th key={i} className="pb-1.5 font-medium">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((day) => {
                const key = dateKey(day)
                const inMonth = isSameMonth(day, cursor)
                const count = eventCountByDay[key] || 0
                const isSelected = dateKey(selected) === key
                return (
                  <td key={key} className="py-1">
                    <button
                      type="button"
                      onClick={() => setSelected(day)}
                      className={[
                        'relative mx-auto grid h-9 w-9 place-items-center rounded-full transition-colors',
                        'font-medium',
                        !inMonth && 'text-ink-muted/40',
                        inMonth && !isToday(day) && !isSelected && 'text-ink hover:bg-tan-deep/10',
                        isToday(day) && !isSelected && 'bg-sage-deep text-cream font-semibold',
                        isSelected && 'bg-tan-deep text-cream font-semibold',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {day.getDate()}
                      {count > 0 && (
                        <span className="absolute -bottom-0.5 left-1/2 flex -translate-x-1/2 gap-0.5">
                          {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
                            <span
                              key={i}
                              className={`h-1 w-1 rounded-full ${
                                isToday(day) || isSelected ? 'bg-cream' : 'bg-accent'
                              }`}
                            />
                          ))}
                        </span>
                      )}
                    </button>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        onClick={() => onViewDay(selected)}
        className="mt-3 inline-flex items-center gap-2 rounded-full bg-tan-deep px-4 py-2 text-sm font-semibold text-cream shadow-softer hover:opacity-90"
      >
        View this day <ArrowRightIcon />
      </button>
    </Card>
  )
}
