import { useEffect, useRef, useState } from 'react'
import { KebabIcon } from './Icons.jsx'

// Small "..." menu used on Pile rows and Planner custom items for
// edit/remove-style actions. `actions` is [{label, onSelect, danger?}].
export default function OverflowMenu({ actions }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label="More actions"
        onClick={() => setOpen((o) => !o)}
        className="p-1 text-ink-muted hover:text-ink transition-colors"
      >
        <KebabIcon />
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-1 min-w-[9rem] overflow-hidden rounded-xl border border-ink/10 bg-cream-soft shadow-soft">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => {
                setOpen(false)
                action.onSelect()
              }}
              className={`block w-full px-3.5 py-2 text-left text-sm hover:bg-ink/5 ${
                action.danger ? 'text-accent' : 'text-ink'
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
