import { f as createComponent, k as renderComponent, p as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DfccWZr5.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_7A3Fm1_F.mjs';
import { $ as $$ProductCard } from '../chunks/ProductCard_DEQ0rUcT.mjs';
import { g as getData } from '../chunks/data_bRGoF-Yz.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Products = createComponent(async ($$result, $$props, $$slots) => {
  const products = await getData("products");
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Products", "description": "Browse our complete range of airguns, pellets, and accessories." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-bg-alt border-b border-border"> <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8"> <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-brass mb-1">Shop</p> <h1 class="text-2xl font-bold text-heading tracking-tight mb-1">Our Products</h1> <p class="text-muted text-sm">Explore our complete range of airguns, pellets, and accessories. All 100% genuine with warranty.</p> </div> </section> <section> <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8"> <div class="flex flex-wrap items-center gap-2 mb-6"> ${categories.map((cat) => renderTemplate`<button${addAttribute(cat, "data-category")}${addAttribute(["filter-btn px-3 py-1.5 rounded-full text-[13px] font-medium border transition-all cursor-pointer", cat === "All" ? "bg-brand text-white border-brand" : "text-muted border-border hover:border-border-hover hover:text-heading bg-card"], "class:list")}> ${cat} </button>`)} </div> <div id="product-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"> ${products.map((p) => renderTemplate`<div${addAttribute(p.category, "data-cat")} class="product-item"> ${renderComponent($$result2, "ProductCard", $$ProductCard, { "slug": p.slug, "name": p.name, "brand": p.brand, "category": p.category, "price": p.price, "originalPrice": p.originalPrice, "image": p.images[0], "inStock": p.inStock, "caliber": p.caliber })} </div>`)} </div> <p id="empty-msg" class="hidden text-center py-16 text-muted">No products found in this category.</p> </div> </section> ` })} ${renderScript($$result, "/Users/vedantchourasia/ag/src/pages/products.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/vedantchourasia/ag/src/pages/products.astro", void 0);

const $$file = "/Users/vedantchourasia/ag/src/pages/products.astro";
const $$url = "/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Products,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
