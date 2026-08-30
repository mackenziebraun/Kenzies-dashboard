import ViewHeader from '../components/layout/ViewHeader.jsx'
import Card from '../components/shared/Card.jsx'
import { useAppData } from '../context/AppDataContext.jsx'
import { dateKey, formatFullDate, formatTime } from '../utils/date.js'

export default function ThoughtsHistoryView({ onBack }) {
  const { thoughts } = useAppData()

  const groups = groupByDate(thoughts)

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <ViewHeader title="What's been on your mind" subtitle="Every quick thought you've jotted down, by date." onBack={onBack} />

      {groups.length === 0 && (
        <Card tone="sage" className="text-ink-muted">
          Nothing saved yet — thoughts you jot down from the dashboard will show up here.
        </Card>
      )}

      <div className="space-y-5">
        {groups.map(([day, items]) => (
          <div key={day}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted mb-2">
              {formatFullDate(new Date(items[0].createdAt))}
            </h3>
            <Card tone="sage" className="p-0 overflow-hidden">
              <ul className="divide-y divide-ink/5">
                {items.map((t) => (
                  <li key={t.id} className="flex items-start justify-between gap-4 px-4 py-3">
                    <span className="text-sm text-ink">{t.text}</span>
                    <span className="shrink-0 text-xs text-ink-muted">{formatTime(new Date(t.createdAt))}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

function groupByDate(thoughts) {
  const map = new Map()
  for (const t of thoughts) {
    const key = dateKey(new Date(t.createdAt))
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(t)
  }
  return [...map.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1))
}
