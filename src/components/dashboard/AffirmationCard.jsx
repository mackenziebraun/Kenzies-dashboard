import Card from '../shared/Card.jsx'
import { PencilIcon } from '../shared/Icons.jsx'
import { useAppData } from '../../context/AppDataContext.jsx'

// A single affirmation widget lives on the dashboard, sourced from the
// user's own editable list (see AppDataContext.jsx + AffirmationsManageView)
// rather than a fixed, hardcoded set. Text uses the tone's "deep" color for
// contrast on that bg.
const TEXT_CLASS = {
  lavender: 'text-lavender-text',
  'sage-light': 'text-sage-text',
  sage: 'text-sage-text',
  tan: 'text-tan-text',
  cream: 'text-ink',
}

/**
 * `slot` picks a stable-per-day line from the user's list. `onManage`, if
 * given, renders a small pencil icon that opens the full add/edit/remove
 * screen — see AffirmationsManageView.jsx. `flex-1` lets the card grow to
 * fill any extra vertical space left in its dashboard column; `min-h` is
 * just the floor for narrow/mobile layouts.
 */
export default function AffirmationCard({ slot, tone = 'lavender', onManage }) {
  const { getAffirmationForSlot } = useAppData()
  const text = getAffirmationForSlot(slot)
  const textClass = TEXT_CLASS[tone] || 'text-ink'

  return (
    <Card tone={tone} className="relative flex flex-1 items-center justify-center text-center min-h-[10rem]">
      {onManage && (
        <button
          type="button"
          onClick={onManage}
          aria-label="Manage affirmations"
          className={`absolute top-3 right-3 rounded-full p-1.5 opacity-50 hover:opacity-100 hover:bg-black/5 ${textClass}`}
        >
          <PencilIcon className="h-3.5 w-3.5" />
        </button>
      )}
      {text ? (
        <p className={`font-hand text-sm sm:text-base ${textClass}`}>{text}</p>
      ) : (
        <p className={`font-body text-sm ${textClass} opacity-70`}>
          Add an affirmation that speaks to you.
        </p>
      )}
    </Card>
  )
}
