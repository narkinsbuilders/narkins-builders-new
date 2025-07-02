import React, { useState, useEffect, useRef } from 'react';

interface CarouselItem {
    image: string;
}

interface CarouselProps {
    dataSource?: CarouselItem[];
    swipe?: boolean;
    hideArrows?: boolean;
    autoPlay?: boolean;
    slideShow?: boolean;
    loop?: boolean;
    rightToLeft?: boolean;
    hideIndicators?: boolean;
    interval?: number;
    isNotRounded?: boolean;
    onChange?: (newIndex: number) => void;
}

export function Carousel({
    dataSource = [],
    swipe = true,
    hideArrows = false,
    autoPlay = true,
    slideShow = true,
    loop = true,
    rightToLeft = false,
    hideIndicators = false,
    interval = 10000, 
    isNotRounded = false, 
    onChange = (newIndex: number) => { }
}: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    useEffect(() => {
        onChange(currentIndex);
    }, [currentIndex])
    
    useEffect(() => {
        if (autoPlay) {
            startSlideShow();
        }
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentIndex, autoPlay, slideShow, interval]);

    const startSlideShow = () => {
        stopSlideShow();
        timeoutRef.current = setTimeout(() => {
            updateIndex(currentIndex + (rightToLeft ? -1 : 1));
        }, interval);
    };

    const stopSlideShow = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const updateIndex = (newIndex: number) => {
        if (newIndex < 0) {
            newIndex = loop ? dataSource.length - 1 : 0;
        } else if (newIndex >= dataSource.length) {
            newIndex = loop ? 0 : dataSource.length - 1;
        }
        setCurrentIndex(newIndex);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (swipe) {
            if (touchStart - touchEnd > 75) {
                updateIndex(currentIndex + 1);
            }
            if (touchStart - touchEnd < -75) {
                updateIndex(currentIndex - 1);
            }
        }
    };

    return (
        <div className={`relative w-full overflow-hidden z-[0] h-full ${!isNotRounded ? "rounded-xl" : ""}`}>
            <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {dataSource.map((item, index) => (
                    <div key={index} className="flex-none w-full h-full flex items-center justify-center">
                        <img src={item.image} loading={index === 0 ? "eager" : "lazy"} alt={`Slide ${index}`} style={{ objectFit: 'cover', flex: 1 }} className="w-full h-full" />
                    </div>
                ))}
            </div>
            {!hideArrows && (
                <React.Fragment>
                    <button onClick={() => updateIndex(currentIndex - 1)}
                        className="absolute px-4 left-0 top-1/2 transform -translate-y-1/2 group"
                        data-testid="carousel-left-control"
                        type="button"
                        aria-label="Previous slide"
                    >
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white sm:h-10 sm:w-10">
                            <svg
                                stroke="currentColor"
                                fill="none"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="h-5 w-5 text-white sm:h-6 sm:w-6"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </span>
                    </button>
                    <button onClick={() => updateIndex(currentIndex + 1)}
                        className="group px-4 absolute right-0 top-1/2 transform -translate-y-1/2 "
                        data-testid="carousel-right-control"
                        type="button"
                        aria-label="Next slide"
                    >
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white sm:h-10 sm:w-10">
                            <svg
                                stroke="currentColor"
                                fill="none"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="h-5 w-5 text-white sm:h-6 sm:w-6"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </button>
                </React.Fragment>
            )}
            {!hideIndicators && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 py-4 flex">
                    {dataSource.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => updateIndex(idx)}
                            className={`h-2 w-2 rounded-full mx-2 ${idx === currentIndex ? 'bg-yellow-700' : 'bg-white'}`}
                        ></button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Carousel;