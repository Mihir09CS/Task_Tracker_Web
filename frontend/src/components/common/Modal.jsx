import { useEffect, useCallback, useRef, useId } from "react";
import { clsx } from "clsx";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children, size = "md" }) {
  const overlayRef = useRef(null);
  const previousFocusRef = useRef(null);
  const closeButtonRef = useRef(null);
  const titleId = useId();

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
      if (previousFocusRef.current?.focus) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 dark:bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleOverlayClick}
    >
      <div
        className={clsx(
          "w-full bg-white dark:bg-slate-900 rounded-2xl shadow-modal dark:shadow-2xl border border-border dark:border-slate-800 transition-all duration-300 animate-scale-in will-change-transform",
          "max-h-[90vh] overflow-y-auto",
          sizes[size]
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border dark:border-slate-800 transition-colors duration-300">
          <h2 id={titleId} className="text-lg font-semibold text-slate-800 dark:text-slate-100 transition-colors duration-300">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
