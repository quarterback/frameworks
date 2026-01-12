# Vercel Setup Instructions

This repository contains a React app in the `assessment-tool/` subdirectory. Follow these steps to deploy it to Vercel for the first time.

## Initial Setup (First Time Deployment)

1. **Go to [Vercel Dashboard](https://vercel.com/new)**

2. **Import your GitHub repository:**
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose `quarterback/frameworks`

3. **Configure Project Settings:**
   
   **IMPORTANT:** Set the **Root Directory** to `assessment-tool`
   
   - Click "Edit" next to "Root Directory"
   - Enter: `assessment-tool`
   - Click "Continue"

4. **Build Settings** (auto-detected):
   - Framework Preset: Vite
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install` (auto-detected)

5. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete

## What the vercel.json Does

The `vercel.json` file at the repository root configures:
- **SPA Routing**: Redirects all routes to `/index.html` so React Router works correctly

## Expected Result

After deployment:
- Your app will be live at `https://your-project.vercel.app`
- All routes will work correctly (no 404 errors on refresh)
- Automatic deployments will trigger on every push to the main branch

## Troubleshooting

### Error: "No Output Directory named 'dist' found"
- **Solution**: Make sure you set the **Root Directory** to `assessment-tool` in Step 3 above
- This tells Vercel to build from the `assessment-tool/` subdirectory, not the repository root

### Error: "jekyll: command not found"
- **Solution**: This means the Root Directory is not set correctly. Vercel is trying to build the Jekyll site at the repo root instead of the React app
- Go to Project Settings → General → Root Directory and set it to `assessment-tool`

### 404 errors when refreshing the page
- **Solution**: The `vercel.json` rewrites configuration should handle this automatically
- If issues persist, check that the `vercel.json` file is present at the repository root

## Next Steps

- Configure a custom domain (optional)
- Set up environment variables if needed
- Enable automatic deployments from GitHub

For more deployment options, see `assessment-tool/DEPLOYMENT.md`.
