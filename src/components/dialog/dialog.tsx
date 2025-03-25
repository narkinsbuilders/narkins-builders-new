import React, { FC, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button"; // shadcn Button
import { X } from "lucide-react"; // Icon for close button

interface DialogProps {
  open: boolean;
  onClose: () => void;
  body: string;
  title: string;
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
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
    <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Dialog Panel */}
      <div
        ref={dialogRef}
        className="w-full h-full transform p-4 bg-white text-left transition-all"
      >
        <div className="mx-auto max-w-4xl mt-4">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>

          {/* Title */}
          <h3 className="text-lg font-semibold leading-6 text-gray-900">{title}</h3>

          {/* Body */}
          <div className="mt-4">
            <p className="text-sm text-gray-500">{body}</p>
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