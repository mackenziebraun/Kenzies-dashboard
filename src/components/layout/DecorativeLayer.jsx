import Decoration from '../decorative/Decoration.jsx'

/**
 * Scatters decorative illustrations *around* the widget grid, echoing the
 * mockup's flowers-and-raccoon border. This sits absolutely-positioned
 * inside a `relative` wrapper around the dashboard grid (see
 * DashboardView.jsx) so it never affects widget layout or tab order.
 *
 * Positions are intentionally along the edges/gaps between cards, never on
 * top of interactive content, and several are hidden below `md` so small
 * screens stay uncluttered per the "not visually cluttered" brief.
 */
export default function DecorativeLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Decoration
        asset="flower-purple"
        className="hidden md:block absolute bottom-2 left-0 w-14 lg:w-20"
      />
      <Decoration
        asset="daisy"
        className="hidden md:block absolute bottom-0 left-16 lg:left-24 w-12 lg:w-16"
      />
      <Decoration
        asset="raccoon"
        className="hidden sm:block absolute bottom-0 left-1/2 w-24 lg:w-32 -translate-x-1/2"
      />
      <Decoration
        asset="daisy"
        flip
        className="hidden lg:block absolute bottom-4 right-[38%] w-10"
      />
      <Decoration
        asset="flower-pink"
        className="hidden sm:block absolute -bottom-1 right-0 w-12 lg:w-16"
      />
      <Decoration asset="sprig" className="hidden lg:block absolute top-1/3 -left-2 w-8 opacity-70" />
    </div>
  )
}
