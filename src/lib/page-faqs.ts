// FAQs for the company, Care Navigation and Charge Capture pages, copied from WordPress
// by `npm run import:wp pages`. Edit them in src/data/page-faqs.json.
import data from '../data/page-faqs.json';

export type QA = { q: string; a: string };
export const pageFaqs = (path: string): QA[] => ((data as Record<string, QA[]>)[path] ?? []);
