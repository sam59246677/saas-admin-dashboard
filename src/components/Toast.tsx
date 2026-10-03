import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed left-4 right-4 top-4 z-50 flex items-center justify-between gap-4 rounded-lg px-4 py-3 text-sm font-medium shadow-lg sm:left-auto sm:right-6 sm:top-6 ${
        type === "success"
          ? "bg-emerald-600 text-white"
          : "bg-red-600 text-white"
      }`}
    >
      <span>{message}</span>

      <button
        type="button"
        onClick={onClose}
        className="text-lg leading-none opacity-80 hover:opacity-100"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}
export default Toast;