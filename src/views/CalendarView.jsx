import { useMemo, useState } from 'react'
import ViewHeader from '../components/layout/ViewHeader.jsx'
import Card, { CardTitle } from '../components/shared/Card.jsx'
import OverflowMenu from '../components/shared/OverflowMenu.jsx'
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '../components/shared/Icons.jsx'
import { useAppData } from '../context/AppDataContext.jsx'
import {
  addMonths,
  combineDateAndTime,
  dateKey,
  formatFullDate,
  formatTime,
  isSameMonth,
  isToday,
  monthGrid,
  monthLabel,
  weekdayLabels,
} from '../utils/date.js'

export default function CalendarView({ initialDate, onBack }) {
  const { events, addEvent, updateEvent, deleteEvent, getEventsForDay } = useAppData()
  const [cursor, setCursor] = useState(() => initialDate || new Date())
  const [selected, setSelected] = useState(() => initialDate || new Date())

  const weeks = useMemo(() => monthGrid(cursor), [cursor])
  const eventCountByDay = useMemo(() => {
    const map = {}
    for (const ev of events) map[ev.dateKey] = (map[ev.dateKey] || 0) + 1
    return map
  }, [events])

  const key = dateKey(selected)
  const dayEvents = getEventsForDay(key)

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <ViewHeader title="Calendar" subtitle="Appointments and events — not tasks." onBack={onBack} />

      <Card tone="cream" className="mb-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCursor((c) => addMonths(c, -1))}
            className="grid h-8 w-8 place-items-center rounded-full border border-tan-deep/30 hover:bg-tan-deep/10"
            aria-label="Previous month"
          >
            <ChevronLeftIcon />
          </button>
          <h3 className="font-hand font-medium text-xl text-ink">
            {monthLabel(cursor)} {cursor.getFullYear()}
          </h3>
          <button
            type="button"
            onClick={() => setCursor((c) => addMonths(c, 1))}
            className="grid h-8 w-8 place-items-center rounded-full border border-tan-deep/30 hover:bg-tan-deep/10"
            aria-label="Next month"
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
                  const dKey = dateKey(day)
                  const inMonth = isSameMonth(day, cursor)
                  const count = eventCountByDay[dKey] || 0
                  const isSelected = dKey === key
                  return (
                    <td key={dKey} className="py-1">
                      <button
                        type="button"
                        onClick={() => setSelected(day)}
                        className={[
                          'relative mx-auto grid h-10 w-10 place-items-center rounded-full transition-colors font-medium',
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
                                className={`h-1 w-1 rounded-full ${isToday(day) || isSelected ? 'bg-cream' : 'bg-accent'}`}
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
      </Card>

      <Card tone="sage">
        <CardTitle className="text-sage-text">{formatFullDate(selected)}</CardTitle>
        <ul className="mt-3 space-y-2">
          {dayEvents.map((ev) => (
            <EventRow key={ev.id} event={ev} dateKeyStr={key} onUpdate={updateEvent} onDelete={deleteEvent} />
          ))}
          {dayEvents.length === 0 && <li className="text-sm text-ink-muted italic px-1">No events this day.</li>}
        </ul>
        <NewEventForm dateKeyStr={key} onAdd={addEvent} />
      </Card>
    </div>
  )
}

function EventRow({ event, dateKeyStr, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(event.title)
  const [time, setTime] = useState(event.time)

  if (editing) {
    return (
      <li className="rounded-xl bg-cream-soft/70 px-3.5 py-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-sage-deep/30 bg-cream-soft px-2 py-1 text-sm outline-none"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="rounded-lg border border-sage-deep/30 bg-cream-soft px-2 py-1 text-sm outline-none"
          />
          <button
            type="button"
            onClick={() => {
              onUpdate(event.id, { title: title.trim() || event.title, time })
              setEditing(false)
            }}
            className="rounded-full bg-sage-deep px-3 py-1 text-xs font-semibold text-cream hover:opacity-90"
          >
            Save
          </button>
          <button type="button" onClick={() => setEditing(false)} className="text-xs text-ink-muted hover:text-ink">
            Cancel
          </button>
        </div>
      </li>
    )
  }

  return (
    <li className="flex items-center justify-between gap-3 rounded-xl bg-cream-soft/70 px-3.5 py-2.5">
      <span className="min-w-0 truncate text-sm font-medium text-ink">{event.title}</span>
      <span className="shrink-0 text-xs font-semibold text-sage-text">
        {formatTime(combineDateAndTime(dateKeyStr, event.time))}
      </span>
      <OverflowMenu
        actions={[
          { label: 'Edit', onSelect: () => setEditing(true) },
          { label: 'Delete', danger: true, onSelect: () => onDelete(event.id) },
        ]}
      />
    </li>
  )
}

function NewEventForm({ dateKeyStr, onAdd }) {
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('09:00')

  return (
    <form
      className="mt-3 flex flex-wrap items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        if (!title.trim()) return
        onAdd({ dateKey: dateKeyStr, title: title.trim(), time })
        setTitle('')
      }}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add an event"
        className="min-w-0 flex-1 rounded-full border border-sage-deep/25 bg-cream-soft px-3.5 py-1.5 text-sm outline-none"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="rounded-full border border-sage-deep/25 bg-cream-soft px-3 py-1.5 text-sm outline-none"
      />
      <button
        type="submit"
        aria-label="Add event"
        className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage-deep text-cream hover:opacity-90"
      >
        <PlusIcon />
      </button>
    </form>
  )
}
