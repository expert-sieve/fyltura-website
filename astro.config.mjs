// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://fyltura.de',
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const lastmodByUrl = {
          'https://fyltura.de/blog/die-big-five-das-geruest-unserer-persoenlichkeit/': '2026-05-06',
          'https://fyltura.de/blog/das-verkannte-potenzial-von-persoenlichkeitstests-fuer-die-personalauswahl/': '2026-05-06',
          'https://fyltura.de/blog/high-volume-recruiting-qualitaet-statt-quantitaet/': '2026-05-08',
        };
        const lastmod = lastmodByUrl[item.url];
        if (lastmod) return { ...item, lastmod };
        return item;
      },
    })
  ],

  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: {
      enabled: true
    }
  }),

  // Static site generation for best performance
  output: 'static',
});
