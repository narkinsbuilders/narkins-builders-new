import { CloudArrowDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { useLightboxStore } from "@/zustand";

export const Lightbox = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { open, image, closeLightbox } = useLightboxStore();

    useEffect(() => {
        if (open) {
            setIsLoading(true); // Reset loading state when lightbox opens
        }
    }, [open, image]); // Reset loading state when `image` changes

    const handleImageLoad = () => {
        setIsLoading(false); // Image has finished loading
    };

    const handleImageError = () => {
        setIsLoading(false); // Stop loading if the image fails to load
        console.error("Failed to load image:", image);
    };

    if (!open) return null; // Don't render if lightbox is closed

    return (
        <div
            onClick={closeLightbox}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
            style={{ visibility: open ? "visible" : "hidden", opacity: open ? 1 : 0 }}
        >
            {/* Header with Download and Close Buttons */}
            <div className="fixed top-0 left-0 right-0 h-16 flex items-center justify-end p-4 backdrop-blur-sm">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => e.stopPropagation()}
                    className="text-neutral-700 border-r mr-0 hover:text-black"
                    asChild
                >
                    <a href={image} download>
                        <CloudArrowDownIcon className="h-6 w-6" />
                    </a>
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                        console.log('a')
                        e.stopPropagation();
                        closeLightbox();
                    }}
                    className="text-neutral-700 hover:text-black"
                >
                    <XMarkIcon className="h-10 w-10" />
                </Button>
            </div>

            {/* Image Container */}
            <div
                tabIndex={-1}
                className="relative max-w-6xl w-full h-full flex items-center justify-center p-4"
            >
                {/* Preloader */}
                {isLoading && (
                    <div
                        tabIndex={-1} className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
                    </div>
                )}

                {/* Image */}
                <img
                    src={image.src}
                    alt="Lightbox Image"
                    onClick={(e) => e.stopPropagation()}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"
                        }`}
                />
            </div>
        </div>
    );
};
export default Lightbox;