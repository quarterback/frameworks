# Deployment Guide - Relationship Assessment Tool

This guide covers deployment options for the assessment tool to various hosting platforms.

## Quick Deploy Options

### 1. Vercel (Recommended)

Vercel provides excellent React app hosting with automatic deployments.

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to the assessment tool
cd assessment-tool

# Deploy
vercel
```

Or use the [Vercel Dashboard](https://vercel.com):
1. Import your GitHub repository
2. Set the root directory to `assessment-tool`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy!

### 2. Netlify

Simple drag-and-drop or CLI deployment.

**Via Netlify CLI:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to the assessment tool
cd assessment-tool

# Build the app
npm run build

# Deploy
netlify deploy --prod
```

**Via Netlify Dashboard:**
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Set base directory: `assessment-tool`
5. Deploy!

### 3. GitHub Pages

Host directly from your GitHub repository.

```bash
cd assessment-tool

# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

**Note:** Update `vite.config.js` to set the base path:
```js
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
})
```

### 4. Railway

Modern platform with simple deployment.

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize and deploy
railway init
railway up
```

Set build command in `railway.toml`:
```toml
[build]
builder = "nixpacks"
buildCommand = "cd assessment-tool && npm install && npm run build"

[deploy]
startCommand = "cd assessment-tool && npx serve dist -l 3000"
```

### 5. Cloudflare Pages

Fast global CDN deployment.

1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. Connect your GitHub repository
3. Set build settings:
   - Build command: `cd assessment-tool && npm run build`
   - Build output directory: `assessment-tool/dist`
4. Deploy!

## Environment Configuration

Currently, the app uses LocalStorage and doesn't require environment variables. However, if you add a backend later:

Create `.env.production`:
```env
VITE_API_URL=https://your-api.com
```

Access in code:
```js
const apiUrl = import.meta.env.VITE_API_URL;
```

## Custom Domain Setup

After deploying to any platform:

1. **Add custom domain in platform dashboard**
2. **Update DNS records:**
   - Add CNAME record pointing to your platform
   - Or add A record with platform's IP

3. **SSL/HTTPS** is usually automatic on modern platforms

## Performance Optimization

The build is already optimized, but for additional improvements:

1. **Enable compression** on your hosting platform
2. **Configure caching headers** for static assets
3. **Use CDN** for global distribution (automatic on Vercel, Netlify, Cloudflare)

## Monitoring

Consider adding:
- **Analytics:** Google Analytics, Plausible, or Fathom
- **Error tracking:** Sentry or LogRocket
- **Performance monitoring:** Web Vitals

## Continuous Deployment

Most platforms support automatic deployments from GitHub:

1. Connect your repository
2. Choose the branch (e.g., `main`)
3. Set build configuration
4. Every push automatically deploys

## Rollback

If a deployment has issues:

**Vercel:**
```bash
vercel rollback
```

**Netlify:**
Use the Netlify dashboard to rollback to a previous deploy

**GitHub Pages:**
```bash
git revert HEAD
git push
npm run deploy
```

## Testing Before Deploy

Always test the production build locally:

```bash
cd assessment-tool
npm run build
npm run preview
```

Visit http://localhost:4173 to test the production build.

## Troubleshooting

**404 on page refresh:**
- Configure your hosting for SPA (Single Page App)
- Most platforms detect this automatically
- For custom servers, redirect all routes to `index.html`

**Build fails:**
- Check Node.js version (needs v16+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check build logs for specific errors

**Large bundle size:**
- Current bundle is ~265KB (gzipped ~84KB) which is acceptable
- If needed, implement code splitting and lazy loading

## Cost Estimation

**Free tier options (sufficient for MVP):**
- Vercel: Free for personal projects
- Netlify: 100GB bandwidth/month free
- GitHub Pages: Free for public repos
- Cloudflare Pages: Unlimited bandwidth free

**Paid options if needed:**
- Vercel Pro: $20/month (more builds, analytics)
- Netlify Pro: $19/month (more builds, forms)
- All platforms scale based on usage

## Next Steps

1. Choose a platform (Vercel or Netlify recommended)
2. Deploy the application
3. Test all flows on the live site
4. Set up custom domain (optional)
5. Configure analytics (optional)
6. Share the live URL!
