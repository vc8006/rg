import type { APIRoute } from 'astro';
import { saveData } from '../../lib/data';

export const prerender = false;

const validTypes = ['shop-info', 'products', 'testimonials'];

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (!validTypes.includes(type)) {
      return new Response(JSON.stringify({ error: 'Invalid type' }), { status: 400 });
    }

    await saveData(type, data);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
