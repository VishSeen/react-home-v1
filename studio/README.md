# Sanity Studio

This is the content management system (CMS) for the portfolio website.

## Quick Start

### First Time Setup

1. Install Sanity CLI globally:
```bash
npm install -g @sanity/cli
```

2. Login to Sanity:
```bash
sanity login
```

3. Initialize the project:
```bash
sanity init
```

4. Install dependencies:
```bash
npm install
```

5. Copy the environment file:
```bash
cp .env.local.example .env.local
```

6. Update `sanity.config.ts` with your project ID (obtained from `sanity init`)

### Running Locally

Start the development server:
```bash
npm run dev
```

The Studio will be available at http://localhost:3333

### Deployment

Deploy to Sanity's hosting (free):
```bash
npm run deploy
```

Your Studio will be available at `https://your-project-name.sanity.studio`

## Content Schemas

This Studio manages the following content types:

### Project
- Title, slug, description
- Main image
- Technologies used
- Project and GitHub links
- Featured flag
- Display order

### Profile
- Name, bio
- Avatar image
- Email
- Social links (GitHub, LinkedIn, Twitter)
- Skills

## Adding New Content Types

1. Create a new schema file in `schemas/` (e.g., `blogPost.ts`)
2. Define the schema using Sanity's schema definition
3. Export it from `schemas/index.ts`

Example:
```typescript
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    // ... more fields
  ],
})
```

## Documentation

- [Sanity Studio Docs](https://www.sanity.io/docs/sanity-studio)
- [Schema Types](https://www.sanity.io/docs/schema-types)
- [Deploying Studios](https://www.sanity.io/docs/deployment)
