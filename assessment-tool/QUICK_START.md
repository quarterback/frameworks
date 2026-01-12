# Quick Start: Deploy the Assessment Tool

**Want to see it live in 5 minutes?** Follow one of these simple options:

## Option 1: Vercel (Easiest - Recommended) ⭐

### Using Vercel Dashboard (No command line needed!)
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your `quarterback/frameworks` repository
4. Configure:
   - **Root Directory**: `assessment-tool`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click "Deploy"
6. Done! You'll get a live URL like `https://your-project.vercel.app`

### Using Vercel CLI (If you prefer terminal)
```bash
cd assessment-tool
npx vercel --prod
```
Just follow the prompts and you'll have a live URL in minutes!

---

## Option 2: Netlify (Also very easy)

### Using Netlify Dashboard
1. Go to [netlify.com](https://netlify.com) and sign in with GitHub
2. Click "Add new site" → "Import an existing project"
3. Connect to your GitHub repository
4. Configure:
   - **Base directory**: `assessment-tool`
   - **Build command**: `npm run build`
   - **Publish directory**: `assessment-tool/dist`
5. Click "Deploy"
6. Done! You'll get a live URL like `https://your-project.netlify.app`

### Using Netlify CLI
```bash
cd assessment-tool
npm run build
npx netlify deploy --prod
```

---

## Option 3: Test Locally First

Want to see it running locally before deploying?

```bash
cd assessment-tool
npm install
npm run dev
```

Open your browser to `http://localhost:5173`

---

## What You'll Get

After deployment, you'll have a live URL where anyone can:
- Take the full relationship assessment
- Get their personalized archetype results
- Share their results via unique links

**Example URLs:**
- Landing page: `https://your-app.vercel.app/`
- Quiz: `https://your-app.vercel.app/quiz`
- Results: `https://your-app.vercel.app/results/{unique-id}`

---

## Need Help?

- See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guides
- All platforms have free tiers that are perfect for this app
- Deployment takes about 2-3 minutes on first try

---

## Quick Comparison

| Platform | Difficulty | Speed | Free Tier |
|----------|-----------|-------|-----------|
| Vercel | ⭐ Easiest | 2 min | ✅ Yes |
| Netlify | ⭐ Easy | 2 min | ✅ Yes |
| GitHub Pages | ⭐⭐ Medium | 5 min | ✅ Yes |

**Recommendation:** Start with Vercel - it's the fastest and easiest!
