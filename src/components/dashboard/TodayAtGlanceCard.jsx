import Card, { CardTitle } from '../shared/Card.jsx'
import { HeartIcon } from '../shared/Icons.jsx'
import { useAppData } from '../../context/AppDataContext.jsx'
import { combineDateAndTime, formatTime, todayKey } from '../../utils/date.js'

/**
 * Today's *appointments/events* only — deliberately not a re-listing of
 * the Day Planner's tasks (see the project brief: these are two separate
 * systems by design). The "real" affirmation widget lives as its own
 * AffirmationCard elsewhere on the dashboard; this card keeps a small
 * static sign-off line, matching the mockup, without double-counting as
 * one of it.
 */
export default function TodayAtGlanceCard() {
  const { getEventsForDay } = useAppData()
  const key = todayKey()
  const todaysEvents = getEventsForDay(key)

  return (
    <Card tone="tan">
      <CardTitle className="text-tan-text">Today at a Glance</CardTitle>

      <ul className="mt-3 space-y-2">
        {todaysEvents.length === 0 && (
          <li className="rounded-xl bg-white/60 px-3.5 py-2.5 text-sm text-ink-muted italic">
            Nothing on the calendar today.
          </li>
        )}
        {todaysEvents.map((ev) => (
          <li
            key={ev.id}
            className="flex items-center justify-between gap-3 rounded-xl bg-white/60 px-3.5 py-2.5"
          >
            <span className="min-w-0 truncate text-sm font-medium text-ink">{ev.title}</span>
            <span className="shrink-0 text-xs font-semibold text-tan-deep">
              {formatTime(combineDateAndTime(key, ev.time))}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 flex items-center gap-1.5 text-sm font-medium text-tan-text">
        You&apos;ve got this. <HeartIcon className="h-3.5 w-3.5" />
      </p>
    </Card>
  )
}
