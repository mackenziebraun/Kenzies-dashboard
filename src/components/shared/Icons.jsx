// Small, hand-simplified line icons used throughout the dashboard, styled
// to match the mockup's soft, drawn feel rather than a generic icon-font
// look. All accept a `className` (for size/color via Tailwind) — color
// defaults to currentColor so they inherit the surrounding text color.

const base = 'inline-block'

export function SunIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
    </svg>
  )
}

export function MoonIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.2A8.5 8.5 0 1 1 9.8 4a6.7 6.7 0 0 0 10.2 10.2Z" />
    </svg>
  )
}

export function BookIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.2c2.2-.9 4.6-.9 6.8 0v14c-2.2-.9-4.6-.9-6.8 0Z" />
      <path d="M20 5.2c-2.2-.9-4.6-.9-6.8 0v14c2.2-.9 4.6-.9 6.8 0Z" />
    </svg>
  )
}

export function ClockIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  )
}

export function LeafIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 19c8.5 0 14-5.5 14-14-8.5 0-14 5.5-14 14Z" />
      <path d="M5 19c0-6 3-9 9-11" />
    </svg>
  )
}

export function BrainIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 4.2c-2 0-3.4 1.5-3.4 3.2-1.4.4-2.4 1.7-2.4 3.2 0 1.1.5 2 1.3 2.7-.4.6-.6 1.3-.6 2 0 2 1.7 3.6 3.7 3.6.3 1.2 1.4 2.1 2.7 2.1 1.1 0 2-.6 2.5-1.5" />
      <path d="M9.5 4.2c.5-1.1 1.6-1.9 2.9-1.9 1.7 0 3.1 1.3 3.2 3 1.6.3 2.8 1.7 2.8 3.4 0 .9-.3 1.7-.9 2.3.6.6.9 1.5.9 2.4 0 2-1.6 3.6-3.6 3.6-.1 1.3-1.2 2.3-2.6 2.3-.9 0-1.7-.5-2.2-1.2" />
      <path d="M9.5 4.2v15.1M12.4 2.3v4.4M9.5 9.3h3M9 13h4.2M9.4 16.7h3.4" />
    </svg>
  )
}

export function ChevronLeftIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 5.5 8.5 12l6.5 6.5" />
    </svg>
  )
}

export function ChevronRightIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5.5 15.5 12 9 18.5" />
    </svg>
  )
}

export function ArrowRightIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h15M13 5.5 19.5 12 13 18.5" />
    </svg>
  )
}

export function ArrowUpIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5M6 10.5 12 4.5l6 6" />
    </svg>
  )
}

export function KebabIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`${base} ${className}`}>
      <circle cx="12" cy="5.2" r="1.7" />
      <circle cx="12" cy="12" r="1.7" />
      <circle cx="12" cy="18.8" r="1.7" />
    </svg>
  )
}

export function HeartIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20s-7.5-4.6-9.8-9.3C.7 7.2 2.4 4 5.8 4c2 0 3.4 1.1 4.2 2.3C10.8 5.1 12.2 4 14.2 4c3.4 0 5.1 3.2 3.6 6.7C15.5 15.4 12 20 12 20Z" />
    </svg>
  )
}

export function SparkleIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`${base} ${className}`}>
      <path d="M12 2.5c.6 3.5 2.3 5.2 5.8 5.8-3.5.6-5.2 2.3-5.8 5.8-.6-3.5-2.3-5.2-5.8-5.8 3.5-.6 5.2-2.3 5.8-5.8Z" />
      <path d="M19 15c.3 1.7 1.1 2.5 2.8 2.8-1.7.3-2.5 1.1-2.8 2.8-.3-1.7-1.1-2.5-2.8-2.8 1.7-.3 2.5-1.1 2.8-2.8Z" />
    </svg>
  )
}

export function CheckIcon({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
    </svg>
  )
}

export function PlusIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 4.5v15M4.5 12h15" />
    </svg>
  )
}

export function CalendarIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  )
}

export function TrashIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 7h15M9.5 7V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v2M6.5 7l1 12.5A2 2 0 0 0 9.5 21.5h5a2 2 0 0 0 2-2L17.5 7" />
    </svg>
  )
}

export function PencilIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20l.9-3.8L16.2 4.9a1.6 1.6 0 0 1 2.3 0l.6.6a1.6 1.6 0 0 1 0 2.3L7.8 19.1 4 20Z" />
    </svg>
  )
}
