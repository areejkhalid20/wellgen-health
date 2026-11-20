// Detail pages ("topics") that sit under a service.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Category, Service } from '../data/services';
import { serviceUrl } from '../data/services';

export type Topic = CollectionEntry<'topics'> & { slug: string; serviceSlug: string };

export async function getTopics(serviceSlug?: string): Promise<Topic[]> {
  const all = await getCollection('topics');
  return all
    .map((t) => {
      const [svc, slug] = t.id.split('/');
      return { ...t, serviceSlug: svc, slug } as Topic;
    })
    .filter((t) => !serviceSlug || t.serviceSlug === serviceSlug)
    .sort((a, b) => a.data.order - b.data.order);
}

export const topicUrl = (c: Category, s: Service, topicSlug: string) => `${serviceUrl(c, s)}${topicSlug}/`;
