import { useState } from 'react'
import { useAppData } from '../../context/AppDataContext.jsx'
import { BrainIcon } from '../shared/Icons.jsx'

/**
 * The "what's on your mind" quick brain-dump. Deliberately does *not*
 * create a Pile task — thoughts and tasks are separate systems (see the
 * project brief). Submitted thoughts are timestamped and stored; browsing
 * them by date happens in the Thoughts history view.
 */
export default function ThoughtInputCard({ onViewHistory }) {
  const { addThought } = useAppData()
  const [value, setValue] = useState('')
  const [justSaved, setJustSaved] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!value.trim()) return
    addThought(value)
    setValue('')
    setJustSaved(true)
    setTimeout(() => setJustSaved(false), 1800)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 rounded-full border border-tan-deep/25 bg-white px-5 py-3 shadow-softer"
    >
      <BrainIcon className="h-5 w-5 text-ink-muted shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Whats on your mind?"
        className="min-w-0 flex-1 bg-transparent text-ink placeholder:text-ink-faint outline-none"
      />
      {justSaved && <span className="text-xs text-sage-deep font-medium shrink-0">saved ✓</span>}
      <button
        type="button"
        onClick={onViewHistory}
        className="text-xs text-ink-muted underline decoration-dotted underline-offset-2 shrink-0 hover:text-ink"
      >
        past thoughts
      </button>
    </form>
  )
}
