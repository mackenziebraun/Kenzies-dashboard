import { useState } from 'react'
import Card, { CardTitle, CardSubtitle } from '../shared/Card.jsx'
import { SunIcon, MoonIcon, SparkleIcon } from '../shared/Icons.jsx'
import { useAppData } from '../../context/AppDataContext.jsx'
import { todayKey } from '../../utils/date.js'

const MORNING_PROMPT = 'How do you want to show up today?'
const EVENING_PROMPT = 'Name 3 ways you showed up for yourself today. They can be tiny.'

/**
 * Morning and evening reflection are ONE widget (per the brief) — it just
 * shows whichever prompt is next. Once both are done for today it shows a
 * quiet "done for today" state with the option to revisit either answer.
 */
export default function DailyReflectionCard({ onViewHistory }) {
  const { reflections, saveMorningReflection, saveEveningReflection } = useAppData()
  const key = todayKey()
  const todays = reflections[key] || {}

  const [editing, setEditing] = useState(null) // 'morning' | 'evening' | null
  const [draft, setDraft] = useState('')

  const nextSlot = !todays.morning ? 'morning' : !todays.evening ? 'evening' : null

  function startEditing(slot) {
    setEditing(slot)
    setDraft(todays[slot]?.text || '')
  }

  function handleSave() {
    if (!draft.trim()) return
    if (editing === 'morning') saveMorningReflection(key, draft.trim())
    else saveEveningReflection(key, draft.trim())
    setEditing(null)
    setDraft('')
  }

  return (
    <Card tone="lavender">
      <div className="flex items-center gap-2 text-lavender-text">
        {editing === 'evening' || (!editing && nextSlot === 'evening') ? (
          <MoonIcon className="h-5 w-5" />
        ) : (
          <SunIcon className="h-5 w-5" />
        )}
        <CardTitle className="text-lavender-text">
          {editing === 'evening' || (!editing && nextSlot === 'evening') ? 'Evening Reflection' : 'Morning Reflection'}
        </CardTitle>
      </div>

      {editing ? (
        <div className="mt-3">
          <p className="text-sm text-lavender-text/90 mb-2">
            {editing === 'morning' ? MORNING_PROMPT : EVENING_PROMPT}
          </p>
          <textarea
            autoFocus
            rows={3}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full resize-none rounded-xl border border-lavender-deep/30 bg-cream-soft/70 p-3 text-sm text-ink outline-none focus:border-lavender-deep"
            placeholder="Type freely — there's no wrong answer."
          />
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full bg-lavender-deep px-4 py-1.5 text-sm font-semibold text-cream shadow-softer hover:opacity-90"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="rounded-full px-4 py-1.5 text-sm text-lavender-text hover:bg-lavender-deep/10"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : nextSlot ? (
        <>
          <CardSubtitle className="text-lavender-text/80">
            {nextSlot === 'morning' ? 'start your day with intention' : 'a moment before the day ends'}
          </CardSubtitle>
          <button
            type="button"
            onClick={() => startEditing(nextSlot)}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-lavender-deep px-4 py-2 text-sm font-semibold text-cream shadow-softer hover:opacity-90"
          >
            Start reflection <span aria-hidden>→</span>
          </button>
          <p className="mt-4 text-sm text-lavender-text/80 flex items-center gap-1">
            {nextSlot === 'morning' ? MORNING_PROMPT : EVENING_PROMPT}
            <SparkleIcon className="h-3.5 w-3.5" />
          </p>
        </>
      ) : (
        <>
          <CardSubtitle className="text-lavender-text/80">both reflections are in for today</CardSubtitle>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => startEditing('morning')}
              className="rounded-full border border-lavender-deep/40 px-3 py-1 text-xs text-lavender-text hover:bg-lavender-deep/10"
            >
              edit morning
            </button>
            <button
              type="button"
              onClick={() => startEditing('evening')}
              className="rounded-full border border-lavender-deep/40 px-3 py-1 text-xs text-lavender-text hover:bg-lavender-deep/10"
            >
              edit evening
            </button>
          </div>
        </>
      )}

      <button
        type="button"
        onClick={onViewHistory}
        className="mt-4 block text-xs text-lavender-text/70 underline decoration-dotted underline-offset-2 hover:text-lavender-text"
      >
        view past reflections
      </button>
    </Card>
  )
}
