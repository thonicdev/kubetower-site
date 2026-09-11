import { getCollection, type CollectionEntry } from 'astro:content';

export type DocEntry = CollectionEntry<'docs'>;

/** The docs section's path for an entry. `index` is the section root. */
export function docHref(entry: DocEntry): string {
  return entry.id === 'index' ? '/docs' : `/docs/${entry.id}`;
}

/**
 * Every doc in sidebar order: the overview first, then by `order`, then by
 * title so two files with the same order do not swap places between builds.
 */
export async function getOrderedDocs(): Promise<DocEntry[]> {
  const entries = await getCollection('docs');

  return entries.sort((a, b) => {
    if (a.id === 'index') return -1;
    if (b.id === 'index') return 1;
    return a.data.order - b.data.order || a.data.title.localeCompare(b.data.title);
  });
}
