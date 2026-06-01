import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, title, message) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const showSuccess = (message) => addToast("success", "موفق", message);
  const showError = (message) => addToast("error", "خطا", message);

  return (
    <ToastContext.Provider value={{ showSuccess, showError }}>
      {children}

      <div className="fixed top-24 right-6 z-[9999] flex flex-col gap-4 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-white px-6 py-5 rounded-2xl shadow-[0_10px_40px_rgb(0,0,0,0.12)] border border-gray-100 flex items-center gap-4 min-w-[340px] max-w-md transform transition-all duration-300 pointer-events-auto"
            dir="rtl"
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full shrink-0 ${
                toast.type === "success"
                  ? "bg-green-50 text-green-500"
                  : "bg-red-50 text-red-500"
              }`}
            >
              {toast.type === "success" ? (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="font-extrabold text-gray-800 text-base">{toast.title}</span>
              <span className="text-sm text-gray-500 leading-relaxed">{toast.message}</span>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};