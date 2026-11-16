# How Much?

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



## 5. Optional ways to go further
Measure your own deployment (websitecarbon.com, Green Web Foundation hosting check, `curl -I` for `x-vercel-id` region). Add a "show the maths" panel, state-wise grid factors if you find a defensible source, or a shareable result via URL query params.
