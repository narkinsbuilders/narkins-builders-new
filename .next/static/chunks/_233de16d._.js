(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_233de16d._.js", {

"[project]/src/components/lightbox/lightbox.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Lightbox": (()=>Lightbox),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CloudArrowDownIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudArrowDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/CloudArrowDownIcon.js [client] (ecmascript) <export default as CloudArrowDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XMarkIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js [client] (ecmascript) <export default as XMarkIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [client] (ecmascript)"); // shadcn/ui Button
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$zustand$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/zustand/index.tsx [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const Lightbox = ()=>{
    _s();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const { open, image, closeLightbox } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$zustand$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useLightboxStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Lightbox.useEffect": ()=>{
            if (open) {
                setIsLoading(true); // Reset loading state when lightbox opens
            }
        }
    }["Lightbox.useEffect"], [
        open,
        image
    ]); // Reset loading state when `image` changes
    const handleImageLoad = ()=>{
        setIsLoading(false); // Image has finished loading
    };
    const handleImageError = ()=>{
        setIsLoading(false); // Stop loading if the image fails to load
        console.error("Failed to load image:", image);
    };
    if (!open) return null; // Don't render if lightbox is closed
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: closeLightbox,
        className: "fixed inset-0 z-[999] flex items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity duration-300 ease-in-out",
        style: {
            visibility: open ? "visible" : "hidden",
            opacity: open ? 1 : 0
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-0 left-0 right-0 h-16 flex items-center justify-end p-4 backdrop-blur-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "icon",
                        onClick: (e)=>e.stopPropagation(),
                        className: "text-neutral-700 border-r mr-0 hover:text-black",
                        asChild: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: image,
                            download: true,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CloudArrowDownIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudArrowDownIcon$3e$__["CloudArrowDownIcon"], {
                                className: "h-6 w-6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/lightbox/lightbox.tsx",
                                lineNumber: 43,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/lightbox/lightbox.tsx",
                            lineNumber: 42,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/lightbox/lightbox.tsx",
                        lineNumber: 35,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "icon",
                        onClick: (e)=>{
                            console.log('a');
                            e.stopPropagation();
                            closeLightbox();
                        },
                        className: "text-neutral-700 hover:text-black",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XMarkIcon$3e$__["XMarkIcon"], {
                            className: "h-10 w-10"
                        }, void 0, false, {
                            fileName: "[project]/src/components/lightbox/lightbox.tsx",
                            lineNumber: 57,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/lightbox/lightbox.tsx",
                        lineNumber: 47,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/lightbox/lightbox.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                tabIndex: -1,
                className: "relative max-w-6xl w-full h-full flex items-center justify-center p-4",
                children: [
                    isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        tabIndex: -1,
                        className: "absolute inset-0 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"
                        }, void 0, false, {
                            fileName: "[project]/src/components/lightbox/lightbox.tsx",
                            lineNumber: 70,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/lightbox/lightbox.tsx",
                        lineNumber: 68,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: image.src,
                        alt: "Lightbox Image",
                        onClick: (e)=>e.stopPropagation(),
                        onLoad: handleImageLoad,
                        onError: handleImageError,
                        className: `max-w-full max-h-full object-contain transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`
                    }, void 0, false, {
                        fileName: "[project]/src/components/lightbox/lightbox.tsx",
                        lineNumber: 75,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/lightbox/lightbox.tsx",
                lineNumber: 62,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/lightbox/lightbox.tsx",
        lineNumber: 28,
        columnNumber: 9
    }, this);
};
_s(Lightbox, "/sUR3SikUMgZWQL8oON2ZKLWVFk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$zustand$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useLightboxStore"]
    ];
});
_c = Lightbox;
const __TURBOPACK__default__export__ = Lightbox;
var _c;
__turbopack_context__.k.register(_c, "Lightbox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/lightbox/lightbox.tsx [client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/lightbox/lightbox.tsx [client] (ecmascript)"));
}}),
"[project]/node_modules/@heroicons/react/24/outline/esm/CloudArrowDownIcon.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
function CloudArrowDownIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createElement"])("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createElement"])("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createElement"])("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
    }));
}
const ForwardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["forwardRef"])(CloudArrowDownIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}}),
"[project]/node_modules/@heroicons/react/24/outline/esm/CloudArrowDownIcon.js [client] (ecmascript) <export default as CloudArrowDownIcon>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CloudArrowDownIcon": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CloudArrowDownIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CloudArrowDownIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/CloudArrowDownIcon.js [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_233de16d._.js.map