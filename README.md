# FYLTURA Website

Static website for [fyltura.de](https://fyltura.de) built with Astro and deployed on Vercel.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) v5
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **Hosting**: [Vercel](https://vercel.com/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics) (privacy-friendly)
- **DNS**: AWS Route 53

## Project Structure

```
/
├── public/
│   ├── images/             # Site images and blog images
│   ├── favicon.svg
│   ├── og-image.jpg        # Open Graph image
│   └── robots.txt
├── src/
│   ├── components/         # Reusable Astro components
│   ├── content/
│   │   └── blog/           # Markdown blog posts (35 articles)
│   ├── layouts/
│   │   └── Layout.astro    # Base layout with SEO
│   ├── pages/              # Route pages
│   └── styles/
│       └── global.css      # Tailwind config & global styles
├── astro.config.mjs
└── package.json
```

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start dev server at `localhost:4321`        |
| `npm run build`   | Build for production to `./dist/`           |
| `npm run preview` | Preview production build locally            |

## Deployment

### Vercel (Production)

The site auto-deploys on every push to `main` via GitHub integration.

**Build Settings:**
- Framework Preset: Astro
- Build Command: `npm run build`
- Output Directory: `dist`

### DNS Configuration (Route 53)

| Record | Type | Value |
|--------|------|-------|
| `fyltura.de` | A | `216.198.79.1` |
| `www.fyltura.de` | CNAME | `c7932e53a24ca5eb.vercel-dns-017.com` |

## Adding Blog Posts

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "Brief description for SEO"
pubDate: 2024-01-15
author: "FYLTURA"
category: "Persönlichkeit"
image: "/images/blog/your-image.jpg"
---

Your content here...
```

**Available categories:**
- `Persönlichkeit` - Big Five personality topics
- `Experteninterviews` - Expert interviews
- `Eignungsdiagnostik` - Assessment diagnostics
- `HR Praxis` - HR best practices
- `Unternehmen` - Company news

## URL Structure

All URLs match the original site for SEO preservation:

- `/` - Homepage
- `/loesungen/` - Solutions
- `/preise/` - Pricing
- `/coding-tests/` - Coding Tests product page
- `/persoenlichkeitstest/` - Personality Test product page
- `/blog/` - Blog listing with category filter
- `/blog/[slug]/` - Individual blog posts
- `/kontakt/` - Contact
- `/impressum/` - Legal notice
- `/datenschutz/` - Privacy policy
- `/agb/` - Terms and conditions

## External Services

- **Demo Booking**: [OneCal](https://app.onecal.io/b/fyltura/fyltura-kennenlernen)
- **App**: [app.fyltura.de](https://app.fyltura.de)

## License

Copyright © Expert Sieve UG (haftungsbeschränkt). All rights reserved.
