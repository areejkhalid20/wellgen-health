// Finds photos in src/assets/images by folder and name, e.g. findImage('services', 'hypertension').
// Any of .jpg .jpeg .png .webp works. Missing photos return undefined and the page shows a placeholder.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

export function findImage(folder: string, name: string): ImageMetadata | undefined {
  const prefix = `/src/assets/images/${folder}/${name}.`;
  const key = Object.keys(files).find((k) => k.toLowerCase().startsWith(prefix.toLowerCase()));
  return key ? files[key].default : undefined;
}
