import { DECORATIVE_ASSETS } from '../../data/decorativeAssets.js'

/**
 * Renders one decorative illustration by key (see data/decorativeAssets.js).
 * Purely visual: pointer-events are disabled and it's marked aria-hidden so
 * it never interferes with — or gets announced over — the functional UI.
 *
 * Usage:
 *   <Decoration asset="raccoon" className="w-24 absolute -bottom-6 left-1/3" />
 */
export default function Decoration({ asset, className = '', style, flip = false }) {
  const entry = DECORATIVE_ASSETS[asset]
  if (!entry) return null

  const combinedStyle = flip ? { ...style, transform: `${style?.transform || ''} scaleX(-1)`.trim() } : style

  if (entry.kind === 'image') {
    return (
      <img
        src={entry.src}
        alt=""
        aria-hidden="true"
        draggable={false}
        className={`pointer-events-none select-none ${className}`}
        style={combinedStyle}
      />
    )
  }

  const { Component, props } = entry
  return (
    <div aria-hidden="true" className={`pointer-events-none select-none ${className}`} style={combinedStyle}>
      <Component {...(props || {})} className="h-full w-full" />
    </div>
  )
}
