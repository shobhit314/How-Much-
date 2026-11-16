# CLAUDE.md: project context for "Usage index"

## What this is
India-specific digital-carbon calculator for a sustainable computing class . User enters daily hours for video, music, social media, calls and browsing, plus device, connection, video quality and device lifespan. App outputs estimated kg CO2e per year, a per-activity bar breakdown, share of average Indian per-capita emissions, and live "swap" suggestions with kg saved.

## Constraints from the user
- Earlier size/zero-JS/OLED/edge-node constraints were explicitly dropped. JS is fine; keep it dependency-free anyway.
- Minimal, aesthetic, few visual elements, must not look AI-generated: warm paper (#f4f0e8) / ink (#1c1b18) with one terracotta accent (#b5472b), Georgia headings, hairline dividers, no cards/gradients/emojis/icons. Auto dark mode via prefers-color-scheme.
- Deployed on Vercel as static site (Framework Preset "Other"), set up from VS Code via GitHub.

## Files
`index.html`, `style.css`, `app.js` (all assumptions in constants at top; controls are generated from the `ACT` array), `vercel.json`, `README.md` (VS Code + GitHub + Vercel guide, source-checking list).

## Model
kg/hour = (device W + GB/h × (network Wh/GB + datacentre Wh/GB)) / 1000 × GRID. Annual = hours × 365. Plus device manufacture kg ÷ years kept. Constants: GRID 0.71, DC 10, NET wifi 20 / mobile 50, DEV phone 2 W / laptop 30 W, EMB phone 65 / laptop 250 kg, PER_CAPITA 2000 kg. All approximate and unverified; they must be sourced before submission.

## Open items
- Verify and cite every constant; show an uncertainty range.
- Optional: state-wise grid factors (only with a real source), URL-shareable results, Hindi/Tamil translation, printable summary for the class report, measured-results section for the deployed site.
