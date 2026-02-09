# Deployment Guide

This document explains how to deploy both the main portfolio site and Sanity Studio.

## Overview

This project has two deployment targets:

1. **Portfolio Website** → GitHub Pages
2. **Sanity Studio** → Sanity Hosting (or alternative)

## Portfolio Website Deployment (GitHub Pages)

### Automatic Deployment

The portfolio website automatically deploys to GitHub Pages when you push to the `main` branch.

**Workflow:** `.github/workflows/deploy.yml`

**Deployment URL:** `https://vishseen.github.io/react-home-v1/`

### Manual Deployment

To manually trigger a deployment:

1. Go to GitHub Actions
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

### Local Build Test

Test the production build locally:

```bash
npm run build
npm run start
```

The static export will be in the `out` directory.

## Sanity Studio Deployment

Sanity Studio **cannot** be deployed to the same GitHub Pages as the main site because:
- It requires server-side routing
- It needs authentication
- GitHub Pages only supports static files

### Option 1: Sanity Hosting (Recommended)

Deploy to Sanity's free hosting:

```bash
cd studio
npm run deploy
```

This deploys to: `https://your-project-name.sanity.studio`

**Benefits:**
- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ Fast global CDN
- ✅ Easy authentication
- ✅ One command deployment

### Option 2: Vercel

1. Create a new Vercel project
2. Import the `studio` directory
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variables
5. Deploy

### Option 3: Netlify

1. Create a new Netlify site
2. Connect to your repository
3. Configure build settings:
   - Base directory: `studio`
   - Build command: `npm run build`
   - Publish directory: `studio/dist`
4. Add environment variables
5. Deploy

## Automated Studio Deployment (Optional)

If you want to automate Sanity Studio deployment via GitHub Actions:

### Prerequisites

1. Get a Sanity auth token:
   ```bash
   sanity login
   sanity token create
   ```

2. Add token to GitHub Secrets:
   - Go to Repository Settings → Secrets and variables → Actions
   - Add new secret: `SANITY_AUTH_TOKEN`

### Create Workflow

Create `.github/workflows/deploy-studio.yml`:

```yaml
name: Deploy Sanity Studio

on:
  push:
    branches: [main]
    paths:
      - 'studio/**'
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: studio/package-lock.json
      
      - name: Install dependencies
        run: cd studio && npm ci
      
      - name: Deploy to Sanity
        env:
          SANITY_AUTH_TOKEN: ${{ secrets.SANITY_AUTH_TOKEN }}
        run: cd studio && npx sanity deploy
```

## Content Update Workflow

When you update content in Sanity Studio:

1. **Edit content** in Sanity Studio (at your studio URL)
2. **Content saves** automatically to Sanity cloud
3. **Rebuild site** to reflect changes:
   - Manual: Go to GitHub Actions → Run "Deploy to GitHub Pages"
   - Automatic: Set up webhooks (see below)

## Automatic Rebuilds with Webhooks

To automatically rebuild the site when content changes:

### 1. Create GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `repo` and `workflow`
4. Save the token

### 2. Configure Sanity Webhook

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to API → Webhooks
4. Add new webhook:
   - **Name:** Rebuild Portfolio
   - **URL:** `https://api.github.com/repos/VishSeen/react-home-v1/dispatches`
   - **Dataset:** production
   - **Trigger on:** Create, Update, Delete
   - **HTTP Headers:**
     - `Authorization: Bearer YOUR_GITHUB_TOKEN`
     - `Accept: application/vnd.github+json`
   - **Payload:**
     ```json
     {
       "event_type": "sanity-update"
     }
     ```

### 3. Update GitHub Actions Workflow

Modify `.github/workflows/deploy.yml`:

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:
  repository_dispatch:  # Add this
    types: [sanity-update]  # Add this
```

Now, when you update content in Sanity, it will automatically trigger a rebuild!

## Deployment Checklist

### Initial Setup
- [ ] Create Sanity project (`cd studio && sanity init`)
- [ ] Update `studio/sanity.config.ts` with project ID
- [ ] Update `.env.local` with Sanity credentials
- [ ] Deploy Sanity Studio (`cd studio && npm run deploy`)
- [ ] Verify Studio is accessible

### Deploying Changes
- [ ] Test locally (`npm run dev`)
- [ ] Commit changes
- [ ] Push to GitHub
- [ ] Verify GitHub Actions deployment
- [ ] Check deployed site

### After Content Updates
- [ ] Edit content in Sanity Studio
- [ ] Trigger rebuild (manual or webhook)
- [ ] Verify changes on live site

## Troubleshooting

### Studio Won't Deploy
- Check authentication: `sanity login`
- Verify project ID in `sanity.config.ts`
- Check for build errors: `npm run build`

### Site Not Updating with New Content
- Verify environment variables are set
- Check if rebuild was triggered
- Clear browser cache
- Check for API errors in console

### GitHub Pages Not Working
- Verify GitHub Pages is enabled in repository settings
- Check if Actions workflow completed successfully
- Ensure `out` directory was uploaded
- Verify base path configuration in `next.config.ts`

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)
- [GitHub Actions](https://docs.github.com/en/actions)
