import ViewHeader from '../components/layout/ViewHeader.jsx'
import Card from '../components/shared/Card.jsx'
import { SunIcon, MoonIcon } from '../components/shared/Icons.jsx'
import { useAppData } from '../context/AppDataContext.jsx'
import { formatFullDate } from '../utils/date.js'

export default function ReflectionsHistoryView({ onBack }) {
  const { reflections } = useAppData()

  const days = Object.entries(reflections)
    .filter(([, r]) => r.morning || r.evening)
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <ViewHeader title="Past reflections" subtitle="How you wanted to show up, and how you actually did." onBack={onBack} />

      {days.length === 0 && (
        <Card tone="lavender" className="text-ink-muted">
          No reflections saved yet.
        </Card>
      )}

      <div className="space-y-4">
        {days.map(([key, r]) => (
          <Card key={key} tone="lavender">
            <h3 className="font-hand font-medium text-lg text-ink">{formatFullDate(parseDateKey(key))}</h3>
            {r.morning && (
              <p className="mt-2 flex gap-2 text-sm text-ink">
                <SunIcon className="h-4 w-4 shrink-0 mt-0.5 text-lavender-text" />
                <span>{r.morning.text}</span>
              </p>
            )}
            {r.evening && (
              <p className="mt-2 flex gap-2 text-sm text-ink">
                <MoonIcon className="h-4 w-4 shrink-0 mt-0.5 text-lavender-text" />
                <span>{r.evening.text}</span>
              </p>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

function parseDateKey(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}
