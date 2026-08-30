import { useState } from 'react'
import ViewHeader from '../components/layout/ViewHeader.jsx'
import Card from '../components/shared/Card.jsx'
import OverflowMenu from '../components/shared/OverflowMenu.jsx'
import { ArrowUpIcon } from '../components/shared/Icons.jsx'
import { useAppData } from '../context/AppDataContext.jsx'

/**
 * Full add/edit/remove screen for the user's own affirmations — reached
 * via the pencil icon on the dashboard's Affirmation card. Deliberately
 * plain-text only (no categories/tags) so writing a new line stays as
 * frictionless as jotting a quick thought.
 */
export default function AffirmationsManageView({ onBack }) {
  const { affirmations, addAffirmation, editAffirmation, removeAffirmation } = useAppData()
  const [draft, setDraft] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editDraft, setEditDraft] = useState('')

  function handleAdd(e) {
    e.preventDefault()
    if (!draft.trim()) return
    addAffirmation(draft)
    setDraft('')
  }

  function startEdit(item) {
    setEditingId(item.id)
    setEditDraft(item.text)
  }

  function commitEdit() {
    if (editDraft.trim()) editAffirmation(editingId, editDraft.trim())
    setEditingId(null)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <ViewHeader
        title="Affirmations"
        subtitle="Your own words — write whatever actually speaks to you."
        onBack={onBack}
      />

      <form
        onSubmit={handleAdd}
        className="mb-6 flex items-center gap-2 rounded-full bg-lavender-bg px-4 py-2.5 border border-lavender-deep/20"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write an affirmation that speaks to you"
          className="min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-ink-muted outline-none"
        />
        <button
          type="submit"
          aria-label="Add affirmation"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lavender-deep text-cream hover:opacity-90"
        >
          <ArrowUpIcon />
        </button>
      </form>

      <Card tone="cream" className="p-0 overflow-hidden">
        <ul className="divide-y divide-ink/5">
          {affirmations.map((item) => (
            <li key={item.id} className="flex items-center gap-3 px-4 py-3">
              {editingId === item.id ? (
                <input
                  autoFocus
                  value={editDraft}
                  onChange={(e) => setEditDraft(e.target.value)}
                  onBlur={commitEdit}
                  onKeyDown={(e) => e.key === 'Enter' && commitEdit()}
                  className="min-w-0 flex-1 rounded-lg border border-lavender-deep/30 bg-cream-soft px-2 py-1 text-sm outline-none"
                />
              ) : (
                <span className="min-w-0 flex-1 text-sm font-medium text-ink">{item.text}</span>
              )}
              <OverflowMenu
                actions={[
                  { label: 'Edit', onSelect: () => startEdit(item) },
                  { label: 'Remove', onSelect: () => removeAffirmation(item.id), danger: true },
                ]}
              />
            </li>
          ))}
          {affirmations.length === 0 && (
            <li className="px-4 py-4 text-sm text-ink-muted italic">No affirmations yet — add one above.</li>
          )}
        </ul>
      </Card>
    </div>
  )
}
