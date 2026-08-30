// --- The asset-swap point -------------------------------------------
// Every decorative illustration on the dashboard (flowers, the raccoon,
// sprigs between cards) is looked up here by a short key. Right now every
// entry points at a lightweight placeholder SVG component so the app runs
// with zero external files. When you're ready to drop in your real art:
//
//   1. Put the file in src/assets/decorative/ (see the README there for
//      naming/format notes — short version: transparent PNG or SVG).
//   2. Import it up top, e.g.:
//        import bellflower from '../assets/decorative/bellflower.png'
//   3. Change that entry's `kind` to 'image' and give it the import, e.g.:
//        'flower-purple': { kind: 'image', src: bellflower }
//
// Nothing else in the app needs to change — every widget just asks for an
// asset by key via <Decoration asset="flower-purple" />.

import Flower from '../components/decorative/placeholders/Flower.jsx'
import Daisy from '../components/decorative/placeholders/Daisy.jsx'
import Raccoon from '../components/decorative/placeholders/Raccoon.jsx'
import Sprig from '../components/decorative/placeholders/Sprig.jsx'

export const DECORATIVE_ASSETS = {
  'flower-purple': { kind: 'component', Component: Flower, props: { color: '#B58DC0' } }, // muted purple
  'flower-pink': { kind: 'component', Component: Flower, props: { color: '#9A806B' } }, // soft taupe, for variety
  daisy: { kind: 'component', Component: Daisy },
  raccoon: { kind: 'component', Component: Raccoon },
  sprig: { kind: 'component', Component: Sprig },
}
