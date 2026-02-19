import 'piccolore';
import { v as decodeKey } from './chunks/astro/server_DfccWZr5.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_WxYbrMps.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/vedantchourasia/ag/","cacheDir":"file:///Users/vedantchourasia/ag/node_modules/.astro/","outDir":"file:///Users/vedantchourasia/ag/dist/","srcDir":"file:///Users/vedantchourasia/ag/src/","publicDir":"file:///Users/vedantchourasia/ag/public/","buildClientDir":"file:///Users/vedantchourasia/ag/dist/client/","buildServerDir":"file:///Users/vedantchourasia/ag/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.kkPonvKc.css"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.57gj2YiX.css"}],"routeData":{"route":"/admin","isIndex":false,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/save","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/save\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"save","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/save.ts","pathname":"/api/save","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.kkPonvKc.css"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.kkPonvKc.css"}],"routeData":{"route":"/product/[slug]","isIndex":false,"type":"page","pattern":"^\\/product\\/([^/]+?)\\/?$","segments":[[{"content":"product","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/product/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.kkPonvKc.css"}],"routeData":{"route":"/products","isIndex":false,"type":"page","pattern":"^\\/products\\/?$","segments":[[{"content":"products","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/products.astro","pathname":"/products","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.kkPonvKc.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://yourairgunshop.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/vedantchourasia/ag/src/pages/admin.astro",{"propagation":"none","containsHead":true}],["/Users/vedantchourasia/ag/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/vedantchourasia/ag/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/vedantchourasia/ag/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/vedantchourasia/ag/src/pages/product/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/vedantchourasia/ag/src/pages/products.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/admin@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/api/save@_@ts":"pages/api/save.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/product/[slug]@_@astro":"pages/product/_slug_.astro.mjs","\u0000@astro-page:src/pages/products@_@astro":"pages/products.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DlRZCb5Z.mjs","/Users/vedantchourasia/ag/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Rf8AmKuw.mjs","/Users/vedantchourasia/ag/src/pages/products.astro?astro&type=script&index=0&lang.ts":"_astro/products.astro_astro_type_script_index_0_lang.C3uFMkf1.js","/Users/vedantchourasia/ag/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.2aw4hMIK.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/vedantchourasia/ag/src/pages/products.astro?astro&type=script&index=0&lang.ts","const c=document.querySelectorAll(\".filter-btn\"),o=document.querySelectorAll(\".product-item\"),a=document.getElementById(\"empty-msg\");c.forEach(e=>e.addEventListener(\"click\",()=>{const r=e.getAttribute(\"data-category\");c.forEach(t=>{t.classList.remove(\"bg-brand\",\"text-white\",\"border-brand\"),t.classList.add(\"text-muted\",\"border-border\",\"bg-card\")}),e.classList.remove(\"text-muted\",\"border-border\",\"bg-card\"),e.classList.add(\"bg-brand\",\"text-white\",\"border-brand\");let d=0;o.forEach(t=>{const s=r===\"All\"||t.dataset.cat===r;t.style.display=s?\"\":\"none\",s&&d++}),a&&a.classList.toggle(\"hidden\",d>0)}));"],["/Users/vedantchourasia/ag/src/components/Header.astro?astro&type=script&index=0&lang.ts","function s(){const n=()=>document.documentElement.classList.contains(\"dark\");function t(){const e=n();document.getElementById(\"theme-sun\")?.classList.toggle(\"hidden\",!e),document.getElementById(\"theme-moon\")?.classList.toggle(\"hidden\",e),document.getElementById(\"m-theme-sun\")?.classList.toggle(\"hidden\",!e),document.getElementById(\"m-theme-moon\")?.classList.toggle(\"hidden\",e)}function o(){document.documentElement.classList.toggle(\"dark\"),localStorage.setItem(\"theme\",n()?\"dark\":\"light\"),t()}document.getElementById(\"theme-toggle\")?.addEventListener(\"click\",o),document.getElementById(\"mobile-theme-toggle\")?.addEventListener(\"click\",o),t()}function c(){const n=document.getElementById(\"mobile-menu-btn\"),t=document.getElementById(\"mobile-menu\"),o=document.getElementById(\"m-open\"),e=document.getElementById(\"m-close\");n?.addEventListener(\"click\",()=>{const d=!t?.classList.contains(\"hidden\");t?.classList.toggle(\"hidden\"),o?.classList.toggle(\"hidden\",!d),e?.classList.toggle(\"hidden\",d)})}s();c();"]],"assets":["/_astro/about.kkPonvKc.css","/_astro/admin.57gj2YiX.css","/favicon.ico","/favicon.svg","/robots.txt","/images/hero-rifle.png","/images/logo.png","/images/products/nx100.png","/images/products/nx200.png","/images/products/pellets.png","/images/products/px100.png","/images/products/scope.png","/images/products/sx100.png"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"5RitqYya+IhrXJCDwAMTgSTn9liXbfFTlS9SiBEr0EU="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
