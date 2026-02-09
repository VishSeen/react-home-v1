<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Vish Seen Portfolio

A high-performance, aesthetically pleasing portfolio website featuring a Bento-grid layout and an integrated Gemini AI assistant.

View your app in AI Studio: https://ai.studio/apps/drive/1IWYaF24TraLbKtdJngYF9IM175j1i9-P

## 🚀 Features

- Modern Next.js 15 with TypeScript
- Deployed to GitHub Pages
- **Sanity CMS Integration** for content management
- Tailwind CSS for styling
- Gemini AI assistant

## 📋 Prerequisites

- Node.js 20+
- npm or yarn

## 🏃 Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key

3. (Optional) Configure Sanity if you want to use CMS features:
   - See [SANITY_SETUP.md](./SANITY_SETUP.md) for detailed instructions

4. Run the app:
   ```bash
   npm run dev
   ```

## 📝 Content Management with Sanity Studio

This project supports Sanity Studio for managing your portfolio content (projects, profile, etc.).

**Can you use Sanity Studio with GitHub Pages?** Yes! But it requires a specific setup:

- Your **main portfolio site** deploys to GitHub Pages (static)
- Your **Sanity Studio** (CMS) deploys separately to Sanity's hosting
- They work together seamlessly!

For complete setup instructions, see **[SANITY_SETUP.md](./SANITY_SETUP.md)**

### Quick Start with Sanity

```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Go to studio directory
cd studio

# Initialize your Sanity project
sanity init

# Run Studio locally
npm run dev

# Deploy Studio to Sanity hosting
npm run deploy
```

## 🌐 Deployment

This project is configured for GitHub Pages deployment. The workflow is in `.github/workflows/deploy.yml`.

To deploy:
1. Push to the `main` branch
2. GitHub Actions will automatically build and deploy to GitHub Pages

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Setup Guide](./SANITY_SETUP.md)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GitHub Pages](https://docs.github.com/en/pages)
