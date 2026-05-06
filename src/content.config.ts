import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('FYLTURA'),
    category: z.enum([
      'Persönlichkeit',
      'Experteninterviews',
      'Eignungsdiagnostik',
      'HR Praxis',
      'Unternehmen'
    ]).default('HR Praxis'),
    series: z.string().optional(), // e.g., "Big Five", "Neurotizismus", "Extraversion"
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    seoTitle: z.string().optional(),
    jsonLd: z.string().optional(),
  }),
});

export const collections = { blog };
