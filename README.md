# kitna: how much carbon is your day online?

A small, dependency-free web app: sliders in, estimated kg CO₂e per year out, with India's grid factor.
Plain HTML + CSS + JS. No build step, no npm packages, no backend.

```
kitna/
├── index.html   page
├── style.css    paper/ink theme, follows system light/dark
├── app.js       assumptions (top of file) + calculator
├── vercel.json  clean URLs + cache headers
├── README.md
└── CLAUDE.md    context for the next chat
```

## 1. Set up in VS Code
1. Install VS Code and Git.
2. **File → Open Folder…** → select `kitna`.
3. Install the **Live Server** extension, then right-click `index.html` → **Open with Live Server**. Edits reload automatically.
4. Terminal (**View → Terminal**):
   ```bash
   git init
   git add .
   git commit -m "kitna: first version"
   ```

## 2. Push to GitHub
Create an empty repo on github.com, then:
```bash
git branch -M main
git remote add origin https://github.com/<your-username>/kitna.git
git push -u origin main
```

## 3. Deploy on Vercel
**Dashboard (easiest):**
1. vercel.com → sign in with GitHub → **Add New → Project** → import `kitna`.
2. **Framework Preset: Other.** Leave Build Command and Output Directory empty.
3. **Deploy.** Each `git push` to `main` redeploys automatically.

**CLI (alternative):** `npm i -g vercel`, `vercel login`, `vercel` (preview), `vercel --prod`.

**Custom domain:** Project → Settings → Domains.

## 4. Before you submit: check the numbers
All figures are in the first 20 lines of `app.js`. They are illustrative. Replace or justify each with a source and cite it in your report:
- `GRID` (0.71 kg/kWh): latest CEA CO₂ Baseline Database for the Indian grid.
- `PER_CAPITA` (~2 t): a current per-capita CO₂ figure for India (e.g. Global Carbon Project / IEA).
- `NET`, `DC` (Wh per GB): energy-intensity literature varies by 10x. See IEA's 2020 note on streaming's carbon footprint, Aslan et al. (2018), and The Shift Project's critiques/rebuttals. State the range as an uncertainty.
- `EMB` (device manufacturing kg CO₂e): use manufacturer product environmental reports (Apple, Samsung, etc.) for the models you assume.
- GB per hour per activity: check against provider bitrate tables.

## 5. Optional ways to go further
Measure your own deployment (websitecarbon.com, Green Web Foundation hosting check, `curl -I` for `x-vercel-id` region). Add a "show the maths" panel, state-wise grid factors if you find a defensible source, or a shareable result via URL query params.
