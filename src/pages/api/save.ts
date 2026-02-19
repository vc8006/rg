import type { APIRoute } from 'astro';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const prerender = false;

const dataDir = join(dirname(fileURLToPath(import.meta.url)), '../../data');

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { type, data } = body;

    const files: Record<string, string> = {
      'shop-info': 'shop-info.json',
      'products': 'products.json',
      'testimonials': 'testimonials.json',
    };

    const filename = files[type];
    if (!filename) {
      return new Response(JSON.stringify({ error: 'Invalid type' }), { status: 400 });
    }

    const filePath = join(dataDir, filename);
    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
