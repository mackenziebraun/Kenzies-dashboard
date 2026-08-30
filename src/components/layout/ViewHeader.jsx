import { ChevronLeftIcon } from '../shared/Icons.jsx'

/** Shared "back to dashboard" header used by every secondary view. */
export default function ViewHeader({ title, subtitle, onBack }) {
  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink"
      >
        <ChevronLeftIcon /> back to dashboard
      </button>
      <h2 className="font-hand font-medium text-2xl sm:text-3xl text-ink mt-2">{title}</h2>
      {subtitle && <p className="text-ink-muted mt-0.5">{subtitle}</p>}
    </div>
  )
}
