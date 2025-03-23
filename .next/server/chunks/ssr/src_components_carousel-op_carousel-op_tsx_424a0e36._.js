module.exports = {

"[project]/src/components/carousel-op/carousel-op.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Carousel": (()=>Carousel),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function Carousel({ dataSource = [], swipe = true, hideArrows = false, autoPlay = true, slideShow = true, loop = true, rightToLeft = false, hideIndicators = false, interval = 10000, isNotRounded = false, onChange = (newIndex)=>{} }) {
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [touchStart, setTouchStart] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [touchEnd, setTouchEnd] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const timeoutRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        onChange(currentIndex);
    }, [
        currentIndex
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (autoPlay) {
            startSlideShow();
        }
        return ()=>{
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [
        currentIndex,
        autoPlay,
        slideShow,
        interval
    ]);
    const startSlideShow = ()=>{
        stopSlideShow();
        timeoutRef.current = setTimeout(()=>{
            updateIndex(currentIndex + (rightToLeft ? -1 : 1));
        }, interval);
    };
    const stopSlideShow = ()=>{
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };
    const updateIndex = (newIndex)=>{
        if (newIndex < 0) {
            newIndex = loop ? dataSource.length - 1 : 0;
        } else if (newIndex >= dataSource.length) {
            newIndex = loop ? 0 : dataSource.length - 1;
        }
        setCurrentIndex(newIndex);
    };
    const handleTouchStart = (e)=>{
        setTouchStart(e.targetTouches[0].clientX);
    };
    const handleTouchMove = (e)=>{
        setTouchEnd(e.targetTouches[0].clientX);
    };
    const handleTouchEnd = ()=>{
        if (swipe) {
            if (touchStart - touchEnd > 75) {
                updateIndex(currentIndex + 1);
            }
            if (touchStart - touchEnd < -75) {
                updateIndex(currentIndex - 1);
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: `relative w-full overflow-hidden z-[0] h-full ${!isNotRounded ? "rounded-xl" : ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex transition-transform duration-500 ease-in-out h-full",
                style: {
                    transform: `translateX(-${currentIndex * 100}%)`
                },
                onTouchStart: handleTouchStart,
                onTouchMove: handleTouchMove,
                onTouchEnd: handleTouchEnd,
                children: dataSource.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex-none w-full h-full flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                            src: item.image,
                            loading: index === 0 ? "eager" : "lazy",
                            alt: `Slide ${index}`,
                            style: {
                                objectFit: 'cover',
                                flex: 1
                            },
                            className: "w-full h-full"
                        }, void 0, false, {
                            fileName: "[project]/src/components/carousel-op/carousel-op.tsx",
                            lineNumber: 84,
                            columnNumber: 25
                        }, this)
                    }, index, false, {
                        fileName: "[project]/src/components/carousel-op/carousel-op.tsx",
                        lineNumber: 83,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/carousel-op/carousel-op.tsx",
                lineNumber: 75,
                columnNumber: 13
            }, this),
            !hideArrows && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].Fragment, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>updateIndex(currentIndex - 1),
                        className: "absolute px-4 left-0 top-1/2 transform -translate-y-1/2 group",
                        "data-testid": "carousel-left-control",
                        type: "button",
                        "aria-label": "Previous slide",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white sm:h-10 sm:w-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                stroke: "currentColor",
                                fill: "none",
                                strokeWidth: 2,
                                viewBox: "0 0 24 24",
                                "aria-hidden": "true",
                                className: "h-5 w-5 text-white sm:h-6 sm:w-6",
                                height: "1em",
                                width: "1em",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M15 19l-7-7 7-7"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/carousel-op/carousel-op.tsx",
                                    lineNumber: 108,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/carousel-op/carousel-op.tsx",
                                lineNumber: 97,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/carousel-op/carousel-op.tsx",
                            lineNumber: 96,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/carousel-op/carousel-op.tsx",
                        lineNumber: 90,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>updateIndex(currentIndex + 1),
                        className: "group px-4 absolute right-0 top-1/2 transform -translate-y-1/2 ",
                        "data-testid": "carousel-right-control",
                        type: "button",
                        "aria-label": "Next slide",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white sm:h-10 sm:w-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                stroke: "currentColor",
                                fill: "none",
                                strokeWidth: 2,
                                viewBox: "0 0 24 24",
                                "aria-hidden": "true",
                                className: "h-5 w-5 text-white sm:h-6 sm:w-6",
                                height: "1em",
                                width: "1em",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M9 5l7 7-7 7"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/carousel-op/carousel-op.tsx",
                                    lineNumber: 130,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/carousel-op/carousel-op.tsx",
                                lineNumber: 119,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/carousel-op/carousel-op.tsx",
                            lineNumber: 118,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/carousel-op/carousel-op.tsx",
                        lineNumber: 112,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/carousel-op/carousel-op.tsx",
                lineNumber: 89,
                columnNumber: 17
            }, this),
            !hideIndicators && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-1/2 transform -translate-x-1/2 py-4 flex",
                children: dataSource.map((_, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>updateIndex(idx),
                        className: `h-2 w-2 rounded-full mx-2 ${idx === currentIndex ? 'bg-yellow-700' : 'bg-white'}`
                    }, idx, false, {
                        fileName: "[project]/src/components/carousel-op/carousel-op.tsx",
                        lineNumber: 139,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/carousel-op/carousel-op.tsx",
                lineNumber: 137,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/carousel-op/carousel-op.tsx",
        lineNumber: 74,
        columnNumber: 9
    }, this);
}
const __TURBOPACK__default__export__ = Carousel;
}}),
"[project]/src/components/carousel-op/carousel-op.tsx [ssr] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/carousel-op/carousel-op.tsx [ssr] (ecmascript)"));
}}),

};

//# sourceMappingURL=src_components_carousel-op_carousel-op_tsx_424a0e36._.js.map