import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per service page in src/content/services/<service-slug>.md
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    /** Large sentence under the page title */
    lead: z.string(),
    /** Describes the banner photo for screen readers and Google Images */
    heroAlt: z.string(),
    /** Three short points shown beside the banner */
    highlights: z.array(z.string()).max(4).default([]),
    /** "Related questions": write them around this page's keywords */
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { services };
