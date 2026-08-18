(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/Nav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Nav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const links = [
    {
        href: "/protocol",
        label: "The Protocol"
    },
    {
        href: "/sarah",
        label: "Sarah"
    },
    {
        href: "/roadmap",
        label: "AI Roadmap"
    },
    {
        href: "/contact",
        label: "Contact"
    }
];
function Nav() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Nav.useEffect": ()=>{
            const onScroll = {
                "Nav.useEffect.onScroll": ()=>setScrolled(window.scrollY > 12)
            }["Nav.useEffect.onScroll"];
            onScroll();
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            return ({
                "Nav.useEffect": ()=>window.removeEventListener("scroll", onScroll)
            })["Nav.useEffect"];
        }
    }["Nav.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Nav.useEffect": ()=>{
            setOpen(false);
        }
    }["Nav.useEffect"], [
        pathname
    ]);
    const isActive = (href)=>pathname === href || href !== "/" && pathname.startsWith(href);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: `fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "border-b border-line bg-ink/85 backdrop-blur-xl" : "border-b border-transparent"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "flex items-center gap-2.5",
                        "aria-label": "NPC Protocol home",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mark"], {}, void 0, false, {
                                fileName: "[project]/src/components/Nav.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-display text-[13px] font-bold tracking-[0.22em] text-snow",
                                children: "NPC PROTOCOL"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Nav.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Nav.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden items-center gap-8 md:flex",
                        children: links.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: l.href,
                                className: `text-sm transition-colors ${isActive(l.href) ? "text-gold" : "text-fog hover:text-snow"}`,
                                children: l.label
                            }, l.href, false, {
                                fileName: "[project]/src/components/Nav.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Nav.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:block",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/contact",
                            className: "inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink shadow-lg shadow-gold/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-soft",
                            children: "Start your story"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Nav.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Nav.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setOpen((v)=>!v),
                        className: "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-snow md:hidden",
                        "aria-label": "Toggle menu",
                        "aria-expanded": open,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "relative block h-3.5 w-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `absolute left-0 top-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : ""}`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Nav.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Nav.tsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `absolute left-0 top-3 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : ""}`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Nav.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Nav.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Nav.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Nav.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-line bg-ink/95 px-5 pb-6 pt-3 backdrop-blur-xl md:hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-1",
                    children: [
                        links.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: l.href,
                                className: `rounded-lg px-3 py-3 text-base transition-colors ${isActive(l.href) ? "bg-panel text-gold" : "text-fog hover:bg-panel hover:text-snow"}`,
                                children: l.label
                            }, l.href, false, {
                                fileName: "[project]/src/components/Nav.tsx",
                                lineNumber: 97,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/contact",
                            className: "mt-2 inline-flex items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink",
                            children: "Start your story"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Nav.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Nav.tsx",
                    lineNumber: 95,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Nav.tsx",
                lineNumber: 94,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Nav.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_s(Nav, "9ltzY/AyaXxsuXh+q9aQZgrN5Zs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Nav;
var _c;
__turbopack_context__.k.register(_c, "Nav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/motion.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CountUp",
    ()=>CountUp,
    "Magnetic",
    ()=>Magnetic,
    "Marquee",
    ()=>Marquee,
    "MotionProvider",
    ()=>MotionProvider,
    "Reveal",
    ()=>Reveal,
    "Tilt",
    ()=>Tilt,
    "prefersReducedMotion",
    ()=>prefersReducedMotion,
    "useMotion",
    ()=>useMotion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lenis/dist/lenis.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
let gsapReady = false;
function ensureGsap() {
    if (!gsapReady) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
        gsapReady = true;
    }
}
function prefersReducedMotion() {
    return ("TURBOPACK compile-time value", "object") !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
const MotionCtx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(false);
function MotionProvider({ children }) {
    _s();
    const lenisRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MotionProvider.useEffect": ()=>{
            if (prefersReducedMotion()) return;
            ensureGsap();
            document.documentElement.classList.add("motion-on");
            // Don't let the browser restore the previous page's scroll position.
            if ("scrollRestoration" in window.history) {
                window.history.scrollRestoration = "manual";
            }
            const lenis = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                lerp: 0.09,
                duration: 1.15
            });
            lenisRef.current = lenis;
            lenis.on("scroll", {
                "MotionProvider.useEffect": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].update()
            }["MotionProvider.useEffect"]);
            const tick = {
                "MotionProvider.useEffect.tick": (time)=>lenis.raf(time * 1000)
            }["MotionProvider.useEffect.tick"];
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].ticker.add(tick);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].ticker.lagSmoothing(0);
            const done = new WeakSet();
            const pending = new Set(); // reveals not yet shown
            const showReveal = {
                "MotionProvider.useEffect.showReveal": (el)=>{
                    pending.delete(el);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].getAll().filter({
                        "MotionProvider.useEffect.showReveal": (t)=>t.trigger === el
                    }["MotionProvider.useEffect.showReveal"]).forEach({
                        "MotionProvider.useEffect.showReveal": (t)=>t.kill()
                    }["MotionProvider.useEffect.showReveal"]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].killTweensOf(el);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(el, {
                        autoAlpha: 1,
                        y: 0
                    });
                }
            }["MotionProvider.useEffect.showReveal"];
            const setup = {
                "MotionProvider.useEffect.setup": (root)=>{
                    root.querySelectorAll("[data-reveal]").forEach({
                        "MotionProvider.useEffect.setup": (el)=>{
                            if (done.has(el)) return;
                            done.add(el);
                            const yAttr = el.getAttribute("data-reveal-y");
                            const dist = yAttr === "0" || yAttr === "none" ? 0 : yAttr ? parseInt(yAttr, 10) || 28 : 28;
                            const delay = parseFloat(el.getAttribute("data-reveal-delay") || "0");
                            pending.add(el);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(el, {
                                autoAlpha: 0,
                                y: dist
                            }, {
                                autoAlpha: 1,
                                y: 0,
                                duration: 0.9,
                                ease: "power3.out",
                                delay,
                                scrollTrigger: {
                                    trigger: el,
                                    start: "top 92%",
                                    once: true,
                                    onEnter: {
                                        "MotionProvider.useEffect.setup": ()=>pending.delete(el)
                                    }["MotionProvider.useEffect.setup"],
                                    onEnterBack: {
                                        "MotionProvider.useEffect.setup": ()=>pending.delete(el)
                                    }["MotionProvider.useEffect.setup"]
                                }
                            });
                        }
                    }["MotionProvider.useEffect.setup"]);
                    root.querySelectorAll("[data-parallax]").forEach({
                        "MotionProvider.useEffect.setup": (el)=>{
                            if (done.has(el)) return;
                            done.add(el);
                            const speed = parseFloat(el.getAttribute("data-parallax") || "0.15");
                            const trigger = el.closest("section") || el.parentElement;
                            if (!trigger) return;
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(el, {
                                yPercent: -speed * 100
                            }, {
                                yPercent: speed * 100,
                                ease: "none",
                                scrollTrigger: {
                                    trigger,
                                    start: "top bottom",
                                    end: "bottom top",
                                    scrub: 1
                                }
                            });
                        }
                    }["MotionProvider.useEffect.setup"]);
                }
            }["MotionProvider.useEffect.setup"];
            setup(document.body);
            const mo = new MutationObserver({
                "MotionProvider.useEffect": ()=>setup(document.body)
            }["MotionProvider.useEffect"]);
            mo.observe(document.body, {
                childList: true,
                subtree: true
            });
            /* Failsafe: content must NEVER stay invisible. If a reveal near the viewport
       hasn't fired (rAF throttling, print, a11y mode, capture tooling), force it. */ const failsafe = {
                "MotionProvider.useEffect.failsafe": ()=>{
                    const limit = window.innerHeight * 1.3;
                    pending.forEach({
                        "MotionProvider.useEffect.failsafe": (el)=>{
                            const r = el.getBoundingClientRect();
                            if (r.top < limit) showReveal(el);
                        }
                    }["MotionProvider.useEffect.failsafe"]);
                }
            }["MotionProvider.useEffect.failsafe"];
            const failsafeTimer = window.setInterval(failsafe, 700);
            const failsafeStop = window.setTimeout({
                "MotionProvider.useEffect.failsafeStop": ()=>window.clearInterval(failsafeTimer)
            }["MotionProvider.useEffect.failsafeStop"], 20000);
            window.addEventListener("load", {
                "MotionProvider.useEffect": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].refresh()
            }["MotionProvider.useEffect"]);
            return ({
                "MotionProvider.useEffect": ()=>{
                    mo.disconnect();
                    window.clearInterval(failsafeTimer);
                    window.clearTimeout(failsafeStop);
                    lenis.destroy();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].ticker.remove(tick);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].getAll().forEach({
                        "MotionProvider.useEffect": (t)=>t.kill()
                    }["MotionProvider.useEffect"]);
                    document.documentElement.classList.remove("motion-on");
                }
            })["MotionProvider.useEffect"];
        }
    }["MotionProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MotionProvider.useEffect": ()=>{
            // Every navigation (nav links, logo, footer) lands at the TOP of the page.
            // Use Lenis's own scroll with `immediate` so it doesn't fight smooth scroll.
            const lenis = lenisRef.current;
            if (lenis) lenis.scrollTo(0, {
                immediate: true
            });
            window.scrollTo(0, 0);
        }
    }["MotionProvider.useEffect"], [
        pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MotionCtx.Provider, {
        value: true,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/motion.tsx",
        lineNumber: 160,
        columnNumber: 10
    }, this);
}
_s(MotionProvider, "7CRKi2ZDQ3VN/58sJiTq1y0XJBA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = MotionProvider;
function useMotion() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(MotionCtx);
}
_s1(useMotion, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
function Reveal({ children, className = "", y = 28, delay = 0, as: Tag = "div" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
        "data-reveal": true,
        "data-reveal-y": y,
        "data-reveal-delay": delay || undefined,
        className: className,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/motion.tsx",
        lineNumber: 182,
        columnNumber: 5
    }, this);
}
_c1 = Reveal;
function CountUp({ to, decimals = 0, prefix = "", suffix = "", className = "", duration = 1.6 }) {
    _s2();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CountUp.useEffect": ()=>{
            const el = ref.current;
            if (!el) return;
            if (prefersReducedMotion()) return;
            ensureGsap();
            const obj = {
                v: 0
            };
            const tween = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(obj, {
                v: to,
                duration,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 88%",
                    once: true
                },
                onUpdate () {
                    el.textContent = prefix + obj.v.toFixed(decimals) + suffix;
                },
                onComplete () {
                    el.textContent = prefix + to.toFixed(decimals) + suffix;
                }
            });
            return ({
                "CountUp.useEffect": ()=>{
                    tween.scrollTrigger?.kill();
                    tween.kill();
                }
            })["CountUp.useEffect"];
        }
    }["CountUp.useEffect"], [
        to,
        decimals,
        prefix,
        suffix,
        duration
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: ref,
        className: className,
        children: [
            prefix,
            to.toFixed(decimals),
            suffix
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/motion.tsx",
        lineNumber: 234,
        columnNumber: 5
    }, this);
}
_s2(CountUp, "8uVE59eA/r6b92xF80p7sH8rXLk=");
_c2 = CountUp;
function Tilt({ children, className = "", max = 4 }) {
    _s3();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Tilt.useEffect": ()=>{
            if (prefersReducedMotion()) return;
            const el = ref.current;
            if (!el || !window.matchMedia("(hover: hover)").matches) return;
            ensureGsap();
            const xTo = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].quickTo(el, "rotationX", {
                duration: 0.5,
                ease: "power3"
            });
            const yTo = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].quickTo(el, "rotationY", {
                duration: 0.5,
                ease: "power3"
            });
            el.style.perspective = "900px";
            const move = {
                "Tilt.useEffect.move": (e)=>{
                    const r = el.getBoundingClientRect();
                    const px = (e.clientX - r.left) / r.width - 0.5;
                    const py = (e.clientY - r.top) / r.height - 0.5;
                    yTo(px * max * 2);
                    xTo(-py * max * 2);
                }
            }["Tilt.useEffect.move"];
            const leave = {
                "Tilt.useEffect.leave": ()=>{
                    xTo(0);
                    yTo(0);
                }
            }["Tilt.useEffect.leave"];
            el.addEventListener("mousemove", move);
            el.addEventListener("mouseleave", leave);
            return ({
                "Tilt.useEffect": ()=>{
                    el.removeEventListener("mousemove", move);
                    el.removeEventListener("mouseleave", leave);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(el, {
                        rotationX: 0,
                        rotationY: 0
                    });
                }
            })["Tilt.useEffect"];
        }
    }["Tilt.useEffect"], [
        max
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: `will-change-transform ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/motion.tsx",
        lineNumber: 281,
        columnNumber: 5
    }, this);
}
_s3(Tilt, "8uVE59eA/r6b92xF80p7sH8rXLk=");
_c3 = Tilt;
function Magnetic({ children, className = "", strength = 0.25 }) {
    _s4();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Magnetic.useEffect": ()=>{
            if (prefersReducedMotion()) return;
            const el = ref.current;
            if (!el || !window.matchMedia("(hover: hover)").matches) return;
            ensureGsap();
            const xTo = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].quickTo(el, "x", {
                duration: 0.8,
                ease: "elastic.out(1, 0.4)"
            });
            const yTo = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].quickTo(el, "y", {
                duration: 0.8,
                ease: "elastic.out(1, 0.4)"
            });
            const move = {
                "Magnetic.useEffect.move": (e)=>{
                    const r = el.getBoundingClientRect();
                    xTo((e.clientX - (r.left + r.width / 2)) * strength);
                    yTo((e.clientY - (r.top + r.height / 2)) * strength);
                }
            }["Magnetic.useEffect.move"];
            const leave = {
                "Magnetic.useEffect.leave": ()=>{
                    xTo(0);
                    yTo(0);
                }
            }["Magnetic.useEffect.leave"];
            el.addEventListener("mousemove", move);
            el.addEventListener("mouseleave", leave);
            return ({
                "Magnetic.useEffect": ()=>{
                    el.removeEventListener("mousemove", move);
                    el.removeEventListener("mouseleave", leave);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(el, {
                        x: 0,
                        y: 0
                    });
                }
            })["Magnetic.useEffect"];
        }
    }["Magnetic.useEffect"], [
        strength
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: `inline-block ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/motion.tsx",
        lineNumber: 323,
        columnNumber: 5
    }, this);
}
_s4(Magnetic, "8uVE59eA/r6b92xF80p7sH8rXLk=");
_c4 = Magnetic;
function Marquee({ items, className = "" }) {
    const row = (hidden)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "aria-hidden": hidden || undefined,
            className: "flex w-max shrink-0 items-center gap-10 pr-10",
            children: items.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "flex items-center gap-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "whitespace-nowrap font-display text-xs font-semibold uppercase tracking-[0.3em] text-fog",
                            children: t
                        }, void 0, false, {
                            fileName: "[project]/src/components/motion.tsx",
                            lineNumber: 338,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "h-1.5 w-1.5 shrink-0 rotate-45 bg-gold/70"
                        }, void 0, false, {
                            fileName: "[project]/src/components/motion.tsx",
                            lineNumber: 341,
                            columnNumber: 11
                        }, this)
                    ]
                }, t + (hidden ? "b" : "a"), true, {
                    fileName: "[project]/src/components/motion.tsx",
                    lineNumber: 337,
                    columnNumber: 9
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/motion.tsx",
            lineNumber: 332,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative overflow-hidden border-y border-line bg-panel/50 py-4 ${className}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "marquee-track flex w-max",
            children: [
                row(false),
                row(true)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/motion.tsx",
            lineNumber: 348,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/motion.tsx",
        lineNumber: 347,
        columnNumber: 5
    }, this);
}
_c5 = Marquee;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "MotionProvider");
__turbopack_context__.k.register(_c1, "Reveal");
__turbopack_context__.k.register(_c2, "CountUp");
__turbopack_context__.k.register(_c3, "Tilt");
__turbopack_context__.k.register(_c4, "Magnetic");
__turbopack_context__.k.register(_c5, "Marquee");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "Divider",
    ()=>Divider,
    "Eyebrow",
    ()=>Eyebrow,
    "Mark",
    ()=>Mark,
    "Section",
    ()=>Section,
    "SectionHeading",
    ()=>SectionHeading,
    "Tag",
    ()=>Tag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
;
function Mark({ size = 26 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 26 26",
        fill: "none",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "6.5",
                y: "6.5",
                width: "13",
                height: "13",
                rx: "2",
                transform: "rotate(45 13 13)",
                stroke: "var(--color-gold)",
                strokeWidth: "1.6"
            }, void 0, false, {
                fileName: "[project]/src/components/ui.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "13",
                cy: "13",
                r: "3",
                fill: "var(--color-npc)"
            }, void 0, false, {
                fileName: "[project]/src/components/ui.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
_c = Mark;
function Button({ href, children, variant = "gold", className = "", external = false }) {
    const base = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300";
    const variants = {
        gold: "bg-gold text-ink shadow-lg shadow-gold/50 hover:bg-gold-soft hover:-translate-y-0.5",
        npc: "bg-npc text-ink shadow-lg shadow-npc/50 hover:bg-npc-soft hover:-translate-y-0.5",
        ghost: "border border-line text-snow hover:border-line-2 hover:bg-panel"
    };
    const cls = `${base} ${variants[variant]} ${className}`;
    if (external) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: href,
            target: "_blank",
            rel: "noreferrer",
            className: cls,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/ui.tsx",
            lineNumber: 47,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: cls,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c1 = Button;
function Section({ children, className = "", id }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: id,
        className: `relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-28 ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_c2 = Section;
function Eyebrow({ children, tone = "gold" }) {
    const text = tone === "gold" ? "text-gold" : "text-npc";
    const dot = tone === "gold" ? "bg-gold" : "bg-npc";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.35em] ${text}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `h-1.5 w-1.5 rounded-full ${dot}`
            }, void 0, false, {
                fileName: "[project]/src/components/ui.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c3 = Eyebrow;
function SectionHeading({ eyebrow, eyebrowTone = "gold", title, lede, align = "left" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`,
        children: [
            eyebrow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Eyebrow, {
                    tone: eyebrowTone,
                    children: eyebrow
                }, void 0, false, {
                    fileName: "[project]/src/components/ui.tsx",
                    lineNumber: 109,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui.tsx",
                lineNumber: 108,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "font-display text-3xl font-bold leading-[1.15] tracking-tight text-snow sm:text-4xl md:text-[2.75rem]",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/ui.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            lede && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-5 text-base leading-relaxed text-fog sm:text-lg",
                children: lede
            }, void 0, false, {
                fileName: "[project]/src/components/ui.tsx",
                lineNumber: 115,
                columnNumber: 16
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
}
_c4 = SectionHeading;
function Tag({ children, tone = "neutral" }) {
    const tones = {
        neutral: "border-line text-fog",
        gold: "border-gold/40 text-gold",
        npc: "border-npc/40 text-npc"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest ${tones[tone]}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
_c5 = Tag;
function Divider({ className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `h-px w-full duotone opacity-40 ${className}`
    }, void 0, false, {
        fileName: "[project]/src/components/ui.tsx",
        lineNumber: 142,
        columnNumber: 10
    }, this);
}
_c6 = Divider;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Mark");
__turbopack_context__.k.register(_c1, "Button");
__turbopack_context__.k.register(_c2, "Section");
__turbopack_context__.k.register(_c3, "Eyebrow");
__turbopack_context__.k.register(_c4, "SectionHeading");
__turbopack_context__.k.register(_c5, "Tag");
__turbopack_context__.k.register(_c6, "Divider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_1f02nyo._.js.map