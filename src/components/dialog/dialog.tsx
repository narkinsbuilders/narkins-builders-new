import React, { FC, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  body: React.ReactNode;
  showButtons?: boolean;
  cancelButton?: {
    title: string;
    onClick: () => void;
  };
  acceptButton?: {
    title: string;
    onClick: () => void;
  };
}

const Dialog: FC<DialogProps> = ({
  open,
  onClose,
  title,
  body,
  showButtons = true,
  cancelButton = { title: "Cancel", onClick: () => onClose() },
  acceptButton = { title: "Confirm", onClick: () => onClose() },
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close the dialog
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  // Handle Escape key to close the dialog
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Dialog Panel - Centered Modal */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl transform transition-all"
      >
        <div className="p-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>

          {/* Title */}
          <h3 className="text-lg font-semibold leading-6 text-gray-900 pr-8 mb-4">
            {title}
          </h3>

          {/* Body */}
          <div className="mt-4">
            {typeof body === 'string' ? (
              <p className="text-sm text-gray-500">{body}</p>
            ) : (
              body
            )}
          </div>

          {/* Buttons */}
          {showButtons && (
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={cancelButton.onClick}>
                {cancelButton.title}
              </Button>
              <Button variant="default" onClick={acceptButton.onClick}>
                {acceptButton.title}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;

// Hook to manage dialog state
export const useDialogState = () => {
  const [open, setOpen] = React.useState(false);
  return {
    props: { open, onClose: () => setOpen(false) },
    open: () => setOpen(true),
    close: () => setOpen(false),
  };
};