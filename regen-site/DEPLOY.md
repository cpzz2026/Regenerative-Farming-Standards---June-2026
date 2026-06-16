# Regenerative Programme Review — deployment

A Vite + React single-page site. The whole dashboard lives in `src/App.jsx`.

## Run locally first (optional, to check it works)
Requires Node.js 20+ (https://nodejs.org).
```
npm install
npm run dev
```
Open the printed http://localhost:5173 address.

## Put it on GitHub
```
git init
git add .
git commit -m "Regenerative Programme Review"
git branch -M main
```
Create a new repository at https://github.com/new (Public if you want free
GitHub Pages hosting), then:
```
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Route A — Vercel or Netlify (simplest, recommended)
1. Sign in at https://vercel.com or https://netlify.com with your GitHub account.
2. Choose "Add new project" / "Import", pick the repository.
3. It detects Vite automatically (build command `npm run build`, output `dist`).
4. Deploy. You get a live URL, and every push to `main` redeploys.

## Route B — GitHub Pages (free, stays on GitHub)
1. In the repository: Settings > Pages > Build and deployment > Source: "GitHub Actions".
2. The included `.github/workflows/deploy.yml` builds and publishes on every
   push to `main`. Watch progress under the Actions tab; the live URL appears
   in the deploy step when it finishes (https://<user>.github.io/<repo>/).

## Updating the data later
Re-export the dashboard with the new matrix and replace `src/App.jsx`, then
commit and push. The host rebuilds automatically. The data is embedded in the
file, so there is no separate database to manage.
