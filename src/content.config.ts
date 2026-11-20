import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = z.object({ q: z.string(), a: z.string() });

// Service overview pages: src/content/services/<service-slug>.md
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    /** Large sentence under the page title */
    lead: z.string(),
    /** Describes the banner photo for screen readers and Google Images */
    heroAlt: z.string(),
    /** Three short points shown beside the banner */
    highlights: z.array(z.string()).max(4).default([]),
    /** "Questions people ask": write them around this page's keywords */
    faqs: z.array(faq).default([]),
  }),
});

// Detail pages under a service: src/content/topics/<service-slug>/<topic-slug>.md
// e.g. topics/diabetes-and-endocrinology/causes-and-risk-factors.md
//   → /services/primary-preventive-care/diabetes-and-endocrinology/causes-and-risk-factors/
const topics = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/topics' }),
  schema: z.object({
    title: z.string(),
    /** Position in the service's sequence of detail pages (1, 2, 3...) */
    order: z.number(),
    /** Two sentences shown on the service overview page */
    summary: z.string(),
    /** Three or four key points shown on the overview card */
    points: z.array(z.string()).max(4).default([]),
    /** Opening sentence under the title on the detail page */
    lead: z.string(),
    /** The WordPress URL that will redirect here at launch */
    oldPath: z.string().optional(),
    faqs: z.array(faq).default([]),
  }),
});

export const collections = { services, topics };
