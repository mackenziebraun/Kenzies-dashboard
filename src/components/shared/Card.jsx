// Base card shell shared by every dashboard widget. `tone` picks which
// pastel family (from tailwind.config.js) the card belongs to — this is
// the single source of truth for "what does a lavender card look like"
// so widgets never hand-roll their own bg/border colors.

const TONE_CLASSES = {
  lavender: 'bg-lavender-bg border-lavender-deep/20',
  sage: 'bg-sage-bg border-sage-deep/20',
  'sage-light': 'bg-sage-light border-sage-deep/15',
  tan: 'bg-tan-bg border-tan-deep/25',
  cream: 'bg-cream-soft border-ink/10',
}

export default function Card({ tone = 'cream', className = '', children, as: Tag = 'div', ...rest }) {
  return (
    <Tag
      className={`rounded-xl2 border shadow-softer p-5 sm:p-6 ${TONE_CLASSES[tone] || TONE_CLASSES.cream} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`font-hand font-medium text-ink text-sm sm:text-base ${className}`}>
      {children}
    </h3>
  )
}

export function CardSubtitle({ children, className = '' }) {
  return <p className={`text-ink-muted text-sm mt-0.5 ${className}`}>{children}</p>
}
