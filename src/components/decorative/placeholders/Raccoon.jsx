// A simple, friendly stand-in raccoon — rounded and soft rather than
// detailed, so it doesn't read as a "final" asset and clearly invites
// replacement with the user's real illustration.
export default function Raccoon({ className = 'h-24 w-24' }) {
  return (
    <svg viewBox="0 0 160 120" className={className} fill="none">
      <ellipse cx="70" cy="80" rx="55" ry="30" fill="#9A806B" opacity="0.9" />
      <circle cx="120" cy="55" r="26" fill="#9A806B" opacity="0.9" />
      <path d="M104 34c-4-8-2-14 4-16 3 7 2 12-4 16Z" fill="#9A806B" opacity="0.9" />
      <path d="M132 32c6-6 12-6 16 0-4 6-10 7-16 0Z" fill="#9A806B" opacity="0.9" />
      <ellipse cx="112" cy="58" rx="8" ry="6" fill="#F1EBE3" />
      <circle cx="112" cy="58" r="2.4" fill="#514137" />
      <circle cx="126" cy="52" r="2" fill="#514137" />
      <ellipse cx="128" cy="60" rx="3.5" ry="2.5" fill="#514137" />
      <path d="M25 82c8-14 20-20 20-20M118 100c10-6 16-14 16-14" stroke="#75675D" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 96c6 5 14 6 20 3M55 100c8 4 18 3 24-2" stroke="#75675D" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}
