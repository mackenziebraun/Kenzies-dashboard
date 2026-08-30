import { useState } from 'react'
import Card, { CardTitle } from '../shared/Card.jsx'
import Checkbox from '../shared/Checkbox.jsx'
import OverflowMenu from '../shared/OverflowMenu.jsx'
import { ArrowUpIcon } from '../shared/Icons.jsx'
import { useAppData } from '../../context/AppDataContext.jsx'
import { todayKey } from '../../utils/date.js'

const RECENT_COUNT = 3

export default function ThePileCard({ onViewFullPile }) {
  const { pile, addPileItem, editPileItem, togglePileItemComplete, removePileItem, addPileItemToPlannerDay } =
    useAppData()
  const [draft, setDraft] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editDraft, setEditDraft] = useState('')

  const openCount = pile.filter((item) => !item.completed).length
  const recent = pile.filter((item) => !item.completed).slice(0, RECENT_COUNT)

  function handleAdd(e) {
    e.preventDefault()
    if (!draft.trim()) return
    addPileItem(draft)
    setDraft('')
  }

  function startEdit(item) {
    setEditingId(item.id)
    setEditDraft(item.text)
  }

  function commitEdit() {
    if (editDraft.trim()) editPileItem(editingId, editDraft.trim())
    setEditingId(null)
  }

  return (
    <Card tone="tan">
      <CardTitle className="text-tan-text">The Pile</CardTitle>

      <p className="text-sm text-ink-muted mt-1">Add something to the pile</p>
      <form onSubmit={handleAdd} className="mt-2 flex items-center gap-2 rounded-full bg-cream-soft px-4 py-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="What needs doing?"
          className="min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-ink-muted outline-none"
        />
        <button
          type="submit"
          aria-label="Add to the pile"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-tan-deep text-cream hover:opacity-90"
        >
          <ArrowUpIcon />
        </button>
      </form>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-muted border-b border-ink/10 pb-1.5">
        Recently added
      </p>
      <ul className="mt-1 divide-y divide-ink/5">
        {recent.map((item) => (
          <li key={item.id} className="flex items-center gap-2.5 py-2">
            <Checkbox
              tone="tan"
              checked={item.completed}
              onChange={() => togglePileItemComplete(item.id)}
              label={`Mark "${item.text}" complete`}
            />
            {editingId === item.id ? (
              <input
                autoFocus
                value={editDraft}
                onChange={(e) => setEditDraft(e.target.value)}
                onBlur={commitEdit}
                onKeyDown={(e) => e.key === 'Enter' && commitEdit()}
                className="min-w-0 flex-1 rounded-lg border border-tan-deep/30 bg-cream-soft px-2 py-1 text-sm outline-none"
              />
            ) : (
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{item.text}</span>
            )}
            <OverflowMenu
              actions={[
                { label: 'Edit', onSelect: () => startEdit(item) },
                {
                  label: 'Add to today’s plan',
                  onSelect: () => addPileItemToPlannerDay(todayKey(), item.id),
                },
                { label: 'Remove', onSelect: () => removePileItem(item.id), danger: true },
              ]}
            />
          </li>
        ))}
        {recent.length === 0 && <li className="py-2 text-sm text-ink-muted">Nothing in the pile right now.</li>}
      </ul>

      <button
        type="button"
        onClick={onViewFullPile}
        className="mt-3 text-xs text-tan-text/80 underline decoration-dotted underline-offset-2 hover:text-tan-text"
      >
        view full pile ({openCount})
      </button>
    </Card>
  )
}
