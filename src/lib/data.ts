import { put, list } from '@vercel/blob';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import defaultShopInfo from '../data/shop-info.json';
import defaultProducts from '../data/products.json';
import defaultTestimonials from '../data/testimonials.json';
import defaultTheme from '../data/theme.json';
import defaultSiteContent from '../data/site-content.json';

const isVercel = !!import.meta.env.VERCEL;
const localDataDir = join(dirname(fileURLToPath(import.meta.url)), '../data');

const fileMap: Record<string, string> = {
  'shop-info': 'shop-info.json',
  'products': 'products.json',
  'testimonials': 'testimonials.json',
  'theme': 'theme.json',
  'site-content': 'site-content.json',
};

const defaults: Record<string, any> = {
  'shop-info': defaultShopInfo,
  'products': defaultProducts,
  'testimonials': defaultTestimonials,
  'theme': defaultTheme,
  'site-content': defaultSiteContent,
};

export async function getData(type: string): Promise<any> {
  if (isVercel) {
    try {
      const { blobs } = await list({ prefix: `data/${fileMap[type]}`, limit: 1 });
      if (blobs.length > 0) {
        const res = await fetch(blobs[0].url);
        return await res.json();
      }
    } catch {
      // Blob not found or token not set — fall through to defaults
    }
    return structuredClone(defaults[type]);
  }

  try {
    const content = await readFile(join(localDataDir, fileMap[type]), 'utf-8');
    return JSON.parse(content);
  } catch {
    return structuredClone(defaults[type]);
  }
}

export async function saveData(type: string, data: any): Promise<void> {
  const filename = fileMap[type];
  if (!filename) throw new Error(`Unknown data type: ${type}`);

  if (isVercel) {
    await put(`data/${filename}`, JSON.stringify(data, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
    });
  } else {
    await writeFile(
      join(localDataDir, filename),
      JSON.stringify(data, null, 2),
      'utf-8'
    );
  }
}
