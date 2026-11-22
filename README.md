# Shan Mickyla Portfolio

Next.js + Tailwind + Motion. Fonts: Clash Display and Satoshi (free, from Fontshare, license in `public/fonts`).

## Run it on your computer

1. Open this folder in Cursor.
2. In the terminal, run `npm install`, then `npm run dev`.
3. Open http://localhost:3000

## Put it online

### 1. GitHub

1. Create a new empty repository on GitHub (no README).
2. In the Cursor terminal, inside this folder, run (the commits are already made):

```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### 2. Vercel

1. On vercel.com, click **Add New > Project** and import the GitHub repo.
2. Click **Deploy**. No settings or environment variables needed.

From now on, every push to GitHub updates the live site automatically.

## Where to edit things

| What | File |
| --- | --- |
| All text, links, projects, services, video IDs, email, WhatsApp | `src/lib/content.ts` |
| Tool logos in the scrolling strip | `src/lib/tools.ts` |
| Colors and fonts | `src/app/globals.css` (the `@theme` block) |
| Your photo | `public/images/shan-portrait.jpg` |
| Project thumbnails | `public/images/work/` |
| Workflow screenshots | `public/images/workflows/` |
| Page title and link preview text | `src/app/layout.tsx` |

To add a project, copy one entry in `sites` or `automations` in `content.ts`, change the text, and drop a 16:10 thumbnail (1600×1000 works well) into `public/images/work/`.

## Privacy notes

- Client links use `rel="nofollow"`, and the work section has `data-nosnippet`, so search engines don't tie your portfolio into searches for client names.
- Your name appears only as "Shan Mickyla".
