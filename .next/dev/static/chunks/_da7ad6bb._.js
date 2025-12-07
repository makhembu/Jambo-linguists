(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/Theme.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "ThemeToggle",
    ()=>ThemeToggle,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    isDark: false,
    toggleTheme: (event)=>{}
});
const useTheme = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
};
_s(useTheme, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
const ThemeProvider = ({ children })=>{
    _s1();
    const [isDark, setIsDark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            // Check local storage or system preference
            const stored = localStorage.getItem('theme');
            if (stored === 'dark' || !stored && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setIsDark(true);
                document.documentElement.classList.add('dark');
            } else {
                setIsDark(false);
                document.documentElement.classList.remove('dark');
            }
        }
    }["ThemeProvider.useEffect"], []);
    const toggleTheme = (event)=>{
        const hasViewTransition = ()=>'startViewTransition' in document;
        if (!hasViewTransition()) {
            // Fallback for older browsers
            setIsDark((prev)=>{
                const next = !prev;
                if (next) {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                }
                return next;
            });
            return;
        }
        const x = event?.clientX ?? window.innerWidth / 2;
        const y = event?.clientY ?? window.innerHeight / 2;
        document.documentElement.style.setProperty('--x', `${x}px`);
        document.documentElement.style.setProperty('--y', `${y}px`);
        // Using `as any` to avoid TS errors for this new API
        const transition = document.startViewTransition(()=>{
            setIsDark((prev)=>{
                const next = !prev;
                if (next) {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                }
                return next;
            });
        });
        transition.finished.then(()=>{
            document.documentElement.style.removeProperty('--x');
            document.documentElement.style.removeProperty('--y');
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            isDark,
            toggleTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/Theme.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(ThemeProvider, "q9ovQTvwIdpxeVii6kJLTuTYpwE=");
_c = ThemeProvider;
const ThemeToggle = ({ className = '', lightModeClass = 'bg-gray-100 text-gray-600 hover:bg-gray-200' })=>{
    _s2();
    const { isDark, toggleTheme } = useTheme();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: (e)=>toggleTheme(e),
        className: `p-2 rounded-full transition-all duration-300 ${isDark ? 'bg-white/10 text-yellow-300 hover:bg-white/20' : lightModeClass} ${className}`,
        "aria-label": "Toggle Dark Mode",
        children: isDark ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/components/Theme.tsx",
            lineNumber: 85,
            columnNumber: 17
        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/components/Theme.tsx",
            lineNumber: 85,
            columnNumber: 37
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/Theme.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s2(ThemeToggle, "r7S/iip9RxifvRUYc8CwwLPqz2s=", false, function() {
    return [
        useTheme
    ];
});
_c1 = ThemeToggle;
var _c, _c1;
__turbopack_context__.k.register(_c, "ThemeProvider");
__turbopack_context__.k.register(_c1, "ThemeToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COMPANY_INFO",
    ()=>COMPANY_INFO
]);
const COMPANY_INFO = {
    name: "Jambo Linguists Limited",
    logoUrl: "https://jambolinguists.com/wp-content/uploads/2025/03/logo-purple.jpeg",
    address: [
        "First Floor, Radley House",
        "Richardshaw Rd",
        "Pudsey, LS28 6LE",
        "United Kingdom"
    ],
    phone: "+44 7938 065 717",
    email: "jamii@jambolinguists.com",
    regNumber: "15333696"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navbar",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Theme$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Theme.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/constants.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const Navbar = ()=>{
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            const handleScroll = {
                "Navbar.useEffect.handleScroll": ()=>{
                    const offset = window.scrollY || window.pageYOffset;
                    setScrolled(offset > 20);
                }
            }["Navbar.useEffect.handleScroll"];
            window.addEventListener('scroll', handleScroll);
            return ({
                "Navbar.useEffect": ()=>window.removeEventListener('scroll', handleScroll)
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], []);
    const handleNav = (page)=>{
        router.push(page);
        setIsOpen(false);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    // Helper to check if current page
    const isCurrentPage = (page)=>{
        if (page === '/') return pathname === '/';
        return pathname.startsWith(page);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: `fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 transform-gpu ${scrolled || isOpen ? 'bg-jambo-600/95 dark:bg-jambo-950/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4 md:py-6'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>handleNav('/'),
                            className: `flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 origin-left ${scrolled ? 'h-10 md:h-12' : 'h-10 md:h-14 lg:h-20'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMPANY_INFO"].logoUrl,
                                alt: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMPANY_INFO"].name,
                                className: "h-full w-auto object-contain rounded-lg",
                                loading: "eager"
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 51,
                                columnNumber: 14
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:flex items-center gap-2 lg:gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleNav('/'),
                                className: `text-[11px] lg:text-sm uppercase tracking-wider font-medium transition-colors relative group py-2 ${isCurrentPage('/') ? 'text-white' : 'text-jambo-100 hover:text-white'}`,
                                children: [
                                    "Home",
                                    isCurrentPage('/') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 67,
                                        columnNumber: 36
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleNav('/about'),
                                className: `text-[11px] lg:text-sm uppercase tracking-wider font-medium transition-colors relative group py-2 ${isCurrentPage('/about') ? 'text-white' : 'text-jambo-100 hover:text-white'}`,
                                children: [
                                    "About Us",
                                    isCurrentPage('/about') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 75,
                                        columnNumber: 41
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleNav('/services'),
                                className: `text-[11px] lg:text-sm uppercase tracking-wider font-medium transition-colors relative group py-2 ${isCurrentPage('/services') ? 'text-white' : 'text-jambo-100 hover:text-white'}`,
                                children: [
                                    "Services",
                                    isCurrentPage('/services') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 83,
                                        columnNumber: 44
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleNav('/blog'),
                                className: `text-[11px] lg:text-sm uppercase tracking-wider font-medium transition-colors relative group py-2 ${isCurrentPage('/blog') ? 'text-white' : 'text-jambo-100 hover:text-white'}`,
                                children: [
                                    "Blog",
                                    isCurrentPage('/blog') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 91,
                                        columnNumber: 40
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleNav('/portal'),
                                className: "text-[10px] lg:text-xs uppercase tracking-widest font-bold border border-brand-orange text-brand-orange px-3 lg:px-4 py-1.5 lg:py-2 rounded-full hover:bg-brand-orange hover:text-white transition-all ml-1 lg:ml-4 whitespace-nowrap",
                                children: "Linguist Portal"
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 md:gap-3 lg:gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Theme$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeToggle"], {
                                className: "hidden md:block border border-white/10",
                                lightModeClass: "bg-white/10 text-white hover:bg-white/20"
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 lg:gap-2 bg-white/10 hover:bg-white/20 px-2 lg:px-4 py-1.5 lg:py-2 rounded-full transition-all cursor-pointer border border-white/20 backdrop-blur-sm group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm lg:text-lg shadow-sm group-hover:scale-110 transition-transform",
                                        children: "🇬🇧"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] lg:text-xs font-bold text-white tracking-widest",
                                        children: "EN"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                        size: 14,
                                        className: "text-white/80 hidden sm:block"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors z-50 relative",
                                onClick: ()=>setIsOpen(!isOpen),
                                "aria-label": "Toggle menu",
                                children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 24
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 120,
                                    columnNumber: 23
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    size: 24
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 120,
                                    columnNumber: 41
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/Navbar.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-full left-0 right-0 bg-jambo-600 dark:bg-jambo-950 border-t border-white/10 shadow-2xl p-6 md:hidden animate-in slide-in-from-top-4 fade-in duration-200 h-[calc(100vh-64px)] flex flex-col overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-6 text-center pt-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleNav('/'),
                            className: "text-white text-xl font-medium hover:text-jambo-200 uppercase tracking-widest py-2",
                            children: "Home"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.tsx",
                            lineNumber: 129,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleNav('/about'),
                            className: "text-jambo-100 text-xl font-light hover:text-white uppercase tracking-widest py-2",
                            children: "About Us"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.tsx",
                            lineNumber: 130,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleNav('/services'),
                            className: "text-jambo-100 text-xl font-light hover:text-white uppercase tracking-widest py-2",
                            children: "Services"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.tsx",
                            lineNumber: 131,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleNav('/blog'),
                            className: "text-jambo-100 text-xl font-light hover:text-white uppercase tracking-widest py-2",
                            children: "Blog"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.tsx",
                            lineNumber: 132,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center py-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Theme$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeToggle"], {
                                lightModeClass: "bg-white/10 text-white w-12 h-12 flex items-center justify-center"
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 135,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.tsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-px bg-white/20 mx-auto my-2"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.tsx",
                            lineNumber: 138,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleNav('/portal'),
                            className: "text-brand-orange text-xl font-bold border-2 border-brand-orange mx-auto px-8 py-3 rounded-full hover:bg-brand-orange hover:text-white uppercase tracking-widest transition-all mt-4",
                            children: "Linguist Portal"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.tsx",
                            lineNumber: 140,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Navbar.tsx",
                    lineNumber: 128,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/Navbar.tsx",
                lineNumber: 127,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/Navbar.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Navbar, "Bi1rBZi1pikfeYwbUAAt+E76N1s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/facebook.js [app-client] (ecmascript) <export default as Facebook>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/linkedin.js [app-client] (ecmascript) <export default as Linkedin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const Footer = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-jambo-600 dark:bg-black/30 pt-20 pb-10 px-6 text-white border-t border-white/5 backdrop-blur-sm transition-colors duration-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-white font-bold mb-6 text-lg border-b border-white/20 pb-2 inline-block",
                                children: "Visit Us"
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 16,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("address", {
                                className: "text-jambo-100 not-italic leading-loose font-light text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        className: "text-white font-medium block mb-1",
                                        children: "Jambo Linguists Ltd"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.tsx",
                                        lineNumber: 18,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "First Floor, Radley House,",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/components/Footer.tsx",
                                        lineNumber: 19,
                                        columnNumber: 39
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Richardshaw Rd,",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/components/Footer.tsx",
                                        lineNumber: 20,
                                        columnNumber: 28
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Pudsey, LS28 6LE"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 17,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-white font-bold mb-6 text-lg border-b border-white/20 pb-2 inline-block",
                                children: "Contact"
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 27,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "mailto:jamii@jambolinguists.com",
                                        className: "block text-white font-medium hover:text-jambo-200 transition-colors flex items-center gap-2 cursor-pointer w-fit",
                                        children: "jamii@jambolinguists.com"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.tsx",
                                        lineNumber: 29,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-jambo-100 font-mono",
                                        children: "+44 7938 065 717"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.tsx",
                                        lineNumber: 32,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-jambo-100 font-mono",
                                        children: "+44 7938 065 718"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.tsx",
                                        lineNumber: 33,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-white font-bold mb-6 text-lg border-b border-white/20 pb-2 inline-block",
                                children: "Social"
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4",
                                children: [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__["Facebook"],
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"],
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__["Linkedin"]
                                ].map((Icon, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#",
                                        className: "w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-jambo-600 transition-all hover:-translate-y-1 cursor-pointer",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 43,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, i, false, {
                                        fileName: "[project]/components/Footer.tsx",
                                        lineNumber: 42,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-white font-bold mb-6 text-lg border-b border-white/20 pb-2 inline-block",
                                children: "Memberships"
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white p-2 rounded-full h-14 w-14 flex items-center justify-center shadow-lg hover:scale-105 transition-transform",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-[10px] text-jambo-600 font-bold leading-none text-center",
                                            children: "AITI"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 55,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.tsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white px-3 py-1 rounded h-10 flex items-center justify-center shadow-lg hover:scale-105 transition-transform",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-[10px] text-gray-800 font-bold uppercase",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "bg-gray-800 text-white px-1 mr-1",
                                                    children: "CIOL"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Footer.tsx",
                                                    lineNumber: 59,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Associate"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 58,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.tsx",
                                        lineNumber: 57,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/Footer.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-jambo-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "© ",
                            new Date().getFullYear(),
                            " Jambo Linguists. Company House No: 15333696"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-6 mt-4 md:mt-0 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#",
                                className: "hover:text-white transition-colors underline decoration-white/30 hover:decoration-white cursor-pointer",
                                children: "Privacy & Cookie Policy"
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push('/admin'),
                                className: "flex items-center gap-1 hover:text-white transition-colors opacity-70 hover:opacity-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                        size: 10
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.tsx",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Staff Login"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/Footer.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/Footer.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Footer, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/source/jobs.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialJobs",
    ()=>initialJobs
]);
const MOCK_USER_ID = 'u-123456'; // Linah's ID
const ADMIN_ID = 'u-admin-001';
const CLIENT_ID = 'u-client-001';
const now = new Date().toISOString();
const initialJobs = [
    // --- FUTURE JOBS (REQUESTED) ---
    {
        id: 'JL-FUTURE-01',
        linguistId: MOCK_USER_ID,
        postedBy: ADMIN_ID,
        category: 'Interpreting',
        type: 'Face-to-Face',
        status: 'Scheduled',
        title: 'Christmas Day Emergency Cover',
        description: 'On-call interpreting for emergency A&E admissions. High priority cover required for potential trauma cases.',
        date: '2025-12-25',
        time: '08:00 AM',
        finishTime: '04:00 PM',
        duration: '8h 00m',
        location: 'Leeds General Infirmary, A&E',
        languagePair: 'English <> Swahili',
        rate: '£60/hr (Holiday Rate)',
        isUrgent: true,
        distance: 5,
        hourlyRate: 60,
        mileageRate: 0.45,
        travelHours: 0.5,
        travelRate: 15,
        createdAt: '2025-10-01T09:00:00Z',
        updatedAt: '2025-10-01T10:30:00Z',
        deletedAt: null,
        history: [
            {
                id: 'h1',
                type: 'CREATED',
                date: '2025-10-01T09:00:00Z',
                actorName: 'Jambo Admin',
                description: 'Job created in system'
            },
            {
                id: 'h1_1',
                type: 'ASSIGNED',
                date: '2025-10-01T09:05:00Z',
                actorName: 'Jambo Admin',
                description: 'Marked as urgent priority'
            },
            {
                id: 'h2',
                type: 'ASSIGNED',
                date: '2025-10-01T10:30:00Z',
                actorName: 'Jambo Admin',
                description: 'Assigned to Linah Makembu'
            }
        ]
    },
    {
        id: 'JL-FUTURE-02',
        linguistId: MOCK_USER_ID,
        postedBy: ADMIN_ID,
        category: 'Translation',
        type: 'Document',
        status: 'Scheduled',
        title: 'End of Year Legal Report',
        description: 'Translation of annual summary for corporate client. Requires formatting to match original.',
        date: '2025-12-12',
        deadlineTime: '17:00',
        duration: '5 days',
        wordCount: 5000,
        location: 'Remote',
        languagePair: 'English > Swahili',
        rate: '12p/word',
        isUrgent: false,
        distance: 0,
        wordRate: 0.12,
        createdAt: '2025-10-05T14:00:00Z',
        updatedAt: '2025-10-06T09:15:00Z',
        deletedAt: null,
        attachments: [
            {
                name: 'Legal_Report_2024_Source.pdf',
                type: 'file',
                url: '#'
            },
            {
                name: 'Style_Guide_v3.docx',
                type: 'file',
                url: '#'
            }
        ],
        history: [
            {
                id: 'h3',
                type: 'CREATED',
                date: '2025-10-05T14:00:00Z',
                actorName: 'Jambo Admin'
            },
            {
                id: 'h4',
                type: 'ASSIGNED',
                date: '2025-10-06T09:15:00Z',
                actorName: 'Jambo Admin',
                description: 'Assigned to Linah Makembu'
            }
        ]
    },
    {
        id: 'JL-FUTURE-03',
        linguistId: null,
        postedBy: ADMIN_ID,
        category: 'Interpreting',
        type: 'Video',
        status: 'Open',
        title: 'International Conference: Health Equity',
        description: 'Simultaneous interpreting for a breakout session on East African public health initiatives.',
        date: '2025-11-15',
        time: '09:00 AM',
        finishTime: '05:00 PM',
        duration: '8h 00m',
        location: 'Remote (Zoom)',
        languagePair: 'English <> Swahili',
        rate: '£350/day',
        isUrgent: false,
        distance: 0,
        fixedRate: 350,
        createdAt: '2025-10-10T11:00:00Z',
        updatedAt: '2025-10-10T11:00:00Z',
        deletedAt: null,
        history: [
            {
                id: 'h5',
                type: 'CREATED',
                date: '2025-10-10T11:00:00Z',
                actorName: 'Jambo Admin'
            }
        ]
    },
    // --- AVAILABLE JOBS (Open - No Linguist Assigned) ---
    {
        id: 'JL-1001',
        linguistId: null,
        postedBy: CLIENT_ID,
        category: 'Interpreting',
        type: 'Face-to-Face',
        status: 'Open',
        title: 'Medical Consultation Interpreting',
        description: 'Face-to-face interpreting required for a pre-op assessment at Leeds General Infirmary. Patient speaks Swahili. Terminology will focus on cardiology.',
        date: '2025-10-24',
        time: '09:30 AM',
        finishTime: '12:00 PM',
        duration: '2h 30m',
        location: 'Leeds General Infirmary, Clarendon Wing',
        languagePair: 'English <> Swahili',
        rate: '£30/hr',
        isUrgent: true,
        distance: 2.4,
        hourlyRate: 30,
        mileageRate: 0.45,
        travelHours: 1,
        travelRate: 15,
        requiredCourseIds: [
            'c-102'
        ],
        createdAt: '2025-10-20T09:00:00Z',
        updatedAt: '2025-10-20T09:00:00Z',
        deletedAt: null,
        attachments: [
            {
                name: 'Patient_Notes_Redacted.pdf',
                type: 'file',
                url: '#'
            }
        ],
        history: [
            {
                id: 'h8',
                type: 'CREATED',
                date: '2025-10-20T09:00:00Z',
                actorName: 'NHS Trust',
                description: 'Request received from LGI Portal'
            }
        ]
    },
    {
        id: 'JL-1002',
        linguistId: null,
        postedBy: ADMIN_ID,
        category: 'Interpreting',
        type: 'Face-to-Face',
        status: 'Open',
        title: 'Magistrates Court Hearing',
        description: 'Court interpreter needed for a plea hearing. Must be familiar with UK legal terminology and court protocols. Smart dress code required.',
        date: '2025-10-25',
        time: '02:00 PM',
        finishTime: '05:00 PM',
        duration: '3h 00m',
        location: 'Bradford Magistrates Court',
        languagePair: 'English <> Swahili',
        rate: '£32/hr',
        isUrgent: false,
        distance: 8.1,
        hourlyRate: 32,
        mileageRate: 0.45,
        travelHours: 1.5,
        travelRate: 15,
        requiredCourseIds: [
            'c-103'
        ],
        createdAt: '2025-10-21T10:00:00Z',
        updatedAt: '2025-10-21T10:00:00Z',
        deletedAt: null,
        attachments: [
            {
                name: 'Case_Listing_Brief.pdf',
                type: 'file',
                url: '#'
            }
        ],
        history: [
            {
                id: 'h9',
                type: 'CREATED',
                date: '2025-10-21T10:00:00Z',
                actorName: 'Jambo Admin'
            }
        ]
    },
    {
        id: 'JL-1003',
        linguistId: null,
        postedBy: CLIENT_ID,
        category: 'Translation',
        type: 'Document',
        status: 'Open',
        title: 'Legal Contract Translation',
        description: 'Translate a tenancy agreement document from English to Swahili. Accuracy and legal terminology are critical. Document length is approx 2,500 words.',
        date: '2025-10-28',
        deadlineTime: '17:00',
        duration: 'Est. 6 hours',
        wordCount: 2500,
        location: 'Remote (Document Download)',
        languagePair: 'English > Swahili',
        rate: '10p/word',
        isUrgent: false,
        distance: 0,
        wordRate: 0.10,
        createdAt: '2025-10-22T11:30:00Z',
        updatedAt: '2025-10-22T11:30:00Z',
        deletedAt: null,
        attachments: [
            {
                name: 'Tenancy_Agreement_Draft.docx',
                type: 'file',
                url: '#'
            }
        ],
        history: [
            {
                id: 'h10',
                type: 'CREATED',
                date: '2025-10-22T11:30:00Z',
                actorName: 'Client Portal'
            }
        ]
    },
    // --- BOOKED / ACTIVE JOBS (Assigned to Linah) ---
    {
        id: 'JL-2001',
        linguistId: MOCK_USER_ID,
        postedBy: ADMIN_ID,
        category: 'Interpreting',
        type: 'Face-to-Face',
        status: 'Scheduled',
        title: 'School Parent Evening',
        description: 'Interpret for parents of a Year 8 student. General academic progress discussion.',
        date: '2025-10-29',
        time: '04:00 PM',
        finishTime: '05:00 PM',
        duration: '1h 00m',
        location: 'Allerton High School, Leeds',
        languagePair: 'English <> Swahili',
        rate: '£28/hr',
        isUrgent: false,
        distance: 4.5,
        hourlyRate: 28,
        mileageRate: 0.45,
        travelHours: 0.5,
        travelRate: 15,
        createdAt: '2025-10-20T10:00:00Z',
        updatedAt: '2025-10-21T09:00:00Z',
        deletedAt: null,
        history: [
            {
                id: 'h13',
                type: 'CREATED',
                date: '2025-10-20T10:00:00Z',
                actorName: 'Jambo Admin'
            },
            {
                id: 'h14',
                type: 'ASSIGNED',
                date: '2025-10-21T09:00:00Z',
                actorName: 'Linah Makembu',
                description: 'Claimed via portal'
            }
        ]
    },
    {
        id: 'JL-2002',
        linguistId: MOCK_USER_ID,
        postedBy: CLIENT_ID,
        category: 'Translation',
        type: 'Document',
        status: 'In Progress',
        title: 'NHS Information Leaflet',
        description: 'Translation of "Living with Diabetes" pamphlet. Simple, accessible language required.',
        date: '2025-10-30',
        duration: 'Est. 3 hours',
        wordCount: 1500,
        location: 'Remote',
        languagePair: 'English > Swahili',
        rate: '11p/word',
        wordRate: 0.11,
        isUrgent: false,
        distance: 0,
        createdAt: '2025-10-25T11:00:00Z',
        updatedAt: '2025-10-26T14:30:00Z',
        deletedAt: null,
        attachments: [
            {
                name: 'Diabetes_Info_Leaflet_EN.pdf',
                type: 'file',
                url: '#'
            }
        ],
        history: [
            {
                id: 'h15',
                type: 'CREATED',
                date: '2025-10-25T11:00:00Z',
                actorName: 'NHS Trust'
            },
            {
                id: 'h16',
                type: 'ASSIGNED',
                date: '2025-10-26T14:30:00Z',
                actorName: 'Linah Makembu'
            }
        ]
    },
    {
        id: 'JL-2003',
        linguistId: MOCK_USER_ID,
        postedBy: ADMIN_ID,
        category: 'Translation',
        type: 'Document',
        status: 'Revision',
        title: 'Marketing Flyer Review',
        description: 'Client has requested minor tone adjustments to the "Summer Campaign" translation.',
        date: '2025-10-22',
        duration: '30 mins',
        wordCount: 400,
        location: 'Remote',
        languagePair: 'English > Swahili',
        rate: '£25 Fixed',
        fixedRate: 25,
        isUrgent: true,
        distance: 0,
        revisionFeedback: 'Please make the tone more formal in the second paragraph.',
        revisionFile: 'Marked_Flyer.pdf',
        createdAt: '2025-10-18T09:00:00Z',
        updatedAt: '2025-10-21T09:30:00Z',
        deletedAt: null,
        attachments: [
            {
                name: 'Summer_Campaign_Flyer_v1.pdf',
                type: 'file',
                url: '#'
            }
        ],
        history: [
            {
                id: 'h17',
                type: 'CREATED',
                date: '2025-10-18T09:00:00Z',
                actorName: 'Jambo Admin'
            },
            {
                id: 'h18',
                type: 'ASSIGNED',
                date: '2025-10-18T10:00:00Z',
                actorName: 'Linah Makembu'
            },
            {
                id: 'h19',
                type: 'SUBMITTED',
                date: '2025-10-20T16:00:00Z',
                actorName: 'Linah Makembu',
                description: 'Draft 1 completed',
                attachment: 'Flyer_Draft_v1.docx'
            },
            {
                id: 'h20',
                type: 'REVISION_REQUESTED',
                date: '2025-10-21T09:30:00Z',
                actorName: 'Jambo Admin',
                description: 'Please make the tone more formal in the second paragraph.',
                attachment: 'Marked_Flyer.pdf'
            }
        ]
    },
    // --- HISTORY (Completed/Cancelled/Pending - Assigned to Linah) ---
    // MISSING JOB ADDED: Links to Invoice #INV-2024-001 (£850)
    {
        id: 'JL-3006',
        linguistId: MOCK_USER_ID,
        postedBy: CLIENT_ID,
        category: 'Translation',
        type: 'Document',
        status: 'Completed',
        title: 'Employee Handbook Translation',
        description: 'Full translation of HR handbook for manufacturing staff. 8,500 words.',
        date: '2024-09-25',
        deadlineTime: '17:00',
        duration: '2 weeks',
        wordCount: 8500,
        location: 'Remote',
        languagePair: 'English > Swahili',
        rate: '10p/word',
        wordRate: 0.10,
        isUrgent: false,
        completedAt: '2024-09-29T16:00:00',
        completionNotes: 'Delivered final PDF and DOCX versions via portal.',
        totalPayout: 850.00,
        rating: 5,
        createdAt: '2024-09-10T09:00:00Z',
        updatedAt: '2024-09-30T09:00:00Z',
        deletedAt: null,
        history: [
            {
                id: 'h_3006_1',
                type: 'CREATED',
                date: '2024-09-10T09:00:00Z',
                actorName: 'NHS Trust'
            },
            {
                id: 'h_3006_2',
                type: 'ASSIGNED',
                date: '2024-09-11T10:00:00Z',
                actorName: 'Linah Makembu'
            },
            {
                id: 'h_3006_3',
                type: 'SUBMITTED',
                date: '2024-09-29T16:00:00Z',
                actorName: 'Linah Makembu',
                description: 'Files uploaded.'
            },
            {
                id: 'h_3006_4',
                type: 'APPROVED',
                date: '2024-09-30T09:00:00Z',
                actorName: 'Jambo Admin'
            }
        ]
    },
    // Links to Invoice #INV-2024-002 (£60 part)
    {
        id: 'JL-3001',
        linguistId: MOCK_USER_ID,
        postedBy: ADMIN_ID,
        category: 'Interpreting',
        type: 'Video',
        status: 'Completed',
        title: 'Asylum Interview Prep',
        description: 'Video session preparing client for substantive interview.',
        date: '2024-10-15',
        time: '10:00 AM',
        finishTime: '12:00 PM',
        duration: '2h 00m',
        location: 'Remote',
        languagePair: 'English <> Swahili',
        rate: '£30/hr',
        isUrgent: false,
        hourlyRate: 30,
        completedAt: '2024-10-15T12:05:00',
        completionNotes: 'Session went smoothly. Connection was stable.',
        totalPayout: 60.00,
        rating: 5,
        createdAt: '2024-10-10T10:00:00Z',
        updatedAt: '2024-10-15T14:00:00Z',
        deletedAt: null,
        history: [
            {
                id: 'h21',
                type: 'CREATED',
                date: '2024-10-10T10:00:00Z',
                actorName: 'Jambo Admin'
            },
            {
                id: 'h22',
                type: 'ASSIGNED',
                date: '2024-10-11T09:00:00Z',
                actorName: 'Linah Makembu'
            },
            {
                id: 'h23',
                type: 'SUBMITTED',
                date: '2024-10-15T12:05:00Z',
                actorName: 'Linah Makembu',
                description: 'Session went smoothly.'
            },
            {
                id: 'h24',
                type: 'APPROVED',
                date: '2024-10-15T14:00:00Z',
                actorName: 'Jambo Admin',
                description: 'Verified duration'
            }
        ]
    },
    // Links to Invoice #INV-2024-002 (£240 part)
    {
        id: 'JL-3002',
        linguistId: MOCK_USER_ID,
        postedBy: ADMIN_ID,
        category: 'Transcription',
        type: 'Audio/Video',
        status: 'Completed',
        title: 'Focus Group Recording',
        description: 'Market research focus group transcription.',
        date: '2024-10-10',
        duration: '60 mins audio',
        location: 'Remote',
        languagePair: 'Swahili > English',
        rate: '£4.00/min',
        minuteRate: 4.00,
        isUrgent: false,
        completedAt: '2024-10-11T09:00:00',
        completionNotes: 'Delivered .docx file via portal.',
        totalPayout: 240.00,
        rating: 5,
        createdAt: '2024-10-05T10:00:00Z',
        updatedAt: '2024-10-11T11:00:00Z',
        deletedAt: null,
        history: [
            {
                id: 'h25',
                type: 'CREATED',
                date: '2024-10-05T10:00:00Z',
                actorName: 'Jambo Admin'
            },
            {
                id: 'h26',
                type: 'ASSIGNED',
                date: '2024-10-06T09:00:00Z',
                actorName: 'Linah Makembu'
            },
            {
                id: 'h27',
                type: 'SUBMITTED',
                date: '2024-10-11T09:00:00Z',
                actorName: 'Linah Makembu',
                description: 'File uploaded.',
                attachment: 'Focus_Group_Transcript.docx'
            },
            {
                id: 'h28',
                type: 'APPROVED',
                date: '2024-10-11T11:00:00Z',
                actorName: 'Jambo Admin'
            }
        ]
    },
    {
        id: 'JL-3003',
        linguistId: MOCK_USER_ID,
        postedBy: ADMIN_ID,
        category: 'Interpreting',
        type: 'Face-to-Face',
        status: 'Cancelled',
        title: 'Community Center Visit',
        description: 'Cancelled by client 24h in advance.',
        date: '2024-10-05',
        time: '01:00 PM',
        finishTime: '02:30 PM',
        duration: '1h 30m',
        location: 'Leeds City Center',
        languagePair: 'English <> Swahili',
        rate: '£25/hr',
        isUrgent: false,
        distance: 1.2,
        hourlyRate: 25,
        mileageRate: 0.45,
        travelHours: 0.5,
        travelRate: 15,
        createdAt: '2024-10-01T10:00:00Z',
        updatedAt: '2024-10-04T10:00:00Z',
        deletedAt: null,
        history: [
            {
                id: 'h29',
                type: 'CREATED',
                date: '2024-10-01T10:00:00Z',
                actorName: 'Jambo Admin'
            },
            {
                id: 'h30',
                type: 'ASSIGNED',
                date: '2024-10-02T09:00:00Z',
                actorName: 'Linah Makembu'
            },
            {
                id: 'h31',
                type: 'CANCELLED',
                date: '2024-10-04T10:00:00Z',
                actorName: 'Jambo Admin',
                description: 'Client cancelled meeting.'
            }
        ]
    },
    // Links to Invoice #INV-2024-003 (£35 part - PENDING)
    {
        id: 'JL-3004',
        linguistId: MOCK_USER_ID,
        postedBy: ADMIN_ID,
        category: 'Translation',
        type: 'Document',
        status: 'Pending Approval',
        title: 'Birth Certificate Translation',
        description: 'Certified translation of a Tanzanian birth certificate.',
        date: '2025-10-20',
        duration: '1 hour',
        wordCount: 200,
        location: 'Remote',
        languagePair: 'Swahili > English',
        rate: '£35 (Fixed)',
        fixedRate: 35,
        isUrgent: false,
        completedAt: '2025-10-20T14:30:00',
        completionNotes: 'Uploaded certified PDF.',
        completionFile: 'Certified_Translation_JL3004.pdf',
        totalPayout: 35.00,
        createdAt: '2025-10-18T10:00:00Z',
        updatedAt: '2025-10-20T14:30:00Z',
        deletedAt: null,
        attachments: [
            {
                name: 'Birth_Certificate_Tanzania_Scan.pdf',
                type: 'file',
                url: '#'
            }
        ],
        history: [
            {
                id: 'h32',
                type: 'CREATED',
                date: '2025-10-18T10:00:00Z',
                actorName: 'Jambo Admin'
            },
            {
                id: 'h33',
                type: 'ASSIGNED',
                date: '2025-10-18T11:00:00Z',
                actorName: 'Linah Makembu'
            },
            {
                id: 'h34',
                type: 'SUBMITTED',
                date: '2025-10-20T14:30:00Z',
                actorName: 'Linah Makembu',
                description: 'Uploaded certified PDF.',
                attachment: 'Certified_Translation_JL3004.pdf'
            }
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/source/users.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialUsers",
    ()=>initialUsers
]);
const initialUsers = [
    {
        id: 'u-123456',
        email: 'linah@jambolinguists.com',
        password: 'password',
        firstName: 'Linah',
        lastName: 'Makembu',
        phone: '+44 7938 065 717',
        location: 'Leeds, UK',
        headline: 'Professional Swahili Interpreter & Translator',
        role: 'linguist',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
        headerUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200',
        isVerified: true,
        isSuspended: false,
        qualifications: [
            'DPSI',
            'CIOL Member'
        ],
        languages: [
            'English',
            'Swahili'
        ],
        bankDetails: {
            bankName: 'Barclays',
            accountNumber: '•••• •••• •••• 4289',
            sortCode: '20-00-00'
        },
        createdAt: '2024-01-15T09:00:00Z',
        updatedAt: '2024-10-20T14:30:00Z',
        deletedAt: null,
        notificationPreferences: {
            emailUpdates: true,
            jobAlerts: true,
            courseReminders: true,
            marketing: false
        }
    },
    {
        id: 'u-admin-001',
        email: 'admin@jambolinguists.com',
        password: 'admin',
        firstName: 'Jambo',
        lastName: 'Admin',
        location: 'HQ, Pudsey',
        headline: 'System Administrator',
        role: 'admin',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
        headerUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
        isVerified: true,
        isSuspended: false,
        createdAt: '2023-11-01T09:00:00Z',
        updatedAt: '2023-11-01T09:00:00Z',
        deletedAt: null,
        notificationPreferences: {
            emailUpdates: true,
            jobAlerts: false,
            courseReminders: false,
            marketing: false
        }
    },
    {
        id: 'u-suspended-001',
        email: 'blocked@example.com',
        password: 'password',
        firstName: 'Sarah',
        lastName: 'Connor',
        location: 'London, UK',
        headline: 'Swahili Translator',
        role: 'linguist',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
        headerUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1200',
        isVerified: true,
        isSuspended: true,
        languages: [
            'English',
            'Swahili'
        ],
        createdAt: '2024-05-10T12:00:00Z',
        updatedAt: '2024-09-15T10:00:00Z',
        deletedAt: null,
        notificationPreferences: {
            emailUpdates: false,
            jobAlerts: false,
            courseReminders: false,
            marketing: false
        }
    },
    {
        id: 'u-pending-001',
        email: 'newbie@example.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
        location: 'Manchester, UK',
        headline: 'Aspiring Interpreter',
        role: 'linguist',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        headerUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
        isVerified: false,
        isSuspended: false,
        languages: [
            'English',
            'French'
        ],
        createdAt: '2025-10-25T09:00:00Z',
        updatedAt: '2025-10-25T09:00:00Z',
        deletedAt: null,
        notificationPreferences: {
            emailUpdates: true,
            jobAlerts: true,
            courseReminders: true,
            marketing: true
        }
    },
    {
        id: 'u-client-001',
        email: 'contact@nhs.uk',
        password: 'password',
        firstName: 'NHS',
        lastName: 'Trust',
        location: 'Leeds Teaching Hospitals',
        headline: 'Booking Coordinator',
        role: 'client',
        avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
        headerUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd8189718c?auto=format&fit=crop&q=80&w=1200',
        isVerified: true,
        isSuspended: false,
        createdAt: '2024-03-15T09:00:00Z',
        updatedAt: '2024-03-15T09:00:00Z',
        deletedAt: null,
        notificationPreferences: {
            emailUpdates: true,
            jobAlerts: true,
            courseReminders: false,
            marketing: false
        }
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/source/notifications.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialNotifications",
    ()=>initialNotifications
]);
const MOCK_USER_ID = 'u-123456';
const initialNotifications = [
    {
        id: 'n1',
        userId: MOCK_USER_ID,
        title: "Invoice #INV-2024-09 Paid",
        time: "2 hours ago",
        isRead: false,
        iconType: 'check',
        color: "text-green-500",
        bg: "bg-green-50",
        linkTo: 'jobs-history',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        updatedAt: new Date(Date.now() - 7200000).toISOString(),
        deletedAt: null
    },
    {
        id: 'n2',
        userId: MOCK_USER_ID,
        title: "New Job Available: Legal Interpreting",
        time: "5 hours ago",
        isRead: false,
        iconType: 'briefcase',
        color: "text-brand-orange",
        bg: "bg-orange-50",
        linkTo: 'jobs-available',
        createdAt: new Date(Date.now() - 18000000).toISOString(),
        updatedAt: new Date(Date.now() - 18000000).toISOString(),
        deletedAt: null
    },
    {
        id: 'n3',
        userId: MOCK_USER_ID,
        title: "DBS Check Verified",
        time: "1 day ago",
        isRead: true,
        iconType: 'shield',
        color: "text-blue-500",
        bg: "bg-blue-50",
        linkTo: 'profile',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        deletedAt: null
    },
    {
        id: 'n4',
        userId: MOCK_USER_ID,
        title: "New Training Module: GDPR Update",
        time: "2 days ago",
        isRead: true,
        iconType: 'grad',
        color: "text-purple-500",
        bg: "bg-purple-50",
        linkTo: 'training',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        updatedAt: new Date(Date.now() - 172800000).toISOString(),
        deletedAt: null
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/source/courses.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialCourses",
    ()=>initialCourses,
    "initialProgress",
    ()=>initialProgress
]);
const initialCourses = [
    {
        id: 'c-101',
        title: 'Translation Software Essentials',
        description: 'Master the industry-standard CAT tools. Learn how to manage translation memories, glossaries, and quality assurance checks effectively to boost your productivity and consistency.',
        category: 'Technical',
        duration: '4h 15m',
        lessonsCount: 4,
        thumbnailUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600',
        instructor: 'Sarah Jenkins',
        instructorRole: 'Senior CAT Tool Trainer',
        allowSelfEnrollment: true,
        learningGoals: [
            'Understand the architecture of Translation Memories',
            'Create and maintain client-specific glossaries',
            'Perform automated QA checks for errors',
            'Export projects for final delivery'
        ],
        status: 'Published',
        settings: {
            visibility: 'Public',
            allowReenrollment: true,
            passingScore: 80,
            autoIssueCertificate: true,
            requirePrerequisites: false,
            prerequisites: [],
            notifications: {
                onEnroll: true,
                onComplete: true
            }
        },
        compliance: {
            requiredForJobTypes: [],
            isMandatory: false
        },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        deletedAt: null
    },
    {
        id: 'c-102',
        title: 'Medical Interpreting Basics',
        description: 'A comprehensive guide to interpreting in healthcare settings. Covers common terminology, ethical dilemmas, NHS protocols, and emotional resilience for interpreters.',
        category: 'Language',
        duration: '6h 00m',
        lessonsCount: 3,
        thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600',
        instructor: 'Dr. Amina Abdi',
        instructorRole: 'NHS Consultant & Linguist',
        allowSelfEnrollment: true,
        learningGoals: [
            'Master core cardiology and respiratory terminology',
            'Understand NHS safeguarding protocols',
            'Navigate ethical dilemmas in patient consultations',
            'Techniques for breaking bad news sensitively'
        ],
        status: 'Published',
        settings: {
            visibility: 'Public',
            allowReenrollment: true,
            passingScore: 85,
            autoIssueCertificate: true,
            requirePrerequisites: false,
            prerequisites: [],
            notifications: {
                onEnroll: true,
                onComplete: true
            }
        },
        compliance: {
            requiredForJobTypes: [
                'Interpreting'
            ],
            isMandatory: false
        },
        createdAt: '2024-01-05T00:00:00Z',
        updatedAt: '2024-01-05T00:00:00Z',
        deletedAt: null
    },
    {
        id: 'c-103',
        title: 'GDPR & Data Compliance',
        description: 'Essential training on data protection for freelance linguists. Understand your responsibilities under UK law and how to handle sensitive client data securely.',
        category: 'Compliance',
        duration: '1h 30m',
        lessonsCount: 3,
        thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600',
        instructor: 'Jambo Compliance Team',
        instructorRole: 'Legal Department',
        allowSelfEnrollment: false,
        learningGoals: [
            'Identify the 7 key principles of GDPR',
            'Securely store and dispose of physical notes',
            'Recognize and report data breaches',
            'Understand your liability as a freelancer'
        ],
        status: 'Published',
        settings: {
            visibility: 'Invite-Only',
            allowReenrollment: false,
            passingScore: 100,
            autoIssueCertificate: true,
            requirePrerequisites: false,
            prerequisites: [],
            notifications: {
                onEnroll: true,
                onComplete: false
            }
        },
        compliance: {
            requiredForJobTypes: [],
            mandatoryRefreshMonths: 12,
            isMandatory: true
        },
        createdAt: '2023-12-01T00:00:00Z',
        updatedAt: '2023-12-01T00:00:00Z',
        deletedAt: null
    },
    {
        id: 'c-restricted',
        title: 'Advanced Legal Interpreting (Restricted)',
        description: 'Specialized module for DPSI holders only. Requires manual approval from the admin team.',
        category: 'Technical',
        duration: '10h 00m',
        lessonsCount: 5,
        thumbnailUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600',
        instructor: 'Legal Dept',
        instructorRole: 'Head of Compliance',
        allowSelfEnrollment: false,
        learningGoals: [
            'Courtroom etiquette',
            'Legal terminology',
            'Impartiality in high-stakes cases'
        ],
        status: 'Published',
        settings: {
            visibility: 'Public',
            allowReenrollment: false,
            passingScore: 90,
            autoIssueCertificate: false,
            requirePrerequisites: true,
            prerequisites: [
                'c-103'
            ],
            notifications: {
                onEnroll: true,
                onComplete: true
            }
        },
        compliance: {
            requiredForJobTypes: [
                'Interpreting'
            ],
            isMandatory: false
        },
        createdAt: '2024-02-01T00:00:00Z',
        updatedAt: '2024-02-01T00:00:00Z',
        deletedAt: null
    }
];
const initialProgress = [
    {
        userId: 'u-123456',
        courseId: 'c-103',
        status: 'Completed',
        progressPercent: 100,
        lessonsCompletedIds: [
            'l-103-1',
            'l-103-2',
            'l-103-3'
        ],
        lastAccessedAt: '2024-09-15T10:00:00Z',
        enrollmentDate: '2024-09-01T09:00:00Z',
        completedAt: '2024-09-15T11:30:00Z',
        certificateId: 'cert-initial-1',
        history: [
            {
                date: '2024-09-01T09:00:00Z',
                action: 'Enrolled'
            },
            {
                date: '2024-09-15T11:30:00Z',
                action: 'Course Completed'
            }
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/source/lessons.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialLessons",
    ()=>initialLessons
]);
const initialLessons = [
    // C-101 Lessons (Translation Software)
    {
        id: 'l-101-1',
        courseId: 'c-101',
        module: 'Getting Started',
        title: 'Introduction to CAT Tools',
        type: 'Video',
        duration: '15 min',
        orderIndex: 0,
        contentUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description: 'Understanding what Computer-Assisted Translation tools are and why they are essential for modern linguists.',
        transcript: "Welcome to this introductory module on CAT tools. In this lesson, we will explore the fundamental difference between machine translation and computer-assisted translation. Many linguists fear that technology will replace them, but in reality, CAT tools are designed to empower you...",
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        deletedAt: null
    },
    {
        id: 'l-101-2',
        courseId: 'c-101',
        module: 'Getting Started',
        title: 'Setting up Translation Memories',
        type: 'Slide',
        duration: '30 min',
        orderIndex: 1,
        description: 'A step-by-step visual guide on creating and maintaining TMs to ensure consistency across projects.',
        contentUrl: 'https://bungoma.go.ke/wp-content/uploads/2021/04/StaffPerformanceAppraisal-JG-Hbelow.pdf',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        deletedAt: null
    },
    {
        id: 'l-101-3',
        courseId: 'c-101',
        module: 'Core Skills',
        title: 'Terminology Management',
        type: 'Document',
        duration: '45 min',
        orderIndex: 2,
        description: 'Read the best practices guide for building client-specific glossaries.',
        contentUrl: 'https://bungoma.go.ke/wp-content/uploads/2021/04/StaffPerformanceAppraisal-JG-Hbelow.pdf',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        deletedAt: null
    },
    {
        id: 'l-101-4',
        courseId: 'c-101',
        module: 'Assessment',
        title: 'Final Assessment: Software',
        type: 'Quiz',
        duration: '20 min',
        orderIndex: 3,
        description: 'Test your knowledge on CAT tools and file management.',
        quizData: [
            {
                question: "What does 'CAT' stand for in 'CAT tool'?",
                options: [
                    "Computer-Assisted Translation",
                    "Computer-Aided Technology",
                    "Creative Authoring Tool",
                    "Contextual Analysis Template"
                ],
                correctAnswer: 0,
                explanation: "'CAT' stands for Computer-Assisted Translation. These tools help linguists by leveraging translation memories and glossaries."
            },
            {
                question: "What is the primary purpose of a Translation Memory (TM)?",
                options: [
                    "To automatically translate the entire document.",
                    "To store previously translated segments for reuse.",
                    "To check for spelling and grammar errors.",
                    "To format the final document."
                ],
                correctAnswer: 1,
                explanation: "A Translation Memory (TM) stores source and target language pairs, allowing translators to reuse previous work for consistency and speed."
            }
        ],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        deletedAt: null
    },
    // C-102 Lessons (Medical)
    {
        id: 'l-102-1',
        courseId: 'c-102',
        module: 'Foundations',
        title: 'Anatomy & Physiology 101',
        type: 'Video',
        duration: '45 min',
        orderIndex: 0,
        contentUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        description: 'Overview of major body systems relevant to interpreting.',
        transcript: "In medical interpreting, accuracy is a matter of life and death. Today we start with the Cardiovascular system. The heart is a muscular organ...",
        createdAt: '2024-01-05T00:00:00Z',
        updatedAt: '2024-01-05T00:00:00Z',
        deletedAt: null
    },
    {
        id: 'l-102-2',
        courseId: 'c-102',
        module: 'Foundations',
        title: 'NHS Protocols for Interpreters',
        type: 'Document',
        duration: '30 min',
        orderIndex: 1,
        description: 'Standard Operating Procedures for working within NHS Trusts.',
        contentUrl: 'https://bungoma.go.ke/wp-content/uploads/2021/04/StaffPerformanceAppraisal-JG-Hbelow.pdf',
        createdAt: '2024-01-05T00:00:00Z',
        updatedAt: '2024-01-05T00:00:00Z',
        deletedAt: null
    },
    {
        id: 'l-102-3',
        courseId: 'c-102',
        module: 'Advanced Scenarios',
        title: 'Ethics: Breaking Bad News',
        type: 'Video',
        duration: '20 min',
        orderIndex: 2,
        description: 'How to maintain professional boundaries and emotional stability during difficult consultations.',
        contentUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        transcript: "Delivering bad news is never easy, but as an interpreter, your role is to convey the clinician's words exactly, including the tone and empathy...",
        createdAt: '2024-01-05T00:00:00Z',
        updatedAt: '2024-01-05T00:00:00Z',
        deletedAt: null
    },
    // C-103 Lessons (GDPR)
    {
        id: 'l-103-1',
        courseId: 'c-103',
        module: 'Core Principles',
        title: 'Principles of Data Protection',
        type: 'Video',
        duration: '20 min',
        orderIndex: 0,
        description: 'The 7 key principles of GDPR.',
        contentUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        createdAt: '2023-12-01T00:00:00Z',
        updatedAt: '2023-12-01T00:00:00Z',
        deletedAt: null
    },
    {
        id: 'l-103-2',
        courseId: 'c-103',
        module: 'Core Principles',
        title: 'Handling Printed Documents',
        type: 'Slide',
        duration: '15 min',
        orderIndex: 1,
        description: 'Secure disposal and storage of physical notes.',
        contentUrl: 'https://bungoma.go.ke/wp-content/uploads/2021/04/StaffPerformanceAppraisal-JG-Hbelow.pdf',
        createdAt: '2023-12-01T00:00:00Z',
        updatedAt: '2023-12-01T00:00:00Z',
        deletedAt: null
    },
    {
        id: 'l-103-3',
        courseId: 'c-103',
        module: 'Final Quiz',
        title: 'GDPR Certification Quiz',
        type: 'Quiz',
        duration: '15 min',
        orderIndex: 2,
        description: 'Pass score: 80%.',
        quizData: [
            {
                question: "What does GDPR stand for?",
                options: [
                    "General Data Protection Regulation",
                    "Global Data Privacy Regulation",
                    "General Document Processing Rules",
                    "Government Data Protection Registry"
                ],
                correctAnswer: 0,
                explanation: "GDPR stands for General Data Protection Regulation, a key data privacy regulation in the EU and UK."
            },
            {
                question: "Under GDPR, when must you report a data breach to the supervisory authority?",
                options: [
                    "Within one week",
                    "Within 72 hours",
                    "Within one month",
                    "Immediately, without any delay"
                ],
                correctAnswer: 1,
                explanation: "A notifiable breach has to be reported to the relevant supervisory authority within 72 hours of the organisation becoming aware of it."
            },
            {
                question: "Which of the following is considered 'personal data' under GDPR?",
                options: [
                    "A person's name",
                    "An email address",
                    "An IP address",
                    "All of the above"
                ],
                correctAnswer: 3,
                explanation: "Personal data is any information that relates to an identified or identifiable individual, which includes names, email addresses, and even technical data like IP addresses."
            }
        ],
        createdAt: '2023-12-01T00:00:00Z',
        updatedAt: '2023-12-01T00:00:00Z',
        deletedAt: null
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/source/resources.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialResources",
    ()=>initialResources
]);
const initialResources = [
    {
        id: 'res-001',
        title: 'NHS Interpreting Guidelines 2024',
        description: 'Official code of practice for interpreters working within NHS Trusts. Essential reading for medical assignments.',
        category: 'Medical',
        type: 'pdf',
        url: '#',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        deletedAt: null
    },
    {
        id: 'res-002',
        title: 'Swahili Legal Glossary (Criminal)',
        description: 'Comprehensive glossary of UK criminal law terminology translated into standard Swahili.',
        category: 'Legal',
        type: 'pdf',
        url: '#',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        deletedAt: null
    },
    {
        id: 'res-003',
        title: 'Jambo Linguist Handbook',
        description: 'Everything you need to know about working with us: payments, dress code, and cancellation policies.',
        category: 'General',
        type: 'pdf',
        url: '#',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        deletedAt: null
    },
    {
        id: 'res-004',
        title: 'Safeguarding Adults Pocket Guide',
        description: 'Quick reference guide for identifying and reporting safeguarding concerns during assignments.',
        category: 'Compliance',
        type: 'pdf',
        url: '#',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        deletedAt: null
    },
    {
        id: 'res-005',
        title: 'Asylum Process Overview',
        description: 'External link to the Home Office guide on the asylum interview process.',
        category: 'Legal',
        type: 'link',
        url: '#',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        deletedAt: null
    },
    {
        id: 'res-006',
        title: 'Video Interpreting Best Practices',
        description: 'Technical setup and etiquette guide for remote video interpreting sessions.',
        category: 'General',
        type: 'pdf',
        url: '#',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        deletedAt: null
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/source/invoices.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialInvoices",
    ()=>initialInvoices
]);
const initialInvoices = [
    {
        id: 'inv-001',
        userId: 'u-123456',
        reference: 'INV-2024-001',
        date: '2024-09-30',
        dueDate: '2024-10-14',
        amount: 850.00,
        status: 'Paid',
        items: [
            {
                description: 'Translation: Employee Handbook',
                amount: 850.00,
                jobId: 'JL-3006'
            }
        ],
        createdAt: '2024-09-30T09:00:00Z',
        updatedAt: '2024-10-02T10:00:00Z',
        deletedAt: null
    },
    {
        id: 'inv-002',
        userId: 'u-123456',
        reference: 'INV-2024-002',
        date: '2024-10-16',
        dueDate: '2024-10-30',
        amount: 300.00,
        status: 'Paid',
        items: [
            {
                description: 'Interpreting: Asylum Interview Prep',
                amount: 60.00,
                jobId: 'JL-3001'
            },
            {
                description: 'Transcription: Focus Group',
                amount: 240.00,
                jobId: 'JL-3002'
            }
        ],
        createdAt: '2024-10-16T09:00:00Z',
        updatedAt: '2024-10-18T11:00:00Z',
        deletedAt: null
    },
    {
        id: 'inv-003',
        userId: 'u-123456',
        reference: 'INV-2024-003',
        date: '2025-10-21',
        dueDate: '2025-11-04',
        amount: 35.00,
        status: 'Pending',
        items: [
            {
                description: 'Translation: Birth Certificate',
                amount: 35.00,
                jobId: 'JL-3004'
            }
        ],
        createdAt: '2025-10-21T09:00:00Z',
        updatedAt: '2025-10-21T09:00:00Z',
        deletedAt: null
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/source/loginHistory.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialLoginHistory",
    ()=>initialLoginHistory
]);
const initialLoginHistory = [
    {
        id: 'lh-1',
        userId: 'u-123456',
        timestamp: '2025-10-24T09:00:00Z',
        ipAddress: '81.2.69.142',
        source: 'direct'
    },
    {
        id: 'lh-2',
        userId: 'u-123456',
        timestamp: '2025-10-22T14:30:00Z',
        ipAddress: '192.168.1.10',
        source: 'impersonation',
        impersonatorId: 'u-admin-001'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/source/compliance.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialComplianceDocs",
    ()=>initialComplianceDocs
]);
const INITIAL_CONDUCT_HTML = `
<h4 class="text-jambo-600 font-bold mb-2 text-lg font-serif">1. Professionalism & Integrity</h4>
<p class="mb-4">
  Freelancers must maintain the highest standards of professionalism. This includes punctuality, appropriate dress codes for face-to-face assignments, and polite communication. You represent Jambo Linguists in every interaction.
</p>
<h4 class="text-jambo-600 font-bold mb-2 text-lg font-serif">2. Confidentiality (GDPR)</h4>
<p class="mb-4">
  Strict adherence to GDPR is mandatory. No client data may be stored on personal devices after an assignment is complete. Any notes taken during interpretation must be shredded immediately.
</p>
<h4 class="text-jambo-600 font-bold mb-2 text-lg font-serif">3. Accuracy & Neutrality</h4>
<p class="mb-4">
  Interpreters must translate precisely what is said, without adding, omitting, or changing meaning. You must remain neutral and unbiased, regardless of the sensitive nature of the assignment (e.g., Court, NHS, Police).
</p>
<h4 class="text-jambo-600 font-bold mb-2 text-lg font-serif">4. Quality Assurance</h4>
<p class="mb-4">
  We conduct random spot checks and client feedback reviews. Falling below our quality threshold may result in removal from the portal.
</p>

<div class="my-8 p-4 bg-jambo-50 rounded-lg border border-jambo-100 text-jambo-800 text-sm">
   <strong>Important Note:</strong> Failure to adhere to these standards may result in immediate suspension from the platform.
</div>
`;
const INITIAL_PRIVACY_HTML = `
<h4 class="text-jambo-600 font-bold mb-2 text-lg font-serif">1. Data Collection</h4>
<p class="mb-4">We collect personal data required for your assignment and payment processing. This includes name, contact details, and bank information.</p>

<h4 class="text-jambo-600 font-bold mb-2 text-lg font-serif">2. Data Usage</h4>
<p class="mb-4">Your data is used solely for the purpose of matching you with assignments and ensuring compliance with UK employment laws.</p>

<h4 class="text-jambo-600 font-bold mb-2 text-lg font-serif">3. Your Rights</h4>
<p class="mb-4">You have the right to request access to your data or request deletion, subject to legal retention requirements.</p>
`;
const initialComplianceDocs = [
    {
        id: 'doc-conduct',
        title: 'Code of Conduct',
        type: 'conduct',
        content: INITIAL_CONDUCT_HTML,
        lastUpdated: '2024-10-01T09:00:00Z',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-10-01T09:00:00Z',
        deletedAt: null
    },
    {
        id: 'doc-privacy',
        title: 'Privacy Policy & GDPR',
        type: 'privacy',
        content: INITIAL_PRIVACY_HTML,
        lastUpdated: '2023-11-15T10:00:00Z',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-11-15T10:00:00Z',
        deletedAt: null
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/source/certificates.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialCertificates",
    ()=>initialCertificates
]);
const initialCertificates = [
    {
        id: 'cert-initial-1',
        userId: 'u-123456',
        courseId: 'c-103',
        issueDate: '2024-09-15T11:30:00Z',
        status: 'Active',
        verificationCode: 'a1b2-c3d4-e5f6-g7h8',
        createdAt: '2024-09-15T11:30:00Z',
        updatedAt: '2024-09-15T11:30:00Z',
        deletedAt: null
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/source/messages.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialMessages",
    ()=>initialMessages
]);
const LINGUIST_ID = 'u-123456';
const ADMIN_ID = 'u-admin-001';
const CLIENT_ID = 'u-client-001';
const createMsg = (id, senderId, recipientId, content, timeOffsetMinutes, jobId, isRead = true)=>({
        id,
        senderId,
        recipientId,
        content,
        jobId,
        isRead,
        readAt: isRead ? new Date(Date.now() - (timeOffsetMinutes - 5) * 60000).toISOString() : null,
        createdAt: new Date(Date.now() - timeOffsetMinutes * 60000).toISOString(),
        updatedAt: new Date(Date.now() - timeOffsetMinutes * 60000).toISOString(),
        deletedAt: null
    });
const initialMessages = [
    // Thread 1: Job JL-2003 (Revision) - Admin <-> Linguist
    createMsg('m1', ADMIN_ID, LINGUIST_ID, "Hi Linah, could you please review the feedback on the marketing flyer?", 1440, 'JL-2003'),
    createMsg('m2', LINGUIST_ID, ADMIN_ID, "Sure, I see the notes about tone. Working on it now.", 1400, 'JL-2003'),
    createMsg('m3', ADMIN_ID, LINGUIST_ID, "Great, thanks. Client needs it by EOD tomorrow.", 1390, 'JL-2003'),
    createMsg('m4', LINGUIST_ID, ADMIN_ID, "Understood. I will upload the revised version shortly.", 60, 'JL-2003', false),
    // Thread 2: Job JL-1001 (Open) - Client <-> Linguist
    createMsg('m5', CLIENT_ID, LINGUIST_ID, "Hello, regarding the medical appointment next week, is there parking on site?", 300, 'JL-1001'),
    createMsg('m6', LINGUIST_ID, CLIENT_ID, "Hi, yes there is a multi-story car park at the Clarendon Wing entrance.", 280, 'JL-1001'),
    createMsg('m7', CLIENT_ID, LINGUIST_ID, "Perfect, thank you. See you then.", 10, 'JL-1001', false),
    // Thread 3: DM - Admin <-> Linguist
    createMsg('m8', ADMIN_ID, LINGUIST_ID, "Just a reminder to upload your renewed DBS certificate.", 2880),
    createMsg('m9', LINGUIST_ID, ADMIN_ID, "Uploaded it yesterday! Can you check?", 2800),
    createMsg('m10', ADMIN_ID, LINGUIST_ID, "Got it. Verified and approved. Thanks!", 2750)
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/source/blogPosts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialBlogPosts",
    ()=>initialBlogPosts
]);
const initialBlogPosts = [
    {
        id: 'blog-1',
        title: 'The Importance of Cultural Competence in Medical Interpreting',
        slug: 'cultural-competence-medical-interpreting',
        excerpt: 'Why understanding cultural nuances is just as critical as language fluency when navigating healthcare scenarios.',
        content: `
Medical interpreting is more than just swapping words from one language to another. It requires a deep understanding of cultural contexts, especially when dealing with sensitive health issues.

### The Bridge Between Cultures

In many East African cultures, discussing terminal illness directly with a patient can be seen as taboo. An interpreter must navigate these cultural waters carefully, ensuring the doctor's message is conveyed accurately while respecting the patient's cultural framework.

### Building Trust

Trust is the foundation of any doctor-patient relationship. When a patient feels that their interpreter understands not just their language but their background, they are more likely to be open about their symptoms and concerns.

**Key Takeaways:**
*   Learn the cultural background of your target demographic.
*   Understand that body language varies significantly across cultures.
*   Always maintain professional boundaries while being empathetic.
        `,
        coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
        tags: [
            'Medical',
            'Interpreting',
            'Culture'
        ],
        authorId: 'u-admin-001',
        status: 'published',
        publishedAt: '2024-10-15T09:00:00Z',
        createdAt: '2024-10-15T09:00:00Z',
        updatedAt: '2024-10-15T09:00:00Z',
        deletedAt: null,
        seo: {
            metaTitle: 'Cultural Competence in Medical Interpreting | Jambo Linguists',
            metaDescription: 'Learn why cultural competence is critical for medical interpreters. Explore the impact of cultural nuances in healthcare settings for Swahili speakers.',
            keywords: [
                'medical interpreting',
                'cultural competence',
                'Swahili medical interpreter',
                'healthcare translation'
            ],
            canonicalUrl: 'https://jambolinguists.com/blog/cultural-competence-medical-interpreting',
            noIndex: false
        }
    },
    {
        id: 'blog-2',
        title: '5 Tips for Working with a Telephone Interpreter',
        slug: 'tips-working-telephone-interpreter',
        excerpt: 'Maximize the efficiency of your remote interpreting sessions with these essential guidelines for professionals.',
        content: `
Remote interpreting is becoming the standard for quick consultations. Here is how to make the most of it.

1.  **Brief the Interpreter:** Before the client gets on the line, give the interpreter a 30-second summary of the situation.
2.  **Speak Clearly:** Phone lines can distort audio. Enunciate your words.
3.  **One Concept at a Time:** Don't monologue. Pause frequently to allow for interpretation.
4.  **Check for Understanding:** Ask the client to repeat back key instructions.
5.  **Avoid Jargon:** Unless you know the interpreter is a specialist, keep technical terms to a minimum or explain them.
        `,
        coverImage: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80&w=1200',
        tags: [
            'Tips',
            'Telephone',
            'Best Practices'
        ],
        authorId: 'u-admin-001',
        status: 'published',
        publishedAt: '2024-10-20T14:30:00Z',
        createdAt: '2024-10-20T14:30:00Z',
        updatedAt: '2024-10-20T14:30:00Z',
        deletedAt: null,
        seo: {
            metaTitle: '5 Tips for Telephone Interpreting Success | Jambo Linguists',
            metaDescription: 'Maximize efficiency in remote interpreting sessions. 5 essential tips for professionals working with telephone interpreters.',
            keywords: [
                'telephone interpreting',
                'remote interpreting',
                'interpreter tips',
                'over the phone interpretation'
            ],
            noIndex: false
        }
    },
    {
        id: 'blog-3',
        title: 'Understanding Swahili Dialects: A Guide',
        slug: 'understanding-swahili-dialects',
        excerpt: 'Swahili is not a monolith. Explore the variations between coastal, inland, and Congolese Swahili.',
        content: `
Swahili (Kiswahili) is the lingua franca of East Africa, but it varies significantly by region.

### Standard Swahili (Kiswahili Sanifu)
Based on the dialect of Zanzibar, this is what is taught in schools and used in official government business in Tanzania and Kenya.

### Congolese Swahili
Spoken in the DRC, this variation borrows heavily from French and Lingala. An interpreter from Mombasa might struggle with the specific vocabulary used in Goma.

### Sheng
A slang-heavy creole of Swahili and English spoken in Nairobi. While not formal, understanding it is crucial for community work with youth.
        `,
        coverImage: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80&w=1200',
        tags: [
            'Language',
            'Swahili',
            'Education'
        ],
        authorId: 'u-admin-001',
        status: 'published',
        publishedAt: '2024-10-25T10:00:00Z',
        createdAt: '2024-10-25T10:00:00Z',
        updatedAt: '2024-10-25T10:00:00Z',
        deletedAt: null,
        seo: {
            metaTitle: 'Swahili Dialects Explained: Sanifu vs Congolese vs Sheng',
            metaDescription: 'Not all Swahili is the same. Discover the key differences between Standard Swahili, Congolese variations, and Sheng slang.',
            keywords: [
                'Swahili dialects',
                'Kiswahili Sanifu',
                'Congolese Swahili',
                'Sheng',
                'African languages'
            ],
            noIndex: false
        }
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DataStore",
    ()=>DataStore,
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$jobs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/source/jobs.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$users$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/source/users.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$notifications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/source/notifications.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$courses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/source/courses.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$lessons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/source/lessons.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$resources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/source/resources.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$invoices$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/source/invoices.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$loginHistory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/source/loginHistory.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$compliance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/source/compliance.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$certificates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/source/certificates.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$messages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/source/messages.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$blogPosts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/source/blogPosts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/constants.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
class DataStore {
    jobs = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$jobs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialJobs"]
    ];
    users = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$users$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialUsers"]
    ];
    notifications = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$notifications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialNotifications"]
    ];
    courses = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$courses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialCourses"]
    ];
    courseProgress = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$courses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialProgress"]
    ];
    lessons = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$lessons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialLessons"]
    ];
    certificates = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$certificates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialCertificates"]
    ];
    resources = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$resources$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialResources"]
    ];
    invoices = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$invoices$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialInvoices"]
    ];
    loginHistory = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$loginHistory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialLoginHistory"]
    ];
    complianceDocs = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$compliance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialComplianceDocs"]
    ];
    messages = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$messages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialMessages"]
    ];
    blogPosts = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$source$2f$blogPosts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialBlogPosts"]
    ];
    // New: Email Storage
    emailTemplates = [
        {
            id: 'JOB_ASSIGNED',
            name: 'Job Assigned',
            subject: 'New Assignment: {{jobTitle}}',
            body: 'Dear {{firstName}},\n\nYou have been assigned a new job:\n\nTitle: {{jobTitle}}\nDate: {{date}}\nLocation: {{location}}\n\nPlease log in to the portal to view full details.\n\nBest regards,\nJambo Linguists',
            variables: [
                'firstName',
                'jobTitle',
                'date',
                'location',
                'jobId'
            ]
        },
        {
            id: 'JOB_COMPLETED_PENDING',
            name: 'Job Pending Approval',
            subject: 'Job Completed: {{jobTitle}}',
            body: 'Admin,\n\n{{firstName}} {{lastName}} has submitted completion details for Job #{{jobId}}.\n\nStatus: Pending Approval\n\nCheck the admin portal to review.',
            variables: [
                'firstName',
                'lastName',
                'jobTitle',
                'jobId'
            ]
        },
        {
            id: 'JOB_APPROVED',
            name: 'Job Approved',
            subject: 'Work Approved: {{jobTitle}}',
            body: 'Dear {{firstName}},\n\nYour submission for "{{jobTitle}}" has been approved. An invoice has been generated automatically.\n\nRef: {{jobId}}\n\nBest,\nJambo Team',
            variables: [
                'firstName',
                'jobTitle',
                'jobId'
            ]
        },
        {
            id: 'COURSE_COMPLETED',
            name: 'Course Completed',
            subject: 'Course Completed: {{courseTitle}}',
            body: 'Congratulations {{firstName}}!\n\nYou have successfully completed the training module "{{courseTitle}}".\n\nVisit your dashboard to view your progress.',
            variables: [
                'firstName',
                'courseTitle'
            ]
        },
        {
            id: 'CERTIFICATE_ISSUED',
            name: 'Certificate Issued',
            subject: 'Certificate Issued: {{courseTitle}}',
            body: 'Dear {{firstName}},\n\nA new certificate for "{{courseTitle}}" has been issued to your profile.\n\nCertificate ID: {{certId}}\n\nYou can download it from the Training section.',
            variables: [
                'firstName',
                'courseTitle',
                'certId'
            ]
        },
        {
            id: 'INVOICE_PAID',
            name: 'Invoice Paid',
            subject: 'Payment Confirmation: {{invoiceRef}}',
            body: 'Dear {{firstName}},\n\nThis email confirms that payment for Invoice #{{invoiceRef}} has been processed.\n\nAmount: £{{amount}}\n\nThank you for your hard work.',
            variables: [
                'firstName',
                'invoiceRef',
                'amount'
            ]
        },
        {
            id: 'MESSAGE_RECEIVED',
            name: 'New Message',
            subject: 'New Message from {{senderName}}',
            body: 'Hello {{firstName}},\n\nYou have received a new message from {{senderName}} regarding {{context}}.\n\n"{{preview}}..."\n\nLog in to reply.',
            variables: [
                'firstName',
                'senderName',
                'context',
                'preview'
            ]
        }
    ];
    emailLogs = [];
    // System Settings Default State
    settings = {
        // General
        registrationsOpen: true,
        requireManualVerification: true,
        maintenanceMode: false,
        // Operations
        marketplaceEnabled: true,
        autoAssignment: 'none',
        allowLinguistCancellation: true,
        jobAccessRequiresTraining: false,
        // LMS
        globalSelfEnrollment: true,
        allowInstructorCourseCreation: false,
        requirePrerequisites: true,
        // Finance
        defaultVatRate: 20,
        autoInvoiceGeneration: true,
        minPayoutThreshold: 50,
        paymentReleaseDelay: 14,
        platformFeePercent: 0,
        // SEO Defaults
        seo: {
            siteTitle: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMPANY_INFO"].name,
            siteDescription: "Leading provider of Swahili interpretation and translation services in the UK.",
            defaultKeywords: [
                "Swahili Interpreter",
                "Translation Services",
                "UK",
                "Medical Interpreting",
                "Legal Translation"
            ],
            structuredData: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMPANY_INFO"].name,
                "url": "https://jambolinguists.com",
                "logo": __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMPANY_INFO"].logoUrl,
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMPANY_INFO"].phone,
                    "contactType": "customer service",
                    "email": __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMPANY_INFO"].email
                },
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "First Floor, Radley House, Richardshaw Rd",
                    "addressLocality": "Pudsey",
                    "postalCode": "LS28 6LE",
                    "addressCountry": "UK"
                }
            }, null, 2)
        },
        // Email Defaults
        email: {
            enabled: true,
            smtpHost: 'smtp.example.com',
            smtpPort: 587,
            smtpUser: 'notifications@jambolinguists.com',
            smtpPass: '',
            security: 'STARTTLS',
            fromName: 'Jambo Linguists',
            fromEmail: 'noreply@jambolinguists.com'
        }
    };
    currentUserId = null;
    generateId(prefix) {
        return `${prefix}-${Date.now()}`;
    }
}
const db = new DataStore();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/services/AuthService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthService",
    ()=>AuthService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/store.ts [app-client] (ecmascript)");
;
class AuthService {
    // Check if session exists in storage
    init() {
        const storedId = localStorage.getItem('jambo_auth_user');
        if (storedId) {
            const user = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.find((u)=>u.id === storedId && !u.deletedAt && !u.isSuspended);
            if (user) {
                __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId = user.id;
            } else {
                // Invalid or deleted user in storage
                localStorage.removeItem('jambo_auth_user');
                __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId = null;
            }
        }
    }
    login(email, password) {
        const user = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.find((u)=>u.email.toLowerCase() === email.toLowerCase() && !u.deletedAt);
        if (!user) {
            return {
                success: false,
                error: 'Account not found.'
            };
        }
        // Check Password (Simulated security - In production use proper hashing like bcrypt)
        if (user.password && user.password !== password) {
            return {
                success: false,
                error: 'Invalid credentials.'
            };
        }
        if (user.isSuspended) {
            return {
                success: false,
                error: 'Account has been suspended. Contact support.'
            };
        }
        // Set Session
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId = user.id;
        localStorage.setItem('jambo_auth_user', user.id);
        // Log basic login activity
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].loginHistory.unshift({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('lh'),
            userId: user.id,
            timestamp: new Date().toISOString(),
            ipAddress: '127.0.0.1',
            source: 'direct'
        });
        return {
            success: true,
            user
        };
    }
    register(data) {
        // Validate inputs
        if (!data.email || !data.password || !data.firstName || !data.lastName) {
            return {
                success: false,
                error: 'All fields are required.'
            };
        }
        // Check if exists
        if (__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.some((u)=>u.email.toLowerCase() === data.email.toLowerCase())) {
            return {
                success: false,
                error: 'Email already registered.'
            };
        }
        const now = new Date().toISOString();
        const newUser = {
            id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('u'),
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            location: 'United Kingdom',
            role: 'linguist',
            isVerified: false,
            qualifications: [],
            languages: [],
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.push(newUser);
        // Auto-login after register
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId = newUser.id;
        localStorage.setItem('jambo_auth_user', newUser.id);
        // Add a welcome notification
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].notifications.push({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('n'),
            userId: newUser.id,
            title: "Welcome to Jambo Portal",
            message: "Please complete your profile to start receiving job offers.",
            time: "Just now",
            isRead: false,
            iconType: 'check',
            bg: 'bg-green-50',
            color: 'text-green-600',
            linkTo: 'profile',
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        });
        return {
            success: true,
            user: newUser
        };
    }
    logout() {
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId = null;
        localStorage.removeItem('jambo_auth_user');
    }
    getCurrentUser() {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.find((u)=>u.id === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId) || null;
    }
    updateProfile(data) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId) return;
        const idx = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.findIndex((u)=>u.id === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId);
        if (idx !== -1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users[idx] = {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users[idx],
                ...data,
                updatedAt: new Date().toISOString()
            };
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/portal/dashboard/jobs/job-helpers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateJobPayout",
    ()=>calculateJobPayout,
    "getInterpretingJobPayout",
    ()=>getInterpretingJobPayout,
    "getInterpretingJobPayoutDetails",
    ()=>getInterpretingJobPayoutDetails
]);
const getInterpretingJobPayout = (job)=>{
    const details = getInterpretingJobPayoutDetails(job);
    return details ? details.total : null;
};
const getInterpretingJobPayoutDetails = (job)=>{
    if (job.category !== 'Interpreting' || typeof job.hourlyRate !== 'number') {
        return null;
    }
    let hours = 0;
    if (job.duration) {
        const hoursMatch = job.duration.match(/(\d+(?:\.\d+)?)\s*h/);
        const minutesMatch = job.duration.match(/(\d+)\s*m/);
        if (hoursMatch) hours += parseFloat(hoursMatch[1]);
        if (minutesMatch) hours += parseInt(minutesMatch[1]) / 60;
    }
    const sessionPay = hours * job.hourlyRate;
    const mileagePay = (job.distance || 0) * (job.mileageRate || 0);
    const travelPay = (job.travelHours || 0) * (job.travelRate || 0);
    // Remote jobs should not have mileage or travel pay
    const isRemote = job.type === 'Video' || job.type === 'Telephone';
    const total = isRemote ? sessionPay : sessionPay + mileagePay + travelPay;
    return {
        hours,
        sessionPay,
        mileagePay: isRemote ? 0 : mileagePay,
        travelPay: isRemote ? 0 : travelPay,
        total
    };
};
const calculateJobPayout = (job)=>{
    switch(job.category){
        case 'Interpreting':
            {
                const payoutDetails = getInterpretingJobPayoutDetails(job);
                const total = payoutDetails ? payoutDetails.total : 0;
                return parseFloat(total.toFixed(2));
            }
        case 'Translation':
            {
                if (typeof job.fixedRate === 'number' && job.fixedRate > 0) {
                    return parseFloat(job.fixedRate.toFixed(2));
                }
                const wordCount = job.wordCount || 0;
                const wordRate = job.wordRate || 0;
                const total = wordCount * wordRate;
                return parseFloat(total.toFixed(2));
            }
        case 'Transcription':
            {
                // The duration string can be "45 mins audio", "45m", or just "45" from an input
                const durationMatch = job.duration?.match(/(\d+)/);
                const minutes = durationMatch ? parseInt(durationMatch[1], 10) : 0;
                const minuteRate = job.minuteRate || 0;
                const total = minutes * minuteRate;
                return parseFloat(total.toFixed(2));
            }
        default:
            {
                // Fallback for simple fixed rates from the summary string
                if (job.rate) {
                    const rateNum = parseFloat(job.rate.replace(/[^0-9.]/g, ''));
                    if (!isNaN(rateNum)) {
                        return rateNum;
                    }
                }
                return 0;
            }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/services/JobService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JobService",
    ()=>JobService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$job$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/jobs/job-helpers.ts [app-client] (ecmascript)");
;
;
class JobService {
    notifications;
    constructor(notificationService){
        this.notifications = notificationService;
    }
    getAvailableJobs() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs.filter((j)=>j.status === 'Open' && !j.deletedAt);
    }
    getBookedJobs() {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId) return [];
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs.filter((j)=>j.linguistId === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId && [
                'Scheduled',
                'In Progress',
                'Revision'
            ].includes(j.status) && !j.deletedAt);
    }
    getJobHistory() {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId) return [];
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs.filter((j)=>j.linguistId === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId && [
                'Completed',
                'Cancelled',
                'Pending Approval'
            ].includes(j.status) && !j.deletedAt);
    }
    getNextAssignment() {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId) return null;
        const booked = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs.filter((j)=>j.linguistId === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId && [
                'Scheduled',
                'In Progress'
            ].includes(j.status) && !j.deletedAt).sort((a, b)=>new Date(a.date + ' ' + (a.time || '00:00')).getTime() - new Date(b.date + ' ' + (b.time || '00:00')).getTime());
        return booked.length > 0 ? booked[0] : null;
    }
    // New method to handle self-unassignment
    unassignJob(jobId, userId) {
        const index = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs.findIndex((j)=>j.id === jobId);
        if (index !== -1) {
            const job = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs[index];
            // Security check: Must be the assigned linguist
            if (job.linguistId !== userId) return false;
            // Only allow unassigning if not completed or cancelled
            // Stricter check: Only 'Scheduled' usually implies before work starts
            if ([
                'Completed',
                'Cancelled'
            ].includes(job.status)) return false;
            const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.find((u)=>u.id === userId);
            const actorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Linguist';
            const now = new Date().toISOString();
            // Add history event
            const newHistory = [
                ...job.history || [],
                {
                    id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('h'),
                    type: 'ASSIGNED',
                    date: now,
                    actorName: actorName,
                    description: 'Linguist unassigned themselves. Job returned to marketplace.'
                }
            ];
            // Reset job
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs[index] = {
                ...job,
                linguistId: null,
                status: 'Open',
                history: newHistory,
                updatedAt: now
            };
            return true;
        }
        return false;
    }
    updateJobStatus(id, status, extraData) {
        const index = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs.findIndex((j)=>j.id === id);
        if (index !== -1 && !__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs[index].deletedAt) {
            const job = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs[index];
            const oldStatus = job.status;
            const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.find((u)=>u.id === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId);
            const actorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'System Admin';
            // --- SECURITY CHECK ---
            // If user is a linguist, prevent them from Cancelling a job directly or changing details they shouldn't.
            // They should use "Unassign" instead of "Cancel".
            if (currentUser?.role === 'linguist' && status === 'Cancelled') {
                console.warn("Linguists cannot cancel jobs directly. Use unassign.");
                return;
            }
            // --- HISTORY EVENT GENERATION ---
            const newHistory = [
                ...job.history || []
            ];
            const now = new Date().toISOString();
            // 1. Cancellation (High Priority Check)
            if (status === 'Cancelled') {
                newHistory.push({
                    id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('h'),
                    type: 'CANCELLED',
                    date: now,
                    actorName: actorName,
                    description: 'Job was cancelled.'
                });
            } else if (status === 'Pending Approval') {
                const isResubmission = oldStatus === 'Revision';
                newHistory.push({
                    id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('h'),
                    type: isResubmission ? 'RESUBMITTED' : 'SUBMITTED',
                    date: now,
                    actorName: actorName,
                    description: extraData?.notes || (isResubmission ? 'Revised work submitted.' : 'Work submitted for review.'),
                    attachment: extraData?.file
                });
            } else if (status === 'Revision') {
                newHistory.push({
                    id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('h'),
                    type: 'REVISION_REQUESTED',
                    date: now,
                    actorName: actorName,
                    description: extraData?.revisionFeedback,
                    attachment: extraData?.revisionFile
                });
            } else if (status === 'Completed' && oldStatus !== 'Completed') {
                newHistory.push({
                    id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('h'),
                    type: 'APPROVED',
                    date: now,
                    actorName: actorName,
                    description: 'Work approved. Payment queued.'
                });
            } else if (status === 'Scheduled' && oldStatus === 'Open') {
                newHistory.push({
                    id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('h'),
                    type: 'ASSIGNED',
                    date: now,
                    actorName: actorName,
                    description: currentUser?.role === 'linguist' ? 'Job claimed from marketplace.' : 'Job assigned by admin.'
                });
            }
            // Handle legacy Revision History for compatibility
            let revisionHistory = job.revisionHistory || [];
            if (status === 'Revision' && extraData?.revisionFeedback) {
                const newRecord = {
                    date: now,
                    feedback: extraData.revisionFeedback,
                    file: extraData.revisionFile
                };
                revisionHistory = [
                    newRecord,
                    ...revisionHistory
                ];
            }
            const updates = {
                status,
                updatedAt: now,
                // Handle linguist submission data
                ...extraData?.notes && {
                    completionNotes: extraData.notes
                },
                ...extraData?.file && {
                    completionFile: extraData.file
                },
                // Handle Admin Revision/Approval fields passed in extraData
                ...extraData,
                revisionHistory,
                history: newHistory,
                // Set completion timestamp if moving to Pending Approval or Completed
                ...status === 'Pending Approval' || status === 'Completed' ? {
                    completedAt: now
                } : {}
            };
            // Assign to current user if accepting Open job
            if (status === 'Scheduled' && job.status === 'Open' && currentUser && currentUser.role === 'linguist') {
                updates.linguistId = currentUser.id;
            }
            // Apply updates
            const updatedJob = {
                ...job,
                ...updates
            };
            // Auto-calculate total payout if approving/completing and not set
            if (status === 'Completed' && !updatedJob.totalPayout) {
                updatedJob.totalPayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$job$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateJobPayout"])(updatedJob);
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs[index] = updatedJob;
            // --- Notification Triggers ---
            if (updatedJob.linguistId) {
                // Notify Linguist: Job Approved (Payment Pending)
                if (oldStatus === 'Pending Approval' && status === 'Completed') {
                    this.notifications.notifyJobApproved(updatedJob.linguistId, updatedJob.title, updatedJob.id);
                }
                // Notify Linguist: Revision Requested
                if (status === 'Revision') {
                    this.notifications.notifyJobRevision(updatedJob.linguistId, updatedJob.title, updates.revisionFeedback || "Action required.");
                }
                // Notify Linguist: Job Assigned (Self Claim)
                if (status === 'Scheduled' && oldStatus === 'Open' && currentUser?.role === 'linguist') {
                    this.notifications.notifyJobAssigned(updatedJob.linguistId, updatedJob);
                }
            }
            // Notify Admins: Job Pending Approval
            if (status === 'Pending Approval') {
                // Fixed: Now calling dedicated method which sends emails
                if (updatedJob.linguistId) {
                    this.notifications.notifyJobCompletedPending({
                        id: updatedJob.id,
                        title: updatedJob.title,
                        linguistId: updatedJob.linguistId
                    });
                }
            }
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/services/AdminService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminService",
    ()=>AdminService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$job$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/jobs/job-helpers.ts [app-client] (ecmascript)");
;
;
class AdminService {
    notifications;
    constructor(notificationService){
        this.notifications = notificationService;
    }
    getAllJobs() {
        // Filter out soft-deleted jobs unless explicitly requested (for now, hiding them)
        return [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs
        ].filter((j)=>!j.deletedAt).sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    getAllUsers() {
        return [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users
        ].filter((u)=>!u.deletedAt).sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    getAllInvoices() {
        return [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].invoices
        ].filter((i)=>!i.deletedAt);
    }
    getJobsByUser(userId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs.filter((j)=>j.linguistId === userId && !j.deletedAt).sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    getInvoicesByUser(userId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].invoices.filter((i)=>i.userId === userId && !i.deletedAt).sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    // --- SYSTEM SETTINGS ---
    getSettings() {
        return {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].settings
        };
    }
    updateSettings(newSettings) {
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].settings = {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].settings,
            ...newSettings
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].settings;
    }
    // --- COMPLIANCE ---
    getComplianceDocs() {
        return [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].complianceDocs
        ].filter((d)=>!d.deletedAt);
    }
    updateComplianceDoc(id, content, title) {
        const idx = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].complianceDocs.findIndex((d)=>d.id === id);
        if (idx !== -1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].complianceDocs[idx] = {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].complianceDocs[idx],
                content,
                title: title || __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].complianceDocs[idx].title,
                lastUpdated: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
        }
    }
    // --- RESOURCES ---
    createResource(resource) {
        const newResource = {
            id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('res'),
            title: resource.title || 'New Resource',
            description: resource.description || '',
            category: resource.category || 'General',
            type: resource.type || 'link',
            url: resource.url || '#',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deletedAt: null
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].resources.unshift(newResource);
        return newResource;
    }
    updateResource(id, updates) {
        const idx = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].resources.findIndex((r)=>r.id === id);
        if (idx !== -1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].resources[idx] = {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].resources[idx],
                ...updates,
                updatedAt: new Date().toISOString()
            };
        }
    }
    deleteResource(id) {
        const idx = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].resources.findIndex((r)=>r.id === id);
        if (idx !== -1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].resources[idx].deletedAt = new Date().toISOString();
        }
    }
    // --- EMAIL ---
    updateEmailTemplate(id, updates) {
        const idx = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].emailTemplates.findIndex((t)=>t.id === id);
        if (idx !== -1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].emailTemplates[idx] = {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].emailTemplates[idx],
                ...updates
            };
        }
    }
    getEmailLogs() {
        return [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].emailLogs
        ].sort((a, b)=>new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());
    }
    // --- JOBS & FINANCE ---
    approveJobSubmission(jobId) {
        const jobIndex = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs.findIndex((j)=>j.id === jobId);
        if (jobIndex === -1) throw new Error('Job not found');
        const job = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs[jobIndex];
        const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.find((u)=>u.id === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId);
        const now = new Date().toISOString();
        const newInvoice = {
            id: `inv-${Date.now()}`,
            userId: job.linguistId || 'unknown',
            reference: `INV-${job.id}`,
            date: now,
            dueDate: new Date(Date.now() + 14 * 86400000).toISOString(),
            amount: job.totalPayout || (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$job$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateJobPayout"])(job) || 0,
            status: 'Pending',
            items: [
                {
                    description: `${job.category}: ${job.title}`,
                    amount: job.totalPayout || (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$job$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateJobPayout"])(job) || 0,
                    jobId: job.id
                }
            ],
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].invoices.unshift(newInvoice);
        if (newInvoice.userId && newInvoice.userId !== 'custom') {
            this.notifications.notifyInvoiceCreated(newInvoice.userId, newInvoice.reference);
        }
        const newHistory = [
            ...job.history || []
        ];
        const actorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'System Admin';
        newHistory.push({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('h'),
            type: 'APPROVED',
            date: now,
            actorName,
            description: 'Work approved by admin.'
        });
        newHistory.push({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('h'),
            type: 'INVOICE_PENDING',
            date: now,
            actorName,
            description: `Invoice #${newInvoice.reference} generated.`
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs[jobIndex] = {
            ...job,
            status: 'Completed',
            history: newHistory,
            completedAt: now,
            updatedAt: now
        };
        // Notify Linguist
        if (job.linguistId) {
            this.notifications.notifyJobApproved(job.linguistId, job.title, job.id);
        }
        return newInvoice;
    }
    adminForceCompleteJob(jobId, notes) {
        const jobIndex = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs.findIndex((j)=>j.id === jobId);
        if (jobIndex === -1) throw new Error('Job not found');
        const job = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs[jobIndex];
        const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.find((u)=>u.id === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId);
        const actorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'System Admin';
        const now = new Date().toISOString();
        const newHistory = [
            ...job.history || []
        ];
        // Log the takeover
        newHistory.push({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('h'),
            type: 'APPROVED',
            date: now,
            actorName,
            description: `Admin Override: Job completed internally. Reassigned from ${job.linguistId} to Admin (${currentUser?.id}).`
        });
        const updatedJob = {
            ...job,
            status: 'Completed',
            linguistId: currentUser?.id || 'u-admin-001',
            completionNotes: notes,
            completedAt: now,
            updatedAt: now,
            history: newHistory,
            // Calculate payout but it won't be invoiced to the original linguist
            totalPayout: job.totalPayout || (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$job$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateJobPayout"])(job)
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs[jobIndex] = updatedJob;
        return updatedJob;
    }
    createUser(userData) {
        const now = new Date().toISOString();
        const newUser = {
            id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('u'),
            email: userData.email || '',
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            role: userData.role || 'linguist',
            isVerified: true,
            isSuspended: false,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
            location: userData.location || '',
            headline: userData.headline || 'New Member',
            languages: userData.languages || [],
            qualifications: [],
            ...userData
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.unshift(newUser);
        return newUser;
    }
    updateUser(userId, data) {
        const idx = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.findIndex((u)=>u.id === userId);
        if (idx !== -1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users[idx] = {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users[idx],
                ...data,
                updatedAt: new Date().toISOString()
            };
            return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users[idx];
        }
        return null;
    }
    updateUserVerification(userId, isVerified) {
        const idx = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.findIndex((u)=>u.id === userId);
        if (idx !== -1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users[idx].isVerified = isVerified;
            if (isVerified) __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users[idx].isSuspended = false;
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users[idx].updatedAt = new Date().toISOString();
        }
    }
    suspendUser(userId, isSuspended) {
        const idx = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.findIndex((u)=>u.id === userId);
        if (idx !== -1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users[idx].isSuspended = isSuspended;
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users[idx].updatedAt = new Date().toISOString();
        }
    }
    createJob(jobData) {
        const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.find((u)=>u.id === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId);
        const creatorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'System Admin';
        const now = new Date().toISOString();
        const initialHistory = [
            {
                id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('h'),
                type: 'CREATED',
                date: now,
                actorName: creatorName,
                description: 'Job created via Admin Portal'
            }
        ];
        if (jobData.linguistId) {
            const linguist = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.find((u)=>u.id === jobData.linguistId);
            const name = linguist ? `${linguist.firstName} ${linguist.lastName}` : 'Linguist';
            initialHistory.push({
                id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('h'),
                type: 'ASSIGNED',
                date: now,
                actorName: creatorName,
                description: `Directly assigned to ${name}`
            });
        }
        const newJob = {
            id: `JL-${Date.now()}`,
            category: 'Interpreting',
            type: 'Video',
            status: 'Open',
            title: 'New Job',
            description: '',
            date: new Date().toISOString().split('T')[0],
            location: 'Remote',
            languagePair: '',
            rate: '',
            isUrgent: false,
            attachments: [],
            history: initialHistory,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
            ...jobData
        };
        if (newJob.linguistId) {
            newJob.status = 'Scheduled';
            // Notify Assigned
            this.notifications.notifyJobAssigned(newJob.linguistId, newJob);
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs.unshift(newJob);
        return newJob;
    }
    updateJobDetails(jobId, updates, newFiles, keptAttachments) {
        const index = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs.findIndex((j)=>j.id === jobId);
        if (index !== -1) {
            const oldJob = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs[index];
            const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.find((u)=>u.id === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId);
            const actorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Admin';
            const now = new Date().toISOString();
            const changes = [];
            // Compare significant fields
            if (updates.title && updates.title !== oldJob.title) changes.push('Title');
            if (updates.date && updates.date !== oldJob.date) changes.push(`Date (${oldJob.date} -> ${updates.date})`);
            if (updates.time && updates.time !== oldJob.time) changes.push('Time');
            if (updates.location && updates.location !== oldJob.location) changes.push('Location');
            if (updates.rate && updates.rate !== oldJob.rate) changes.push('Financials');
            if (updates.description && updates.description !== oldJob.description) changes.push('Description');
            // Handle Attachments
            let finalAttachments = oldJob.attachments || [];
            if (keptAttachments !== undefined) {
                const removedCount = (oldJob.attachments?.length || 0) - keptAttachments.length;
                if (removedCount > 0) {
                    changes.push(`${removedCount} file(s) removed`);
                }
                finalAttachments = [
                    ...keptAttachments
                ];
            }
            if (newFiles.length > 0) {
                changes.push(`${newFiles.length} file(s) added`);
                finalAttachments = [
                    ...finalAttachments,
                    ...newFiles
                ];
            }
            const newHistory = [
                ...oldJob.history
            ];
            if (changes.length > 0) {
                newHistory.push({
                    id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('h'),
                    type: 'CREATED',
                    date: now,
                    actorName: actorName,
                    description: `Job Updated: ${changes.join(', ')}`
                });
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs[index] = {
                ...oldJob,
                ...updates,
                attachments: finalAttachments,
                history: newHistory,
                updatedAt: now
            };
            return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs[index];
        }
        return null;
    }
    assignJob(jobId, linguistId) {
        const index = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs.findIndex((j)=>j.id === jobId);
        if (index !== -1) {
            const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.find((u)=>u.id === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId);
            const actorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Admin';
            const oldLinguistId = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs[index].linguistId;
            const now = new Date().toISOString();
            // Only add history if changing assignment
            if (oldLinguistId !== linguistId) {
                const newHistory = [
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs[index].history || []
                ];
                if (linguistId) {
                    const linguist = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.find((u)=>u.id === linguistId);
                    const name = linguist ? `${linguist.firstName} ${linguist.lastName}` : 'Linguist';
                    newHistory.push({
                        id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('h'),
                        type: 'ASSIGNED',
                        date: now,
                        actorName: actorName,
                        description: `Assigned to ${name}`
                    });
                } else {
                    newHistory.push({
                        id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('h'),
                        type: 'ASSIGNED',
                        date: now,
                        actorName: actorName,
                        description: `Unassigned (Moved to Open Marketplace)`
                    });
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs[index] = {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs[index],
                    linguistId,
                    status: linguistId ? 'Scheduled' : 'Open',
                    history: newHistory,
                    updatedAt: now
                };
                // Notify Assigned
                if (linguistId) {
                    this.notifications.notifyJobAssigned(linguistId, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs[index]);
                }
            }
        }
    }
    getLoginHistoryForUser(userId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].loginHistory.filter((entry)=>entry.userId === userId).sort((a, b)=>new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
    logImpersonation(adminId, targetUserId) {
        const newEntry = {
            id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('lh'),
            userId: targetUserId,
            timestamp: new Date().toISOString(),
            ipAddress: '127.0.0.1',
            source: 'impersonation',
            impersonatorId: adminId
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].loginHistory.unshift(newEntry);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/services/TrainingService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrainingService",
    ()=>TrainingService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/store.ts [app-client] (ecmascript)");
;
class TrainingService {
    notifications;
    constructor(notificationService){
        this.notifications = notificationService;
    }
    getCourses() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courses.filter((c)=>!c.deletedAt).map((course)=>{
            const progress = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId ? __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courseProgress.find((p)=>p.userId === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId && p.courseId === course.id) : undefined;
            return {
                ...course,
                progress
            };
        });
    }
    getCourse(courseId) {
        const course = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courses.find((c)=>c.id === courseId && !c.deletedAt);
        if (!course) return undefined;
        const progress = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId ? __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courseProgress.find((p)=>p.userId === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId && p.courseId === courseId) : undefined;
        return {
            ...course,
            progress
        };
    }
    getLessons(courseId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].lessons.filter((l)=>l.courseId === courseId && !l.deletedAt).sort((a, b)=>a.orderIndex - b.orderIndex);
    }
    getCourseProgress(courseId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courseProgress.filter((p)=>p.courseId === courseId);
    }
    enrollCourse(courseId) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId) return {
            success: false,
            message: 'User not logged in'
        };
        // 1. Check Global Settings
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].settings.globalSelfEnrollment) {
            return {
                success: false,
                message: 'Self-enrollment is currently disabled by administrators.'
            };
        }
        const course = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courses.find((c)=>c.id === courseId && !c.deletedAt);
        if (!course) return {
            success: false,
            message: 'Course not found'
        };
        // 2. Check Course Settings
        if (!course.allowSelfEnrollment) {
            return {
                success: false,
                message: 'This course requires manual approval to enroll.'
            };
        }
        // 3. Check Prerequisites
        if (__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].settings.requirePrerequisites && course.settings.prerequisites && course.settings.prerequisites.length > 0) {
            const userCompletedIds = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courseProgress.filter((p)=>p.userId === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId && p.status === 'Completed').map((p)=>p.courseId);
            const missingPrereqs = course.settings.prerequisites.filter((id)=>!userCompletedIds.includes(id));
            if (missingPrereqs.length > 0) {
                return {
                    success: false,
                    message: 'You have not completed the required prerequisites for this course.'
                };
            }
        }
        // Check if already exists to prevent dupes
        const exists = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courseProgress.find((p)=>p.userId === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId && p.courseId === courseId);
        if (exists) return {
            success: true,
            message: 'Already enrolled.'
        };
        // Create initial progress record
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courseProgress.push({
            userId: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId,
            courseId: courseId,
            status: 'In Progress',
            progressPercent: 0,
            lessonsCompletedIds: [],
            lastAccessedAt: new Date().toISOString(),
            enrollmentDate: new Date().toISOString(),
            history: [
                {
                    date: new Date().toISOString(),
                    action: 'Enrolled in course'
                }
            ]
        });
        return {
            success: true,
            message: 'Enrolled successfully.'
        };
    }
    completeLesson(courseId, lessonId) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId) return;
        // Find or create progress record
        let progress = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courseProgress.find((p)=>p.userId === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId && p.courseId === courseId);
        if (!progress) {
            progress = {
                userId: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId,
                courseId: courseId,
                status: 'In Progress',
                progressPercent: 0,
                lessonsCompletedIds: [],
                lastAccessedAt: new Date().toISOString(),
                enrollmentDate: new Date().toISOString(),
                history: [
                    {
                        date: new Date().toISOString(),
                        action: 'Started course via lesson access'
                    }
                ]
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courseProgress.push(progress);
        }
        // Update last accessed
        progress.lastAccessedLessonId = lessonId;
        progress.lastAccessedAt = new Date().toISOString();
        // Mark lesson complete if not already
        if (!progress.lessonsCompletedIds.includes(lessonId)) {
            progress.lessonsCompletedIds.push(lessonId);
            const lessonTitle = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].lessons.find((l)=>l.id === lessonId)?.title || 'Lesson';
            progress.history = [
                ...progress.history || [],
                {
                    date: new Date().toISOString(),
                    action: `Completed ${lessonTitle}`
                }
            ];
        }
        // Calculate percent
        const totalLessons = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].lessons.filter((l)=>l.courseId === courseId && !l.deletedAt).length;
        if (totalLessons > 0) {
            progress.progressPercent = Math.round(progress.lessonsCompletedIds.length / totalLessons * 100);
        }
        // Check if course complete
        if (progress.progressPercent === 100 && progress.status !== 'Completed') {
            progress.status = 'Completed';
            progress.completedAt = new Date().toISOString();
            progress.history = [
                ...progress.history || [],
                {
                    date: new Date().toISOString(),
                    action: 'Course Completed'
                }
            ];
            const course = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courses.find((c)=>c.id === courseId);
            // Notification System
            const hasNotif = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].notifications.some((n)=>n.title.includes(`Course Completed: ${course?.title}`));
            if (!hasNotif) {
                const now = new Date().toISOString();
                __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].notifications.unshift({
                    id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('n'),
                    userId: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId,
                    title: `Course Completed: ${course?.title}`,
                    time: "Just now",
                    isRead: false,
                    iconType: 'grad',
                    bg: 'bg-yellow-50',
                    color: 'text-yellow-600',
                    linkTo: 'training-certificates',
                    createdAt: now,
                    updatedAt: now,
                    deletedAt: null
                });
                // --- NEW: Send Email ---
                if (course) {
                    this.notifications.notifyCourseCompleted(__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId, course.title);
                }
            }
        }
    }
    checkCompliance(requiredCourseIds) {
        if (!requiredCourseIds || requiredCourseIds.length === 0) return {
            compliant: true,
            missingCourses: []
        };
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId) return {
            compliant: false,
            missingCourses: requiredCourseIds
        };
        const userProgress = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courseProgress.filter((p)=>p.userId === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId && p.status === 'Completed');
        const completedIds = userProgress.map((p)=>p.courseId);
        const missing = requiredCourseIds.filter((id)=>!completedIds.includes(id));
        const missingTitles = missing.map((id)=>__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courses.find((c)=>c.id === id)?.title || id);
        return {
            compliant: missing.length === 0,
            missingCourses: missingTitles
        };
    }
    getCertificates() {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId) return [];
        // Find certificates belonging to current user that are Active
        const userCertificates = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].certificates.filter((cert)=>cert.userId === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId && cert.status === 'Active' && !cert.deletedAt);
        // Map these certificates back to their courses
        return userCertificates.map((cert)=>{
            const course = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courses.find((c)=>c.id === cert.courseId && !c.deletedAt);
            if (!course) return null;
            const progress = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courseProgress.find((p)=>p.userId === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId && p.courseId === cert.courseId);
            return {
                ...course,
                progress: progress ? {
                    ...progress,
                    certificateId: cert.id
                } : undefined
            };
        }).filter((c)=>c !== null);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/services/FinanceService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FinanceService",
    ()=>FinanceService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/store.ts [app-client] (ecmascript)");
;
class FinanceService {
    notifications;
    constructor(notificationService){
        this.notifications = notificationService;
    }
    getInvoices() {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId) return [];
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].invoices.filter((inv)=>inv.userId === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId && !inv.deletedAt).sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    createInvoice(invoice) {
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].invoices.unshift(invoice);
        // Notify if it's a real user
        if (invoice.userId && invoice.userId !== 'custom') {
            this.notifications.notifyInvoiceCreated(invoice.userId, invoice.reference);
        }
    }
    // New Method for Editing
    updateInvoice(invoice) {
        const idx = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].invoices.findIndex((i)=>i.id === invoice.id);
        if (idx !== -1) {
            const oldInvoice = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].invoices[idx];
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].invoices[idx] = {
                ...invoice,
                updatedAt: new Date().toISOString()
            };
            // If updating a paid invoice, notify amendment
            if (oldInvoice.status === 'Paid' && invoice.userId && invoice.userId !== 'custom') {
                this.notifications.notifyInvoiceAmended(invoice.userId, invoice.reference);
            }
        }
    }
    updateInvoiceStatus(id, status) {
        const idx = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].invoices.findIndex((i)=>i.id === id);
        if (idx !== -1) {
            const invoice = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].invoices[idx];
            const now = new Date().toISOString();
            // Create new object reference to trigger React updates
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].invoices[idx] = {
                ...invoice,
                status,
                updatedAt: now
            };
            // Notify on Payment
            if (status === 'Paid' && invoice.userId && invoice.userId !== 'custom') {
                this.notifications.notifyInvoicePaid(invoice.userId, invoice.reference, invoice.amount);
            }
            // Add INVOICE_PAID event to job history
            if (status === 'Paid') {
                const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.find((u)=>u.id === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId);
                const actorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'System';
                for (const item of invoice.items){
                    if (item.jobId) {
                        const jobIndex = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs.findIndex((j)=>j.id === item.jobId);
                        if (jobIndex !== -1) {
                            const job = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs[jobIndex];
                            const newHistory = [
                                ...job.history || []
                            ];
                            newHistory.push({
                                id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('h'),
                                type: 'INVOICE_PAID',
                                date: now,
                                actorName: actorName,
                                description: `Payment confirmed for Invoice #${invoice.reference}.`
                            });
                            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs[jobIndex] = {
                                ...job,
                                history: newHistory,
                                updatedAt: now
                            };
                        }
                    }
                }
            }
        }
    }
    getFinanceStats() {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId) return {
            totalPaid: 0,
            pendingPayout: 0,
            nextPayoutDate: 'N/A',
            invoicesCount: 0
        };
        const userInvoices = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].invoices.filter((inv)=>inv.userId === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId && !inv.deletedAt);
        const totalPaid = userInvoices.filter((i)=>i.status === 'Paid').reduce((sum, i)=>sum + i.amount, 0);
        const pendingPayout = userInvoices.filter((i)=>i.status === 'Pending').reduce((sum, i)=>sum + i.amount, 0);
        const nextPayoutDate = pendingPayout > 0 ? '14 Nov 2025' : 'N/A';
        return {
            totalPaid,
            pendingPayout,
            nextPayoutDate,
            invoicesCount: userInvoices.length
        };
    }
    getStats() {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId) {
            return {
                earnings: "£0",
                earningsLabel: "Earnings",
                earningsTrend: "0%",
                completedJobs: 0,
                completedJobsSubtext: "No history",
                qualityScore: "0.0/5",
                qualityScoreSubtext: "No reviews"
            };
        }
        const completed = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs.filter((j)=>j.linguistId === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId && j.status === 'Completed' && !j.deletedAt);
        // --- KEY UPDATE: Calculate Earnings from PAID INVOICES, not Job Payouts ---
        const userInvoices = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].invoices.filter((inv)=>inv.userId === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId && !inv.deletedAt);
        const totalEarnings = userInvoices.filter((inv)=>inv.status === 'Paid').reduce((sum, inv)=>sum + inv.amount, 0);
        const ratedJobs = completed.filter((j)=>j.rating !== undefined);
        const avgRating = ratedJobs.length > 0 ? (ratedJobs.reduce((sum, j)=>sum + (j.rating || 0), 0) / ratedJobs.length).toFixed(1) : "5.0";
        let lastJobText = "No jobs yet";
        if (completed.length > 0) {
            const sortedCompleted = [
                ...completed
            ].sort((a, b)=>new Date(b.completedAt || b.date).getTime() - new Date(a.completedAt || a.date).getTime());
            const lastDate = new Date(sortedCompleted[0].completedAt || sortedCompleted[0].date);
            const diffTime = Math.abs(new Date().getTime() - lastDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            lastJobText = `Last job: ${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
        }
        return {
            earnings: `£${totalEarnings.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            })}`,
            earningsLabel: "Earnings (Paid)",
            earningsTrend: "+12% this month",
            completedJobs: completed.length,
            completedJobsSubtext: lastJobText,
            qualityScore: `${avgRating}/5`,
            qualityScoreSubtext: ratedJobs.length > 0 ? `Based on ${ratedJobs.length} reviews` : "New Linguist"
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/services/NotificationService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NotificationService",
    ()=>NotificationService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/store.ts [app-client] (ecmascript)");
;
class NotificationService {
    create(userId, title, message, type, link) {
        const now = new Date().toISOString();
        const newNotification = {
            id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('n'),
            userId,
            title,
            message,
            time: now,
            isRead: false,
            iconType: type,
            bg: this.getBgColor(type),
            color: this.getColor(type),
            linkTo: link,
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].notifications.unshift(newNotification);
    }
    // Helper for colors
    getBgColor(type) {
        switch(type){
            case 'check':
                return 'bg-green-50';
            case 'briefcase':
                return 'bg-blue-50';
            case 'shield':
                return 'bg-orange-50';
            case 'grad':
                return 'bg-purple-50';
            default:
                return 'bg-gray-50';
        }
    }
    getColor(type) {
        switch(type){
            case 'check':
                return 'text-green-600';
            case 'briefcase':
                return 'text-blue-600';
            case 'shield':
                return 'text-orange-600';
            case 'grad':
                return 'text-purple-600';
            default:
                return 'text-gray-600';
        }
    }
    // --- EMAIL SYSTEM ---
    sendEmail(userId, templateId, data) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].settings.email.enabled) {
            console.log(`[Email] Skipped (Disabled): ${templateId} to ${userId}`);
            return;
        }
        const user = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.find((u)=>u.id === userId);
        if (!user || !user.email) {
            console.warn(`[Email] Failed: User not found or no email for ID ${userId}`);
            return;
        }
        // Check user preferences
        if (user.notificationPreferences && !user.notificationPreferences.emailUpdates) {
            console.log(`[Email] Skipped (User Pref): ${templateId} to ${userId}`);
            return;
        }
        const template = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].emailTemplates.find((t)=>t.id === templateId);
        if (!template) {
            console.error(`[Email] Template not found: ${templateId}`);
            return;
        }
        // Parse Template
        let subject = template.subject;
        let body = template.body;
        Object.keys(data).forEach((key)=>{
            const regex = new RegExp(`{{${key}}}`, 'g');
            const value = data[key] !== undefined ? String(data[key]) : '';
            subject = subject.replace(regex, value);
            body = body.replace(regex, value);
        });
        // Add User Context
        subject = subject.replace(/{{firstName}}/g, user.firstName);
        subject = subject.replace(/{{lastName}}/g, user.lastName);
        body = body.replace(/{{firstName}}/g, user.firstName);
        body = body.replace(/{{lastName}}/g, user.lastName);
        // "Send" (Log it)
        const log = {
            id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('mail'),
            recipientEmail: user.email,
            templateId: templateId,
            subject: subject,
            status: 'Sent',
            sentAt: new Date().toISOString()
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].emailLogs.unshift(log);
        console.log(`[Email SENT] To: ${user.email} | Subject: ${subject}`);
    }
    // --- Public Triggers ---
    notifyJobApproved(userId, jobTitle, jobId) {
        this.create(userId, 'Job Approved', `Your submission for "${jobTitle}" has been approved. Payment is pending.`, 'check', `jobs-history`);
        this.sendEmail(userId, 'JOB_APPROVED', {
            jobTitle,
            jobId
        });
    }
    notifyJobRevision(userId, jobTitle, note) {
        this.create(userId, 'Revision Requested', `Action required for "${jobTitle}": ${note}`, 'shield', `jobs-bookings`);
    // No specific email template for revision in requirements, but good to have. 
    // Skipping email for strict adherence to requested list, or fallback to generic if needed.
    }
    notifyJobAssigned(userId, job) {
        this.create(userId, 'New Assignment', `You have been assigned to "${job.title}".`, 'briefcase', 'jobs-bookings');
        this.sendEmail(userId, 'JOB_ASSIGNED', {
            jobTitle: job.title,
            date: new Date(job.date).toLocaleDateString(),
            location: job.location,
            jobId: job.id
        });
    }
    notifyJobCompletedPending(job) {
        // Notify Admins
        const admins = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.filter((u)=>u.role === 'admin' && !u.deletedAt);
        const linguist = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.find((u)=>u.id === job.linguistId);
        admins.forEach((admin)=>{
            this.create(admin.id, 'Approval Required', `Job #${job.id} submitted by ${linguist?.firstName} ${linguist?.lastName}.`, 'briefcase', 'jobs:Pending Approval');
            // Send email to admin
            this.sendEmail(admin.id, 'JOB_COMPLETED_PENDING', {
                jobTitle: job.title,
                jobId: job.id,
                firstName: linguist?.firstName || 'Linguist',
                lastName: linguist?.lastName || ''
            });
        });
    }
    notifyInvoicePaid(userId, reference, amount) {
        this.create(userId, 'Payment Received', `Invoice #${reference} has been marked as Paid.`, 'briefcase', 'finance');
        this.sendEmail(userId, 'INVOICE_PAID', {
            invoiceRef: reference,
            amount: amount.toFixed(2)
        });
    }
    notifyInvoiceCreated(userId, reference) {
        this.create(userId, 'New Invoice', `Invoice #${reference} has been generated.`, 'briefcase', 'finance');
    }
    notifyInvoiceAmended(userId, reference) {
        this.create(userId, 'Invoice Amended', `Details for invoice #${reference} have been updated by admin.`, 'shield', 'finance');
    }
    notifyAdminAction(userId, title, message, link) {
        this.create(userId, title, message, 'briefcase', link);
    }
    notifyCertificateIssued(userId, courseTitle, certId) {
        this.create(userId, 'Certificate Issued', `Congratulations! You earned a certificate for "${courseTitle}".`, 'grad', 'training-certificates');
        this.sendEmail(userId, 'CERTIFICATE_ISSUED', {
            courseTitle,
            certId
        });
    }
    notifyCourseCompleted(userId, courseTitle) {
        // In-app notification handled in TrainingService usually, adding email here
        this.sendEmail(userId, 'COURSE_COMPLETED', {
            courseTitle
        });
    }
    notifyMessageReceived(userId, senderName, content, jobId) {
        // In-app is handled by real-time hook usually, but we can log notification if offline
        this.sendEmail(userId, 'MESSAGE_RECEIVED', {
            senderName,
            context: jobId ? `Job #${jobId}` : 'Direct Message',
            preview: content.substring(0, 50)
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/services/CertificateService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CertificateService",
    ()=>CertificateService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/store.ts [app-client] (ecmascript)");
;
class CertificateService {
    notifications;
    constructor(notificationService){
        this.notifications = notificationService;
    }
    issueCertificate(userId, courseId, templateId) {
        const now = new Date().toISOString();
        // 1. Create Certificate Record
        const newCert = {
            id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('cert'),
            userId,
            courseId,
            issueDate: now,
            status: 'Active',
            verificationCode: crypto.randomUUID(),
            templateId,
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].certificates.push(newCert);
        // 2. Link to Course Progress
        const progressIdx = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courseProgress.findIndex((p)=>p.userId === userId && p.courseId === courseId);
        if (progressIdx !== -1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courseProgress[progressIdx] = {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courseProgress[progressIdx],
                certificateId: newCert.id,
                status: 'Completed',
                completedAt: newCert.issueDate
            };
        }
        // 3. Notify User
        const course = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courses.find((c)=>c.id === courseId);
        if (course) {
            this.notifications.notifyCertificateIssued(userId, course.title, newCert.id);
        }
        return newCert;
    }
    revokeCertificate(certificateId) {
        const idx = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].certificates.findIndex((c)=>c.id === certificateId);
        if (idx !== -1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].certificates[idx].status = 'Revoked';
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].certificates[idx].updatedAt = new Date().toISOString();
        // Unlink from progress but keep completion status? 
        // Often revocation means they are no longer certified, but they *did* finish the course.
        // We'll leave the progress as is, but the certificate is invalid.
        }
    }
    reissueCertificate(certificateId) {
        const oldCert = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].certificates.find((c)=>c.id === certificateId);
        if (!oldCert) return null;
        // Revoke old
        this.revokeCertificate(certificateId);
        // Issue new
        return this.issueCertificate(oldCert.userId, oldCert.courseId, oldCert.templateId);
    }
    getCertificate(id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].certificates.find((c)=>c.id === id && !c.deletedAt);
    }
    getUserCertificates(userId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].certificates.filter((c)=>c.userId === userId && !c.deletedAt);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/services/LmsAdminService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LmsAdminService",
    ()=>LmsAdminService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/store.ts [app-client] (ecmascript)");
;
class LmsAdminService {
    notifications;
    certificateService;
    constructor(notificationService, certificateService){
        this.notifications = notificationService;
        this.certificateService = certificateService;
    }
    saveCourse(courseData, lessons) {
        const isNew = !courseData.id;
        const courseId = courseData.id || __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('c');
        const now = new Date().toISOString();
        const newCourse = {
            id: courseId,
            title: courseData.title || 'Untitled Course',
            description: courseData.description || '',
            category: courseData.category || 'General',
            duration: courseData.duration || '0m',
            lessonsCount: lessons.length,
            thumbnailUrl: courseData.thumbnailUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
            instructor: courseData.instructor || 'Jambo Training',
            instructorRole: courseData.instructorRole || 'Instructor',
            learningGoals: courseData.learningGoals || [],
            allowSelfEnrollment: courseData.allowSelfEnrollment ?? true,
            status: courseData.status || 'Draft',
            settings: courseData.settings || {
                visibility: 'Hidden',
                allowReenrollment: true,
                requirePrerequisites: false,
                prerequisites: [],
                passingScore: 80,
                autoIssueCertificate: true,
                notifications: {
                    onEnroll: true,
                    onComplete: true
                }
            },
            compliance: courseData.compliance || {
                requiredForJobTypes: [],
                isMandatory: false
            },
            createdAt: courseData.createdAt || now,
            updatedAt: now,
            deletedAt: null
        };
        if (isNew) {
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courses.push(newCourse);
        } else {
            const idx = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courses.findIndex((c)=>c.id === courseId);
            if (idx !== -1) {
                __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courses[idx] = newCourse;
            }
        }
        // Hard delete existing lessons for simplicity in this mock DB scenario when replacing structure
        // In a real DB, you'd soft delete orphans.
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].lessons = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].lessons.filter((l)=>l.courseId !== courseId);
        const newLessons = lessons.map((l, index)=>({
                ...l,
                id: l.id.startsWith('temp-') ? __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('l') + index : l.id,
                courseId: courseId,
                orderIndex: index,
                createdAt: l.createdAt || now,
                updatedAt: now,
                deletedAt: null
            }));
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].lessons.push(...newLessons);
        return newCourse;
    }
    deleteCourse(courseId) {
        const idx = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courses.findIndex((c)=>c.id === courseId);
        if (idx !== -1) {
            // Soft delete the course
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courses[idx].deletedAt = new Date().toISOString();
            // Soft delete related lessons
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].lessons.forEach((l)=>{
                if (l.courseId === courseId) l.deletedAt = new Date().toISOString();
            });
        }
    }
    enrollUser(courseId, userId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courseProgress.some((p)=>p.courseId === courseId && p.userId === userId)) return;
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courseProgress.push({
            userId,
            courseId,
            status: 'In Progress',
            progressPercent: 0,
            lessonsCompletedIds: [],
            enrollmentDate: new Date().toISOString(),
            lastAccessedAt: new Date().toISOString(),
            timeSpent: '0m',
            history: [
                {
                    date: new Date().toISOString(),
                    action: 'Enrolled by Admin'
                }
            ]
        });
        const course = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courses.find((c)=>c.id === courseId);
        this.notifications.notifyAdminAction(userId, "Course Enrollment", `You have been enrolled in "${course?.title}" by an administrator.`, "training");
    }
    removeUser(courseId, userId) {
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courseProgress = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courseProgress.filter((p)=>!(p.courseId === courseId && p.userId === userId));
    }
    updateLearnerProgress(courseId, userId, updates) {
        const idx = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courseProgress.findIndex((p)=>p.courseId === courseId && p.userId === userId);
        if (idx !== -1) {
            const current = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courseProgress[idx];
            const newHistory = [
                ...current.history || []
            ];
            if (updates.status && updates.status !== current.status) {
                newHistory.push({
                    date: new Date().toISOString(),
                    action: `Status changed to ${updates.status} by Admin`
                });
            }
            if (updates.instructorNotes) {
                newHistory.push({
                    date: new Date().toISOString(),
                    action: `Instructor note added`
                });
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courseProgress[idx] = {
                ...current,
                ...updates,
                history: newHistory,
                completedAt: updates.status === 'Completed' && !current.completedAt ? new Date().toISOString() : current.completedAt
            };
            // Auto-issue certificate if marked completed by admin and course has auto-issue enabled
            if (updates.status === 'Completed' && !current.certificateId) {
                const course = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courses.find((c)=>c.id === courseId);
                if (course?.settings.autoIssueCertificate) {
                    this.certificateService.issueCertificate(userId, courseId);
                }
            }
        }
    }
    updateCourseSettings(courseId, updates) {
        const idx = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courses.findIndex((c)=>c.id === courseId);
        if (idx !== -1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courses[idx] = {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].courses[idx],
                ...updates,
                updatedAt: new Date().toISOString()
            };
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/services/MessageService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MessageService",
    ()=>MessageService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/store.ts [app-client] (ecmascript)");
;
class MessageService {
    notifications;
    constructor(notificationService){
        this.notifications = notificationService;
    }
    getAllMessages() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].messages;
    }
    getConversations(userId) {
        const userMessages = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].messages.filter((m)=>m.senderId === userId || m.recipientId === userId && !m.deletedAt);
        // Group by Peer + Job Context
        const groups = {};
        userMessages.forEach((msg)=>{
            const peerId = msg.senderId === userId ? msg.recipientId : msg.senderId;
            const jobIdKey = msg.jobId || 'dm'; // Group null jobIds together as 'dm'
            const key = `${peerId}_${jobIdKey}`;
            if (!groups[key]) groups[key] = [];
            groups[key].push(msg);
        });
        // Convert groups to Conversation objects
        const conversations = Object.keys(groups).map((key)=>{
            const msgs = groups[key].sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Newest first
            const lastMessage = msgs[0];
            const peerId = lastMessage.senderId === userId ? lastMessage.recipientId : lastMessage.senderId;
            const unreadCount = msgs.filter((m)=>m.recipientId === userId && !m.isRead).length;
            const peer = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.find((u)=>u.id === peerId);
            const job = lastMessage.jobId ? __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].jobs.find((j)=>j.id === lastMessage.jobId) : undefined;
            return {
                peerId,
                jobId: lastMessage.jobId,
                lastMessage,
                unreadCount,
                peer,
                job
            };
        });
        return conversations.sort((a, b)=>new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime());
    }
    getThread(userId, peerId, jobId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].messages.filter((m)=>(m.senderId === userId && m.recipientId === peerId || m.senderId === peerId && m.recipientId === userId) && m.jobId === (jobId || undefined) && !m.deletedAt).sort((a, b)=>new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); // Oldest first for chat view
    }
    sendMessage(senderId, recipientId, content, jobId) {
        const now = new Date().toISOString();
        const newMessage = {
            id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('m'),
            senderId,
            recipientId,
            content,
            jobId,
            isRead: false,
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].messages.push(newMessage);
        // Notify Recipient (Email)
        const sender = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.find((u)=>u.id === senderId);
        const senderName = sender ? `${sender.firstName} ${sender.lastName}` : 'System';
        this.notifications.notifyMessageReceived(recipientId, senderName, content, jobId);
        return newMessage;
    }
    markAsRead(userId, peerId, jobId) {
        let updated = false;
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].messages.forEach((m)=>{
            if (m.recipientId === userId && m.senderId === peerId && m.jobId === (jobId || undefined) && !m.isRead) {
                m.isRead = true;
                m.readAt = new Date().toISOString();
                updated = true;
            }
        });
    }
    getGlobalUnreadCount(userId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].messages.filter((m)=>m.recipientId === userId && !m.isRead && !m.deletedAt).length;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/services/BlogService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BlogService",
    ()=>BlogService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/store.ts [app-client] (ecmascript)");
;
class BlogService {
    getAllBlogs(includeDrafts = false) {
        let posts = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].blogPosts.filter((p)=>!p.deletedAt);
        if (!includeDrafts) {
            posts = posts.filter((p)=>p.status === 'published');
        }
        // Sort by published date descending
        return posts.sort((a, b)=>{
            const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : new Date(a.createdAt).getTime();
            const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : new Date(b.createdAt).getTime();
            return dateB - dateA;
        });
    }
    getBlogBySlug(slug) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].blogPosts.find((p)=>p.slug === slug && !p.deletedAt);
    }
    createBlog(data) {
        const now = new Date().toISOString();
        const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].users.find((u)=>u.id === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId);
        const newPost = {
            id: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].generateId('blog'),
            title: data.title || 'Untitled Post',
            slug: data.slug || `post-${Date.now()}`,
            excerpt: data.excerpt || '',
            content: data.content || '',
            coverImage: data.coverImage || 'https://images.unsplash.com/photo-1499750310159-525446b095ef?auto=format&fit=crop&q=80&w=1200',
            tags: data.tags || [],
            authorId: currentUser?.id || 'unknown',
            status: data.status || 'draft',
            publishedAt: data.status === 'published' ? now : undefined,
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].blogPosts.unshift(newPost);
        return newPost;
    }
    updateBlog(id, updates) {
        const idx = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].blogPosts.findIndex((p)=>p.id === id);
        if (idx !== -1) {
            const current = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].blogPosts[idx];
            const now = new Date().toISOString();
            // Handle publishing logic
            let publishedAt = current.publishedAt;
            if (updates.status === 'published' && !current.publishedAt) {
                publishedAt = now;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].blogPosts[idx] = {
                ...current,
                ...updates,
                publishedAt,
                updatedAt: now
            };
            return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].blogPosts[idx];
        }
        return null;
    }
    deleteBlog(id) {
        const idx = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].blogPosts.findIndex((p)=>p.id === id);
        if (idx !== -1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].blogPosts[idx].deletedAt = new Date().toISOString();
        }
    }
    searchBlogs(query) {
        const term = query.toLowerCase();
        return this.getAllBlogs(false).filter((p)=>p.title.toLowerCase().includes(term) || p.excerpt.toLowerCase().includes(term) || p.tags.some((t)=>t.toLowerCase().includes(term)));
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/services/AiWritingService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AiWritingService",
    ()=>AiWritingService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@google/genai/dist/web/index.mjs [app-client] (ecmascript)");
;
class AiWritingService {
    ai;
    model = 'gemini-2.5-flash';
    constructor(){
        this.ai = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleGenAI"]({
            apiKey: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.API_KEY
        });
    }
    async generateSeoData(content, title) {
        const prompt = `
            Act as an SEO expert for "Jambo Linguists", a premium Swahili interpretation agency.
            Analyze the following blog content and title.
            Generate a JSON object with:
            1. "metaTitle": SEO-optimized title (max 60 chars).
            2. "metaDescription": Compelling description (150-160 chars).
            3. "keywords": Array of 5-8 focus keywords.
            
            Maintain a professional, authoritative, yet accessible tone.
            
            Title: ${title}
            Content: ${content.substring(0, 3000)}...
        `;
        try {
            const response = await this.ai.models.generateContent({
                model: this.model,
                contents: prompt,
                config: {
                    responseMimeType: 'application/json'
                }
            });
            if (response.text) {
                return JSON.parse(response.text);
            }
        } catch (error) {
            console.error("AI SEO Generation Failed:", error);
        }
        return {};
    }
    async generateSiteSeo(companyInfo) {
        const prompt = `
            Act as a technical SEO expert for "Jambo Linguists Limited".
            Using the company details below, generate a global SEO strategy JSON object.
            
            Company Info:
            ${JSON.stringify(companyInfo)}
            
            Return JSON with:
            1. "siteTitle": A catchy, SEO-friendly global title suffix (e.g. "Jambo Linguists | Swahili Experts").
            2. "siteDescription": A powerful meta description (160 chars) highlighting services and location.
            3. "defaultKeywords": Array of 10 high-value keywords for Swahili interpretation in UK.
            4. "structuredData": A valid JSON-LD string for Schema.org "LocalBusiness" or "Organization", including contact points, address, and logo. Ensure it is stringified JSON.
        `;
        try {
            const response = await this.ai.models.generateContent({
                model: this.model,
                contents: prompt,
                config: {
                    responseMimeType: 'application/json'
                }
            });
            if (response.text) {
                const data = JSON.parse(response.text);
                // Ensure structuredData is a string if the AI returned an object
                if (typeof data.structuredData === 'object') {
                    data.structuredData = JSON.stringify(data.structuredData, null, 2);
                }
                return data;
            }
        } catch (error) {
            console.error("AI Site SEO Generation Failed:", error);
        }
        return {};
    }
    async analyzeContent(content) {
        const prompt = `
            Analyze this blog post draft for "Jambo Linguists".
            Evaluate based on:
            1. Clarity & Readability
            2. Professional Tone (Must be authoritative but welcoming)
            3. Structure
            
            Return JSON:
            {
                "score": number (0-100),
                "readabilityLevel": string (e.g. "Grade 8", "University"),
                "tone": string,
                "suggestions": array of strings (specific improvements)
            }

            Content: ${content.substring(0, 3000)}...
        `;
        try {
            const response = await this.ai.models.generateContent({
                model: this.model,
                contents: prompt,
                config: {
                    responseMimeType: 'application/json'
                }
            });
            if (response.text) {
                return JSON.parse(response.text);
            }
        } catch (error) {
            console.error("AI Content Analysis Failed:", error);
        }
        return {
            score: 0,
            readabilityLevel: 'Unknown',
            tone: 'Unknown',
            suggestions: [
                'AI Analysis Unavailable'
            ]
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ==========================================
// ENUMS & CONSTANTS (Postgres ENUM types)
// ==========================================
__turbopack_context__.s([]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/mockDatabase.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockDb",
    ()=>mockDb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$AuthService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/services/AuthService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$JobService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/services/JobService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$AdminService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/services/AdminService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$TrainingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/services/TrainingService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$FinanceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/services/FinanceService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$NotificationService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/services/NotificationService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$CertificateService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/services/CertificateService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$LmsAdminService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/services/LmsAdminService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$MessageService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/services/MessageService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$BlogService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/services/BlogService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$AiWritingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/services/AiWritingService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/store.ts [app-client] (ecmascript)");
// Re-export types
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/types.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
// Initialize Core Services
const notificationService = new __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$NotificationService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NotificationService"]();
const authService = new __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$AuthService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthService"]();
const jobService = new __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$JobService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JobService"](notificationService);
const adminService = new __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$AdminService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminService"](notificationService);
const certificateService = new __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$CertificateService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CertificateService"](notificationService);
const lmsAdminService = new __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$LmsAdminService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LmsAdminService"](notificationService, certificateService);
const trainingService = new __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$TrainingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrainingService"](notificationService);
const financeService = new __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$FinanceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FinanceService"](notificationService);
const messageService = new __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$MessageService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageService"](notificationService);
const blogService = new __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$BlogService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogService"]();
const aiWritingService = new __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$services$2f$AiWritingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AiWritingService"]();
// --- OBSERVER PATTERN FOR DATA REFRESH ---
const listeners = [];
const notifyListeners = ()=>{
    listeners.forEach((l)=>l());
};
const subscribe = (listener)=>{
    listeners.push(listener);
    return ()=>{
        const index = listeners.indexOf(listener);
        if (index > -1) listeners.splice(index, 1);
    };
};
const mockDb = {
    subscribe,
    auth: {
        init: ()=>authService.init(),
        getCurrentUser: ()=>authService.getCurrentUser(),
        login: (email, password)=>{
            const res = authService.login(email, password);
            notifyListeners();
            return res;
        },
        register: (data)=>{
            const res = authService.register(data);
            notifyListeners();
            return res;
        },
        logout: ()=>{
            authService.logout();
            notifyListeners();
        },
        updateProfile: (data)=>{
            authService.updateProfile(data);
            notifyListeners();
        }
    },
    // Job Service
    getAvailableJobs: ()=>jobService.getAvailableJobs(),
    getBookedJobs: ()=>jobService.getBookedJobs(),
    getJobHistory: ()=>jobService.getJobHistory(),
    getNextAssignment: ()=>jobService.getNextAssignment(),
    updateJobStatus: (id, status, extraData)=>{
        jobService.updateJobStatus(id, status, extraData);
        notifyListeners();
    },
    unassignJob: (jobId)=>{
        const user = authService.getCurrentUser();
        if (!user) return false;
        const res = jobService.unassignJob(jobId, user.id);
        if (res) notifyListeners();
        return res;
    },
    // Admin Service
    getAllJobs: ()=>adminService.getAllJobs(),
    getAllUsers: ()=>adminService.getAllUsers(),
    getAllInvoices: ()=>adminService.getAllInvoices(),
    getJobsByUser: (userId)=>adminService.getJobsByUser(userId),
    getInvoicesByUser: (userId)=>adminService.getInvoicesByUser(userId),
    getSettings: ()=>adminService.getSettings(),
    updateSettings: (s)=>{
        adminService.updateSettings(s);
        notifyListeners();
    },
    getComplianceDocs: ()=>adminService.getComplianceDocs(),
    adminUpdateComplianceDoc: (id, content, title)=>{
        adminService.updateComplianceDoc(id, content, title);
        notifyListeners();
    },
    // Admin Resources
    adminCreateResource: (res)=>{
        const r = adminService.createResource(res);
        notifyListeners();
        return r;
    },
    adminUpdateResource: (id, updates)=>{
        adminService.updateResource(id, updates);
        notifyListeners();
    },
    adminDeleteResource: (id)=>{
        adminService.deleteResource(id);
        notifyListeners();
    },
    // Admin Email Settings
    get emailTemplates () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].emailTemplates;
    },
    get emailLogs () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].emailLogs;
    },
    adminUpdateEmailTemplate: (id, updates)=>{
        adminService.updateEmailTemplate(id, updates);
        notifyListeners();
    },
    sendTestEmail: (userId)=>{
        notificationService.sendEmail(userId, 'MESSAGE_RECEIVED', {
            senderName: 'System Test',
            context: 'SMTP Check',
            preview: 'This is a test email to verify configuration.'
        });
    },
    // LMS Admin (Delegated)
    adminSaveCourse: (c, l)=>{
        const r = lmsAdminService.saveCourse(c, l);
        notifyListeners();
        return r;
    },
    adminDeleteCourse: (id)=>{
        lmsAdminService.deleteCourse(id);
        notifyListeners();
    },
    adminEnrollUser: (cid, uid)=>{
        lmsAdminService.enrollUser(cid, uid);
        notifyListeners();
    },
    adminRemoveUser: (cid, uid)=>{
        lmsAdminService.removeUser(cid, uid);
        notifyListeners();
    },
    adminUpdateLearnerProgress: (cid, uid, u)=>{
        lmsAdminService.updateLearnerProgress(cid, uid, u);
        notifyListeners();
    },
    adminUpdateCourseSettings: (cid, u)=>{
        lmsAdminService.updateCourseSettings(cid, u);
        notifyListeners();
    },
    // Admin User/Job Ops
    adminApproveJobSubmission: (jid)=>{
        const r = adminService.approveJobSubmission(jid);
        notifyListeners();
        return r;
    },
    adminForceCompleteJob: (jid, notes)=>{
        const r = adminService.adminForceCompleteJob(jid, notes);
        notifyListeners();
        return r;
    },
    adminCreateUser: (u)=>{
        const r = adminService.createUser(u);
        notifyListeners();
        return r;
    },
    adminUpdateUser: (uid, d)=>{
        const r = adminService.updateUser(uid, d);
        notifyListeners();
        return r;
    },
    adminUpdateUserVerification: (uid, v)=>{
        adminService.updateUserVerification(uid, v);
        notifyListeners();
    },
    adminSuspendUser: (uid, s)=>{
        adminService.suspendUser(uid, s);
        notifyListeners();
    },
    adminCreateJob: (j)=>{
        const r = adminService.createJob(j);
        notifyListeners();
        return r;
    },
    adminUpdateJobDetails: (jid, u, nf, ka)=>{
        const r = adminService.updateJobDetails(jid, u, nf, ka);
        notifyListeners();
        return r;
    },
    adminAssignJob: (jid, uid)=>{
        adminService.assignJob(jid, uid);
        notifyListeners();
    },
    getLoginHistoryForUser: (uid)=>adminService.getLoginHistoryForUser(uid),
    adminLogImpersonation: (aid, uid)=>{
        adminService.logImpersonation(aid, uid);
        notifyListeners();
    },
    // Training Service
    getCourses: ()=>trainingService.getCourses(),
    getCourse: (id)=>trainingService.getCourse(id),
    getLessons: (id)=>trainingService.getLessons(id),
    getCourseProgress: (id)=>trainingService.getCourseProgress(id),
    enrollCourse: (id)=>{
        const res = trainingService.enrollCourse(id);
        notifyListeners();
        return res;
    },
    completeLesson: (cid, lid)=>{
        trainingService.completeLesson(cid, lid);
        notifyListeners();
    },
    checkCompliance: (ids)=>trainingService.checkCompliance(ids),
    getCertificates: ()=>trainingService.getCertificates(),
    // Certificate Service (Admin Access)
    adminIssueCertificate: (uid, cid)=>{
        certificateService.issueCertificate(uid, cid);
        notifyListeners();
    },
    adminRevokeCertificate: (certId)=>{
        certificateService.revokeCertificate(certId);
        notifyListeners();
    },
    getCertificate: (id)=>certificateService.getCertificate(id),
    // Finance Service
    getInvoices: ()=>financeService.getInvoices(),
    createInvoice: (i)=>{
        financeService.createInvoice(i);
        notifyListeners();
    },
    updateInvoice: (i)=>{
        financeService.updateInvoice(i);
        notifyListeners();
    },
    updateInvoiceStatus: (id, s)=>{
        financeService.updateInvoiceStatus(id, s);
        notifyListeners();
    },
    getFinanceStats: ()=>financeService.getFinanceStats(),
    getStats: ()=>financeService.getStats(),
    // Message Service
    getConversations: (uid)=>messageService.getConversations(uid),
    getThread: (uid, pid, jid)=>messageService.getThread(uid, pid, jid),
    sendMessage: (sid, rid, content, jid)=>{
        const m = messageService.sendMessage(sid, rid, content, jid);
        notifyListeners();
        return m;
    },
    markAsRead: (uid, pid, jid)=>{
        messageService.markAsRead(uid, pid, jid);
        notifyListeners();
    },
    getGlobalUnreadCount: (uid)=>messageService.getGlobalUnreadCount(uid),
    // Blog Service
    getAllBlogs: (includeDrafts)=>blogService.getAllBlogs(includeDrafts),
    getBlogBySlug: (slug)=>blogService.getBlogBySlug(slug),
    createBlog: (data)=>{
        const b = blogService.createBlog(data);
        notifyListeners();
        return b;
    },
    updateBlog: (id, data)=>{
        const b = blogService.updateBlog(id, data);
        notifyListeners();
        return b;
    },
    deleteBlog: (id)=>{
        blogService.deleteBlog(id);
        notifyListeners();
    },
    searchBlogs: (query)=>blogService.searchBlogs(query),
    // AI Services
    ai: aiWritingService,
    // Notification Service / Direct DB Access
    getNotifications: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].notifications.filter((n)=>n.userId === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId).sort((a, b)=>new Date(b.time).getTime() - new Date(a.time).getTime()),
    markNotificationRead: (id)=>{
        const n = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].notifications.find((item)=>item.id === id);
        if (n) {
            n.isRead = true;
            n.updatedAt = new Date().toISOString();
            notifyListeners();
        }
    },
    markAllNotificationsRead: ()=>{
        let updated = false;
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].notifications.forEach((n)=>{
            if (n.userId === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].currentUserId && !n.isRead) {
                n.isRead = true;
                n.updatedAt = new Date().toISOString();
                updated = true;
            }
        });
        if (updated) notifyListeners();
    },
    getResources: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].resources.filter((r)=>!r.deletedAt)
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ClientLayout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientLayout",
    ()=>ClientLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Navbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/mockDatabase.ts [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ClientLayout({ children }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const hideNavFooter = pathname === '/portal' || pathname === '/admin';
    // Initialize auth
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientLayout.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].auth.init();
        }
    }["ClientLayout.useEffect"], []);
    // Mobile keyboard handling
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientLayout.useEffect": ()=>{
            const handleFocus = {
                "ClientLayout.useEffect.handleFocus": (event)=>{
                    const target = event.target;
                    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                        setTimeout({
                            "ClientLayout.useEffect.handleFocus": ()=>{
                                target.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'center'
                                });
                            }
                        }["ClientLayout.useEffect.handleFocus"], 300);
                    }
                }
            }["ClientLayout.useEffect.handleFocus"];
            document.addEventListener('focus', handleFocus, true);
            return ({
                "ClientLayout.useEffect": ()=>document.removeEventListener('focus', handleFocus, true)
            })["ClientLayout.useEffect"];
        }
    }["ClientLayout.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col relative selection:bg-brand-orange selection:text-white",
        children: [
            !hideNavFooter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Navbar"], {}, void 0, false, {
                fileName: "[project]/components/ClientLayout.tsx",
                lineNumber: 34,
                columnNumber: 26
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-grow relative z-10",
                children: children
            }, void 0, false, {
                fileName: "[project]/components/ClientLayout.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            !hideNavFooter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                fileName: "[project]/components/ClientLayout.tsx",
                lineNumber: 36,
                columnNumber: 26
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ClientLayout.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(ClientLayout, "tjXKfJWuFDa0epp0CJaCeazyqhM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ClientLayout;
var _c;
__turbopack_context__.k.register(_c, "ClientLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_da7ad6bb._.js.map