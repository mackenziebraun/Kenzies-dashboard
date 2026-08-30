import { CheckIcon } from './Icons.jsx'

// The rounded, hand-drawn-feeling circle checkbox used in the Day Planner
// and The Pile. `tone` controls the checked-state color so it can match
// whichever card it lives in.

const TONE_RING = {
  sage: 'border-sage-deep',
  lavender: 'border-lavender-deep',
  tan: 'border-tan-deep',
}
const TONE_FILL = {
  sage: 'bg-sage-deep text-cream',
  lavender: 'bg-lavender-deep text-cream',
  tan: 'bg-tan-deep text-cream',
}

export default function Checkbox({ checked, onChange, tone = 'sage', label }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`circle-check ${checked ? TONE_FILL[tone] : `bg-transparent ${TONE_RING[tone]}`}`}
    >
      {checked && <CheckIcon className="h-3.5 w-3.5" />}
    </button>
  )
}
