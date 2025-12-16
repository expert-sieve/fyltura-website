# FYLTURA Website

Static website for [fyltura.de](https://fyltura.de) built with Astro and deployed on Cloudflare Pages.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) v5
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Analytics**: Cloudflare Web Analytics (privacy-friendly)

## Project Structure

```
/
├── public/
│   ├── documents/          # PDFs (AGB, etc.)
│   ├── favicon.svg
│   ├── robots.txt
│   ├── _headers            # Cloudflare headers
│   └── _redirects          # Cloudflare redirects
├── src/
│   ├── components/         # Reusable Astro components
│   ├── content/
│   │   └── blog/           # Markdown blog posts
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

## Deployment to Cloudflare Pages

### First-time Setup

1. Push this repository to GitHub/GitLab
2. Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)
3. Create a new project and connect your repository
4. Configure build settings:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Add your custom domain `fyltura.de`

### Automatic Deployments

After setup, every push to the main branch will trigger a deployment.

### Enable Cloudflare Web Analytics

1. Go to Cloudflare Dashboard → Analytics → Web Analytics
2. Add your site and get the beacon script
3. Add to `src/layouts/Layout.astro` before `</body>`:

```html
<!-- Cloudflare Web Analytics -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js'
        data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
```

## Adding Blog Posts

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "Brief description for SEO"
pubDate: 2024-01-15
author: "FYLTURA"
category: "Kompetenzen erkennen"
---

Your content here...
```

## HubSpot Form Integration

The contact page (`src/pages/kontakt.astro`) has a placeholder for HubSpot forms. To enable:

1. Get your HubSpot portal ID and form ID
2. Add the HubSpot script in the contact page:

```html
<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
<script>
  hbspt.forms.create({
    portalId: "YOUR_PORTAL_ID",
    formId: "YOUR_FORM_ID",
    target: "#hubspot-form"
  });
</script>
```

## URL Structure

All URLs match the original WordPress site for SEO preservation:

- `/` - Homepage
- `/loesungen/` - Solutions
- `/preise/` - Pricing
- `/coding-tests/` - Coding Tests product page
- `/persoenlichkeitstest/` - Personality Test product page
- `/blog/` - Blog listing
- `/blog/[slug]/` - Individual blog posts
- `/kontakt/` - Contact
- `/impressum/` - Legal notice
- `/datenschutz/` - Privacy policy
- `/agb/` - Terms and conditions

## License

Copyright © Expert Sieve UG (haftungsbeschränkt). All rights reserved.
