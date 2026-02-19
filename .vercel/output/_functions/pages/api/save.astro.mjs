import { s as saveData } from '../../chunks/data_bRGoF-Yz.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const validTypes = ["shop-info", "products", "testimonials"];
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { type, data } = body;
    if (!validTypes.includes(type)) {
      return new Response(JSON.stringify({ error: "Invalid type" }), { status: 400 });
    }
    await saveData(type, data);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
