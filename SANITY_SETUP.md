# Using Sanity Studio with GitHub Pages

This project now supports Sanity Studio for content management! Here's how to set it up and deploy it.

## Overview

This project consists of two parts:
1. **Main Next.js App** - Your portfolio website (deployed to GitHub Pages)
2. **Sanity Studio** - Content management system (deployed separately to Sanity's hosting)

## Setup Instructions

### 1. Create a Sanity Project

First, you need to create a Sanity project:

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Login to Sanity (creates an account if you don't have one)
sanity login

# Initialize your Sanity project (from the studio directory)
cd studio
sanity init
```

When prompted:
- Choose "Create new project"
- Give your project a name
- Use the default dataset configuration (production)
- It will update your `sanity.config.ts` with your project ID

### 2. Configure Environment Variables

#### For the Studio (studio/.env.local):
```bash
cd studio
cp .env.local.example .env.local
# Edit .env.local and add your project ID
```

#### For the Next.js App (root .env.local):
```bash
cd ..
# Create or edit .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Install Dependencies

```bash
# Install Studio dependencies
cd studio
npm install

# Go back to root and install main app dependencies
cd ..
npm install
```

### 4. Run Sanity Studio Locally

```bash
cd studio
npm run dev
```

The Studio will be available at `http://localhost:3333`

### 5. Deploy Sanity Studio

Sanity Studio needs to be deployed separately from your main site. You have two options:

#### Option A: Deploy to Sanity's Hosting (Recommended)

This is the easiest option and it's free:

```bash
cd studio
npm run deploy
```

This will deploy your Studio to `https://your-project-name.sanity.studio`

#### Option B: Deploy to Vercel/Netlify

You can also deploy the Studio to Vercel or Netlify:

1. Build the studio:
```bash
cd studio
npm run build
```

2. Deploy the `studio/dist` folder to your hosting provider

### 6. Update GitHub Actions (Optional)

If you want to automate the Studio deployment, you can add GitHub Secrets:
- `SANITY_AUTH_TOKEN` - Create at sanity.io/manage

Then add a deployment step to `.github/workflows/deploy.yml` or create a separate workflow.

## How It Works

### Architecture

1. **GitHub Pages Deployment**: 
   - Your Next.js site is built as a static export (`npm run build`)
   - The `out` directory is deployed to GitHub Pages
   - The site is available at `https://vishseen.github.io/react-home-v1/`

2. **Sanity Studio Deployment**:
   - Studio is deployed separately to `https://your-project.sanity.studio`
   - You use the Studio to manage content (projects, profile, etc.)
   - Content is stored in Sanity's cloud

3. **Content Fetching**:
   - Your Next.js site fetches data from Sanity's API
   - Data is fetched at build time (static generation)
   - To update the site with new content, trigger a new GitHub Pages deployment

### Content Management

1. Go to your Sanity Studio URL
2. Create/edit content (projects, profile info, etc.)
3. Content is automatically saved to Sanity
4. Trigger a rebuild of your GitHub Pages site to see changes

### Triggering Rebuilds

When you update content in Sanity Studio, you need to rebuild your GitHub Pages site:

**Option 1: Manual Trigger**
- Go to GitHub Actions → "Deploy to GitHub Pages" → "Run workflow"

**Option 2: Automatic Webhooks** (Advanced)
- Set up a webhook in Sanity to trigger GitHub Actions
- Add webhook URL: `https://api.github.com/repos/VishSeen/react-home-v1/dispatches`
- Use a GitHub Personal Access Token

## Project Structure

```
react-home-v1/
├── studio/                    # Sanity Studio (CMS)
│   ├── schemas/              # Content schemas
│   │   ├── project.ts        # Project schema
│   │   ├── profile.ts        # Profile schema
│   │   └── index.ts
│   ├── sanity.config.ts      # Studio configuration
│   ├── package.json          # Studio dependencies
│   └── tsconfig.json
├── lib/
│   └── sanity/
│       └── client.ts         # Sanity client for Next.js
├── app/                      # Next.js pages
├── components/               # React components
└── ...
```

## Using Sanity Data in Your Components

Example of fetching projects in a component:

```typescript
import { getProjects } from '@/lib/sanity/client'

export default async function ProjectsPage() {
  const projects = await getProjects()
  
  return (
    <div>
      {projects.map((project) => (
        <div key={project._id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  )
}
```

## Important Notes

### Why Separate Deployments?

- **Sanity Studio** is a React SPA that needs its own deployment
- **GitHub Pages** hosts your static Next.js site
- They can't be deployed together because:
  - Studio needs server-side routing
  - GitHub Pages only supports static files
  - Studio requires authentication

### Limitations

1. **Static Site Limitation**: 
   - Your site is static, so new content won't appear until you rebuild
   - Use GitHub Actions to automate rebuilds

2. **No Server-Side Rendering**: 
   - All data is fetched at build time
   - No dynamic content without rebuilding

3. **Studio Access**:
   - Studio is deployed separately
   - You'll have two URLs: one for your site, one for the Studio

## Alternatives

If you need dynamic content without rebuilding:

1. **Deploy to Vercel/Netlify** instead of GitHub Pages
   - Supports ISR (Incremental Static Regeneration)
   - Automatic rebuilds with Sanity webhooks

2. **Use Client-Side Fetching**
   - Fetch data from Sanity on the client side
   - Updates appear without rebuilding
   - But reduces SEO benefits

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Studio Documentation](https://www.sanity.io/docs/sanity-studio)
- [Next.js with Sanity](https://www.sanity.io/guides/nextjs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## Support

For issues with:
- Sanity setup: Check [Sanity's documentation](https://www.sanity.io/docs)
- GitHub Pages deployment: Check [GitHub Pages docs](https://docs.github.com/en/pages)
- This project: Open an issue in the repository
