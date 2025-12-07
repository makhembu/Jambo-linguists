(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/seo/SeoHead.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SeoHead",
    ()=>SeoHead
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/mockDatabase.ts [app-client] (ecmascript) <locals>");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const SeoHead = ({ seo, title, description, path, type = 'website', image, forceNoIndex = false, structuredData })=>{
    _s();
    const globalSeo = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].getSettings().seo;
    const siteName = globalSeo.siteTitle || __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMPANY_INFO"].name;
    // Priority: Prop > SEO Object > Global Default
    const pageTitle = seo?.metaTitle || title || siteName;
    const finalTitle = pageTitle.includes(__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMPANY_INFO"].name) ? pageTitle : `${pageTitle} | ${__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMPANY_INFO"].name}`;
    const pageDescription = seo?.metaDescription || description || globalSeo.siteDescription || "Professional Swahili Translation & Interpreting Services across the UK.";
    const baseUrl = "https://jambolinguists.com";
    const canonical = seo?.canonicalUrl || (path ? `${baseUrl}${path}` : baseUrl);
    const pageImage = seo?.ogImage || image || "https://jambolinguists.com/wp-content/uploads/2025/03/logo-purple.jpeg";
    const shouldIndex = !forceNoIndex && !seo?.noIndex;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SeoHead.useEffect": ()=>{
            // 1. Update Document Title
            document.title = finalTitle;
            // Helper to update/create meta tags
            const updateMeta = {
                "SeoHead.useEffect.updateMeta": (name, content)=>{
                    let element = document.querySelector(`meta[name="${name}"]`);
                    if (!element) {
                        element = document.createElement('meta');
                        element.setAttribute('name', name);
                        document.head.appendChild(element);
                    }
                    element.setAttribute('content', content);
                }
            }["SeoHead.useEffect.updateMeta"];
            // Helper for OpenGraph / Twitter properties
            const updateProperty = {
                "SeoHead.useEffect.updateProperty": (property, content)=>{
                    let element = document.querySelector(`meta[property="${property}"]`);
                    if (!element) {
                        element = document.createElement('meta');
                        element.setAttribute('property', property);
                        document.head.appendChild(element);
                    }
                    element.setAttribute('content', content);
                }
            }["SeoHead.useEffect.updateProperty"];
            // --- Standard Meta ---
            updateMeta('description', pageDescription);
            updateMeta('viewport', 'width=device-width, initial-scale=1.0');
            // Robots (Strict Security & SEO)
            const robotsContent = shouldIndex ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" : "noindex, nofollow";
            updateMeta('robots', robotsContent);
            // Keywords (Merge specific + global defaults)
            const keywords = [
                ...seo?.keywords || [],
                ...globalSeo.defaultKeywords || []
            ];
            const uniqueKeywords = Array.from(new Set(keywords));
            if (uniqueKeywords.length > 0) {
                updateMeta('keywords', uniqueKeywords.join(', '));
            }
            // --- Open Graph ---
            updateProperty('og:title', finalTitle);
            updateProperty('og:description', pageDescription);
            updateProperty('og:type', type);
            updateProperty('og:site_name', siteName);
            updateProperty('og:url', canonical);
            updateProperty('og:image', pageImage);
            updateProperty('og:image:alt', pageTitle);
            updateProperty('og:locale', 'en_GB');
            // --- Twitter Card ---
            updateMeta('twitter:card', 'summary_large_image');
            updateMeta('twitter:title', finalTitle);
            updateMeta('twitter:description', pageDescription);
            updateMeta('twitter:image', pageImage);
            updateMeta('twitter:image:alt', pageTitle);
            // --- Canonical Link ---
            let linkCanonical = document.querySelector(`link[rel="canonical"]`);
            if (canonical) {
                if (!linkCanonical) {
                    linkCanonical = document.createElement('link');
                    linkCanonical.setAttribute('rel', 'canonical');
                    document.head.appendChild(linkCanonical);
                }
                linkCanonical.setAttribute('href', canonical);
            } else if (linkCanonical) {
                linkCanonical.remove();
            }
            // --- Structured Data (JSON-LD) ---
            // Remove existing injected scripts to prevent duplication on nav
            const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
            existingScripts.forEach({
                "SeoHead.useEffect": (s)=>s.remove()
            }["SeoHead.useEffect"]);
            const schemas = [];
            // 1. Global Organization Schema (Always present)
            if (globalSeo.structuredData) {
                try {
                    const globalJson = JSON.parse(globalSeo.structuredData);
                    if (Array.isArray(globalJson)) schemas.push(...globalJson);
                    else schemas.push(globalJson);
                } catch (e) {
                // console.error("Invalid Global JSON-LD");
                }
            }
            // 2. Page Specific Schema from DB settings
            if (seo?.structuredData) {
                try {
                    const pageJson = JSON.parse(seo.structuredData);
                    if (Array.isArray(pageJson)) schemas.push(...pageJson);
                    else schemas.push(pageJson);
                } catch (e) {
                // console.error("Invalid Page JSON-LD from Config");
                }
            }
            // 3. Prop Passed Schema (Dynamic)
            if (structuredData) {
                if (Array.isArray(structuredData)) schemas.push(...structuredData);
                else schemas.push(structuredData);
            }
            // Inject Script
            if (schemas.length > 0) {
                const script = document.createElement('script');
                script.setAttribute('type', 'application/ld+json');
                script.textContent = JSON.stringify({
                    "@context": "https://schema.org",
                    "@graph": schemas
                });
                document.head.appendChild(script);
            }
        }
    }["SeoHead.useEffect"], [
        finalTitle,
        pageDescription,
        shouldIndex,
        seo,
        canonical,
        siteName,
        globalSeo,
        type,
        pageImage,
        structuredData
    ]);
    return null;
};
_s(SeoHead, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = SeoHead;
var _c;
__turbopack_context__.k.register(_c, "SeoHead");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_seo_SeoHead_tsx_4a51c0c4._.js.map