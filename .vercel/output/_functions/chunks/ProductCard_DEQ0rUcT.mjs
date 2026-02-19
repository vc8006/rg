import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate } from './astro/server_DfccWZr5.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro("https://yourairgunshop.com");
const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductCard;
  const { slug, name, brand, category, price, originalPrice, image, inStock, caliber } = Astro2.props;
  const discount = originalPrice ? Math.round((originalPrice - price) / originalPrice * 100) : 0;
  const fmt = (p) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/product/${slug}`, "href")} class="product-card group block rounded-lg border border-border hover:border-border-hover hover:shadow-md bg-card transition-all duration-200"> <div class="relative overflow-hidden bg-bg-alt rounded-t-lg aspect-[4/3] flex items-center justify-center p-5"> <img${addAttribute(image, "src")}${addAttribute(name, "alt")} class="product-image max-h-full max-w-full object-contain transition-transform duration-300" loading="lazy"> ${discount > 0 && renderTemplate`<span class="absolute top-2 left-2 bg-brand text-white text-[10px] font-bold px-1.5 py-0.5 rounded">-${discount}%</span>`} ${!inStock && renderTemplate`<div class="absolute inset-0 bg-bg/70 flex items-center justify-center"><span class="text-red text-xs font-semibold bg-red-bg px-3 py-1 rounded-full">Out of Stock</span></div>`} </div> <div class="p-4"> <div class="flex items-center gap-1.5 mb-1 text-[11px]"> <span class="uppercase tracking-wider font-medium text-muted">${brand}</span> <span class="text-faint">·</span> <span class="text-brass font-medium">${category}</span> </div> <h3 class="text-heading text-[15px] font-semibold leading-snug mb-0.5 group-hover:text-brand transition-colors">${name}</h3> <p class="text-muted text-xs mb-3">${caliber}</p> <div class="flex items-baseline gap-2 pt-3 border-t border-border"> <span class="text-heading font-bold">${fmt(price)}</span> ${originalPrice && originalPrice > price && renderTemplate`<span class="text-faint text-xs line-through">${fmt(originalPrice)}</span>`} </div> </div> </a>`;
}, "/Users/vedantchourasia/ag/src/components/ProductCard.astro", void 0);

export { $$ProductCard as $ };
