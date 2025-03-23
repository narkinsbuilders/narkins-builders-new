import { XCircleIcon } from "@heroicons/react/24/outline";
import { CloudArrowDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { Loader2 } from "lucide-react"; // shadcn/ui Loader

export const Lightbox = ({
  open,
  onClose,
  image,
}: {
  open: boolean;
  onClose: () => void;
  image: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (open) {
      setIsLoading(true); // Reset loading state when lightbox opens
    }
  }, [open]);

  const handleImageLoad = () => {
    setIsLoading(false); // Image has finished loading
  };

  if (!open) return null; // Don't render if lightbox is closed

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
      style={{ visibility: open ? "visible" : "hidden", opacity: open ? 1 : 0 }}
    >
      {/* Header with Download and Close Buttons */}
      <div className="fixed top-0 left-0 right-0 h-16 flex items-center justify-end p-4 backdrop-blur-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="text-neutral-700 hover:text-black"
        >
          <XCircleIcon className="h-20 w-20" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => e.stopPropagation()}
          className="text-neutral-700 hover:text-black"
          asChild
        >
          <a href={image} download>
            <CloudArrowDownIcon className="h-20 w-20" />
          </a>
        </Button>
      </div>

      {/* Image Container */}
      <div
        className="relative max-w-6xl w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Preloader */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-black" />
          </div>
        )}

        {/* Image */}
        <img
          src={image}
          alt="Lightbox Image"
          onLoad={handleImageLoad}
          className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </div>
  );
};