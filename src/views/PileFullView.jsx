import { useState } from 'react'
import ViewHeader from '../components/layout/ViewHeader.jsx'
import Card from '../components/shared/Card.jsx'
import Checkbox from '../components/shared/Checkbox.jsx'
import OverflowMenu from '../components/shared/OverflowMenu.jsx'
import { ArrowUpIcon } from '../components/shared/Icons.jsx'
import { useAppData } from '../context/AppDataContext.jsx'
import { todayKey } from '../utils/date.js'

export default function PileFullView({ onBack }) {
  const { pile, addPileItem, editPileItem, togglePileItemComplete, removePileItem, addPileItemToPlannerDay } =
    useAppData()
  const [draft, setDraft] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editDraft, setEditDraft] = useState('')

  const open = pile.filter((i) => !i.completed)
  const completed = pile.filter((i) => i.completed)

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
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <ViewHeader title="The Pile" subtitle="Everything you need or want to eventually do." onBack={onBack} />

      <form onSubmit={handleAdd} className="mb-6 flex items-center gap-2 rounded-full bg-tan-bg px-4 py-2.5 border border-tan-deep/20">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="What needs doing?"
          className="min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-ink-muted outline-none"
        />
        <button type="submit" aria-label="Add to the pile" className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-tan-deep text-cream hover:opacity-90">
          <ArrowUpIcon />
        </button>
      </form>

      <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted mb-2">
        Open ({open.length})
      </h3>
      <Card tone="tan" className="p-0 overflow-hidden mb-6">
        <ul className="divide-y divide-ink/5">
          {open.map((item) => (
            <PileRow
              key={item.id}
              item={item}
              editing={editingId === item.id}
              editDraft={editDraft}
              setEditDraft={setEditDraft}
              onCommitEdit={commitEdit}
              onStartEdit={() => startEdit(item)}
              onToggle={() => togglePileItemComplete(item.id)}
              onRemove={() => removePileItem(item.id)}
              onAddToToday={() => addPileItemToPlannerDay(todayKey(), item.id)}
            />
          ))}
          {open.length === 0 && <li className="px-4 py-4 text-sm text-ink-muted italic">The pile is empty. Nice.</li>}
        </ul>
      </Card>

      {completed.length > 0 && (
        <>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted mb-2">
            Completed ({completed.length})
          </h3>
          <Card tone="cream" className="p-0 overflow-hidden">
            <ul className="divide-y divide-ink/5">
              {completed.map((item) => (
                <PileRow
                  key={item.id}
                  item={item}
                  editing={false}
                  onToggle={() => togglePileItemComplete(item.id)}
                  onRemove={() => removePileItem(item.id)}
                  faded
                />
              ))}
            </ul>
          </Card>
        </>
      )}
    </div>
  )
}

function PileRow({ item, editing, editDraft, setEditDraft, onCommitEdit, onStartEdit, onToggle, onRemove, onAddToToday, faded }) {
  return (
    <li className={`flex items-center gap-3 px-4 py-3 ${faded ? 'opacity-60' : ''}`}>
      <Checkbox tone="tan" checked={item.completed} onChange={onToggle} label={`Mark "${item.text}" complete`} />
      {editing ? (
        <input
          autoFocus
          value={editDraft}
          onChange={(e) => setEditDraft(e.target.value)}
          onBlur={onCommitEdit}
          onKeyDown={(e) => e.key === 'Enter' && onCommitEdit()}
          className="min-w-0 flex-1 rounded-lg border border-tan-deep/30 bg-cream-soft px-2 py-1 text-sm outline-none"
        />
      ) : (
        <span className={`min-w-0 flex-1 truncate text-sm font-medium text-ink ${item.completed ? 'line-through' : ''}`}>
          {item.text}
        </span>
      )}
      <OverflowMenu
        actions={[
          ...(onStartEdit ? [{ label: 'Edit', onSelect: onStartEdit }] : []),
          ...(onAddToToday ? [{ label: 'Add to today’s plan', onSelect: onAddToToday }] : []),
          { label: 'Remove', onSelect: onRemove, danger: true },
        ]}
      />
    </li>
  )
}
