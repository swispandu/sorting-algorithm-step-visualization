// Import required dependencies and types
import { useEffect, useState } from "react";

// Define toast types and interfaces
interface Toast {
  id: string;
  title: string;
  description?: string;
  duration?: number;
  type?: "default" | "success" | "error" | "warning";
}

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

// Custom hook for managing toast notifications
export function useToast(): ToastState {
  // State to store active toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Function to add a new toast
  const addToast = (toast: Omit<Toast, "id">) => {
    // Generate unique ID for the toast
    const id = Math.random().toString(36).substr(2, 9);
    
    // Add new toast to the list
    setToasts((prev) => [...prev, { ...toast, id }]);

    // Automatically remove toast after duration
    if (toast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 3000);
    }
  };

  // Function to remove a toast by ID
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Clean up toasts when component unmounts
  useEffect(() => {
    return () => {
      setToasts([]);
    };
  }, []);

  return { toasts, addToast, removeToast };
}