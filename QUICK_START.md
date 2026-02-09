# Quick Reference: Sanity with GitHub Pages

## The Answer: YES! ✅

**Can you use Sanity Studio with GitHub Pages?** 

**Yes!** But with a specific architecture:

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Portfolio Site (GitHub Pages)                  │
│  https://vishseen.github.io/react-home-v1/      │
│  - Static Next.js site                          │
│  - Fetches data from Sanity                     │
│  - Deploys automatically on push                │
│                                                 │
└─────────────────────────────────────────────────┘
                    ↕ (API calls)
┌─────────────────────────────────────────────────┐
│                                                 │
│  Sanity Cloud (Content Storage)                 │
│  - Stores all your content                      │
│  - Provides API for data access                 │
│                                                 │
└─────────────────────────────────────────────────┘
                    ↕ (managed by)
┌─────────────────────────────────────────────────┐
│                                                 │
│  Sanity Studio (CMS Interface)                  │
│  https://your-project.sanity.studio             │
│  - Content editing interface                    │
│  - Deployed separately (NOT on GitHub Pages)    │
│  - Free hosting by Sanity                       │
│                                                 │
└─────────────────────────────────────────────────┘
```

## Key Concepts

### Two Separate Deployments

1. **Your Site** → GitHub Pages
   - Static files only
   - Fast, free hosting
   - Automatic deployments

2. **Sanity Studio** → Sanity Hosting
   - Content management interface
   - Requires server-side features
   - Free Sanity hosting

### How They Work Together

1. Edit content in Sanity Studio
2. Content saves to Sanity Cloud
3. Rebuild GitHub Pages site
4. Site fetches updated content from Sanity

## Quick Start Commands

```bash
# 1. Setup Sanity
cd studio
sanity init                    # Create project
npm install                    # Install dependencies
npm run dev                    # Run locally (localhost:3333)
npm run deploy                 # Deploy to Sanity hosting

# 2. Configure Main Site
cd ..
# Edit .env.local with your Sanity project ID
npm run dev                    # Test locally
git push                       # Deploy to GitHub Pages
```

## File Structure

```
react-home-v1/
├── studio/                    # Sanity Studio (CMS)
│   ├── schemas/              # Content types
│   ├── sanity.config.ts      # Studio config
│   └── package.json          # Studio dependencies
│
├── lib/sanity/
│   └── client.ts             # Sanity API client
│
├── app/                      # Next.js app
├── .env.local                # Environment variables
└── SANITY_SETUP.md           # Detailed setup guide
```

## Common Tasks

### Add New Content Type

1. Create schema in `studio/schemas/`
2. Export from `studio/schemas/index.ts`
3. Add query function in `lib/sanity/client.ts`

### Update Content

1. Go to your Studio URL
2. Edit content
3. Trigger GitHub Pages rebuild

### Deploy Changes

```bash
# Deploy Studio changes
cd studio && npm run deploy

# Deploy site changes
git push  # Automatic deployment
```

## Important Notes

⚠️ **Limitations:**
- Content changes require site rebuild
- Not real-time (static site)
- Two separate URLs (site + studio)

✅ **Benefits:**
- Free hosting (GitHub + Sanity)
- Easy content management
- Scalable and reliable
- Version controlled content

## Need Help?

- 📖 [Detailed Setup Guide](./SANITY_SETUP.md)
- 🚀 [Deployment Guide](./DEPLOYMENT.md)
- 📚 [Sanity Docs](https://www.sanity.io/docs)
- 📁 [Studio README](./studio/README.md)

## TL;DR

**Question:** Can I use Sanity Studio with GitHub Pages?

**Answer:** Yes! Deploy your site to GitHub Pages and your Sanity Studio to Sanity's free hosting. They work together seamlessly via Sanity's API.

**Setup Time:** ~10 minutes

**Cost:** Free (both GitHub Pages and Sanity Studio hosting are free)
