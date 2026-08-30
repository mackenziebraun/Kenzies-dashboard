# Decorative assets

Drop your real illustration files (raccoons, plants, other small drawings)
in this folder, then wire them up in `src/data/decorativeAssets.js` — that
file is the only place that needs to change. See the comment at the top of
that file for the exact steps.

Guidelines for the files themselves:

- **Format:** PNG with a transparent background is the safe default for
  painted/textured illustrations (like the raccoon and florals in the
  mockup). If a piece is closer to flat vector line art, SVG will look
  crisper at every size and is a smaller file.
- **Resolution:** export PNGs at roughly 2x the largest size you expect to
  display them (e.g. a 96px-tall raccoon should be exported around 192px
  tall) so they stay sharp on high-DPI screens.
- **Trim tightly:** crop close to the artwork itself. `Decoration`
  positions assets by their bounding box, so extra transparent padding
  makes an illustration harder to place precisely.
- **Naming:** short, descriptive, kebab-case — `raccoon-sleeping.png`,
  `bellflower.png`, `sprig-small.svg`. The key you choose in
  `decorativeAssets.js` doesn't have to match the filename, but it's much
  easier to maintain if it does.

Nothing in this folder is imported automatically — an asset only appears
on the dashboard once it has an entry in `decorativeAssets.js` and a
`<Decoration asset="..." />` placed somewhere.
